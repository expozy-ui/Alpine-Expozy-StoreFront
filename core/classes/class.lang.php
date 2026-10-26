<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/** =========================================================
 * Class Lang
 * ========================================================== */
class Lang
{

	public string $language = 'en';
	public array $langlist = [];

	const DEF_LANG = 'bg';


	function __construct()
	{
		$this->get_language();
	}

	/** =========================================================
	 * Function : get_language()
	 * ========================================================== */
    public function get_language()
    {
        global $core;

		// Езикът влиза в пътища на файлове (шаблони, кеш, езикови файлове) — приемаме само
		// код от две малки латински букви; иначе (напр. ?lang=../..) — езикът по подразбиране
		if(isset($_GET['lang']) && self::valid_code(get('lang'))){
				$this->language = get('lang');
				$_SESSION['LANG_'. APP_NAME] =  get('lang');

        } else {
			$this->language = $core->lang??self::DEF_LANG;
		}

    }
	
	public function set_language(string $lang)
    {
        global $core;

		if(!self::valid_code($lang)){
			return;
		}

		$this->language = $lang;
		$_SESSION['LANG_'. APP_NAME] =  $lang;
    }

	/**
	 * Код на език, годен за път на файл: точно две малки латински букви (bg, en, ro…).
	 */
	public static function valid_code(mixed $code):bool
	{
		return is_string($code) && preg_match('/^[a-z]{2}$/', $code) === 1;
	}

	/** =========================================================
	 * Function : langList()
	 * @return array|int
	========================================================== */
	public function lang_list()
	{
		$row = Api::get()->languages();

		return ($row) ? $this->langlist = $row : [];
	}

}
?>
