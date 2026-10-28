<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/** =========================================================
 * Class JsonLd — структурираните данни на страницата като един @graph.
 *
 * Organization, WebSite и WebPage са на всяка страница (статус 200), а страничните
 * възли (Product, Article…) сочат към тях с @id вместо да повтарят името на фирмата.
 * Входна точка: GeoOptimizer::headTags() (вика го pages/header.php и
 * ai_version/layout.php) → JsonLd::render() — съдържанието е еднакво за хора и ботове.
 *
 * Данните за организацията: GET /api/organization?lang= (devcore → „Организация“),
 * зареждат се при първа нужда. Празно поле не се извежда — нищо не се измисля.
 * Спецификация: frontend_docs → раздел 25 на frontend_framework.md.
 * ========================================================== */
class JsonLd
{

	// Неуспешен GET /api/organization (стар бекенд, грешка) се помни толкова секунди —
	// кешът на ядрото пази само успешните отговори, иначе всяка страница би викала endpoint-а
	private const FAIL_TTL = 300;

	private const GUARD = "<?php exit; ?>\n";

	// Типовете от „Организация“ в админа; непознат → Organization
	private const ORG_TYPES = ['Organization', 'OnlineStore', 'LocalBusiness'];

	private const JSON_FLAGS = JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_INVALID_UTF8_SUBSTITUTE;

	private static ?array $organization = null;


	/**
	 * Извежда <script type="application/ld+json"> с графа и след него ръчния
	 * „Schema organization“ скрипт от админа (както е). На 404 / 503 — нищо.
	 */
	public static function render(GeoOptimizer $geo):void{
		global $core;

		if(!self::renderable()){
			return;
		}

		$json = json_encode(['@context' => 'https://schema.org', '@graph' => self::graph($geo)], self::JSON_FLAGS);
		if($json !== false){
			echo "\t\t<script type=\"application/ld+json\">{$json}</script>\n";
		}

		$manual = trim((string)($core->web['scripts']['organization'] ?? ''));
		if($manual !== ''){
			echo "\t\t{$manual}\n";
		}
	}

	/**
	 * Данните от „Организация“ на текущия език; [] при липсващ endpoint или грешка.
	 * Успешният отговор — през кеша на ядрото (Cache::ENDPOINTS, 1 час).
	 */
	public static function organization():array{
		global $lang;

		if(self::$organization !== null){
			return self::$organization;
		}

		$code = preg_match('/^[a-z]{2}$/', (string)($lang->language ?? '')) ? $lang->language : 'bg';
		$fail = BASEPATH."cache/organization_fail_{$code}.php";

		if(is_file($fail) && @filemtime($fail) > time() - self::FAIL_TTL){
			return self::$organization = [];
		}

		$row = Api::cache(true)->data(['lang' => $code])->get()->organization();

		if(is_array($row) && isset($row['name']) && is_string($row['name'])){
			return self::$organization = $row;
		}

		@file_put_contents($fail, self::GUARD);
		return self::$organization = [];
	}

	/**
	 * Адрес от API-то → на текущия сайт и език (API-то връща домейна на бекенда,
	 * понякога и чужд езиков сегмент). Относителен път → с SITEURL.
	 */
	public static function url(string $url):string{
		global $lang;

		if($url === ''){
			return '';
		}

		$parts = parse_url($url);
		$path = $parts['path'] ?? '/';
		$query = isset($parts['query']) ? '?'.$parts['query'] : '';

		if(preg_match('/^[a-z]{2}$/', (string)($lang->language ?? ''))){
			$path = preg_replace('#^/[a-z]{2}(?=/)#', '/'.$lang->language, $path);
		}

		return SITEURL.$path.$query;
	}


	// ── Графът ──

	private static function renderable():bool{
		global $page;

		// Page::canonical() — от същата промяна; при частично качване без него — нищо
		if(empty($page) || $page->error404 || $page->slug === '404' || !method_exists('Page', 'canonical')){
			return false;
		}

		$status = http_response_code();
		return $status === false || $status === 200;
	}

	private static function graph(GeoOptimizer $geo):array{
		global $page, $lang;

		$canonical = Page::canonical();
		$ids = [
			'organization' => SITEURL.'/#organization',
			'website'      => SITEURL.'/#website',
			'logo'         => SITEURL.'/#logo',
			'webpage'      => $canonical.'#webpage',
			'breadcrumb'   => $canonical.'#breadcrumb',
		];

		$org = self::organization();
		$logo = self::logo_node($ids, $org);
		$graph = [self::organization_node($ids, $org, (bool)$logo)];
		if($logo){
			$graph[] = $logo;
		}
		$graph[] = self::website_node($ids, $org);

		$webpage = [
			'@type'      => in_array($page->slug, ['products', 'blog'], true) ? 'CollectionPage' : 'WebPage',
			'@id'        => $ids['webpage'],
			'url'        => $canonical,
			'name'       => self::text($page->seo_title ?: $page->title),
			'description'=> self::text($page->seo_description),
			'inLanguage' => $lang->language,
			'isPartOf'   => ['@id' => $ids['website']],
		];

		if(self::is_homepage()){
			$webpage['about'] = ['@id' => $ids['organization']];
		}

		$crumbs = [];
		$main = [];
		$image = '';

		// ── Страници на проекта (обява, спецификация, имот…) ──
		// core/classes/class.json_ld.project.php → JsonLdProject::page(); този файл е
		// еднакъв във всички проекти, разликите са само там. null = страницата не е негова.
		$project = self::project_page($canonical, $ids, $geo);

		if($project !== null){
			if(!empty($project['type'])){
				$webpage['@type'] = $project['type'];
			}
			if(!empty($project['main_id'])){
				$webpage['mainEntity'] = ['@id' => $project['main_id']];
			}
			$main = $project['main'] ?? [];
			$crumbs = $project['crumbs'] ?? [];
			$image = (string)($project['image'] ?? '');
		}

		// ── Продукт ──
		else if($page->type === 'product' && $page->target_id > 0){
			$product = $page->get_target('products', $page->target_id);
			if(!empty($product['id'])){
				$product = $geo->normalizeProduct($product);
				// Страницата е самият продукт — canonical, а не url от API-то (може да носи
				// параметри извън canonical, напр. ?id_code= в kokoauto).
				$url = $canonical;

				$main[] = $geo->productNode($product, $url.'#product', $url, $ids['organization']);
				$faq = $geo->faqNode($product, $url.'#faq');
				if($faq){
					$main[] = $faq;
				}
				$webpage['mainEntity'] = ['@id' => $url.'#product'];
				$image = $product['images'][0]['image'] ?? $product['images'][0]['url'] ?? '';

				$crumbs = self::category_chain((int)($product['categories'][0]['id'] ?? 0));
				$crumbs[] = ['name' => $product['title'] ?? ''];
			}
		}

		// ── Статия ──
		else if($page->type === 'post' && $page->target_id > 0){
			$post = $page->get_target('blogPosts', $page->target_id);
			if(!empty($post['id'])){
				$url = $canonical; // страницата е самата статия

				$main[] = self::article_node($post, $url, $ids, $geo);
				$webpage['mainEntity'] = ['@id' => $url.'#article'];
				$image = $post['images'][0]['url'] ?? '';

				$crumbs[] = ['name' => $geo->t('blog'), 'item' => SITEURL."/{$lang->language}/blog"];
				if(!empty($post['category']['title'])){
					$crumbs[] = ['name' => $post['category']['title'], 'item' => self::url((string)($post['category']['url'] ?? ''))];
				}
				$crumbs[] = ['name' => $post['title'] ?? ''];
			}
		}

		// ── Категория ──
		else if($page->slug === 'products' && $page->target_id > 0){
			$category = $page->get_target('categories', $page->target_id);
			if(!empty($category['id'])){
				foreach(is_array($category['parents'] ?? null) ? $category['parents'] : [] as $parent){
					$crumbs[] = ['name' => $parent['title'] ?? '', 'item' => self::url((string)($parent['url'] ?? ''))];
				}
				$crumbs[] = ['name' => $category['title'] ?? ''];
			}
		}

		// ── Блог / категория от блога ──
		else if($page->slug === 'blog'){
			$category = $page->target_id > 0 ? $page->get_target('blogCategories', $page->target_id) : [];
			if(!empty($category['id'])){
				$crumbs[] = ['name' => $geo->t('blog'), 'item' => SITEURL."/{$lang->language}/blog"];
				$crumbs[] = ['name' => $category['title'] ?? ''];
			} else {
				$crumbs[] = ['name' => $geo->t('blog')];
			}
		}

		if($image !== ''){
			$webpage['primaryImageOfPage'] = ['@type' => 'ImageObject', 'url' => $image];
		} else if($logo){
			$webpage['primaryImageOfPage'] = ['@id' => $ids['logo']];
		}

		if($crumbs){
			array_unshift($crumbs, ['name' => $geo->t('home'), 'item' => SITEURL."/{$lang->language}/"]);
			$webpage['breadcrumb'] = ['@id' => $ids['breadcrumb']];
		}

		$graph[] = self::clean($webpage);

		if($crumbs){
			$graph[] = self::breadcrumb_node($ids['breadcrumb'], $crumbs);
		}

		return array_merge($graph, $main);
	}


	// ── Възли ──

	/** Organization / OnlineStore / LocalBusiness — по таблицата в спецификацията (3.3) */
	private static function organization_node(array $ids, array $org, bool $has_logo):array{
		global $core;

		$str = fn($key) => trim((string)($org[$key] ?? ''));
		$list = fn($key) => array_values(array_filter(is_array($org[$key] ?? null) ? $org[$key] : [], fn($v) => is_string($v) && trim($v) !== ''));

		$type = in_array($org['type'] ?? '', self::ORG_TYPES, true) ? $org['type'] : 'Organization';
		$vat = $str('vat_id');
		$tax = $str('tax_id');
		$country = $str('country');

		$node = [
			'@type'         => $type,
			'@id'           => $ids['organization'],
			'name'          => $str('name') ?: (string)$core->site_name,
			'alternateName' => $list('alternate_names'),
			'legalName'     => $str('legal_name'),
			'vatID'         => $vat,
			'taxID'         => ($tax !== '' && $tax !== preg_replace('/\D/', '', $vat)) ? $tax : '',
			'url'           => SITEURL.'/',
			'logo'          => $has_logo ? ['@id' => $ids['logo']] : '',
			'image'         => $has_logo ? ['@id' => $ids['logo']] : '',
			'description'   => $str('description'),
			'email'         => $str('email'),
			'telephone'     => $str('phone'),
		];

		// Адресът — само в цялост: държава и поне улица или град
		if($country !== '' && ($str('street') !== '' || $str('city') !== '')){
			$node['address'] = self::clean([
				'@type'           => 'PostalAddress',
				'streetAddress'   => $str('street'),
				'addressLocality' => $str('city'),
				'postalCode'      => $str('postal_code'),
				'addressCountry'  => $country,
			]);
		}

		if($country !== ''){
			$node['areaServed'] = ['@type' => 'Country', 'name' => $country];
		}
		if($str('founder') !== ''){
			$node['founder'] = ['@type' => 'Person', 'name' => $str('founder')];
		}
		$node['foundingDate'] = $str('founding_date');

		// Точка за контакт — само ако има телефон или имейл
		if($str('phone') !== '' || $str('email') !== ''){
			$contact_url = $str('contact_url');
			if($contact_url !== '' && $contact_url[0] === '/'){
				$contact_url = SITEURL.$contact_url;
			}

			$node['contactPoint'] = self::clean([
				'@type'             => 'ContactPoint',
				'contactType'       => 'customer support',
				'telephone'         => $str('phone'),
				'email'             => $str('email'),
				'url'               => $contact_url,
				'areaServed'        => $country,
				'availableLanguage' => self::languages(),
			]);
		}

		$node['sameAs'] = $list('same_as');
		$node = self::clean($node);

		// extra — след типизираните полета; те печелят при същия ключ
		foreach(is_array($org['extra'] ?? null) ? $org['extra'] : [] as $key => $value){
			if(is_string($key) && !isset($node[$key]) && !in_array($key, ['@context', '@id', '@type', '@graph'], true)){
				$node[$key] = $value;
			}
		}

		return $node;
	}

	private static function logo_node(array $ids, array $org):array{
		global $core;

		$url = trim((string)($core->web['logo'] ?? ''));
		if($url === ''){
			return [];
		}

		return [
			'@type'   => 'ImageObject',
			'@id'     => $ids['logo'],
			'url'     => $url,
			'caption' => trim((string)($org['name'] ?? '')) ?: (string)$core->site_name,
		];
	}

	private static function website_node(array $ids, array $org):array{
		global $core, $lang;

		return self::clean([
			'@type'         => 'WebSite',
			'@id'           => $ids['website'],
			'url'           => SITEURL.'/',
			'name'          => trim((string)($org['name'] ?? '')) ?: (string)$core->site_name,
			'alternateName' => is_array($org['alternate_names'] ?? null) ? trim((string)(reset($org['alternate_names']) ?: '')) : '',
			'description'   => trim((string)($org['description'] ?? '')),
			'inLanguage'    => $lang->language,
			'publisher'     => ['@id' => $ids['organization']],
		]);
	}

	private static function article_node(array $post, string $url, array $ids, GeoOptimizer $geo):array{
		$published = $post['date_publish'] ?? $post['date_created'] ?? '';
		$modified = $post['date_modified'] ?? $published;

		return self::clean([
			'@type'            => 'Article',
			'@id'              => $url.'#article',
			'headline'         => self::text((string)($post['title'] ?? '')),
			'description'      => $geo->plainText(!empty($post['seo_description']) ? $post['seo_description'] : ($post['description'] ?? '')),
			'url'              => $url,
			'image'            => $post['images'][0]['url'] ?? '',
			'datePublished'    => $published !== '' ? date('c', strtotime($published)) : '',
			'dateModified'     => $modified !== '' ? date('c', strtotime($modified)) : '',
			'author'           => ['@id' => $ids['organization']],
			'publisher'        => ['@id' => $ids['organization']],
			'keywords'         => $post['tags'] ?? '',
			'mainEntityOfPage' => ['@id' => $ids['webpage']],
		]);
	}

	/** $crumbs: [['name' => …, 'item' => url], …]; последният — без item */
	private static function breadcrumb_node(string $id, array $crumbs):array{
		$items = [];
		$last = count($crumbs) - 1;

		foreach(array_values($crumbs) as $i => $crumb){
			$item = ['@type' => 'ListItem', 'position' => $i + 1, 'name' => self::text((string)($crumb['name'] ?? ''))];
			if($i < $last && !empty($crumb['item'])){
				$item['item'] = $crumb['item'];
			}
			$items[] = $item;
		}

		return ['@type' => 'BreadcrumbList', '@id' => $id, 'itemListElement' => $items];
	}


	// ── Помощни ──

	/**
	 * Възлите за страница, която проектът описва сам (JsonLdProject::page()):
	 * ['type' => 'WebPage'|'CollectionPage'…, 'main' => [възли], 'main_id' => @id на
	 *  главния, 'crumbs' => [['name','item'], …] без „Начало“, 'image' => url] или null.
	 */
	private static function project_page(string $canonical, array $ids, GeoOptimizer $geo):?array{
		if(!is_file(__DIR__.'/class.json_ld.project.php')){
			return null;
		}
		require_once __DIR__.'/class.json_ld.project.php';

		if(!class_exists('JsonLdProject') || !method_exists('JsonLdProject', 'page')){
			return null;
		}

		$result = JsonLdProject::page($canonical, $ids, $geo);
		return is_array($result) ? $result : null;
	}

	/**
	 * Веригата категории до $category_id (без самата нея — продуктът е последен):
	 * от дървото get.categories, както навигацията (в кеша на ядрото).
	 */
	private static function category_chain(int $category_id):array{
		global $lang;

		if($category_id <= 0){
			return [];
		}

		$rows = Api::cache(true)->data(['limit' => 100, 'lang' => $lang->language])->get()->categories();
		$by_id = [];
		foreach(is_array($rows['result'] ?? $rows) ? ($rows['result'] ?? $rows) : [] as $row){
			if(is_array($row) && !empty($row['id'])){
				$by_id[(int)$row['id']] = $row;
			}
		}

		$chain = [];
		for($id = $category_id, $guard = 0; $id > 0 && isset($by_id[$id]) && $guard < 10; $guard++){
			array_unshift($chain, ['name' => $by_id[$id]['title'] ?? '', 'item' => self::url((string)($by_id[$id]['url'] ?? ''))]);
			$id = (int)($by_id[$id]['parent_id'] ?? 0);
		}

		return $chain;
	}

	/** Кодовете на езиците на сайта (bg, en…) */
	private static function languages():array{
		$rows = Api::cache(true)->get()->languages();
		return array_values(array_unique(array_filter(array_column(is_array($rows) ? $rows : [], 'lang'), 'is_string')));
	}

	private static function is_homepage():bool{
		global $page;
		return $page->slug === '' || in_array($page->slug, ['homepage', 'home', 'index'], true);
	}

	/** Текст от админа (може да е с HTML ентитита) → чист низ. Ползва го и JsonLdProject. */
	public static function text(string $value):string{
		return trim(html_entity_decode(strip_tags($value), ENT_QUOTES | ENT_HTML5, 'UTF-8'));
	}

	/** Маха празните полета ('' / [] / null) — „пропусни, не измисляй“. Ползва го и JsonLdProject. */
	public static function clean(array $node):array{
		return array_filter($node, fn($v) => $v !== '' && $v !== null && $v !== []);
	}

}
