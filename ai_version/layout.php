<?php
if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

/**
 * Обвивка на всяка AI страница. Очаква $content, $status, $noindex от AiRender::run().
 */

$ai_title = $status == 404 ? AiRender::t('not_found_title')
	: ($status == 503 ? AiRender::t('maintenance_title') : $page->seo_title);
?>
<!DOCTYPE html>
<html lang="<?= AiRender::e($lang->language) ?>">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?= AiRender::e($ai_title) ?></title>
<?php if($status == 200){ ?>
	<meta name="description" content="<?= AiRender::e($page->seo_description) ?>">
	<link rel="canonical" href="<?= AiRender::e(AiRender::canonical()) ?>">
<?php foreach(AiRender::alternates() as $code => $href){ ?>
	<link rel="alternate" hreflang="<?= AiRender::e($code) ?>" href="<?= AiRender::e($href) ?>">
<?php } ?>
<?php } ?>
<?php if($noindex || $status != 200){ ?>
	<meta name="robots" content="noindex, follow">
<?php } ?>
<?php
	// JSON-LD (@graph от JsonLd през GeoOptimizer::headTags()), ако проектът го има — същият като в нормалната версия
	if($status == 200 && is_file(BASEPATH.'core/classes/class.geo_optimizer.php')){
		require_once BASEPATH.'core/classes/class.geo_optimizer.php';
		$geo = new GeoOptimizer();
		$geo->headTags();
	}
?>
	<style>
		body{font-family:system-ui,sans-serif;line-height:1.6;max-width:960px;margin:0 auto;padding:16px;color:#222}
		img{max-width:100%;height:auto}
		nav ul{padding-left:20px}
	</style>
</head>
<body>
<!--email_off--><?php /* Cloudflare не маскира имейлите тук — ботовете не изпълняват JS */ ?>

<header>
	<p><a href="<?= AiRender::e(SITEURL."/{$lang->language}/") ?>"><?= AiRender::e($core->site_name) ?></a></p>
<?php if($status != 503){ ?>
	<nav aria-label="<?= AiRender::e(AiRender::t('categories')) ?>">
		<?php
		$ai_nav = function(array $items) use (&$ai_nav){
			if(!$items) return;
			echo '<ul>';
			foreach($items as $item){
				echo '<li><a href="'.AiRender::e($item['url']).'">'.AiRender::e($item['title']).'</a>';
				$ai_nav($item['children']);
				echo '</li>';
			}
			echo '</ul>';
		};
		$ai_nav(AiRender::categories());
		?>
	</nav>
<?php } ?>
</header>

<main>
<?= $content ?>
</main>

<footer>
<?php if($status != 503){ ?>
	<nav aria-label="<?= AiRender::e(AiRender::t('information')) ?>">
		<ul>
<?php foreach(AiRender::footer_links() as $href => $text){ ?>
			<li><a href="<?= AiRender::e($href) ?>"><?= AiRender::e($text) ?></a></li>
<?php } ?>
		</ul>
	</nav>
<?php } ?>
	<p>&copy; <?= date('Y') ?> <?= AiRender::e($core->site_name) ?></p>
</footer>
<!--/email_off-->

</body>
</html>
