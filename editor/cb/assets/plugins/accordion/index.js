/*
 * DEPRECATED — superseded by the `faq` plugin.
 * Kept so existing pages that use <div data-cb-type="accordion"> keep working.
 * For new content, use `faq` instead. See README.md.
 */
export default {
    name: 'accordion',
    displayName: 'Accordion / FAQ',
    version: '1.0.0',

    settings: {
        allowMultiple: {
            type: 'boolean',
            label: 'Allow Multiple Open',
            default: false
        },
        openFirst: {
            type: 'boolean',
            label: 'Open First Item by Default',
            default: true
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

            const items = element.querySelectorAll('.accordion-item');

            // labelled field (label + control)
            const makeField = (labelText, control) => {
                const f = document.createElement('div');
                f.className = 'cbx-field';
                const l = document.createElement('label');
                l.textContent = labelText;
                f.append(l, control);
                return f;
            };

            const createItemEditor = (item, index) => {
                item.dataset.itemId = item.dataset.itemId || `item-${Date.now()}-${index}`;

                const section = document.createElement('div');
                section.className = 'cbx-item';
                section.dataset.itemId = item.dataset.itemId;

                // Head: drag + title + delete
                const head = document.createElement('div');
                head.className = 'cbx-item-head';

                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                drag.setAttribute('aria-label', out('Drag to reorder'));

                const titleText = document.createElement('span');
                titleText.className = 'cbx-title';
                titleText.textContent = item.querySelector('.accordion-question')?.textContent || `${out('Question')} ${index + 1}`;

                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className = 'cbx-iconbtn is-danger';
                deleteBtn.setAttribute('aria-label', out('Delete item'));
                deleteBtn.innerHTML = '<svg aria-hidden="true"><use xlink:href="#icon-trash2"></use></svg>';
                deleteBtn.onclick = (e) => { e.preventDefault(); item.remove(); section.remove(); onChange?.(); };

                head.append(drag, titleText, deleteBtn);

                // Body: question + answer
                const body = document.createElement('div');
                body.className = 'cbx-item-body';
                body.style.display = 'none';

                const questionInput = document.createElement('input');
                questionInput.type = 'text';
                questionInput.placeholder = out('Question');
                questionInput.value = item.querySelector('.accordion-question')?.textContent || '';
                questionInput.addEventListener('input', () => {
                    const q = item.querySelector('.accordion-question');
                    if (q) q.textContent = questionInput.value;
                    titleText.textContent = questionInput.value || out('Untitled Question');
                    onChange?.();
                });

                const answerInput = document.createElement('textarea');
                answerInput.placeholder = out('Answer');
                answerInput.rows = 5;
                answerInput.value = item.querySelector('.accordion-answer')?.textContent || '';
                let answerTimer;
                answerInput.addEventListener('input', () => {
                    clearTimeout(answerTimer);
                    answerTimer = setTimeout(() => {
                        const a = item.querySelector('.accordion-answer');
                        if (a) a.textContent = answerInput.value;
                        onChange?.();
                    }, 400);
                });

                body.append(
                    makeField(out('Question'), questionInput),
                    makeField(out('Answer'), answerInput)
                );

                head.addEventListener('click', (e) => {
                    if (e.target.closest('.cbx-drag') || e.target.closest('button')) return;
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                section.append(head, body);
                return section;
            };

            items.forEach((item, i) => stack.appendChild(createItemEditor(item, i)));

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function () {
                        const itemMap = new Map();
                        element.querySelectorAll('.accordion-item').forEach(item => {
                            if (item.dataset.itemId) itemMap.set(item.dataset.itemId, item);
                        });
                        Array.from(stack.children).forEach(editorItem => {
                            const actualItem = itemMap.get(editorItem.dataset.itemId);
                            if (actualItem && actualItem.parentElement === element) element.appendChild(actualItem);
                        });
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag optional */ });

            // Add Item button
            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add FAQ Item');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const newItem = document.createElement('div');
                newItem.className = 'accordion-item';
                newItem.dataset.itemId = `item-${Date.now()}`;
                newItem.innerHTML = `
                    <div class="accordion-header">
                        <span class="accordion-question">New Question</span>
                        <span class="accordion-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </div>
                    <div class="accordion-content">
                        <div class="accordion-answer">Your answer here...</div>
                    </div>
                `;
                element.appendChild(newItem);
                stack.appendChild(createItemEditor(newItem, stack.children.length));
                onChange?.();
            };
            container.appendChild(addBtn);

            return container;
        }
    },

        mount: function (element, options) {
        const allowMultiple = options.allowMultiple === true;
        const openFirst = options.openFirst !== false;

        // Generate unique ID for this accordion instance
        const accordionId = `accordion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Open first item by default if option is enabled
        if (openFirst) {
            const firstItem = element.querySelector('.accordion-item');
            if (firstItem) {
                firstItem.classList.add('active');
            }
        }

        // Add click handlers to accordion items
        const items = element.querySelectorAll('.accordion-item');
        items.forEach((item, index) => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            if (header && content) {
                // Generate unique IDs
                const buttonId = `${accordionId}-button-${index}`;
                const panelId = `${accordionId}-panel-${index}`;
                
                // Convert header to button for accessibility
                const button = document.createElement('button');
                button.type = 'button';
                button.id = buttonId;
                button.className = 'accordion-header';
                button.innerHTML = header.innerHTML;
                button.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
                button.setAttribute('aria-controls', panelId);
                
                // Copy any inline styles from the original header onto the button
                button.style.cssText = header.style.cssText;
                button.style.width = '100%';
                button.style.textAlign = 'left';
                button.style.border = 'none';
                button.style.background = 'none';
                button.style.font = 'inherit';
                button.style.cursor = 'pointer';
                
                // Replace header with button
                header.replaceWith(button);
                
                // Set content attributes
                content.id = panelId;
                content.setAttribute('role', 'region');
                content.setAttribute('aria-labelledby', buttonId);
                content.setAttribute('aria-hidden', item.classList.contains('active') ? 'false' : 'true');
                
                // Add click handler
                button.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');

                    // If not allowing multiple, close all other items
                    if (!allowMultiple && !isActive) {
                        items.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('active');
                                const otherButton = otherItem.querySelector('.accordion-header');
                                const otherContent = otherItem.querySelector('.accordion-content');
                                if (otherButton) {
                                    otherButton.setAttribute('aria-expanded', 'false');
                                }
                                if (otherContent) {
                                    otherContent.setAttribute('aria-hidden', 'true');
                                }
                            }
                        });
                    }

                    // Toggle current item
                    item.classList.toggle('active');
                    button.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
                    content.setAttribute('aria-hidden', item.classList.contains('active') ? 'false' : 'true');
                });
                
                // Keyboard navigation
                button.addEventListener('keydown', (e) => {
                    const currentIndex = Array.from(items).indexOf(item);
                    let targetIndex = -1;
                    
                    switch(e.key) {
                        case 'ArrowDown':
                            e.preventDefault();
                            targetIndex = (currentIndex + 1) % items.length;
                            break;
                        case 'ArrowUp':
                            e.preventDefault();
                            targetIndex = (currentIndex - 1 + items.length) % items.length;
                            break;
                        case 'Home':
                            e.preventDefault();
                            targetIndex = 0;
                            break;
                        case 'End':
                            e.preventDefault();
                            targetIndex = items.length - 1;
                            break;
                    }
                    
                    if (targetIndex >= 0) {
                        const targetButton = items[targetIndex].querySelector('.accordion-header');
                        if (targetButton) {
                            targetButton.focus();
                        }
                    }
                });
            }
        });

        return {};
    }
};