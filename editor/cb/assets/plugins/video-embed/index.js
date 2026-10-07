/*
Usage:

<div data-cb-type="video-embed" data-cb-autoplay="false" data-cb-loop="false" data-cb-muted="false" data-cb-controls="true" data-cb-plays-inline="true" data-cb-aspect-ratio="16/9" data-cb-object-fit="cover" data-cb-border-radius="8" data-cb-hover-shadow="true" data-cb-controls-overlay="70">
    <div class="video-wrapper">
        <video>
            <source src="assets/minimalist-blocks/images/ai-cQ5ST.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
</div>
*/

export default {
    name: 'video-embed',
    displayName: 'Video Embed',
    version: '1.0.0',

    settings: {
        _groups: [
            {
                id: 'video',
                label: 'Video Settings',
                fields: ['autoplay', 'loop', 'muted', 'controls', 'playsInline']
            },
            {
                id: 'display',
                label: 'Display Options',
                fields: ['aspectRatio', 'objectFit', 'borderRadius']
            },
            {
                id: 'appearance',
                label: 'Appearance',
                fields: ['hoverShadow', 'controlsOverlay']
            }
        ],
        autoplay: {
            type: 'boolean',
            label: 'Autoplay (starts muted)',
            default: false,
            group: 'video'
        },
        loop: {
            type: 'boolean',
            label: 'Loop',
            default: false,
            group: 'video'
        },
        muted: {
            type: 'boolean',
            label: 'Muted',
            default: false,
            group: 'video'
        },
        controls: {
            type: 'boolean',
            label: 'Show Controls',
            default: true,
            group: 'video'
        },
        playsInline: {
            type: 'boolean',
            label: 'Plays Inline (Prevent Fullscreen on Mobile)',
            default: true,
            group: 'video'
        },
        aspectRatio: {
            type: 'select',
            label: 'Aspect Ratio',
            default: '16/9',
            options: [
                { value: '16/9', label: '16:9 (Widescreen)' },
                { value: '4/3', label: '4:3 (Standard)' },
                { value: '1/1', label: '1:1 (Square)' },
                { value: '21/9', label: '21:9 (Ultrawide)' },
                { value: '9/16', label: '9:16 (Vertical/Story)' },
                { value: 'auto', label: 'Auto (Original)' }
            ],
            group: 'display'
        },
        objectFit: {
            type: 'select',
            label: 'Video Fit',
            default: 'cover',
            options: [
                { value: 'cover', label: 'Cover (Fill)' },
                { value: 'contain', label: 'Contain (Fit)' },
                { value: 'fill', label: 'Fill (Stretch)' },
                { value: 'none', label: 'None (Original)' }
            ],
            group: 'display'
        },
        borderRadius: {
            type: 'number',
            label: 'Border Radius',
            default: 8,
            min: 0,
            max: 50,
            step: 1,
            unit: 'px',
            group: 'display'
        },
        hoverShadow: {
            type: 'boolean',
            label: 'Hover Shadow',
            default: true,
            group: 'appearance'
        },
        controlsOverlay: {
            type: 'range',
            label: 'Controls Overlay',
            default: 70,
            min: 0,
            max: 100,
            unit: '%',
            group: 'appearance'
        }
    },

    editor: {
        openContentEditor: function(element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            const videoWrapper = element.querySelector('.video-wrapper');
            const video = videoWrapper ? videoWrapper.querySelector('video') : null;
            const source = video ? video.querySelector('source') : null;

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
            const browseRow = (input, pickerType, onPick) => {
                input.classList.add('cbx-grow');
                const row = document.createElement('div');
                row.className = 'cbx-row';
                row.append(input, ...builder.createFileButtons(pickerType, onPick));
                return row;
            };

            const typeFromUrl = (url) => {
                const ext = url.split('.').pop().toLowerCase().split('?')[0];
                return { mp4: 'video/mp4', webm: 'video/webm', ogg: 'video/ogg', mov: 'video/mp4' }[ext] || 'video/mp4';
            };

            // Video URL
            const urlInput = document.createElement('input');
            urlInput.type = 'text';
            urlInput.placeholder = out('Enter video URL (mp4, webm, ogg)');
            urlInput.value = source ? source.getAttribute('src') || '' : '';
            const urlRow = browseRow(urlInput, 'video', (url) => { urlInput.value = url; updateVideoSource(url); });
            urlInput.addEventListener('input', () => {
                const url = urlInput.value.trim();
                if (url) updateVideoSource(url);
            });

            // Preview
            const previewArea = document.createElement('div');
            const renderPreview = (src, type) => {
                previewArea.innerHTML = '';
                if (src) {
                    const v = document.createElement('video');
                    v.className = 'cbx-preview';
                    v.controls = true;
                    v.muted = true;
                    const s = document.createElement('source');
                    s.src = src;
                    s.type = type || typeFromUrl(src);
                    v.appendChild(s);
                    previewArea.appendChild(v);
                } else {
                    const ph = document.createElement('div');
                    ph.className = 'cbx-hint';
                    ph.textContent = out('No video selected.');
                    previewArea.appendChild(ph);
                }
            };
            renderPreview(source ? source.getAttribute('src') : '', source ? source.getAttribute('type') : '');

            // Poster
            const posterInput = document.createElement('input');
            posterInput.type = 'text';
            posterInput.placeholder = out('Poster image URL (shown before playback)');
            posterInput.value = video ? video.getAttribute('poster') || '' : '';
            const posterRow = browseRow(posterInput, 'image', (url) => { posterInput.value = url; updatePosterImage(url); });
            posterInput.addEventListener('input', () => updatePosterImage(posterInput.value.trim()));

            // Helpers
            function updateVideoSource(url) {
                if (!url) return;
                const vw = element.querySelector('.video-wrapper');
                if (!vw) return;
                let v = vw.querySelector('video');
                if (!v) { v = document.createElement('video'); vw.appendChild(v); }
                const videoType = typeFromUrl(url);
                let s = v.querySelector('source');
                if (!s) { s = document.createElement('source'); v.appendChild(s); }
                s.src = url;
                s.type = videoType;
                v.load();
                renderPreview(url, videoType);
                onChange();
            }

            function updatePosterImage(url) {
                const vw = element.querySelector('.video-wrapper');
                const v = vw ? vw.querySelector('video') : null;
                if (!v) return;
                if (url) v.setAttribute('poster', url);
                else v.removeAttribute('poster');
                onChange();
            }

            // Tips
            const tips = document.createElement('div');
            tips.className = 'cbx-hint';
            tips.innerHTML = `<strong>${out('Tips')}</strong><ul><li>${out('Supported formats: MP4, WebM, OGG.')}</li><li>${out('Add a poster image for a better loading experience.')}</li></ul>`;

            container.append(
                makeField(out('Video URL'), urlRow),
                makeField(out('Preview'), previewArea),
                makeField(out('Poster Image (Optional)'), posterRow),
                tips
            );

            return container;
        }
    },

        mount: function(element, options) {
        const videoWrapper = element.querySelector('.video-wrapper');
        const video = videoWrapper ? videoWrapper.querySelector('video') : null;

        if (!video) return {};

        // Apply video settings
        video.autoplay = options.autoplay || false;
        video.loop = options.loop || false;
        video.muted = options.muted || false;
        video.controls = options.controls !== false;
        video.playsInline = options.playsInline !== false;
        // Browsers only allow autoplay on muted videos.
        if (video.autoplay) video.muted = true;

        // Apply wrapper styles (display/position/overflow + video sizing are in style.css)
        const aspectRatio = options.aspectRatio || '16/9';
        if (aspectRatio !== 'auto') {
            videoWrapper.style.aspectRatio = aspectRatio;
            videoWrapper.style.height = 'auto';
        } else {
            videoWrapper.style.aspectRatio = '';
            videoWrapper.style.height = 'auto';
        }

        // Apply video styles
        video.style.objectFit = options.objectFit || 'cover';
        // Set border-radius as a CSS variable and let the stylesheet apply it, so
        // the responsive `calc(var(--border-radius) * …)` rules can still scale it.
        // (Setting it inline on the wrapper here would override those media queries.)
        const borderRadius = options.borderRadius !== undefined ? options.borderRadius : 8;
        element.style.setProperty('--border-radius', borderRadius + 'px');

        // Hover shadow — off = no box-shadow on hover.
        if (options.hoverShadow === false) element.style.setProperty('--ve-hover-shadow', 'none');
        else element.style.removeProperty('--ve-hover-shadow');

        // Controls overlay — alpha of the dark scrim behind the native controls.
        // 0% = no dark gradient (minimalist); 70% ≈ the default.
        const controlsOverlay = options.controlsOverlay != null ? +options.controlsOverlay : 70;
        element.style.setProperty('--ve-controls-alpha', (Math.max(0, Math.min(100, controlsOverlay)) / 100).toFixed(2));

        // Load the video
        video.load();

        return {};
    }
};