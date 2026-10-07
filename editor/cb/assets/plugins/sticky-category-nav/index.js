/*
Usage:

<div class="is-section is-box type-system-ui is-section-50">
    <div class="is-container v2 is-content-960 leading-14 size-18 v3">
        <div class="row">
            <div class="column">
                <h1 class="font-light size-48 text-center">Monochrome Blocks <a href="#articles" title="">Demo</a></h1>
            </div>
        </div>
    </div>
</div>

<div class="is-section is-box type-system-ui is-section-auto" style="position: sticky; height: 70px; top: 0px; z-index: 1;">
    <div class="is-overlay">
        <div class="is-overlay-content">

            <div data-cb-type="sticky-category-nav" role="navigation" aria-label="Category navigation">
                <div class="category-nav-container" role="list">
                    <ul class="category-nav-list">
                        <li role="listitem"><a href="#hero">Hero</a></li>
                        <li role="listitem"><a href="#articles">Articles</a></li>
                        <li role="listitem"><a href="#contact">Contact</a></li>
                    </ul>
                </div>
            </div>
            
        </div>
    </div>
</div>

<div class="is-section is-box type-system-ui is-section-100" id="hero">
    <div class="is-container v2 leading-13 size-17 v3 is-content-900">
        <div class="row">
            <div class="column">
                <h1 class="text-center font-normal leading-11 size-48">A forward thinking studio delivering digital solutions that help your business.</h1>
            </div>
        </div>
    </div>
</div>
<div class="is-section is-box type-system-ui is-section-100" id="articles">
    <div class="is-container v2 size-18 leading-14 is-content-640 v3">
        <div class="row">
            <div class="column">
                <h2 class="text-center leading-none size-80 font-extralight">Words From Heart</h2>
            </div>
        </div>
    </div>
</div>
<div class="is-section is-box type-system-ui is-section-100" id="contact">
    <div class="is-container v2 size-16 leading-13 v3 is-content-820">
        <div class="row">
            <div class="column">
                <h2 class="leading-none text-left font-normal size-28">Company Name</h2>
            </div>
        </div>
    </div>
</div>
*/

export default {
    name: 'sticky-category-nav',
    displayName: 'Sticky Category',
    version: '1.0.0',

    contentbox: {
        // configure box panel
        title: false,
        bg: false,
        text: false,
        boxTabs: false,
        // configure section panel
        sectionHeight: false,
        sectionTabs: false
    },

    settings: {
        backgroundColor: {
            type: 'color',
            label: 'Background Color',
            default: '#f5f5f5'
        },
        color: {
            type: 'color',
            label: 'Link Color',
            default: '#666'
        },
        accentColor: {
            type: 'color',
            label: 'Accent Color',
            default: '#1a1a1a'
        },
        top: {
            type: 'number',
            label: 'Top',
            default: 0, // only sets the input. Add data-cb-top for mount use => options.top).
            min: 0,
            max: 400,
            step: 1,
            unit: 'px'
        },
    },
    editor: {
        openContentEditor: function(element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

            const container = document.createElement('div');
            container.className = 'cbx-stack';

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

            const navList = element.querySelector('.category-nav-list');
            if (!navList) {
                container.textContent = out('Error: .category-nav-list not found');
                return container;
            }

            const links = Array.from(navList.querySelectorAll('a'));
            links.forEach((link, index) => {
                if (!link.dataset.itemId) link.dataset.itemId = `link-${Date.now()}-${index}`;
            });

            // labelled field (label + control)
            const makeField = (labelText, control) => {
                const f = document.createElement('div');
                f.className = 'cbx-field';
                const l = document.createElement('label');
                l.textContent = labelText;
                f.append(l, control);
                return f;
            };

            const intro = document.createElement('div');
            intro.className = 'cbx-hint';
            intro.textContent = out('Drag to reorder, click to edit, or remove links.');

            const stack = document.createElement('div');
            stack.className = 'cbx-stack';

            container.append(intro, stack);

            const createLinkEditor = (link, index) => {
                link.dataset.itemId = link.dataset.itemId || `item-${Date.now()}-${index}`;

                const itemEditor = document.createElement('div');
                itemEditor.className = 'cbx-item';
                itemEditor.dataset.itemId = link.dataset.itemId;

                const head = document.createElement('div');
                head.className = 'cbx-item-head';

                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                drag.setAttribute('aria-label', out('Drag to reorder'));

                const itemTitle = document.createElement('span');
                itemTitle.className = 'cbx-title';
                itemTitle.textContent = link.textContent || out('Untitled Link');

                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className = 'cbx-iconbtn is-danger';
                deleteBtn.setAttribute('aria-label', out('Delete link'));
                deleteBtn.innerHTML = '<svg aria-hidden="true"><use xlink:href="#icon-trash2"></use></svg>';
                deleteBtn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (link.parentNode) link.parentNode.remove();
                    itemEditor.remove();
                    onChange?.();
                };

                head.append(drag, itemTitle, deleteBtn);

                const body = document.createElement('div');
                body.className = 'cbx-item-body';
                body.style.display = 'none';

                // Link Text
                const labelInput = document.createElement('input');
                labelInput.type = 'text';
                labelInput.placeholder = out('Enter link text');
                labelInput.value = link.textContent || '';
                labelInput.addEventListener('input', () => {
                    link.textContent = labelInput.value;
                    itemTitle.textContent = labelInput.value || out('Untitled Link');
                    onChange?.();
                });

                // Target Section ID
                const targetInput = document.createElement('input');
                targetInput.type = 'text';
                targetInput.placeholder = '#section-id';
                targetInput.value = link.getAttribute('href') || '';
                targetInput.addEventListener('input', () => {
                    let value = targetInput.value;
                    if (value && !value.startsWith('#')) {
                        value = '#' + value;
                        targetInput.value = value;
                    }
                    link.setAttribute('href', value);
                    onChange?.();
                });

                const hint = document.createElement('div');
                hint.className = 'cbx-hint';
                hint.textContent = out('Use format: #section-id (e.g. #hero, #about)');

                body.append(
                    makeField(out('Link Text'), labelInput),
                    makeField(out('Target Section ID'), targetInput),
                    hint
                );

                head.addEventListener('click', (e) => {
                    if (e.target.closest('.cbx-drag') || e.target.closest('button')) return;
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                itemEditor.append(head, body);
                return itemEditor;
            };

            links.forEach((link, i) => stack.appendChild(createLinkEditor(link, i)));

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function () {
                        const linkMap = new Map();
                        Array.from(navList.children).forEach(li => {
                            const link = li.querySelector('a');
                            if (link && link.dataset.itemId) linkMap.set(link.dataset.itemId, li);
                        });
                        Array.from(stack.children).forEach(editorItem => {
                            const actualLi = linkMap.get(editorItem.dataset.itemId);
                            if (actualLi && actualLi.parentElement === navList) navList.appendChild(actualLi);
                        });
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag optional */ });

            // Add Link button
            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Navigation Link');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const newLi = document.createElement('li');
                newLi.setAttribute('role', 'listitem');
                const newLink = document.createElement('a');
                newLink.href = '#new-section';
                newLink.textContent = 'New Link';
                newLink.dataset.itemId = `link-${Date.now()}`;
                newLi.appendChild(newLink);
                navList.appendChild(newLi);
                stack.appendChild(createLinkEditor(newLink, stack.children.length));
                onChange?.();
            };
            container.appendChild(addBtn);

            return container;
        }
    },

        mount: function (element, options) {
        // Sticky is applied to the section wrapper in the editor (div.is-section).
        // On a published page there is no .is-section wrapper, so fall back to the
        // plugin element itself — otherwise closest() is null and .style throws.
        const section = element.closest('.is-section') || element;
        section.style.position = 'sticky';
        section.style.height = '70px';
        section.style.top = (options.top || '0') + 'px';
        section.style.zIndex = 1;
    
        // Use css variables for styling the plugins
        const backgroundColor = options.backgroundColor || '#f5f5f5';
        element.style.setProperty('--background-color', backgroundColor);

        const color = options.color || '#666';
        element.style.setProperty('--color', color);

        const accentColor = options.accentColor || '#1a1a1a';
        element.style.setProperty('--accent-color', accentColor);

        // Get all links
        const categoryLinks = element.querySelectorAll('.category-nav-list a');
        if (categoryLinks.length === 0) return {};

        // Update active category in navigation
        // const scrollOffset = options.scrollOffset || 200;
        const scrollOffset = 200;
        const sections = [];

        // Find all target sections
        categoryLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const section = document.querySelector(href);
                if (section) {
                    sections.push({
                        element: section,
                        id: href.slice(1),
                        link: link
                    });
                }
            }
        });

        // Scroll handler with throttling
        let scrollTimeout;
        const updateActiveLink = () => {
            let current = '';
            const scrollPosition = window.pageYOffset;

            sections.forEach(section => {
                const sectionTop = section.element.offsetTop;
                const sectionHeight = section.element.clientHeight;

                if (scrollPosition >= (sectionTop - scrollOffset)) {
                    current = section.id;
                }
            });

            categoryLinks.forEach(link => {
                link.classList.remove('active');
                link.removeAttribute('aria-current');

                const href = link.getAttribute('href');
                if (href && href.slice(1) === current) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'true');
                }
            });
        };

        const onScroll = () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateActiveLink, 50);
        };
        window.addEventListener('scroll', onScroll);

        // Initial check
        updateActiveLink();

        // Accessibility: Skip link for keyboard users.
        // Guard against duplicates — the runtime can re-mount the component, and
        // this used to insert a new skip link (and leak a scroll listener) each time.
        if (!element.querySelector(':scope > a.skip-link')) {
            const skipLink = document.createElement('a');
            skipLink.textContent = 'Skip navigation';
            skipLink.className = 'skip-link';
            skipLink.href = '#'; // handled in JS

            skipLink.style.cssText = 'position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden;';

            skipLink.addEventListener('focus', function () {
                this.style.cssText = 'position: absolute; left: 10px; top: 10px; z-index: 10000; padding: 8px 12px; background: #000; color: #fff; text-decoration: none; border-radius: 4px;';
            });

            skipLink.addEventListener('blur', function () {
                this.style.cssText = 'position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden;';
            });

            skipLink.addEventListener('click', function(e) {
                e.preventDefault();
                const firstNavLink = categoryLinks[0];
                if (firstNavLink) {
                    const targetHref = firstNavLink.getAttribute('href');
                    const targetSection = document.querySelector(targetHref);
                    if (targetSection) {
                        targetSection.setAttribute('tabindex', '-1');
                        targetSection.focus();
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });

            element.insertBefore(skipLink, element.firstChild);
        }

        return {
            destroy: () => {
                window.removeEventListener('scroll', onScroll);
                if (scrollTimeout) clearTimeout(scrollTimeout);
            }
        };
    },

    unmount: function (element, instance) {
        if (instance && typeof instance.destroy === 'function') instance.destroy();
    }
};