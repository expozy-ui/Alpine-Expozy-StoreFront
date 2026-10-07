/*
Pricing Table plugin for ContentBuilder / ContentBox

Usage (embed this HTML into your content):

<div data-cb-type="pricing-table" data-cb-columns="3" data-cb-currency="$" data-cb-accent-color="#3b82f6" data-cb-billing-toggle="true" data-cb-default-period="monthly" role="region" aria-label="Pricing plans">
    <div class="pricing-billing-toggle" role="group" aria-label="Billing period">
        <button type="button" class="billing-option is-active" data-period="monthly">Monthly</button>
        <button type="button" class="billing-option" data-period="annually">Annually <span class="billing-save">Save 20%</span></button>
    </div>
    <div class="pricing-grid">
        <div class="pricing-plan">
            <div class="plan-header">
                <h3 class="plan-name">Starter</h3>
                <p class="plan-description">For individuals getting started</p>
            </div>
            <div class="plan-price">
                <span class="price-currency">$</span><span class="price-amount" data-monthly="9" data-annually="90">9</span><span class="price-period">/mo</span>
            </div>
            <ul class="plan-features">
                <li>1 project</li>
                <li>Up to 5 pages</li>
                <li class="feature-disabled">Priority support</li>
            </ul>
            <a href="#" class="plan-button">Get Started</a>
        </div>
        <div class="pricing-plan is-featured">
            <div class="plan-badge">Most Popular</div>
            <div class="plan-header">
                <h3 class="plan-name">Pro</h3>
                <p class="plan-description">For growing teams</p>
            </div>
            <div class="plan-price">
                <span class="price-currency">$</span><span class="price-amount" data-monthly="29" data-annually="290">29</span><span class="price-period">/mo</span>
            </div>
            <ul class="plan-features">
                <li>Unlimited projects</li>
                <li>Unlimited pages</li>
                <li>Priority support</li>
            </ul>
            <a href="#" class="plan-button">Get Started</a>
        </div>
        <div class="pricing-plan">
            <div class="plan-header">
                <h3 class="plan-name">Enterprise</h3>
                <p class="plan-description">For large organizations</p>
            </div>
            <div class="plan-price">
                <span class="price-currency">$</span><span class="price-amount" data-monthly="99" data-annually="990">99</span><span class="price-period">/mo</span>
            </div>
            <ul class="plan-features">
                <li>Everything in Pro</li>
                <li>Dedicated manager</li>
                <li>Custom integrations</li>
            </ul>
            <a href="#" class="plan-button">Contact Sales</a>
        </div>
    </div>
</div>
*/

export default {
    name: 'pricing-table',
    displayName: 'Pricing Table',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'layout', label: 'Layout', fields: ['columns'] },
            { id: 'content', label: 'Billing', fields: ['currency', 'billingToggle', 'monthlyLabel', 'annuallyLabel', 'saveLabel', 'defaultPeriod'] },
            { id: 'appearance', label: 'Appearance', fields: ['accentColor', 'shadow', 'rounded'] }
        ],
        columns: {
            type: 'number',
            label: 'Columns',
            default: 3,
            min: 1,
            max: 4,
            group: 'layout'
        },
        currency: {
            type: 'text',
            label: 'Currency Symbol',
            default: '$',
            placeholder: '$',
            group: 'content'
        },
        billingToggle: {
            type: 'boolean',
            label: 'Show Monthly / Annually Toggle',
            default: true,
            group: 'content'
        },
        monthlyLabel: {
            type: 'text',
            label: 'Monthly Label',
            default: 'Monthly',
            placeholder: 'Monthly',
            group: 'content'
        },
        annuallyLabel: {
            type: 'text',
            label: 'Annually Label',
            default: 'Annually',
            placeholder: 'Annually',
            group: 'content'
        },
        saveLabel: {
            type: 'text',
            label: 'Savings Badge',
            default: 'Save 20%',
            placeholder: 'Save 20%',
            description: 'Small badge next to the Annually label. Leave empty to hide it.',
            group: 'content'
        },
        defaultPeriod: {
            type: 'select',
            label: 'Default Billing Period',
            default: 'monthly',
            options: [
                { value: 'monthly', label: 'Monthly' },
                { value: 'annually', label: 'Annually' }
            ],
            group: 'content'
        },
        accentColor: {
            type: 'color',
            label: 'Accent Color',
            default: '#3b82f6',
            group: 'appearance'
        },
        shadow: {
            type: 'boolean',
            label: 'Card Shadow',
            default: true,
            group: 'appearance'
        },
        rounded: {
            type: 'boolean',
            label: 'Rounded Corners',
            default: true,
            group: 'appearance'
        }
    },

    editor: {
        openContentEditor: function (element, builder, onChange) {
            // Translate editor-UI labels via the builder's language file (out()).
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;
            // Load Sortable.js on demand for reordering plans (same pattern as card-list)
            const loadSortable = (() => {
                let sortablePromise = null;
                return () => {
                    if (window.Sortable) return Promise.resolve(window.Sortable);
                    if (sortablePromise) return sortablePromise;
                    sortablePromise = new Promise((resolve, reject) => {
                        const existing = document.querySelector('script[data-sortable-loader]');
                        if (existing) {
                            existing.addEventListener('load', () => resolve(window.Sortable));
                            existing.addEventListener('error', () => reject(new Error('SortableJS failed')));
                            return;
                        }
                        const script = document.createElement('script');
                        script.src = 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js';
                        script.dataset.sortableLoader = 'true';
                        script.onload = () => resolve(window.Sortable);
                        script.onerror = () => {
                            sortablePromise = null;
                            reject(new Error('Failed to load SortableJS'));
                        };
                        document.head.appendChild(script);
                    });
                    return sortablePromise;
                };
            })();

            // The returned root is a stack, so its children (the plan list and the
            // "Add Plan" button) are evenly spaced by the shared gap — no margins.
            const container = document.createElement('div');
            container.className = 'cbx-stack';
            const grid = element.querySelector('.pricing-grid');
            if (!grid) return container;

            // ----- Feature row editor (text + included toggle + delete) -----
            const createFeatureRow = (li, featuresList) => {
                const row = document.createElement('div');
                row.className = 'cbx-row';

                const included = document.createElement('input');
                included.type = 'checkbox';
                included.checked = !li.classList.contains('feature-disabled');
                included.title = 'Included';
                included.setAttribute('aria-label', out('Feature included'));
                included.addEventListener('change', () => {
                    li.classList.toggle('feature-disabled', !included.checked);
                    onChange?.();
                });

                const text = document.createElement('input');
                text.type = 'text';
                text.className = 'cbx-grow';
                text.placeholder = out('Feature text');
                text.value = li.textContent.trim();
                text.addEventListener('input', () => {
                    li.textContent = text.value;
                    onChange?.();
                });

                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'cbx-iconbtn is-danger';
                del.innerHTML = '<svg><use xlink:href="#icon-trash2"></use></svg>';
                del.setAttribute('aria-label', out('Delete feature'));
                del.onclick = (e) => {
                    e.preventDefault();
                    li.remove();
                    row.remove();
                    onChange?.();
                };

                row.appendChild(included);
                row.appendChild(text);
                row.appendChild(del);
                featuresList._editorRows.appendChild(row);
            };

            // ----- Plan editor (collapsible) -----
            const createPlanEditor = (plan, index) => {
                const planEditor = document.createElement('div');
                planEditor.className = 'cbx-item';
                planEditor.dataset.planId = plan.dataset.planId || `plan-${Date.now()}-${index}`;
                plan.dataset.planId = planEditor.dataset.planId;

                // Header
                const header = document.createElement('div');
                header.className = 'cbx-item-head';

                const dragHandle = document.createElement('span');
                dragHandle.className = 'cbx-drag';
                dragHandle.innerHTML = '⠿';

                const titleSpan = document.createElement('span');
                titleSpan.className = 'cbx-title';
                titleSpan.textContent = plan.querySelector('.plan-name')?.textContent || `Plan ${index + 1}`;

                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'cbx-iconbtn is-danger';
                del.innerHTML = '<svg><use xlink:href="#icon-trash2"></use></svg>';
                del.setAttribute('aria-label', out('Delete plan'));
                del.onclick = (e) => {
                    e.preventDefault();
                    plan.remove();
                    planEditor.remove();
                    onChange?.();
                };

                header.appendChild(dragHandle);
                header.appendChild(titleSpan);
                header.appendChild(del);

                // Body
                const body = document.createElement('div');
                body.className = 'cbx-item-body';
                body.style.display = 'none';

                const addField = (labelText, inputEl) => {
                    const field = document.createElement('div');
                    field.className = 'cbx-field';
                    const label = document.createElement('label');
                    label.textContent = out(labelText);
                    field.appendChild(label);
                    field.appendChild(inputEl);
                    body.appendChild(field);
                };

                // Plan name
                const nameInput = document.createElement('input');
                nameInput.type = 'text';
                nameInput.value = plan.querySelector('.plan-name')?.textContent || '';
                nameInput.placeholder = out('Plan name');
                nameInput.addEventListener('input', () => {
                    let el = plan.querySelector('.plan-name');
                    if (el) el.textContent = nameInput.value;
                    titleSpan.textContent = nameInput.value || `Plan ${index + 1}`;
                    onChange?.();
                });
                addField('Plan Name', nameInput);

                // Description
                const descInput = document.createElement('input');
                descInput.type = 'text';
                descInput.value = plan.querySelector('.plan-description')?.textContent || '';
                descInput.placeholder = out('Short description');
                descInput.addEventListener('input', () => {
                    let el = plan.querySelector('.plan-description');
                    if (!el && descInput.value) {
                        el = document.createElement('p');
                        el.className = 'plan-description';
                        plan.querySelector('.plan-header')?.appendChild(el);
                    }
                    if (el) el.textContent = descInput.value;
                    onChange?.();
                });
                addField('Description', descInput);

                // Prices (monthly / annually)
                const amountEl = plan.querySelector('.price-amount');
                const priceRow = document.createElement('div');
                priceRow.className = 'cbx-row';

                const monthlyInput = document.createElement('input');
                monthlyInput.type = 'text';
                monthlyInput.value = amountEl?.dataset.monthly ?? (amountEl?.textContent.trim() || '');
                monthlyInput.placeholder = out('Monthly');
                monthlyInput.addEventListener('input', () => {
                    if (amountEl) {
                        amountEl.dataset.monthly = monthlyInput.value;
                        // reflect immediately if currently showing monthly
                        if (element.dataset.currentPeriod !== 'annually') amountEl.textContent = monthlyInput.value;
                    }
                    onChange?.();
                });

                const annuallyInput = document.createElement('input');
                annuallyInput.type = 'text';
                annuallyInput.value = amountEl?.dataset.annually ?? '';
                annuallyInput.placeholder = out('Annually');
                annuallyInput.addEventListener('input', () => {
                    if (amountEl) {
                        amountEl.dataset.annually = annuallyInput.value;
                        if (element.dataset.currentPeriod === 'annually') amountEl.textContent = annuallyInput.value;
                    }
                    onChange?.();
                });

                const mWrap = document.createElement('div');
                mWrap.className = 'cbx-field cbx-grow';
                const mLabel = document.createElement('label');
                mLabel.textContent = out('Monthly Price');
                mWrap.appendChild(mLabel);
                mWrap.appendChild(monthlyInput);

                const aWrap = document.createElement('div');
                aWrap.className = 'cbx-field cbx-grow';
                const aLabel = document.createElement('label');
                aLabel.textContent = out('Annual Price');
                aWrap.appendChild(aLabel);
                aWrap.appendChild(annuallyInput);

                priceRow.appendChild(mWrap);
                priceRow.appendChild(aWrap);
                body.appendChild(priceRow);

                // Badge text
                const badgeInput = document.createElement('input');
                badgeInput.type = 'text';
                badgeInput.value = plan.querySelector('.plan-badge')?.textContent || '';
                badgeInput.placeholder = out('e.g. Most Popular (leave empty for none)');
                badgeInput.addEventListener('input', () => {
                    let badge = plan.querySelector('.plan-badge');
                    const val = badgeInput.value.trim();
                    if (val) {
                        if (!badge) {
                            badge = document.createElement('div');
                            badge.className = 'plan-badge';
                            plan.insertBefore(badge, plan.firstChild);
                        }
                        badge.textContent = val;
                    } else if (badge) {
                        badge.remove();
                    }
                    onChange?.();
                });
                addField('Badge Text', badgeInput);

                // Featured toggle (uses the panel's native inline checkbox layout)
                const featuredWrap = document.createElement('label');
                featuredWrap.className = 'checkbox';
                const featuredCheck = document.createElement('input');
                featuredCheck.type = 'checkbox';
                featuredCheck.checked = plan.classList.contains('is-featured');
                featuredCheck.addEventListener('change', () => {
                    plan.classList.toggle('is-featured', featuredCheck.checked);
                    onChange?.();
                });
                featuredWrap.appendChild(featuredCheck);
                featuredWrap.appendChild(document.createTextNode(' ' + out('Highlight this plan')));
                body.appendChild(featuredWrap);

                // Button text + URL
                const btnEl = plan.querySelector('.plan-button');
                const btnTextInput = document.createElement('input');
                btnTextInput.type = 'text';
                btnTextInput.value = btnEl?.textContent || '';
                btnTextInput.placeholder = out('Button text');
                btnTextInput.addEventListener('input', () => {
                    if (btnEl) btnEl.textContent = btnTextInput.value;
                    onChange?.();
                });
                addField('Button Text', btnTextInput);

                const btnUrlInput = document.createElement('input');
                btnUrlInput.type = 'text';
                btnUrlInput.value = btnEl?.getAttribute('href') || '';
                btnUrlInput.placeholder = 'https://example.com';
                btnUrlInput.addEventListener('input', () => {
                    if (btnEl) btnEl.setAttribute('href', btnUrlInput.value);
                    onChange?.();
                });
                addField('Button URL', btnUrlInput);

                // Features — label + list as one .cbx-field so the label sits at
                // the same gap above its list as every other field's label.
                const featField = document.createElement('div');
                featField.className = 'cbx-field';
                const featLabel = document.createElement('label');
                featLabel.textContent = out('Features');
                featField.appendChild(featLabel);

                const featuresList = plan.querySelector('.plan-features');
                const featureRows = document.createElement('div');
                featureRows.className = 'cbx-stack';
                featField.appendChild(featureRows);
                body.appendChild(featField);

                if (featuresList) {
                    featuresList._editorRows = featureRows;
                    featuresList.querySelectorAll('li').forEach((li) => createFeatureRow(li, featuresList));
                }

                const addFeatureBtn = document.createElement('button');
                addFeatureBtn.type = 'button';
                addFeatureBtn.textContent = out('+ Add Feature');
                addFeatureBtn.onclick = (e) => {
                    e.preventDefault();
                    let list = plan.querySelector('.plan-features');
                    if (!list) {
                        list = document.createElement('ul');
                        list.className = 'plan-features';
                        const price = plan.querySelector('.plan-price');
                        price ? price.after(list) : plan.appendChild(list);
                    }
                    list._editorRows = featureRows;
                    const li = document.createElement('li');
                    li.textContent = 'New feature';
                    list.appendChild(li);
                    createFeatureRow(li, list);
                    onChange?.();
                };
                body.appendChild(addFeatureBtn);

                header.addEventListener('click', (e) => {
                    if (e.target.closest('.cbx-drag') || e.target.closest('button')) return;
                    // Toggle between hidden and the CSS default (flex) — never force
                    // 'block', which would override .cbx-item-body's flex layout.
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                planEditor.appendChild(header);
                planEditor.appendChild(body);
                return planEditor;
            };

            // A .cbx-stack like any vertical list. Items' own margin-bottom is
            // auto-zeroed inside a stack (see .cbx-stack > .cbx-item), so no double.
            const plansContainer = document.createElement('div');
            plansContainer.className = 'cbx-stack';
            grid.querySelectorAll('.pricing-plan').forEach((plan, i) => {
                plansContainer.appendChild(createPlanEditor(plan, i));
            });
            container.appendChild(plansContainer);

            // Reorder plans with drag & drop
            loadSortable().then((Sortable) => {
                new Sortable(plansContainer, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function () {
                        const editorItems = Array.from(plansContainer.children);
                        const map = new Map();
                        grid.querySelectorAll('.pricing-plan').forEach((p) => {
                            if (p.dataset.planId) map.set(p.dataset.planId, p);
                        });
                        editorItems.forEach((ed) => {
                            const p = map.get(ed.dataset.planId);
                            if (p) grid.appendChild(p);
                        });
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag & drop optional */ });

            // Add new plan
            const addPlanBtn = document.createElement('button');
            addPlanBtn.type = 'button';
            addPlanBtn.textContent = out('+ Add Plan');
            addPlanBtn.onclick = (e) => {
                e.preventDefault();
                const plan = document.createElement('div');
                plan.className = 'pricing-plan';
                plan.dataset.planId = `plan-${Date.now()}`;
                plan.innerHTML = `
                    <div class="plan-header">
                        <h3 class="plan-name">New Plan</h3>
                        <p class="plan-description">Plan description</p>
                    </div>
                    <div class="plan-price">
                        <span class="price-currency">$</span><span class="price-amount" data-monthly="19" data-annually="190">19</span><span class="price-period">/mo</span>
                    </div>
                    <ul class="plan-features">
                        <li>Feature one</li>
                        <li>Feature two</li>
                    </ul>
                    <a href="#" class="plan-button">Get Started</a>
                `;
                grid.appendChild(plan);
                // Apply currency + current period so the new plan matches the others
                const currency = element.getAttribute('data-cb-currency') || '$';
                plan.querySelector('.price-currency').textContent = currency;
                plansContainer.appendChild(createPlanEditor(plan, plansContainer.children.length));
                onChange?.();
            };
            container.appendChild(addPlanBtn);

            // No <style> block needed — layout comes from the shared .cbx-* panel
            // helper classes baked into contentbuilder.scss (.is-modal.pluginsettings).

            return container;
        }
    },

    mount: function (element, options) {
        const opts = {
            columns: parseInt(options.columns) || 3,
            currency: options.currency != null ? String(options.currency) : '$',
            accentColor: options.accentColor || '#3b82f6',
            billingToggle: options.billingToggle === true || options.billingToggle === 'true',
            defaultPeriod: options.defaultPeriod === 'annually' ? 'annually' : 'monthly'
        };

        const grid = element.querySelector('.pricing-grid');
        if (!grid) return {};

        // Layout + theming
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = `repeat(${opts.columns}, 1fr)`;
        element.style.setProperty('--pt-accent', opts.accentColor);

        // Currency symbol
        element.querySelectorAll('.price-currency').forEach((el) => { el.textContent = opts.currency; });

        // Billing toggle
        const toggle = element.querySelector('.pricing-billing-toggle');
        const amounts = element.querySelectorAll('.price-amount');
        const periods = element.querySelectorAll('.price-period');

        // Toggle button labels. The buttons are functional (they switch the period),
        // so they can't be inline-edited — the text comes from these settings. Falls
        // back to the defaults for older embeds without the attributes. The Savings
        // Badge is optional: an empty value hides it.
        if (toggle) {
            const monthlyBtn = toggle.querySelector('.billing-option[data-period="monthly"]');
            const annuallyBtn = toggle.querySelector('.billing-option[data-period="annually"]');
            if (monthlyBtn) monthlyBtn.textContent = options.monthlyLabel || 'Monthly';
            if (annuallyBtn) {
                annuallyBtn.textContent = options.annuallyLabel || 'Annually';
                const saveText = (options.saveLabel != null ? options.saveLabel : 'Save 20%').trim();
                if (saveText !== '') {
                    annuallyBtn.appendChild(document.createTextNode(' '));
                    const span = document.createElement('span');
                    span.className = 'billing-save';
                    span.textContent = saveText;
                    annuallyBtn.appendChild(span);
                }
            }
        }

        const applyPeriod = (period) => {
            element.dataset.currentPeriod = period;
            amounts.forEach((el) => {
                const val = period === 'annually' ? el.dataset.annually : el.dataset.monthly;
                if (val != null && val !== '') el.textContent = val;
            });
            periods.forEach((el) => { el.textContent = period === 'annually' ? '/yr' : '/mo'; });
            if (toggle) {
                toggle.querySelectorAll('.billing-option').forEach((btn) => {
                    btn.classList.toggle('is-active', btn.dataset.period === period);
                    btn.setAttribute('aria-pressed', String(btn.dataset.period === period));
                });
            }
        };

        const handlers = [];
        if (toggle) {
            if (opts.billingToggle) {
                toggle.style.display = '';
                toggle.querySelectorAll('.billing-option').forEach((btn) => {
                    const h = () => applyPeriod(btn.dataset.period);
                    btn.addEventListener('click', h);
                    handlers.push([btn, h]);
                });
            } else {
                toggle.style.display = 'none';
            }
        }

        applyPeriod(opts.billingToggle ? opts.defaultPeriod : 'monthly');

        // Accessibility
        element.setAttribute('role', 'region');
        if (!element.getAttribute('aria-label')) element.setAttribute('aria-label', 'Pricing plans');

        return {
            destroy() {
                handlers.forEach(([btn, h]) => btn.removeEventListener('click', h));
            }
        };
    },

    unmount: function (element, instance) {
        if (instance && instance.destroy) instance.destroy();
    }
};
