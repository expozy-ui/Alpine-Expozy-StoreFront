<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/**
 * Един ред в llms.txt за продукт (config.llms_sections → 'line' => 'product').
 * Получава $row — продукт от API-то.
 */

$first = $row['variations'][0] ?? [];
$qty = array_sum(array_column($row['variations'] ?? [], 'qty'));
$short = AiRender::text(!empty($row['seo_description']) ? $row['seo_description'] : ($row['description'] ?? ''), AiRender::$config['limits']['description']);

$meta = [];
if($first){
	$meta[] = AiRender::t('price').': '.AiRender::price($first['selling_price'] ?? $first['price']);
}
$meta[] = AiRender::t($qty > 0 ? 'in_stock' : 'out_of_stock');
if(!empty($row['brand']['title'])){
	$meta[] = AiRender::t('brand').': '.$row['brand']['title'];
}

echo "- [{$row['title']}](".AiRender::url($row['url'] ?? '').') — '.implode(' · ', $meta);
echo $short !== '' ? "\n  {$short}\n" : "\n";
