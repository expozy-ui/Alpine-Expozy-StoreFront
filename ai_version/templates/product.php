<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/**
 * Продукт: заглавие, цена, наличност, вариации, описание, снимки, отзиви, FAQ.
 * Данните са същите като в static/pages/{lang}/product.html (Shop.get_products).
 */

$limits = AiRender::$config['limits'];

// Изтеглен вече в Page::load_page() — без втора заявка
$product = $page->get_target('products', $page->target_id);

if(empty($product['id'])){
	$status = 404;
	echo AiRender::not_found();
	return;
}

$variations = $product['variations'] ?? [];
$first = $variations[0] ?? [];
$qty = array_sum(array_column($variations, 'qty'));
$category = $product['categories'][0] ?? null;
$brand = trim($product['brand']['title'] ?? '');
?>
<article>

<h1><?= AiRender::e($product['title']) ?></h1>

<?php if($category){ ?>
<p><?= AiRender::e(AiRender::t('category')) ?>: <a href="<?= AiRender::e(AiRender::url($category['url'] ?? '')) ?>"><?= AiRender::e($category['title']) ?></a></p>
<?php } ?>

<?php if($first){ ?>
<p>
	<?= AiRender::e(AiRender::t('price')) ?>: <strong><?= AiRender::e(AiRender::price($first['selling_price'] ?? $first['price'])) ?></strong>
<?php if(!empty($first['promoprice']) && $first['price'] > $first['selling_price']){ ?>
	(<?= AiRender::e(AiRender::t('old_price')) ?>: <s><?= AiRender::e(AiRender::price($first['price'])) ?></s>, -<?= round((1 - $first['selling_price'] / $first['price']) * 100) ?>%)
<?php } ?>
</p>
<?php } ?>

<p><?= AiRender::e(AiRender::t($qty > 0 ? 'in_stock' : 'out_of_stock')) ?></p>

<ul>
<?php if($brand !== ''){ ?>
	<li><?= AiRender::e(AiRender::t('brand')) ?>: <?= AiRender::e($brand) ?></li>
<?php } ?>
<?php if(!empty($first['sku'])){ ?>
	<li><?= AiRender::e(AiRender::t('sku')) ?>: <?= AiRender::e($first['sku']) ?></li>
<?php } ?>
<?php foreach($first['attributes'] ?? [] as $attr){ ?>
	<li><?= AiRender::e($attr['title'] ?? '') ?>: <?= AiRender::e($attr['values'][0]['value'] ?? '') ?></li>
<?php } ?>
</ul>

<?php if(count($variations) > 1){ ?>
<h2><?= AiRender::e(AiRender::t('variations')) ?></h2>
<ul>
<?php foreach($variations as $v){
	$v_name = trim($v['name'] ?? '');
	if($v_name === ''){
		$v_name = implode(', ', array_map(fn($a) => ($a['title'] ?? '').' '.($a['values'][0]['value'] ?? ''), $v['attributes'] ?? []));
	}
?>
	<li><?= AiRender::e($v_name ?: $v['sku'] ?? '') ?> — <?= AiRender::e(AiRender::price($v['selling_price'] ?? $v['price'])) ?>, <?= AiRender::e(AiRender::t(($v['qty'] ?? 0) > 0 ? 'in_stock' : 'out_of_stock')) ?></li>
<?php } ?>
</ul>
<?php } ?>

<?php
$description = AiRender::clean_html($product['description'] ?? '', true);
if($description !== ''){ ?>
<h2><?= AiRender::e(AiRender::t('description')) ?></h2>
<?= $description ?>
<?php } ?>

<?php
$tags = array_filter(array_map('trim', explode(',', (string)($product['tags'] ?? ''))));
if($tags){ ?>
<p><?= AiRender::e(AiRender::t('tags')) ?>: <?= AiRender::e(implode(', ', $tags)) ?></p>
<?php } ?>

<?php foreach(array_slice($product['images'] ?? [], 0, $limits['images']) as $img){
	$src = $img['url'] ?? $img['image'] ?? '';
	if($src === '') continue;
?>
<img src="<?= AiRender::e($src) ?>" alt="<?= AiRender::e($product['title']) ?>">
<?php } ?>

<?php
$reviews = array_slice(AiRender::rows(
	Api::cache(true)->data(['product_id' => $product['id'], 'lang' => $lang->language])->get()->product_comments()
), 0, $limits['reviews']);

if($reviews){ ?>
<h2><?= AiRender::e(AiRender::t('reviews')) ?></h2>
<?php foreach($reviews as $review){ ?>
<blockquote>
	<p><?= AiRender::e($review['comment'] ?? '') ?></p>
	<p>— <?= AiRender::e($review['user_name'] ?? '') ?><?php if(!empty($review['rating'])){ ?>, <?= (int)$review['rating'] ?>/5<?php } ?><?php if(!empty($review['date'])){ ?>, <?= AiRender::e($review['date']) ?><?php } ?></p>
</blockquote>
<?php } ?>
<?php } ?>

<?php
// FAQ от GeoOptimizer — същите въпроси като във FAQPage JSON-LD в <head>
require_once BASEPATH.'core/classes/class.geo_optimizer.php';
$geo = new GeoOptimizer();
$faq = $geo->generateProductFAQ($product);

if(!empty($faq['faqs'])){ ?>
<h2><?= AiRender::e($geo->t('faq_title')) ?></h2>
<?php foreach($faq['faqs'] as $item){ ?>
<h3><?= AiRender::e($item['q']) ?></h3>
<p><?= AiRender::e($item['a']) ?></p>
<?php } ?>
<?php } ?>

</article>
