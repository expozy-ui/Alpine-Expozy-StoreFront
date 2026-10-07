/*
Usage:

<div data-cb-type="simple-stats" style="flex-wrap: wrap; gap: 32px; display: flex; justify-content: space-between;" class="flex justify-between" data-cb-columns="4" data-cb-alignment="center" data-cb-duration="2" data-cb-delay="0.1" data-cb-easing="ease-out" data-cb-number-size="60" data-cb-label-size="14" data-cb-show-dividers="true">
    <div class="stat-item" data-target="250">
        <div class="stat-number">250</div>
        <div class="stat-label">Projects Delivered</div>
    </div>
    <div class="stat-item" data-target="98">
        <div class="stat-number">98</div>
        <div class="stat-label">Client Satisfaction</div>
    </div>
    <div class="stat-item" data-target="15">
        <div class="stat-number">15</div>
        <div class="stat-label">Countries Served</div>
    </div>
    <div class="stat-item" data-target="24/7">
        <div class="stat-number">24/7</div>
        <div class="stat-label">Support Available</div>
    </div>
</div>
*/
export default {
    name: 'simple-stats',
    displayName: 'Simple Stats',
    version: '1.0.0',

    settings: {
        _groups: [
            {
                id: 'layout',
                label: 'Layout',
                fields: ['columns', 'alignment']
            },
            {
                id: 'animation',
                label: 'Animation',
                fields: ['duration', 'delay', 'easing']
            },
            {
                id: 'appearance',
                label: 'Appearance',
                fields: ['numberSize', 'labelSize', 'showDividers']
            }
        ],

        columns: {
            type: 'number',
            label: 'Columns',
            default: 4,
            min: 1,
            max: 6,
            group: 'layout'
        },
        alignment: {
            type: 'select',
            label: 'Text Alignment',
            default: 'center',
            options: [
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'right', label: 'Right' }
            ],
            group: 'layout'
        },
        duration: {
            type: 'number',
            label: 'Animation Duration',
            default: 2,
            min: 0.5,
            max: 5,
            step: 0.5,
            unit: 's',
            group: 'animation'
        },
        delay: {
            type: 'number',
            label: 'Stagger Delay',
            default: 0.1,
            min: 0,
            max: 1,
            step: 0.05,
            unit: 's',
            group: 'animation'
        },
        easing: {
            type: 'select',
            label: 'Easing Function',
            default: 'ease-out',
            options: [
                { value: 'linear', label: 'Linear' },
                { value: 'ease-out', label: 'Ease Out' },
                { value: 'ease-in-out', label: 'Ease In Out' }
            ],
            group: 'animation'
        },
        numberSize: {
            type: 'number',
            label: 'Number Size',
            default: 60,
            min: 24,
            max: 96,
            step: 2,
            unit: 'px',
            group: 'appearance'
        },
        labelSize: {
            type: 'number',
            label: 'Label Size',
            default: 14,
            min: 12,
            max: 24,
            step: 1,
            unit: 'px',
            group: 'appearance'
        },
        showDividers: {
            type: 'toggle',
            label: 'Show Dividers',
            default: true,
            group: 'appearance'
        }
    },

    editor: {
        openContentEditor: function (element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

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
                        script.onload = () => { resolve(window.Sortable); };
                        script.onerror = () => {
                            sortablePromise = null;
                            setTimeout(() => loadSortable(), 1000);
                            reject(new Error('Failed to load SortableJS'));
                        };
                        document.head.appendChild(script);
                    });
                    return sortablePromise;
                };
            })();

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            const stack = document.createElement('div');
            stack.className = 'cbx-stack';
            container.appendChild(stack);

            const stats = element.querySelectorAll('.stat-item');

            // labelled field (label + control)
            const makeField = (labelText, control) => {
                const f = document.createElement('div');
                f.className = 'cbx-field';
                const l = document.createElement('label');
                l.textContent = labelText;
                f.append(l, control);
                return f;
            };

            const createStatEditor = (statItem, index) => {
                statItem.dataset.statId = statItem.dataset.statId || `stat-${Date.now()}-${index}`;

                const section = document.createElement('div');
                section.className = 'cbx-item';
                section.dataset.statId = statItem.dataset.statId;

                const labelText = statItem.querySelector('.stat-label')?.textContent || `${out('Stat')} ${index + 1}`;
                const numberText = statItem.querySelector('.stat-number')?.textContent || '0';

                // ── Head: title + delete ──
                const head = document.createElement('div');
                head.className = 'cbx-item-head';

                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                drag.setAttribute('aria-label', out('Drag to reorder'));

                const titleText = document.createElement('span');
                titleText.className = 'cbx-title';
                titleText.textContent = `${numberText} - ${labelText}`;

                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className = 'cbx-iconbtn is-danger';
                deleteBtn.setAttribute('aria-label', out('Delete stat'));
                deleteBtn.innerHTML = '<svg aria-hidden="true"><use xlink:href="#icon-trash2"></use></svg>';
                deleteBtn.onclick = (e) => { e.preventDefault(); statItem.remove(); section.remove(); onChange?.(); };

                head.append(drag, titleText, deleteBtn);

                // ── Body ──
                const body = document.createElement('div');
                body.className = 'cbx-item-body';
                body.style.display = 'none';

                // Number
                const numberInput = document.createElement('input');
                numberInput.type = 'text';
                numberInput.placeholder = '250+';
                numberInput.value = statItem.dataset.target || '0';
                numberInput.addEventListener('input', () => {
                    statItem.dataset.target = numberInput.value;
                    const numEl = statItem.querySelector('.stat-number');
                    if (numEl) numEl.textContent = numberInput.value;
                    titleText.textContent = `${numberInput.value} - ${labelInput.value || out('Stat')}`;
                    onChange?.();
                });

                // Prefix
                const prefixInput = document.createElement('input');
                prefixInput.type = 'text';
                prefixInput.placeholder = '$';
                prefixInput.value = statItem.dataset.prefix || '';
                prefixInput.addEventListener('input', () => {
                    statItem.dataset.prefix = prefixInput.value;
                    onChange?.();
                });

                // Suffix
                const suffixInput = document.createElement('input');
                suffixInput.type = 'text';
                suffixInput.placeholder = '+';
                suffixInput.value = statItem.dataset.suffix || '';
                suffixInput.addEventListener('input', () => {
                    statItem.dataset.suffix = suffixInput.value;
                    onChange?.();
                });

                // Label
                const labelInput = document.createElement('input');
                labelInput.type = 'text';
                labelInput.placeholder = out('Projects Delivered');
                labelInput.value = statItem.querySelector('.stat-label')?.textContent || '';
                labelInput.addEventListener('input', () => {
                    let labelEl = statItem.querySelector('.stat-label');
                    if (!labelEl) {
                        labelEl = document.createElement('div');
                        labelEl.className = 'stat-label';
                        statItem.appendChild(labelEl);
                    }
                    labelEl.textContent = labelInput.value;
                    titleText.textContent = `${numberInput.value} - ${labelInput.value || out('Stat')}`;
                    onChange?.();
                });

                body.append(
                    makeField(out('Target Number'), numberInput),
                    makeField(out('Prefix (optional)'), prefixInput),
                    makeField(out('Suffix (optional)'), suffixInput),
                    makeField(out('Label'), labelInput)
                );

                // Toggle body open/closed on head click
                head.addEventListener('click', (e) => {
                    if (e.target.closest('.cbx-drag') || e.target.closest('button')) return;
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                section.append(head, body);
                return section;
            };

            stats.forEach((stat, i) => stack.appendChild(createStatEditor(stat, i)));

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function () {
                        const itemMap = new Map();
                        element.querySelectorAll('.stat-item').forEach(item => {
                            if (item.dataset.statId) itemMap.set(item.dataset.statId, item);
                        });
                        Array.from(stack.children).forEach(editorItem => {
                            const actualItem = itemMap.get(editorItem.dataset.statId);
                            if (actualItem && actualItem.parentElement === element) element.appendChild(actualItem);
                        });
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag optional */ });

            // Add Stat button
            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Stat');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const newStat = document.createElement('div');
                newStat.className = 'stat-item';
                newStat.dataset.statId = `stat-${Date.now()}`;
                newStat.dataset.target = '100';
                newStat.innerHTML = `
                    <div class="stat-number">100</div>
                    <div class="stat-label">New Stat</div>
                `;
                element.appendChild(newStat);
                stack.appendChild(createStatEditor(newStat, stack.children.length));
                onChange?.();
            };
            container.appendChild(addBtn);

            return container;
        }
    },

    mount: function (element, options) {
        element.style.display = 'flex';
        element.style.justifyContent = 'space-between';
        element.style.flexWrap = 'wrap';
        element.style.gap = '32px';

        // Apply custom sizes and alignment
        const stats = element.querySelectorAll('.stat-item');
        const alignment = options.alignment || 'center';
        const showDividers = options.showDividers !== false;
        
        stats.forEach((stat, index) => {
            stat.style.textAlign = alignment;
            stat.style.flex = '1';
            stat.style.minWidth = '120px';

            // Add/remove divider
            if (showDividers && index < stats.length - 1) {
                stat.style.borderRight = '1px solid rgb(229, 231, 235)';
                stat.style.paddingRight = '32px';
            } else {
                stat.style.borderRight = 'none';
                stat.style.paddingRight = '0';
            }

            const number = stat.querySelector('.stat-number');
            const label = stat.querySelector('.stat-label');

            if (number && options.numberSize) {
                number.style.fontSize = `${options.numberSize}px`;
            }
            if (label && options.labelSize) {
                label.style.fontSize = `${options.labelSize}px`;
            }
        });

        // Animation logic
        const duration = (options.duration || 2) * 1000;
        const delay = (options.delay || 0.1) * 1000;
        const easing = options.easing || 'ease-out';

        const easingFunctions = {
            'linear': t => t,
            'ease-out': t => 1 - Math.pow(1 - t, 3),
            'ease-in-out': t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
        };

        const easeFn = easingFunctions[easing];

        const animateValue = (element, start, end, duration, easeFn, prefix = '', suffix = '') => {
            const startTime = performance.now();
            const hasDecimal = end.toString().includes('.');

            const step = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeFn(progress);
                const current = start + (end - start) * easedProgress;

                element.textContent = prefix + (hasDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };

            requestAnimationFrame(step);
        };

        const observerCallback = (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';

                    setTimeout(() => {
                        const numberElement = entry.target.querySelector('.stat-number');
                        const targetText = entry.target.dataset.target || '0';
                        const prefix = entry.target.dataset.prefix || '';
                        const suffix = entry.target.dataset.suffix || '';

                        // Check if target contains only numbers (and decimals)
                        const numericMatch = targetText.match(/[\d.]+/);
                        if (numericMatch) {
                            const targetValue = parseFloat(numericMatch[0]);
                            // Extract non-numeric parts
                            const beforeNum = targetText.substring(0, targetText.indexOf(numericMatch[0]));
                            const afterNum = targetText.substring(targetText.indexOf(numericMatch[0]) + numericMatch[0].length);
                            
                            animateValue(numberElement, 0, targetValue, duration, easeFn, prefix + beforeNum, afterNum + suffix);
                        } else {
                            // No numeric value, just display as-is
                            numberElement.textContent = prefix + targetText + suffix;
                        }
                    }, index * delay);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.3
        });

        stats.forEach(stat => {
            observer.observe(stat);
        });

        return {
            destroy: () => {
                observer.disconnect();
            }
        };
    },

    unmount: function (element, instance) {
        if (instance && typeof instance.destroy === 'function') instance.destroy();
    }
};