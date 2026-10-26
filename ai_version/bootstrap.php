<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/** =========================================================
 * AI VERSION — входна точка
 * Включва се в index.php ПРЕДИ $page->load_page().
 * За AI бот рендерира PHP версията и спира; за всички останали — return.
 * Настройки: админ („AI видимост“) → иначе config.php (виж README).
 * ========================================================== */

require_once __DIR__.'/classes/class.ai_bot.php';
require_once __DIR__.'/classes/class.ai_cache.php';

// Настройките от админа („AI видимост“ → GET /api/settings → $core) заместват config.php
$ai_config = AiBot::apply_settings(require __DIR__.'/config.php', $core ?? null);

// Копие за cache_hit.php (работи преди ядрото) — записва се само при промяна.
// Затова и за обикновени посетители: смяна в админа влиза при следващото отваряне.
AiCache::save_settings($ai_config);

// Тестов User-Agent (config.preview_ua) — AI версията и при изключен модул, без кеш
$ai_preview = !empty($ai_config['preview_ua'])
	&& stripos($_SERVER['HTTP_USER_AGENT'] ?? '', $ai_config['preview_ua']) !== false;

if(empty($ai_config['enabled']) && !$ai_preview){
	return;
}

$ai_bot = $ai_preview ? 'preview' : AiBot::detect($ai_config['bots']);

if($ai_bot === false){
	return;
}

require_once __DIR__.'/classes/class.ai_render.php';

AiRender::run($ai_bot, $ai_config, $ai_preview);
exit;
