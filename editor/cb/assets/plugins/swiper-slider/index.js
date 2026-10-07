export default {
    name: 'swiper-slider',
    displayName: 'Slider',
    version: '2.0.0',

    contentbox: {
        bg: false,
        text: false,
        title: false
    },

    settings: {
        _groups: [
            {
                id: 'behavior',
                label: 'Behavior',
                fields: ['autoplay', 'pauseOnHover', 'delay', 'transitionSpeed', 'loop', 'effect', 'zoomEffect', 'zoomScale']
            },
            {
                id: 'layout',
                label: 'Layout',
                fields: ['aspectRatio', 'slidesPerView', 'spaceBetween', 'roundedCorners', 'textPosition', 'textMaxWidth', 'topOverlayOpacity', 'bottomOverlayOpacity', 'navigation', 'navigationButtonSize', 'navigationArrowSize', 'navigationRoundedCorners', 'navigationOffset', 'navigationStyle', 'pagination', 'paginationStyle']
            }
        ],
        autoplay: {
            type: 'boolean',
            label: 'Enable Autoplay',
            default: true,
            group: 'behavior'
        },
        delay: {
            type: 'number',
            label: 'Autoplay Delay',
            default: 3000,
            min: 500,
            step: 500,
            unit: 'ms',
            group: 'behavior'
        },
        transitionSpeed: {
            type: 'number',
            label: 'Transition Speed',
            default: 800,
            min: 300,
            max: 3000,
            step: 100,
            unit: 'ms',
            group: 'behavior'
        },
        loop: {
            type: 'boolean',
            label: 'Loop Slides',
            default: true,
            group: 'behavior'
        },
        pauseOnHover: {
            type: 'boolean',
            label: 'Pause on Hover',
            default: true,
            group: 'behavior'
        },
        effect: {
            type: 'select',
            label: 'Transition Effect',
            default: 'slide',
            options: [
                { value: 'slide', label: 'Slide' },
                { value: 'fade', label: 'Fade' },
                { value: 'cube', label: 'Cube' },
                { value: 'coverflow', label: 'Coverflow' },
                { value: 'flip', label: 'Flip' }
            ],
            group: 'behavior'
        },
        zoomEffect: {
            type: 'boolean',
            label: 'Enable Zoom Effect',
            default: true,
            group: 'behavior'
        },
        zoomScale: {
            type: 'range',
            label: 'Zoom Scale',
            default: 108,
            min: 100,
            max: 120,
            step: 1,
            unit: '%',
            group: 'behavior'
        },
        aspectRatio: {
            type: 'select',
            label: 'Aspect Ratio',
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
        slidesPerView: {
            type: 'number',
            label: 'Slides Per View',
            default: 1,
            min: 1,
            max: 4,
            group: 'layout'
        },
        spaceBetween: {
            type: 'number',
            label: 'Gap',
            default: 0,
            min: 0,
            max: 100,
            step: 1,
            unit: 'px',
            group: 'layout'
        },
        roundedCorners: {
            type: 'range',
            label: 'Rounded Corners',
            default: 0,
            min: 0,
            max: 500,
            step: 1,
            unit: 'px',
            group: 'layout'
        },
        textPosition: {
            type: 'select',
            label: 'Text Position',
            default: 'position-bottom-left',
            options: [
                { value: 'position-top-left', label: 'Top Left' },
                { value: 'position-top-center', label: 'Top Center' },
                { value: 'position-top-right', label: 'Top Right' },
                { value: 'position-center-left', label: 'Center Left' },
                { value: 'position-center', label: 'Center' },
                { value: 'position-center-right', label: 'Center Right' },
                { value: 'position-bottom-left', label: 'Bottom Left' },
                { value: 'position-bottom-center', label: 'Bottom Center' },
                { value: 'position-bottom-right', label: 'Bottom Right' },
            ],
            group: 'layout'
        },
        textMaxWidth: {
            type: 'number',
            label: 'Text Max Width',
            default: 700,
            unit: 'px',
            group: 'layout'
        },
        topOverlayOpacity: {
            type: 'range',
            label: 'Top Overlay Opacity',
            default: 0.3,
            min: 0,
            max: 1,
            step: 0.1,
            group: 'layout'
        },
        bottomOverlayOpacity: {
            type: 'range',
            label: 'Bottom Overlay Opacity',
            default: 0.3,
            min: 0,
            max: 1,
            step: 0.1,
            group: 'layout'
        },
        navigation: {
            type: 'boolean',
            label: 'Show Navigation',
            default: true,
            group: 'layout'
        },
        navigationStyle: {
            type: 'select',
            label: 'Navigation Style',
            default: 'transparent',
            options: [
                { value: 'transparent', label: 'Transparent' },
                { value: 'solid', label: 'Solid' },
                { value: 'arrow', label: 'Arrow' },
            ],
            group: 'layout'
        },
        navigationButtonSize: {
            type: 'number',
            label: 'Navigation Size',
            default: 48,
            unit: 'px',
            group: 'layout'
        },
        navigationArrowSize: {
            type: 'number',
            label: 'Navigation Arrow Size',
            default: 16,
            unit: 'px',
            group: 'layout'
        },
        navigationOffset: {
            type: 'number',
            label: 'Navigation Offset',
            default: 20,
            unit: 'px',
            group: 'layout'
        },
        navigationRoundedCorners: {
            type: 'range',
            label: 'Navigation Corners',
            default: 50,
            min: 0,
            max: 50,
            step: 1,
            unit: '%',
            group: 'layout'
        },
        pagination: {
            type: 'boolean',
            label: 'Show Pagination',
            default: true,
            group: 'layout'
        },
        paginationStyle: {
            type: 'select',
            label: 'Pagination Style',
            default: 'dots',
            options: [
                { value: 'dots', label: 'Dots' },
                { value: 'rounded-rectangle', label: 'Rounded Rectangle' },
                { value: 'lines', label: 'Lines' }
            ],
            group: 'layout'
        },

    },

    editor: {
        openContentEditor: function(element, builder, onChange) {
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

            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            const itemsStack = document.createElement('div');
            itemsStack.className = 'cbx-stack';

            // labelled field (label + control)
            const makeField = (labelText, control) => {
                const f = document.createElement('div');
                f.className = 'cbx-field';
                const l = document.createElement('label');
                l.textContent = labelText;
                f.append(l, control);
                return f;
            };
            // input + the editor's file buttons (select / upload) on one row
            const makeBrowseRow = (input, type, onPick) => {
                input.classList.add('cbx-grow');
                const row = document.createElement('div');
                row.className = 'cbx-row';
                row.append(input, ...builder.createFileButtons(type, onPick));
                return row;
            };

            const wrapper = element.querySelector('.swiper-wrapper');
            const slides = Array.from(wrapper.querySelectorAll('.swiper-slide'))
                .filter(s => !s.classList.contains('swiper-slide-duplicate'));

            const createItemEditor = (item, itemIndex) => {
                // Item root
                const itemEditor = document.createElement('div');
                itemEditor.className = 'cbx-item';

                const itemId = item.dataset.slideId || `slide-${Date.now()}-${itemIndex}`;
                item.dataset.slideId = itemId;
                itemEditor.dataset.itemId = itemId;

                // Detect media type
                const slideImage = item.querySelector('.slide-image');
                const imgEl = slideImage.querySelector('img');
                const videoEl = slideImage.querySelector('video');
                const isVideo = !!videoEl;

                // Header: drag + thumb + title + delete
                const itemHeader = document.createElement('div');
                itemHeader.className = 'cbx-item-head';

                const dragHandle = document.createElement('span');
                dragHandle.className = 'cbx-drag';
                dragHandle.innerHTML = '⠿';
                dragHandle.setAttribute('aria-label', out('Drag to reorder'));

                const thumb = document.createElement('img');
                thumb.className = 'cbx-thumb';
                thumb.alt = '';
                thumb.src = isVideo ? 'https://placehold.co/40x40?text=Video' : (imgEl?.src || 'https://placehold.co/40x40?text=No+Media');
                thumb.onerror = () => {
                    thumb.src = 'https://placehold.co/40x40?text=Media';
                };

                const itemTitle = document.createElement('span');
                itemTitle.className = 'cbx-title';
                itemTitle.textContent = `${out('Slide')} ${itemIndex + 1} (${isVideo ? out('Video') : out('Image')})`;

                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className = 'cbx-iconbtn is-danger';
                deleteBtn.setAttribute('aria-label', out('Delete slide'));
                deleteBtn.innerHTML = '<svg aria-hidden="true"><use xlink:href="#icon-trash2"></use></svg>';
                deleteBtn.onclick = (e) => {
                    e.preventDefault();
                    item.remove();
                    itemEditor.remove();
                    onChange?.();
                };

                itemHeader.append(dragHandle, thumb, itemTitle, deleteBtn);

                // Body
                const itemBody = document.createElement('div');
                itemBody.className = 'cbx-item-body';
                itemBody.style.display = 'none';

                // Get existing video sources from data attributes
                const getVideoSources = () => {
                    if (!videoEl) return { large: '', desktop: '', tablet: '', mobile: '' };
                    
                    return {
                        large: videoEl.dataset.srcLarge || '',
                        desktop: videoEl.dataset.srcDesktop || videoEl.querySelector('source')?.src || '',
                        tablet: videoEl.dataset.srcTablet || '',
                        mobile: videoEl.dataset.srcMobile || ''
                    };
                };

                const videoSources = getVideoSources();

                // Media Type
                const typeSelect = document.createElement('select');
                typeSelect.innerHTML =
                    `<option value="image" ${!isVideo ? 'selected' : ''}>${out('Image')}</option>` +
                    `<option value="video" ${isVideo ? 'selected' : ''}>${out('Video')}</option>`;
                const typeField = makeField(out('Media Type'), typeSelect);

                // Media preview
                const previewImg = document.createElement('img');
                previewImg.className = 'cbx-preview';
                previewImg.alt = '';
                previewImg.src = isVideo ? 'https://placehold.co/200x120?text=Video' : (imgEl?.src || 'https://placehold.co/200x120?text=No+Img');

                // Media URL (image, or desktop video) + browse
                const mediaLabel = document.createElement('label');
                mediaLabel.textContent = isVideo ? out('Video URL (Desktop)') : out('Image URL');
                const mediaInput = document.createElement('input');
                mediaInput.type = 'text';
                mediaInput.value = isVideo ? videoSources.desktop : (imgEl?.getAttribute('src') || '');
                mediaInput.placeholder = isVideo ? out('Video URL (Desktop)') : out('Image URL');
                const mediaRow = makeBrowseRow(mediaInput, () => (typeSelect.value === 'video' ? 'video' : 'image'), (url) => {
                    mediaInput.value = url;

                    const detectedType = detectMediaType(url);
                    if (detectedType && typeSelect.value !== detectedType) {
                        typeSelect.value = detectedType;
                        typeSelect.dispatchEvent(new Event('change'));
                        return;
                    }

                    if (typeSelect.value === 'video') {
                        updateVideoSources();
                    } else {
                        const image = slideImage.querySelector('img');
                        if (image) {
                            image.src = url;
                            previewImg.src = url;
                            thumb.src = url;
                        }
                    }
                    onChange?.();
                });
                const mediaField = document.createElement('div');
                mediaField.className = 'cbx-field';
                mediaField.append(mediaLabel, mediaRow);

                // Responsive video sources (shown for video)
                const largeInput = document.createElement('input');
                largeInput.type = 'text';
                largeInput.placeholder = out('Optional: 4K video URL for large displays');
                largeInput.value = videoSources.large;
                const largeRow = makeBrowseRow(largeInput, 'video', (url) => {
                    largeInput.value = url;
                    updateVideoSources();
                    onChange?.();
                });
                const largeField = makeField(out('Video URL (4K/Large - above 1920px)'), largeRow);

                const tabletInput = document.createElement('input');
                tabletInput.type = 'text';
                tabletInput.placeholder = out('Optional: Tablet video URL');
                tabletInput.value = videoSources.tablet;
                const tabletRow = makeBrowseRow(tabletInput, 'video', (url) => {
                    tabletInput.value = url;
                    updateVideoSources();
                    onChange?.();
                });
                const tabletField = makeField(out('Video URL (Tablet - max 1280px)'), tabletRow);

                const mobileInput = document.createElement('input');
                mobileInput.type = 'text';
                mobileInput.placeholder = out('Optional: Mobile video URL');
                mobileInput.value = videoSources.mobile;
                const mobileRow = makeBrowseRow(mobileInput, 'video', (url) => {
                    mobileInput.value = url;
                    updateVideoSources();
                    onChange?.();
                });
                const mobileField = makeField(out('Video URL (Mobile - max 970px)'), mobileRow);

                const responsiveHint = document.createElement('small');
                responsiveHint.className = 'cbx-hint';
                responsiveHint.textContent = out('Tip: upload progressively larger videos for better quality on bigger screens.');

                const responsiveVideoContainer = document.createElement('div');
                responsiveVideoContainer.className = 'cbx-stack';
                responsiveVideoContainer.style.display = isVideo ? '' : 'none';
                responsiveVideoContainer.append(largeField, tabletField, mobileField, responsiveHint);

                // Alt text (images only)
                const altInput = document.createElement('input');
                altInput.type = 'text';
                altInput.value = imgEl?.alt || '';
                const altField = makeField(out('Alt Text'), altInput);
                altField.style.display = isVideo ? 'none' : '';

                // Helper functions
                const detectMediaType = (url) => {
                    const videoExtensions = /\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i;
                    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i;
                    
                    if (videoExtensions.test(url)) return 'video';
                    if (imageExtensions.test(url)) return 'image';
                    return null;
                };

                const updateVideoSources = () => {
                    const vid = slideImage.querySelector('video');
                    if (!vid) return;
                    
                    const largeSrc = largeInput.value.trim();
                    const desktopSrc = mediaInput.value.trim();
                    const tabletSrc = tabletInput.value.trim();
                    const mobileSrc = mobileInput.value.trim();
                    
                    if (largeSrc) vid.dataset.srcLarge = largeSrc;
                    else delete vid.dataset.srcLarge;
                    
                    if (desktopSrc) vid.dataset.srcDesktop = desktopSrc;
                    else delete vid.dataset.srcDesktop;
                    
                    if (tabletSrc) vid.dataset.srcTablet = tabletSrc;
                    else delete vid.dataset.srcTablet;
                    
                    if (mobileSrc) vid.dataset.srcMobile = mobileSrc;
                    else delete vid.dataset.srcMobile;
                    
                    vid.innerHTML = '';
                    const source = document.createElement('source');
                    source.src = desktopSrc;
                    source.type = 'video/mp4';
                    vid.appendChild(source);
                    vid.load();
                };

                const updateMediaType = () => {
                    const selectedType = typeSelect.value;
                    mediaLabel.textContent = selectedType === 'video' ? out('Video URL (Desktop)') : out('Image URL');
                    mediaInput.placeholder = selectedType === 'video' ? out('Video URL (Desktop)') : out('Image URL');
                    altField.style.display = selectedType === 'image' ? '' : 'none';
                    responsiveVideoContainer.style.display = selectedType === 'video' ? '' : 'none';
                    itemTitle.textContent = `${out('Slide')} ${itemIndex + 1} (${selectedType === 'video' ? out('Video') : out('Image')})`;
                };

                // Event handlers
                typeSelect.addEventListener('change', () => {
                    const newType = typeSelect.value;
                    // slideImage.innerHTML = '';
                    
                    if (newType === 'video') {
                        const oldElm = slideImage.querySelector('img');
                        const newVideo = document.createElement('video');
                        newVideo.setAttribute('autoplay', '');
                        newVideo.setAttribute('loop', '');
                        newVideo.setAttribute('muted', '');
                        newVideo.setAttribute('playsinline', '');
                        // slideImage.appendChild(newVideo);
                        oldElm.outerHTML = newVideo.outerHTML;
                        updateVideoSources();
                        previewImg.src = 'https://placehold.co/200x120?text=Video';
                        thumb.src = 'https://placehold.co/40x40?text=Video';
                    } else {
                        const oldElm = slideImage.querySelector('video');
                        const newImg = document.createElement('img');
                        newImg.src = 'https://placehold.co/600x400?text=New+Slide'; // mediaInput.value || 'https://placehold.co/600x400?text=New+Slide';
                        newImg.alt = altInput.value || '';
                        // slideImage.appendChild(newImg);
                        oldElm.outerHTML = newImg.outerHTML;
                        previewImg.src = newImg.src;
                        thumb.src = newImg.src;
                    }
                    
                    // Preserve caption if it exists
                    const caption = item.querySelector('.slide-caption');
                    if (caption) {
                        slideImage.appendChild(caption);
                    }
                    
                    updateMediaType();
                    onChange?.();
                });

                mediaInput.addEventListener('input', () => {
                    const detectedType = detectMediaType(mediaInput.value);
                    if (detectedType && typeSelect.value !== detectedType) {
                        typeSelect.value = detectedType;
                        typeSelect.dispatchEvent(new Event('change'));
                        return;
                    }
                    
                    if (typeSelect.value === 'video') {
                        updateVideoSources();
                    } else {
                        const image = slideImage.querySelector('img');
                        if (image) {
                            image.src = mediaInput.value;
                            previewImg.src = mediaInput.value;
                            thumb.src = mediaInput.value;
                        }
                    }
                    onChange?.();
                });

                largeInput.addEventListener('input', () => {
                    if (typeSelect.value === 'video') {
                        updateVideoSources();
                        onChange?.();
                    }
                });
                
                tabletInput.addEventListener('input', () => {
                    if (typeSelect.value === 'video') {
                        updateVideoSources();
                        onChange?.();
                    }
                });
                
                mobileInput.addEventListener('input', () => {
                    if (typeSelect.value === 'video') {
                        updateVideoSources();
                        onChange?.();
                    }
                });

                altInput.addEventListener('input', () => {
                    const image = slideImage.querySelector('img');
                    if (image) image.alt = altInput.value;
                    onChange?.();
                });


                // Toggle body open/closed on header click
                itemHeader.addEventListener('click', (e) => {
                    if (e.target.closest('.cbx-drag') || e.target.closest('button')) return;
                    itemBody.style.display = itemBody.style.display === 'none' ? '' : 'none';
                });

                // Build body
                itemBody.append(typeField, previewImg, mediaField, responsiveVideoContainer, altField);

                itemEditor.append(itemHeader, itemBody);

                updateMediaType();

                return itemEditor;
            };

            slides.forEach((item, i) => itemsStack.appendChild(createItemEditor(item, i)));
            container.appendChild(itemsStack);

            // Include text overlay checkbox
            const withTextLabel = document.createElement('label');
            withTextLabel.className = 'checkbox';
            const withTextChk = document.createElement('input');
            withTextChk.type = 'checkbox';
            withTextChk.className = 'chk-with-text';
            withTextLabel.append(withTextChk, document.createTextNode(' ' + out('Include text overlay')));
            container.appendChild(withTextLabel);

            // Add slide
            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Slide');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const includeText = withTextChk.checked;

                const newItem = document.createElement('div');
                newItem.className = 'swiper-slide';

                if (includeText) {
                    newItem.innerHTML = `
                        <div class="slide-image">
                            <img src="https://placehold.co/800x450?text=New+Slide" alt="New Slide">
                            <div class="slide-overlay"></div>
                            <div class="slide-caption">
                                <div class="is-subblock edit">
                                    <h3 class="slide-caption-title">New Slide</h3>
                                    <p class="slide-caption-description">Add your description here</p>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    newItem.innerHTML = `
                        <div class="slide-image">
                            <img src="https://placehold.co/800x450?text=New+Slide" alt="New Slide">
                        </div>
                    `;
                }

                wrapper.appendChild(newItem);
                itemsStack.appendChild(createItemEditor(newItem, itemsStack.children.length));
                onChange?.();
            };
            container.appendChild(addBtn);

            // Sortable
            loadSortable().then(Sortable => {
                new Sortable(itemsStack, {
                    handle: '.cbx-drag',
                    animation: 150,
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function() {
                        const itemMap = new Map();
                        Array.from(wrapper.children).forEach(item => {
                            if (item.dataset.slideId) itemMap.set(item.dataset.slideId, item);
                        });
                        Array.from(itemsStack.children).forEach(editorItem => {
                            const actualItem = itemMap.get(editorItem.dataset.itemId);
                            if (actualItem) wrapper.appendChild(actualItem);
                        });
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag optional */ });

            return container;
        }

    },

    mount: function(element, options) {
        // 1. Asset Loading Helpers
        const loadSwiperCSS = () => {
            return new Promise((resolve, reject) => {
                if (document.querySelector('link[href*="swiper-bundle.min.css"]')) {
                    resolve();
                    return;
                }
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
                link.onload = resolve;
                link.onerror = reject;
                document.head.appendChild(link);
            });
        };

        const loadSwiperJS = () => {
            return new Promise((resolve, reject) => {
                if (window.Swiper) {
                    resolve(window.Swiper);
                    return;
                }
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
                script.onload = () => resolve(window.Swiper);
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        // Helper functions for responsive video
        const getBreakpoint = () => {
            const width = window.innerWidth;
            if (width <= 760) return 'mobile';
            if (width <= 1280) return 'tablet';
            if (width < 1920) return 'desktop';
            return 'large';
        };

        const updateVideoSource = (video) => {
            const breakpoint = getBreakpoint();
            
            let selectedSrc = null;
            
            if (breakpoint === 'mobile' && video.dataset.srcMobile) {
                selectedSrc = video.dataset.srcMobile;
            } else if ((breakpoint === 'mobile' || breakpoint === 'tablet') && video.dataset.srcTablet) {
                selectedSrc = video.dataset.srcTablet;
            } else if (breakpoint === 'large' && video.dataset.srcLarge) {
                selectedSrc = video.dataset.srcLarge;
            } else if (video.dataset.srcDesktop) {
                selectedSrc = video.dataset.srcDesktop;
            }
            
            if (!selectedSrc) return;
            
            const currentSource = video.querySelector('source');
            const currentSrc = currentSource ? currentSource.src : '';
            
            if (currentSrc !== selectedSrc) {
                const wasPlaying = !video.paused;
                const currentTime = video.currentTime;
                
                video.innerHTML = '';
                const newSource = document.createElement('source');
                newSource.src = selectedSrc;
                newSource.type = 'video/mp4';
                video.appendChild(newSource);
                
                video.load();
                
                if (wasPlaying) {
                    video.currentTime = currentTime;
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => {});
                    }
                }
            }
        };

        const setupResponsiveVideos = () => {
            const slides = element.querySelectorAll('.swiper-slide');
            slides.forEach(slide => {
                const video = slide.querySelector('video');
                if (!video) return;
                
                if (!video.dataset.srcDesktop && !video.dataset.srcMobile && !video.dataset.srcTablet) {
                    const source = video.querySelector('source');
                    if (source && source.src) {
                        video.dataset.srcDesktop = source.src;
                    }
                }
                
                updateVideoSource(video);
            });
        };

        const debounce = (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        };

        const setupTextPosition = () => {
            const positions = [
                'position-top-left', 'position-top-center', 'position-top-right',
                'position-center-left', 'position-center', 'position-center-right',
                'position-bottom-left', 'position-bottom-center', 'position-bottom-right'
            ];
            const slides = element.querySelectorAll('.swiper-slide');
            slides.forEach(slide => {
                const content = slide.querySelector('.slide-caption');
                if (content && !content.classList.contains(options.textPosition)) {
                    content.classList.remove(...positions);
                    content.classList.add(options.textPosition);
                }
            });
        }

        // 2. Initialization
        const init = async () => {
            try {
                await loadSwiperCSS();
                const Swiper = await loadSwiperJS();

                const swiperContainer = element.querySelector('.swiper');
                if (!swiperContainer) return;

                // Cleanup existing instance if re-mounting
                if (element.swiperInstance) {
                    element.swiperInstance.destroy(true, true);
                }

                element.style.setProperty('--top-overlay-opacity', `${options.topOverlayOpacity}`);
                element.style.setProperty('--bottom-overlay-opacity', `${options.bottomOverlayOpacity}`);
                element.style.setProperty('--aspect-ratio', `${options.aspectRatio}`);
                element.style.setProperty('--border-radius', `${options.roundedCorners}px`);
                element.style.setProperty('--swiper-navigation-border-radius', `${options.navigationRoundedCorners}%`);
                element.style.setProperty('--zoom-scale', `${options.zoomScale / 100}`);
                element.style.setProperty('--text-max-width', `${options.textMaxWidth}px`);

                element.style.setProperty('--swiper-navigation-size', `${options.navigationButtonSize || 48 }px`);
                element.style.setProperty('--swiper-navigation-font-size', `${options.navigationArrowSize || 16}px`);
                element.style.setProperty('--swiper-navigation-sides-offset', `${options.navigationOffset || 20}px`);

                /*
                const slides = element.querySelectorAll('.swiper-slide');
                if (options.zoomEffect) {
                    element.style.setProperty('--zoom-scale', `${options.zoomScale / 100}`);
                    slides.forEach(slide => {
                        const media = slide.querySelector('img, video');
                        if (media) {
                            media.style.transition = '';
                        }
                    });
                } else {
                    element.style.setProperty('--zoom-scale', '1');
                    slides.forEach(slide => {
                        const media = slide.querySelector('img, video');
                        if (media) {
                            media.style.transition = 'none';
                        }
                    });
                }
                */
                if (options.zoomEffect) {
                    element.classList.add('zoom-effect');
                } else {
                    element.classList.remove('zoom-effect');
                }
                
                // Add pagination style class
                const paginationEl = element.querySelector('.swiper-pagination');
                if (paginationEl) {
                    paginationEl.className = 'swiper-pagination';
                    paginationEl.classList.add(`pagination-style-${options.paginationStyle || 'dots'}`);
                }

                // Add navigation style class
                const nextBtn = element.querySelector('.swiper-button-next');
                const prevBtn = element.querySelector('.swiper-button-prev');
                if (nextBtn && prevBtn) {
                    const navStyle = options.navigationStyle || 'transparent';
                    nextBtn.className = 'swiper-button-next';
                    prevBtn.className = 'swiper-button-prev';
                    nextBtn.classList.add(`nav-style-${navStyle}`);
                    prevBtn.classList.add(`nav-style-${navStyle}`);
                }

                setupTextPosition();

                // Setup responsive videos before initializing swiper
                setupResponsiveVideos();

                const config = {
                    effect: options.effect || 'slide',
                    slidesPerView: parseInt(options.slidesPerView) || 1,
                    spaceBetween: options.spaceBetween || 0,
                    loop: options.loop === true,
                    // pagination: {
                    //     el: element.querySelector('.swiper-pagination'),
                    //     clickable: true,
                    // },
                    // navigation: {
                    //     nextEl: element.querySelector('.swiper-button-next'),
                    //     prevEl: element.querySelector('.swiper-button-prev'),
                    // },
                    speed: options.transitionSpeed || 800,
                    observer: true,
                    observeParents: true,
                    // Don't start a swipe when the drag begins inside an editable caption,
                    // so you can drag-select the caption text in the editor without the
                    // slider swiping. Scoped to the editable region itself (.is-subblock
                    // while contenteditable) — NOT a broad [contenteditable], which would
                    // also match the editor's editable column ancestor and kill drag-to-
                    // slide across the whole slider (including the image). This way
                    // dragging on the image/media still swipes, and on a rendered page
                    // nothing is editable so swiping works everywhere.
                    noSwipingSelector: '.is-subblock[contenteditable="true"]',
                };

                if (options.pagination) {
                    config.pagination = {
                        el: element.querySelector('.swiper-pagination'),
                        clickable: true
                    };
                } else {
                    const p = element.querySelector('.swiper-pagination');
                    if (p) p.style.display = 'none';
                }

                if (options.navigation) {
                    config.navigation = {
                        nextEl: element.querySelector('.swiper-button-next'),
                        prevEl: element.querySelector('.swiper-button-prev')
                    };
                } else {
                    const next = element.querySelector('.swiper-button-next');
                    const prev = element.querySelector('.swiper-button-prev');
                    if (next) next.style.display = 'none';
                    if (prev) prev.style.display = 'none';
                }

                // Autoplay Logic
                if (options.autoplay) {
                    config.autoplay = {
                        delay: parseInt(options.delay) || 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: options.pauseOnHover === true,
                    };
                } else {
                    config.autoplay = false;
                }

                // Fade effect tweaks
                if (options.effect === 'fade') {
                    config.fadeEffect = { crossFade: true };
                }

                const swiper = new Swiper(swiperContainer, config);
                element.swiperInstance = swiper;

                // Handle responsive video switching
                let currentBreakpoint = getBreakpoint();
                const resizeHandler = debounce(() => {
                    const newBreakpoint = getBreakpoint();
                    if (newBreakpoint !== currentBreakpoint) {
                        currentBreakpoint = newBreakpoint;
                        const videos = element.querySelectorAll('video');
                        videos.forEach(video => updateVideoSource(video));
                    }
                }, 250);
                
                window.addEventListener('resize', resizeHandler);
                element.resizeHandler = resizeHandler;

                const overlays = element.querySelectorAll('.slide-overlay');
                overlays.forEach(elm => {
                    elm.addEventListener('click', () => {
                        const active = document.activeElement;
                        if (active instanceof HTMLElement) {
                            active.blur();
                        }
                    });
                });

            } catch (err) {
                console.error('Basic Slider: Failed to load Swiper', err);
            }
        };

        init();

        // 3. Return Instance Data (Cleanup)
        return {
            unmount: () => {
                if (element.swiperInstance) {
                    element.swiperInstance.destroy(true, true);
                }
                if (element.resizeHandler) {
                    window.removeEventListener('resize', element.resizeHandler);
                }
            }
        };
    }
};