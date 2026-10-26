<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/** =========================================================

 * Class Editor

 * ========================================================== */

class Editor{
	public string $type = '';
	public int $id = 0;
	public string $uri = '';
	public string $slug = '';
	public string $html = '';
	public array $revisions = [] ;
	public string $title = '';
	private const TEMPLATE_TYPES = ['product', 'category', 'blog','header', 'footer' ];

	//public $page;

	/**
	 *
	 * @global \Page $page
	 * @param string $base64
	 */
	public function __construct(string $base64) {
		global $page, $user;



		if(empty($base64)) die("Parameter 'i' is missing !");

		$parameters = json_decode(base64_decode($base64), true);

		if(isset($parameters['token'])){
				$parameters['token'] = self::decrypt_token($parameters['token']);

				// Невалиден/изтекъл токен — без редактор (преди тук гърмеше с Fatal error)
				if($parameters['token'] === false){
					http_response_code(403);
					die('Токенът от линка не се разшифрова с SAAS_KEY на този сайт. [editor:decrypt]');
				}
				// Резултатът не спира редактора: при повторен запис токенът вече е ползван
				// (token_verify отказва), а потребителят е влязъл от първото отваряне — сесията стига.
				$user->loginByToken($parameters['token']);
		}
		
		$this->type = $parameters['type']??'';
		$this->id = $parameters['id']??0;

		$page->type = $parameters['type']??'';
		$page->id = $parameters['id']??0;

		if($this->type == 'post'){
			$page->target_id = $parameters['id'];
		}
		$this->load_page();
		$this->getRevisions();


	}

	/**
	 * Токенът от линка на редактора, разшифрован. false, ако не е валиден:
	 * aes-256-ctr с друг ключ не дава грешка, а двоичен боклук — той не бива да стига
	 * до сесията, иначе всяка следваща заявка към API-то пада (виж Api::valid_token()).
	 */
	public static function decrypt_token(mixed $encrypted):string|false{
		if(!is_string($encrypted) || $encrypted === ''){
			return false;
		}

		require_once(BASEPATH.'core/classes/class.cryptor.php');

		try {
			$token = Cryptor::Decrypt($encrypted, SAAS_KEY);
		} catch(\Throwable $e){
			return false;
		}

		if(!Api::valid_token($token)){
			error_log('[editor] токенът от линка не се разшифрова до валиден токен | '.($_SERVER['REQUEST_URI'] ?? ''));
			return false;
		}

		return $token;
	}

	public function getRevisions(){
		global $lang;

		$type = $this->type == 'post' ? 'blog' : 'pages';


		$revisions = Api::cache(false)->admin_api(true)->data(['type' => $type,'object_id' => $this->id, 'lang'=>$lang->language, 'limit'=>20 , 'sort'=>''])->get()->revisions();
		$this->revisions = $revisions['result']??[];
 
		//d($revisions);die();
		
	}



	public function load_page(){
		global $page;



		$page->load_page(false, false);


		$this->html = $page->html;
		$this->title = $page->title;
		if($page->type == 'post'){
			$row = Api::cache(false)->id($this->id)->data(['resolution' => '10x10'])->get()->blogPosts();

			$this->title = $row['title'];
			$this->html = $row['description'];

		}




	}




	public function save(string $html, string $language, string $css='', string $revision_title){
		global $page, $lang;
		
		
		//remoce <style> from css
		$css = str_replace(['<style>', '</style>'], '', $css);


		if(empty($language)){
			$language = $lang->language;
		}
		
		$lang->set_language($language);



		if($page->type == 'post'){

			$row = Api::data(['lang'=>$language])->redirect(false)->cache(false)->id($this->id)->get()->blogPosts();

			if($row){
				$row['html'] = $html;
				$row['css'] = $css;
				$row['revision_title'] = $revision_title;
				if(empty($row['title'])) $row['title'] = 'Blog-'.$page->id;

				// $this->id — id на статията; $page->id е 16 (шаблонът „post“), задава го load_page()
				$this->_refresh_cache('blogPosts', (int)$this->id);

				$row['cid'] = $row['category']['id'];
				// $row['combination_id'] = $row['combination']['id'];
				$row['lang']=$language;

				$result = Api::admin_api(true)->redirect(false)->data($row)->id($this->id)->post()->blogPosts();

				return $result;
			}
		} else if($page->type == 'index' || $page->type == 'header' || $page->type == 'footer'){

			if($page->type == 'header'){
				$page->id = Page::ID_HEADER;
			}
			
			if($page->type == 'footer'){
				$page->id = Page::ID_FOOTER;
			}
			
			$row = Api::data(['lang'=>$language])->cache(false)->redirect(false)->id($page->id)->get()->pages();

			if($row){

				$row['description'] = $html;
//				$row['css'] = $css;
				$row['revision_title'] = $revision_title;
				if(empty($row['title'])) $row['title'] = 'Page-'.$page->id;

				$this->_refresh_cache('pages', $page->id);



				$row['lang']=$language;

				$result = Api::admin_api(true)->redirect(false)->data($row)->id($page->id)->post()->pages();
	
				
				$template = new Template($page->type, $page->slug, $page->private);
				$template->save_html($html);
				$template->save_css($css);

				//if edit footer replace header css 
				if($page->id == Page::ID_FOOTER){
					$header_template = new Template('index', 'header');
					$header_template->save_css($css);
				}
				
				
				return $result;
			}
		}

		
		else if (in_array ($page->type, self::TEMPLATE_TYPES)){
			$template = new Template($page->type,$page->css);

			$template->save_html($html);

			return ['status' => 1];
		}


		return ['error'=>'type error: '.$page->type];


	}

	private function _refresh_cache(string $endpoint, int $id){

			// Всички кеширани варианти (различни параметри → различен хеш в името), за всички езици:
			// езикът на записа идва от ?lang= на линка към редактора, а той е езикът на админа
			// (напр. en), не непременно на съдържанието — с него списъкът на bg оставаше.
			if(!method_exists('Cache', 'clear')){
				return; // стар class.cache.php (частично качване) — без чистене, без Fatal error
			}
			Cache::clear($endpoint, $id);

			// И списъците (id 0) — иначе в „Последни статии“ и др. старото заглавие остава до изтичане на кеша
			Cache::clear($endpoint, 0);

			// Кешът на AI версията (ai_version/) — целият, ако модулът е инсталиран
			$ai_cache = BASEPATH.'ai_version/classes/class.ai_cache.php';
			if(file_exists($ai_cache)){
				require_once $ai_cache;
				AiCache::clear();
			}
	}

}
