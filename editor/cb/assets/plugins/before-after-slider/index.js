export default {
    name: 'before-after-slider',
    displayName: 'Before/After Slider',
    version: '1.0.2',

    settings: {
        startPosition: {
            type: 'range',
            label: 'Starting Position',
            default: 50,
            min: 0,
            max: 100,
            step: 1,
            unit: '%'
        },
        orientation: {
            type: 'select',
            label: 'Orientation',
            default: 'horizontal',
            options: [
                { value: 'horizontal', label: 'Horizontal' },
                { value: 'vertical', label: 'Vertical' }
            ]
        },
        showLabels: {
            type: 'boolean',
            label: 'Show Labels',
            default: true
        }
    },

    editor: {
        openContentEditor: function (element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            const beforeImg = element.querySelector('.ba-before img');
            const afterImg = element.querySelector('.ba-after img');
            const beforeLabel = element.querySelector('.ba-label-before');
            const afterLabel = element.querySelector('.ba-label-after');

            // labelled field (label + control)
            const makeField = (labelText, control) => {
                const f = document.createElement('div');
                f.className = 'cbx-field';
                const l = document.createElement('label');
                l.textContent = labelText;
                f.append(l, control);
                return f;
            };

            // Preview + (URL input + browse) block for one image
            const addImageField = (labelText, img, onUpdate) => {
                const currentSrc = img?.getAttribute('src') || '';

                const preview = document.createElement('img');
                preview.className = 'cbx-preview';
                preview.alt = '';
                preview.src = currentSrc || 'https://placehold.co/400x150?text=No+Image';

                const input = document.createElement('input');
                input.type = 'text';
                input.classList.add('cbx-grow');
                input.placeholder = out('Image URL');
                input.value = currentSrc;
                const apply = (url) => {
                    preview.src = url || 'https://placehold.co/400x150?text=No+Image';
                    onUpdate(url);
                    onChange?.();
                };
                input.addEventListener('input', () => apply(input.value));

                const row = document.createElement('div');
                row.className = 'cbx-row';
                row.append(input, ...builder.createFileButtons('image', (url) => { input.value = url; apply(url); }));

                container.append(preview, makeField(labelText, row));
            };

            // Before / After images
            addImageField(out('Before Image'), beforeImg, (url) => { if (beforeImg) beforeImg.src = url; });
            addImageField(out('After Image'), afterImg, (url) => { if (afterImg) afterImg.src = url; });

            // Alt text
            const beforeAltInput = document.createElement('input');
            beforeAltInput.type = 'text';
            beforeAltInput.placeholder = out('Describe the before image for screen readers');
            beforeAltInput.value = beforeImg?.getAttribute('alt') || '';
            beforeAltInput.addEventListener('input', () => {
                if (beforeImg) beforeImg.alt = beforeAltInput.value;
                onChange?.();
            });

            const afterAltInput = document.createElement('input');
            afterAltInput.type = 'text';
            afterAltInput.placeholder = out('Describe the after image for screen readers');
            afterAltInput.value = afterImg?.getAttribute('alt') || '';
            afterAltInput.addEventListener('input', () => {
                if (afterImg) afterImg.alt = afterAltInput.value;
                onChange?.();
            });

            // Labels
            const beforeLabelInput = document.createElement('input');
            beforeLabelInput.type = 'text';
            beforeLabelInput.placeholder = out('e.g. Before');
            beforeLabelInput.value = beforeLabel?.textContent || '';
            beforeLabelInput.addEventListener('input', () => {
                if (beforeLabel) beforeLabel.textContent = beforeLabelInput.value;
                onChange?.();
            });

            const afterLabelInput = document.createElement('input');
            afterLabelInput.type = 'text';
            afterLabelInput.placeholder = out('e.g. After');
            afterLabelInput.value = afterLabel?.textContent || '';
            afterLabelInput.addEventListener('input', () => {
                if (afterLabel) afterLabel.textContent = afterLabelInput.value;
                onChange?.();
            });

            container.append(
                makeField(out('Before Alt Text'), beforeAltInput),
                makeField(out('After Alt Text'), afterAltInput),
                makeField(out('Before Label'), beforeLabelInput),
                makeField(out('After Label'), afterLabelInput)
            );

            return container;
        }
    },

    mount: function (element, options) {
        const container = element.querySelector('.ba-container');
        const slider = element.querySelector('.ba-slider');
        const beforeDiv = element.querySelector('.ba-before');
        const handle = element.querySelector('.ba-handle');

        if (!container || !slider || !beforeDiv || !handle) return {};

        const isVertical = options.orientation === 'vertical';
        const startPos = Number.isFinite(parseInt(options.startPosition)) ? parseInt(options.startPosition) : 50;

        // Utility: pointer coords (mouse or touch)
        const getPoint = (e) => {
            if (e.touches && e.touches.length) {
                return { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
            return { x: e.clientX, y: e.clientY };
        };

        // Apply clip based on percentage (0..100)
        // H: reveal left -> right (clip RIGHT)
        // V: reveal top -> bottom (clip BOTTOM)
        const applyClip = (percent) => {
            const p = Math.max(0, Math.min(100, percent));
            if (isVertical) {
                const val = `inset(0 0 ${100 - p}% 0)`; // âœ… clip from bottom
                beforeDiv.style.clipPath = val;
                beforeDiv.style.webkitClipPath = val;
                slider.style.top = `${p}%`;
            } else {
                const val = `inset(0 ${100 - p}% 0 0)`; // clip from right
                beforeDiv.style.clipPath = val;
                beforeDiv.style.webkitClipPath = val;
                slider.style.left = `${p}%`;
            }
        };

        // Initial position
        applyClip(startPos);

        // Labels visibility (defensive)
        const labels = element.querySelectorAll('.ba-label-before, .ba-label-after');
        const showLabels = options.showLabels === true || options.showLabels === 'true';
        labels.forEach(label => {
            label.style.display = showLabels ? 'block' : 'none';
        });

        let isDragging = false;

        const updateFromEvent = (e) => {
            if (!isDragging) return;
            const rect = container.getBoundingClientRect();
            const pt = getPoint(e);
            let position;

            if (isVertical) {
                position = ((pt.y - rect.top) / rect.height) * 100; // down -> bigger %
            } else {
                position = ((pt.x - rect.left) / rect.width) * 100;  // right -> bigger %
            }

            applyClip(position);

            // Prevent scroll on touch while dragging
            if (e.cancelable) e.preventDefault();
        };

        const startDrag = (e) => {
            isDragging = true;
            if (e.cancelable) e.preventDefault();
            updateFromEvent(e);
        };

        const stopDrag = () => {
            isDragging = false;
        };

        // Events
        handle.addEventListener('mousedown', startDrag);
        handle.addEventListener('touchstart', startDrag, { passive: false });

        document.addEventListener('mousemove', updateFromEvent);
        document.addEventListener('touchmove', updateFromEvent, { passive: false });

        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag, { passive: true });
        document.addEventListener('touchcancel', stopDrag, { passive: true });

        // Cleanup
        return {
            unmount: () => {
                handle.removeEventListener('mousedown', startDrag);
                handle.removeEventListener('touchstart', startDrag, { passive: false });
                document.removeEventListener('mousemove', updateFromEvent);
                document.removeEventListener('touchmove', updateFromEvent, { passive: false });
                document.removeEventListener('mouseup', stopDrag);
                document.removeEventListener('touchend', stopDrag, { passive: true });
                document.removeEventListener('touchcancel', stopDrag, { passive: true });
            }
        };
    }
};