<?php
define( "_VALID_PHP", true);

// AI ботове: готов HTML от кеша, преди ядрото — без заявки към API-то (ai_version/README.md)
if(is_file('ai_version/cache_hit.php')) require_once 'ai_version/cache_hit.php';

require_once( "core/autoload.php");


foreach ($_GET as $key => $param) {
  if(is_array($_GET[$key])){
    $_GET[$key.'[]'] = $_GET[$key];
    unset($_GET[$key]);
  }
}

// AI ботове получават PHP версията на страницата (ai_version/README.md)
if(is_file('ai_version/bootstrap.php')) require_once 'ai_version/bootstrap.php';

$page->load_page();

// Режим на поддръжка: 503 на същия URL (FrontCore::service_unavailable), без DDoS флага (той оставаше включен и след
// изключване на поддръжката) и без redirect към /maintenance (вреди на индексирането)
if($core->maintenance_mode == 1 && $page->slug!='demo' && !isset($_SESSION['mainanceMode'])){
			FrontCore::service_unavailable();
}



if($core->web['marketing']['google_analytics_active']){
  $core->web['scripts']['header'] .= $core->web['marketing']['google_analytics_script'];
}

if($core->web['marketing']['yandex_active']){
  $core->web['scripts']['header'] .= $core->web['marketing']['yandex_script'];
}
if($core->web['marketing']['fb_pixel_active']){
  $core->web['scripts']['header'] .= $core->web['marketing']['fb_pixel_script'];
}


require_once 'pages/header.php';

include 'pages/index.php';


require_once 'pages/footer.php';
