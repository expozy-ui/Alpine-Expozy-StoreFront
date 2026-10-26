<?php
/**
 * ============================================================
 * ROBOTS.TXT GENERATOR
 * ============================================================
 * Достъпен на: https://yourdomain.com/robots.txt
 * .htaccess: RewriteRule ^robots\.txt$ /core/sitemaps/robots_txt_generator.php [L]
 *
 * Генерира се, за да съдържа Sitemap с домейна на текущия проект.
 * AI ботовете (GPTBot, ClaudeBot, PerplexityBot…) попадат в общата група
 * и имат достъп до целия сайт.
 * ============================================================
 */

define("_VALID_PHP", true);
require_once __DIR__ . '/../autoload.php';

header('Content-Type: text/plain; charset=UTF-8');

echo "User-agent: *\n";
echo "Disallow: /cache/*\n";
echo "Disallow: /components/*\n";
echo "Disallow: /core/*\n";
echo "Disallow: /static/*\n";
echo "Allow: /llms.txt\n";
echo "Allow: /llms-full.txt\n";
echo "\n";
echo "Sitemap: " . SITEURL . "/sitemap\n";
