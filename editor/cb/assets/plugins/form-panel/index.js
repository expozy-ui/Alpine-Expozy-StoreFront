/*
Form plugin for ContentBuilder / ContentBox

The fields are designed in FormBuilderAI (opened from the settings panel) and
rendered by FormViewer.js at runtime. Two things are stored in the block:

  1. a JSON <script class="cb-form-def"> — the form definition, its theme and
     its workflow. The single source of truth.
  2. the markup inside `.cb-form-fields` — a snapshot of FormViewer's own output,
     regenerated on every save. It is what search engines read and what the
     visitor sees before any JavaScript runs; `mount()` then re-renders the same
     form live, into the same container.

Never hand-edit the snapshot: the next save overwrites it from the definition.

FormViewer ships inside the ContentBox runtime, so nothing extra is loaded here.
If it is unavailable the snapshot simply stays on screen, and with
`data-cb-submission-type="standard"` it still submits natively.

Spam protection is the host's, not the plugin's: put `data-site-token` on any
element wrapping the rendered page and FormViewer adds the token as a hidden
`form_token` field for your endpoint to verify. It belongs outside the saved
content, so a token is never stored in a page.

Usage (embed this HTML into your content — see README.md for the full block):

<div data-cb-type="form" data-cb-action="/formsubmission" data-cb-submission-type="json" ...>
    <form class="cb-form" method="POST" action="/formsubmission">
        <div class="cb-form-fields formview-container fb-ui">…snapshot…</div>
        <div class="cb-form-status" role="status" aria-live="polite"></div>
    </form>
    <script type="application/json" class="cb-form-def">{ "form": … }</script>
</div>
*/

// The form shown when a block is inserted before anyone opens the form builder.
const DEFAULT_FORM = {
    title: 'Get in touch',
    description: 'We usually reply within one business day.',
    elements: [
        { title: 'Your Name:', name: 'your_name', type: 'short-text', isRequired: true, placeholder: 'Enter your name' },
        { title: 'Your Email:', name: 'email', type: 'email', isRequired: true, placeholder: 'Enter your email' },
        { title: 'Message:', name: 'message', type: 'long-text', placeholder: 'How can we help?' }
    ],
    useSubmitButton: true,
    submitText: 'Send'
};

const SPINNER = '<svg class="cb-form-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25"></circle><path fill="currentColor" opacity="0.75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>';

/* ------------------------------------------------------------------ paths --
 * The form builder lives beside this file, and FormBuilderAI lives in the
 * site's assets folder. Both are derived from this module's own URL so the
 * plugin folder can be served from anywhere.
 */
const PLUGIN_URL = import.meta.url;

function siteRoot() {
    const marker = '/assets/plugins/';
    const i = PLUGIN_URL.indexOf(marker);
    if (i !== -1) return PLUGIN_URL.slice(0, i + 1);
    // Not in the documented layout: assume the usual three levels up.
    return new URL('../../../', PLUGIN_URL).href;
}

function editorUrl() {
    return new URL('./editor.html', PLUGIN_URL).href + '?base=' + encodeURIComponent(siteRoot());
}

/* ------------------------------------------------------------- definition --
 * The form definition lives in a JSON <script> inside the block:
 *
 *     <script type="application/json" class="cb-form-def">{ "form": … }</script>
 *
 * rather than in a data attribute. An attribute would have to be URI-encoded,
 * which inflates it by about 60% and turns the block into an unreadable wall of
 * %22%3A in the editor's code view. The script child is plain JSON, is carried
 * along by innerHTML like the rest of the block's content, and survives every
 * path the editor puts a block through.
 *
 * It sits outside .cb-form-fields on purpose: FormViewer clears that container
 * when it renders.
 */
const DEF_SELECTOR = 'script.cb-form-def';

function readDefinition(element) {
    const holder = element.querySelector(DEF_SELECTOR);
    if (!holder) return {};
    try {
        const value = JSON.parse(holder.textContent);
        return (value && typeof value === 'object') ? value : {};
    } catch (e) {
        console.error('[form] the stored form definition is not valid JSON.');
        return {};
    }
}

/* Empty values are dropped: the form builder returns its whole theme map even
 * when nothing is set (25 of 33 keys empty on a default form), and an empty
 * workflow is `{steps: []}`. None of it means anything, so none of it is
 * stored. */
function prune(value) {
    if (!value || typeof value !== 'object') return null;
    if (Array.isArray(value)) return value.length ? value : null;
    const out = {};
    Object.keys(value).forEach((key) => {
        const v = value[key];
        if (v === '' || v === null || v === undefined) return;
        if (typeof v === 'object') {
            const inner = prune(v);
            if (inner) out[key] = inner;
            return;
        }
        out[key] = v;
    });
    return Object.keys(out).length ? out : null;
}

function writeDefinition(element, data, endpoints) {
    const def = { form: data.form || null };
    const theme = prune(data.theme);
    const workflow = prune(data.workflow);
    if (theme) def.theme = theme;
    if (workflow) def.workflow = workflow;
    if (endpoints) def.endpoints = endpoints;

    let holder = element.querySelector(DEF_SELECTOR);
    if (!holder) {
        holder = element.ownerDocument.createElement('script');
        holder.type = 'application/json';
        holder.className = 'cb-form-def';
        element.appendChild(holder);
    }
    // A "</script>" inside a string would end the tag early; escaping the angle
    // bracket keeps the JSON valid and the tag intact.
    holder.textContent = JSON.stringify(def, null, 2).replace(/</g, '\\u003c');
}

function getFormViewer(win) {
    return win.FormViewer || window.FormViewer || null;
}

/* True when the definition contains a field that produces <input type="file">.
 * That is the only reason a form needs multipart encoding. */
function hasFileField(formJSON) {
    if (!formJSON || !Array.isArray(formJSON.elements)) return false;
    return formJSON.elements.some((f) => f && (f.type === 'file' || f.type === 'multifile'));
}

/* enctype is set if — and only if — the form carries a file, so that a standard
 * (browser) POST arrives in the encoding a server expects: urlencoded for an
 * ordinary form, multipart when there is a file. Getting this wrong is silent:
 * a server reading req.body from a multipart POST it does not parse sees an
 * empty form. It also keeps the JavaScript and no-JavaScript paths identical,
 * since without JavaScript the browser uses whatever the markup says. */
function applyEncoding(form, formJSON) {
    if (hasFileField(formJSON) || form.querySelector('input[type="file"]')) {
        form.setAttribute('enctype', 'multipart/form-data');
    } else {
        form.removeAttribute('enctype');
    }
}

/* Endpoints a form needs when its fields or its workflow call a model: text
 * generation, image and audio generation, uploads.
 *
 * They are read from the editor and stored with the form when it is saved, the
 * same as the legacy form module does, so a published page needs no setup of
 * its own. A form that only collects answers stores none of this, because the
 * editor has none configured. */
const AI_KEYS = [
    'model', 'model2', 'sendCommandUrl', 'sendCommandStreamUrl',
    'uploadMediaUrl_Fal', 'uploadBase64Url_Fal',
    'generateMediaUrl_Fal', 'checkRequestStatusUrl_Fal', 'getResultUrl_Fal',
    'generateMediaUrl_OpenAI_CreateImage', 'generateMediaUrl_OpenAI_CreateImageEdit',
    'generateMediaUrl_Google', 'generateMediaUrl_Replicate',
    'minimizeImageUrl', 'cleanup', 'assetsFolder', 'viewFileUrl',
    'searchUrl', 'scrapeUrl', 'headers', 'customData'
];

function hostEditor(win) {
    try {
        return win.contentbox || win._cb ||
               (win.parent && (win.parent.contentbox || win.parent._cb)) || null;
    } catch (e) {
        return null;   // parent on another origin
    }
}

/* What the editor has configured, at the moment the form is saved. */
function collectEndpoints(win) {
    const editor = hostEditor(win);
    if (!editor) return null;

    const found = {};
    AI_KEYS.forEach((key) => {
        if (editor[key] !== undefined && editor[key] !== '') found[key] = editor[key];
    });
    if (!Object.keys(found).length) return null;   // nothing configured: store nothing

    // Same fallback the legacy form module applies.
    if (!found.model) found.model = 'gpt-4o-mini';
    if (!found.model2) found.model2 = 'gpt-4o-mini';

    /* FormViewer streams whenever it has a stream URL, and it starts with one of
     * its own (/getstream). A host that configured only the plain endpoint would
     * therefore stream to an address that does not exist, so say explicitly that
     * there is none: the library then uses the endpoint that was configured. */
    if (found.sendCommandUrl && !found.sendCommandStreamUrl) found.sendCommandStreamUrl = '';

    return found;
}

function viewerOptions(options, win, stored) {
    // Stored with the form. While editing, what the editor holds now wins, so
    // changing an endpoint takes effect without re-saving every form.
    const opts = Object.assign({}, stored || {}, collectEndpoints(win) || {});

    if (options.resultSelector) opts.resultSelector = options.resultSelector;

    const siteKey = options.recaptchaKey || '';
    if (siteKey) {
        opts.captchaContainer = true;
        opts.captchaContainerClassName = 'captchaWidget';
    }
    return opts;
}

/* -------------------------------------------------------------- snapshot --
 * Render the form once, off-screen, and hand back the markup so it can be
 * stored in the block. FormViewer may still be a stub that loads the real
 * library on first use, so the render is awaited rather than assumed.
 */
function renderSnapshot(doc, formJSON, themeJSON) {
    return new Promise((resolve) => {
        const FV = getFormViewer(doc.defaultView || window);
        if (!FV || !formJSON) { resolve(null); return; }

        const host = doc.createElement('div');
        host.setAttribute('aria-hidden', 'true');
        host.style.cssText = 'position:absolute;left:-99999px;top:0;width:760px;';
        doc.body.appendChild(host);

        let viewer;
        try {
            viewer = new FV(host, {});
            if (themeJSON) viewer.setTheme(JSON.stringify(themeJSON), host);
            viewer.view(JSON.stringify(formJSON));
        } catch (e) {
            host.remove();
            resolve(null);
            return;
        }

        const started = Date.now();
        const finish = (value) => {
            try { if (viewer && typeof viewer.destroy === 'function') viewer.destroy(); } catch (e) { /* stub */ }
            host.remove();
            resolve(value);
        };
        const poll = () => {
            if (host.children.length) {
                // A page carrying data-site-token makes FormViewer add a hidden
                // form_token. That is per-request state minted by the host's
                // server — storing one in the page would save a token that is
                // stale the moment it is written, so it never enters a snapshot.
                host.querySelectorAll('input[name="form_token"]').forEach((el) => el.remove());
                finish({ html: host.innerHTML, className: host.className });
            } else if (Date.now() - started > 8000) {
                finish(null);
            } else {
                setTimeout(poll, 30);
            }
        };
        poll();
    });
}

/* ------------------------------------------------------- form builder UI --
 * A full-screen overlay in the builder's own document (the settings panel is
 * far too narrow for the form builder). Editor-only: nothing here is ever part
 * of the page content.
 */
/* Layout only. The bar's colours are the editor's --cb-* tokens and the two
 * buttons are the editor's own .classic-primary / .classic-secondary, the same
 * as the image editor's Cancel / Apply — which is why the overlay is mounted
 * inside [data-cb-ui] rather than on <body>. */
const OVERLAY_STYLES = `
.cb-form-overlay { position: fixed; inset: 0; z-index: 10600; display: flex; flex-direction: column; background: var(--cb-surface, #fff); }
.cb-form-overlay-bar { display: flex; align-items: center; gap: 8px; flex: none; height: 54px; padding: 0 14px; border-bottom: 1px solid var(--cb-line, rgba(0,0,0,.09)); }
.cb-form-overlay-title { font-size: 14px; font-weight: 500; color: var(--cb-text, rgba(0,0,0,.92)); margin-right: auto; }
.cb-form-overlay-frame { flex: 1 1 auto; width: 100%; border: none; display: block; background: #fff; }
`;

function injectOverlayStyles(doc) {
    if (doc.getElementById('cb-form-overlay-styles')) return;
    const style = doc.createElement('style');
    style.id = 'cb-form-overlay-styles';
    style.textContent = OVERLAY_STYLES;
    doc.head.appendChild(style);
}

function openFormBuilder(builder, doc, context) {
    const win = doc.defaultView;
    injectOverlayStyles(doc);

    // The editor's own UI container: everything inside it is styled by the
    // editor's stylesheet and follows its theme.
    const host = (builder && builder.builderStuff) || doc.querySelector('[data-cb-ui]') || doc.body;

    const overlay = doc.createElement('div');
    overlay.className = 'cb-form-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', context.title);

    const bar = doc.createElement('div');
    bar.className = 'cb-form-overlay-bar';

    const title = doc.createElement('span');
    title.className = 'cb-form-overlay-title';
    title.textContent = context.title;

    const cancel = doc.createElement('button');
    cancel.type = 'button';
    cancel.className = 'is-btn classic-secondary';
    cancel.title = context.cancelText;
    cancel.textContent = context.cancelText;

    const save = doc.createElement('button');
    save.type = 'button';
    save.className = 'is-btn classic-primary';
    save.title = context.saveText;
    save.textContent = context.saveText;

    bar.append(title, cancel, save);

    const frame = doc.createElement('iframe');
    frame.className = 'cb-form-overlay-frame';
    frame.setAttribute('title', context.title);
    frame.src = editorUrl();

    overlay.append(bar, frame);

    // How the form builder page reaches its data. Same-origin and synchronous,
    // which is also how the legacy form module talks to its dialog.
    win.__cbFormEditor = {
        element: context.element,
        form: context.form,
        theme: context.theme,
        workflow: context.workflow
    };

    const close = () => {
        doc.removeEventListener('keydown', onKey, true);
        try { frame.contentDocument.removeEventListener('keydown', onKey); } catch (e) { /* gone with the frame */ }
        try { delete win.__cbFormEditor; } catch (e) { win.__cbFormEditor = null; }
        overlay.remove();
    };

    const onKey = (e) => {
        if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); }
    };

    cancel.addEventListener('click', close);
    save.addEventListener('click', () => {
        let data = null;
        try {
            const collect = frame.contentWindow && frame.contentWindow.cbFormCollect;
            if (typeof collect === 'function') data = collect();
        } catch (e) {
            console.error('[form] the form builder could not be read:', e);
        }
        close();
        if (data) context.onSave(data);
    });

    // Esc closes, the way every other dialog in the editor does. Once the user
    // clicks into the builder the key event never reaches this document, so the
    // frame gets the same listener — in the bubble phase, so any handler the
    // builder has for its own popups can stop it before it gets here.
    doc.addEventListener('keydown', onKey, true);
    host.appendChild(overlay);
    frame.addEventListener('load', () => {
        try {
            frame.contentDocument.addEventListener('keydown', onKey);
            frame.contentWindow.focus();
        } catch (e) { /* different origin: the parent listener still covers the chrome */ }
    });
}

/* ------------------------------------------------------------ block markup */

function ensureStructure(element) {
    let form = element.querySelector('form.cb-form');
    if (!form) {
        const doc = element.ownerDocument;
        form = doc.createElement('form');
        form.className = 'cb-form';
        form.setAttribute('method', 'POST');
        form.innerHTML = '<div class="cb-form-fields formview-container fb-ui"></div><div class="cb-form-status" role="status" aria-live="polite"></div>';
        // Rebuild the form without taking the definition down with it.
        const def = element.querySelector(DEF_SELECTOR);
        element.innerHTML = '';
        element.appendChild(form);
        if (def) element.appendChild(def);
    }
    if (!form.querySelector('.cb-form-fields')) {
        form.insertAdjacentHTML('afterbegin', '<div class="cb-form-fields formview-container fb-ui"></div>');
    }
    if (!form.querySelector('.cb-form-status')) {
        form.insertAdjacentHTML('beforeend', '<div class="cb-form-status" role="status" aria-live="polite"></div>');
    }
    // Where a form whose workflow generates something writes its answer. Sits
    // outside the form so re-rendering the fields never clears it.
    if (!element.querySelector('.cb-form-result')) {
        form.insertAdjacentHTML('afterend', '<div class="cb-form-result"></div>');
    }
    return form;
}

function describeForm(formJSON, out) {
    if (!formJSON || !Array.isArray(formJSON.elements)) return out('No form yet.');
    const count = formJSON.elements.length;
    return count === 1 ? out('1 field') : count + ' ' + out('fields');
}

export default {
    name: 'form-panel',
    displayName: 'Form (panel)',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'submit', label: 'Submission', fields: ['action', 'submissionType'] },
            { id: 'messages', label: 'Messages', fields: ['successMessage', 'errorMessage'] },
            { id: 'security', label: 'Security', fields: ['recaptchaKey'] }
        ],
        action: {
            type: 'text',
            label: 'Form Action URL',
            default: '/formsubmission',
            placeholder: '/formsubmission or https://…',
            group: 'submit'
        },
        submissionType: {
            type: 'select',
            label: 'Submission Type',
            default: 'json',
            options: [
                { value: 'json', label: 'JSON Submission' },
                { value: 'standard', label: 'Standard Form Submission' }
            ],
            group: 'submit'
        },
        successMessage: {
            type: 'text',
            label: 'Thank You Message',
            default: 'Thanks for your submission!',
            group: 'messages'
        },
        errorMessage: {
            type: 'text',
            label: 'Error Message',
            default: 'Oops! There was a problem submitting your form.',
            group: 'messages'
        },
        recaptchaKey: {
            type: 'text',
            label: 'reCAPTCHA Site Key (v2)',
            default: '',
            placeholder: 'Leave empty to disable',
            group: 'security'
        },

        // Attribute-only: set in the HTML, not offered in the panel.
        resultSelector: { type: 'text', label: 'Result Selector', default: '', hidden: true }
    },

    editor: {
        openContentEditor: function (element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            // No label here: the panel header already says "Form".
            const note = document.createElement('div');
            note.className = 'cbx-hint';

            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = out('Edit Form');

            container.append(note, button);

            const refreshNote = () => {
                note.textContent = describeForm(readDefinition(element).form, out);
            };
            refreshNote();

            button.addEventListener('click', () => {
                // At click time the button lives in the builder's own document,
                // which is where a full-screen overlay belongs.
                const doc = button.ownerDocument;

                const def = readDefinition(element);

                openFormBuilder(builder, doc, {
                    element: element,
                    form: def.form || DEFAULT_FORM,
                    theme: def.theme || null,
                    workflow: def.workflow || null,
                    title: out('Form Builder'),
                    saveText: out('Save'),
                    cancelText: out('Cancel'),
                    onSave: async (data) => {
                        writeDefinition(element, data, collectEndpoints(element.ownerDocument.defaultView || window));

                        const form = ensureStructure(element);
                        const fields = form.querySelector('.cb-form-fields');
                        applyEncoding(form, data.form);

                        // Rebuild the static snapshot from the new definition.
                        const snapshot = await renderSnapshot(element.ownerDocument, data.form, data.theme);
                        if (snapshot) {
                            fields.className = 'cb-form-fields ' + snapshot.className;
                            fields.innerHTML = snapshot.html;
                        }

                        refreshNote();
                        onChange();
                    }
                });
            });

            return container;
        }
    },

    mount: function (element, options) {
        const doc = element.ownerDocument;
        const win = doc.defaultView || window;
        const form = element.querySelector('form.cb-form');
        const fields = element.querySelector('.cb-form-fields');
        const status = element.querySelector('.cb-form-status');
        if (!form || !fields) return {};

        const instance = { viewer: null, listeners: [] };
        const on = (target, type, handler) => {
            target.addEventListener(type, handler);
            instance.listeners.push([target, type, handler]);
        };

        const def = readDefinition(element);
        const formJSON = def.form || null;
        const themeJSON = def.theme || null;
        const workflowJSON = def.workflow || null;

        /* FormViewer looks its result container up with document.querySelector,
         * so the selector has to be unique on the page or two forms would write
         * into the same box. The id is stamped per page load rather than stored,
         * so copies of a block can never end up sharing one. */
        const result = element.querySelector('.cb-form-result');
        if (result && !options.resultSelector) {
            win.__cbFormResultCount = (win.__cbFormResultCount || 0) + 1;
            result.id = 'cb-form-result-' + win.__cbFormResultCount;
            options = Object.assign({}, options, { resultSelector: '#' + result.id });
        }

        // Keep the no-JavaScript form target in step with the settings.
        if (options.action) form.setAttribute('action', options.action);
        const standard = String(options.submissionType || '') === 'standard';
        applyEncoding(form, formJSON);

        // Render live over the snapshot. Without FormViewer the snapshot stays.
        const FV = getFormViewer(win);
        if (FV && formJSON) {
            try {
                const viewer = new FV(fields, viewerOptions(options, win, def.endpoints));
                instance.viewer = viewer;
                if (themeJSON) viewer.setTheme(JSON.stringify(themeJSON), form);
                viewer.view(JSON.stringify(formJSON));
                if (workflowJSON) viewer.loadWorkflow(JSON.stringify(workflowJSON));
            } catch (e) {
                console.error('[form] FormViewer could not render this form:', e);
            }
        } else if (!FV) {
            console.warn('[form] FormViewer is not available — showing the saved form markup only.');
        }

        // The form stays live while editing, the same as the legacy form module:
        // filling it in and submitting works in the editor too.
        const isEditor = doc.body.classList.contains('data-editor');
        if (isEditor) {
            /* The editor seals a plugin block that holds form controls as
             * contentEditable="false" and marks each control contentEditable="true",
             * which is what lets the caret land in a field. Rendering the form
             * replaces those controls with fresh ones that carry no such mark, so
             * clicking a field would do nothing. Put the mark back after every
             * render — including the live one, which lands after mount(). */
            const markControls = () => {
                fields.querySelectorAll('input, textarea, select').forEach((control) => {
                    if (control.contentEditable !== 'true') control.contentEditable = 'true';
                });
            };
            markControls();
            const observer = new win.MutationObserver(markControls);
            observer.observe(fields, { childList: true, subtree: true });
            instance.observer = observer;
        }

        const siteKey = options.recaptchaKey || '';
        let captchaWidget = null;
        if (siteKey) {
            loadRecaptcha(doc).then(() => {
                const holder = form.querySelector('.captchaWidget');
                if (holder && win.grecaptcha && !holder.childElementCount) {
                    try { captchaWidget = win.grecaptcha.render(holder, { sitekey: siteKey }); } catch (e) { /* already rendered */ }
                }
            }).catch(() => { /* reported below on submit */ });
        }

        // Same as the form module: a tick above the message on success, the
        // message alone on failure.
        const showStatus = (message, ok) => {
            if (!status || !message) return;
            status.innerHTML = '';
            if (ok) {
                const icon = doc.createElement('div');
                icon.className = 'text-center pt-4 pb-4';
                icon.innerHTML = '<i class="bi bi-send-check size-64"></i>';
                status.appendChild(icon);
            }
            const text = doc.createElement('div');
            text.className = ok ? 'leading-14 text-center size-38 pb-4' : 'leading-14 text-center size-38 pt-4 pb-4';
            text.textContent = message;
            status.appendChild(text);
            status.classList.add('is-visible');
        };

        const captchaToken = () => {
            if (!siteKey) return true;
            if (!win.grecaptcha || captchaWidget === null) return false;
            return !!win.grecaptcha.getResponse(captchaWidget);
        };

        if (standard) {
            on(form, 'submit', (e) => {
                if (!captchaToken()) e.preventDefault();
            });
            return instance;
        }

        on(form, 'submit', async (e) => {
            e.preventDefault();
            if (!captchaToken()) return;

            const button = form.querySelector('.btn-submitform') || form.querySelector('button[type="submit"]');
            const original = button ? button.innerHTML : '';
            if (button) {
                button.disabled = true;
                button.innerHTML = SPINNER + (button.textContent || '').trim();
            }

            try {
                const response = await fetch(form.getAttribute('action') || '', {
                    method: (form.getAttribute('method') || 'POST').toUpperCase(),
                    body: new FormData(form),
                    headers: { Accept: 'application/json' }
                });
                let result = {};
                try { result = await response.json(); } catch (err) { result = {}; }

                if (response.ok && !result.error) {
                    showStatus(options.successMessage, true);
                    form.reset();
                } else {
                    showStatus(options.errorMessage, false);
                }
            } catch (err) {
                showStatus(options.errorMessage, false);
            } finally {
                if (button) {
                    button.disabled = false;
                    button.innerHTML = original;
                }
                if (siteKey && win.grecaptcha && captchaWidget !== null) {
                    try { win.grecaptcha.reset(captchaWidget); } catch (err) { /* ignore */ }
                }
            }
        });

        return instance;
    },

    unmount: function (element, instance) {
        if (!instance) return;
        if (instance.observer) instance.observer.disconnect();
        (instance.listeners || []).forEach(([target, type, handler]) => {
            target.removeEventListener(type, handler);
        });
        const viewer = instance.viewer;
        if (viewer) {
            try {
                if (typeof viewer.destroy === 'function') viewer.destroy();
                else if (typeof viewer.cleanup === 'function') viewer.cleanup();
            } catch (e) { /* stub, or already gone */ }
        }
    }
};

/* --------------------------------------------------------------- recaptcha */

let recaptchaPromise = null;

function loadRecaptcha(doc) {
    if (recaptchaPromise) return recaptchaPromise;
    const win = doc.defaultView || window;
    if (win.grecaptcha) return (recaptchaPromise = Promise.resolve());

    recaptchaPromise = new Promise((resolve, reject) => {
        const existing = doc.getElementById('recaptcha-key');
        if (existing) {
            existing.addEventListener('load', () => resolve());
            existing.addEventListener('error', () => reject(new Error('reCAPTCHA failed to load')));
            return;
        }
        const script = doc.createElement('script');
        script.id = 'recaptcha-key';
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => { recaptchaPromise = null; reject(new Error('reCAPTCHA failed to load')); };
        doc.body.appendChild(script);
    }).then(() => new Promise((resolve) => {
        // grecaptcha.render only exists once the API has finished booting.
        const started = Date.now();
        const tick = () => {
            if (win.grecaptcha && win.grecaptcha.render) resolve();
            else if (Date.now() - started > 10000) resolve();
            else setTimeout(tick, 100);
        };
        tick();
    }));

    return recaptchaPromise;
}
