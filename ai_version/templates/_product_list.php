<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/**
 * Частичен шаблон: списък продукти. AiRender::partial('product_list', ['products' => [...], 'heading' => 'h2'])
 * Ползва се от products.php и от apiData="get.products" блоковете в страниците (виж AiRender::api_block()).
 */

$heading = $heading ?? 'h2';
$limit = AiRender::$config['limits']['description'];
?>
<ul>
<?php foreach($products as $product){
	$first = $product['variations'][0] ?? [];
	$qty = array_sum(array_column($product['variations'] ?? [], 'qty'));
	$short = AiRender::text(!empty($product['seo_description']) ? $product['seo_description'] : ($product['description'] ?? ''), $limit);
?>
	<li>
		<<?= $heading ?>><a href="<?= AiRender::e(AiRender::url($product['url'] ?? '')) ?>"><?= AiRender::e($product['title']) ?></a></<?= $heading ?>>
		<p>
<?php if($first){ ?>
			<?= AiRender::e(AiRender::t('price')) ?>: <strong><?= AiRender::e(AiRender::price($first['selling_price'] ?? $first['price'])) ?></strong>
<?php if(!empty($first['promoprice']) && $first['price'] > $first['selling_price']){ ?>
			(<?= AiRender::e(AiRender::t('old_price')) ?>: <s><?= AiRender::e(AiRender::price($first['price'])) ?></s>)
<?php } ?>
			·
<?php } ?>
			<?= AiRender::e(AiRender::t($qty > 0 ? 'in_stock' : 'out_of_stock')) ?>
		</p>
<?php if($short !== ''){ ?>
		<p><?= AiRender::e($short) ?></p>
<?php } ?>
	</li>
<?php } ?>
</ul>
