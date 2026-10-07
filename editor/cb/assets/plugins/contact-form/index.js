/*
Contact / Newsletter Form plugin for ContentBuilder / ContentBox

The rendered block is a real <form> (SEO-visible, accessible). mount() only wires
the submit -> fetch behaviour; the field structure lives in the HTML and is built
by the custom editor. Fields use implicit label association (the control sits
inside its <label>) so duplicate embeds never collide on ids.

Usage (embed this HTML into your content):

<div data-cb-type="contact-form" data-cb-action="/submit-form" data-cb-method="POST" data-cb-button-text="Send Message" data-cb-success-message="Thanks! We'll be in touch soon." data-cb-error-message="Something went wrong. Please try again." data-cb-accent-color="#3b82f6" role="form" aria-label="Contact form">
    <form class="cf-form" novalidate>
        <div class="cf-fields">
            <label class="cf-field">
                <span class="cf-label">Name <span class="cf-req" aria-hidden="true">*</span></span>
                <input type="text" name="name" placeholder="Your name" required>
            </label>
            <label class="cf-field">
                <span class="cf-label">Email <span class="cf-req" aria-hidden="true">*</span></span>
                <input type="email" name="email" placeholder="you@example.com" required>
            </label>
            <label class="cf-field">
                <span class="cf-label">Message</span>
                <textarea name="message" placeholder="How can we help?" rows="4"></textarea>
            </label>
        </div>
        <button type="submit" class="cf-submit">Send Message</button>
        <p class="cf-status" role="status" aria-live="polite"></p>
    </form>
</div>
*/

const FIELD_TYPES = [
    { value: 'text', label: 'Text' },
    { value: 'email', label: 'Email' },
    { value: 'tel', label: 'Phone' },
    { value: 'textarea', label: 'Long text (textarea)' },
    { value: 'checkbox', label: 'Checkbox (consent)' }
];

// Detect a field element's current type from its control
function getFieldType(field) {
    if (field.classList.contains('cf-check')) return 'checkbox';
    const ta = field.querySelector('textarea');
    if (ta) return 'textarea';
    const input = field.querySelector('input');
    return input ? (input.getAttribute('type') || 'text') : 'text';
}

function getFieldControl(field) {
    return field.querySelector('input, textarea');
}

// (Re)build a field element's inner structure for the given type, preserving values
function renderField(field, type, data) {
    const opts = Object.assign({ label: 'Field', name: '', placeholder: '', required: false }, data);

    if (type === 'checkbox') {
        field.className = 'cf-field cf-check';
        field.innerHTML = '';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = opts.name;
        if (opts.required) input.required = true;
        const span = document.createElement('span');
        span.className = 'cf-label';
        span.textContent = opts.label;
        field.appendChild(input);
        field.appendChild(span);
        return;
    }

    field.className = 'cf-field';
    field.innerHTML = '';

    const labelSpan = document.createElement('span');
    labelSpan.className = 'cf-label';
    labelSpan.textContent = opts.label + ' ';
    if (opts.required) {
        const req = document.createElement('span');
        req.className = 'cf-req';
        req.setAttribute('aria-hidden', 'true');
        req.textContent = '*';
        labelSpan.appendChild(req);
    }
    field.appendChild(labelSpan);

    let control;
    if (type === 'textarea') {
        control = document.createElement('textarea');
        control.rows = 4;
    } else {
        control = document.createElement('input');
        control.type = type;
    }
    control.name = opts.name;
    if (opts.placeholder) control.placeholder = opts.placeholder;
    if (opts.required) control.required = true;
    field.appendChild(control);
}

export default {
    name: 'contact-form',
    displayName: 'Contact / Newsletter Form',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'submit', label: 'Submission', fields: ['action', 'method', 'buttonText'] },
            { id: 'messages', label: 'Messages', fields: ['successMessage', 'errorMessage'] },
            { id: 'appearance', label: 'Appearance', fields: ['accentColor'] }
        ],
        action: {
            type: 'text',
            label: 'Form Action URL',
            default: '/submit-form',
            placeholder: '/submit-form or https://…',
            group: 'submit'
        },
        method: {
            type: 'select',
            label: 'Method',
            default: 'POST',
            options: [
                { value: 'POST', label: 'POST' },
                { value: 'GET', label: 'GET' }
            ],
            group: 'submit'
        },
        buttonText: {
            type: 'text',
            label: 'Submit Button Text',
            default: 'Send Message',
            group: 'submit'
        },
        successMessage: {
            type: 'text',
            label: 'Success Message',
            default: "Thanks! We'll be in touch soon.",
            group: 'messages'
        },
        errorMessage: {
            type: 'text',
            label: 'Error Message',
            default: 'Something went wrong. Please try again.',
            group: 'messages'
        },
        accentColor: {
            type: 'color',
            label: 'Accent Color',
            default: '#3b82f6',
            group: 'appearance'
        }
    },

    editor: {
        openContentEditor: function (element, builder, onChange) {
            // Translate editor-UI labels via the builder's language file (out()).
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;
            // Sortable.js on demand for reordering fields (same pattern as other plugins)
            const loadSortable = (() => {
                let p = null;
                return () => {
                    if (window.Sortable) return Promise.resolve(window.Sortable);
                    if (p) return p;
                    p = new Promise((resolve, reject) => {
                        const existing = document.querySelector('script[data-sortable-loader]');
                        if (existing) {
                            existing.addEventListener('load', () => resolve(window.Sortable));
                            existing.addEventListener('error', () => reject(new Error('SortableJS failed')));
                            return;
                        }
                        const s = document.createElement('script');
                        s.src = 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js';
                        s.dataset.sortableLoader = 'true';
                        s.onload = () => resolve(window.Sortable);
                        s.onerror = () => { p = null; reject(new Error('Failed to load SortableJS')); };
                        document.head.appendChild(s);
                    });
                    return p;
                };
            })();

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            const form = element.querySelector('.cf-form');
            const fieldsWrap = element.querySelector('.cf-fields');
            if (!form || !fieldsWrap) return container;

            const stack = document.createElement('div');
            stack.className = 'cbx-stack';
            container.appendChild(stack);

            const readField = (field) => ({
                label: (field.querySelector('.cf-label')?.textContent || '').replace(/\s*\*\s*$/, '').trim(),
                name: getFieldControl(field)?.getAttribute('name') || '',
                placeholder: getFieldControl(field)?.getAttribute('placeholder') || '',
                required: !!getFieldControl(field)?.required
            });

            const createFieldEditor = (field, index) => {
                const item = document.createElement('div');
                item.className = 'cbx-item';
                item.dataset.fieldId = field.dataset.fieldId || `f-${Date.now()}-${index}`;
                field.dataset.fieldId = item.dataset.fieldId;

                const head = document.createElement('div');
                head.className = 'cbx-item-head';
                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                const title = document.createElement('span');
                title.className = 'cbx-title';
                title.textContent = readField(field).label || `Field ${index + 1}`;
                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'cbx-iconbtn is-danger';
                del.setAttribute('aria-label', out('Delete field'));
                del.innerHTML = '<svg><use xlink:href="#icon-trash2"></use></svg>';
                del.onclick = (e) => { e.preventDefault(); field.remove(); item.remove(); onChange?.(); };
                head.append(drag, title, del);

                const body = document.createElement('div');
                body.className = 'cbx-item-body';
                body.style.display = 'none';

                // Re-render the field element from the current editor inputs
                const apply = () => {
                    const type = typeSel.value;
                    renderField(field, type, {
                        label: labelIn.value,
                        name: nameIn.value,
                        placeholder: phIn.value,
                        required: reqIn.checked
                    });
                    field.dataset.fieldId = item.dataset.fieldId;
                    title.textContent = labelIn.value || `Field ${index + 1}`;
                    // Placeholder field is irrelevant for checkboxes
                    phField.style.display = type === 'checkbox' ? 'none' : '';
                    onChange?.();
                };

                const addField = (labelText, input) => {
                    const f = document.createElement('div');
                    f.className = 'cbx-field';
                    const l = document.createElement('label');
                    l.textContent = out(labelText);
                    f.append(l, input);
                    body.appendChild(f);
                    return f;
                };

                const current = readField(field);

                const labelIn = document.createElement('input');
                labelIn.type = 'text';
                labelIn.value = current.label;
                labelIn.placeholder = out('Field label');
                labelIn.addEventListener('input', apply);
                addField('Label', labelIn);

                const nameIn = document.createElement('input');
                nameIn.type = 'text';
                nameIn.value = current.name;
                nameIn.placeholder = out('name (used in the submission data)');
                nameIn.addEventListener('input', apply);
                addField('Field Name', nameIn);

                const typeSel = document.createElement('select');
                FIELD_TYPES.forEach((t) => {
                    const o = document.createElement('option');
                    o.value = t.value;
                    o.textContent = out(t.label);
                    if (t.value === getFieldType(field)) o.selected = true;
                    typeSel.appendChild(o);
                });
                typeSel.addEventListener('change', apply);
                addField('Type', typeSel);

                const phIn = document.createElement('input');
                phIn.type = 'text';
                phIn.value = current.placeholder;
                phIn.placeholder = out('Placeholder text');
                phIn.addEventListener('input', apply);
                const phField = addField('Placeholder', phIn);
                if (getFieldType(field) === 'checkbox') phField.style.display = 'none';

                const reqWrap = document.createElement('label');
                reqWrap.className = 'checkbox';
                const reqIn = document.createElement('input');
                reqIn.type = 'checkbox';
                reqIn.checked = current.required;
                reqIn.addEventListener('change', apply);
                reqWrap.append(reqIn, document.createTextNode(' ' + out('Required')));
                body.appendChild(reqWrap);

                head.addEventListener('click', (e) => {
                    if (e.target.closest('.cbx-drag') || e.target.closest('button')) return;
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                item.append(head, body);
                return item;
            };

            fieldsWrap.querySelectorAll('.cf-field').forEach((field, i) => {
                stack.appendChild(createFieldEditor(field, i));
            });

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function () {
                        const map = new Map();
                        fieldsWrap.querySelectorAll('.cf-field').forEach((f) => {
                            if (f.dataset.fieldId) map.set(f.dataset.fieldId, f);
                        });
                        Array.from(stack.children).forEach((ed) => {
                            const f = map.get(ed.dataset.fieldId);
                            if (f) fieldsWrap.appendChild(f);
                        });
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag optional */ });

            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Field');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const field = document.createElement('label');
                field.dataset.fieldId = `f-${Date.now()}`;
                renderField(field, 'text', { label: 'New Field', name: 'field_' + (fieldsWrap.children.length + 1), placeholder: '', required: false });
                fieldsWrap.appendChild(field);
                stack.appendChild(createFieldEditor(field, stack.children.length));
                onChange?.();
            };
            container.appendChild(addBtn);

            return container;
        }
    },

    mount: function (element, options) {
        const opts = {
            action: options.action || '/submit-form',
            method: (options.method || 'POST').toUpperCase() === 'GET' ? 'GET' : 'POST',
            buttonText: options.buttonText || 'Send Message',
            successMessage: options.successMessage || "Thanks! We'll be in touch soon.",
            errorMessage: options.errorMessage || 'Something went wrong. Please try again.',
            accentColor: options.accentColor || '#3b82f6'
        };

        const form = element.querySelector('.cf-form');
        if (!form) return {};

        element.style.setProperty('--cf-accent', opts.accentColor);

        const submitBtn = form.querySelector('.cf-submit');
        const status = form.querySelector('.cf-status');
        if (submitBtn && opts.buttonText) submitBtn.textContent = opts.buttonText;

        element.setAttribute('role', 'form');
        if (!element.getAttribute('aria-label')) element.setAttribute('aria-label', 'Contact form');

        const setStatus = (msg, kind) => {
            if (!status) return;
            status.textContent = msg || '';
            status.classList.remove('is-success', 'is-error');
            if (kind) status.classList.add('is-' + kind);
        };

        const onSubmit = async (e) => {
            e.preventDefault();
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            const btnText = submitBtn ? submitBtn.textContent : '';
            if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
            setStatus('', null);

            try {
                const params = new URLSearchParams(new FormData(form));
                let url = opts.action;
                const init = { method: opts.method, headers: { 'Accept': 'application/json' } };
                if (opts.method === 'GET') {
                    url += (url.includes('?') ? '&' : '?') + params.toString();
                } else {
                    init.body = params; // sent as application/x-www-form-urlencoded
                }
                const res = await fetch(url, init);
                if (!res.ok) throw new Error('Request failed: ' + res.status);
                setStatus(opts.successMessage, 'success');
                form.reset();
            } catch (err) {
                setStatus(opts.errorMessage, 'error');
            } finally {
                if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = btnText; }
            }
        };

        form.addEventListener('submit', onSubmit);

        return {
            destroy() {
                form.removeEventListener('submit', onSubmit);
            }
        };
    },

    unmount: function (element, instance) {
        if (instance && instance.destroy) instance.destroy();
    }
};
