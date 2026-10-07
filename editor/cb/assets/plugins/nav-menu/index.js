export default {
    name: 'nav-menu',
    displayName: 'Navigation Menu',
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
        theme: {
            type: 'select',
            label: 'Theme',
            default: 'light',
            options: [
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'dark-on-start', label: 'Dark on start' }
            ]
        },
        menuItemBorderRadius: {
            type: 'number',
            label: 'Menu item border radius',
            default: 6,
            min: 0,
            max: 500,
            unit: 'px',
        },
        dropdownBorderRadius: {
            type: 'number',
            label: 'Dropdown border radius',
            default: 8,
            min: 0,
            max: 500,
            unit: 'px',
        },
        
    },
    editor: {
        openContentEditor: function(element, builder, onChange) {
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

            const navList = element.querySelector('.nav-list');
            const menuItems = navList ? Array.from(navList.children) : [];

            const generateId = () => `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

            // Parse existing menu items into a model
            let items = menuItems.map((li) => {
                const link = li.querySelector('.nav-link');
                const submenu = li.querySelector('.submenu');
                const hasSubmenu = li.classList.contains('has-submenu');

                const item = {
                    id: li.dataset.itemId || generateId(),
                    label: link ? link.childNodes[0].textContent.trim() : 'Untitled',
                    href: link ? link.getAttribute('href') : '#',
                    hasSubmenu: hasSubmenu,
                    children: []
                };

                if (submenu) {
                    const subItems = submenu.querySelectorAll('li');
                    subItems.forEach(subLi => {
                        const subLink = subLi.querySelector('.submenu-link');
                        if (subLink) {
                            item.children.push({
                                id: subLi.dataset.itemId || generateId(),
                                label: subLink.textContent.trim(),
                                href: subLink.getAttribute('href')
                            });
                        }
                    });
                }

                return item;
            });

            // Rebuild the actual menu element from the model
            const updateMenu = () => {
                if (!navList) return;
                navList.innerHTML = '';
                items.forEach(item => {
                    const li = document.createElement('li');
                    li.className = item.hasSubmenu ? 'nav-item has-submenu' : 'nav-item';
                    li.setAttribute('role', 'none');
                    li.dataset.itemId = item.id;

                    if (item.hasSubmenu) {
                        li.innerHTML = `
                            <a href="${item.href}" class="nav-link" role="menuitem" aria-haspopup="true" aria-expanded="false">
                                ${item.label}
                                <span class="nav-arrow" aria-hidden="true"></span>
                            </a>
                            <button class="submenu-toggle" aria-label="Toggle ${item.label} submenu" aria-expanded="false">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <ul class="submenu" role="menu" aria-label="${item.label} submenu">
                                ${item.children.map(child => `
                                    <li role="none" data-item-id="${child.id}">
                                        <a href="${child.href}" class="submenu-link" role="menuitem">${child.label}</a>
                                    </li>
                                `).join('')}
                            </ul>
                        `;
                    } else {
                        li.innerHTML = `
                            <a href="${item.href}" class="nav-link" role="menuitem">${item.label}</a>
                        `;
                    }

                    navList.appendChild(li);
                });
                onChange?.();
            };

            // labelled field (label + control)
            const makeField = (labelText, control) => {
                const f = document.createElement('div');
                f.className = 'cbx-field';
                const l = document.createElement('label');
                l.textContent = labelText;
                f.append(l, control);
                return f;
            };
            const stack = document.createElement('div');
            stack.className = 'cbx-stack';

            // ── Submenu item editor (compact row: drag + [label, link] + delete) ──
            const createSubmenuItemEditor = (item, child) => {
                const subItem = document.createElement('div');
                subItem.className = 'cbx-row';
                subItem.dataset.itemId = child.id;

                const subDrag = document.createElement('span');
                subDrag.className = 'cbx-drag';
                subDrag.innerHTML = '⠿';
                subDrag.setAttribute('aria-label', out('Drag to reorder'));

                const subInputs = document.createElement('div');
                subInputs.className = 'cbx-row cbx-grow';

                const subLabelInput = document.createElement('input');
                subLabelInput.type = 'text';
                subLabelInput.classList.add('cbx-grow');
                subLabelInput.value = child.label;
                subLabelInput.placeholder = out('Label');
                subLabelInput.addEventListener('input', () => { child.label = subLabelInput.value; updateMenu(); });

                const subLinkInput = document.createElement('input');
                subLinkInput.type = 'text';
                subLinkInput.classList.add('cbx-grow');
                subLinkInput.value = child.href;
                subLinkInput.placeholder = out('Link');
                subLinkInput.addEventListener('input', () => { child.href = subLinkInput.value; updateMenu(); });

                subInputs.append(subLabelInput, subLinkInput);

                const subDeleteBtn = document.createElement('button');
                subDeleteBtn.type = 'button';
                subDeleteBtn.className = 'cbx-iconbtn is-danger';
                subDeleteBtn.setAttribute('aria-label', out('Delete submenu item'));
                subDeleteBtn.innerHTML = '<svg aria-hidden="true"><use xlink:href="#icon-trash2"></use></svg>';
                subDeleteBtn.onclick = () => {
                    item.children = item.children.filter(c => c.id !== child.id);
                    subItem.remove();
                    updateMenu();
                };

                subItem.append(subDrag, subInputs, subDeleteBtn);
                return subItem;
            };

            // ── Menu item editor (collapsible card) ──
            const createMenuItemEditor = (item) => {
                const itemEditor = document.createElement('div');
                itemEditor.className = 'cbx-item';
                itemEditor.dataset.itemId = item.id;

                const head = document.createElement('div');
                head.className = 'cbx-item-head';

                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                drag.setAttribute('aria-label', out('Drag to reorder'));

                const headerTitle = document.createElement('span');
                headerTitle.className = 'cbx-title';
                headerTitle.textContent = item.label || out('Untitled Menu Item');

                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className = 'cbx-iconbtn is-danger';
                deleteBtn.setAttribute('aria-label', out('Delete menu item'));
                deleteBtn.innerHTML = '<svg aria-hidden="true"><use xlink:href="#icon-trash2"></use></svg>';
                deleteBtn.onclick = (e) => {
                    e.stopPropagation();
                    items = items.filter(i => i.id !== item.id);
                    itemEditor.remove();
                    updateMenu();
                };

                head.append(drag, headerTitle, deleteBtn);

                const body = document.createElement('div');
                body.className = 'cbx-item-body';
                body.style.display = 'none';

                // Label
                const labelInput = document.createElement('input');
                labelInput.type = 'text';
                labelInput.value = item.label;
                labelInput.placeholder = out('Menu item label');
                labelInput.addEventListener('input', () => {
                    item.label = labelInput.value;
                    headerTitle.textContent = labelInput.value || out('Untitled Menu Item');
                    updateMenu();
                });

                // Link
                const linkInput = document.createElement('input');
                linkInput.type = 'text';
                linkInput.value = item.href;
                linkInput.placeholder = '#';
                linkInput.addEventListener('input', () => {
                    item.href = linkInput.value || '#';
                    updateMenu();
                });

                // Has-submenu checkbox
                const submenuCheckbox = document.createElement('label');
                submenuCheckbox.className = 'checkbox';
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = item.hasSubmenu;
                const checkboxText = document.createElement('span');
                checkboxText.textContent = out('Has submenu');
                submenuCheckbox.append(checkbox, checkboxText);

                // Submenu section
                const submenuSection = document.createElement('div');
                submenuSection.className = 'cbx-stack';
                submenuSection.style.display = item.hasSubmenu ? '' : 'none';

                const submenuTitle = document.createElement('div');
                submenuTitle.className = 'cbx-hint';
                submenuTitle.textContent = out('Submenu items');

                const submenuList = document.createElement('div');
                submenuList.className = 'cbx-stack';
                item.children.forEach(child => submenuList.appendChild(createSubmenuItemEditor(item, child)));

                loadSortable().then((Sortable) => {
                    new Sortable(submenuList, {
                        animation: 150,
                        handle: '.cbx-drag',
                        ghostClass: 'cbx-sortable-ghost',
                        onEnd: function() {
                            const newOrder = Array.from(submenuList.children)
                                .map(el => item.children.find(c => c.id === el.dataset.itemId))
                                .filter(Boolean);
                            item.children = newOrder;
                            updateMenu();
                        }
                    });
                }).catch(() => {});

                const addSubmenuBtn = document.createElement('button');
                addSubmenuBtn.type = 'button';
                addSubmenuBtn.textContent = out('+ Add Submenu Item');
                addSubmenuBtn.onclick = (e) => {
                    e.preventDefault();
                    const newChild = { id: generateId(), label: 'New Submenu Item', href: '#' };
                    item.children.push(newChild);
                    submenuList.appendChild(createSubmenuItemEditor(item, newChild));
                    updateMenu();
                };

                submenuSection.append(submenuTitle, submenuList, addSubmenuBtn);

                checkbox.addEventListener('change', () => {
                    item.hasSubmenu = checkbox.checked;
                    submenuSection.style.display = checkbox.checked ? '' : 'none';
                    updateMenu();
                });

                body.append(
                    makeField(out('Label'), labelInput),
                    makeField(out('Link (use # for no link)'), linkInput),
                    submenuCheckbox,
                    submenuSection
                );

                head.addEventListener('click', (e) => {
                    if (e.target.closest('.cbx-drag') || e.target.closest('button')) return;
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                itemEditor.append(head, body);
                return itemEditor;
            };

            items.forEach(item => stack.appendChild(createMenuItemEditor(item)));
            container.appendChild(stack);

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function() {
                        const newOrder = Array.from(stack.children)
                            .map(el => items.find(i => i.id === el.dataset.itemId))
                            .filter(Boolean);
                        items = newOrder;
                        updateMenu();
                    }
                });
            }).catch(() => {});

            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Menu Item');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const newItem = { id: generateId(), label: 'New Menu Item', href: '#', hasSubmenu: false, children: [] };
                items.push(newItem);
                stack.appendChild(createMenuItemEditor(newItem));
                updateMenu();
            };
            container.appendChild(addBtn);

            // ── Logo section ──
            const logoSection = document.createElement('div');
            logoSection.className = 'cbx-stack';

            const logoElement = element.querySelector('.logo');
            const currentImg = logoElement ? logoElement.querySelector('img') : null;
            const currentText = logoElement && !currentImg ? logoElement.textContent.trim() : '';

            // Logo type radios
            const textRadio = document.createElement('input');
            textRadio.type = 'radio';
            textRadio.name = 'logoType';
            textRadio.value = 'text';
            textRadio.checked = !currentImg;
            const textRadioLabel = document.createElement('label');
            textRadioLabel.className = 'checkbox';
            const textRadioText = document.createElement('span');
            textRadioText.textContent = out('Text');
            textRadioLabel.append(textRadio, textRadioText);

            const imageRadio = document.createElement('input');
            imageRadio.type = 'radio';
            imageRadio.name = 'logoType';
            imageRadio.value = 'image';
            imageRadio.checked = !!currentImg;
            const imageRadioLabel = document.createElement('label');
            imageRadioLabel.className = 'checkbox';
            const imageRadioText = document.createElement('span');
            imageRadioText.textContent = out('Image');
            imageRadioLabel.append(imageRadio, imageRadioText);

            const logoTypeRow = document.createElement('div');
            logoTypeRow.className = 'cbx-row';
            logoTypeRow.append(textRadioLabel, imageRadioLabel);

            // Text logo
            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.value = currentText || 'My Website';
            textInput.placeholder = out('Enter logo text');
            const textInputContainer = makeField(out('Logo Text'), textInput);
            textInputContainer.style.display = !currentImg ? '' : 'none';

            // Image logo
            const imageUrlInput = document.createElement('input');
            imageUrlInput.type = 'text';
            imageUrlInput.value = currentImg ? currentImg.src : '';
            imageUrlInput.placeholder = 'https://example.com/logo.png';
            imageUrlInput.classList.add('cbx-grow');
            const imageUrlRow = document.createElement('div');
            imageUrlRow.className = 'cbx-row';
            imageUrlRow.append(imageUrlInput, ...builder.createFileButtons('image', (url) => { imageUrlInput.value = url; updateLogo(); }));

            const imageAltInput = document.createElement('input');
            imageAltInput.type = 'text';
            imageAltInput.value = currentImg ? currentImg.alt : '';
            imageAltInput.placeholder = out('Company logo');

            const altHint = document.createElement('small');
            altHint.className = 'cbx-hint';
            altHint.textContent = out('Required for accessibility.');

            const roundedLabel = document.createElement('label');
            roundedLabel.className = 'checkbox';
            const roundedCheckbox = document.createElement('input');
            roundedCheckbox.type = 'checkbox';
            roundedCheckbox.checked = currentImg ? currentImg.classList.contains('rounded') : false;
            const roundedText = document.createElement('span');
            roundedText.textContent = out('Use rounded logo');
            roundedLabel.append(roundedCheckbox, roundedText);
            roundedLabel.addEventListener('input', () => {
                const logoImage = logoElement ? logoElement.querySelector('img') : null;
                if (!logoImage) return;
                if (roundedCheckbox.checked) logoImage.classList.add('rounded');
                else logoImage.classList.remove('rounded');
                onChange?.();
            });

            const imageInputContainer = document.createElement('div');
            imageInputContainer.className = 'cbx-stack';
            imageInputContainer.style.display = currentImg ? '' : 'none';
            imageInputContainer.append(
                makeField(out('Logo Image URL'), imageUrlRow),
                makeField(out('Image Alt Text'), imageAltInput),
                altHint,
                roundedLabel
            );

            // Logo link
            const logoLinkInput = document.createElement('input');
            logoLinkInput.type = 'text';
            logoLinkInput.value = logoElement ? logoElement.getAttribute('href') || '/' : '/';
            logoLinkInput.placeholder = '#';

            logoSection.append(
                makeField(out('Logo Type'), logoTypeRow),
                textInputContainer,
                imageInputContainer,
                makeField(out('Logo Link'), logoLinkInput)
            );

            // Update logo in actual HTML
            const updateLogo = () => {
                if (!logoElement) return;
                const checked = container.querySelector('input[name="logoType"]:checked');
                const logoType = checked ? checked.value : 'text';

                if (logoType === 'text') {
                    const text = textInput.value.trim() || 'My Website';
                    logoElement.textContent = text;
                } else {
                    const imageUrl = imageUrlInput.value.trim() || 'https://placehold.co/600x600/eee/666?text=LOGO';
                    const imageAlt = imageAltInput.value.trim() || textInput.value.trim() || 'Logo';
                    logoElement.innerHTML = `<img src="${imageUrl}" alt="${imageAlt}" class="logo-img">`;
                }

                const logoLink = logoLinkInput.value.trim() || '#';
                logoElement.setAttribute('href', logoLink);
                onChange?.();
            };

            textRadio.addEventListener('change', () => {
                textInputContainer.style.display = '';
                imageInputContainer.style.display = 'none';
                updateLogo();
            });
            imageRadio.addEventListener('change', () => {
                textInputContainer.style.display = 'none';
                imageInputContainer.style.display = '';
                updateLogo();
            });
            textInput.addEventListener('input', updateLogo);
            imageUrlInput.addEventListener('input', updateLogo);
            imageAltInput.addEventListener('input', updateLogo);
            logoLinkInput.addEventListener('input', updateLogo);

            container.appendChild(logoSection);

            return container;
        }
    },

        mount: function (element, options) {

        const menuItemBorderRadius = options.menuItemBorderRadius !== undefined ? options.menuItemBorderRadius : 6;
        element.style.setProperty('--menu-item-border-radius', menuItemBorderRadius + 'px');

        const dropdownBorderRadius = options.dropdownBorderRadius !== undefined ? options.dropdownBorderRadius : 8;
        element.style.setProperty('--dropdown-border-radius', dropdownBorderRadius + 'px');

        const cleanups = [];

        const currentScroll = window.pageYOffset;
        // The theme class goes on the section wrapper (ContentBox: div.is-section).
        // Guard: on a page without .is-section this is null, so skip theme toggling
        // instead of throwing on null.classList.
        const section = element.closest('.is-section');

        const theme = options.theme || 'light';
        if (section) {
            if(theme==='dark-on-start') {
                if (currentScroll > (window.innerHeight-35)) {
                    section.classList.remove('dark');
                } else {
                    section.classList.add('dark'); // apply dark mode on top
                }
            } else if(theme==='dark') {
                section.classList.add('dark');
            } else {
                section.classList.remove('dark');
            }
        }

        // Add scrolled class for enhanced shadow effect
        const navWrapper = element.querySelector('.nav-wrapper');
        if (navWrapper) {
            let lastScroll = 0;

            let scrollTimeout;
            const onScroll = () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {

                    const currentScroll = window.pageYOffset;

                    if (currentScroll > 50) {
                        navWrapper.classList.add('scrolled');
                    } else {
                        navWrapper.classList.remove('scrolled');
                    }

                    if(section && theme==='dark-on-start') {
                        if (currentScroll > (window.innerHeight-35)) {
                            section.classList.remove('dark');
                        } else {
                            section.classList.add('dark');
                        }
                    }

                    lastScroll = currentScroll;

                }, 10);
            };
            window.addEventListener('scroll', onScroll);
            cleanups.push(() => { window.removeEventListener('scroll', onScroll); clearTimeout(scrollTimeout); });
        }

        // Mobile menu toggle
        const menuToggle = element.querySelector('.menu-toggle');
        const navList = element.querySelector('.nav-list');
        const navItems = element.querySelectorAll('.nav-item');

        if (menuToggle && navList) {
            menuToggle.addEventListener('click', () => {
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !isExpanded);
                navList.classList.toggle('active');
            });
        }

        // Mobile submenu toggle
        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            const submenu = item.querySelector('.submenu');
            const toggleBtn = item.querySelector('.submenu-toggle');
            
            if (submenu && toggleBtn) {
                // Toggle button click - expands/collapses submenu (mobile only)
                toggleBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    // Close other open submenus
                    navItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            const otherToggle = otherItem.querySelector('.submenu-toggle');
                            const otherLink = otherItem.querySelector('.nav-link');
                            if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
                            if (otherLink) otherLink.setAttribute('aria-expanded', 'false');
                        }
                    });
                    
                    // Toggle current submenu
                    item.classList.toggle('active');
                    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
                    toggleBtn.setAttribute('aria-expanded', !isExpanded);
                    link.setAttribute('aria-expanded', !isExpanded);
                });
                
                // Link click - on mobile, if parent has href, allow navigation
                link.addEventListener('click', (e) => {
                    // On desktop (>768px), don't interfere with hover behavior
                    // if (window.innerWidth > 768) {
                    //     return;
                    // }
                    
                    // Mobile: if link is just a placeholder (#), prevent navigation
                    const href = link.getAttribute('href');
                    if (href === '#' || href === '') {
                        e.preventDefault();
                    }
                });
            }
        });

        // Keyboard navigation support
        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            const submenu = item.querySelector('.submenu');
            
            if (submenu) {
                link.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const firstSubmenuLink = submenu.querySelector('.submenu-link');
                        if (firstSubmenuLink) {
                            firstSubmenuLink.focus();
                        }
                    }
                });
            }
        });

        // Close menu when clicking outside
        const onDocClick = (e) => {
            if (!e.target.closest('nav')) {
                if (navList) navList.classList.remove('active');
                if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            }
        };
        document.addEventListener('click', onDocClick);
        cleanups.push(() => document.removeEventListener('click', onDocClick));

        // Handle resize
        const onResize = () => {
            if (window.innerWidth > 768) {
                if (navList) navList.classList.remove('active');
                if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
                navItems.forEach(item => item.classList.remove('active'));
            }
        };
        window.addEventListener('resize', onResize);
        cleanups.push(() => window.removeEventListener('resize', onResize));

        return {
            destroy: () => cleanups.forEach(fn => fn())
        };
    },

    unmount: function (element, instance) {
        if (instance && typeof instance.destroy === 'function') instance.destroy();
    }
};