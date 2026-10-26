<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/** =========================================================
 * AI VERSION — настройки
 * Всичко, което се различава между проектите, е тук.
 * ========================================================== */

return [

	// false — модулът е изключен, всички получават нормалната страница
	'enabled' => true,

	// Тестов User-Agent: показва AI версията ДОРИ при изключен модул (от админа или тук),
	// без кеш и без да се записва в кеша — за проверка на живия сайт преди включване.
	//   curl -A "ExpozyAIPreview" https://ДОМЕЙН/bg/...
	'preview_ua' => 'ExpozyAIPreview',

	// Части от User-Agent (без значение главни/малки). Само AI ботове —
	// Googlebot, Bingbot и Applebot получават нормалната страница (изпълняват JS).
	'bots' => [
		'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
		'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai',
		'PerplexityBot', 'Perplexity-User',
		'CCBot',
		'Meta-ExternalAgent', 'Meta-ExternalFetcher',
		'Bytespider',
		'Amazonbot',
		'DuckAssistBot',
		'MistralAI-User',
		'cohere-ai',
		'YouBot',
	],

	// slug на страницата → шаблон в templates/{шаблон}.php
	// Slug, който не е тук (вкл. началната страница), получава templates/page.php —
	// съдържанието от редактора, с apiData блоковете заменени със списъци (api_blocks).
	'templates' => [
		'products' => 'products',
		'product'  => 'product',
		'blog'     => 'blog',
		'post'     => 'post',
	],

	// apiData="get.{endpoint}" блокове в страниците от редактора → частичен шаблон
	// templates/_{шаблон}.php и името на променливата, в която получава редовете.
	// Блок с endpoint, който не е тук, се маха.
	'api_blocks' => [
		'products'  => ['product_list', 'products'],
		'blogPosts' => ['post_list', 'posts'],
	],

	// GET параметри, които сменят съдържанието на страницата → влизат в ключа на кеша
	// и се пазят в линковете на пагинацията.
	// Параметър => позволени стойности (друга стойност → без кеш). Напр. 'vehicle' => ['moto', 'truck'].
	'cache_params' => [],

	// Страници без съдържание за AI — само навигация + noindex
	'noindex' => [
		'checkout', 'checkout2', 'cart', 'login', 'registration', 'forgotten-password',
		'userpage', 'wishlist', 'ordersummary', 'search',
	],

	// Езиците със съдържание (hreflang, кеш, llms.txt). Празно = всички езици от бекенда.
	'languages' => [],

	// Категориите на магазина (get.categories) в навигацията и в llms.txt; false за проект без магазин
	'nav_categories' => true,

	// Служебни страници, които не влизат в навигацията
	'nav_exclude' => ['header', 'footer', 'homepage', 'product', 'post'],

	'limits' => [
		'products_per_page' => 50,
		'posts_per_page'    => 20,
		'images'            => 5,
		'reviews'           => 10,
		'description'       => 200,
	],

	// Кеш на готовия AI HTML в секунди, по шаблон ('*' — всички останали). 0 = без кеш.
	// Предпазна мрежа срещу масово обхождане, не основен механизъм: цените са само
	// в product/products, затова там е по-кратък. Запис от редактора трие целия кеш.
	'page_cache_ttl' => [
		'product'  => 300,
		'products' => 300,
		'*'        => 900,
	],

	// Шаблоните с цени — за тях важи „кеш за продукти и категории“ от админа
	'price_templates' => ['product', 'products'],

	// Списъците в /llms.txt: endpoint, етикет (lang), ред = templates/_llms_{line}.php,
	// параметри към заявката, страници по 50 [llms.txt, llms-full.txt].
	'llms_sections' => [
		['endpoint' => 'products',  'label' => 'all_products', 'line' => 'product', 'params' => ['only_instock' => 0], 'pages' => [2, 50]],
		['endpoint' => 'blogPosts', 'label' => 'blog',         'line' => 'post',    'params' => [],                    'pages' => [1, 2]],
	],

	// Лог на посещенията в ai_version/logs/YYYY-MM.log
	'log' => true,
];
