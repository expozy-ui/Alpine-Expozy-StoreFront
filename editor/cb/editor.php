<?php

if(session_id() == '') session_start();

if(!isset($_GET['i'])) die();

define( "_VALID_PHP", true);
require_once '../../core/autoload.php';

$parameters = json_decode(base64_decode($_GET['i'] ?? ''), true);

if(isset($parameters['token'])){
	// Невалиден токен (грешен ключ, повреден линк) не влиза в сесията — иначе
	// всички следващи заявки към API-то падат и сайтът влиза в DDoS режим.
	$token = Editor::decrypt_token($parameters['token']);
	if($token === false){
		http_response_code(403);
		die('Токенът от линка не се разшифрова с SAAS_KEY на този сайт (core/saas_key.php). '.
			'Линкът е от проект с друг ключ — отворете редактора от админа на проекта на този сайт. [editor:decrypt]');
	}
	$_SESSION['token'] = $token;

	$user = new Users();
}

$editor = new Editor($_GET['i']);

$dir = SITEURL.'/editor/cb/';

// UI language for the editor panels: bg or en, anything else falls back to en.
$uiLang = strtolower(substr($_GET['lang'] ?? ($lang->language ?? ''), 0, 2));
if (!in_array($uiLang, ['bg', 'en'], true)) $uiLang = 'en';

$i18n = [
	'en' => [
		'ai_title'        => 'AI Assistant',
		'clear'           => 'Clear',
		'close'           => 'Close',
		'level'           => 'Level',
		'level_1'         => '1 · Simple: text and images',
		'level_2'         => '2 · Rich: sliders and animations',
		'level_3'         => '3 · Live: news, products, forms',
		'level_info_btn'  => 'What each level does',
		'level_info_title'=> 'AI assistant levels',
		'level_info_intro'=> 'Choose how complex the result of the AI assistant should be:',
		'level_info_1'    => '<b>1 · Simple</b> — adds or changes headings, text and images. Good for everyday fixes: a new paragraph, a replaced image, a text correction.',
		'level_info_2'    => '<b>2 · Rich</b> — besides text and images, builds richer sections: galleries and sliders, animated elements, FAQs, tabs.',
		'level_info_3'    => '<b>3 · Live</b> — sections that update themselves from the site: latest news, shop products, sponsors, contact forms.',
		'level_info_hint' => 'If unsure, keep level 1.',
		'got_it'          => 'Got it',
		'placeholder'     => 'Describe the change...',
		'send'            => 'Send',
		'done'            => 'Done.',
		'html_load_error' => 'HTML could not be loaded: ',
		'revisions'       => 'Revisions',
		'revision_name'   => 'Revision Name',
		'get_revision'    => 'Get Revision',
	],
	'bg' => [
		'ai_title'        => 'AI асистент',
		'clear'           => 'Изчисти',
		'close'           => 'Затвори',
		'level'           => 'Ниво',
		'level_1'         => '1 · Просто: текст и снимки',
		'level_2'         => '2 · Ефектно: слайдъри и анимации',
		'level_3'         => '3 · Живо: новини, продукти, форми',
		'level_info_btn'  => 'Какво прави всяко ниво',
		'level_info_title'=> 'Нива на AI асистента',
		'level_info_intro'=> 'Изберете колко сложно да е това, което AI асистентът ще направи:',
		'level_info_1'    => '<b>1 · Просто</b> — добавя или променя заглавия, текст и снимки. Подходящо за ежедневни корекции: нов абзац, смяна на снимка, поправка на текст.',
		'level_info_2'    => '<b>2 · Ефектно</b> — освен текст и снимки прави и по-богати секции: галерии и слайдъри, движещи се елементи, въпроси и отговори, табове.',
		'level_info_3'    => '<b>3 · Живо</b> — секции, които се обновяват сами от сайта: последни новини, продукти от магазина, спонсори, форми за контакт.',
		'level_info_hint' => 'Ако не сте сигурни, оставете ниво 1.',
		'got_it'          => 'Разбрах',
		'placeholder'     => 'Опишете промяната...',
		'send'            => 'Изпрати',
		'done'            => 'Готово.',
		'html_load_error' => 'HTML не можа да бъде зареден: ',
		'revisions'       => 'Ревизии',
		'revision_name'   => 'Име на ревизията',
		'get_revision'    => 'Вземи ревизия',
	],
];
$t = $i18n[$uiLang];
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>Editor-<?= $page->type;?>-<?= $page->slug?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <link rel="shortcut icon" href="#">

	<script type="text/javascript">
		const SITEURL = "<?= SITEURL ?>";
		const LANG = "<?= $lang->language ?>";
		const SAAS_KEY = "<?= SAAS_KEY ?>";
		const COREURL = "<?= $core->core_url; ?>api/"
		localStorage.setItem('token', '<?= $_SESSION['token']?>');
	</script>

    <link href="<?= $dir ?>contentbuilder/contentbuilder.css" rel="stylesheet">
    <link href="<?= $dir ?>contentbox/contentbox.css" rel="stylesheet">

	<style>
        /* Switch the device buttons to save space on smaller screen */
        @media all and (max-width: 1380px) {
            .custom-topbar [data-device] {display:none !important}
            .is-responsive-toolbar {display:inline-flex !important}
        }
        .topbar-shadow {
            position: fixed;
            left: 0;top: 47px;
            width: 100%;
            height: 5px;
            z-index: 1;
            box-shadow: rgba(0, 0, 0, 0.04) 0px 5px 5px 0px;
        }
    </style>
</head>
<body id="body">

<!-- Custom Topbar -->
<div class="builder-ui keep-selection custom-topbar" data-tooltip>
    <div>
        <?php echo $editor->title ?>
    </div>
    <div>
        <button data-action="undo" title="Undo">
            <svg><use xlink:href="#icon-undo"></use></svg>
        </button>
        <button data-action="redo" title="Redo">
            <svg><use xlink:href="#icon-redo"></use></svg>
        </button>

        <div class="separator"></div>

        <button data-action="save" title="Save" id="saveBtn">
            <svg><use xlink:href="#icon-save"></use></svg>
            <span>Save</span>
        </button>
		<button title="Loading" id="loaderBtn" style="display:none;">
            <i class="fa-solid fa-spinner animate-spin text-[22px]"></i>
        </button>
    </div>
    <div>
        <button data-device="desktop-lg" title="Desktop - Large Screen">
            <svg><use xlink:href="#icon-device-desktop"></use></svg>
        </button>
        <button data-device="desktop" title="Desktop / Laptop">
            <svg><use xlink:href="#icon-device-laptop"></use></svg>
        </button>
        <button data-device="tablet-landscape" title="Tablet - Landscape">
            <svg style="transform:rotate(-90deg)"><use xlink:href="#icon-device-tablet"></use></svg>
        </button>
        <button data-device="tablet" title="Tablet - Portrait">
            <svg><use xlink:href="#icon-device-tablet"></use></svg>
        </button>
        <button data-device="mobile" title="Mobile">
            <svg><use xlink:href="#icon-device-mobile"></use></svg>
        </button>
        <button data-device="fullview" title="Full View">
            <svg><use xlink:href="#icon-fullview"></use></svg>
        </button>

        <div class="separator"></div>

        <button data-action="download" title="Download">
            <svg><use xlink:href="#icon-download"></use></svg>
        </button>
        <button data-action="html" title="HTML">
            <svg><use xlink:href="#icon-code"></use></svg>
        </button>
        <button data-action="preview" title="Preview">
            <svg><use xlink:href="#icon-eye"></use></svg>
        </button>

        <div class="separator"></div>

        <button data-action="toggle-panel" title="Toggle Edit Panel">
            <svg><use xlink:href="#icon-pencil"></use></svg>
        </button>
    </div>
</div>
<div class="topbar-shadow"></div>

<!-- Content is loaded with builder.loadHtml() below (see initialHtml). Loading it through this
     wrapper skips builderRuntime.reinitialize(), so data-cb-type plugins never mount. -->
<div class="is-wrapper" style="opacity:0;" id="mainContent"></div>

<div style="display: none;" id="tailwindCss"></div>
<div style="display: none !important;" id="headerFooterHtml">
<?php
	if($page->slug == 'header'){
		echo $page->footer;
	} else if($page->slug == 'footer'){
		echo $page->header;
	}
?>
</div>

<!-- AI panel -->
<div id="aiPanel" class="fixed top-[60px] right-4 z-[10001] w-[420px] max-w-[calc(100vw-32px)] h-[70vh] flex flex-col bg-white rounded-lg shadow-lg border border-gray-200" style="display:none">
	<div class="flex items-center justify-between px-4 py-3 border-b">
		<h3 class="text-base font-semibold text-gray-900"><?= $t['ai_title'] ?></h3>
		<div class="flex items-center gap-3">
			<button type="button" onclick="clearAiChat()" class="text-sm text-gray-500 hover:text-gray-900"><?= $t['clear'] ?></button>
			<button type="button" onclick="toggleAiPanel()" class="text-gray-500 hover:text-gray-900" title="<?= $t['close'] ?>">
				<i class="fa-solid fa-xmark"></i>
			</button>
		</div>
	</div>
	<!-- AI level: sent to api/ai.php as `level` (1 | 2 | 3) -->
	<div class="px-4 py-2 border-b bg-gray-50 flex items-center gap-2 text-sm">
		<label for="aiLevel" class="text-gray-600 shrink-0"><?= $t['level'] ?></label>
		<select id="aiLevel" onchange="setAiLevel(this.value)" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg px-2 py-1.5 flex-1">
			<option value="1"><?= $t['level_1'] ?></option>
			<option value="2"><?= $t['level_2'] ?></option>
			<option value="3"><?= $t['level_3'] ?></option>
		</select>
		<button type="button" onclick="openAiLevelInfo()" class="w-7 h-7 shrink-0 rounded-full border border-gray-300 text-gray-500 hover:text-blue-700 hover:border-blue-700" title="<?= $t['level_info_btn'] ?>">
			<i class="fa-solid fa-info text-xs"></i>
		</button>
	</div>
	<div id="aiMessages" class="flex-1 overflow-y-auto flex flex-col gap-2 p-4"></div>
	<div id="aiError" class="mx-4 mb-2 rounded-lg bg-red-50 text-red-700 text-sm px-3 py-2" style="display:none"></div>
	<div class="border-t p-3 flex items-end gap-2">
		<textarea id="aiInput" rows="3" placeholder="<?= $t['placeholder'] ?>" class="flex-1 resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"></textarea>
		<button id="aiSend" type="button" onclick="sendAiMessage()" class="text-white inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 disabled:opacity-60 font-medium rounded-lg text-sm px-4 py-2.5">
			<i id="aiLoader" class="fa-solid fa-spinner animate-spin" style="display:none"></i>
			<?= $t['send'] ?>
		</button>
	</div>
</div>

<!-- AI level info modal -->
<div id="aiLevelInfoModal" class="fixed inset-0 flex items-center justify-center p-4" style="display:none; z-index:10010">
	<div class="absolute inset-0 bg-gray-900/50" onclick="closeAiLevelInfo()"></div>
	<div class="relative w-full max-w-lg bg-white rounded-lg shadow-lg border border-gray-200" role="dialog" aria-modal="true" aria-labelledby="aiLevelInfoTitle">
		<div class="flex items-center justify-between px-4 py-3 border-b">
			<h3 id="aiLevelInfoTitle" class="text-base font-semibold text-gray-900"><?= $t['level_info_title'] ?></h3>
			<button type="button" onclick="closeAiLevelInfo()" class="text-gray-500 hover:text-gray-900" title="<?= $t['close'] ?>">
				<i class="fa-solid fa-xmark"></i>
			</button>
		</div>
		<div class="px-4 py-4 text-sm text-gray-700 space-y-3">
			<p class="text-gray-500"><?= $t['level_info_intro'] ?></p>
			<p><?= $t['level_info_1'] ?></p>
			<p><?= $t['level_info_2'] ?></p>
			<p><?= $t['level_info_3'] ?></p>
			<p class="text-gray-500"><?= $t['level_info_hint'] ?></p>
		</div>
		<div class="px-4 py-3 border-t flex justify-end">
			<button type="button" onclick="closeAiLevelInfo()" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"><?= $t['got_it'] ?></button>
		</div>
	</div>
</div>

<script src="<?= $dir ?>contentbox/lang/en.js"></script>
<script src="<?= $dir ?>contentbox/contentbox.min.js"></script>

<script>

    const builder = new ContentBox({

        controlPanel: true,
        iframeSrc: 'blank.html',
        topSpace: true, // space on top for custom toolbar
        iframeCentered: true,
        zoom: 1,

        toggleDeviceButton: false,
        deviceButtons: false,

        contentStylesVersion: 2,
        snippetUrl: 'assets/minimalist-blocks/content-plugins.js',

        templates: [
            {
                url: '<?= $dir ?>assets/templates-simple/templates.js',
                path: '<?= $dir ?>assets/templates-simple/',
                pathReplace: [],
                numbering: true,
                showNumberOnHover: true,
            },
            {
                url: '<?= $dir ?>assets/templates-quick/templates.js',
                path: '<?= $dir ?>assets/templates-quick/',
                pathReplace: [],
                numbering: true,
                showNumberOnHover: true,
            },
            {
                url: '<?= $dir ?>assets/templates-animated/templates.js',
                path: '<?= $dir ?>assets/templates-animated/',
                pathReplace: [],
                numbering: true,
                showNumberOnHover: true,
            },
            {
                url: '<?= $dir ?>assets/thelayout/templates.js',
                path: '<?= $dir ?>assets/thelayout/',
                pathReplace: [],
                numbering: true,
                showNumberOnHover: true,
            },
        ],

        // AI editing goes through our own panel (api/ai.php -> core), not the built-in assistant.

        // Uploads go to the Expozy images API
        upload: async (file) => {
            return await uploadFile(file);
        },

        // File picker for images / videos / audio / documents
        filePicker: 'assets.html',

        onChange: function () {
            // Auto save is off. Save with the Save button.
        },
    });

    // Initial content. loadHtml() waits for the iframe, then runs the runtime
    // (plugins with data-cb-type get mounted). JSON_HEX_TAG escapes < and >
    // so a closing script tag inside the content cannot end this block.
    const initialHtml = <?= json_encode($editor->html, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP) ?>;
    builder.loadHtml(initialHtml);

    builder.addButton({
        pos: 2,
        title: 'Animation',
        html: '<svg><use xlink:href="#icon-wand"></use></svg>',
        onClick: () => {
            builder.openAnimationPanel();
        }
    });
    builder.addButton({
        pos: 3,
        title: 'Timeline Editor',
        html: '<svg><use xlink:href="#icon-anim-timeline"></use></svg>',
        onClick: () => {
            builder.openAnimationTimeline();
        }
    });
    builder.addButton({
        pos: 4,
        title: 'AI Assistant',
        html: '<svg><use xlink:href="#icon-sparkles"></use></svg>',
        onClick: () => {
            toggleAiPanel();
        }
    });
    builder.addButton({
        pos: 5,
        title: 'Settings',
        html: '<svg><use xlink:href="#icon-settings"></use></svg>',
        onClick: (e) => {
            builder.openSettings(e);
        }
    });
    builder.addButton({
        pos: 6,
        title: 'Clear Content',
        html: '<svg><use xlink:href="#icon-eraser"></use></svg>',
        onClick: () => {
            builder.clear();
        }
    });
    builder.addButton({
        pos: 7,
        title: 'Revisions',
        html: '<svg><use xlink:href="#icon-list-search"></use></svg>',
        onClick: () => {
            toggleDisplay();
        }
    });

    // ====================
    // Upload (Expozy)
    // ====================

    function readAsBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                let base64 = e.target.result;
                base64 = base64.replace(/^data:(.*?);base64,/, "");
                base64 = base64.replace(/ /g, '+');
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async function uploadFile(file) {
        const base64 = await readAsBase64(file);
        const reqBody = { image: base64, filename: file.name, get: <?= json_encode($_GET); ?> };

        const response = await fetch('api/upload_expozy.php', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqBody),
        });
        const data = await response.json();
        if (data.error) {
            alert(typeof data.error === 'string' ? data.error : JSON.stringify(data.error));
            return {};
        }
        return data; // { url }
    }

    // ====================
    // Save (Expozy)
    // ====================

    function save() {

        builder.saveImages('', function(){

            var iframe = document.getElementById('ifrBuilder');
            const styles = iframe.contentDocument.getElementById('tailwindCss').getElementsByTagName('style');
            const lastElement = styles[styles.length - 1];
            const lastElementString = lastElement ? lastElement.outerHTML : '';
            const revision_title = document.getElementById('revisionName').value;

            var html = builder.html();
            var mainCss = builder.mainCss();
            var sectionCss = builder.sectionCss();

            const reqBody = {savecontent:1, content: html, mainCss: mainCss, sectionCss: sectionCss, tailwindCss:lastElementString, revision_title:revision_title, get:<?= json_encode($_GET); ?> };
            fetch('api/savecontent.php', {
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody),
            })
            .then(response => {
                if (response.redirected) {
                    window.location.replace(response.url);
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('saveBtn').style.display = "flex";
                document.getElementById('loaderBtn').style.display = "none";
            });

        }, function(img, base64, filename){

            // Base64 images embedded in content are uploaded and replaced by URL
            const reqBody = { image: base64, filename: filename, get:<?= json_encode($_GET); ?> };
            fetch('api/upload_expozy.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( reqBody ),
            })
            .then(response=>response.json())
            .then(response=>{
                if (response.url) img.setAttribute('src', response.url);
            });

        });
    }

    function saveContent(){
        document.getElementById('saveBtn').style.display = "none";
        document.getElementById('loaderBtn').style.display = "flex";

        var iframe = document.getElementById('ifrBuilder');

        let html = document.getElementById('headerFooterHtml').innerHTML;
        if(iframe.contentWindow.document.getElementById('headerFooter').innerHTML === ''){
            iframe.contentWindow.document.getElementById('headerFooter').innerHTML = html;
        }

        iframe.contentWindow.alpineTemplatesGen();
        iframe.contentWindow.classGen();

        setTimeout(function () {
            save();
        }, 100);
    }

    // ====================
    // Topbar
    // ====================

    document.querySelector('.custom-topbar').addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        const action = button.dataset.action;
        const device = button.dataset.device;

        if (device) {
            setDevice(device);
            return;
        }

        switch(action) {
            case 'undo':
                builder.undo();
                break;
            case 'redo':
                builder.redo();
                break;
            case 'save':
                saveContent();
                break;
            case 'download':
                builder.download();
                break;
            case 'html':
                builder.viewHtml();
                break;
            case 'preview':
                window.open('<?= $page->url ?>', '_blank').focus();
                break;
            case 'toggle-panel':
                builder.toggleEditPanel();
                break;
        }
    });

    function setDevice(mode) {
        builder.setScreenMode(mode);
        document.querySelectorAll('[data-device]').forEach(btn => {
            btn.classList.toggle('on', btn.dataset.device === mode);
        });
    }

    setDevice(builder.screenMode);

    // ====================
    // Revisions (Expozy)
    // ====================

    const rev = <?php echo json_encode( $editor->revisions, JSON_UNESCAPED_UNICODE)  ?>;

    function loadRevision(){
        let selectedRevision = document.getElementById('revisionsSelect').value;
        builder.loadHtml(rev[selectedRevision].object_desc);
    }

    let revisionsClosedAt = 0;

    function closeRevisions() {
        const element = document.getElementById('openRevisionsModal');
        if (!element || element.style.display === 'none') return;
        element.style.display = 'none';
        revisionsClosedAt = Date.now();
    }

    function toggleDisplay() {
        var element = document.getElementById('openRevisionsModal');
        if (!element) return;
        // The outside-click handler just closed it on mousedown of the toolbar button; do not reopen.
        if (Date.now() - revisionsClosedAt < 300) return;
        var currentDisplayStyle = window.getComputedStyle(element).getPropertyValue('display');
        element.style.display = (currentDisplayStyle === 'none') ? '' : 'none';
    }

    // ====================
    // AI (Expozy core)
    // ====================

    const AI_T = <?= json_encode($t, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) ?>;

    let aiMessages = [];
    let aiBusy = false;

    // AI level 1..3, remembered per browser. Default 1 (text and images only).
    let aiLevel = parseInt(localStorage.getItem('cbAiLevel'), 10);
    if (![1, 2, 3].includes(aiLevel)) aiLevel = 1;
    document.getElementById('aiLevel').value = String(aiLevel);

    function setAiLevel(value) {
        aiLevel = [1, 2, 3].includes(parseInt(value, 10)) ? parseInt(value, 10) : 1;
        localStorage.setItem('cbAiLevel', String(aiLevel));
    }

    function openAiLevelInfo() {
        document.getElementById('aiLevelInfoModal').style.display = '';
    }

    function closeAiLevelInfo() {
        document.getElementById('aiLevelInfoModal').style.display = 'none';
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAiLevelInfo();
            closeRevisions();
        }
    });

    // Close the revisions panel on a click outside it (the toolbar button toggles it itself).
    document.addEventListener('mousedown', (e) => {
        const panel = document.getElementById('openRevisionsModal');
        if (!panel || panel.style.display === 'none') return;
        if (panel.contains(e.target)) return;
        closeRevisions();
    });

    function toggleAiPanel() {
        const panel = document.getElementById('aiPanel');
        panel.style.display = panel.style.display === 'none' ? '' : 'none';
        if (panel.style.display === '') document.getElementById('aiInput').focus();
    }

    function renderAiMessages() {
        const list = document.getElementById('aiMessages');
        list.innerHTML = '';
        aiMessages.forEach(m => {
            const item = document.createElement('div');
            item.className = m.role === 'user'
                ? 'self-end max-w-[85%] rounded-lg bg-blue-700 text-white text-sm px-3 py-2 whitespace-pre-wrap'
                : 'self-start max-w-[85%] rounded-lg bg-gray-100 text-gray-900 text-sm px-3 py-2 whitespace-pre-wrap';
            item.textContent = m.content;
            list.appendChild(item);
        });
        list.scrollTop = list.scrollHeight;
    }

    function setAiBusy(busy) {
        aiBusy = busy;
        document.getElementById('aiSend').disabled = busy;
        document.getElementById('aiLoader').style.display = busy ? '' : 'none';
    }

    function showAiError(text) {
        const el = document.getElementById('aiError');
        el.textContent = text || '';
        el.style.display = text ? '' : 'none';
    }

    async function sendAiMessage() {
        if (aiBusy) return;
        const input = document.getElementById('aiInput');
        const text = input.value.trim();
        if (!text) return;

        showAiError('');
        aiMessages.push({ role: 'user', content: text });
        input.value = '';
        renderAiMessages();
        setAiBusy(true);

        try {
            const response = await fetch('api/ai.php', {
                method: 'POST',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: aiMessages, html: builder.html(), level: aiLevel, get: <?= json_encode($_GET); ?> }),
            });
            const data = await response.json();

            if (data.status != 1) {
                // Drop the failed turn so the history stays valid.
                aiMessages.pop();
                input.value = text;
                renderAiMessages();
                showAiError(typeof data.error === 'string' ? data.error : JSON.stringify(data.error));
                return;
            }

            // Show the assistant reply first, so a render failure does not hide it.
            aiMessages.push({ role: 'assistant', content: data.message || AI_T.done });
            renderAiMessages();

            try {
                builder.loadHtml(data.html);
            } catch (e) {
                showAiError(AI_T.html_load_error + e.message);
            }
        } catch (e) {
            // Drop the user turn only if no assistant reply was added.
            if (aiMessages.length && aiMessages[aiMessages.length - 1].role === 'user') {
                aiMessages.pop();
                input.value = text;
            }
            renderAiMessages();
            showAiError(e.message);
        } finally {
            setAiBusy(false);
        }
    }

    function clearAiChat() {
        aiMessages = [];
        showAiError('');
        renderAiMessages();
    }

    document.getElementById('aiInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendAiMessage();
        }
    });

</script>

<script src="/assets/plugins/tailwindcss.3.3.1.js"></script>
<link rel="stylesheet" href="https://r2.expozy.com/cdn/fa/css/all.css" />

<div id="openRevisionsModal" class="w-[600px] h-[400px] overflow-y-scroll absolute top-0 right-0 z-20" style="display:none">
	<div class="justify-center items-center w-full md:inset-0 max-h-full">
		<div class="p-4 w-full">
			<div class="relative p-4 bg-white rounded-lg shadow">
				<div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
					<h3 class="text-lg font-semibold text-gray-900"><?= $t['revisions'] ?></h3>
				</div>

				<div class="grid gap-4 mb-4 grid-cols-2 mt-3">
					<div class="col-span-2">
						<label for="revisionName" class="block mb-2 text-sm font-medium text-gray-900"><?= $t['revision_name'] ?></label>
						<input value="<?php echo $editor->title ?>" type="text" name="revisionName" id="revisionName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required="">
					</div>

					<div class="col-span-2 sm:col-span-1">
						<label for="revisionsSelect" class="block mb-2 text-sm font-medium text-gray-900"><?= $t['revisions'] ?></label>
						<select id="revisionsSelect" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
						<?php foreach ($editor->revisions as $key => $revision) { ?>
							<option value="<?php echo $key?>"><?php echo $revision['title'] ?> : <?php echo $revision['date_created'] ?></option>
						<?php } ?>
						</select>
					</div>
				</div>
				<button onclick="loadRevision()" type="button" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
					<?= $t['get_revision'] ?>
				</button>
			</div>
		</div>
	</div>
</div>
</body>
</html>
