<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/** =========================================================
 * Class AiBot — разпознаване на AI бота, общите заглавки и логът.
 * Не зависи от ядрото — ползва се и от cache_hit.php преди core/autoload.php.
 * ========================================================== */
class AiBot
{

	// Коренът на модула (ai_version/)
	private const ROOT = __DIR__.'/..';

	// НИКОГА не получават AI версията: изпълняват JS, а различно съдържание за тях е
	// cloaking (вреди на SEO). Важи дори ако низ от списъка с ботове съвпада с тях.
	// Същият списък е и в бекенда (AiVersion::PROTECTED в devcore).
	public const PROTECTED = [
		'Googlebot', 'Google-InspectionTool', 'GoogleOther', 'AdsBot-Google',
		'Mediapartners-Google', 'Storebot-Google',
		'bingbot', 'BingPreview', 'adidxbot',
		'Applebot',
	];

	// По-къси низове се пренебрегват — твърде общи („bot“ хваща всичко)
	private const MIN_LENGTH = 4;

	/**
	 * Връща името на бота от списъка или false.
	 */
	public static function detect(array $bots): string|false {
		$ua = $_SERVER['HTTP_USER_AGENT'] ?? '';

		if($ua === ''){
			return false;
		}

		foreach(self::PROTECTED as $protected){
			if(stripos($ua, $protected) !== false){
				return false;
			}
		}

		foreach(self::clean_bots($bots) as $bot){
			if(stripos($ua, $bot) !== false){
				return $bot;
			}
		}

		return false;
	}

	/**
	 * Списъкът без празни, твърде къси и защитени низове (виж PROTECTED).
	 */
	public static function clean_bots(array $bots): array {
		$result = [];

		foreach($bots as $bot){
			$bot = is_string($bot) ? trim($bot) : '';
			if(strlen($bot) < self::MIN_LENGTH){
				continue;
			}

			foreach(self::PROTECTED as $protected){
				if(stripos($bot, $protected) !== false || stripos($protected, $bot) !== false){
					continue 2;
				}
			}

			$result[] = $bot;
		}

		return $result;
	}

	/**
	 * Настройките от админа (GET /api/settings → $core, виж ai_version/README.md)
	 * заместват тези от config.php. Липсващо поле (стар бекенд) → стойността от config.php.
	 */
	public static function apply_settings(array $config, ?object $core): array {
		if(!$core){
			return $config;
		}

		if(isset($core->ai_version_enabled)){
			$config['enabled'] = (bool)$core->ai_version_enabled;
		}

		// Режим на поддръжка — за cache_hit.php: тогава не връща кеширани страници,
		// а bootstrap.php отговаря с 503 (AiRender::run → maintenance.php)
		$config['maintenance'] = ($core->maintenance_mode ?? 0) == 1;

		if(!empty($core->ai_version_bots) && is_array($core->ai_version_bots)){
			$config['bots'] = $core->ai_version_bots;
		}

		$ttl = fn($value) => max(0, min(3600, (int)$value));

		// „Продукти и категории“ в админа = шаблоните с цени (config.price_templates)
		if(isset($core->ai_cache_ttl_product)){
			foreach($config['price_templates'] ?? ['product', 'products'] as $template){
				$config['page_cache_ttl'][$template] = $ttl($core->ai_cache_ttl_product);
			}
		}

		if(isset($core->ai_cache_ttl_default)){
			$config['page_cache_ttl']['*'] = $ttl($core->ai_cache_ttl_default);
		}

		return $config;
	}

	/**
	 * Заглавките на всеки AI отговор (от кеша или рендериран).
	 */
	public static function headers(string $cache_status): void {
		header('Content-Type: text/html; charset=UTF-8');
		header('Vary: User-Agent');
		header('Cache-Control: no-store');
		header('X-AI-Version: 1');
		header('X-AI-Cache: '.$cache_status);
	}

	/**
	 * Един ред на посещение: дата | бот | URL | статус | ms | HIT/MISS
	 */
	public static function log(array $config, string $bot, int $status, float $start, string $cache_status): void {
		if(empty($config['log'])){
			return;
		}

		$dir = self::ROOT.'/logs';
		if(!is_dir($dir)){
			@mkdir($dir, 0755, true);
		}

		$line = implode(' | ', [
			date('Y-m-d H:i:s'),
			$bot,
			$_SERVER['REQUEST_URI'] ?? '',
			$status,
			round((microtime(true) - $start) * 1000).'ms',
			$cache_status,
		]);

		@file_put_contents("{$dir}/".date('Y-m').'.log', $line.PHP_EOL, FILE_APPEND | LOCK_EX);
	}

}
