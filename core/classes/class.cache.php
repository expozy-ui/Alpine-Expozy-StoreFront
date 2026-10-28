<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/** =========================================================
 * Class Cache
 * ========================================================== */
class Cache{
	const PATH = BASEPATH."cache/";
	const EXPIRE_HOUR = 1; //in hours
	const ENDPOINTS = ['blogPosts', 'pages', 'settings', 'settings_web', 'languages', 'category', 'categories', 'organization'];

	// Файловете са .php с този първи ред: при заявка по HTTP PHP ги изпълнява и спира веднага.
	// .json се сервира направо от nginx (без .htaccess) и беше публично достъпен.
	const GUARD = "<?php exit; ?>\n";
	
	public $file;
	public $expire;
	public $result;
	public $api_url;
	public $api_method;
	public $endpoint;

	public function __construct(string $endpoint, string $url, string $method, $id=0) {
			global $lang;
			
			if($id==0){
				$tmp = explode('/', $endpoint);
				if(isset($tmp[1])){
					$endpoint = $tmp[0];
					$id=$tmp[1];
				}
			}
			$this->endpoint = $endpoint;
			
			$this->file = self::PATH."{$this->endpoint}_{$id}";
			
			if(isset($lang)){
				$this->file .= "_{$lang->language}";
			}

			// Хеш на целия URL — различни параметри (limit, filters…) = различен файл
			$this->file .= "_".substr(md5($url), 0, 12);

			$this->file .= ".php";
			
			$this->api_url = $url;
			$this->api_method = $method;
	}

	/**
	 * Трие всички кеширани отговори за endpoint + id (на даден език, ако е подаден).
	 * Името на файла съдържа хеш на URL-а, т.е. един endpoint/id има по един файл
	 * за всеки набор параметри — затова се трие по маска, а не по едно име.
	 * Връща броя изтрити файлове.
	 */
	public static function clear(string $endpoint, int|string $id = 0, string $language = ''):int{
			$base = self::PATH."{$endpoint}_{$id}".($language !== '' ? "_{$language}" : '');

			// "{$base}_*" — с хеш; .json — стари формати (без хеш / преди .php).
			// Разделителят "_" пази от съвпадение с друг id (pages_1_* не хваща pages_10_*).
			$files = array_merge(glob("{$base}_*.php") ?: [], glob("{$base}_*.json") ?: [], glob("{$base}.json") ?: []);

			$deleted = 0;
			foreach($files as $file){
				if(@unlink($file)){
					$deleted++;
				}
			}
			return $deleted;
	}

	public function save($response):bool{
			global $core;
			
			if($this->api_method !== 'GET') return false;
			if(!in_array($this->endpoint, self::ENDPOINTS)) return false;
			if(!isset($core->devMode) || $core->devMode==1) return false;
			
			$this->expire = time() + self::EXPIRE_HOUR*60*60;

			$data = ['expire' => $this->expire,	'response' => $response, 'url' => $this->api_url];

			// Старите публични .json файлове (отпреди .php) — трият се при първия запис;
			// след това glob не намира нищо и е почти безплатен
			foreach(glob(self::PATH.'*.json') ?: [] as $legacy){
				@unlink($legacy);
			}

			if(file_put_contents($this->file, self::GUARD.json_encode($data))){
				return true;
			}
			return false;
	}
	
	public function load(){
			global $core;
			
			if($this->api_method !== 'GET') return FALSE;
			if(file_exists($this->file) === false) return FALSE;
			if(isset($core->devMode) && $core->devMode) return false;
			
			$file = (string)file_get_contents($this->file);
			
			if(str_starts_with($file, self::GUARD)){
				$file = substr($file, strlen(self::GUARD));
			}
			
			$response = json_decode($file, true);
			
			if(is_array($response) && $response['expire'] > time()){
				return $response['response'];
			}

			unlink($this->file);

			return false;
	}
}