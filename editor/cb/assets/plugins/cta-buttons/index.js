export default {
    name: 'cta-buttons',
    displayName: 'CTA Buttons',
    version: '1.0.0',

    settings: {
        _groups: [
            {
                id: 'primary',
                label: 'Primary Button',
                fields: [
                    'primaryStyle',
                    'primaryColor1', 'primaryColor2', 'primaryTextColor',
                    'primaryPaddingY', 'primaryPaddingX', 'primaryBorderRadius',
                    'primaryFontSize', 'primaryFontWeight',
                    'primaryShadow', 'primaryHoverLift'
                ]
            },
            {
                id: 'secondary',
                label: 'Secondary Button',
                fields: [
                    'secondaryStyle',
                    'secondaryColor1', 'secondaryColor2', 'secondaryTextColor',
                    'secondaryPaddingY', 'secondaryPaddingX', 'secondaryBorderRadius',
                    'secondaryFontSize', 'secondaryFontWeight',
                    'secondaryShadow', 'secondaryHoverLift'
                ]
            },
            {
                id: 'layout',
                label: 'Layout',
                fields: ['gap', 'alignment']
            }
        ],

        primaryStyle: {
            type: 'select',
            label: 'Button Style',
            default: 'gradient',
            options: [
                { value: 'gradient', label: 'Gradient' },
                { value: 'solid', label: 'Solid' },
                { value: 'outline', label: 'Outline' },
                { value: 'ghost', label: 'Ghost' }
            ],
            group: 'primary'
        },
        primaryColor1: {
            type: 'color',
            label: 'Primary Color',
            default: '#6366f1',
            group: 'primary'
        },
        primaryColor2: {
            type: 'color',
            label: 'Secondary Color',
            default: '#8b5cf6',
            group: 'primary'
        },
        primaryTextColor: {
            type: 'color',
            label: 'Text Color',
            default: '#ffffff',
            group: 'primary'
        },
        primaryPaddingY: {
            type: 'range',
            label: 'Padding Vertical',
            default: 14,
            min: 8,
            max: 24,
            step: 1,
            unit: 'px',
            group: 'primary'
        },
        primaryPaddingX: {
            type: 'range',
            label: 'Padding Horizontal',
            default: 32,
            min: 16,
            max: 64,
            step: 1,
            unit: 'px',
            group: 'primary'
        },
        primaryBorderRadius: {
            type: 'range',
            label: 'Border Radius',
            default: 12,
            min: 0,
            max: 50,
            step: 1,
            unit: 'px',
            group: 'primary'
        },
        primaryFontSize: {
            type: 'range',
            label: 'Font Size',
            default: 16,
            min: 12,
            max: 24,
            step: 1,
            unit: 'px',
            group: 'primary'
        },
        primaryFontWeight: {
            type: 'boolean',
            label: 'Bold Text',
            default: true,
            group: 'primary'
        },
        primaryShadow: {
            type: 'boolean',
            label: 'Drop Shadow',
            default: true,
            group: 'primary'
        },
        primaryHoverLift: {
            type: 'boolean',
            label: 'Hover Lift Effect',
            default: true,
            group: 'primary'
        },

        secondaryStyle: {
            type: 'select',
            label: 'Button Style',
            default: 'outline',
            options: [
                { value: 'gradient', label: 'Gradient' },
                { value: 'solid', label: 'Solid' },
                { value: 'outline', label: 'Outline' },
                { value: 'ghost', label: 'Ghost' }
            ],
            group: 'secondary'
        },
        secondaryColor1: {
            type: 'color',
            label: 'Primary Color',
            default: '#e2e8f0',
            group: 'secondary'
        },
        secondaryColor2: {
            type: 'color',
            label: 'Secondary Color',
            default: '#cbd5e1',
            group: 'secondary'
        },
        secondaryTextColor: {
            type: 'color',
            label: 'Text Color',
            default: '#0f172a',
            group: 'secondary'
        },
        secondaryPaddingY: {
            type: 'range',
            label: 'Padding Vertical',
            default: 14,
            min: 8,
            max: 24,
            step: 1,
            unit: 'px',
            group: 'secondary'
        },
        secondaryPaddingX: {
            type: 'range',
            label: 'Padding Horizontal',
            default: 32,
            min: 16,
            max: 64,
            step: 1,
            unit: 'px',
            group: 'secondary'
        },
        secondaryBorderRadius: {
            type: 'range',
            label: 'Border Radius',
            default: 12,
            min: 0,
            max: 50,
            step: 1,
            unit: 'px',
            group: 'secondary'
        },
        secondaryFontSize: {
            type: 'range',
            label: 'Font Size',
            default: 16,
            min: 12,
            max: 24,
            step: 1,
            unit: 'px',
            group: 'secondary'
        },
        secondaryFontWeight: {
            type: 'boolean',
            label: 'Bold Text',
            default: true,
            group: 'secondary'
        },
        secondaryShadow: {
            type: 'boolean',
            label: 'Drop Shadow',
            default: true,
            group: 'secondary'
        },
        secondaryHoverLift: {
            type: 'boolean',
            label: 'Hover Lift Effect',
            default: false,
            group: 'secondary'
        },

        gap: {
            type: 'range',
            label: 'Gap Between Buttons',
            default: 16,
            min: 0,
            max: 48,
            step: 4,
            unit: 'px',
            group: 'layout'
        },
        alignment: {
            type: 'select',
            label: 'Alignment',
            default: 'center',
            options: [
                { value: 'flex-start', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'flex-end', label: 'Right' }
            ],
            group: 'layout'
        }
    },

    editor: {
        openContentEditor: function (element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            const buttons = element.querySelectorAll('.cta-btn');

            // labelled field (label + control)
            const makeField = (labelText, control) => {
                const f = document.createElement('div');
                f.className = 'cbx-field';
                const l = document.createElement('label');
                l.textContent = labelText;
                f.append(l, control);
                return f;
            };

            // One collapsible card per button (text + link)
            const addButtonCard = (titleText, btn) => {
                if (!btn) return;

                const card = document.createElement('div');
                card.className = 'cbx-item';

                const head = document.createElement('div');
                head.className = 'cbx-item-head';
                const title = document.createElement('span');
                title.className = 'cbx-title';
                title.textContent = titleText;
                head.appendChild(title);

                const body = document.createElement('div');
                body.className = 'cbx-item-body';

                // Button text
                const textInput = document.createElement('input');
                textInput.type = 'text';
                textInput.placeholder = out('Enter button text');
                textInput.value = btn.textContent.trim();
                textInput.addEventListener('input', () => {
                    btn.textContent = textInput.value;
                    onChange?.();
                });

                // Link URL
                const linkInput = document.createElement('input');
                linkInput.type = 'url';
                linkInput.placeholder = out('https://example.com');
                linkInput.value = btn.getAttribute('href') || '';
                linkInput.addEventListener('input', () => {
                    if (linkInput.value) {
                        btn.setAttribute('href', linkInput.value);
                    } else {
                        btn.removeAttribute('href');
                    }
                    onChange?.();
                });

                const hint = document.createElement('small');
                hint.className = 'cbx-hint';
                hint.textContent = out('Enter a valid URL for the button');

                body.append(
                    makeField(out('Button Text'), textInput),
                    makeField(out('Link URL'), linkInput),
                    hint
                );

                // Toggle body open/closed on head click
                head.addEventListener('click', () => {
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                card.append(head, body);
                container.appendChild(card);
            };

            addButtonCard(out('Primary Button'), buttons[0]);
            addButtonCard(out('Secondary Button'), buttons[1]);

            return container;
        }
    },

    mount: function (element, options) {
        const container = element.querySelector('.cta-buttons-container') || element;
        
        container.style.display = 'flex';
        container.style.gap = `${options.gap || 16}px`;
        container.style.justifyContent = options.alignment || 'center';
        container.style.alignItems = 'center';
        container.style.flexWrap = 'wrap';

        const buttons = container.querySelectorAll('.cta-btn');
        buttons.forEach((btn, index) => {
            const prefix = index === 0 ? 'primary' : 'secondary';
            this.styleButton(btn, options, prefix);
        });

        return {};
    },

    styleButton: function(btn, opts, prefix) {
        const style = opts[`${prefix}Style`] || 'gradient';
        const c1 = opts[`${prefix}Color1`] || '#6366f1';
        const c2 = opts[`${prefix}Color2`] || '#8b5cf6';
        const tc = opts[`${prefix}TextColor`] || '#ffffff';
        const py = opts[`${prefix}PaddingY`] ?? 14;
        const px = opts[`${prefix}PaddingX`] ?? 32;
        const br = opts[`${prefix}BorderRadius`] ?? 12;
        const fs = opts[`${prefix}FontSize`] ?? 16;
        const fw = opts[`${prefix}FontWeight`] !== false;
        const shadow = opts[`${prefix}Shadow`] !== false;
        const lift = opts[`${prefix}HoverLift`] !== false;

        // Helper function to add alpha to any color format
        const addAlpha = (color, alpha) => {
            if (color.startsWith('rgba')) {
                return color.replace(/[\d.]+\)$/g, `${alpha})`);
            } else if (color.startsWith('rgb')) {
                return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
            } else {
                return `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
            }
        };

        let bg, border, color, boxShadow;
        
        if (style === 'gradient') {
            bg = `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`;
            border = 'none';
            color = tc;
            boxShadow = shadow ? `0 10px 40px ${addAlpha(c1, 0.25)}` : 'none';
        } else if (style === 'solid') {
            bg = c1;
            border = 'none';
            color = tc;
            boxShadow = shadow ? `0 10px 40px ${addAlpha(c1, 0.25)}` : 'none';
        } else if (style === 'outline') {
            bg = 'white';
            border = `1px solid ${c1}`;
            color = tc;
            boxShadow = shadow ? '0 2px 8px rgba(0, 0, 0, 0.04)' : 'none';
        } else { // ghost
            bg = 'transparent';
            border = 'none';
            color = c1;
            boxShadow = shadow ? `0 10px 40px ${addAlpha(c1, 0.25)}` : 'none';
        }

        // Apply all styles at once
        btn.style.padding = `${py}px ${px}px`;
        btn.style.borderRadius = `${br}px`;
        btn.style.fontSize = `${fs}px`;
        btn.style.fontWeight = fw ? '600' : '400';
        btn.style.background = bg;
        btn.style.border = border;
        btn.style.color = color;
        btn.style.boxShadow = boxShadow;
        btn.style.cursor = 'pointer';
        btn.style.transition = 'all 0.3s ease';
        btn.style.textDecoration = 'none';
        btn.style.display = 'inline-block';

        // Hover handlers
        btn.onmouseenter = () => {
            if (lift) btn.style.transform = 'translateY(-2px)';
            
            if (style === 'gradient') {
                if (shadow) btn.style.boxShadow = `0 15px 50px ${addAlpha(c1, 0.38)}`;
            } else if (style === 'solid') {
                btn.style.background = c2;
                if (shadow) btn.style.boxShadow = `0 15px 50px ${addAlpha(c1, 0.38)}`;
            } else if (style === 'outline') {
                btn.style.background = `${addAlpha(c2, 0.03)}`;
                btn.style.borderColor = c2;
                if (shadow) btn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
            } else { // ghost
                btn.style.background = `${addAlpha(c1, 0.03)}`;
                if (shadow) btn.style.boxShadow = `0 15px 50px ${addAlpha(c1, 0.38)}`;
            }
        };

        btn.onmouseleave = () => {
            btn.style.transform = 'translateY(0)';
            btn.style.background = bg;
            btn.style.border = border;
            btn.style.boxShadow = boxShadow;
            if (style === 'outline') {
                btn.style.borderColor = c1;
            }
        };
    }
};