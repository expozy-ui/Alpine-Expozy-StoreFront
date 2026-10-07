export default {
    name: 'animated-stats',
    displayName: 'Animated Stats',
    version: '1.1.0',

    settings: {
        _groups: [
            {
                id: 'layout',
                label: 'Layout',
                fields: ['columns', 'alignment', 'variant', 'background', 'bgColor', 'borderColor', 'gap', 'hover', 'rounded']
            },
            {
                id: 'animation',
                label: 'Animation',
                fields: ['duration', 'delay', 'easing']
            },
            {
                id: 'appearance',
                label: 'Appearance',
                fields: ['showIcon', 'iconSize', 'numberSize', 'numberWeight', 'numberColor', 'labelSize']
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
        variant: {
            type: 'select',
            label: 'Style',
            default: 'cards',
            options: [
                { value: 'cards', label: 'Cards' },
                { value: 'minimal', label: 'Minimal (no card)' },
                { value: 'divided', label: 'Divided (vertical lines)' }
            ],
            group: 'layout'
        },
        background: {
            type: 'select',
            label: 'Background (Cards)',
            default: 'solid',
            options: [
                { value: 'solid', label: 'Solid' },
                { value: 'transparent', label: 'Transparent' },
                { value: 'glass', label: 'Glass (blur)' }
            ],
            group: 'layout'
        },
        bgColor: {
            type: 'color',
            label: 'Background Color',
            default: '#ffffff',
            group: 'layout'
        },
        borderColor: {
            type: 'color',
            label: 'Border Color (Cards)',
            default: '#e5e7eb',
            group: 'layout'
        },
        gap: {
            type: 'number',
            label: 'Gap',
            default: 32,
            min: 0,
            max: 80,
            step: 4,
            unit: 'px',
            group: 'layout'
        },
        hover: {
            type: 'select',
            label: 'Hover Effect',
            default: 'lift',
            options: [
                { value: 'none', label: 'None' },
                { value: 'lift', label: 'Lift' },
                { value: 'lift-shadow', label: 'Lift + Shadow (Cards)' }
            ],
            group: 'layout'
        },
        rounded: {
            type: 'boolean',
            label: 'Rounded Corners (Cards)',
            default: true,
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
        showIcon: {
            type: 'boolean',
            label: 'Show Icon',
            default: true,
            group: 'appearance'
        },
        iconSize: {
            type: 'number',
            label: 'Icon Size (emoji & icon fonts)',
            default: 48,
            min: 24,
            max: 96,
            step: 4,
            unit: 'px',
            group: 'appearance'
        },
        numberSize: {
            type: 'number',
            label: 'Number Size',
            default: 42,
            min: 24,
            max: 120,
            step: 2,
            unit: 'px',
            group: 'appearance'
        },
        numberWeight: {
            type: 'select',
            label: 'Number Weight',
            default: '500',
            options: [
                { value: '300', label: 'Light' },
                { value: '400', label: 'Normal' },
                { value: '500', label: 'Medium' },
                { value: '600', label: 'Semibold' },
                { value: '700', label: 'Bold' }
            ],
            group: 'appearance'
        },
        numberColor: {
            type: 'color',
            label: 'Number Color',
            default: '',
            group: 'appearance'
        },
        labelSize: {
            type: 'number',
            label: 'Label Size',
            default: 16,
            min: 12,
            max: 24,
            step: 1,
            unit: 'px',
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

                // ── Head: title + delete ──
                const head = document.createElement('div');
                head.className = 'cbx-item-head';

                const labelText = statItem.querySelector('.stat-label')?.textContent || `${out('Stat')} ${index + 1}`;
                const numberText = statItem.querySelector('.stat-number')?.textContent || '0';

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

                // Icon preview + browse
                const iconPreview = document.createElement('div');
                iconPreview.className = 'cbx-iconpreview';

                const browseIcons = document.createElement('button');
                browseIcons.type = 'button';
                browseIcons.className = 'cbx-iconbtn';
                browseIcons.setAttribute('aria-label', out('Browse icons'));
                browseIcons.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>';
                browseIcons.onclick = (e) => {
                    e.preventDefault();
                    builder.openIconPicker((html) => {
                        iconInput.value = html;
                        updateIconPreview();
                        updateStatIcon();
                    });
                };

                const iconRow = document.createElement('div');
                iconRow.className = 'cbx-row';
                iconRow.append(iconPreview, browseIcons);

                // Icon code input
                const iconInput = document.createElement('textarea');
                iconInput.rows = 4;
                iconInput.placeholder = out('Paste emoji, SVG code, or an icon tag — e.g. 📊 or <i class="bi bi-heart-fill"></i>');

                // Get current icon content
                const iconElement = statItem.querySelector('.stat-icon');
                if (iconElement) {
                    const innerHTML = iconElement.innerHTML.trim();
                    iconInput.value = innerHTML.startsWith('<') ? innerHTML : iconElement.textContent;
                }

                const iconHint = document.createElement('small');
                iconHint.className = 'cbx-hint';
                iconHint.textContent = out('Supports icons, emoji, and inline SVG.');

                // Detect icon type from input
                const detectIconType = (value) => {
                    const trimmed = value.trim();
                    if (trimmed.startsWith('<svg')) return 'svg';
                    if (trimmed.startsWith('<i')) {
                        if (trimmed.includes('class="bi')) return 'bootstrap';
                        else if (trimmed.includes('class="ti')) return 'tabler';
                        else if (trimmed.includes('data-lucide')) return 'lucide';
                        else return 'othericon';
                    }
                    return 'emoji';
                };

                // Update icon preview
                const updateIconPreview = () => {
                    const value = iconInput.value.trim();
                    const type = detectIconType(value);
                    iconPreview.innerHTML = '';

                    switch (type) {
                        case 'emoji':
                            iconPreview.textContent = value || '📊';
                            break;
                        default:
                            iconPreview.innerHTML = value || '<svg width="32" height="32"><circle cx="16" cy="16" r="12" fill="#999"/></svg>';
                            const previewIcon = iconPreview.querySelector('i, svg');
                            if (previewIcon) {
                                previewIcon.style.fontSize = '32px';
                            }
                            if (type === 'lucide' && window.lucide) {
                                setTimeout(() => window.lucide.createIcons(), 10);
                            }
                            break;
                    }
                };

                // Update actual icon in the stat
                const updateStatIcon = () => {
                    const value = iconInput.value.trim();
                    const type = detectIconType(value);

                    let icon = statItem.querySelector('.stat-icon');
                    if (!icon) {
                        icon = document.createElement('div');
                        icon.className = 'stat-icon';
                        statItem.prepend(icon);
                    }

                    icon.dataset.iconType = type;

                    if (type === 'emoji') {
                        icon.textContent = value;
                        icon.innerHTML = '';
                    } else {
                        icon.innerHTML = value;
                        if (type === 'lucide' && window.lucide) {
                            setTimeout(() => window.lucide.createIcons(), 10);
                        }
                    }

                    onChange?.();
                };

                iconInput.addEventListener('input', () => {
                    updateIconPreview();
                    updateStatIcon();
                });
                updateIconPreview();

                // Number
                const numberInput = document.createElement('input');
                numberInput.type = 'text';
                numberInput.placeholder = '1000';
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
                labelInput.placeholder = out('Happy Clients');
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

                // Assemble body
                body.append(
                    iconRow,
                    makeField(out('Icon'), iconInput),
                    iconHint,
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
                    <div class="stat-icon" data-icon-type="emoji">📊</div>
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
        element.style.display = 'grid';
        element.style.gridTemplateColumns = `repeat(${options.columns || 4}, 1fr)`;
        element.style.gap = `${options.gap != null ? +options.gap : 32}px`;
        // Number + card-background colors (Show Icon, Style, and Background mode are
        // handled in CSS via the data-cb-* attributes).
        element.style.setProperty('--as-number', options.numberColor || '');
        element.style.setProperty('--as-card-bg', options.bgColor || '#ffffff');
        element.style.setProperty('--as-card-border', options.borderColor || '#e5e7eb');

        // Apply custom sizes and alignment
        const stats = element.querySelectorAll('.stat-item');
        const alignment = options.alignment || 'center';

        // Space between icon / number / label scales with the number size, so big
        // numbers don't sit cramped against their label. (≈12px at the default 42px.)
        const numSizeForGap = options.numberSize ? +options.numberSize : 42;
        const itemGap = Math.max(10, Math.round(numSizeForGap * 0.28));

        stats.forEach(stat => {
            // Apply alignment to the entire stat item content
            const alignMap = {
                'left': 'flex-start',
                'center': 'center',
                'right': 'flex-end'
            };
            stat.style.alignItems = alignMap[alignment] || 'center';
            stat.style.textAlign = alignment;
            stat.style.gap = itemGap + 'px';

            const icon = stat.querySelector('.stat-icon');
            const number = stat.querySelector('.stat-number');
            const label = stat.querySelector('.stat-label');

            if (icon && options.iconSize) {
                const iconType = icon.dataset.iconType;
                // Only apply size to emoji and icon fonts, NOT SVG
                if (iconType === 'emoji') {
                    icon.style.fontSize = `${options.iconSize}px`;
                } else {
                    const iconChild = icon.querySelector('i');
                    if (iconChild) {
                        // Apply size to icon fonts (Bootstrap, Tabler, Lucide)
                        iconChild.style.fontSize = `${options.iconSize}px`;
                        iconChild.style.width = `${options.iconSize}px`;
                        iconChild.style.height = `${options.iconSize}px`;
                    }
                    const svg = icon.querySelector('svg');
                    if(svg) {
                        svg.style.width = `${options.iconSize}px`;
                        svg.style.height = `${options.iconSize}px`;
                    }
                }
            }
            if (number && options.numberSize) {
                number.style.fontSize = `${options.numberSize}px`;
            }
            if (number && options.numberWeight) {
                number.style.fontWeight = options.numberWeight;
            }
            if (label && options.labelSize) {
                label.style.fontSize = `${options.labelSize}px`;
            }
        });

        // Initialize Lucide icons if available
        if (window.lucide) {
            window.lucide.createIcons();
        }

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
                        const targetValue = parseFloat(entry.target.dataset.target) || 0;
                        const prefix = entry.target.dataset.prefix || '';
                        const suffix = entry.target.dataset.suffix || '';

                        animateValue(numberElement, 0, targetValue, duration, easeFn, prefix, suffix);
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
    }
};