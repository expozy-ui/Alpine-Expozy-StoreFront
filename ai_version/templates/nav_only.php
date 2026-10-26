<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/**
 * Страници без съдържание за AI (кошница, вход, профил…) и временен fallback,
 * докато шаблонът на страницата не е написан. Навигацията е в layout.php.
 */
?>
<h1><?= AiRender::e($page->title ?: $page->seo_title) ?></h1>
<?php if($noindex){ ?>
<p><?= AiRender::e(AiRender::t('nav_only_text')) ?></p>
<?php } else if($page->seo_description !== '' && $page->seo_description !== $page->seo_title){ ?>
<p><?= AiRender::e($page->seo_description) ?></p>
<?php } ?>
