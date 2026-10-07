/*
Usage (in ContentBox):

<div class="is-section is-box is-light-text is-section-100 type-poppins">

    <div class="is-overlay">
        <div class="is-overlay-content" style="z-index: 1;">

            <div data-cb-type="fullscreen-slider" style="--transition-speed: 2200ms; --zoom-scale: 1.06; --overlay-opacity: 0.25;" data-cb-autoplay-duration="5000" data-cb-transition-speed="2200" data-cb-enable-keyboard="true" data-cb-pause-on-hover="false" data-cb-show-counter="true" data-cb-show-nav-buttons="true" data-cb-show-pagination="true" data-cb-show-keyboard-hint="true" data-cb-zoom-effect="true" data-cb-zoom-scale="106" data-cb-overlay-opacity="25">
                <div class="media-overlay"></div>
                <div class="media-slide" data-slide-id="slide-1760990477250-1">
                    <div class="media-slide-inner">
                        <img src="assets/templates-quick/images/ai-RVMvr.jpg" alt="Mountain view">
                    </div>
                </div>
                <div class="media-slide" data-slide-id="slide-1760990477251-3">
                    <div class="media-slide-inner">
                        <img src="assets/templates-quick/images/ai-Dv3Cv.jpg" alt="Technology">
                    </div>
                </div>
                <div class="media-slide" data-slide-id="slide-1760990477251-4">
                    <div class="media-slide-inner">
                        <img src="assets/templates-quick/images/ai-2ANoV.jpg" alt="People working">
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="is-container v2 leading-13 size-17 is-content-720">
        <div class="row">
            <div class="column full">
                <p class="size-14 tracking-75">Branding &amp; Digital Marketing</p>
            </div>
        </div>
        <div class="row">
            <div class="column full">
                <h1 class="leading-none text-left font-semibold size-54">We've put together a special combination of design, strategy, and digital expertise.</h1>
            </div>
        </div>
        <div class="row">
            <div class="column full">
                <div class="spacer height-20"></div>
            </div>
        </div>
        <div class="row">
            <div class="column" style="width: 70%; flex: 0 0 auto;">
                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type.</p>
            </div>
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row">
            <div class="column full">
                <p><a href="#" title="" class="no-underline font-semibold">Start a Project</a>&nbsp;<i class="icon ion-android-arrow-forward"></i></p>
            </div>
        </div>
    </div>
</div>
*/

export default {
    name: 'fullscreen-slider',
    displayName: 'Media Slider',
    version: '1.1.0',

    contentbox: {
        bg: false,
        text: false,
        title: false
    },
    
    settings: {
        _groups: [
            {
                id: 'general',
                label: 'General Settings',
                fields: ['textPosition', 'autoplayDuration', 'transitionSpeed', 'enableKeyboard', 'pauseOnHover']
            },
            {
                id: 'controls',
                label: 'Controls',
                fields: ['showCounter', 'showNavButtons', 'showPagination', 'showKeyboardHint']
            },
            {
                id: 'animation',
                label: 'Animation',
                fields: ['zoomEffect', 'zoomScale', 'overlayOpacity']
            }
        ],
        textPosition: {
            type: 'select',
            label: 'Text Position',
            default: 'position-center',
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
            group: 'general'
        },
        autoplayDuration: {
            type: 'number',
            label: 'Autoplay Duration',
            default: 6000,
            min: 2000,
            max: 15000,
            step: 500,
            unit: 'ms',
            group: 'general'
        },
        transitionSpeed: {
            type: 'number',
            label: 'Transition Speed',
            default: 1200,
            min: 300,
            max: 3000,
            step: 100,
            unit: 'ms',
            group: 'general'
        },
        enableKeyboard: {
            type: 'boolean',
            label: 'Enable Keyboard Navigation',
            default: true,
            group: 'general'
        },
        pauseOnHover: {
            type: 'boolean',
            label: 'Pause on Hover',
            default: true,
            group: 'general'
        },
        showCounter: {
            type: 'boolean',
            label: 'Show Slide Counter',
            default: true,
            group: 'controls'
        },
        showNavButtons: {
            type: 'boolean',
            label: 'Show Navigation Buttons',
            default: true,
            group: 'controls'
        },
        showPagination: {
            type: 'boolean',
            label: 'Show Pagination Dots',
            default: true,
            group: 'controls'
        },
        showKeyboardHint: {
            type: 'boolean',
            label: 'Show Keyboard Hint',
            default: true,
            group: 'controls'
        },
        zoomEffect: {
            type: 'boolean',
            label: 'Enable Zoom Effect',
            default: true,
            group: 'animation'
        },
        zoomScale: {
            type: 'range',
            label: 'Zoom Scale',
            default: 108,
            min: 100,
            max: 120,
            step: 1,
            unit: '%',
            group: 'animation'
        },
        overlayOpacity: {
            type: 'range',
            label: 'Overlay Opacity',
            default: 30,
            min: 0,
            max: 70,
            step: 5,
            unit: '%',
            group: 'animation'
        }
    },
    
    editor: {
        openContentEditor: function(element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            const stack = document.createElement('div');
            stack.className = 'cbx-stack';
            container.appendChild(stack);

            const slides = element.querySelectorAll('.media-slide');

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
            const browseRow = (input, type, onPick) => {
                input.classList.add('cbx-grow');
                const row = document.createElement('div');
                row.className = 'cbx-row';
                row.append(input, ...builder.createFileButtons(type, onPick));
                return row;
            };

            const createSlideEditor = (slide, index) => {
                slide.dataset.slideId = slide.dataset.slideId || `slide-${Date.now()}-${index}`;

                const section = document.createElement('div');
                section.className = 'cbx-item';
                section.dataset.slideId = slide.dataset.slideId;

                const mediaInner = slide.querySelector('.media-slide-inner');
                const img = mediaInner.querySelector('img');
                const video = mediaInner.querySelector('video');
                const isVideo = !!video;

                // Head
                const head = document.createElement('div');
                head.className = 'cbx-item-head';

                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                drag.setAttribute('aria-label', out('Drag to reorder'));

                const thumb = document.createElement('img');
                thumb.className = 'cbx-thumb';
                thumb.alt = '';
                thumb.src = isVideo ? 'https://placehold.co/40x40?text=Video' : (img?.src || 'https://placehold.co/40x40?text=No+Img');

                const headerTitle = document.createElement('span');
                headerTitle.className = 'cbx-title';
                headerTitle.textContent = `${out('Slide')} ${index + 1} (${isVideo ? out('Video') : out('Image')})`;

                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className = 'cbx-iconbtn is-danger';
                deleteBtn.setAttribute('aria-label', out('Delete slide'));
                deleteBtn.innerHTML = '<svg aria-hidden="true"><use xlink:href="#icon-trash2"></use></svg>';
                deleteBtn.onclick = (e) => { e.preventDefault(); slide.remove(); section.remove(); onChange(); };

                head.append(drag, thumb, headerTitle, deleteBtn);

                // Body
                const body = document.createElement('div');
                body.className = 'cbx-item-body';
                body.style.display = 'none';

                // Media Type
                const typeSelect = document.createElement('select');
                typeSelect.innerHTML = `
                    <option value="image" ${!isVideo ? 'selected' : ''}>${out('Image')}</option>
                    <option value="video" ${isVideo ? 'selected' : ''}>${out('Video')}</option>
                `;

                // Preview
                const previewImg = document.createElement('img');
                previewImg.className = 'cbx-preview';
                previewImg.alt = '';
                previewImg.src = isVideo ? 'https://placehold.co/200x120?text=Video' : (img?.src || 'https://placehold.co/200x120?text=No+Img');

                // Existing video sources
                const getVideoSources = () => {
                    if (!video) return { large: '', desktop: '', tablet: '', mobile: '' };
                    return {
                        large: video.dataset.srcLarge || '',
                        desktop: video.dataset.srcDesktop || video.querySelector('source')?.src || '',
                        tablet: video.dataset.srcTablet || '',
                        mobile: video.dataset.srcMobile || ''
                    };
                };
                const videoSources = getVideoSources();

                // Media URL (image or desktop video)
                const urlInput = document.createElement('input');
                urlInput.type = 'text';
                urlInput.placeholder = isVideo ? out('Video URL (Desktop)') : out('Image URL');
                urlInput.value = isVideo ? videoSources.desktop : (img?.getAttribute('src') || '');
                const urlRow = browseRow(urlInput, () => (typeSelect.value === 'video' ? 'video' : 'image'), (url) => {
                    urlInput.value = url;
                    const detectedType = detectMediaType(url);
                    if (detectedType && typeSelect.value !== detectedType) {
                        typeSelect.value = detectedType;
                        typeSelect.dispatchEvent(new Event('change'));
                        return;
                    }
                    if (typeSelect.value === 'video') {
                        updateVideoSources();
                    } else {
                        const image = mediaInner.querySelector('img');
                        if (image) {
                            image.src = url;
                            previewImg.src = url;
                            thumb.src = url;
                        }
                    }
                    onChange();
                });

                // Responsive video URLs
                const largeInput = document.createElement('input');
                largeInput.type = 'text';
                largeInput.placeholder = out('Optional: 4K video URL for large displays');
                largeInput.value = videoSources.large;
                const largeRow = browseRow(largeInput, 'video', (url) => {
                    largeInput.value = url;
                    updateVideoSources();
                    onChange();
                });

                const tabletInput = document.createElement('input');
                tabletInput.type = 'text';
                tabletInput.placeholder = out('Optional: Tablet video URL');
                tabletInput.value = videoSources.tablet;
                const tabletRow = browseRow(tabletInput, 'video', (url) => {
                    tabletInput.value = url;
                    updateVideoSources();
                    onChange();
                });

                const mobileInput = document.createElement('input');
                mobileInput.type = 'text';
                mobileInput.placeholder = out('Optional: Mobile video URL');
                mobileInput.value = videoSources.mobile;
                const mobileRow = browseRow(mobileInput, 'video', (url) => {
                    mobileInput.value = url;
                    updateVideoSources();
                    onChange();
                });

                const responsiveHint = document.createElement('small');
                responsiveHint.className = 'cbx-hint';
                responsiveHint.textContent = out('Tip: upload progressively larger videos for better quality on bigger screens.');

                const responsiveVideoContainer = document.createElement('div');
                responsiveVideoContainer.className = 'cbx-stack';
                responsiveVideoContainer.style.display = isVideo ? '' : 'none';
                responsiveVideoContainer.append(
                    makeField(out('Video URL (4K / large — above 1920px)'), largeRow),
                    makeField(out('Video URL (tablet — max 1280px)'), tabletRow),
                    makeField(out('Video URL (mobile — max 970px)'), mobileRow),
                    responsiveHint
                );

                // Alt text (images)
                const altInput = document.createElement('input');
                altInput.type = 'text';
                altInput.placeholder = out('Describe the image for screen readers');
                altInput.value = img?.alt || '';
                const altField = makeField(out('Alt Text (Accessibility)'), altInput);

                // Toggle field visibility by media type
                const updateMediaType = () => {
                    const selectedType = typeSelect.value;
                    urlInput.placeholder = selectedType === 'video' ? out('Video URL (Desktop)') : out('Image URL');
                    altField.style.display = selectedType === 'image' ? '' : 'none';
                    responsiveVideoContainer.style.display = selectedType === 'video' ? '' : 'none';
                    headerTitle.textContent = `${out('Slide')} ${index + 1} (${selectedType === 'video' ? out('Video') : out('Image')})`;
                };

                // Store video sources as data attributes
                const updateVideoSources = () => {
                    const vid = mediaInner.querySelector('video');
                    if (!vid) return;
                    const largeSrc = largeInput.value.trim();
                    const desktopSrc = urlInput.value.trim();
                    const tabletSrc = tabletInput.value.trim();
                    const mobileSrc = mobileInput.value.trim();
                    if (largeSrc) vid.dataset.srcLarge = largeSrc; else delete vid.dataset.srcLarge;
                    if (desktopSrc) vid.dataset.srcDesktop = desktopSrc; else delete vid.dataset.srcDesktop;
                    if (tabletSrc) vid.dataset.srcTablet = tabletSrc; else delete vid.dataset.srcTablet;
                    if (mobileSrc) vid.dataset.srcMobile = mobileSrc; else delete vid.dataset.srcMobile;
                    vid.innerHTML = '';
                    const source = document.createElement('source');
                    source.src = desktopSrc;
                    source.type = 'video/mp4';
                    vid.appendChild(source);
                    vid.load();
                };

                typeSelect.addEventListener('change', () => {
                    const newType = typeSelect.value;
                    mediaInner.innerHTML = '';
                    if (newType === 'video') {
                        const newVideo = document.createElement('video');
                        newVideo.setAttribute('autoplay', '');
                        newVideo.setAttribute('loop', '');
                        newVideo.setAttribute('muted', '');
                        newVideo.setAttribute('playsinline', '');
                        mediaInner.appendChild(newVideo);
                        updateVideoSources();
                        previewImg.src = 'https://placehold.co/200x120?text=Video';
                    } else {
                        const newImg = document.createElement('img');
                        newImg.src = 'https://placehold.co/600x400?text=New+Slide';
                        newImg.alt = altInput.value || '';
                        mediaInner.appendChild(newImg);
                        previewImg.src = newImg.src;
                    }
                    updateMediaType();
                    onChange();
                });

                const detectMediaType = (url) => {
                    const videoExtensions = /\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i;
                    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i;
                    if (videoExtensions.test(url)) return 'video';
                    if (imageExtensions.test(url)) return 'image';
                    return null;
                };

                urlInput.addEventListener('input', () => {
                    const detectedType = detectMediaType(urlInput.value);
                    if (detectedType && typeSelect.value !== detectedType) {
                        typeSelect.value = detectedType;
                        typeSelect.dispatchEvent(new Event('change'));
                        return;
                    }
                    if (typeSelect.value === 'video') {
                        updateVideoSources();
                    } else {
                        const image = mediaInner.querySelector('img');
                        if (image) {
                            image.src = urlInput.value;
                            previewImg.src = urlInput.value;
                            thumb.src = urlInput.value;
                        }
                    }
                    onChange();
                });

                largeInput.addEventListener('input', () => {
                    if (typeSelect.value === 'video') { updateVideoSources(); onChange(); }
                });
                tabletInput.addEventListener('input', () => {
                    if (typeSelect.value === 'video') { updateVideoSources(); onChange(); }
                });
                mobileInput.addEventListener('input', () => {
                    if (typeSelect.value === 'video') { updateVideoSources(); onChange(); }
                });
                altInput.addEventListener('input', () => {
                    const image = mediaInner.querySelector('img');
                    if (image) image.alt = altInput.value;
                    onChange();
                });


                updateMediaType();

                body.append(
                    makeField(out('Media Type'), typeSelect),
                    previewImg,
                    makeField(out('Media URL'), urlRow),
                    responsiveVideoContainer,
                    altField
                );

                head.addEventListener('click', (e) => {
                    if (e.target.closest('.cbx-drag') || e.target.closest('button')) return;
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                section.append(head, body);
                return section;
            };

            slides.forEach((slide, i) => stack.appendChild(createSlideEditor(slide, i)));

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function() {
                        const slideMap = new Map();
                        element.querySelectorAll('.media-slide').forEach(slide => {
                            if (slide.dataset.slideId) slideMap.set(slide.dataset.slideId, slide);
                        });
                        Array.from(stack.children).forEach(editorSlide => {
                            const actualSlide = slideMap.get(editorSlide.dataset.slideId);
                            if (actualSlide && actualSlide.parentElement === element) element.appendChild(actualSlide);
                        });
                        onChange();
                    }
                });
            }).catch(() => { /* drag optional */ });

            // Include text overlay checkbox
            const withTextCheckbox = document.createElement('label');
            withTextCheckbox.className = 'checkbox';
            withTextCheckbox.innerHTML = `<input type="checkbox" class="chk-with-text"> ${out('Include text overlay')}`;
            container.appendChild(withTextCheckbox);

            // Add Slide button
            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Slide');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const includeText = withTextCheckbox.querySelector('.chk-with-text')?.checked || false;
                const newSlide = document.createElement('div');
                newSlide.className = 'media-slide' + (element.querySelectorAll('.media-slide').length === 0 ? ' active' : '');
                newSlide.dataset.slideId = `slide-${Date.now()}`;
                if (includeText) {
                    newSlide.innerHTML = `
                        <div class="media-slide-inner">
                            <img src="https://placehold.co/600x400/c9cacd/c9cacd/png" alt="">
                        </div>
                        <div class="item-content position-center is-container">
                            <div class="is-subblock edit">
                                <p class="uppercase tracking-225 size-12">New Collection</p>
                                <h2>Discover Timeless Elegance</h2>
                                <p>Experience minimalist design and exceptional craftsmanship.</p>
                            </div>
                        </div>
                    `;
                } else {
                    newSlide.innerHTML = `
                        <div class="media-slide-inner">
                            <img src="https://placehold.co/1920x1080?text=New+Slide" alt="">
                        </div>
                    `;
                }
                element.appendChild(newSlide);
                stack.appendChild(createSlideEditor(newSlide, stack.children.length));
                onChange();
            };
            container.appendChild(addBtn);

            return container;
        }
    },

        mount: function(element, options) {
        const slider = new FullscreenMediaSlider(element, options);
        return slider;
    },
    
    unmount: function(element, instance) {
        if (instance && instance.destroy) {
            instance.destroy();
        }
    }
};

class FullscreenMediaSlider {
    constructor(element, options) {
        this.element = element;
        this.options = options;
        this.slides = element.querySelectorAll('.media-slide');
        this.currentSlide = 0;
        this.isAnimating = false;
        this.autoplayInterval = null;
        this.isAutoplayPaused = false;
        this.currentBreakpoint = this.getBreakpoint();
        this.hoverPauseActive = false;
        this.editModePaused = false;
        this.wasAutoplayingBeforeEdit = false;
        this.init();
    }
    
    init() {
        // Don't add active class immediately - let it be added after setup
        const needsActiveClass = this.slides.length > 0 && !this.element.querySelector('.media-slide.active');
        
        this.setupResponsiveVideos();
        this.setupTextPosition();
        this.createControls();
        this.createScreenReaderAnnouncer();
        this.attachEvents();
        this.setupTouchSupport();
        
        if (this.options.pauseOnHover) {
            this.setupHoverPause();
        }

        // Always setup edit mode pause for page builder
        this.setupEditModePause();

        this.applyZoomEffect();
        
        // Add active class after everything is set up to trigger animation
        // if (needsActiveClass) {
        //     setTimeout(() => {
        //         this.slides[0].classList.add('active');
        //     }, 50);
        // }
        if (needsActiveClass) {
            setTimeout(() => {
                // Add active class immediately without transition for first load
                this.slides[0].style.transition = 'none';
                this.slides[0].classList.add('active');
                
                // Re-enable transitions after initial display
                setTimeout(() => {
                    this.slides[0].style.transition = '';
                }, 50);
                            
            }, 50);
        }

        this.startAutoplay();
    }
    
    getBreakpoint() {
        const width = window.innerWidth;
        if (width <= 760) return 'mobile';
        if (width <= 1280) return 'tablet';
        if (width < 1920) return 'desktop';
        return 'large';
    }

    setupTextPosition() {
        const positions = [
            'position-top-left', 'position-top-center', 'position-top-right',
            'position-center-left', 'position-center', 'position-center-right',
            'position-bottom-left', 'position-bottom-center', 'position-bottom-right'
        ];
        this.slides.forEach(slide => {
            const content = slide.querySelector('.item-content');
            if (content && !content.classList.contains(this.options.textPosition)) {
                content.classList.remove(...positions);
                content.classList.add(this.options.textPosition);
            }
        });
    }
    
    setupResponsiveVideos() {
        // Process all video slides and set up responsive switching
        this.slides.forEach(slide => {
            const video = slide.querySelector('video');
            if (!video) return;
            
            // Check if video has responsive sources stored
            if (!video.dataset.srcDesktop && !video.dataset.srcMobile && !video.dataset.srcTablet) {
                // Legacy video with single source - store it as desktop
                const source = video.querySelector('source');
                if (source && source.src) {
                    video.dataset.srcDesktop = source.src;
                }
            }
            
            // Set initial video source based on current breakpoint
            this.updateVideoSource(video);
        });
        
        // Listen for window resize
        this.resizeHandler = this.debounce(() => {
            const newBreakpoint = this.getBreakpoint();
            if (newBreakpoint !== this.currentBreakpoint) {
                this.currentBreakpoint = newBreakpoint;
                this.updateAllVideoSources();
            }
        }, 250);
        
        window.addEventListener('resize', this.resizeHandler);
    }
    
    updateVideoSource(video) {
        const breakpoint = this.getBreakpoint();
        
        // Determine which source to use
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
        
        // Check current source
        const currentSource = video.querySelector('source');
        const currentSrc = currentSource ? currentSource.src : '';
        
        // Only update if source changed
        if (currentSrc !== selectedSrc) {
            const wasPlaying = !video.paused;
            const currentTime = video.currentTime;
            
            // Update source
            video.innerHTML = '';
            const newSource = document.createElement('source');
            newSource.src = selectedSrc;
            newSource.type = 'video/mp4';
            video.appendChild(newSource);
            
            // Reload video
            video.load();
            
            // Try to restore playback state
            if (wasPlaying) {
                video.currentTime = currentTime;
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // Autoplay prevented, that's ok
                    });
                }
            }
        }
    }
    
    updateAllVideoSources() {
        this.slides.forEach(slide => {
            const video = slide.querySelector('video');
            if (video) {
                this.updateVideoSource(video);
            }
        });
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // applyZoomEffect() {
    //     if (!this.options.zoomEffect) {
    //         this.element.style.setProperty('--zoom-scale', '1');
    //         this.slides.forEach(slide => {
    //             const media = slide.querySelector('img, video');
    //             if (media) {
    //                 media.style.transition = 'none';
    //             }
    //         });
    //     }
    // }
    applyZoomEffect() {
        if (!this.options.zoomEffect) {
            this.element.style.setProperty('--zoom-scale', '1');
            this.slides.forEach(slide => {
                const media = slide.querySelector('img, video');
                if (media) {
                    media.style.transition = 'none';
                }
            });
        }
    }

    createControls() {
        if (this.options.showCounter) {
            const counter = document.createElement('div');
            counter.className = 'slide-counter';
            counter.innerHTML = `<span class="current">01</span> / <span class="total">${String(this.slides.length).padStart(2, '0')}</span>`;
            this.element.appendChild(counter);
            this.currentCounter = counter.querySelector('.current');
        }
        
        if (this.options.showKeyboardHint && this.options.enableKeyboard) {
            const hint = document.createElement('div');
            hint.className = 'keyboard-hint';
            hint.textContent = 'USE ARROW KEYS TO NAVIGATE';
            this.element.appendChild(hint);
        }
        
        if (this.options.showNavButtons) {
            const controls = document.createElement('div');
            controls.className = 'slider-controls';
            controls.innerHTML = `
                <button class="control-btn prev-btn" aria-label="Previous slide">‹</button>
                <button class="control-btn next-btn" aria-label="Next slide">›</button>
            `;
            this.element.appendChild(controls);
            this.prevBtn = controls.querySelector('.prev-btn');
            this.nextBtn = controls.querySelector('.next-btn');
        }

        if (!this.options.pauseOnHover) {
            const playPauseBtn = document.createElement('button');
            playPauseBtn.className = 'play-pause-btn';
            playPauseBtn.setAttribute('aria-label', 'Play/Pause');
            playPauseBtn.innerHTML = '❚❚';
            this.element.appendChild(playPauseBtn);
            this.playPauseBtn = playPauseBtn;
        }

        if (this.options.showPagination) {
            const pagination = document.createElement('div');
            pagination.className = 'slider-pagination';
            for (let i = 0; i < this.slides.length; i++) {
                const dot = document.createElement('button');
                dot.className = 'pagination-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.setAttribute('type', 'button');
                pagination.appendChild(dot);
            }
            this.element.appendChild(pagination);
            this.dots = pagination.querySelectorAll('.pagination-dot');
        }
        
        this.element.style.setProperty('--transition-speed', `${this.options.transitionSpeed}ms`);
        this.element.style.setProperty('--zoom-scale', `${this.options.zoomScale / 100}`);
        this.element.style.setProperty('--overlay-opacity', `${this.options.overlayOpacity / 100}`);
    }
        
    createScreenReaderAnnouncer() {
        const announcer = document.createElement('div');
        announcer.className = 'sr-only';
        announcer.setAttribute('role', 'status');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
        this.element.appendChild(announcer);
        this.announcer = announcer;
    }

    announceSlideChange() {
        if (this.announcer) {
            this.announcer.textContent = `Slide ${this.currentSlide + 1} of ${this.slides.length}`;
        }
    }

    attachEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        if (this.playPauseBtn) {
            this.playPauseBtn.addEventListener('click', () => this.toggleAutoplay());
        }
        
        if (this.dots) {
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });
        }
        
        if (this.options.enableKeyboard) {
            this.keyboardHandler = (e) => {
                // Ignore if the active element is an input, textarea, or contenteditable
                const activeEl = document.activeElement;
                if (
                    activeEl?.matches?.('input, textarea, [contenteditable="true"], [contenteditable=""]') ||
                    activeEl?.closest?.('.edit') // add known editor containers if needed
                ) {
                    return;
                }

                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
                if (e.key === ' ') {
                    e.preventDefault();
                    this.toggleAutoplay();
                }
            };
            document.addEventListener('keydown', this.keyboardHandler);
        }
    }
    
    setupHoverPause() {
        this.hoverPauseActive = false;
        
        this.mouseEnterHandler = () => {
            if (!this.isAutoplayPaused && this.autoplayInterval) {
                this.stopAutoplay();
                this.hoverPauseActive = true;
            }
        };
        
        this.mouseLeaveHandler = () => {
            if (this.hoverPauseActive) {
                this.startAutoplay();
                this.hoverPauseActive = false;
            }
        };
        
        this.element.addEventListener('mouseenter', this.mouseEnterHandler);
        this.element.addEventListener('mouseleave', this.mouseLeaveHandler);

        // Check if element is currently being hovered using :hover pseudo-class
        setTimeout(() => {
            if (this.element.matches(':hover')) {
                this.stopAutoplay();
                this.hoverPauseActive = true;
            }
        }, 100);
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        
        this.isAnimating = true;
        
        const currentVideo = this.slides[this.currentSlide].querySelector('video');
        if (currentVideo) currentVideo.pause();
        
        this.slides[this.currentSlide].classList.remove('active');
        if (this.dots) this.dots[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        this.slides[this.currentSlide].classList.add('active');
        if (this.dots) this.dots[this.currentSlide].classList.add('active');
        
        if (this.currentCounter) {
            this.currentCounter.textContent = String(this.currentSlide + 1).padStart(2, '0');
        }

        this.announceSlideChange();
        
        const newVideo = this.slides[this.currentSlide].querySelector('video');
        if (newVideo) {
            newVideo.currentTime = 0;  // to restart from beginning
            newVideo.play();
        }
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 400);
        
        // this.resetAutoplay();
        if (!this.hoverPauseActive) {
            this.resetAutoplay();
        }
    }
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
        if (!this.hoverPauseActive) {
            this.resetAutoplay();
        }
    }
    
    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
        if (!this.hoverPauseActive) {
            this.resetAutoplay();
        }
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.options.autoplayDuration);
        if (this.playPauseBtn) this.playPauseBtn.innerHTML = '❚❚';
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
        if (this.playPauseBtn) this.playPauseBtn.innerHTML = '▶';
    }
    
    resetAutoplay() {
        if (!this.isAutoplayPaused && !this.manuallyPaused) {
            this.stopAutoplay();
            this.startAutoplay();
        }
    }
    
    toggleAutoplay() {
        if (this.autoplayInterval) {
            this.stopAutoplay();
            this.isAutoplayPaused = true;
            this.manuallyPaused = true;
        } else {
            this.startAutoplay();
            this.isAutoplayPaused = false;
            this.manuallyPaused = false;
        }
    }

    setupTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        
        this.touchStartHandler = (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        };
        
        this.touchEndHandler = (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            }
        };
        
        this.element.addEventListener('touchstart', this.touchStartHandler, { passive: true });
        this.element.addEventListener('touchend', this.touchEndHandler, { passive: true });
    }

    setupEditModePause() {
        const editableElements = this.element.querySelectorAll('.edit');
        if (editableElements.length === 0) return;
        editableElements.forEach(editEl => {
            editEl.addEventListener('focus', () => {
                if (this.autoplayInterval) {
                    this.stopAutoplay();
                }
            }, true);
        });
    }

    destroy() {
        this.stopAutoplay();
        if (this.keyboardHandler) {
            document.removeEventListener('keydown', this.keyboardHandler);
        }
        if (this.mouseEnterHandler) {
            this.element.removeEventListener('mouseenter', this.mouseEnterHandler);
            this.element.removeEventListener('mouseleave', this.mouseLeaveHandler);
        }
        if (this.touchStartHandler) {
            this.element.removeEventListener('touchstart', this.touchStartHandler);
            this.element.removeEventListener('touchend', this.touchEndHandler);
        }
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
        }
        if (this.editModeObserver) {
            this.editModeObserver.disconnect();
        }
    }
}