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

		if(isset($_GET['lang'])){
				if(get('lang')){
						$this->language = get('lang');
						$_SESSION['LANG_'. APP_NAME] =  get('lang');
				}

        } else {
			$this->language = $core->lang??self::DEF_LANG;
		}

    }
	
	public function set_language(string $lang)
    {
        global $core;

		$this->language = $lang;
		$_SESSION['LANG_'. APP_NAME] =  $lang;
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
