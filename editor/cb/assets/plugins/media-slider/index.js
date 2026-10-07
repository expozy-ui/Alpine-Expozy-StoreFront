/*
Usage:

<div data-cb-type="media-slider" data-cb-items-per-slide="2" data-cb-gap="26" data-cb-aspect-ratio="4/3" tabindex="0" role="region" aria-label="Media slider" aria-roledescription="carousel" style="position: relative; overflow: hidden; --accent-color: rgba(255, 133, 33, 1); --accent-color-light: rgb(255, 203, 161);" data-cb-accent-color="rgba(255, 133, 33, 1)" data-cb-autoplay="true" data-cb-autoplay-speed="3000" data-cb-loop="true" data-cb-pause-on-hover="true" data-cb-show-arrows="true" data-cb-show-dots="true" data-cb-show-counter="false">
    <div class="media-slider-track">
        <div class="slider-item" data-item-id="item-1760757493999-0">
            <div class="item-media">
                <img src="assets/minimalist-blocks/images/ai-Vr5N2.jpg" alt="Product showcase">
            </div>
            <div class="item-content">
                <h3 class="item-title">Premium Widget</h3>
                <p class="item-description">High-quality craftsmanship</p>
                <a href="/product/1" class="item-link">Learn More →</a>
            </div>
        </div>

        <div class="slider-item" data-item-id="item-1760757493999-1">
            <div class="item-media">
                <img src="assets/minimalist-blocks/images/ai-sFtJP2.jpg" alt="Another product">
            </div>
            <div class="item-content">
                <h3 class="item-title">Deluxe Gadget</h3>
                <p class="item-description">Innovation meets design</p>
                <a href="/product/2" class="item-link">Learn More →</a>
            </div>
        </div>

        <div class="slider-item" data-item-id="item-1760757493999-2">
            <div class="item-media">
                <img src="assets/minimalist-blocks/images/ai-LUjJw.jpg" alt="Third product">
            </div>
            <div class="item-content">
                <h3 class="item-title">Essential Tool</h3>
                <p class="item-description">Everyday excellence</p>
                <a href="/product/3" class="item-link">Learn More →</a>
            </div>
        </div>

        <div class="slider-item" data-item-id="item-1760757493999-3">
            <div class="item-media">
                <img src="assets/minimalist-blocks/images/ai-yBliz.jpg" alt="Fourth product">
            </div>
            <div class="item-content">
                <h3 class="item-title">Smart Device</h3>
                <p class="item-description">Technology simplified</p>
                <a href="/product/4" class="item-link">Learn More →</a>
            </div>
        </div>
    </div>
</div>
*/

export default {
    name: 'media-slider',
    displayName: 'Media Slider',
    version: '2.0.0',

    settings: {
        _groups: [
            {
                id: 'layout',
                label: 'Layout',
                fields: ['itemsPerSlide', 'gap', 'aspectRatio']
            },
            {
                id: 'appearance',
                label: 'Appearance',
                fields: ['accentColor', 'borderColor', 'rounded']
            },
            {
                id: 'behavior',
                label: 'Behavior',
                fields: ['autoplay', 'autoplaySpeed', 'loop', 'pauseOnHover']
            },
            {
                id: 'controls',
                label: 'Controls',
                fields: ['showArrows', 'showDots', 'showCounter']
            }
        ],
        itemsPerSlide: {
            type: 'number',
            label: 'Items Per View',
            default: 1,
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
        accentColor: {
            type: 'color',
            label: 'Accent Color',
            default: '#0066cc',
            group: 'appearance'
        },
        borderColor: {
            type: 'color',
            label: 'Border Color',
            default: '#e5e7eb',
            group: 'appearance'
        },
        rounded: {
            type: 'boolean',
            label: 'Rounded Corners',
            default: true,
            group: 'appearance'
        },
        autoplay: {
            type: 'boolean',
            label: 'Autoplay',
            default: false,
            group: 'behavior'
        },
        autoplaySpeed: {
            type: 'number',
            label: 'Autoplay Speed',
            default: 5000,
            min: 1000,
            max: 10000,
            step: 500,
            unit: 'ms',
            group: 'behavior'
        },
        loop: {
            type: 'boolean',
            label: 'Loop Items',
            default: true,
            group: 'behavior'
        },
        pauseOnHover: {
            type: 'boolean',
            label: 'Pause on Hover',
            default: true,
            group: 'behavior'
        },
        showArrows: {
            type: 'boolean',
            label: 'Show Navigation Arrows',
            default: true,
            group: 'controls'
        },
        showDots: {
            type: 'boolean',
            label: 'Show Dots Indicator',
            default: true,
            group: 'controls'
        },
        showCounter: {
            type: 'boolean',
            label: 'Show Item Counter',
            default: false,
            group: 'controls'
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

            // Helper: Detect if URL is video
            const isVideoUrl = (url) => {
                return /\.(mp4|webm|ogg|mov)$/i.test(url);
            };

            // Helper: Get media src from item
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

            // Helper: Switch media type based on URL
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

            const track = element.querySelector('.media-slider-track');
            const items = track ? track.querySelectorAll('.slider-item') : [];

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

            // Create item editor
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

            items.forEach((item, i) => stack.appendChild(createItemEditor(item, i)));

            // Initialize SortableJS for items
            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function() {
                        const itemMap = new Map();
                        track.querySelectorAll('.slider-item').forEach(item => {
                            if (item.dataset.itemId) itemMap.set(item.dataset.itemId, item);
                        });
                        Array.from(stack.children).forEach(editorItem => {
                            const actualItem = itemMap.get(editorItem.dataset.itemId);
                            if (actualItem) track.appendChild(actualItem);
                        });
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag optional */ });

            // Add item button
            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Item');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const newItem = document.createElement('div');
                newItem.className = 'slider-item';
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
                track.appendChild(newItem);
                stack.appendChild(createItemEditor(newItem, stack.children.length));
                onChange?.();
            };
            container.appendChild(addBtn);

            return container;
        }
    },

    mount: function(element, options) {
        const opts = {
            itemsPerSlide: parseInt(options.itemsPerSlide) || 1,
            gap: parseInt(options.gap) || 16,
            aspectRatio: options.aspectRatio || '16/9',
            accentColor: options.accentColor || '#0066cc',
            autoplay: options.autoplay === true || options.autoplay === 'true',
            autoplaySpeed: parseInt(options.autoplaySpeed) || 5000,
            loop: options.loop !== false && options.loop !== 'false',
            pauseOnHover: options.pauseOnHover !== false && options.pauseOnHover !== 'false',
            showArrows: options.showArrows !== false && options.showArrows !== 'false',
            showDots: options.showDots !== false && options.showDots !== 'false',
            showCounter: options.showCounter === true || options.showCounter === 'true'
        };

        const track = element.querySelector('.media-slider-track');
        const items = track.querySelectorAll('.slider-item');
        
        if (items.length === 0) return {};

        let currentIndex = 0;
        let autoplayTimer = null;
        let touchStartX = 0;
        let touchEndX = 0;

        // Apply styles (set individual properties so other inline styles aren't wiped)
        element.style.position = 'relative';
        element.style.overflow = 'hidden';

        track.style.display = 'flex';
        track.style.gap = `${opts.gap}px`;
        track.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        track.style.willChange = 'transform';

        // Calculate item width based on itemsPerSlide and gap
        const itemWidth = `calc((100% - ${opts.gap * (opts.itemsPerSlide - 1)}px) / ${opts.itemsPerSlide})`;

        items.forEach(item => {
            item.style.flexShrink = '0';
            item.style.width = itemWidth;

            const media = item.querySelector('.item-media');
            if (media && opts.aspectRatio !== 'auto') {
                media.style.aspectRatio = opts.aspectRatio;
            }
        });

        // Navigation
        const goToIndex = (index) => {
            currentIndex = Math.max(0, Math.min(index, items.length - opts.itemsPerSlide));
            
            // Use pixel-based calculation for precision
            if (items.length > 0) {
                const firstItem = items[0];
                const itemWidth = firstItem.offsetWidth;
                const totalGap = opts.gap;
                const moveDistance = currentIndex * (itemWidth + totalGap);
                
                track.style.transform = `translateX(-${moveDistance}px)`;
            }
            
            updateControls();
            
            // Announce to screen readers
            const liveRegion = element.querySelector('.slider-live-region');
            if (liveRegion) {
                liveRegion.textContent = `Showing items ${currentIndex + 1} to ${Math.min(currentIndex + opts.itemsPerSlide, items.length)} of ${items.length}`;
            }
        };

        const nextSlide = () => {
            if (currentIndex < items.length - opts.itemsPerSlide) {
                goToIndex(currentIndex + 1);
            } else if (opts.loop) {
                goToIndex(0);
            }
        };

        const prevSlide = () => {
            if (currentIndex > 0) {
                goToIndex(currentIndex - 1);
            } else if (opts.loop) {
                goToIndex(items.length - opts.itemsPerSlide);
            }
        };

        // Controls
        const updateControls = () => {
            if (opts.showArrows) {
                const prevBtn = element.querySelector('.slider-prev');
                const nextBtn = element.querySelector('.slider-next');
                
                if (!opts.loop) {
                    prevBtn.disabled = currentIndex === 0;
                    nextBtn.disabled = currentIndex >= items.length - opts.itemsPerSlide;
                }
            }

            if (opts.showDots) {
                const dots = element.querySelectorAll('.slider-dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                    dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
                });
            }

            if (opts.showCounter) {
                const counter = element.querySelector('.slider-counter');
                if (counter) {
                    counter.textContent = `${currentIndex + 1}-${Math.min(currentIndex + opts.itemsPerSlide, items.length)} / ${items.length}`;
                }
            }
        };

        // Create controls
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'slider-controls';

        // Arrows
        if (opts.showArrows && items.length > opts.itemsPerSlide) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'slider-prev';
            prevBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 18l-6-6 6-6"/>
                </svg>
            `;
            prevBtn.setAttribute('aria-label', 'Previous items');
            prevBtn.onclick = () => {
                prevSlide();
                resetAutoplay();
            };

            const nextBtn = document.createElement('button');
            nextBtn.className = 'slider-next';
            nextBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            `;
            nextBtn.setAttribute('aria-label', 'Next items');
            nextBtn.onclick = () => {
                nextSlide();
                resetAutoplay();
            };

            element.appendChild(prevBtn);
            element.appendChild(nextBtn);
        }

        // Dots
        if (opts.showDots && items.length > opts.itemsPerSlide) {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'slider-dots';
            dotsContainer.setAttribute('role', 'tablist');
            dotsContainer.setAttribute('aria-label', 'Item navigation');

            const totalDots = items.length - opts.itemsPerSlide + 1;
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('button');
                dot.className = 'slider-dot';
                dot.setAttribute('role', 'tab');
                dot.setAttribute('aria-label', `Go to item ${i + 1}`);
                dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
                dot.onclick = () => {
                    goToIndex(i);
                    resetAutoplay();
                };
                dotsContainer.appendChild(dot);
            }

            controlsContainer.appendChild(dotsContainer);
        }

        // Counter
        if (opts.showCounter) {
            const counter = document.createElement('div');
            counter.className = 'slider-counter';
            counter.setAttribute('aria-live', 'polite');
            counter.textContent = `1-${Math.min(opts.itemsPerSlide, items.length)} / ${items.length}`;
            controlsContainer.appendChild(counter);
        }

        element.appendChild(controlsContainer);

        // Live region for screen readers
        const liveRegion = document.createElement('div');
        liveRegion.className = 'slider-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        element.appendChild(liveRegion);

        // Helper: Convert any color format to RGB values
        const parseColor = (color) => {
            // Create a temporary element to parse the color
            const temp = document.createElement('div');
            temp.style.color = color;
            document.body.appendChild(temp);
            const computed = window.getComputedStyle(temp).color;
            document.body.removeChild(temp);
            
            // Extract RGB values from computed style (returns "rgb(r, g, b)" or "rgba(r, g, b, a)")
            const match = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (match) {
                return {
                    r: parseInt(match[1]),
                    g: parseInt(match[2]),
                    b: parseInt(match[3])
                };
            }
            return { r: 0, g: 102, b: 204 }; // fallback to default blue
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
            
            // Increase lightness, cap at 90% to avoid white
            hsl.l = Math.min(90, hsl.l + amount);
            
            const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
            return `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`;
        };

        // Apply accent color via CSS custom property
        const accentColorLight = lightenColor(opts.accentColor, 25);
        element.style.setProperty('--accent-color', opts.accentColor);
        element.style.setProperty('--accent-color-light', accentColorLight);

        // Card border color. Empty falls back to the stylesheet default so older
        // embeds without it are unchanged; the setting default matches that default
        // so the picker shows the true rendered color. (Rounded Corners is a boolean
        // handled in CSS off the data-cb-rounded attribute.)
        element.style.setProperty('--ms-card-border', options.borderColor || '');

        // Autoplay
        const startAutoplay = () => {
            stopAutoplay(); // Clear any existing timer first
            if (opts.autoplay && items.length > opts.itemsPerSlide) {
                autoplayTimer = setInterval(nextSlide, opts.autoplaySpeed);
            }
        };

        const stopAutoplay = () => {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        };

        const resetAutoplay = () => {
            if (opts.autoplay && items.length > opts.itemsPerSlide) {
                stopAutoplay();
                // Add a small delay before restarting to prevent immediate firing
                setTimeout(startAutoplay, 100);
            }
        };

        // Touch support
        const handleTouchStart = (e) => {
            touchStartX = e.touches[0].clientX;
        };

        const handleTouchMove = (e) => {
            touchEndX = e.touches[0].clientX;
        };

        const handleTouchEnd = () => {
            const diff = touchStartX - touchEndX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                resetAutoplay();
            }
        };

        track.addEventListener('touchstart', handleTouchStart, { passive: true });
        track.addEventListener('touchmove', handleTouchMove, { passive: true });
        track.addEventListener('touchend', handleTouchEnd);

        // Keyboard navigation
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'region');
        element.setAttribute('aria-label', 'Media slider');
        element.setAttribute('aria-roledescription', 'carousel');

        element.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
                resetAutoplay();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
                resetAutoplay();
            }
        });

        // Pause on hover
        if (opts.pauseOnHover) {
            element.addEventListener('mouseenter', stopAutoplay);
            element.addEventListener('mouseleave', startAutoplay);
        }

        // Initialize
        goToIndex(0); // Set initial position
        updateControls();
        startAutoplay();

        // Cleanup
        return {
            destroy: () => {
                stopAutoplay();
                track.removeEventListener('touchstart', handleTouchStart);
                track.removeEventListener('touchmove', handleTouchMove);
                track.removeEventListener('touchend', handleTouchEnd);
            }
        };
    },

    unmount: function(element, instance) {
        if (instance && instance.destroy) {
            instance.destroy();
        }
    }
};