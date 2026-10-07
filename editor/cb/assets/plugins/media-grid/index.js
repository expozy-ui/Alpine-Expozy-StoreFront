export default {
    name: 'media-grid',
    displayName: 'Media Grid',
    version: '1.1.0',

    contentbox: {
        // configure contentbox panel
        bgImage: false,
        boxTabContent: false,
        boxTabOnClick: false,
    },

    settings: {
        columns: {
            type: 'range',
            label: 'Columns',
            default: 3,
            min: 1,
            max: 6,
            step: 1
        },
        gap: {
            type: 'number',
            label: 'Gap',
            default: 16,
            min: 0,
            max: 48,
            step: 1,
            unit: 'px'
        },
        padding: {
            type: 'number',
            label: 'Padding',
            default: 0,
            min: 0,
            max: 48,
            step: 1,
            unit: 'px'
        },
        rounded: {
            type: 'number',
            label: 'Rounded Corners',
            default: 8,
            min: 0,
            max: 24,
            step: 1,
            unit: 'px'
        },
        contentTheme: {
            type: 'select',
            label: 'Caption Theme',
            default: 'dark',
            options: [
                { value: 'dark', label: 'Dark' },
                { value: 'light', label: 'Light' }
            ]
        }
    },

    editor: {
        openContentEditor: function(element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

            const loadSortable = (() => {
                let sortablePromise = null;

                return () => {
                    if (window.Sortable) return Promise.resolve(window.Sortable);
                    if (sortablePromise) return sortablePromise; // already loading

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
                            sortablePromise = null; // clear cache to allow retry
                            setTimeout(() => loadSortable(), 1000); // retry once after delay
                            reject(new Error('Failed to load SortableJS'));
                        };
                        document.head.appendChild(script);
                    });

                    return sortablePromise;
                };
            })();

            // Helper: Detect if URL is video
            const isVideoUrl = (url) => /\.(mp4|webm|ogg|mov)$/i.test(url);

            // Helper: Get media src from item
            const getMediaSrc = (item) => {
                const media = item.querySelector('img, video, video source');
                let src = '';
                if (media) {
                    if (media.tagName === 'IMG') {
                        src = media.getAttribute('src') || '';         // raw attr preserves relative paths
                    } else if (media.tagName === 'VIDEO') {
                        src = media.getAttribute('src') || media.querySelector('source')?.getAttribute('src') || '';
                    } else if (media.tagName === 'SOURCE') {
                        src = media.getAttribute('src') || '';
                    }
                }
                return src;
            };

            // Helper: Switch media type based on URL
            const switchMediaType = (item, url, onChange) => {
                const mediaWrapper = item;
                const isVideo = isVideoUrl(url);
                const currentMedia = mediaWrapper.querySelector('img, video');
                const currentIsVideo = currentMedia?.tagName === 'VIDEO';

                if (isVideo && !currentIsVideo) {
                    const video = document.createElement('video');
                    video.muted = true;
                    video.playsInline = true;
                    video.autoplay = true;
                    const source = document.createElement('source');
                    source.src = url;
                    source.type = 'video/' + url.split('.').pop().toLowerCase();
                    video.appendChild(source);
                    mediaWrapper.innerHTML = '';
                    mediaWrapper.appendChild(video);
                    onChange?.();
                } else if (!isVideo && currentIsVideo) {
                    const img = document.createElement('img');
                    img.src = url;
                    img.alt = item.querySelector('.item-title')?.textContent || '';
                    mediaWrapper.innerHTML = '';
                    mediaWrapper.appendChild(img);
                    onChange?.();
                } else {
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

            const createItemEditor = (item, itemIndex) => {
                item.dataset.itemId = item.dataset.itemId || `item-${Date.now()}-${itemIndex}`;

                const itemEditor = document.createElement('div');
                itemEditor.className = 'cbx-item';
                itemEditor.dataset.itemId = item.dataset.itemId;

                const img = item.querySelector('img');
                const contentEl = item.querySelector('.item-content');
                const titleEl = contentEl?.querySelector('h4');
                const descEl = contentEl?.querySelector('div');

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
                thumb.src = img?.src || 'https://placehold.co/60x60?text=No+Img';
                thumb.onerror = () => { thumb.src = 'https://placehold.co/40x40?text=Media'; };

                const titleText = document.createElement('span');
                titleText.className = 'cbx-title';
                titleText.textContent = titleEl?.textContent || `${out('Item')} ${itemIndex + 1}`;

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

                // labelled field (label + control)
                const makeField = (labelText, control) => {
                    const f = document.createElement('div');
                    f.className = 'cbx-field';
                    const l = document.createElement('label');
                    l.textContent = labelText;
                    f.append(l, control);
                    return f;
                };
                // input + browse button, on one row
                const makeBrowseRow = (input, onPick) => {
                    input.classList.add('cbx-grow');
                    const row = document.createElement('div');
                    row.className = 'cbx-row';
                    row.append(input, ...builder.createFileButtons('media', onPick));
                    return row;
                };

                // ── Caption content helpers (h4 title + div desc + a.item-link) ──
                const constructContent = (item) => {
                    const content = document.createElement('div');
                    content.className = 'item-content';
                    item.appendChild(content);
                    return content;
                };
                const cleanupContent = (item) => {
                    if (titleInput.value === '' && descInput.value === '' && linkInput.value === '') {
                        const content = item.querySelector('.item-content');
                        if (content) content.remove();
                    }
                };
                const enforceContentOrder = (content) => {
                    const h4 = content.querySelector('h4');
                    const div = content.querySelector('div');
                    const link = content.querySelector('a.item-link');
                    [h4, div, link].filter(Boolean).forEach(el => content.appendChild(el)); // reorder, no dupes
                };
                const setTitle = (item, title) => {
                    let content = item.querySelector('.item-content') || constructContent(item);
                    let h4 = content.querySelector('h4');
                    if (!h4) { h4 = document.createElement('h4'); content.appendChild(h4); }
                    h4.textContent = title;
                    enforceContentOrder(content);
                    cleanupContent(item);
                };
                const setDesc = (item, desc) => {
                    let content = item.querySelector('.item-content') || constructContent(item);
                    let div = content.querySelector('div');
                    if (!div) { div = document.createElement('div'); content.appendChild(div); }
                    div.textContent = desc;
                    enforceContentOrder(content);
                    cleanupContent(item);
                };

                const currentMediaEl = item.querySelector('img, video');
                const isImage = currentMediaEl?.tagName === 'IMG';

                // ── Media URL (+ browse) ──
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

                // ── Lightbox URL (images only) ──
                if (isImage) {
                    const lightboxInput = document.createElement('input');
                    lightboxInput.type = 'text';
                    lightboxInput.placeholder = out('Image URL for lightbox');
                    const existingWrap = item.querySelector('a.is-lightbox');
                    if (existingWrap) lightboxInput.value = existingWrap.getAttribute('href') || '';

                    const updateLightboxLink = (url) => {
                        const img = item.querySelector('img');
                        if (!img) return;
                        const currentWrap = img.closest('a.is-lightbox');
                        if (url) {
                            if (currentWrap) {
                                currentWrap.href = url;
                            } else {
                                const wrapper = document.createElement('a');
                                wrapper.href = url;
                                wrapper.className = 'is-lightbox';
                                wrapper.appendChild(img.cloneNode(true));
                                img.replaceWith(wrapper);
                            }
                        } else if (currentWrap) {
                            currentWrap.replaceWith(currentWrap.querySelector('img'));
                        }
                        onChange?.();
                    };
                    lightboxInput.addEventListener('input', () => updateLightboxLink(lightboxInput.value.trim()));
                    body.appendChild(makeField(out('Open in a lightbox'), makeBrowseRow(lightboxInput, (url) => { lightboxInput.value = url; updateLightboxLink(url); })));
                }

                // ── Title ──
                const titleInput = document.createElement('input');
                titleInput.type = 'text';
                titleInput.placeholder = out('Caption title');
                titleInput.value = titleEl?.textContent || '';
                titleInput.addEventListener('input', () => {
                    setTitle(item, titleInput.value);
                    titleText.textContent = titleInput.value || `${out('Item')} ${itemIndex + 1}`;
                    onChange();
                });
                body.appendChild(makeField(out('Title'), titleInput));

                // ── Description ──
                const descInput = document.createElement('textarea');
                descInput.rows = 4;
                descInput.placeholder = out('Caption description');
                descInput.value = descEl?.textContent || '';
                descInput.addEventListener('input', () => { setDesc(item, descInput.value); onChange(); });
                body.appendChild(makeField(out('Description'), descInput));

                // ── Alt text (images only) ──
                if (isImage) {
                    const altInput = document.createElement('input');
                    altInput.type = 'text';
                    altInput.placeholder = out('Describe the image for screen readers');
                    altInput.value = img?.alt || titleInput.value;
                    altInput.addEventListener('input', () => {
                        const im = item.querySelector('img');
                        if (im) im.alt = altInput.value;
                        onChange?.();
                    });
                    body.appendChild(makeField(out('Alt Text (Accessibility)'), altInput));
                }

                // ── Link URL + Link Text ──
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
                    const content = item.querySelector('.item-content') || constructContent(item);
                    const existingLink = content.querySelector('a.item-link');
                    if (url && !existingLink) {
                        const a = document.createElement('a');
                        a.href = url;
                        a.className = 'item-link';
                        a.textContent = linkTextInput.value || 'Learn More →';
                        content.appendChild(a);
                    } else if (url && existingLink) {
                        existingLink.href = url;
                    } else if (!url && existingLink) {
                        existingLink.remove();
                    }
                    enforceContentOrder(content);
                    cleanupContent(item);
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

            element.querySelectorAll('.gallery-item').forEach((item, i) => stack.appendChild(createItemEditor(item, i)));

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function() {
                        const itemMap = new Map();
                        element.querySelectorAll('.gallery-item').forEach(item => {
                            if (item.dataset.itemId) itemMap.set(item.dataset.itemId, item);
                        });
                        Array.from(stack.children).forEach(editorItem => {
                            const actualItem = itemMap.get(editorItem.dataset.itemId);
                            if (actualItem) element.appendChild(actualItem);
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
                newItem.dataset.itemId = `item-${Date.now()}`;
                newItem.className = 'gallery-item';
                newItem.innerHTML = `<img src="https://placehold.co/600x800?text=New+Image" alt="">`;
                element.appendChild(newItem);
                stack.appendChild(createItemEditor(newItem, stack.children.length));
                onChange();
            };
            container.appendChild(addBtn);

            return container;
        }
    },

    mount: function(element, options) {
        const cols = Math.max(1, Math.min(6, parseInt(options.columns) || 3));
        const gap = Math.max(0, Math.min(48, isNaN(parseInt(options.gap)) ? 16 : parseInt(options.gap)));
        const padding = Math.max(0, Math.min(48, isNaN(parseInt(options.padding)) ? 0 : parseInt(options.padding)));
        const rounded = Math.max(0, Math.min(24, isNaN(parseInt(options.rounded)) ? 8 : parseInt(options.rounded)));
        const contentTheme = options.contentTheme === 'light' ? 'light' : 'dark';

        element.style.setProperty('--column-count', cols);
        element.style.setProperty('--column-gap', gap + 'px');
        element.style.setProperty('--padding', padding + 'px');
        element.style.setProperty('--border-radius', rounded + 'px');

        if(contentTheme === 'light') {
            element.style.setProperty('--caption-background', 'rgba(255, 255, 255, 0.96)');
            element.style.setProperty('--caption-color', '#000');
        } else {
            element.style.setProperty('--caption-background', 'rgba(0, 0, 0, 0.45)');
            element.style.setProperty('--caption-color', 'white');
        }

        return {};
    }
};
