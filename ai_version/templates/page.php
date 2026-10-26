<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/**
 * Общ шаблон — съдържанието на страницата от редактора, изчистено от Alpine.
 * Ползва се за всяка страница без собствен шаблон в config.php.
 */

$ai_body = AiRender::clean_html($page->html);

if(stripos($ai_body, '<h1') === false){ ?>
<h1><?= AiRender::e($page->title ?: $page->seo_title) ?></h1>
<?php }

if($ai_body !== ''){
	echo $ai_body;
} else if($page->seo_description !== '' && $page->seo_description !== $page->seo_title){ ?>
<p><?= AiRender::e($page->seo_description) ?></p>
<?php }
