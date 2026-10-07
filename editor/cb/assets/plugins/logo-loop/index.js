/**
 * ContentBox Logo Loop Plugin
 * @version 1.0.0
 * @description Infinite logo carousel with seamless looping
 */

class LogoLoop {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            speed: 20,
            direction: 'left',
            gap: 40,
            pauseOnHover: true,
            duplicateCount: 'auto',
            ...options
        };

        this.container = null;
        this.track = null;
        this.clones = [];
        this.resizeObserver = null;
        this.isHovered = false;
        this.animationId = null;
        this.initialized = false;

        this.init();
    }

    async init() {
        this.validateElement();
        this.buildStructure();
        
        // Wait for layout to stabilize before calculating dimensions
        await this.waitForLayout();
        
        this.setupClones();
        this.setupAnimation();
        this.setupEventListeners();
        this.setupResizeObserver();
        this.initialized = true;
    }

    /**
     * Wait for layout to be fully rendered
     * This ensures offsetWidth/offsetHeight are accurate
     */
    async waitForLayout() {
        return new Promise(resolve => {
            // Use requestAnimationFrame twice to ensure layout is complete
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    resolve();
                });
            });
        });
    }

    validateElement() {
        if (!this.element) {
            throw new Error('[LogoLoop] Element is required');
        }

        const items = this.element.querySelectorAll(':scope > *');
        if (items.length === 0) {
            throw new Error('[LogoLoop] Element must contain at least one child element');
        }
    }

    buildStructure() {
        //----- This is a must -------
        // if (!this.element.hasAttribute('data-cb-original-content')) {
        //     this.element.setAttribute('data-cb-original-content', this.element.innerHTML);
        // }
        //------------

        this.element.classList.add('cb-logo-loop');
        this.element.setAttribute('data-cb-logo-loop-initialized', 'true');

        this.container = document.createElement('div');
        this.container.className = 'cb-logo-loop__container';

        this.track = document.createElement('div');
        this.track.className = 'cb-logo-loop__track';

        const items = Array.from(this.element.children);
        items.forEach(item => {
            item.classList.add('cb-logo-loop__item');
            this.track.appendChild(item);
        });

        this.container.appendChild(this.track);
        this.element.appendChild(this.container);

        this.track.style.gap = `${this.options.gap}px`;
    }

    setupClones() {
        const originalItems = Array.from(this.track.querySelectorAll('.cb-logo-loop__item:not([data-clone])'));
        
        let cloneCount = this.options.duplicateCount;
        
        if (cloneCount === 'auto') {
            const trackWidth = this.getTrackWidth();
            const containerWidth = this.element.offsetWidth;
            
            // IMPROVED: Better calculation with safety margin
            cloneCount = Math.max(2, Math.ceil((containerWidth * 2.5) / trackWidth));
        }

        for (let i = 0; i < cloneCount; i++) {
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                clone.setAttribute('data-clone', 'true');
                clone.setAttribute('aria-hidden', 'true');
                this.track.appendChild(clone);
                this.clones.push(clone);
            });
        }
    }

    getTrackWidth() {
        const items = this.track.querySelectorAll('.cb-logo-loop__item:not([data-clone])');
        let width = 0;
        
        items.forEach(item => {
            // IMPROVED: Use getBoundingClientRect for more accurate measurements
            const rect = item.getBoundingClientRect();
            width += rect.width;
        });
        
        // Add gaps between items
        width += this.options.gap * (items.length - 1);
        
        // SAFETY: Ensure we never return 0 or negative width
        return Math.max(width, 100);
    }

    setupAnimation() {
        const trackWidth = this.getTrackWidth();
        const direction = this.options.direction === 'right' ? 1 : -1;
        
        // console.log(`[LogoLoop] Setting up animation - trackWidth: ${trackWidth}px, speed: ${this.options.speed}s`);
        
        this.track.style.setProperty('--loop-duration', `${this.options.speed}s`);
        this.track.style.setProperty('--loop-distance', `${trackWidth}px`);
        this.track.style.setProperty('--loop-direction', direction);

        this.track.classList.add('cb-logo-loop__track--animating');
    }

    setupEventListeners() {
        if (this.options.pauseOnHover) {
            this.element.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
            this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        }

        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }

    handleMouseEnter() {
        this.isHovered = true;
        this.track.style.animationPlayState = 'paused';
    }

    handleMouseLeave() {
        this.isHovered = false;
        if (!document.hidden) {
            this.track.style.animationPlayState = 'running';
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            this.track.style.animationPlayState = 'paused';
        } else if (!this.isHovered) {
            this.track.style.animationPlayState = 'running';
        }
    }

    setupResizeObserver() {
        this.resizeObserver = new ResizeObserver(entries => {
            this.handleResize();
        });
        this.resizeObserver.observe(this.element);
    }

    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.recalculate();
        }, 250);
    }

    async recalculate() {
        // console.log('[LogoLoop] Recalculating dimensions...');
        
        // Pause animation during recalculation
        const wasRunning = this.track.style.animationPlayState !== 'paused';
        this.track.style.animationPlayState = 'paused';
        
        // Remove old clones
        this.clones.forEach(clone => clone.remove());
        this.clones = [];

        // Wait for layout to stabilize
        await this.waitForLayout();

        // Recreate clones
        this.setupClones();

        // Restart animation with new dimensions
        const trackWidth = this.getTrackWidth();
        // console.log(`[LogoLoop] New trackWidth: ${trackWidth}px`);
        
        this.track.style.setProperty('--loop-distance', `${trackWidth}px`);
        
        // Resume animation if it was running
        if (wasRunning && !this.isHovered && !document.hidden) {
            this.track.style.animationPlayState = 'running';
        }
    }

    // Public API
    pause() {
        this.track.style.animationPlayState = 'paused';
    }

    play() {
        this.track.style.animationPlayState = 'running';
    }

    setSpeed(speed) {
        this.options.speed = speed;
        this.track.style.setProperty('--loop-duration', `${speed}s`);
    }

    setDirection(direction) {
        this.options.direction = direction;
        const dir = direction === 'right' ? 1 : -1;
        this.track.style.setProperty('--loop-direction', dir);
    }

    destroy() {
        // console.log('[LogoLoop] Destroying instance...');
        
        // Stop any pending operations
        clearTimeout(this.resizeTimeout);
        
        // Remove event listeners
        if (this.options.pauseOnHover) {
            this.element.removeEventListener('mouseenter', this.handleMouseEnter);
            this.element.removeEventListener('mouseleave', this.handleMouseLeave);
        }
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);

        // Disconnect observer
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }

        // Stop animation immediately
        this.track.classList.remove('cb-logo-loop__track--animating');
        this.track.style.animationPlayState = 'paused';
        
        // Clean up clones
        this.clones.forEach(clone => clone.remove());
        
        // Restore original structure
        const items = Array.from(this.track.children);
        items.forEach(item => {
            this.element.appendChild(item);
            item.classList.remove('cb-logo-loop__item');
        });

        this.container.remove();
        this.element.classList.remove('cb-logo-loop');
        this.element.removeAttribute('data-cb-logo-loop-initialized');
        
        this.initialized = false;
    }
}

// Plugin interface for ContentBox
export default {
    name: 'logo-loop',
    displayName: 'Logo Loop',
    version: '1.0.1',

    settings: {
        speed: {
            type: 'number',
            label: 'Animation Speed',
            default: 20,
            min: 5,
            max: 60,
            step: 1,
            unit: 's'
        },
        direction: {
            type: 'select',
            label: 'Scroll Direction',
            default: 'left',
            options: [
                { value: 'left', label: 'Left to Right' },
                { value: 'right', label: 'Right to Left' }
            ]
        },
        gap: {
            type: 'number',
            label: 'Gap Between Logos',
            default: 40,
            min: 0,
            max: 200,
            step: 5,
            unit: 'px'
        },
        pauseOnHover: {
            type: 'boolean',
            label: 'Pause on Hover',
            default: true
        }
    },

    init(runtime) {
        // console.log('[ContentBox] Logo Loop plugin initialized');
    },

    editor: {
        openContentEditor: function(element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            const stack = document.createElement('div');
            stack.className = 'cbx-stack';
            container.appendChild(stack);

            const addItemField = (item, index) => {   // item = the <img> element
                const itemEditor = document.createElement('div');
                itemEditor.className = 'cbx-item';

                // ── Head: thumb + title + delete ──
                const head = document.createElement('div');
                head.className = 'cbx-item-head';

                const thumb = document.createElement('img');
                thumb.className = 'cbx-thumb';
                thumb.alt = '';
                thumb.src = item?.src || 'https://placehold.co/60x60?text=No+Img';
                thumb.onerror = () => { thumb.src = 'https://placehold.co/40x40?text=Logo'; };

                const title = document.createElement('span');
                title.className = 'cbx-title';
                title.textContent = item?.alt || `${out('Logo')} ${index + 1}`;

                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className = 'cbx-iconbtn is-danger';
                deleteBtn.setAttribute('aria-label', out('Delete logo'));
                deleteBtn.innerHTML = '<svg aria-hidden="true"><use xlink:href="#icon-trash2"></use></svg>';
                deleteBtn.onclick = (e) => {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    if (item?.parentNode) item.parentNode.remove();   // remove the .logo-item wrapper
                    itemEditor.remove();
                    if (typeof onChange === 'function') onChange();
                };

                head.append(thumb, title, deleteBtn);

                // ── Body: Image URL (+ browse) + Alt ──
                const body = document.createElement('div');
                body.className = 'cbx-item-body';
                body.style.display = 'none';

                const urlInput = document.createElement('input');
                urlInput.type = 'text';
                urlInput.placeholder = out('Image URL');
                urlInput.value = item?.src || '';
                let typingTimer;
                urlInput.addEventListener('input', () => {
                    thumb.src = urlInput.value || 'https://placehold.co/40x40?text=Logo';
                    if (item) item.src = urlInput.value;
                    clearTimeout(typingTimer);
                    typingTimer = setTimeout(() => { if (typeof onChange === 'function') onChange(); }, 500);
                });

                urlInput.classList.add('cbx-grow');
                const urlControl = document.createElement('div');
                urlControl.className = 'cbx-row';
                urlControl.append(urlInput, ...builder.createFileButtons('image', (url) => {
                    urlInput.value = url;
                    if (item) item.src = url;
                    thumb.src = url;
                    if (typeof onChange === 'function') onChange();
                }));

                const urlField = document.createElement('div');
                urlField.className = 'cbx-field';
                const urlLabel = document.createElement('label');
                urlLabel.textContent = out('Image URL');
                urlField.append(urlLabel, urlControl);
                body.appendChild(urlField);

                const altInput = document.createElement('input');
                altInput.type = 'text';
                altInput.placeholder = out('Describe the logo for screen readers');
                altInput.value = item?.alt || '';
                let altTypingTimer;
                altInput.addEventListener('input', () => {
                    if (item) item.alt = altInput.value;
                    title.textContent = altInput.value || `${out('Logo')} ${index + 1}`;
                    clearTimeout(altTypingTimer);
                    altTypingTimer = setTimeout(() => { if (typeof onChange === 'function') onChange(); }, 500);
                });

                const altField = document.createElement('div');
                altField.className = 'cbx-field';
                const altLabel = document.createElement('label');
                altLabel.textContent = out('Alt Text (Accessibility)');
                altField.append(altLabel, altInput);
                body.appendChild(altField);

                // Toggle body open/closed on head click
                head.addEventListener('click', (e) => {
                    if (e.target.closest('button')) return;
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                itemEditor.append(head, body);
                stack.appendChild(itemEditor);
            };

            element.querySelectorAll('.logo-item img').forEach((img, i) => addItemField(img, i));

            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Logo');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const newItem = document.createElement('div');
                newItem.className = 'logo-item';
                newItem.innerHTML = '<img src="https://placehold.co/400x400/orange/white" alt="New Logo">';
                element.appendChild(newItem);
                addItemField(newItem.querySelector('img'), stack.children.length);
                if (typeof onChange === 'function') onChange();
            };
            container.appendChild(addBtn);

            return container;
        }
    },

    async mount(element, options) {
        try {
            const instance = new LogoLoop(element, options);
            // Wait for initialization to complete
            await new Promise(resolve => {
                const checkInit = setInterval(() => {
                    if (instance.initialized) {
                        clearInterval(checkInit);
                        resolve();
                    }
                }, 10);
            });
            return instance;
        } catch (error) {
            console.error('[ContentBox] Logo Loop mount error:', error);
            return null;
        }
    },

    unmount(element, instance) {
        if (instance && typeof instance.destroy === 'function') {
            instance.destroy();
        }
    },

    destroy(runtime) {
        // console.log('[ContentBox] Logo Loop plugin destroyed');
    }
};