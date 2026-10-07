export default {
    name: 'browser-mockup',
    displayName: 'Browser Mockup',
    version: '1.0.0',

    settings: {
        maxWidth: {
            type: 'number',
            label: 'Max Width',
            default: 1100,
            min: 600,
            max: 1600,
            step: 50,
            unit: 'px'
        },
        rotateX: {
            type: 'range',
            label: 'Rotate X (degrees)',
            default: 8,
            min: 0,
            max: 20,
            step: 1
        },
        rotateY: {
            type: 'range',
            label: 'Rotate Y (degrees)',
            default: -8,
            min: -20,
            max: 20,
            step: 1
        },
        enableHover: {
            type: 'boolean',
            label: 'Enable Hover Effect',
            default: true
        }
    },

    editor: {
        openContentEditor: function (element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            const screenshot = element.querySelector('.screenshot-image');

            // Preview
            const imgPreview = document.createElement('img');
            imgPreview.className = 'cbx-preview';
            imgPreview.alt = '';
            imgPreview.src = screenshot?.getAttribute('src') || 'https://placehold.co/800x600?text=No+Image';

            // Screenshot URL (+ browse)
            const imgInput = document.createElement('input');
            imgInput.type = 'text';
            imgInput.placeholder = out('Screenshot URL');
            imgInput.value = screenshot?.getAttribute('src') || '';
            imgInput.classList.add('cbx-grow');
            imgInput.addEventListener('input', () => {
                if (screenshot) {
                    screenshot.src = imgInput.value;
                    imgPreview.src = imgInput.value || 'https://placehold.co/800x600?text=No+Image';
                    onChange?.();
                }
            });

            const imgRow = document.createElement('div');
            imgRow.className = 'cbx-row';
            imgRow.append(imgInput, ...builder.createFileButtons('image', (url) => {
                imgInput.value = url;
                if (screenshot) {
                    screenshot.src = url;
                    imgPreview.src = url;
                    onChange?.();
                }
            }));

            const imgField = document.createElement('div');
            imgField.className = 'cbx-field';
            const imgLabel = document.createElement('label');
            imgLabel.textContent = out('Screenshot URL');
            imgField.append(imgLabel, imgRow);

            // Alt text
            const altInput = document.createElement('input');
            altInput.type = 'text';
            altInput.placeholder = out('Describe the screenshot for screen readers');
            altInput.value = screenshot?.getAttribute('alt') || 'App Mockup';
            altInput.addEventListener('input', () => {
                if (screenshot) {
                    screenshot.alt = altInput.value;
                    onChange?.();
                }
            });

            const altField = document.createElement('div');
            altField.className = 'cbx-field';
            const altLabel = document.createElement('label');
            altLabel.textContent = out('Image Alt Text');
            altField.append(altLabel, altInput);

            container.append(imgPreview, imgField, altField);
            return container;
        }
    },

    mount: function (element, options) {
        const container = element.querySelector('.app-container');
        const showcase = element.querySelector('.app-showcase');

        // Apply settings (use ?? instead of || to handle 0 values correctly)
        if (container) {
            const rotateX = options.rotateX ?? 8;
            const rotateY = options.rotateY ?? -8;
            container.style.maxWidth = `${options.maxWidth ?? 1100}px`;
            container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        // Apply hover effect if enabled
        if (options.enableHover !== false && showcase && container) {
            const rotateX = options.rotateX ?? 8;
            const rotateY = options.rotateY ?? -8;
            const rotateXHalf = rotateX / 2;
            const rotateYHalf = rotateY / 2;
            
            showcase.addEventListener('mouseenter', () => {
                container.style.transform = `rotateX(${rotateXHalf}deg) rotateY(${rotateYHalf}deg) scale(1.02)`;
            });

            showcase.addEventListener('mouseleave', () => {
                container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        }

        return {};
    }
};