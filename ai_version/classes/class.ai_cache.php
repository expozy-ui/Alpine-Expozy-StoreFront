<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/** =========================================================
 * Class AiCache — кратък кеш на готовия AI HTML (предпазна мрежа, не основен механизъм).
 * Не зависи от ядрото — четенето става в cache_hit.php преди core/autoload.php.
 *
 * Ключ: пътят + ?page=N. Другите параметри се игнорират, за да не може бот да
 * заобиколи кеша с ?v=123. User-Agent не влиза — всички AI ботове получават едно и също.
 * Кешира се само статус 200. TTL е по шаблон (config.page_cache_ttl).
 * ========================================================== */
class AiCache
{

	private const DIR = __DIR__.'/../cache';

	// Файловете са .php с този първи ред: при заявка по HTTP PHP ги изпълнява и спира веднага.
	// .json се сервира направо от nginx (без .htaccess) — беше публично достъпен.
	private const GUARD = "<?php exit; ?>\n";

	// На всеки ~SWEEP_EVERY записа се трият всички изтекли файлове
	private const SWEEP_EVERY = 100;

	// Кешираните страници (ключ = md5). Копието на настройките (_settings.php) не влиза
	// в тази маска — clear() и sweep() не го трият.
	private const PAGES = '[0-9a-f]*.php';

	// Копие на настройките за cache_hit.php, който работи преди ядрото и няма $core
	private const SETTINGS_FILE = '_settings.php';

	// По-далечни страници от пагинацията не се кешират
	private const MAX_PAGE = 500;

	// Най-дългият възможен TTL (горната граница в админа) — за sweep() по възраст на файла
	private const MAX_TTL = 3600;

	/**
	 * Дали тази заявка може да се запише в кеша. Иначе всяка измислена стойност
	 * (?lang=zz, ?page=99999) би създала нов файл. Не-кешируемите се рендерират нормално.
	 *  - lang: само езиковият префикс на пътя (без ?lang= отгоре) и само език на сайта;
	 *  - page: само цяло число от 1 до MAX_PAGE (или без page);
	 *  - параметрите от config.cache_params: само позволените им стойности (или без тях).
	 */
	public static function cacheable(array $languages, array $cache_params = []): bool {
		foreach($cache_params as $param => $allowed){
			if(isset($_GET[$param]) && !in_array($_GET[$param], $allowed, true)){
				return false;
			}
		}

		$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
		$language = $_GET['lang'] ?? '';

		if(!is_string($language)){
			return false;
		}

		if(preg_match('#^/([a-z]{2})(/|$)#', $path, $m)){
			if($language !== $m[1] || !in_array($language, $languages, true)){
				return false;
			}
		} else if($language !== ''){
			return false;
		}

		if(isset($_GET['page'])){
			$page_no = $_GET['page'];
			if(!is_string($page_no) || !ctype_digit($page_no) || (int)$page_no < 1 || (int)$page_no > self::MAX_PAGE){
				return false;
			}
		}

		return true;
	}

	/**
	 * $cache_params — config.cache_params: GET параметри, които сменят съдържанието
	 * (напр. ?vehicle=moto) и затова влизат в ключа.
	 */
	public static function key(array $cache_params = []): string {
		$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
		$page_no = max(1, (int)($_GET['page'] ?? 1));

		// Езикът идва от $_GET, не от пътя: rewrite правилото слага lang от префикса, но
		// добавен ?lang= печели (последната стойност). Без него в ключа /en/…?lang=bg
		// записва български HTML под ключа на английския URL.
		$language = is_string($_GET['lang'] ?? null) ? $_GET['lang'] : '';

		$extra = '';
		foreach(array_keys($cache_params) as $param){
			$extra .= '&'.$param.'='.(is_string($_GET[$param] ?? null) ? $_GET[$param] : '');
		}

		return md5($path.'?page='.$page_no.'&lang='.$language.$extra);
	}

	/**
	 * Готовият HTML или null (няма / изтекъл — изтеклият се трие).
	 */
	public static function get(string $key): ?string {
		$file = self::DIR."/{$key}.php";
		if(!is_file($file)){
			return null;
		}

		$data = self::read($file);

		if(!is_array($data) || ($data['expires'] ?? 0) <= time()){
			@unlink($file);
			return null;
		}

		return $data['html'] ?? null;
	}

	public static function put(string $key, string $html, int $ttl): void {
		if($ttl <= 0 || $html === ''){
			return;
		}

		if(!is_dir(self::DIR)){
			@mkdir(self::DIR, 0755, true);
		}

		$data = self::GUARD.json_encode(['expires' => time() + $ttl, 'html' => $html], JSON_UNESCAPED_UNICODE);

		// Временен файл + rename — паралелна заявка не вижда наполовина записан файл
		$tmp = self::DIR."/{$key}.".getmypid().'.tmp';
		if(@file_put_contents($tmp, $data) !== false){
			@rename($tmp, self::DIR."/{$key}.php");
		}

		// Стари публични .json (отпреди .php) — при първия запис; после glob не намира нищо
		foreach(glob(self::DIR.'/*.json') ?: [] as $legacy){
			@unlink($legacy);
		}

		if(mt_rand(1, self::SWEEP_EVERY) === 1){
			self::sweep();
		}
	}

	/**
	 * Трие целия AI кеш (напр. при запис от редактора). Връща броя изтрити файлове.
	 */
	public static function clear(): int {
		$deleted = 0;
		foreach(array_merge(glob(self::DIR.'/'.self::PAGES) ?: [], glob(self::DIR.'/*.json') ?: []) as $file){
			if(@unlink($file)){
				$deleted++;
			}
		}
		return $deleted;
	}

	/**
	 * Настройките, които cache_hit.php трябва да знае преди ядрото (вкл./изкл., ботове, TTL).
	 * Записват се от bootstrap.php след ядрото, само ако са се променили.
	 */
	public static function save_settings(array $config): void {
		$settings = [
			'enabled'        => !empty($config['enabled']),
			'maintenance'    => !empty($config['maintenance']),
			'bots'           => array_values($config['bots'] ?? []),
			'page_cache_ttl' => $config['page_cache_ttl'] ?? [],
		];

		if(self::load_settings() === $settings){
			return;
		}

		if(!is_dir(self::DIR)){
			@mkdir(self::DIR, 0755, true);
		}

		$tmp = self::DIR.'/'.self::SETTINGS_FILE.'.'.getmypid().'.tmp';
		if(@file_put_contents($tmp, self::GUARD.json_encode($settings, JSON_UNESCAPED_UNICODE)) !== false){
			@rename($tmp, self::DIR.'/'.self::SETTINGS_FILE);
		}

		// Сменени настройки в админа (TTL, ботове, вкл./изкл.) — кешираните страници са
		// записани по старите; иначе до изтичането им важат старите правила
		self::clear();
	}

	/**
	 * Последното копие на настройките или null (още няма — ползва се config.php).
	 */
	public static function load_settings(): ?array {
		$file = self::DIR.'/'.self::SETTINGS_FILE;

		return is_file($file) ? self::read($file) : null;
	}

	/**
	 * Съдържанието на кеш файл без защитния първи ред; null, ако е повредено.
	 */
	private static function read(string $file): ?array {
		$raw = (string)@file_get_contents($file);

		if(str_starts_with($raw, self::GUARD)){
			$raw = substr($raw, strlen(self::GUARD));
		}

		$data = json_decode($raw, true);
		return is_array($data) ? $data : null;
	}

	/**
	 * Трие изтеклите файлове и забравени .tmp.
	 */
	private static function sweep(): void {
		$now = time();

		// Стари публични .json от преди преминаването към .php
		foreach(glob(self::DIR.'/*.json') ?: [] as $file){
			@unlink($file);
		}

		// По възрастта на файла, без да се чете: по-стар от максималния TTL = със сигурност
		// изтекъл. По-младите изтекли се трият при четене (get()).
		foreach(glob(self::DIR.'/'.self::PAGES) ?: [] as $file){
			if(@filemtime($file) < $now - self::MAX_TTL){
				@unlink($file);
			}
		}

		foreach(glob(self::DIR.'/*.tmp') ?: [] as $file){
			if(@filemtime($file) < $now - 60){
				@unlink($file);
			}
		}
	}

}
