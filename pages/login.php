<?php

//Origin
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

$allowed_origins = [
	'https://expozy.com',
    'https://admin.expozy.com',
    'https://devadmin.expozy.com'
];

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}
//End Origin

define("_VALID_PHP", '1');
require_once '../core/autoload.php';

$route = $_POST['route']??'';


//google login
if(isset($_POST['credential']) && isset($_POST['g_csrf_token'])){
	$user->login_google($_POST['credential']);
}
 
else if( isset($_POST['token']) ) {
	//get token
	$user->loginByToken($_POST['token']);
}

else{
	die('Token Error');
}





echo"<script>
	localStorage.clear();
	localStorage.setItem('token', '{$user->token}');
	document.location.href='/".$route."';	
	</script>";



?>



