<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/**
 * Частичен шаблон: пагинация ?page=N. AiRender::partial('pagination', ['page_no' => 2, 'total_pages' => 5])
 */

if($total_pages <= 1){
	return;
}
?>
<nav>
	<p><?= AiRender::e(sprintf(AiRender::t('page_of'), $page_no, $total_pages)) ?></p>
<?php if($page_no > 1){ ?>
	<a href="<?= AiRender::e(AiRender::page_url($page_no - 1)) ?>" rel="prev"><?= AiRender::e(AiRender::t('prev_page')) ?></a>
<?php } ?>
<?php if($page_no < $total_pages){ ?>
	<a href="<?= AiRender::e(AiRender::page_url($page_no + 1)) ?>" rel="next"><?= AiRender::e(AiRender::t('next_page')) ?></a>
<?php } ?>
</nav>
