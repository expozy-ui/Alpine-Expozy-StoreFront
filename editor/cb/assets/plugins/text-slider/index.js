/*
Usage:
<div data-cb-type="text-slider" data-cb-autoplay="true" data-cb-delay="4000" data-cb-transition-speed="600" data-cb-loop="true" data-cb-pause-on-hover="true" data-cb-effect="slide" data-cb-slides-per-view="1" data-cb-space-between="24" data-cb-text-align="center" data-cb-navigation="true" data-cb-pagination="true" data-cb-background="transparent" data-cb-rounded="12">
    <div class="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="text-slide">
                    <div class="is-subblock edit">
                        <h3 class="text-slide-title">Start with a spark</h3>
                        <p class="text-slide-text">Every big idea begins small. Give yours the room to take shape.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-pagination"></div>
    </div>
</div>
*/

export default {
    name: 'text-slider',
    displayName: 'Text Slider',
    version: '1.0.0',

    settings: {
        _groups: [
            {
                id: 'behavior',
                label: 'Behavior',
                fields: ['autoplay', 'delay', 'transitionSpeed', 'loop', 'pauseOnHover', 'effect']
            },
            {
                id: 'layout',
                label: 'Layout',
                fields: ['slidesPerView', 'spaceBetween', 'textAlign', 'navigation', 'pagination', 'accentColor']
            },
            {
                id: 'appearance',
                label: 'Appearance',
                fields: ['background', 'bgColor', 'border', 'borderColor', 'rounded']
            }
        ],

        // ── Behavior ──────────────────────────────────────────────────────────
        autoplay: {
            type: 'boolean',
            label: 'Enable Autoplay',
            default: true,
            group: 'behavior'
        },
        delay: {
            type: 'number',
            label: 'Autoplay Delay',
            default: 4000,
            min: 500,
            step: 500,
            unit: 'ms',
            group: 'behavior'
        },
        transitionSpeed: {
            type: 'number',
            label: 'Transition Speed',
            default: 600,
            min: 200,
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
                { value: 'fade', label: 'Fade' }
            ],
            group: 'behavior'
        },

        // ── Layout ────────────────────────────────────────────────────────────
        slidesPerView: {
            type: 'select',
            label: 'Items Per View',
            default: '1',
            options: [
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
                { value: '5', label: '5' }
            ],
            group: 'layout'
        },
        spaceBetween: {
            type: 'number',
            label: 'Gap',
            default: 24,
            min: 0,
            max: 100,
            step: 1,
            unit: 'px',
            group: 'layout'
        },
        textAlign: {
            type: 'select',
            label: 'Text Align',
            default: 'center',
            options: [
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'right', label: 'Right' }
            ],
            group: 'layout'
        },
        navigation: {
            type: 'boolean',
            label: 'Show Navigation',
            default: true,
            group: 'layout'
        },
        pagination: {
            type: 'boolean',
            label: 'Show Pagination',
            default: true,
            group: 'layout'
        },
        accentColor: {
            type: 'color',
            label: 'Accent Color',
            default: '#1a1a1a',
            group: 'layout'
        },

        // ── Appearance ────────────────────────────────────────────────────────
        // Background (fill) and Border are independent, so switching Background to
        // Transparent keeps the border. Turn Border off for plain rotating text.
        background: {
            type: 'select',
            label: 'Background',
            default: 'transparent',
            options: [
                { value: 'transparent', label: 'Transparent' },
                { value: 'solid', label: 'Solid' },
                { value: 'glass', label: 'Glass (blur)' }
            ],
            group: 'appearance'
        },
        bgColor: {
            type: 'color',
            label: 'Background Color',
            default: '#ffffff',
            group: 'appearance'
        },
        border: {
            type: 'boolean',
            label: 'Show Border',
            default: true,
            group: 'appearance'
        },
        borderColor: {
            type: 'color',
            label: 'Border Color',
            default: '#e5e7eb',
            group: 'appearance'
        },
        rounded: {
            type: 'range',
            label: 'Rounded Corners',
            default: 12,
            min: 0,
            max: 40,
            step: 1,
            unit: 'px',
            group: 'appearance'
        }
    },

    editor: {
        // Slides are managed here (add / delete / reorder). The text itself is
        // edited inline in the block via each slide's `.is-subblock edit` region.
        openContentEditor: function(element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

            // Lazy-load SortableJS (drag-reorder is optional — the editor works without it)
            const loadSortable = (() => {
                let p = null;
                return () => {
                    if (window.Sortable) return Promise.resolve(window.Sortable);
                    if (p) return p;
                    p = new Promise((resolve, reject) => {
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
                        script.onerror = () => { p = null; reject(new Error('Failed to load SortableJS')); };
                        document.head.appendChild(script);
                    });
                    return p;
                };
            })();

            const wrapper = element.querySelector('.swiper-wrapper');

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            const itemsStack = document.createElement('div');
            itemsStack.className = 'cbx-stack';
            container.appendChild(itemsStack);

            const renumber = () => {
                Array.from(itemsStack.children).forEach((row, i) => {
                    const t = row.querySelector('.cbx-title');
                    if (t) t.textContent = `${out('Slide')} ${i + 1}`;
                });
            };

            const createRow = (slide, index) => {
                const row = document.createElement('div');
                row.className = 'cbx-item';

                const id = slide.dataset.slideId || `ts-${Date.now()}-${index}`;
                slide.dataset.slideId = id;
                row.dataset.itemId = id;

                const head = document.createElement('div');
                head.className = 'cbx-item-head';

                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                drag.setAttribute('aria-label', out('Drag to reorder'));

                const title = document.createElement('span');
                title.className = 'cbx-title';
                title.textContent = `${out('Slide')} ${index + 1}`;

                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'cbx-iconbtn is-danger';
                del.setAttribute('aria-label', out('Delete slide'));
                del.innerHTML = '<svg aria-hidden="true"><use xlink:href="#icon-trash2"></use></svg>';
                del.onclick = (e) => {
                    e.preventDefault();
                    if (wrapper.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length <= 1) return; // keep at least one
                    slide.remove();
                    row.remove();
                    renumber();
                    onChange?.();
                };

                head.append(drag, title, del);
                row.appendChild(head);
                return row;
            };

            // Only the real slides (skip Swiper's loop clones)
            const slides = Array.from(wrapper.querySelectorAll('.swiper-slide'))
                .filter(s => !s.classList.contains('swiper-slide-duplicate'));
            slides.forEach((slide, i) => itemsStack.appendChild(createRow(slide, i)));

            // Add slide
            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Slide');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML =
                    '<div class="text-slide">' +
                        '<div class="is-subblock edit">' +
                            `<h3 class="text-slide-title">${out('Slide title')}</h3>` +
                            `<p class="text-slide-text">${out('Editable text goes here.')}</p>` +
                        '</div>' +
                    '</div>';
                wrapper.appendChild(slide);
                itemsStack.appendChild(createRow(slide, itemsStack.children.length));
                onChange?.();
            };
            container.appendChild(addBtn);

            // Drag-reorder → mirror order back onto the real slides
            loadSortable().then(Sortable => {
                new Sortable(itemsStack, {
                    handle: '.cbx-drag',
                    animation: 150,
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function() {
                        const map = new Map();
                        Array.from(wrapper.children).forEach(s => {
                            if (s.dataset.slideId) map.set(s.dataset.slideId, s);
                        });
                        Array.from(itemsStack.children).forEach(rowEl => {
                            const real = map.get(rowEl.dataset.itemId);
                            if (real) wrapper.appendChild(real);
                        });
                        renumber();
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag optional */ });

            return container;
        }
    },

    mount: function(element, options) {
        // ── Swiper asset loading (cached; shared with the swiper-slider plugin) ──
        const loadSwiperCSS = () => new Promise((resolve, reject) => {
            if (document.querySelector('link[href*="swiper-bundle.min.css"]')) { resolve(); return; }
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
        const loadSwiperJS = () => new Promise((resolve, reject) => {
            if (window.Swiper) { resolve(window.Swiper); return; }
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
            script.onload = () => resolve(window.Swiper);
            script.onerror = reject;
            document.head.appendChild(script);
        });

        const init = async () => {
            try {
                await loadSwiperCSS();
                const Swiper = await loadSwiperJS();

                const swiperContainer = element.querySelector('.swiper');
                if (!swiperContainer) return;

                if (element.swiperInstance) {
                    element.swiperInstance.destroy(true, true);
                }

                // Theming vars. Accent drives Swiper's own nav/pagination vars too.
                // Card bg/border fall back to '' (stylesheet default) when unset.
                element.style.setProperty('--ts-accent', options.accentColor || '#1a1a1a');
                // Accent drives the pagination (active bullet) only. The arrows stay
                // neutral — they inherit the text color (--swiper-navigation-color:
                // currentColor in style.css). Clear any stale inline nav color that
                // older embeds may carry so the stylesheet default wins.
                element.style.removeProperty('--swiper-navigation-color');
                element.style.setProperty('--swiper-pagination-color', options.accentColor || '#1a1a1a');
                element.style.setProperty('--ts-card-bg', options.bgColor || '');
                element.style.setProperty('--ts-card-border', options.borderColor || '');
                element.style.setProperty('--ts-radius', `${options.rounded != null ? +options.rounded : 12}px`);

                // In the editor, Swiper's loop CLONES the slides (.swiper-slide-duplicate)
                // to fake a seamless wrap. Those clones are runtime-only copies: editing one
                // (e.g. formatting a non-active slide in a multi-per-view row) can't be saved,
                // and the clone churn on a format mutation makes slides vanish until refresh.
                // So in the editor use rewind — it cycles back to the first slide with NO
                // clones, so every visible slide is a real, editable, saveable node. The live
                // page keeps the true seamless loop (nothing is edited there).
                const isEditor = !!(element.ownerDocument && element.ownerDocument.body &&
                    element.ownerDocument.body.classList.contains('data-editor'));

                const config = {
                    effect: options.effect || 'slide',
                    slidesPerView: parseInt(options.slidesPerView) || 1,
                    spaceBetween: options.spaceBetween != null ? +options.spaceBetween : 24,
                    loop: options.loop === true && !isEditor,
                    rewind: options.loop === true && isEditor,
                    speed: parseInt(options.transitionSpeed) || 600,
                    observer: true,
                    observeParents: true,
                    autoHeight: true,
                    // Don't start a swipe when the drag begins inside editable text, so
                    // you can drag-select in the editor without the slider swiping. Scoped
                    // to the editable region itself (.is-subblock while contenteditable) —
                    // NOT a broad [contenteditable] which would also match the editor's
                    // editable column ancestor and kill drag-to-slide across the whole
                    // block. This way dragging elsewhere (card padding, or a media area in
                    // slider plugins) still swipes, and on a rendered page nothing is
                    // editable so swiping works everywhere.
                    noSwipingSelector: '.is-subblock[contenteditable="true"]'
                };

                if (options.effect === 'fade') {
                    config.fadeEffect = { crossFade: true };
                }

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

                if (options.autoplay) {
                    config.autoplay = {
                        delay: parseInt(options.delay) || 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: options.pauseOnHover === true
                    };
                } else {
                    config.autoplay = false;
                }

                element.swiperInstance = new Swiper(swiperContainer, config);

                const sw = element.swiperInstance;

                // ── Keep the slide put while editing ─────────────────────────────
                // Editing a slide's text — especially applying toolbar formatting, which
                // re-applies the selection (restoreSelection) — makes Swiper instantly
                // slide to whichever slide regained focus, and its loop/observer
                // repositions run instant too. Every one of those is an INSTANT move
                // (speed = 0); genuine user navigation animates at the configured
                // Transition Speed (min 200). So while editing, swallow the speed-0
                // moves and leave real navigation alone. (Confirmed by logging the
                // exact call that moved it: slideTo(index, 0, …).)
                const _slideTo = sw.slideTo.bind(sw);
                sw.slideTo = (index, speed, runCallbacks, internal) => {
                    if (element._tsEditing && speed === 0) return sw;
                    return _slideTo(index, speed, runCallbacks, internal);
                };

                // Track "editing" across the toolbar round-trip: clicking a format button
                // briefly moves focus out of the block and back, so a short debounce holds
                // the flag through it and only clears once focus has really settled away.
                // Also pauses autoplay while editing so slides don't advance mid-typing.
                if (element._tsFocusIn) {
                    element.removeEventListener('focusin', element._tsFocusIn);
                    element.removeEventListener('focusout', element._tsFocusOut);
                }
                element._tsFocusIn = (e) => {
                    clearTimeout(element._tsEditTimer);
                    // Only count focus as "editing" when it lands in an editable region.
                    // Swiper's a11y makes the nav arrows focusable, so clicking one fires
                    // focusin too — and if that set the flag, the guard would block the
                    // loop's instant reposition (loopFix, speed 0) and slides would snap
                    // instead of animate. isContentEditable is false on the arrows (and on
                    // everything in a rendered, non-editor page), so they're ignored.
                    if (e.target && e.target.isContentEditable) {
                        element._tsEditing = true;
                        sw.autoplay?.stop();
                    } else {
                        element._tsEditing = false;
                    }
                };
                element._tsFocusOut = () => {
                    clearTimeout(element._tsEditTimer);
                    element._tsEditTimer = setTimeout(() => {
                        element._tsEditing = false;
                        if (options.autoplay && !element.contains(document.activeElement)) sw.autoplay?.start();
                    }, 300);
                };
                element.addEventListener('focusin', element._tsFocusIn);
                element.addEventListener('focusout', element._tsFocusOut);
            } catch (err) {
                console.error('Text Slider: Failed to load Swiper', err);
            }
        };

        init();

        return {
            unmount: () => {
                if (element.swiperInstance) {
                    element.swiperInstance.destroy(true, true);
                    element.swiperInstance = null;
                }
                if (element._tsFocusIn) {
                    element.removeEventListener('focusin', element._tsFocusIn);
                    element.removeEventListener('focusout', element._tsFocusOut);
                    element._tsFocusIn = element._tsFocusOut = null;
                }
                clearTimeout(element._tsEditTimer);
                element._tsEditing = false;
            }
        };
    }
};
