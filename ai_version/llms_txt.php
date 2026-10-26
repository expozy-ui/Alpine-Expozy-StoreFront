<?php
/** =========================================================
 * AI VERSION — /llms.txt и /llms-full.txt (Markdown резюме на сайта за AI)
 * .htaccess: RewriteRule ^llms\.txt$ /ai_version/llms_txt.php [L,QSA]
 * Език: езикът по подразбиране на сайта или ?lang=en.
 * ========================================================== */

define("_VALID_PHP", true);
require_once __DIR__.'/../core/autoload.php';
require_once __DIR__.'/classes/class.ai_cache.php';
require_once __DIR__.'/classes/class.ai_render.php';

AiRender::$config = require __DIR__.'/config.php';

header('Content-Type: text/markdown; charset=UTF-8');

$full = ($_GET['full'] ?? '') === '1';
$limit = 50;
$code = $lang->language;

// Кеш за час (Cache-Control от скрипта не помага — .htaccess го пренаписва с no-cache).
// Ключът е md5 → в маската на AiCache, т.е. записът от редактора и смяната в админа го трият.
$llms_key = md5('llms|'.$code.'|'.($full ? 'full' : 'short'));
$llms_cached = AiCache::get($llms_key);

if($llms_cached !== null){
	header('X-AI-Cache: HIT');
	echo $llms_cached;
	exit;
}

ob_start();

// ── 1. МАГАЗИНЪТ ──
echo "# {$core->site_name}\n\n";
echo '> '.sprintf(AiRender::t('llms_intro'), $core->site_name)."\n\n";
echo '- '.AiRender::t('llms_website').': '.SITEURL."/{$code}/\n";

foreach(AiRender::alternates() as $alt_code => $href){
	if($alt_code !== $code){
		echo "- {$alt_code}: ".SITEURL.'/llms'.($full ? '-full' : '').".txt?lang={$alt_code}\n";
	}
}
echo "\n";

// ── 2. КАТЕГОРИИ ──
$ai_tree = function(array $items, int $depth) use (&$ai_tree){
	foreach($items as $item){
		echo str_repeat('  ', $depth)."- [{$item['title']}]({$item['url']})\n";
		$ai_tree($item['children'], $depth + 1);
	}
};

$categories = AiRender::categories();
if($categories){
	echo '## '.AiRender::t('categories')."\n\n";
	$ai_tree($categories, 0);
	echo "\n";
}

// ── 3. СПИСЪЦИ (config.llms_sections) ──
// Всяка секция: endpoint, етикет, частичен шаблон на ред (templates/_llms_{line}.php),
// параметри и страници по 50 [llms.txt, llms-full.txt].
foreach(AiRender::$config['llms_sections'] ?? [] as $section){
	[$max_short, $max_full] = $section['pages'] ?? [1, 5];
	$max_pages = $full ? $max_full : $max_short;
	$endpoint = $section['endpoint'];

	// 0 страници за този режим (напр. дълъг каталог само в llms-full.txt)
	if($max_pages < 1){
		continue;
	}

	$page_no = 1;
	$total_pages = 0;
	$total_results = 0;
	$printed = false;

	do {
		$response = Api::cache(true)->data(array_merge($section['params'] ?? [], ['page' => $page_no, 'limit' => $limit, 'lang' => $code]))->get()->$endpoint();
		$rows = AiRender::rows($response);
		$total_pages = (int)($response['pagination']['total_pages'] ?? 0);
		$total_results = (int)($response['pagination']['total_results'] ?? count($rows));

		if($rows && !$printed){
			echo '## '.AiRender::t($section['label'])."\n\n";
			$printed = true;
		}

		foreach($rows as $row){
			echo AiRender::partial('llms_'.$section['line'], ['row' => $row]);
		}

		$page_no++;
	} while($page_no <= min($total_pages, $max_pages));

	if($printed){
		echo "\n";
		if(!$full && $total_pages > $max_pages){
			echo '> '.sprintf(AiRender::t('llms_full_note'), $total_results).' '.SITEURL."/llms-full.txt\n\n";
		}
	}
}

// ── 4. СТРАНИЦИ ──
echo '## '.AiRender::t('information')."\n\n";
foreach(AiRender::footer_links() as $href => $text){
	echo "- [{$text}]({$href})\n";
}
echo '- [Sitemap]('.SITEURL."/sitemap)\n";

$llms_out = ob_get_clean();
AiCache::put($llms_key, $llms_out, 3600);

header('X-AI-Cache: MISS');
echo $llms_out;
