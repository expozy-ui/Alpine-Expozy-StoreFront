<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/**
 * Блог (или категория от блога при target_id > 0): категории, списък статии с пагинация ?page=N.
 * Параметрите на заявката са същите като в static/pages/{lang}/blog.html.
 */

$limits = AiRender::$config['limits'];
$page_no = max(1, (int)($_GET['page'] ?? 1));

$category = [];
if($page->target_id > 0){
	// Изтеглена вече в Page::load_page() — без втора заявка
	$category = $page->get_target('blogCategories', $page->target_id);

	// Несъществуваща категория — load_page() не я хваща за блога
	if(empty($category['id'])){
		$status = 404;
		echo AiRender::not_found();
		return;
	}
}

$query = ['limit' => $limits['posts_per_page'], 'page' => $page_no, 'lang' => $lang->language];
if($page->target_id > 0){
	$query['category_id'] = $page->target_id;
}

$response = Api::cache(true)->data($query)->get()->blogPosts();
$posts = AiRender::rows($response);
$total_pages = (int)($response['pagination']['total_pages'] ?? 1);

// Страница след последната → 404, а не празна страница с 200
if($page_no > 1 && !$posts){
	$status = 404;
	echo AiRender::not_found();
	return;
}

$categories = array_filter(
	AiRender::rows(Api::cache(true)->data(['lang' => $lang->language])->get()->blogCategories()),
	fn($row) => !empty($row['active']) && !empty($row['title'])
);
?>
<h1><?= AiRender::e($category['title'] ?? ($page->title ?: $page->seo_title)) ?></h1>

<?php if($categories){ ?>
<h2><?= AiRender::e(AiRender::t('categories')) ?></h2>
<ul>
<?php foreach($categories as $cat){ ?>
	<li><a href="<?= AiRender::e(AiRender::url($cat['url'] ?? '')) ?>"><?= AiRender::e($cat['title']) ?></a></li>
<?php } ?>
</ul>
<?php } ?>

<?php if(!$posts){ ?>
<p><?= AiRender::e(AiRender::t('no_posts')) ?></p>
<?php
	return;
}
?>

<?= AiRender::partial('post_list', ['posts' => $posts]) ?>

<?= AiRender::partial('pagination', ['page_no' => $page_no, 'total_pages' => $total_pages]) ?>
