<?php
/*
AI page editing.

1. The current page HTML is written to a temp file.
2. The chat history (messages) and the temp file are sent to the core.
3. The HTML returned by the core is written back to the temp file and
   returned to the editor, which loads it.

The core decides which model to use. No images, only page editing.
*/
define( "_VALID_PHP", true);
require_once '../../../core/autoload.php';

header('Content-Type: application/json');
set_time_limit(300);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	die(json_encode(['status' => 0, 'error' => 'POST only']));
}

$data = json_decode(file_get_contents('php://input'), true);

if (!is_array($data) || empty($data['get']['i'])) {
	die(json_encode(['status' => 0, 'error' => 'Received JSON is improperly formatted']));
}

$messages = $data['messages'] ?? [];
$html = $data['html'] ?? '';
$get = $data['get'];

// AI level, chosen in the editor panel:
//   1 = text and images only (contentbox-spec-basic.md)
//   2 = full ContentBox spec: sliders, animations, plugins (contentbox-spec.md)
//   3 = dynamic sections bound to the Expozy core (apiData + Alpine)
$level = (int)($data['level'] ?? 1);
if (!in_array($level, [1, 2, 3], true)) $level = 1;

if (!is_array($messages) || count($messages) === 0) {
	die(json_encode(['status' => 0, 'error' => 'messages must be a non-empty array']));
}

// Keep only role + text content, the core gets a clean history.
$messages = array_values(array_filter(array_map(function ($m) {
	$role = $m['role'] ?? '';
	$content = $m['content'] ?? '';
	if (!in_array($role, ['user', 'assistant'], true) || !is_string($content) || $content === '') return null;
	return ['role' => $role, 'content' => $content];
}, $messages)));

if (count($messages) === 0) {
	die(json_encode(['status' => 0, 'error' => 'messages must be a non-empty array']));
}

$editor = new Editor($get['i']);

// Temp file: one per page and session.
$tmpDir = __DIR__ . '/../tmp/';
if (!is_dir($tmpDir)) mkdir($tmpDir, 0755, true);

$tmpName = md5($get['i'] . session_id()) . '.html';
$tmpPath = $tmpDir . $tmpName;
$tmpUrl = SITEURL . '/editor/cb/tmp/' . $tmpName;

if (file_put_contents($tmpPath, $html) === false) {
	die(json_encode(['status' => 0, 'error' => 'Could not write the temp file']));
}

$response = Api::admin_api(true)->data([
	'messages' => $messages,
	'file' => $tmpUrl,
	'page_type' => $page->type ?? '',
	'page_slug' => $page->slug ?? '',
	'lang' => $get['lang'] ?? '',
	'level' => $level,
])->post()->ai_edit_page();




if (!is_array($response) || ($response['status'] ?? 0) != 1 || !isset($response['html'])) {
	die(json_encode([
		'status' => 0,
		'error' => $response['error'] ?? $response['msg'] ?? 'Invalid response from the core',
		'response' => $response,
	], JSON_UNESCAPED_UNICODE));
}

file_put_contents($tmpPath, $response['html']);

echo json_encode([
	'status' => 1,
	'html' => $response['html'],
	'message' => $response['message'] ?? '',
], JSON_UNESCAPED_UNICODE);
