/*
Usage:

<div data-cb-type="code-view" data-cb-theme="light" data-cb-language="auto">
    <pre><code class="edit">const greet = (name) =&gt; `Hello, ${name}!`;
console.log(greet('World'));</code></pre>
</div>

The code lives in the block's own markup, so it is visible to search engines and
readable without JavaScript. In the editor the <code> area is typed into
directly — no dialog — and re-highlighted as you type.
*/

/* ------------------------------------------------------------------ *
 * Highlighter
 *
 * A small tokenizer: for each language an ordered list of sticky rules.
 * At every position the first matching rule wins; unmatched characters are
 * emitted as plain (escaped) text. A rule with `inside` is a container — its
 * match is re-tokenized with the nested rules and gets no wrapper of its own.
 * ------------------------------------------------------------------ */

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const NUMBER = { t: 'number', re: /\b(?:0[xXbBoO][\da-fA-F_]+|\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?)n?\b/y };
const CALL = { t: 'function', re: /\b[A-Za-z_$][\w$]*(?=\s*\()/y };

const jsRules = (extraKeywords) => [
    { t: 'comment', re: /\/\*[\s\S]*?(?:\*\/|$)|\/\/.*/y },
    { t: 'string', re: /`(?:\\[\s\S]|[^\\`])*`?|"(?:\\.|[^\\"\n])*"?|'(?:\\.|[^\\'\n])*'?/y },
    NUMBER,
    {
        t: 'keyword',
        re: new RegExp('\\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|false|finally|for|from|function|get|if|import|in|instanceof|let|new|null|of|return|set|static|super|switch|this|throw|true|try|typeof|undefined|var|void|while|with|yield' +
            (extraKeywords ? '|' + extraKeywords : '') + ')\\b', 'y')
    },
    CALL,
    { t: 'class', re: /\b[A-Z][\w$]*\b/y },
    { t: 'operator', re: /=>|[+\-*/%=<>!&|^~?]+/y },
    { t: 'punct', re: /[{}[\]();,.:]/y }
];

const RULES = {
    javascript: jsRules(),
    typescript: jsRules('abstract|any|boolean|declare|enum|implements|interface|is|keyof|namespace|never|number|private|protected|public|readonly|string|type|unknown'),

    html: [
        { t: 'comment', re: /<!--[\s\S]*?(?:-->|$)/y },
        { t: 'doctype', re: /<!DOCTYPE[^>]*>?/iy },
        {
            inside: [
                { t: 'tag', re: /<\/?[A-Za-z][\w:-]*/y },
                { t: 'string', re: /"[^"]*"?|'[^']*'?/y },
                { t: 'attr', re: /[A-Za-z_:][\w:.-]*(?=\s*=)/y },
                { t: 'punct', re: /\/?>|=/y }
            ],
            re: /<\/?[A-Za-z][^>]*>?/y
        },
        { t: 'entity', re: /&[#\w]+;/y }
    ],

    css: [
        { t: 'comment', re: /\/\*[\s\S]*?(?:\*\/|$)/y },
        { t: 'string', re: /"[^"]*"?|'[^']*'?/y },
        { t: 'atrule', re: /@[\w-]+/y },
        { t: 'property', re: /[-a-zA-Z]+(?=\s*:)/y },
        { t: 'number', re: /#[\da-fA-F]{3,8}\b|\b\d*\.?\d+(?:%|[a-z]{1,4})?\b/y },
        { t: 'selector', re: /[.#][\w-]+|::?[\w-]+/y },
        { t: 'punct', re: /[{}();,:]/y }
    ],

    json: [
        { t: 'property', re: /"(?:\\.|[^\\"])*"(?=\s*:)/y },
        { t: 'string', re: /"(?:\\.|[^\\"])*"?/y },
        { t: 'number', re: /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/y },
        { t: 'keyword', re: /\b(?:true|false|null)\b/y },
        { t: 'punct', re: /[{}[\],:]/y }
    ],

    python: [
        { t: 'comment', re: /#.*/y },
        { t: 'string', re: /[rbfu]{0,2}(?:"""[\s\S]*?(?:"""|$)|'''[\s\S]*?(?:'''|$)|"(?:\\.|[^\\"\n])*"?|'(?:\\.|[^\\'\n])*'?)/y },
        { t: 'decorator', re: /@[\w.]+/y },
        { t: 'keyword', re: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|False|finally|for|from|global|if|import|in|is|lambda|None|nonlocal|not|or|pass|raise|return|True|try|while|with|yield)\b/y },
        NUMBER,
        CALL,
        { t: 'operator', re: /[+\-*/%=<>!&|^~]+/y },
        { t: 'punct', re: /[{}[\]();,.:]/y }
    ],

    php: [
        { t: 'tag', re: /<\?php|<\?=|\?>/y },
        { t: 'comment', re: /\/\*[\s\S]*?(?:\*\/|$)|\/\/.*|#.*/y },
        { t: 'string', re: /"(?:\\.|[^\\"])*"?|'(?:\\.|[^\\'])*'?/y },
        { t: 'variable', re: /\$\w+/y },
        { t: 'keyword', re: /\b(?:abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|do|echo|else|elseif|empty|enum|extends|final|finally|fn|for|foreach|function|global|if|implements|include|include_once|instanceof|interface|isset|list|match|namespace|new|or|print|private|protected|public|readonly|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|yield|true|false|null)\b/iy },
        NUMBER,
        CALL,
        { t: 'operator', re: /=>|->|[+\-*/%=<>!&|^~?.]+/y },
        { t: 'punct', re: /[{}[\]();,:]/y }
    ],

    bash: [
        { t: 'comment', re: /#.*/y },
        { t: 'string', re: /"(?:\\.|[^\\"])*"?|'[^']*'?/y },
        { t: 'variable', re: /\$\w+|\$\{[^}]*\}?/y },
        { t: 'keyword', re: /\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|function|in|return|export|local|source|echo|cd|exit|set|unset)\b/y },
        { t: 'attr', re: /--?[A-Za-z][\w-]*/y },
        NUMBER,
        { t: 'punct', re: /[|&;()<>]/y }
    ],

    sql: [
        { t: 'comment', re: /--.*|\/\*[\s\S]*?(?:\*\/|$)/y },
        { t: 'string', re: /'(?:''|[^'])*'?|"[^"]*"?/y },
        { t: 'keyword', re: /\b(?:select|from|where|and|or|not|insert|into|values|update|set|delete|create|table|alter|add|drop|primary|key|foreign|references|join|inner|left|right|outer|full|on|group|by|order|asc|desc|having|limit|offset|as|distinct|union|all|case|when|then|else|end|index|view|default|constraint|unique|null|is|in|between|like|exists)\b/iy },
        { t: 'function', re: /\b(?:count|sum|avg|min|max|coalesce|now|date|cast)\b(?=\s*\()/iy },
        NUMBER,
        { t: 'punct', re: /[(),;.*=<>]/y }
    ],

    plain: []
};

const LANGUAGE_ALIASES = {
    js: 'javascript', jsx: 'javascript', ts: 'typescript', tsx: 'typescript',
    xml: 'html', svg: 'html', vue: 'html', markup: 'html',
    shell: 'bash', sh: 'bash', zsh: 'bash', console: 'bash',
    py: 'python', text: 'plain', plaintext: 'plain', none: 'plain'
};

function detectLanguage(code) {
    const s = code.trim();
    if (!s) return 'plain';
    if (/^<\?(?:php|=)/.test(s)) return 'php';
    if (/^<!DOCTYPE/i.test(s) || /<\/[A-Za-z][\w:-]*>/.test(s)) return 'html';
    if (/^[{[]/.test(s) && /[}\]]$/.test(s) && /"\s*:/.test(s) && !/\b(?:function|=>|if\s*\()/.test(s)) return 'json';
    if (/^#!.*\b(?:ba)?sh\b/m.test(s) || /^\s*(?:npm|yarn|git|cd|sudo|apt|brew|docker|curl|mkdir|chmod)\s/m.test(s)) return 'bash';
    if (/\b(?:SELECT|INSERT\s+INTO|UPDATE|DELETE\s+FROM|CREATE\s+TABLE|ALTER\s+TABLE)\b/i.test(s)) return 'sql';
    if (/^\s*(?:def|class)\s+\w+.*:\s*$/m.test(s) || (/^\s*(?:import|from)\s+\w+/m.test(s) && !/[;{]/.test(s))) return 'python';
    if (/(?:^|\n)\s*[^\n{}]+\{[^}]*[-a-z]+\s*:[^}]+;/.test(s)) return 'css';
    if (/\b(?:const|let|var|function|=>|class|import|export|return)\b/.test(s)) return 'javascript';
    return 'plain';
}

function resolveLanguage(value, code) {
    let lang = String(value || 'auto').toLowerCase();
    if (lang === 'auto') lang = detectLanguage(code);
    lang = LANGUAGE_ALIASES[lang] || lang;
    return RULES[lang] ? lang : 'plain';
}

function tokenize(code, rules, out) {
    const len = code.length;
    let pos = 0;
    let plain = '';

    while (pos < len) {
        let match = null;
        let rule = null;

        for (let i = 0; i < rules.length; i++) {
            rules[i].re.lastIndex = pos;
            const m = rules[i].re.exec(code);
            if (m && m[0]) { match = m[0]; rule = rules[i]; break; }
        }

        if (!match) {
            plain += code[pos];
            pos++;
            continue;
        }

        if (plain) { out.push(escapeHtml(plain)); plain = ''; }

        if (rule.inside) {
            tokenize(match, rule.inside, out);
        } else {
            out.push('<span class="cbcode-' + rule.t + '">' + escapeHtml(match) + '</span>');
        }
        pos += match.length;
    }

    if (plain) out.push(escapeHtml(plain));
}

function highlightToHtml(code, lang) {
    const rules = RULES[lang] || RULES.plain;
    if (!rules.length) return escapeHtml(code);
    const out = [];
    tokenize(code, rules, out);
    return out.join('');
}

/* ------------------------------------------------------------------ *
 * Caret handling — offsets are counted in plain characters, so they
 * survive replacing the highlighted markup.
 * ------------------------------------------------------------------ */

function getCaret(root) {
    const sel = (root.ownerDocument.defaultView || window).getSelection();
    if (!sel || !sel.rangeCount) return null;
    const range = sel.getRangeAt(0);
    if (!root.contains(range.startContainer)) return null;

    const before = range.cloneRange();
    before.selectNodeContents(root);
    before.setEnd(range.startContainer, range.startOffset);
    const start = before.toString().length;
    return { start: start, end: start + range.toString().length };
}

// Point `range` at the plain-character span [start, end) inside `root`.
function setRangeToOffsets(range, root, start, end) {
    const win = root.ownerDocument.defaultView || window;
    const walker = root.ownerDocument.createTreeWalker(root, win.NodeFilter.SHOW_TEXT, null);
    let offset = 0;
    let startDone = false;
    let node;

    while ((node = walker.nextNode())) {
        const len = node.nodeValue.length;
        if (!startDone && offset + len >= start) {
            range.setStart(node, start - offset);
            startDone = true;
        }
        if (startDone && offset + len >= end) {
            range.setEnd(node, end - offset);
            return true;
        }
        offset += len;
    }
    return false;
}

function setCaret(root, pos) {
    const win = root.ownerDocument.defaultView || window;
    const sel = win.getSelection();
    if (!sel) return;

    const range = root.ownerDocument.createRange();
    if (!setRangeToOffsets(range, root, pos.start, pos.end)) {
        // Past the end of the content — put the caret at the very end.
        range.selectNodeContents(root);
        range.collapse(false);
    }
    sel.removeAllRanges();
    sel.addRange(range);
}

/* ------------------------------------------------------------------ *
 * Copy button
 *
 * Built here rather than in the block's markup: it does nothing without
 * JavaScript, and the editor drops what mount adds when it saves — so the
 * button never ends up in the page's HTML.
 * ------------------------------------------------------------------ */

const COPY_ICON = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5"/></svg>';
const COPIED_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 6 9 17l-5-5"/></svg>';

function writeToClipboard(win, text) {
    if (win.navigator.clipboard && win.isSecureContext) {
        return win.navigator.clipboard.writeText(text);
    }
    // Sites served over plain http have no clipboard API.
    const doc = win.document;
    const area = doc.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0';
    doc.body.appendChild(area);
    area.select();
    let ok = false;
    try { ok = doc.execCommand('copy'); } catch (e) { ok = false; }
    area.remove();
    return ok ? Promise.resolve() : Promise.reject(new Error('copy failed'));
}

/* ------------------------------------------------------------------ *
 * Editing
 * ------------------------------------------------------------------ */

const PAIRS = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' };
const COMMENTS = {
    javascript: { line: '//' },
    typescript: { line: '//' },
    php: { line: '//' },
    python: { line: '#' },
    bash: { line: '#' },
    sql: { line: '--' },
    css: { block: ['/*', '*/'] },
    html: { block: ['<!--', '-->'] }
};

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Which lines a selection touches, as [firstLine, lastLine] plus the caret's
// offset inside the first line.
function lineSpan(text, caret) {
    const before = text.slice(0, caret.start);
    const first = before.split('\n').length - 1;
    const last = text.slice(0, caret.end).split('\n').length - 1;
    return { first: first, last: last };
}

// Character offset where a line starts.
function lineStart(lines, index) {
    let offset = 0;
    for (let i = 0; i < index; i++) offset += lines[i].length + 1;
    return offset;
}
const CLOSERS = [')', ']', '}', '"', "'", '`'];

// The text of the line the caret is on, up to the caret.
function currentLine(text, caret) {
    const line = text.slice(0, caret.start).split('\n').pop();
    return { line: line, indent: (line.match(/^[ \t]*/) || [''])[0] };
}

export default {
    name: 'code-view',
    displayName: 'Code View',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'appearance', label: 'Appearance', fields: ['theme', 'language', 'filename', 'lineNumbers', 'wrap'] },
            { id: 'copy', label: 'Copy Button', fields: ['copyButton', 'copyLabel', 'copiedLabel'] },
            { id: 'editing', label: 'Editing', fields: ['tabSize', 'autoClose'] }
        ],

        theme: {
            type: 'select',
            label: 'Theme',
            default: 'light',
            options: [
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'midnight', label: 'Midnight' }
            ]
        },
        language: {
            type: 'select',
            label: 'Language',
            default: 'auto',
            options: [
                { value: 'auto', label: 'Auto Detect' },
                { value: 'html', label: 'HTML' },
                { value: 'css', label: 'CSS' },
                { value: 'javascript', label: 'JavaScript' },
                { value: 'typescript', label: 'TypeScript' },
                { value: 'json', label: 'JSON' },
                { value: 'python', label: 'Python' },
                { value: 'php', label: 'PHP' },
                { value: 'bash', label: 'Shell' },
                { value: 'sql', label: 'SQL' },
                { value: 'plain', label: 'Plain Text' }
            ]
        },
        filename: {
            type: 'text',
            label: 'File Name',
            default: '',
            placeholder: 'app.js'
        },
        lineNumbers: {
            type: 'boolean',
            label: 'Line Numbers',
            default: false
        },
        wrap: {
            type: 'boolean',
            label: 'Wrap Long Lines',
            default: false
        },
        tabSize: {
            type: 'select',
            label: 'Tab Size',
            default: '2',
            options: [
                { value: '2', label: '2 spaces' },
                { value: '4', label: '4 spaces' }
            ]
        },
        copyButton: {
            type: 'boolean',
            label: 'Show Copy Button',
            default: true
        },
        // The tooltip ships with the page, so its wording is content, not editor
        // UI — a non-English site types its own here.
        copyLabel: {
            type: 'text',
            label: 'Copy Tooltip',
            default: 'Copy',
            placeholder: 'Copy',
            dependsOn: { field: 'copyButton', value: true }
        },
        copiedLabel: {
            type: 'text',
            label: 'Copied Tooltip',
            default: 'Copied',
            placeholder: 'Copied',
            dependsOn: { field: 'copyButton', value: true }
        },
        autoClose: {
            type: 'boolean',
            label: 'Auto-close Brackets and Quotes',
            default: true
        }
    },

    mount: function (element, options) {
        const codeEl = element.querySelector('pre code') || element.querySelector('pre');
        if (!codeEl) return {};

        const doc = element.ownerDocument;
        const win = doc.defaultView || window;
        const inEditor = !!(doc.body && doc.body.classList.contains('data-editor'));

        // The rendered markup always carries one extra trailing newline. Without
        // it the caret cannot rest on the last line: the browser snaps typed
        // characters back in front of the final newline. A trailing newline in
        // a <pre> adds no visible line, so the live page is unaffected.
        const getCode = () => {
            const text = codeEl.textContent;
            return text.endsWith('\n') ? text.slice(0, -1) : text;
        };

        let onRendered = null;

        const render = (value) => {
            const code = value === undefined ? getCode() : value;
            const lang = resolveLanguage(options.language, code);
            const html = highlightToHtml(code, lang) + '\n';
            if (codeEl.innerHTML !== html) codeEl.innerHTML = html;
            if (onRendered) onRendered();
        };

        // Re-mount (undo, settings change) — drop the previous session's listeners.
        if (codeEl._cbCodeCleanup) codeEl._cbCodeCleanup();

        render();

        /* --- Chrome: file-name bar, line numbers, copy button ---
         * All three are built here rather than written into the block's
         * markup: the editor drops what mount adds when it saves, so none of
         * it lands in the page's HTML. The file name itself is content, so it
         * lives in the data-cb-filename attribute (attributes do survive the
         * save) and is typed straight on the block. */
        const preEl = codeEl.parentNode;
        element.querySelectorAll(':scope > .cbcode-bar, :scope > .cbcode-head').forEach(el => el.remove());
        const oldGutter = preEl.querySelector(':scope > .cbcode-lines');
        if (oldGutter) oldGutter.remove();

        let copyTimer = null;
        let head = null;
        let gutter = null;

        // --- File name bar ---
        const filename = (options.filename === undefined || options.filename === null) ? '' : String(options.filename);
        if (filename) {
            head = doc.createElement('div');
            head.className = 'cbcode-head';

            const name = doc.createElement('span');
            name.className = 'cbcode-file';
            name.textContent = filename;
            if (inEditor) {
                // Typed on the block; every keystroke goes back to the attribute.
                name.contentEditable = 'true';
                name.spellcheck = false;
                name.setAttribute('aria-label', 'File name');
                name.addEventListener('input', () => {
                    element.setAttribute('data-cb-filename', name.textContent.replace(/\s+/g, ' ').trim());
                });
                name.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === 'Escape') {
                        e.preventDefault();
                        e.stopPropagation();
                        name.blur();
                    }
                });
            }

            head.appendChild(name);
            element.insertBefore(head, element.firstChild);
        }

        // --- Copy button ---
        if (options.copyButton !== false) {
            const copyLabel = options.copyLabel || 'Copy';
            const copiedLabel = options.copiedLabel || 'Copied';

            const button = doc.createElement('button');
            button.type = 'button';
            button.className = 'cbcode-copy';
            button.innerHTML = COPY_ICON;
            button.setAttribute('data-tip', copyLabel);
            button.setAttribute('aria-label', copyLabel);
            if (inEditor) button.contentEditable = 'false';

            const setState = (icon, label, copied) => {
                button.innerHTML = icon;
                button.setAttribute('data-tip', label);
                button.setAttribute('aria-label', label);
                button.classList.toggle('is-copied', copied);
            };

            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                writeToClipboard(win, getCode()).then(() => {
                    setState(COPIED_ICON, copiedLabel, true);
                    win.clearTimeout(copyTimer);
                    copyTimer = win.setTimeout(() => setState(COPY_ICON, copyLabel, false), 1600);
                }).catch(() => { /* clipboard blocked — leave the button as it is */ });
            });

            if (head) {
                // With a file-name bar the button belongs in that row.
                head.appendChild(button);
            } else {
                const bar = doc.createElement('div');
                bar.className = 'cbcode-bar';
                bar.appendChild(button);
                element.insertBefore(bar, element.firstChild);
            }
        }

        // --- Line numbers ---
        // A sticky gutter inside the <pre>: it stays put while the code scrolls
        // sideways, and being outside <code> it never reaches the caret maths
        // or what the copy button reads.
        if (options.lineNumbers) {
            gutter = doc.createElement('span');
            gutter.className = 'cbcode-lines';
            gutter.setAttribute('aria-hidden', 'true');
            gutter.contentEditable = 'false';
            preEl.insertBefore(gutter, codeEl);
        }

        // How tall each logical line renders. A wrapped line spans several rows,
        // so measure its text box and convert that to whole rows.
        const lineHeights = (count) => {
            const text = getCode();
            const style = win.getComputedStyle(codeEl);
            const lineHeight = parseFloat(style.lineHeight) || (parseFloat(style.fontSize) * 1.65);
            const range = doc.createRange();

            // One row's text box — the yardstick for the measurements below.
            let unit = 0;
            if (setRangeToOffsets(range, codeEl, 0, 0)) unit = range.getBoundingClientRect().height;
            if (!unit) return null;

            const heights = [];
            let pos = 0;

            for (let i = 0; i < count; i++) {
                const stop = text.indexOf('\n', pos) === -1 ? text.length : text.indexOf('\n', pos);
                let rows = 1;
                if (stop > pos && setRangeToOffsets(range, codeEl, pos, stop)) {
                    rows = Math.max(1, Math.round(range.getBoundingClientRect().height / unit));
                }
                heights.push(rows * lineHeight);
                pos = stop + 1;
            }
            return heights;
        };

        const paintGutter = () => {
            if (!gutter) return;
            const count = getCode().split('\n').length;
            // Wrapped lines are taller than one row — measure so the numbers
            // stay level with the line they belong to.
            // Only wrapping can make a line taller than one row.
            const heights = options.wrap ? lineHeights(count) : null;

            let html = '';
            for (let i = 0; i < count; i++) {
                const h = heights && heights[i] ? ' style="height:' + heights[i] + 'px"' : '';
                html += '<span' + h + '>' + (i + 1) + '</span>';
            }
            if (gutter.innerHTML !== html) gutter.innerHTML = html;
        };

        // On the live page the code is not editable, so a block wider than its
        // box would be unreachable without a mouse. Give it a tab stop, but
        // only while there is something to scroll.
        const updateScrollability = () => {
            if (inEditor) return;
            if (preEl.scrollWidth > preEl.clientWidth + 1) {
                preEl.setAttribute('tabindex', '0');
                preEl.setAttribute('role', 'region');
                preEl.setAttribute('aria-label', filename ? filename + ' code' : 'Code');
            } else {
                preEl.removeAttribute('tabindex');
                preEl.removeAttribute('role');
                preEl.removeAttribute('aria-label');
            }
        };

        const afterRender = () => {
            paintGutter();
            updateScrollability();
        };

        onRendered = afterRender;
        afterRender();

        // The stylesheet may still be loading at mount time, and the block can
        // be resized later — in both cases wrapped lines change height, so the
        // numbers have to be measured again.
        let sizeObserver = null;
        if (win.ResizeObserver) {
            sizeObserver = new win.ResizeObserver(() => afterRender());
            sizeObserver.observe(codeEl);
        }

        const removeChrome = () => {
            win.clearTimeout(copyTimer);
            if (sizeObserver) sizeObserver.disconnect();
            element.querySelectorAll(':scope > .cbcode-bar, :scope > .cbcode-head').forEach(el => el.remove());
            const g = preEl.querySelector(':scope > .cbcode-lines');
            if (g) g.remove();
        };

        if (!inEditor) return { render: render, destroy: removeChrome };

        codeEl.setAttribute('role', 'textbox');
        codeEl.setAttribute('aria-multiline', 'true');
        codeEl.setAttribute('aria-label', 'Code');
        codeEl.setAttribute('spellcheck', 'false');

        const autoClose = options.autoClose !== false;
        const INDENT = Number(options.tabSize) === 4 ? '    ' : '  ';
        let composing = false;

        const rehighlight = () => {
            if (composing) return;
            const caret = getCaret(codeEl);
            render();
            if (caret) setCaret(codeEl, caret);
        };

        // Every edit the plugin makes itself (newline, indent, paste) goes
        // through here: rewrite the text, re-highlight, put the caret back.
        // Working on the text — not on the live nodes — keeps newlines intact;
        // contenteditable's own insertion turns them into <br> or drops them.
        const applyEdit = (value, caretPos, caretEnd) => {
            render(value);
            setCaret(codeEl, { start: caretPos, end: caretEnd === undefined ? caretPos : caretEnd });
            codeEl.dispatchEvent(new win.Event('input', { bubbles: true }));
        };

        // Replace the current selection (or insert at the caret).
        const insertAtCaret = (caret, text) => {
            const value = getCode();
            applyEdit(
                value.slice(0, caret.start) + text + value.slice(caret.end),
                caret.start + text.length
            );
        };

        const onInput = () => rehighlight();

        /* --- Line commands (the VS Code set) --- */

        // Indent or outdent every line the selection touches.
        const shiftLines = (caret, out) => {
            const text = getCode();
            const lines = text.split('\n');
            const span = lineSpan(text, caret);
            let firstDelta = 0;
            let total = 0;

            for (let i = span.first; i <= span.last; i++) {
                if (out) {
                    const lead = (lines[i].match(/^[ \t]*/) || [''])[0];
                    if (!lead) continue;
                    const remove = lead.startsWith(INDENT) ? INDENT.length : 1;
                    lines[i] = lines[i].slice(remove);
                    if (i === span.first) firstDelta = -remove;
                    total -= remove;
                } else {
                    if (lines[i] === '' && span.first !== span.last) continue;
                    lines[i] = INDENT + lines[i];
                    if (i === span.first) firstDelta = INDENT.length;
                    total += INDENT.length;
                }
            }

            const start = Math.max(lineStart(lines, span.first), caret.start + firstDelta);
            applyEdit(lines.join('\n'), start, Math.max(start, caret.end + total));
        };

        // Comment or uncomment the selected lines, in the block's language.
        const toggleComment = (caret) => {
            const text = getCode();
            const spec = COMMENTS[resolveLanguage(options.language, text)];
            if (!spec) return false;

            const lines = text.split('\n');
            const span = lineSpan(text, caret);
            const selected = lines.slice(span.first, span.last + 1);
            const from = lineStart(lines, span.first);

            if (spec.line) {
                const token = spec.line;
                const filled = selected.filter(l => l.trim() !== '');
                if (!filled.length) return false;
                const commented = filled.every(l => l.trim().indexOf(token) === 0);
                const strip = new RegExp('^([ \\t]*)' + escapeRe(token) + ' ?');
                const column = Math.min.apply(null, filled.map(l => l.match(/^[ \t]*/)[0].length));

                for (let i = 0; i < selected.length; i++) {
                    if (selected[i].trim() === '') continue;
                    selected[i] = commented
                        ? selected[i].replace(strip, '$1')
                        : selected[i].slice(0, column) + token + ' ' + selected[i].slice(column);
                }
            } else {
                const open = spec.block[0];
                const close = spec.block[1];
                const body = selected.join('\n');
                const lead = (body.match(/^[ \t]*/) || [''])[0];
                const trimmed = body.trim();
                const wrapped = trimmed.indexOf(open) === 0 && trimmed.lastIndexOf(close) === trimmed.length - close.length;
                const next = wrapped
                    ? lead + trimmed.slice(open.length, trimmed.length - close.length).trim()
                    : lead + open + ' ' + body.slice(lead.length) + ' ' + close;
                selected.length = 0;
                Array.prototype.push.apply(selected, next.split('\n'));
            }

            const rest = lines.slice(span.last + 1);
            const head = lines.slice(0, span.first);
            const value = head.concat(selected, rest).join('\n');
            applyEdit(value, from, from + selected.join('\n').length);
            return true;
        };

        // Move or copy the selected lines up/down.
        const moveLines = (caret, direction, copy) => {
            const text = getCode();
            const lines = text.split('\n');
            const span = lineSpan(text, caret);
            const block = lines.slice(span.first, span.last + 1);

            if (copy) {
                const at = direction < 0 ? span.first : span.last + 1;
                lines.splice.apply(lines, [at, 0].concat(block));
                const from = lineStart(lines, direction < 0 ? span.first : span.last + 1);
                applyEdit(lines.join('\n'), from, from + block.join('\n').length);
                return;
            }

            if (direction < 0 && span.first === 0) return;
            if (direction > 0 && span.last === lines.length - 1) return;

            lines.splice(span.first, block.length);
            lines.splice.apply(lines, [span.first + direction, 0].concat(block));

            const from = lineStart(lines, span.first + direction);
            applyEdit(lines.join('\n'), from, from + block.join('\n').length);
        };

        const onKeydown = (e) => {
            // Select the whole block, not the token span under the caret.
            if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
                const sel = win.getSelection();
                const range = doc.createRange();
                range.selectNodeContents(codeEl);
                sel.removeAllRanges();
                sel.addRange(range);
                e.preventDefault();
                e.stopImmediatePropagation();
                return;
            }

            // Escape leaves the code block, so Tab can indent without trapping
            // keyboard users.
            if (e.key === 'Escape') {
                codeEl.blur();
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            if (autoClose && (PAIRS[e.key] || CLOSERS.indexOf(e.key) !== -1) && !e.ctrlKey && !e.metaKey) {
                const caret = getCaret(codeEl);
                if (caret) {
                    const text = getCode();
                    const before = text.charAt(caret.start - 1);
                    const after = text.charAt(caret.end);
                    const selected = text.slice(caret.start, caret.end);

                    // Typing the closer that is already there just steps over it.
                    if (!selected && after === e.key && CLOSERS.indexOf(e.key) !== -1) {
                        e.preventDefault();
                        e.stopPropagation();
                        setCaret(codeEl, { start: caret.start + 1, end: caret.start + 1 });
                        return;
                    }

                    const close = PAIRS[e.key];
                    // A quote right after a word is an apostrophe (don't), not a
                    // pair; and a pair only closes when what follows can end a
                    // token.
                    const quote = e.key === '"' || e.key === "'" || e.key === '`';
                    const wordBefore = /[\w$]/.test(before);
                    const canOpen = selected
                        ? true
                        : (!quote || !wordBefore) && (after === '' || after === '\n' || /[\s)\]},;]/.test(after));

                    if (close && canOpen) {
                        e.preventDefault();
                        e.stopPropagation();
                        applyEdit(
                            text.slice(0, caret.start) + e.key + selected + close + text.slice(caret.end),
                            selected ? caret.end + 2 : caret.start + 1
                        );
                        return;
                    }
                }
            }

            // Toggle a line comment, in the block's language.
            if ((e.ctrlKey || e.metaKey) && (e.key === '/' || e.key === '?')) {
                const caret = getCaret(codeEl);
                if (caret && toggleComment(caret)) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
                return;
            }

            // Move the selected lines, or copy them, up and down.
            if (e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
                const caret = getCaret(codeEl);
                if (!caret) return;
                e.preventDefault();
                e.stopImmediatePropagation();
                moveLines(caret, e.key === 'ArrowUp' ? -1 : 1, e.shiftKey);
                return;
            }

            // Home goes to the first real character, then to column 0.
            if (e.key === 'Home' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
                const caret = getCaret(codeEl);
                if (!caret) return;
                const text = getCode();
                const from = text.lastIndexOf('\n', Math.max(0, caret.start - 1)) + 1;
                const indent = (text.slice(from).match(/^[ \t]*/) || [''])[0].length;
                const target = caret.start === from + indent ? from : from + indent;
                e.preventDefault();
                e.stopPropagation();
                setCaret(codeEl, { start: target, end: target });
                return;
            }

            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                const caret = getCaret(codeEl);
                if (!caret) return;
                const text = getCode();
                const { line, indent } = currentLine(text, caret);
                const extra = /[{[(:]\s*$/.test(line) ? INDENT : '';

                // Between a pair — put the closing half on its own line.
                const open = text.charAt(caret.start - 1);
                if (caret.start === caret.end && PAIRS[open] && text.charAt(caret.start) === PAIRS[open]) {
                    applyEdit(
                        text.slice(0, caret.start) + '\n' + indent + INDENT + '\n' + indent + text.slice(caret.start),
                        caret.start + 1 + indent.length + INDENT.length
                    );
                    return;
                }

                insertAtCaret(caret, '\n' + indent + extra);
                return;
            }

            if (e.key === 'Tab') {
                e.preventDefault();
                e.stopPropagation();
                const caret = getCaret(codeEl);
                if (!caret) return;

                // A selection across lines indents the lines themselves.
                const span = lineSpan(getCode(), caret);
                if (e.shiftKey || span.first !== span.last) {
                    shiftLines(caret, e.shiftKey);
                    return;
                }

                if (e.shiftKey) {
                    const text = getCode();
                    const lineStart = text.lastIndexOf('\n', Math.max(0, caret.start - 1)) + 1;
                    const lead = (text.slice(lineStart).match(/^[ \t]*/) || [''])[0];
                    if (!lead) return;
                    const remove = lead.startsWith(INDENT) ? INDENT.length : 1;
                    applyEdit(
                        text.slice(0, lineStart) + text.slice(lineStart + remove),
                        Math.max(lineStart, caret.start - remove)
                    );
                    return;
                }

                insertAtCaret(caret, INDENT);
                return;
            }

            if (e.key === 'Backspace') {
                const caret = getCaret(codeEl);
                if (!caret || caret.start !== caret.end) return;

                // Backspace between an empty pair removes both halves.
                if (autoClose) {
                    const text = getCode();
                    const open = text.charAt(caret.start - 1);
                    if (PAIRS[open] && text.charAt(caret.start) === PAIRS[open]) {
                        e.preventDefault();
                        e.stopPropagation();
                        applyEdit(
                            text.slice(0, caret.start - 1) + text.slice(caret.start + 1),
                            caret.start - 1
                        );
                        return;
                    }
                }

                // Backspace on an all-whitespace line head removes a full indent.
                const { line } = currentLine(getCode(), caret);
                if (line.length < INDENT.length || /\S/.test(line) || line.length % INDENT.length !== 0) return;
                e.preventDefault();
                e.stopPropagation();
                const text = getCode();
                applyEdit(
                    text.slice(0, caret.start - INDENT.length) + text.slice(caret.start),
                    caret.start - INDENT.length
                );
            }
        };

        // Paste as plain text — formatted HTML has no place in a code block.
        // A snippet lifted from deep inside a file carries that file's
        // indentation, so drop the part every line shares and re-indent the
        // block to wherever the caret is.
        const reindent = (pasted, caret) => {
            const lines = pasted.split('\n');
            if (lines.length < 2) return pasted;

            const filled = lines.slice(1).filter(l => l.trim() !== '');
            if (!filled.length) return pasted;

            let common = null;
            filled.forEach(line => {
                const lead = (line.match(/^[ \t]*/) || [''])[0];
                common = common === null || lead.length < common.length ? lead : common;
            });

            const here = currentLine(getCode(), caret).indent;
            return lines.map((line, i) => {
                if (i === 0) return line;
                if (line.trim() === '') return '';
                return here + line.slice(common.length);
            }).join('\n');
        };

        const onPaste = (e) => {
            const clipboard = e.clipboardData || win.clipboardData;
            if (!clipboard) return;
            e.preventDefault();
            e.stopPropagation();
            const caret = getCaret(codeEl);
            if (!caret) return;
            const pasted = clipboard.getData('text/plain').replace(/\r\n?/g, '\n');
            insertAtCaret(caret, reindent(pasted, caret));
        };

        const onCompositionStart = () => { composing = true; };
        const onCompositionEnd = () => { composing = false; rehighlight(); };

        codeEl.addEventListener('keydown', onKeydown);
        codeEl.addEventListener('input', onInput);
        codeEl.addEventListener('paste', onPaste);
        codeEl.addEventListener('compositionstart', onCompositionStart);
        codeEl.addEventListener('compositionend', onCompositionEnd);

        const cleanup = () => {
            removeChrome();
            codeEl.removeEventListener('keydown', onKeydown);
            codeEl.removeEventListener('input', onInput);
            codeEl.removeEventListener('paste', onPaste);
            codeEl.removeEventListener('compositionstart', onCompositionStart);
            codeEl.removeEventListener('compositionend', onCompositionEnd);
            delete codeEl._cbCodeCleanup;
        };
        codeEl._cbCodeCleanup = cleanup;

        return { render: render, destroy: cleanup };
    },

    unmount: function (element, instance) {
        if (instance && instance.destroy) instance.destroy();
    }
};
