<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/**
 * Статия от блога: заглавие, дата, категория, снимка, пълен текст, етикети,
 * свързани статии, коментари. Данните са същите като в static/pages/{lang}/post.html.
 */

$limits = AiRender::$config['limits'];

// Изтеглена вече в Page::load_page() — без втора заявка
$post = $page->get_target('blogPosts', $page->target_id);

if(empty($post['id'])){
	$status = 404;
	echo AiRender::not_found();
	return;
}

$date = $post['date_publish'] ?? $post['date_created'] ?? '';
$image = $post['images'][0]['url'] ?? '';
?>
<article>

<h1><?= AiRender::e($post['title']) ?></h1>

<p>
<?php if($date !== ''){ ?>
	<?= AiRender::e(AiRender::t('published')) ?>: <time datetime="<?= AiRender::e(date('Y-m-d', strtotime($date))) ?>"><?= AiRender::e(date('d.m.Y', strtotime($date))) ?></time>
<?php } ?>
<?php if(!empty($post['category']['title'])){ ?>
	· <a href="<?= AiRender::e(AiRender::url($post['category']['url'] ?? '')) ?>"><?= AiRender::e($post['category']['title']) ?></a>
<?php } ?>
	· <?= AiRender::e(sprintf(AiRender::t('read_time'), max(1, (int)($post['read_time'] ?? 1)))) ?>
</p>

<?php if($image !== ''){ ?>
<img src="<?= AiRender::e($image) ?>" alt="<?= AiRender::e($post['title']) ?>">
<?php } ?>

<?= AiRender::clean_html($post['description'] ?? '', true) ?>

<?php
$tags = array_filter(array_map('trim', is_array($post['tags'] ?? null) ? $post['tags'] : explode(',', (string)($post['tags'] ?? ''))));
if($tags){ ?>
<p><?= AiRender::e(AiRender::t('tags')) ?>: <?= AiRender::e(implode(', ', $tags)) ?></p>
<?php } ?>

<?php
$related = array_filter($post['related_posts'] ?? [], fn($row) => is_array($row) && !empty($row['title']));
if($related){ ?>
<h2><?= AiRender::e(AiRender::t('related_posts')) ?></h2>
<ul>
<?php foreach($related as $row){ ?>
	<li><a href="<?= AiRender::e(AiRender::url($row['url'] ?? '')) ?>"><?= AiRender::e($row['title']) ?></a></li>
<?php } ?>
</ul>
<?php } ?>

<?php
$comments = array_slice(AiRender::rows(
	Api::cache(true)->data(['subject_id' => $post['id'], 'lang' => $lang->language])->get()->blog_comments()
), 0, $limits['reviews']);

if($comments){ ?>
<h2><?= AiRender::e(AiRender::t('comments')) ?></h2>
<?php foreach($comments as $comment){ ?>
<blockquote>
	<p><?= AiRender::e($comment['comment'] ?? '') ?></p>
	<p>— <?= AiRender::e($comment['user_name'] ?? '') ?><?php if(!empty($comment['date'])){ ?>, <?= AiRender::e($comment['date']) ?><?php } ?></p>
</blockquote>
<?php } ?>
<?php } ?>

</article>
