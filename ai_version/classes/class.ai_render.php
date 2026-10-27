<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/** =========================================================
 * Class AiRender — рендер на PHP версията за AI ботове
 * ========================================================== */
class AiRender
{

	// Коренът на модула (ai_version/)
	private const ROOT = __DIR__.'/..';

	public static array $config = [];
	private static array $t = [];

	// Махат се изцяло заедно със съдържанието си
	private const DROP_TAGS = ['script', 'style', 'template', 'svg', 'form', 'input', 'button', 'select', 'textarea',
		'label', 'iframe', 'noscript', 'link', 'meta', 'video', 'audio', 'canvas'];

	// Остават (без атрибути, освен изброените в KEEP_ATTRS); всичко друго се разопакова
	private const ALLOWED_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'a', 'img', 'strong', 'b',
		'em', 'i', 'br', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'blockquote', 'figure', 'figcaption'];

	private const KEEP_ATTRS = ['a' => ['href'], 'img' => ['src', 'alt'], 'td' => ['colspan', 'rowspan'], 'th' => ['colspan', 'rowspan']];

	/**
	 * Целият поток за един AI бот: статус, шаблон, layout, лог.
	 */
	public static function run(string $bot, array $config, bool $preview = false): void {
		global $page, $core, $lang;

		$start = microtime(true);
		self::$config = $config;

		// PREVIEW — тестовият User-Agent: не се кешира (виж config.preview_ua)
		$cache_status = $preview ? 'PREVIEW' : 'MISS';
		AiBot::headers($cache_status);

		$status = 200;
		$noindex = false;

		if(($core->maintenance_mode ?? 0) == 1){
			$status = 503;
			header('Retry-After: 60'); // като FrontCore::service_unavailable()
			$template = 'maintenance';
		} else {
			// С кеш и без redirect към /404 — статусът го връщаме ние
			$page->load_page(true, false);

			// Заглавията от админа може да са записани с HTML ентитита (&#1048;…) —
			// декодират се веднъж, иначе e() ги escape-ва втори път
			foreach(['title', 'seo_title', 'seo_description'] as $field){
				$page->$field = html_entity_decode($page->$field, ENT_QUOTES | ENT_HTML5, 'UTF-8');
			}

			if($page->error404){
				$status = 404;
				$template = '404';
			} else if(in_array($page->slug, $config['noindex'])){
				$noindex = true;
				$template = 'nav_only';
			} else {
				$template = $config['templates'][$page->slug] ?? 'page';
			}
		}

		$file = self::ROOT."/templates/{$template}.php";
		if(!file_exists($file)){
			$file = self::ROOT.'/templates/page.php';
		}

		// Шаблонът може да смени $status (напр. self::not_found() при липсващ обект) —
		// затова статусът се праща чак след него.
		ob_start();
		include $file;
		$content = ob_get_clean();

		http_response_code($status);

		ob_start();
		include self::ROOT.'/layout.php';
		$html = ob_get_clean();

		echo $html;

		// Само 200 и само заявки с валиден език и номер на страница (виж AiCache::cacheable())
		if(!$preview && $status === 200 && AiCache::cacheable(self::languages(), $config['cache_params'] ?? [])){
			$ttl = $config['page_cache_ttl'][$template] ?? $config['page_cache_ttl']['*'] ?? 0;
			AiCache::put(AiCache::key($config['cache_params'] ?? []), $html, (int)$ttl);
		}

		AiBot::log($config, $bot, $status, $start, $cache_status);
	}

	/** =========================================================
	 * Помощни функции за шаблоните
	 * ========================================================== */

	public static function e(mixed $value): string {
		return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
	}

	/**
	 * Етикет от lang/{език}.php, fallback EN, после самият ключ.
	 */
	public static function t(string $key): string {
		global $lang;

		if(!self::$t){
			// Само код от две малки букви влиза в пътя (Lang вече го проверява — тук за всеки случай)
			$code = preg_match('/^[a-z]{2}$/', (string)$lang->language) ? $lang->language : 'en';
			$file = self::ROOT."/lang/{$code}.php";
			// en.php е резервата за липсващи етикети; проект само на един език може да го няма
			$en = is_file(self::ROOT.'/lang/en.php') ? require self::ROOT.'/lang/en.php' : [];
			self::$t = file_exists($file) ? array_merge($en, require $file) : $en;
		}

		return self::$t[$key] ?? $key;
	}

	/**
	 * API-то връща URL-и с домейна на бекенда — пренасочваме ги към текущия сайт.
	 * Езиковият сегмент също е на бекенда (напр. /bg/auction/… и за английския сайт) —
	 * сменя се с текущия език.
	 */
	public static function url(string $url): string {
		global $lang;

		if($url === ''){
			return '';
		}

		$parts = parse_url($url);
		$path = $parts['path'] ?? '/';
		$query = isset($parts['query']) ? '?'.$parts['query'] : '';

		if(isset($lang) && preg_match('/^[a-z]{2}$/', (string)$lang->language)){
			$path = preg_replace('#^/[a-z]{2}(?=/)#', '/'.$lang->language, $path);
		}

		return SITEURL.$path.$query;
	}

	/**
	 * Частичен шаблон templates/_{$name}.php с подадените променливи.
	 */
	public static function partial(string $name, array $vars = []): string {
		extract($vars, EXTR_SKIP);

		ob_start();
		include self::ROOT."/templates/_{$name}.php";
		return ob_get_clean();
	}

	/**
	 * apiData="get.{endpoint}" блок от редактора → истински списък (config.api_blocks).
	 * Неизвестен endpoint или празен отговор → нищо.
	 */
	public static function api_block(string $endpoint, array $params): string {
		global $lang;

		$block = self::$config['api_blocks'][$endpoint] ?? null;
		if(!$block){
			return '';
		}

		$params['lang'] = $lang->language;
		$params['limit'] = min((int)($params['limit'] ?? 8), self::$config['limits']['products_per_page']);

		$rows = self::rows(Api::cache(true)->data($params)->get()->$endpoint());
		if(!$rows){
			return '';
		}

		[$partial, $var] = $block;
		return self::partial($partial, [$var => $rows, 'heading' => 'h3']);
	}

	/**
	 * Съдържанието на 404 страницата — за шаблон, чийто обект не е намерен:
	 *   if(empty($post['id'])){ $status = 404; echo AiRender::not_found(); return; }
	 */
	public static function not_found(): string {
		ob_start();
		include self::ROOT.'/templates/404.php';
		return ob_get_clean();
	}

	/**
	 * Сума с валутата по подразбиране на магазина: "40.00 €"
	 */
	public static function price(float|int|string $amount): string {
		global $currency;

		return number_format((float)$amount, 2, '.', '').' '.($currency['symbol'] ?? '€');
	}

	/**
	 * HTML → един ред текст, отрязан до $limit символа (за кратки описания в списъци).
	 */
	public static function text(string $html, int $limit = 0): string {
		$text = html_entity_decode(strip_tags(str_replace('<', ' <', $html)), ENT_QUOTES | ENT_HTML5, 'UTF-8');
		$text = trim(preg_replace('/\s+/u', ' ', str_replace("\u{00A0}", ' ', $text)));

		if($limit > 0 && mb_strlen($text, 'UTF-8') > $limit){
			$text = rtrim(mb_substr($text, 0, $limit, 'UTF-8')).'…';
		}

		return $text;
	}

	/**
	 * Линк към същата страница с друг ?page=N (страница 1 е без параметър).
	 */
	public static function page_url(int $page_no): string {
		$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

		// Параметрите от config.cache_params (напр. ?vehicle=moto) остават в линка на страницата
		$query = [];
		foreach(array_keys(self::$config['cache_params'] ?? []) as $param){
			if(is_string($_GET[$param] ?? null) && $_GET[$param] !== ''){
				$query[$param] = $_GET[$param];
			}
		}
		if($page_no > 1){
			$query['page'] = $page_no;
		}

		return SITEURL.$path.($query ? '?'.http_build_query($query) : '');
	}

	/**
	 * API-то връща ту плосък масив, ту {result: [...]} — винаги масив от редове.
	 */
	public static function rows(mixed $response): array {
		$rows = $response['result'] ?? $response;

		return is_array($rows) ? array_values(array_filter($rows, 'is_array')) : [];
	}

	/**
	 * Текущият URL без чужди параметри (за canonical). page= остава заради пагинацията,
	 * а параметрите от config.cache_params — защото сменят съдържанието (/estate?id=5).
	 */
	public static function canonical(): string {
		return self::page_url(max(1, (int)($_GET['page'] ?? 1)));
	}

	/**
	 * Кодовете на езиците на сайта: ['bg', 'en'] (кеширано в Api за час).
	 */
	public static function languages(): array {
		// config.languages — ако сайтът реално има съдържание само на част от езиците в бекенда
		if(!empty(self::$config['languages'])){
			return self::$config['languages'];
		}

		$rows = Api::cache(true)->get()->languages();

		return is_array($rows) ? array_values(array_filter(array_column($rows, 'lang'), 'is_string')) : [];
	}

	/**
	 * [език => URL] за hreflang — сменя езиковия префикс в текущия път.
	 */
	public static function alternates(): array {
		global $lang;

		$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
		$prefix = "/{$lang->language}/";

		$result = [];
		foreach(self::languages() as $code){
			if($code === ''){
				continue;
			}

			$result[$code] = str_starts_with($path, $prefix)
				? SITEURL."/{$code}/".substr($path, strlen($prefix))
				: SITEURL."/{$code}/";
		}

		return $result;
	}

	/**
	 * Активните категории като дърво: [ ['title','url','children'=>[...]], ... ]
	 */
	public static function categories(): array {
		global $lang;

		// Проект без магазин (config.nav_categories = false) — без категории в навигацията и llms.txt
		if((self::$config['nav_categories'] ?? true) === false){
			return [];
		}

		$rows = Api::cache(true)->data(['limit' => 100, 'lang' => $lang->language])->get()->categories();
		$rows = $rows['result'] ?? $rows;
		if(!is_array($rows)){
			return [];
		}

		$by_parent = [];
		foreach($rows as $row){
			if(empty($row['active']) || empty($row['title'])){
				continue;
			}
			$by_parent[(int)$row['parent_id']][] = $row;
		}

		$build = function(int $parent_id) use (&$build, $by_parent): array {
			$tree = [];
			foreach($by_parent[$parent_id] ?? [] as $row){
				$tree[] = [
					'title'    => $row['title'],
					'url'      => self::url($row['url'] ?? ''),
					'children' => $build((int)$row['id']),
				];
			}
			return $tree;
		};

		return $build(0);
	}

	/**
	 * Линковете от footer-а в редактора [URL => текст]; ако няма — страниците от API-то.
	 */
	public static function footer_links(): array {
		global $lang;

		$links = [];

		$file = BASEPATH."static/pages/{$lang->language}/footer.html";
		if(file_exists($file)){
			preg_match_all('/<a\s[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/is', file_get_contents($file), $matches, PREG_SET_ORDER);

			foreach($matches as $m){
				$href = trim($m[1]);
				// Текстът е HTML (&amp;) — декодира се, иначе e() в layout.php го escape-ва втори път
				$text = trim(preg_replace('/\s+/u', ' ', html_entity_decode(strip_tags($m[2]), ENT_QUOTES | ENT_HTML5, 'UTF-8')));

				if($href === '' || $href[0] === '#' || $text === ''){
					continue;
				}

				if($href[0] === '/'){
					$href = SITEURL.$href;
				} else if(!str_starts_with($href, SITEURL)){
					continue; // външни линкове
				}

				$links[$href] = $text;
			}
		}

		if($links){
			return $links;
		}

		$rows = Api::cache(true)->data(['active' => 1, 'limit' => 100, 'lang' => $lang->language])->get()->pages();
		$rows = $rows['result'] ?? $rows;
		$skip = array_merge(self::$config['noindex'], self::$config['nav_exclude']);

		foreach(is_array($rows) ? $rows : [] as $row){
			if(!empty($row['private']) || in_array($row['slug'] ?? '', $skip)){
				continue;
			}
			$links[SITEURL."/{$lang->language}/{$row['slug']}"] = $row['title'];
		}

		return $links;
	}

	private static bool $demote_h1 = false;

	// keyName → [endpoint, параметри] на apiData блоковете, срещнати по време на чистенето
	private static array $api_keys = [];

	/**
	 * HTML от редактора → чист семантичен HTML без Alpine, Tailwind и служебни елементи.
	 * $demote_h1 — за описание вътре в страница с собствен <h1> (продукт, статия): h1 → h2.
	 */
	public static function clean_html(string $html, bool $demote_h1 = false): string {
		if(trim($html) === ''){
			return '';
		}

		self::$demote_h1 = $demote_h1;

		// Alpine атрибутите (@click, :href, x-*) се махат преди парсването — libxml не ги разбира.
		// Регулярният израз за таг пропуска ">" в кавички (x-show="a > b").
		// x-text / x-html стават маркер data-ai-dynamic — елементите им се махат по-долу.
		// apiData="get.X" става data-ai-api="X", друг apiData — data-ai-dynamic.
		// <template x-for="… data.KEY …"> става data-ai-for="KEY" — там отива списъкът на блока с този keyName.
		self::$api_keys = [];
		$html = preg_replace_callback('/<[a-zA-Z](?:[^>"\']|"[^"]*"|\'[^\']*\')*>/', function($m){
			$tag = preg_replace('/\sapiData\s*=\s*"get\.([\w]+)"/i', ' data-ai-api="$1"', $m[0]);
			$tag = preg_replace('/\sapiData\s*=\s*"[^"]*"/i', ' data-ai-dynamic="1"', $tag);
			$tag = preg_replace('/\sx-for\s*=\s*"[^"]*?\bdata\.(\w+)[^"]*"/i', ' data-ai-for="$1"', $tag);
			$tag = preg_replace('/\sx-(?:text|html)\s*=\s*(?:"[^"]*"|\'[^\']*\')/', ' data-ai-dynamic="1"', $tag);
			return preg_replace('/\s(?:[@:]|x-)[\w.:-]*(?:\s*=\s*(?:"[^"]*"|\'[^\']*\'))?/', '', $tag);
		}, $html);

		if(!class_exists('DOMDocument')){
			$html = preg_replace('#<('.implode('|', self::DROP_TAGS).')\b.*?</\1>#is', '', $html);
			return trim(strip_tags($html, '<'.implode('><', self::ALLOWED_TAGS).'>'));
		}

		$dom = new DOMDocument();
		libxml_use_internal_errors(true);
		$dom->loadHTML('<?xml encoding="UTF-8"><body>'.$html.'</body>', LIBXML_NOERROR | LIBXML_NOWARNING);
		libxml_clear_errors();

		$body = $dom->getElementsByTagName('body')->item(0);
		if(!$body){
			return '';
		}

		self::clean_node($body);

		$out = '';
		foreach($body->childNodes as $child){
			$out .= $dom->saveHTML($child);
		}

		$out = preg_replace_callback('/<!--ai-api:(\w+)\?(.*?)-->/', function($m){
			parse_str(html_entity_decode($m[2]), $params);
			return self::api_block($m[1], $params);
		}, $out);

		// Отстъпите от редактора и празните редове не носят нищо
		$out = preg_replace('/^[ \t]+/m', '', $out);
		$out = preg_replace('/\s*\n\s*/', "\n", $out);

		return trim($out);
	}

	private static function clean_node(DOMNode $node): void {
		// Копие на списъка — по време на обхождането децата се местят и трият
		foreach(iterator_to_array($node->childNodes) as $child){
			if($child instanceof DOMComment){
				$node->removeChild($child);
				continue;
			}
			if(!$child instanceof DOMElement){
				continue;
			}

			$tag = strtolower($child->tagName);

			// x-text / x-html съдържат placeholder текст — истинските данни ги попълва Alpine
			// apiData блок: запомняме endpoint и data-* параметрите под неговия keyName
			// (по подразбиране — името на endpoint-а); самият елемент се чисти нормално.
			if($child->hasAttribute('data-ai-api')){
				$endpoint = $child->getAttribute('data-ai-api');
				$params = [];
				foreach($child->attributes as $attr){
					if(str_starts_with($attr->name, 'data-') && !str_starts_with($attr->name, 'data-ai-')){
						$params[substr($attr->name, 5)] = $attr->value;
					}
				}
				$key = $child->getAttribute('keyname') ?: $endpoint;
				self::$api_keys[$key] = [$endpoint, $params];
				$child->removeAttribute('data-ai-api');
			}

			// <template x-for="… data.KEY …"> на известен apiData блок → маркер на мястото на списъка;
			// clean_html() го замества с готовия списък.
			if($tag === 'template' && isset(self::$api_keys[$child->getAttribute('data-ai-for')])){
				$key = $child->getAttribute('data-ai-for');
				[$endpoint, $params] = self::$api_keys[$key];
				unset(self::$api_keys[$key]); // само първият x-for на блока

				$marker = $child->ownerDocument->createComment('ai-api:'.$endpoint.'?'.http_build_query($params));
				$node->replaceChild($marker, $child);
				continue;
			}

			// Условен <template x-if>, вътре в който има списък — разопакова се, иначе се маха
			if($tag === 'template' && $child->getElementsByTagName('template')->length > 0){
				foreach($child->getElementsByTagName('template') as $inner){
					if(isset(self::$api_keys[$inner->getAttribute('data-ai-for')])){
						self::clean_node($child);
						self::unwrap($child);
						continue 2;
					}
				}
			}

			if(in_array($tag, self::DROP_TAGS) || $child->hasAttribute('data-ai-dynamic')){
				$node->removeChild($child);
				continue;
			}

			self::clean_node($child);

			if($tag === 'h1' && self::$demote_h1){
				$h2 = $child->ownerDocument->createElement('h2');
				while($child->firstChild){
					$h2->appendChild($child->firstChild);
				}
				$node->replaceChild($h2, $child);
				$child = $h2;
				$tag = 'h2';
			}

			if(!in_array($tag, self::ALLOWED_TAGS)){
				self::unwrap($child);
				continue;
			}

			$keep = self::KEEP_ATTRS[$tag] ?? [];
			foreach(iterator_to_array($child->attributes) as $attr){
				if(!in_array($attr->name, $keep)){
					$child->removeAttribute($attr->name);
				}
			}

			if($tag === 'a'){
				$href = trim($child->getAttribute('href'));
				if($href === '' || $href[0] === '#' || str_starts_with($href, 'javascript:')){
					self::unwrap($child);
					continue;
				}
				if($href[0] === '/'){
					$child->setAttribute('href', SITEURL.$href);
				}
			}

			if($tag === 'img'){
				$src = trim($child->getAttribute('src'));
				if($src === ''){
					$node->removeChild($child);
					continue;
				}
				if($src[0] === '/' && !str_starts_with($src, '//')){
					$child->setAttribute('src', SITEURL.$src);
				}
			}

			// Празни елементи (иконите <i class="fa…">, декоративни блокове)
			if($tag !== 'img' && $tag !== 'br' && trim($child->textContent) === '' && $child->getElementsByTagName('img')->length === 0){
				$node->removeChild($child);
			}
		}
	}

	private static function unwrap(DOMElement $el): void {
		$parent = $el->parentNode;
		while($el->firstChild){
			$parent->insertBefore($el->firstChild, $el);
		}
		$parent->removeChild($el);
	}

}
