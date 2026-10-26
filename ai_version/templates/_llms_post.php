<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/**
 * Един ред в llms.txt за статия (config.llms_sections → 'line' => 'post').
 * Получава $row — статия от API-то.
 */

$short = AiRender::text(($row['seo_description'] ?? '') ?: (($row['description_short'] ?? '') ?: ($row['description'] ?? '')), AiRender::$config['limits']['description']);

echo "- [{$row['title']}](".AiRender::url($row['url'] ?? '').')'.($short !== '' ? ": {$short}" : '')."\n";
