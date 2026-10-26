# ai_version — PHP версия на страниците за AI ботове

AI ботовете (GPTBot, ClaudeBot, PerplexityBot…) не изпълняват JavaScript, а страниците
на сайта се попълват от Alpine.js в браузъра. Без JS те виждат празен скелет.

Модулът разпознава AI бота по User-Agent и му връща същото съдържание като обикновен
HTML, рендериран на сървъра. Всички останали — хора, Googlebot, Bingbot, Applebot —
получават нормалната Alpine страница (те изпълняват JS).

Alpine версията остава основната. PHP версията е базова и се пипа рядко.

---

## Как работи

```
index.php
  define("_VALID_PHP", true);
  require_once 'ai_version/cache_hit.php';   ← AI бот + готов HTML в кеша → отговор, exit
  require_once 'core/autoload.php';
  require_once 'ai_version/bootstrap.php';   ← преди $page->load_page()
  $page->load_page();                        ← нормалният поток, ако не е AI бот
```

`cache_hit.php` (преди ядрото): ако е AI бот и за този URL има неизтекъл HTML в
`cache/`, го връща с `X-AI-Cache: HIT` — без нито една заявка към API-то.
Иначе продължава нормално.

`bootstrap.php`:
1. `config.enabled` е false или User-Agent не е от `config.bots` → `return`, нищо не се променя.
2. Поддръжка (maintenance) → 503.
3. `$page->load_page(true, false)` — с кеш и **без** redirect към /404.
4. Липсваща страница → 404 (директно, без redirect).
5. Slug в `config.noindex` (кошница, вход…) → `nav_only.php` + `noindex`.
6. Иначе шаблонът от `config.templates[slug]`, а ако няма — `page.php`.
7. Заглавки: `Vary: User-Agent`, `Cache-Control: no-store`, `X-AI-Version: 1`, `X-AI-Cache: MISS`.
8. `layout.php` около шаблона: `<head>` (мета, canonical, hreflang, JSON-LD от
   `GeoOptimizer`), навигация с категориите, footer с линковете от редактора.
9. Статус 200 → HTML-ът се записва в `cache/` за `config.page_cache_ttl` секунди.
10. Ред в `logs/YYYY-MM.log`: дата | бот | URL | статус | ms | HIT/MISS.

## Структура

```
ai_version/
  .htaccess              директен достъп забранен (освен llms_txt.php)
  config.php             всичко, което се различава между проектите
  cache_hit.php          готов HTML от кеша — преди core/autoload.php
  bootstrap.php          входна точка (рендер)
  layout.php             <html> обвивка
  llms_txt.php           /llms.txt и /llms-full.txt
  classes/
    class.ai_bot.php     AiBot — разпознаване, заглавки, лог (без ядрото)
    class.ai_cache.php   AiCache — кешът на готовия HTML + копието на настройките (без ядрото)
    class.ai_render.php  AiRender — поток и помощни функции
  templates/
    page.php             общ шаблон: HTML от редактора, изчистен от Alpine
    product.php          продукт
    products.php         категория (списък продукти + пагинация)
    blog.php             блог / категория от блога
    post.php             статия
    nav_only.php         страници без съдържание за AI (noindex)
    404.php, maintenance.php
    _product_list.php    частични шаблони (AiRender::partial)
    _post_list.php
    _pagination.php
  lang/bg.php, en.php    етикети
  logs/                  създава се автоматично (в .gitignore)
  cache/                 създава се автоматично (в .gitignore)
```

Извън папката модулът ползва:
- `core/classes/class.geo_optimizer.php` — JSON-LD в `<head>` и FAQ на продукта
  (ползва се и от нормалната версия, затова е в core).
- `core/sitemaps/robots_txt_generator.php` — `/robots.txt` със `Sitemap:` реда.

---

## Инсталация в нов проект

1. Копирай папката `ai_version/`.
2. В `index.php` — два реда:
   ```php
   define( "_VALID_PHP", true);

   // AI ботове: готов HTML от кеша, преди ядрото — без заявки към API-то (ai_version/README.md)
   require_once 'ai_version/cache_hit.php';

   require_once( "core/autoload.php");
   ...
   // AI ботове получават PHP версията на страницата (ai_version/README.md)
   require_once 'ai_version/bootstrap.php';

   $page->load_page();
   ```
3. В основния `.htaccess`, в `<IfModule mod_rewrite.c>`:
   ```
   RewriteRule ^robots\.txt$ /core/sitemaps/robots_txt_generator.php [L]
   RewriteRule ^llms\.txt$ /ai_version/llms_txt.php [L,QSA]
   RewriteRule ^llms-full\.txt$ /ai_version/llms_txt.php?full=1 [L,QSA]
   ```
   и копирай `core/sitemaps/robots_txt_generator.php`, ако го няма.
4. В `.gitignore`: `/ai_version/logs/` и `/ai_version/cache/`.
5. **Ядрото (`core/` и др.)** — ако проектът е от текущия официален фронтенд,
   всичко по-долу вече е там. Иначе пренеси промените от него:

   | Файл | Какво |
   |---|---|
   | `core/classes/class.page.php` | `$target` / `set_target()` / `get_target()`; 404 при липсваща статия и категория от блога |
   | `core/classes/class.geo_optimizer.php` | `normalizeProduct()` (цена/наличност от вариациите), `plainText()`, валута на магазина, JSON-LD на началната, `get_target()` |
   | `core/classes/class.cache.php` | хеш на URL-а в ключа, `Cache::clear()` по маска, `categories` в ENDPOINTS, файлове `.php` със защитен ред |
   | `core/classes/class.editor.php` | `_refresh_cache()` → `Cache::clear()` (обект + списъци, всички езици) и `AiCache::clear()`; `decrypt_token()` |
   | `core/classes/class.api.php` | `valid_token()` — повреден токен не влиза в заглавката |
   | `editor/cb/editor.php` | 403 при неразшифруем токен |
   | `core/sitemaps/robots_txt_generator.php` | `/robots.txt` със `Sitemap:` |
   | `cache/.htaccess`, `.htaccess` | без публичен достъп до кеша и `error_log` / `*.log` |

   Не са нужни за AI версията, но пазят сайта: `class.core.php` (повторен опит
   за `settings`), `class.users.php` (без Fatal error при невалиден отговор).
6. Прегледай `config.php` (виж по-долу) и `lang/*.php` — `llms_intro` описва
   сайта („онлайн магазин“) и трябва да отговаря на проекта.
7. Тествай (виж „Тестване“).

Изключване без махане на кода: `'enabled' => false` в `config.php`.

## config.php

| Ключ | Какво |
|---|---|
| `enabled` | вкл./изкл. — **админът има предимство** (виж по-долу) |
| `preview_ua` | тестов User-Agent (`ExpozyAIPreview`): AI версията и при изключен модул, без кеш — за проверка на живия сайт преди включване |
| `languages` | езиците със съдържание (hreflang, кеш, llms.txt); празно = всички от бекенда |
| `nav_categories` | категориите на магазина в навигацията и llms.txt; `false` за проект без магазин |
| `cache_params` | GET параметри, които сменят съдържанието (напр. `'vehicle' => ['moto','truck']`) → влизат в ключа на кеша и в линковете на пагинацията |
| `price_templates` | шаблоните с цени — за тях важи „кеш за продукти и категории“ от админа |
| `llms_sections` | списъците в `/llms.txt`: endpoint, етикет, ред = `templates/_llms_{line}.php`, параметри, страници |
| `bots` | части от User-Agent на AI ботовете — **админът има предимство** |
| `templates` | slug → шаблон (`'product' => 'product'` = `templates/product.php`) |
| `api_blocks` | apiData endpoint → [частичен шаблон, име на променлива] — виж по-долу |
| `noindex` | slug-ове само с навигация + `noindex` |
| `nav_exclude` | служебни страници извън навигацията (fallback при празен footer) |
| `limits` | продукти/статии на страница, снимки, отзиви, дължина на описанията |
| `page_cache_ttl` | секунди кеш на готовия HTML по шаблон, `'*'` — останалите; 0 = без кеш — **админът има предимство** за `product`/`products` и `'*'` |
| `log` | вкл./изкл. лога |

## Управление от админа („AI видимост“)

devadmin → Settings → App Store → AI → **„AI видимост“**: вкл./изкл., кеш за продукти
и категории, кеш за останалите (0–3600 сек.), списъкът с ботове (само за четене —
поддържа се в кода на devcore, един за всички проекти).

Бекендът ги връща в `GET /api/settings`, който фронтендът и без това чете при всяка
заявка → в `$core` (без нови заявки):

| Поле в `$core` | Замества в `config.php` |
|---|---|
| `ai_version_enabled` (0/1) | `enabled` |
| `ai_version_bots` (масив) | `bots` |
| `ai_cache_ttl_product` (сек.) | `page_cache_ttl['product']` и `['products']` |
| `ai_cache_ttl_default` (сек.) | `page_cache_ttl['*']` |

- Липсващо поле (бекенд без тази функция) → стойността от `config.php`.
- `AiBot::apply_settings()` прави замяната; `bootstrap.php` записва копие в
  `cache/_settings.php` за `cache_hit.php`, който работи преди ядрото и няма `$core`.
  Копието се презаписва само при промяна → смяна в админа влиза при следващото
  отваряне на която и да е страница. При промяна целият AI кеш се изтрива —
  кешираните страници са по старите правила (напр. по-дълъг TTL).
- **Google, Bing, Apple никога не получават AI версията** (`AiBot::PROTECTED`) —
  изпълняват JS, а различно съдържание за тях е cloaking. Проверява се преди списъка
  с ботове; низ от списъка, който съвпада със защитен, или е под 4 символа, се пропуска.
  Същият списък е и в бекенда.

## page.php и apiData блоковете

Страница без собствен шаблон (вкл. началната) минава през `page.php`:
HTML-ът от редактора (`static/pages/{lang}/{slug}.html`) се чисти от
`AiRender::clean_html()`:
- махат се `script`, `style`, `template`, `svg`, формите, `iframe` и елементите
  с `x-text` / `x-html` (временен текст, който Alpine подменя);
- остават заглавия, параграфи, списъци, линкове, снимки, таблици — без класове;
- `div` / `span` / `section` се разопаковат, празните елементи се махат;
- относителните линкове и снимки стават абсолютни.

**apiData блокове.** Елемент с `apiData="get.products"` (или друг endpoint от
`config.api_blocks`) се изпълнява на сървъра със същите `data-*` параметри
(`data-limit`, `data-sort`…) и списъкът застава на мястото на
`<template x-for="… in data.{keyName}…">`. Затова началната страница няма отделен
шаблон — секциите „Продукти в промоция“, „Нови продукти“ и т.н. идват от редактора.

Блок с endpoint, който не е в `api_blocks`, се маха. Динамичните параметри
(`:data-category_id="..."`) не се пренасят — само статичните `data-*`.

---

## Нов тип страница (хотел, обява, аукцион…)

Пример: страница `/bg/hotel/12-grand-hotel`, данни от `get.hotels/{id}`.

1. **Шаблон** `templates/hotel.php`:
   ```php
   <?php
   if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); }

   // Изтеглен вече в Page::load_page() (стъпка 2) — без втора заявка
   $hotel = $page->get_target('hotels', $page->target_id);

   if(empty($hotel['id'])){
       $status = 404;
       echo AiRender::not_found();
       return;
   }
   ?>
   <article>
   <h1><?= AiRender::e($hotel['title']) ?></h1>
   <p><?= AiRender::e($hotel['address'] ?? '') ?></p>
   <?= AiRender::clean_html($hotel['description'] ?? '', true) ?>
   </article>
   ```
   Показвай **същите данни като Alpine страницата** — отвори
   `static/pages/{lang}/hotel.html` и виж кои полета се показват.
2. **`core/classes/class.page.php` → `load_page()`** — клонът за новия slug (той е
   и SEO огледалото от раздел 23 на `frontend_framework.md`). Запази обекта, за да
   го ползват шаблонът и `GeoOptimizer` без втора заявка:
   ```php
   if($this->slug == 'hotel' && $this->target_id > 0){
       $target = Api::cache($cache)->id($this->target_id)->get()->hotels();
       $this->set_target('hotels', $target);
       if(!empty($target['id'])){
           // seo_title / seo_description / seo_image … (раздел 23)
       } else {
           $this->error404 = true;
       }
   }
   ```
3. **config.php**: `'hotel' => 'hotel',` в `templates`.
4. **lang/*.php**: новите етикети.
5. Ако страницата има списък от хотели в редактора (`apiData="get.hotels"`):
   частичен шаблон `templates/_hotel_list.php` (по образец на `_product_list.php`)
   и `'hotels' => ['hotel_list', 'hotels'],` в `api_blocks`.
6. **`components/core/classes/page.js` → `updateMeta()`** — клиентската половина на
   SEO огледалото (раздел 23 във `frontend_framework.md`).
7. Тествай.

Шаблоните на магазина (`product.php`, `products.php`) могат да останат в папката —
ползват се само ако slug-ът е в `config.templates`.

## Помощни функции (AiRender)

| Функция | Какво |
|---|---|
| `e($v)` | htmlspecialchars — за всеки изход в HTML |
| `t($key)` | етикет от `lang/{език}.php`, fallback EN |
| `url($url)` | URL от API-то → със SITEURL на текущия сайт |
| `price($amount)` | „40.00 €“ с валутата по подразбиране |
| `text($html, $limit)` | HTML → един ред текст, отрязан до $limit |
| `rows($response)` | отговор на API → масив от редове (плосък или `{result}`) |
| `clean_html($html, $demote_h1)` | HTML от редактора → чист HTML; `true` прави h1 → h2 |
| `partial($name, $vars)` | `templates/_{name}.php` с променливи |
| `not_found()` | съдържанието на 404 (с `$status = 404;` в шаблона) |
| `page_url($n)` | линк към страница N от пагинацията |
| `categories()`, `footer_links()`, `alternates()` | навигация, footer, hreflang |

В шаблоните са достъпни `$page`, `$lang`, `$core`, `$status`, `$noindex`.
`$status = 404;` в шаблон сменя HTTP статуса.

---

## Тестване

```bash
# AI версия (X-AI-Version: 1)
curl -s -D - -A "Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)" https://ДОМЕЙН/bg/product/4-x.html

# Нормалната версия — без промяна, без X-AI-Version
curl -s -D - -o /dev/null https://ДОМЕЙН/bg/product/4-x.html
```

Проверки:
- статус 200 / 404 (несъществуващ обект) / 503 (поддръжка);
- в `<main>` няма Alpine атрибути: `grep -c ' x-\|@click\|:href'` = 0;
- данните (цена, наличност, текст) съвпадат с Alpine страницата;
- няма PHP грешки (`Fatal error`, `Warning`);
- `/robots.txt`, `/llms.txt`, `/llms.txt?lang=en`.

**Кешът при тестване.** След промяна по шаблон, `config.php`, `lang/*.php` или
директно по `static/pages/*.html` кешът НЕ се чисти (чисти се само при запис от
редактора) и curl може да върне `X-AI-Cache: HIT` със старото съдържание до
5–15 мин. Изтрий `ai_version/cache/*.php` или изчакай. `MISS` = току-що рендерирано.

## Кеш на готовия HTML

Предпазна мрежа срещу масово обхождане, не основен механизъм. Данните на продукта
не се кешират — в една заявка се теглят веднъж (`Page::$target`); кешира се целият
готов AI HTML за кратко.

- TTL по шаблон в `config.page_cache_ttl`: продукт и категория 5 мин. (там са
  цените), останалите 15 мин. `0` или празно — изключено.
- Ключ: пътят + `?page=N` + езикът от `$_GET['lang']`. Другите параметри се
  игнорират, User-Agent — също.
- Записва се само ако `AiCache::cacheable()`: езикът е префиксът на пътя (без
  `?lang=` отгоре) и е език на сайта; `page` е цяло число 1–500. Иначе страницата
  се рендерира без кеш — измислени стойности не пълнят папката и не отравят кеша.
- Страница от пагинацията след последната → 404 (не се кешира).
- Кешира се само 200. Файлове в `cache/` като `.php` с първи ред `<?php exit; ?>` —
  не `.json`, защото nginx сервира `.json` директно, без `.htaccess`, и те бяха
  публични. Същото важи за кеша на API-то в `/cache/` (`core/classes/class.cache.php`).
  Атомичен запис; изтеклите се трият при четене и на всеки ~100 записа.
- Запис от редактора (страница/статия) трие целия AI кеш, а в кеша на API-то —
  обекта и списъците му (`{endpoint}_{id}_…` и `{endpoint}_0_…`):
  `Editor::_refresh_cache()` → `AiCache::clear()` и `Cache::clear()`.
- Цени и наличност, сменени в админа на бекенда, се виждат след изтичане на TTL.
- **Режим на поддръжка:** влиза в копието на настройките — `cache_hit.php` не връща
  кеширани страници, а AI версията отговаря с 503; смяната на режима трие AI кеша.
- **Компромис:** при попадение в кеша DDoS проверката се пропуска до изтичането му —
  проверката е преди `core/autoload.php`.
- Тест: втората заявка с бот User-Agent трябва да е `X-AI-Cache: HIT`.
- Не в Cloudflare — той не разделя кеша по `Vary: User-Agent`.

## Cloudflare

- **Security → Bots**: „Block AI bots“ трябва да е изключено, иначе ботовете не
  стигат до сайта.
- HTML не се кешира (`cf-cache-status: DYNAMIC`). Ако някога се включи
  „Cache Everything“, AI версията трябва да се изключи от кеша — Cloudflare не
  разделя кеша по `Vary: User-Agent`.
- Email Address Obfuscation: AI версията е обградена с `<!--email_off-->`, за да
  виждат ботовете имейлите.

