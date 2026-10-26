<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/**
 * Частичен шаблон: списък статии. AiRender::partial('post_list', ['posts' => [...], 'heading' => 'h2'])
 * Ползва се от blog.php и от apiData="get.blogPosts" блоковете в страниците (виж AiRender::api_block()).
 */

$heading = $heading ?? 'h2';
$limit = AiRender::$config['limits']['description'];
?>
<ul>
<?php foreach($posts as $post){
	$date = $post['date_publish'] ?? $post['date_created'] ?? '';
	$short = AiRender::text(($post['seo_description'] ?? '') ?: (($post['description_short'] ?? '') ?: ($post['description'] ?? '')), $limit);
?>
	<li>
		<<?= $heading ?>><a href="<?= AiRender::e(AiRender::url($post['url'] ?? '')) ?>"><?= AiRender::e($post['title']) ?></a></<?= $heading ?>>
		<p>
<?php if($date !== ''){ ?>
			<?= AiRender::e(AiRender::t('published')) ?>: <time datetime="<?= AiRender::e(date('Y-m-d', strtotime($date))) ?>"><?= AiRender::e(date('d.m.Y', strtotime($date))) ?></time>
<?php } ?>
<?php if(!empty($post['category']['title'])){ ?>
			· <?= AiRender::e($post['category']['title']) ?>
<?php } ?>
		</p>
<?php if($short !== ''){ ?>
		<p><?= AiRender::e($short) ?></p>
<?php } ?>
	</li>
<?php } ?>
</ul>
