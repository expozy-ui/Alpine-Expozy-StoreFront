<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/**
 * Категория (или всички продукти при target_id 0): описание, подкатегории,
 * списък продукти с пагинация ?page=N.
 * Параметрите на заявката са същите като в static/pages/{lang}/products.html.
 */

$limits = AiRender::$config['limits'];
$page_no = max(1, (int)($_GET['page'] ?? 1));

$category = [];
if($page->target_id > 0){
	// Изтеглена вече в Page::load_page() — без втора заявка
	$category = $page->get_target('categories', $page->target_id);

	if(empty($category['id'])){
		$status = 404;
		echo AiRender::not_found();
		return;
	}
}

$response = Api::cache(true)->data([
	'category_id'   => $page->target_id,
	'subcategories' => 'true',
	'only_instock'  => 0,
	'limit'         => $limits['products_per_page'],
	'page'          => $page_no,
	'lang'          => $lang->language,
])->get()->products();

$products = AiRender::rows($response);
$pagination = $response['pagination'] ?? [];
$total_pages = (int)($pagination['total_pages'] ?? 1);

// Страница след последната → 404, а не празна страница с 200
if($page_no > 1 && !$products){
	$status = 404;
	echo AiRender::not_found();
	return;
}

// Подкатегориите — от същия (кеширан) списък като навигацията
$subcategories = array_filter(
	AiRender::rows(Api::cache(true)->data(['limit' => 100, 'lang' => $lang->language])->get()->categories()),
	fn($row) => !empty($row['active']) && (int)($row['parent_id'] ?? -1) === (int)$page->target_id
);
?>
<?php if(!empty($category['parents'])){ ?>
<p>
<?php foreach($category['parents'] as $parent){ ?>
	<a href="<?= AiRender::e(AiRender::url($parent['url'] ?? '')) ?>"><?= AiRender::e($parent['title'] ?? '') ?></a> ›
<?php } ?>
	<?= AiRender::e($category['title'] ?? '') ?>
</p>
<?php } ?>

<h1><?= AiRender::e($category['title'] ?? AiRender::t('all_products')) ?></h1>

<?php
$description = AiRender::clean_html($category['description'] ?? '', true);
if($description !== ''){
	echo $description;
}
?>

<?php if($subcategories){ ?>
<h2><?= AiRender::e(AiRender::t($page->target_id > 0 ? 'subcategories' : 'categories')) ?></h2>
<ul>
<?php foreach($subcategories as $sub){ ?>
	<li><a href="<?= AiRender::e(AiRender::url($sub['url'] ?? '')) ?>"><?= AiRender::e($sub['title']) ?></a></li>
<?php } ?>
</ul>
<?php } ?>

<?php if(!$products){ ?>
<p><?= AiRender::e(AiRender::t('no_products')) ?></p>
<?php
	return;
}
?>

<p><?= AiRender::e(sprintf(AiRender::t('products_count'), (int)($pagination['total_results'] ?? count($products)))) ?></p>

<?= AiRender::partial('product_list', ['products' => $products]) ?>

<?= AiRender::partial('pagination', ['page_no' => $page_no, 'total_pages' => $total_pages]) ?>
