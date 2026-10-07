/*
Usage:
<div data-cb-type="card-list" data-cb-items-per-row="2" data-cb-gap="26" data-cb-aspect-ratio="16/9" data-cb-accent-color="#3b82f6" tabindex="0" role="region" aria-label="Card list" style="position: relative; --accent-color: #3b82f6; ">
    <div class="card-list-grid">
        <div class="card-item">
            <div class="item-media">
                <img src="assets/minimalist-blocks/images/ai-cvlfg.jpg" alt="Sample Title 1">
            </div>
            <div class="item-content">
                <h3 class="item-title">Sample Title 1</h3>
                <p class="item-description">Description</p>
                <a href="/product/1" class="item-link">Learn More →</a>
            </div>
        </div>
        <div class="card-item">
            <div class="item-media">
                <img src="assets/minimalist-blocks/images/ai-XUe84.jpg" alt="Sample Title 2">
            </div>
            <div class="item-content">
                <h3 class="item-title">Sample Title 2</h3>
                <p class="item-description">Description</p>
                <a href="/product/2" class="item-link">Learn More →</a>
            </div>
        </div>
        <div class="card-item">
            <div class="item-media">
                <img src="assets/minimalist-blocks/images/ai-HzKor.jpg" alt="Sample Title 3">
            </div>
            <div class="item-content">
                <h3 class="item-title">Sample Title 3</h3>
                <p class="item-description">Description</p>
                <a href="/product/3" class="item-link">Learn More →</a>
            </div>
        </div>
        <div class="card-item">
            <div class="item-media">
                <img src="assets/minimalist-blocks/images/ai-iNSwQ.jpg" alt="Sample Title 4">
            </div>
            <div class="item-content">
                <h3 class="item-title">Sample Title 4</h3>
                <p class="item-description">Description</p>
                <a href="/product/4" class="item-link">Learn More →</a>
            </div>
        </div>
    </div>
</div>
*/

export default {
    name: 'card-list',
    displayName: 'Card List',
    version: '1.0.0',

    settings: {
        _groups: [
            {
                id: 'layout',
                label: 'Layout',
                fields: ['itemsPerRow', 'aspectRatio', 'background', 'bgColor', 'borderColor', 'gap', 'hover', 'rounded']
            },
            {
                id: 'appearance',
                label: 'Appearance',
                fields: ['accentColor']
            }
        ],
        itemsPerRow: {
            type: 'number',
            label: 'Items Per Row',
            default: 3,
            min: 1,
            max: 6,
            group: 'layout'
        },
        gap: {
            type: 'number',
            label: 'Gap Between Items',
            default: 16,
            min: 0,
            max: 48,
            unit: 'px',
            group: 'layout'
        },
        aspectRatio: {
            type: 'select',
            label: 'Card Aspect Ratio',
            default: '16/9',
            options: [
                { value: '16/9', label: '16:9 (Landscape)' },
                { value: '4/3', label: '4:3 (Standard)' },
                { value: '1/1', label: '1:1 (Square)' },
                { value: '3/4', label: '3:4 (Portrait)' },
                { value: 'auto', label: 'Auto (Content Height)' }
            ],
            group: 'layout'
        },
        background: {
            type: 'select',
            label: 'Background',
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
            label: 'Border Color',
            default: '#e5e7eb',
            group: 'layout'
        },
        hover: {
            type: 'select',
            label: 'Hover Effect',
            default: 'lift-shadow',
            options: [
                { value: 'none', label: 'None' },
                { value: 'lift', label: 'Lift' },
                { value: 'lift-shadow', label: 'Lift + Shadow' }
            ],
            group: 'layout'
        },
        rounded: {
            type: 'boolean',
            label: 'Rounded Corners',
            default: true,
            group: 'layout'
        },
        accentColor: {
            type: 'color',
            label: 'Accent Color',
            default: '',
            group: 'appearance'
        }
    },

    editor: {
        // PATTERN: Load external library on-demand (Sortable.js for drag & drop)
        // Check if already loaded to avoid duplicate script tags
        openContentEditor: function(element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

            const loadSortable = (() => {
                let sortablePromise = null;

                return () => {
                    if (window.Sortable) return Promise.resolve(window.Sortable);
                    if (sortablePromise) return sortablePromise; // already loading

                    sortablePromise = new Promise((resolve, reject) => {
                        // Check if a <script> already exists (maybe partially loaded)
                        const existing = document.querySelector('script[data-sortable-loader]');
                        if (existing) {
                            existing.addEventListener('load', () => resolve(window.Sortable));
                            existing.addEventListener('error', () => reject(new Error('SortableJS failed')));
                            return;
                        }

                        const script = document.createElement('script');
                        script.src = 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js';
                        script.dataset.sortableLoader = 'true';
                        script.onload = () => {
                            resolve(window.Sortable);
                        };
                        script.onerror = () => {
                            // console.warn('SortableJS failed to load, retrying in 1s...');
                            sortablePromise = null; // clear cache to allow retry
                            setTimeout(() => loadSortable(), 1000); // retry once after delay
                            reject(new Error('Failed to load SortableJS'));
                        };
                        document.head.appendChild(script);
                    });

                    return sortablePromise;
                };
            })();

            // PATTERN: Helper function to detect if URL is video
            const isVideoUrl = (url) => {
                return /\.(mp4|webm|ogg|mov)$/i.test(url);
            };

            // PATTERN: Helper to extract media source from various element structures
            const getMediaSrc = (item) => {
                const media = item.querySelector('img, video, video source');
                let src = '';
                if (media) {
                    if (media.tagName === 'IMG') {
                        src = media.getAttribute('src') || '';
                    } else if (media.tagName === 'VIDEO') {
                        src = media.getAttribute('src') ||
                            media.querySelector('source')?.getAttribute('src') || '';
                    } else if (media.tagName === 'SOURCE') {
                        src = media.getAttribute('src') || '';
                    }
                }
                return src;
            };

            // PATTERN: Helper to switch media type based on URL
            const switchMediaType = (item, url, onChange) => {
                const mediaWrapper = item.querySelector('.item-media');
                const isVideo = isVideoUrl(url);
                const currentMedia = mediaWrapper.querySelector('img, video');
                const currentIsVideo = currentMedia?.tagName === 'VIDEO';

                if (isVideo && !currentIsVideo) {
                    // Switch to video
                    const video = document.createElement('video');
                    // video.controls = true;
                    video.muted = true;
                    video.playsInline = true;
                    video.autoplay = true;
                    // setTimeout(() => {
                    //     const p = video.play();
                    //     if (p && p.catch) p.catch(() => {});
                    // }, 50);
                    const source = document.createElement('source');
                    source.src = url;
                    source.type = 'video/' + url.split('.').pop().toLowerCase();
                    video.appendChild(source);
                    mediaWrapper.innerHTML = '';
                    mediaWrapper.appendChild(video);
                    onChange?.();
                } else if (!isVideo && currentIsVideo) {
                    // Switch to image
                    const img = document.createElement('img');
                    img.src = url;
                    img.alt = item.querySelector('.item-title')?.textContent || '';
                    mediaWrapper.innerHTML = '';
                    mediaWrapper.appendChild(img);
                    onChange?.();
                } else {
                    // Same type, just update src
                    if (currentMedia.tagName === 'IMG') {
                        currentMedia.src = url;
                    } else {
                        const source = currentMedia.querySelector('source');
                        if (source) {
                            source.src = url;
                            source.type = 'video/' + url.split('.').pop().toLowerCase();
                            currentMedia.load();
                        }
                    }
                    onChange?.();
                }
            };

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            const stack = document.createElement('div');
            stack.className = 'cbx-stack';
            container.appendChild(stack);

            const grid = element.querySelector('.card-list-grid');

            // labelled field (label + control)
            const makeField = (labelText, control) => {
                const f = document.createElement('div');
                f.className = 'cbx-field';
                const l = document.createElement('label');
                l.textContent = labelText;
                f.append(l, control);
                return f;
            };
            // input + browse button on one row
            const makeBrowseRow = (input, onPick) => {
                input.classList.add('cbx-grow');
                const row = document.createElement('div');
                row.className = 'cbx-row';
                row.append(input, ...builder.createFileButtons('media', onPick));
                return row;
            };

            const createItemEditor = (item, itemIndex) => {
                item.dataset.itemId = item.dataset.itemId || `item-${Date.now()}-${itemIndex}`;

                const itemEditor = document.createElement('div');
                itemEditor.className = 'cbx-item';
                itemEditor.dataset.itemId = item.dataset.itemId;

                // ── Head: drag + thumb + title + delete ──
                const head = document.createElement('div');
                head.className = 'cbx-item-head';

                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                drag.setAttribute('aria-label', out('Drag to reorder'));

                const thumb = document.createElement('img');
                thumb.className = 'cbx-thumb';
                thumb.alt = '';
                thumb.src = getMediaSrc(item) || 'https://placehold.co/60x60?text=No+Media';
                thumb.onerror = () => { thumb.src = 'https://placehold.co/40x40?text=Media'; };

                const titleText = document.createElement('span');
                titleText.className = 'cbx-title';
                titleText.textContent = item.querySelector('.item-title')?.textContent || `${out('Item')} ${itemIndex + 1}`;

                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className = 'cbx-iconbtn is-danger';
                deleteBtn.setAttribute('aria-label', out('Delete item'));
                deleteBtn.innerHTML = '<svg aria-hidden="true"><use xlink:href="#icon-trash2"></use></svg>';
                deleteBtn.onclick = (e) => { e.preventDefault(); item.remove(); itemEditor.remove(); onChange?.(); };

                head.append(drag, thumb, titleText, deleteBtn);

                // ── Body ──
                const body = document.createElement('div');
                body.className = 'cbx-item-body';
                body.style.display = 'none';

                const isImage = item.querySelector('img, video')?.tagName === 'IMG';

                // Media URL (+ browse)
                const mediaInput = document.createElement('input');
                mediaInput.type = 'text';
                mediaInput.placeholder = out('Image or video URL');
                mediaInput.value = getMediaSrc(item) || '';
                const applyMedia = (url) => {
                    if (!url) return;
                    switchMediaType(item, url, onChange);
                    thumb.src = isVideoUrl(url) ? 'https://placehold.co/40x40?text=Video' : url;
                    thumb.onerror = () => { thumb.src = 'https://placehold.co/40x40?text=Media'; };
                };
                mediaInput.addEventListener('input', () => applyMedia(mediaInput.value.trim()));
                body.appendChild(makeField(out('Media URL'), makeBrowseRow(mediaInput, (url) => { mediaInput.value = url; applyMedia(url); })));

                // Title
                const titleInput = document.createElement('input');
                titleInput.type = 'text';
                titleInput.placeholder = out('Item title');
                titleInput.value = item.querySelector('.item-title')?.textContent || '';
                titleInput.addEventListener('input', () => {
                    let titleEl = item.querySelector('.item-title');
                    if (!titleEl && titleInput.value) {
                        titleEl = document.createElement('h3');
                        titleEl.className = 'item-title';
                        const content = item.querySelector('.item-content');
                        if (!content) {
                            const newContent = document.createElement('div');
                            newContent.className = 'item-content';
                            newContent.appendChild(titleEl);
                            item.appendChild(newContent);
                        } else {
                            content.prepend(titleEl);
                        }
                    }
                    if (titleEl) titleEl.textContent = titleInput.value;
                    titleText.textContent = titleInput.value || `${out('Item')} ${itemIndex + 1}`;
                    const imgEl = item.querySelector('img');
                    if (imgEl) imgEl.alt = titleInput.value;
                    onChange?.();
                });
                body.appendChild(makeField(out('Title'), titleInput));

                // Description
                const descInput = document.createElement('textarea');
                descInput.placeholder = out('Item description (optional)');
                descInput.rows = 3;
                descInput.value = item.querySelector('.item-description')?.textContent || '';
                let descTimer;
                descInput.addEventListener('input', () => {
                    clearTimeout(descTimer);
                    descTimer = setTimeout(() => {
                        let descEl = item.querySelector('.item-description');
                        if (!descEl && descInput.value) {
                            descEl = document.createElement('p');
                            descEl.className = 'item-description';
                            const content = item.querySelector('.item-content');
                            if (!content) {
                                const newContent = document.createElement('div');
                                newContent.className = 'item-content';
                                newContent.appendChild(descEl);
                                item.appendChild(newContent);
                            } else {
                                content.appendChild(descEl);
                            }
                        }
                        if (descEl) descEl.textContent = descInput.value;
                        onChange?.();
                    }, 400);
                });
                body.appendChild(makeField(out('Description'), descInput));

                // Alt text (images only)
                if (isImage) {
                    const altInput = document.createElement('input');
                    altInput.type = 'text';
                    altInput.placeholder = out('Describe the image for screen readers');
                    altInput.value = item.querySelector('img')?.alt || titleInput.value;
                    altInput.addEventListener('input', () => {
                        const img = item.querySelector('img');
                        if (img) img.alt = altInput.value;
                        onChange?.();
                    });
                    body.appendChild(makeField(out('Alt Text (Accessibility)'), altInput));
                }

                // Link URL + Link Text
                const linkEl = item.querySelector('.item-content a.item-link');

                const linkInput = document.createElement('input');
                linkInput.type = 'text';
                linkInput.placeholder = out('https://example.com');
                linkInput.value = linkEl?.getAttribute('href') || '';

                const linkTextInput = document.createElement('input');
                linkTextInput.type = 'text';
                linkTextInput.placeholder = out('Learn More');
                linkTextInput.value = linkEl?.textContent || 'Learn More →';

                linkInput.addEventListener('input', () => {
                    const url = linkInput.value.trim();
                    const content = item.querySelector('.item-content');
                    if (!content) return;
                    const existingLink = content.querySelector('a.item-link');
                    if (url && !existingLink) {
                        const a = document.createElement('a');
                        a.href = url;
                        a.className = 'item-link';
                        a.target = '_blank';
                        a.rel = 'noopener noreferrer';
                        a.textContent = linkTextInput.value || 'Learn More →';
                        content.appendChild(a);
                    } else if (url && existingLink) {
                        existingLink.href = url;
                    } else if (!url && existingLink) {
                        existingLink.remove();
                    }
                    onChange?.();
                });
                linkTextInput.addEventListener('input', () => {
                    const content = item.querySelector('.item-content');
                    if (!content) return;
                    const existingLink = content.querySelector('a.item-link');
                    if (existingLink) { existingLink.textContent = linkTextInput.value || 'Learn More →'; onChange?.(); }
                });

                body.appendChild(makeField(out('Link URL (Optional)'), linkInput));
                body.appendChild(makeField(out('Link Text'), linkTextInput));

                // Toggle body open/closed on head click
                head.addEventListener('click', (e) => {
                    if (e.target.closest('.cbx-drag') || e.target.closest('button')) return;
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                itemEditor.append(head, body);
                return itemEditor;
            };

            (grid ? grid.querySelectorAll('.card-item') : []).forEach((item, i) => stack.appendChild(createItemEditor(item, i)));

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function() {
                        const itemMap = new Map();
                        grid.querySelectorAll('.card-item').forEach(item => {
                            if (item.dataset.itemId) itemMap.set(item.dataset.itemId, item);
                        });
                        Array.from(stack.children).forEach(editorItem => {
                            const actualItem = itemMap.get(editorItem.dataset.itemId);
                            if (actualItem) grid.appendChild(actualItem);
                        });
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag optional */ });

            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Item');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const newItem = document.createElement('div');
                newItem.className = 'card-item';
                newItem.dataset.itemId = `item-${Date.now()}`;
                newItem.innerHTML = `
                    <div class="item-media">
                        <img src="https://placehold.co/800x450?text=New+Item" alt="New item">
                    </div>
                    <div class="item-content">
                        <h3 class="item-title">New Item</h3>
                        <p class="item-description">Item description</p>
                    </div>
                `;
                grid.appendChild(newItem);
                stack.appendChild(createItemEditor(newItem, stack.children.length));
                onChange?.();
            };
            container.appendChild(addBtn);

            return container;
        }
    },

    // PATTERN: mount function applies runtime behavior and styling
    mount: function(element, options) {
        // Parse and set default values for plugin options
        const opts = {
            itemsPerRow: parseInt(options.itemsPerRow) || 3,
            gap: parseInt(options.gap) || 16,
            aspectRatio: options.aspectRatio || '16/9',
            accentColor: options.accentColor || ''
        };

        const grid = element.querySelector('.card-list-grid');
        const items = grid.querySelectorAll('.card-item');
        
        if (items.length === 0) return {};

        // Apply layout (set individual properties so other inline styles aren't wiped)
        element.style.position = 'relative';
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = `repeat(${opts.itemsPerRow}, 1fr)`;
        grid.style.gap = `${opts.gap}px`;

        // Apply aspect ratio to items
        items.forEach(item => {
            const media = item.querySelector('.item-media');
            if (media && opts.aspectRatio !== 'auto') {
                media.style.aspectRatio = opts.aspectRatio;
            }
        });

        // Helper: Convert any color format to RGB values
        const parseColor = (color) => {
            const temp = document.createElement('div');
            temp.style.color = color;
            document.body.appendChild(temp);
            const computed = window.getComputedStyle(temp).color;
            document.body.removeChild(temp);
            
            const match = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (match) {
                return {
                    r: parseInt(match[1]),
                    g: parseInt(match[2]),
                    b: parseInt(match[3])
                };
            }
            return { r: 0, g: 102, b: 204 };
        };

        // Helper: Convert RGB to HSL
        const rgbToHsl = (r, g, b) => {
            r /= 255;
            g /= 255;
            b /= 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                    case g: h = ((b - r) / d + 2) / 6; break;
                    case b: h = ((r - g) / d + 4) / 6; break;
                }
            }

            return { h: h * 360, s: s * 100, l: l * 100 };
        };

        // Helper: Convert HSL to RGB
        const hslToRgb = (h, s, l) => {
            h /= 360;
            s /= 100;
            l /= 100;
            let r, g, b;

            if (s === 0) {
                r = g = b = l;
            } else {
                const hue2rgb = (p, q, t) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1/6) return p + (q - p) * 6 * t;
                    if (t < 1/2) return q;
                    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                };
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }

            return {
                r: Math.round(r * 255),
                g: Math.round(g * 255),
                b: Math.round(b * 255)
            };
        };

        // Helper: Lighten a color by increasing lightness
        const lightenColor = (color, amount = 25) => {
            const rgb = parseColor(color);
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            
            hsl.l = Math.min(90, hsl.l + amount);
            
            const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
            return `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`;
        };

        // PATTERN: Apply accent color using CSS custom properties for theming
        // This allows the CSS to reference --accent-color
        element.style.setProperty('--accent-color', opts.accentColor);

        // Card surface (Background Color / Border Color). The setting defaults match the
        // stylesheet's --cl-card-bg / --cl-card-border defaults, so the color picker shows
        // the true rendered color. Falling back to '' (for older embeds with no attribute)
        // removes the inline var so the stylesheet default applies — same color either way.
        element.style.setProperty('--cl-card-bg', options.bgColor || '');
        element.style.setProperty('--cl-card-border', options.borderColor || '');

        // PATTERN: Add accessibility attributes for keyboard navigation
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'region');
        element.setAttribute('aria-label', 'Card list');

        return {};
    },

    unmount: function(element, instance) {
        // No cleanup needed for static grid
    }
};