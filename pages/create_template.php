<?php


define( "_VALID_PHP", true);
require_once( "../core/autoload.php");
require_once(BASEPATH . "core/classes/class.templateapi.php");


$data = json_decode(file_get_contents('php://input'), true) ?? [];


$result = TemplateApi::create($data);

http_response_code($result['code'] ?? 200);
header('Content-Type: application/json');
echo json_encode($result);