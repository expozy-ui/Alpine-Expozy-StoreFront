export default {
    name: 'more-info',
    displayName: 'More Info',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'appearance', label: 'Appearance', fields: ['style', 'trigger', 'maxWidth', 'position'] }
        ],
        style: {
            type: 'select',
            label: 'Display Style',
            default: 'info',
            options: [
                { value: 'info', label: '🛈 Info Tooltip (blue)' },
                { value: 'citation', label: '[#] Citation (superscript)' },
                { value: 'highlight', label: '✨ Highlight (yellow)' }
            ],
            group: 'appearance'
        },
        trigger: {
            type: 'select',
            label: 'Show On',
            default: 'hover',
            options: [
                { value: 'hover', label: 'Hover (+ click for persistent)' },
                { value: 'click', label: 'Click only' }
            ],
            group: 'appearance'
        },
        maxWidth: {
            type: 'number',
            label: 'Popover Max Width',
            default: 320,
            min: 200,
            max: 600,
            step: 20,
            unit: 'px',
            group: 'appearance'
        },
        position: {
            type: 'select',
            label: 'Preferred Position',
            default: 'top',
            options: [
                { value: 'top', label: 'Top' },
                { value: 'bottom', label: 'Bottom' },
                { value: 'auto', label: 'Auto (smart positioning)' }
            ],
            group: 'appearance'
        }
    },

    editor: {
        openContentEditor: function (element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            // ── Trigger text ─────────────────────────────────────────────
            const labelField = document.createElement('div');
            labelField.className = 'cbx-field';
            const labelLabel = document.createElement('label');
            labelLabel.textContent = out('Trigger Text');
            const labelInput = document.createElement('input');
            labelInput.type = 'text';
            labelInput.value = element.textContent || out('More info');
            labelInput.placeholder = out('e.g., Saturn, [1], Learn more');
            labelInput.addEventListener('input', () => {
                element.textContent = labelInput.value;
                if (onChange) onChange();
            });
            labelField.append(labelLabel, labelInput);

            // ── Popover content (rich text) ──────────────────────────────
            const contentField = document.createElement('div');
            contentField.className = 'cbx-rte-field';

            const contentLabel = document.createElement('label');
            contentLabel.textContent = out('Popover Content');

            const contentHint = document.createElement('small');
            contentHint.className = 'cbx-hint';
            contentHint.textContent = out('Use the toolbar to format text, or switch to HTML mode for advanced editing.');

            // Visual editor (Inscribe) + a raw-HTML view toggled on demand.
            const editor = document.createElement('div');
            editor.className = 'cbx-rte';
            editor.setAttribute('aria-label', out('Popover Content'));
            editor.innerHTML = element.dataset.cbContent || '';

            const htmlArea = document.createElement('textarea');
            htmlArea.className = 'cbx-rte cbx-rte-code';
            htmlArea.style.display = 'none';
            htmlArea.setAttribute('aria-label', out('HTML source'));

            const ICON = {
                link: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 15l6 -6" /><path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" /><path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" /></svg>',
                ul: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l11 0" /><path d="M9 12l11 0" /><path d="M9 18l11 0" /><path d="M5 6l0 .01" /><path d="M5 12l0 .01" /><path d="M5 18l0 .01" /></svg>',
                ol: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 6h9" /><path d="M11 12h9" /><path d="M12 18h8" /><path d="M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4" /><path d="M6 10v-6l-2 2" /></svg>',
                html: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 8l-4 4l4 4" /><path d="M17 8l4 4l-4 4" /><path d="M14 4l-4 16" /></svg>'
            };

            let ed = null;         // Inscribe instance
            let isHTMLMode = false;
            let timer;
            const sync = () => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    element.dataset.cbContent = isHTMLMode ? htmlArea.value : (ed ? ed.getHTML() : editor.innerHTML);
                    if (onChange) onChange();
                }, 300);
            };

            const makeBtn = (label, html, handler) => {
                const b = document.createElement('button');
                b.type = 'button';
                b.className = 'cbx-iconbtn';
                b.title = out(label);
                b.setAttribute('aria-label', out(label));
                b.innerHTML = html;
                b.addEventListener('mousedown', (e) => e.preventDefault()); // keep the selection
                b.addEventListener('click', (e) => { e.preventDefault(); handler(); });
                return b;
            };

            // Inscribe engine (framework-managed lifecycle). Falls back to a plain
            // editable box on an older builder that lacks createPanelEditor.
            if (builder && typeof builder.createPanelEditor === 'function') {
                ed = builder.createPanelEditor(editor, { onChange: sync });
            } else {
                editor.contentEditable = 'true';
                editor.addEventListener('input', sync);
            }

            const toolbar = document.createElement('div');
            toolbar.className = 'cbx-rte-toolbar';
            const btn = {};
            const addFmt = (key, label, html, run) => {
                const b = makeBtn(label, html, () => { if (ed) run(); });
                btn[key] = b;
                toolbar.appendChild(b);
            };
            addFmt('bold', 'Bold', '<strong>B</strong>', () => ed.toggle('bold'));
            addFmt('italic', 'Italic', '<em>I</em>', () => ed.toggle('italic'));
            addFmt('underline', 'Underline', '<span style="text-decoration:underline">U</span>', () => ed.toggle('underline'));
            addFmt('link', 'Insert Link', ICON.link, () => { const url = prompt(out('Enter URL:'), 'https://'); if (url) ed.link(url); });
            addFmt('ul', 'Bullet List', ICON.ul, () => ed.list('ul'));
            addFmt('ol', 'Numbered List', ICON.ol, () => ed.list('ol'));

            // Reactive active-states from Inscribe's probe.
            if (ed) {
                ed.on('probe', (state) => {
                    btn.bold.classList.toggle('is-active', !!state.bold);
                    btn.italic.classList.toggle('is-active', !!state.italic);
                    btn.underline.classList.toggle('is-active', !!state.underline);
                    btn.link.classList.toggle('is-active', !!state.link);
                    btn.ul.classList.toggle('is-active', state.list === 'ul');
                    btn.ol.classList.toggle('is-active', state.list === 'ol');
                });
            }

            // Raw-HTML source toggle.
            const htmlBtn = makeBtn('Toggle HTML Mode', ICON.html, () => {
                isHTMLMode = !isHTMLMode;
                htmlBtn.classList.toggle('is-active', isHTMLMode);
                Object.keys(btn).forEach((k) => { btn[k].disabled = isHTMLMode; });
                if (isHTMLMode) {
                    htmlArea.value = ed ? ed.getHTML() : editor.innerHTML;
                    editor.style.display = 'none';
                    htmlArea.style.display = '';
                } else {
                    if (ed) ed.setHTML(htmlArea.value); else editor.innerHTML = htmlArea.value;
                    htmlArea.style.display = 'none';
                    editor.style.display = '';
                }
                sync();
            });
            htmlArea.addEventListener('input', sync);
            toolbar.appendChild(htmlBtn);

            contentField.append(contentLabel, contentHint, toolbar, editor, htmlArea);

            // ── Tips ─────────────────────────────────────────────────────
            const tips = document.createElement('div');
            tips.className = 'is-tips';
            tips.innerHTML =
                '<strong>' + out('Tips') + ':</strong><br>' +
                '• ' + out('Use Citation style for academic references') + '<br>' +
                '• ' + out('Use Info style for explanatory tooltips') + '<br>' +
                '• ' + out('Use Highlight style for fun facts or emphasis') + '<br>' +
                '• ' + out('Keep content concise for better readability');

            // ── Remove (convert back to plain text) ──────────────────────
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'cbx-removebtn';
            removeBtn.setAttribute('aria-label', out('Remove'));
            removeBtn.innerHTML =
                '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0"/><path d="M10 11l0 6"/><path d="M14 11l0 6"/><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/></svg>' +
                '<span>' + out('Remove') + '</span>';
            removeBtn.addEventListener('click', () => {
                if (builder && typeof builder.convertPluginToText === 'function') {
                    builder.convertPluginToText(builder.activePlugin);
                }
            });

            container.append(removeBtn, labelField, contentField, tips);
            return container;
        }
    },

    mount: function (element, options) {
        const style = options.style || 'info';
        const trigger = options.trigger || 'hover';
        const maxWidth = options.maxWidth || 320;
        const position = options.position || 'top';

        // Clean up any existing popovers for this element
        const existingPopover = element._moreInfoPopover;
        if (existingPopover) {
            existingPopover.remove();
            element._moreInfoPopover = null;
        }

        // Remove any existing style classes
        element.classList.remove('style-info', 'style-citation', 'style-highlight');
        
        // Apply current style class
        element.classList.add('more-info-trigger');
        element.classList.add(`style-${style}`);
        element.setAttribute('role', 'button');
        element.setAttribute('tabindex', '0');
        element.setAttribute('aria-expanded', 'false');
        element.setAttribute('aria-haspopup', 'true');

        // Create popover element
        const popover = document.createElement('div');
        popover.className = 'more-info-popover';
        popover.style.maxWidth = `${maxWidth}px`;
        popover.setAttribute('role', 'tooltip');
        
        // Store reference to popover on element for cleanup
        element._moreInfoPopover = popover;
        
        const arrow = document.createElement('div');
        arrow.className = 'popover-arrow';
        
        const content = document.createElement('div');
        content.className = 'popover-content';
        content.innerHTML = element.dataset.cbContent || 'No content provided.';
        
        popover.appendChild(arrow);
        popover.appendChild(content);
        document.body.appendChild(popover);

        let isOpen = false;
        let isPersistent = false;
        let hoverTimeout;

        // Position calculation with smart viewport detection
        const positionPopover = () => {
            const triggerRect = element.getBoundingClientRect();
            const popoverRect = popover.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const scrollY = window.scrollY;
            const scrollX = window.scrollX;

            let top, left;
            let finalPosition = position;

            // Auto positioning logic
            if (position === 'auto') {
                const spaceAbove = triggerRect.top;
                const spaceBelow = viewportHeight - triggerRect.bottom;
                finalPosition = spaceAbove > spaceBelow ? 'top' : 'bottom';
            }

            // Calculate positions
            if (finalPosition === 'top') {
                top = triggerRect.top + scrollY - popoverRect.height - 12;
                left = triggerRect.left + scrollX + (triggerRect.width / 2) - (popoverRect.width / 2);
                popover.classList.add('position-top');
                popover.classList.remove('position-bottom');
            } else {
                top = triggerRect.bottom + scrollY + 12;
                left = triggerRect.left + scrollX + (triggerRect.width / 2) - (popoverRect.width / 2);
                popover.classList.add('position-bottom');
                popover.classList.remove('position-top');
            }

            // Keep popover within viewport horizontally
            if (left < 10) left = 10;
            if (left + popoverRect.width > viewportWidth - 10) {
                left = viewportWidth - popoverRect.width - 10;
            }

            // Apply position
            popover.style.top = `${top}px`;
            popover.style.left = `${left}px`;

            // Position arrow
            const arrowLeft = triggerRect.left + (triggerRect.width / 2) - left - 6;
            arrow.style.left = `${Math.max(12, Math.min(arrowLeft, popoverRect.width - 12))}px`;
        };

        const showPopover = (persistent = false) => {
            if (isOpen) return;
            
            isOpen = true;
            isPersistent = persistent;
            popover.classList.add('visible');
            element.setAttribute('aria-expanded', 'true');
            
            // Force reflow before positioning
            requestAnimationFrame(() => {
                positionPopover();
            });
        };

        const hidePopover = () => {
            if (isPersistent) return;
            
            isOpen = false;
            popover.classList.remove('visible');
            element.setAttribute('aria-expanded', 'false');
        };

        const togglePopover = () => {
            if (isOpen && isPersistent) {
                isPersistent = false;
                hidePopover();
            } else {
                showPopover(true);
            }
        };

        // Event listeners based on trigger mode
        if (trigger === 'hover') {
            element.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                hoverTimeout = setTimeout(() => showPopover(false), 100);
            });

            element.addEventListener('mouseleave', () => {
                clearTimeout(hoverTimeout);
                hoverTimeout = setTimeout(hidePopover, 200);
            });

            popover.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
            });

            popover.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(hidePopover, 200);
            });

            // Click makes it persistent - NO stopPropagation
            element.addEventListener('click', (e) => {
                e.preventDefault();
                // Removed e.stopPropagation() so ContentBox can detect the click
                togglePopover();
            });
        } else {
            // Click only mode - NO stopPropagation
            element.addEventListener('click', (e) => {
                e.preventDefault();
                // Removed e.stopPropagation() so ContentBox can detect the click
                togglePopover();
            });
        }

        // Keyboard support
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                togglePopover();
            } else if (e.key === 'Escape' && isOpen) {
                isPersistent = false;
                hidePopover();
            }
        });

        // Click outside to close
        const handleOutsideClick = (e) => {
            if (!element.contains(e.target) && !popover.contains(e.target)) {
                isPersistent = false;
                hidePopover();
            }
        };
        document.addEventListener('click', handleOutsideClick);

        // Reposition on scroll/resize
        let repositionTimer;
        const handleReposition = () => {
            if (isOpen) {
                clearTimeout(repositionTimer);
                repositionTimer = setTimeout(positionPopover, 10);
            }
        };

        window.addEventListener('scroll', handleReposition, true);
        window.addEventListener('resize', handleReposition);

        // Cleanup function
        return {
            unmount: () => {
                popover.remove();
                element._moreInfoPopover = null;
                document.removeEventListener('click', handleOutsideClick);
                window.removeEventListener('scroll', handleReposition, true);
                window.removeEventListener('resize', handleReposition);
            }
        };
    },

    // Called by the runtime when this element is unmounted — runs the instance
    // cleanup returned by mount() (removes the popover + listeners).
    unmount: function (element, instance) {
        if (instance && typeof instance.unmount === 'function') instance.unmount();
    }
};