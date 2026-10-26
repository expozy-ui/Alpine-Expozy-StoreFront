<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/** =========================================================
 * Class FrontCore
 * ========================================================== */
class FrontCore
{

	public $id = 0;//'1';

	function __construct()
	{
		$this->get_settings();
		$this->get_id();
	}


	/** =========================================================
	 * Function : get_settings()
	 * ========================================================== */
	private function get_settings()
	{
		//$current_url = parse_url(get_url($_SERVER));
		//$current_url = 'https://' . $current_url['host'];

		// Бекендът не отговаря от по-малко от BACKEND_PAUSE сек. — не го товарим наново
		if(self::backend_down()){
			self::service_unavailable();
		}

		$rows = Api::cache(false)->get()->settings();

		// Една неуспешна заявка (мрежа, празен отговор) — опитваме още веднъж
		if(is_array($rows) === false){
			self::log_settings_error(1, $rows);
			usleep(300000);
			$rows = Api::cache(false)->get()->settings();
		}

		// Без настройки сайтът не може да работи: 503 за тази заявка и пауза, после пак
		// опит. Без DDoS флага — той оставаше включен, докато не мине човек с браузър,
		// а дотогава ботовете получаваха 403. Без redirect — Google индексира /maintenance.
		if(is_array($rows) === false ){
			self::log_settings_error(2, $rows);
			@touch(self::backend_down_file());
			self::service_unavailable();
		}

		if(is_file(self::backend_down_file())){
			@unlink(self::backend_down_file());
		}

		$this->site_id = $rows['id']?? 1;

		if(isset($rows['id'])){
			unset($rows['id']);
		} else {
			d($rows);
		}

		if($rows) {
			foreach ($rows as $key => $row) {
				$this->{$key} = $row;
			}
		}

	
		if(isset($this->core_url) === false || empty($this->core_url)){
			$this->core_url = CORE_URL;
		}
		
		
	}

	// Секунди пауза след неуспешни settings, през които всяка заявка получава 503 веднага
	private const BACKEND_PAUSE = 30;

	private static function backend_down_file():string{
		return BASEPATH.'cache/_backend_down.php';
	}

	/**
	 * Бекендът е отказал преди по-малко от BACKEND_PAUSE сек. (ползва го и Ddos::check()).
	 */
	public static function backend_down():bool{
		$file = self::backend_down_file();

		return is_file($file) && filemtime($file) > time() - self::BACKEND_PAUSE;
	}

	/**
	 * 503 „Профилактика“ на същия URL и край. Вградена страница — без настройки и без
	 * API (може да са недостъпни). Retry-After казва на ботовете кога да опитат пак.
	 */
	public static function service_unavailable():void{
		http_response_code(503);
		header('Retry-After: 60');
		header('Cache-Control: no-store');
		header('Content-Type: text/html; charset=UTF-8');

		echo '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
			.'<meta name="robots" content="noindex"><title>Профилактика / Maintenance</title>'
			.'<style>body{font-family:system-ui,sans-serif;text-align:center;margin-top:15vh;color:#444}</style></head><body>'
			.'<h1>Сайтът е в профилактика</h1><p>Моля, опитайте отново след малко.</p>'
			.'<h2>The site is under maintenance</h2><p>Please try again in a moment.</p>'
			.'</body></html>';
		exit;
	}

	/**
	 * Диагностика: какво е върнало API-то вместо настройките (в error_log на PHP).
	 * false = curl не е получил отговор; низ = отговорът не е JSON.
	 */
	private static function log_settings_error(int $attempt, mixed $rows):void{
		error_log(sprintf('[settings] опит %d неуспешен | %s %s | token:%s | %s',
			$attempt,
			$_SERVER['REQUEST_METHOD'] ?? '',
			$_SERVER['REQUEST_URI'] ?? '',
			isset($_SESSION['token']) ? 'да' : 'не',
			substr(var_export($rows, true), 0, 300)
		));
	}

	public function get_web(){
		$this->web = Api::get()->settings_web();
	}


	/** =======================================================
	 * Function : get_id()
	 * @return mixed
	========================================================== */
	private function get_id()
	{
		if (isset($_GET['id'])) {
			$id = ((int)$_GET['id']) ? (int)$_GET['id'] : false;
			$id = sanitize($id);

			if ($id == false) {
				$this->error("Invalid Method", "Core::get_id()");
			} else
				return $this->id = $id;
		}
	}


	/** =======================================================
	 * Function : error()
	 *
	 * @param $message
	 * @param $source
	========================================================== */
	public function error($message, $source)
	{
		$error_msg = '<div>';
			$error_msg .= '<span>System ERROR!</span><br />';
			$error_msg .= 'System Error : ' . $message . ' <br />';
			$error_msg .= 'More Information : <br />';
			$error_msg .= '<ul>';
				$error_msg .= '<li>Date : ' . date("F j, Y, g:i a") . '</li>';
				$error_msg .= '<li>Function : ' . $source . '</li>';
				$error_msg .= '<li>Script : ' . $_SERVER['REQUEST_URI'] . '</li>';
			$error_msg .= '</ul>';
		$error_msg .= '&lsaquo; <a href="javascript:history.go(-1)"><strong>Go Back</strong></a>';
		$error_msg .= '</div>';

		//print $error_msg;
		die($error_msg);
	}
}
?>