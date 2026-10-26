<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/** =========================================================
 * AI VERSION — готов HTML от кеша, ПРЕДИ core/autoload.php
 * Включва се в index.php веднага след define("_VALID_PHP").
 * При попадение отговаря без нито една заявка към API-то и спира.
 * Иначе — return и нормалният поток (autoload → bootstrap.php рендерира и кешира).
 *
 * Компромис: за кешираните страници DDoS проверката и режимът на поддръжка
 * се пропускат, докато кешът изтече (до config.page_cache_ttl).
 * ========================================================== */

$ai_start = microtime(true);

require_once __DIR__.'/classes/class.ai_bot.php';
require_once __DIR__.'/classes/class.ai_cache.php';

// Тук още няма $core — настройките от админа идват от копието, което записва
// bootstrap.php (AiCache::save_settings). Докато го няма — config.php.
$ai_config = array_merge(require __DIR__.'/config.php', AiCache::load_settings() ?? []);

// Изключен модул, без кеш или режим на поддръжка (тогава 503 от bootstrap.php, не кеш)
if(empty($ai_config['enabled']) || empty($ai_config['page_cache_ttl']) || !empty($ai_config['maintenance'])){
	return;
}

$ai_bot = AiBot::detect($ai_config['bots']);
if($ai_bot === false){
	return;
}

$ai_html = AiCache::get(AiCache::key($ai_config['cache_params'] ?? [])); // ключ: път + page + lang + cache_params
if($ai_html === null){
	return;
}

AiBot::headers('HIT');
echo $ai_html;

AiBot::log($ai_config, $ai_bot, 200, $ai_start, 'HIT');
exit;
