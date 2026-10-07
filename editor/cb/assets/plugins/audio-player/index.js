/*
Audio / Podcast Player plugin for ContentBuilder / ContentBox

A themeable player around a native <audio>: play/pause, draggable seek with a
buffered bar, time, skip back/forward, playback speed, volume, and an optional
download button. Title / subtitle / artwork live in the HTML (editable); mount()
renders the control row from the options and wires it to the <audio>.

Usage (embed this HTML into your content):

<div data-cb-type="audio-player" data-cb-accent-color="#3b82f6" data-cb-bg-color="#ffffff" data-cb-text-color="#1a1a1a" data-cb-art-shape="rounded" data-cb-art-size="68" data-cb-corner-radius="14" data-cb-shadow="true" data-cb-border="true" data-cb-skip-buttons="true" data-cb-skip-seconds="15" data-cb-speed-control="true" data-cb-volume-control="true" data-cb-show-time="true" data-cb-download="false" data-cb-loop="false" role="region" aria-label="Audio player">
    <div class="ap-card">
        <img class="ap-art" src="assets/minimalist-blocks/images/ai-cvlfg.jpg" alt="">
        <div class="ap-main">
            <div class="ap-title">Episode 1 — Getting Started</div>
            <div class="ap-subtitle">The Podcast</div>
            <div class="ap-controls"></div>
        </div>
        <audio class="ap-audio" src="assets/minimalist-blocks/example.mp3" preload="metadata"></audio>
    </div>
</div>
*/

const SVG = {
    play: '<svg class="ap-ic ap-ic-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg class="ap-ic ap-ic-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
    back: '<svg class="ap-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 4v4h4"/></svg>',
    fwd: '<svg class="ap-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 4v4h-4"/></svg>',
    vol: '<svg class="ap-ic ap-ic-vol" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16 8.5a4 4 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    mute: '<svg class="ap-ic ap-ic-mute" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16 9.5l5 5m0-5l-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    dl: '<svg class="ap-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>'
};

const SPEEDS = [1, 1.25, 1.5, 1.75, 2, 0.75];

export default {
    name: 'audio-player',
    displayName: 'Audio / Podcast Player',
    version: '2.0.0',

    settings: {
        _groups: [
            { id: 'appearance', label: 'Appearance', fields: ['accentColor', 'bgColor', 'textColor', 'artShape', 'artSize', 'cornerRadius', 'shadow', 'border'] },
            { id: 'controls', label: 'Controls', fields: ['skipButtons', 'skipSeconds', 'speedControl', 'volumeControl', 'showTime', 'download', 'loop'] }
        ],
        accentColor: { type: 'color', label: 'Accent Color', default: '#3b82f6', group: 'appearance' },
        bgColor: { type: 'color', label: 'Background Color', default: '#ffffff', group: 'appearance' },
        textColor: { type: 'color', label: 'Text Color', default: '#1a1a1a', group: 'appearance' },
        artShape: {
            type: 'select', label: 'Artwork Shape', default: 'rounded',
            options: [
                { value: 'rounded', label: 'Rounded' },
                { value: 'circle', label: 'Circle' },
                { value: 'square', label: 'Square' }
            ],
            group: 'appearance'
        },
        artSize: {
            type: 'select', label: 'Artwork Size', default: '68',
            options: [
                { value: '68', label: 'Small' },
                { value: '80', label: 'Medium' },
                { value: '100', label: 'Large' }
            ],
            group: 'appearance'
        },
        cornerRadius: { type: 'number', label: 'Corner Radius', default: 14, min: 0, max: 40, unit: 'px', group: 'appearance' },
        shadow: { type: 'boolean', label: 'Card Shadow', default: true, group: 'appearance' },
        border: { type: 'boolean', label: 'Card Border', default: true, group: 'appearance' },
        skipButtons: { type: 'boolean', label: 'Skip Buttons', default: true, group: 'controls' },
        skipSeconds: { type: 'number', label: 'Skip Amount', default: 15, min: 5, max: 60, unit: 's', group: 'controls' },
        speedControl: { type: 'boolean', label: 'Playback Speed', default: true, group: 'controls' },
        volumeControl: { type: 'boolean', label: 'Volume', default: true, group: 'controls' },
        showTime: { type: 'boolean', label: 'Show Time', default: true, group: 'controls' },
        download: { type: 'boolean', label: 'Download Button', default: false, group: 'controls' },
        loop: { type: 'boolean', label: 'Loop', default: false, group: 'controls' }
    },

    editor: {
        openContentEditor: function (element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            const main = () => element.querySelector('.ap-main');

            const addTextField = (labelText, getEl, makeEl, placeholder) => {
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = placeholder;
                input.value = getEl()?.textContent || '';
                input.addEventListener('input', () => {
                    let el = getEl();
                    if (!el) { el = makeEl(); }
                    if (el) el.textContent = input.value;
                    onChange?.();
                });
                const f = document.createElement('div');
                f.className = 'cbx-field';
                const l = document.createElement('label');
                l.textContent = labelText;
                f.append(l, input);
                container.appendChild(f);
            };

            const addMediaField = (labelText, getVal, pickerType, onUrl, placeholder) => {
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'cbx-grow';
                input.placeholder = placeholder;
                input.value = getVal() || '';
                input.addEventListener('input', () => onUrl(input.value.trim()));
                const row = document.createElement('div');
                row.className = 'cbx-row';
                row.append(input, ...builder.createFileButtons(pickerType, (url) => { input.value = url; onUrl(url); }));
                const f = document.createElement('div');
                f.className = 'cbx-field';
                const l = document.createElement('label');
                l.textContent = labelText;
                f.append(l, row);
                container.appendChild(f);
            };

            // Title
            addTextField(out('Title'), () => element.querySelector('.ap-title'), () => {
                const el = document.createElement('div'); el.className = 'ap-title';
                main()?.prepend(el); return el;
            }, out('Episode / track title'));

            // Subtitle
            addTextField(out('Subtitle (optional)'), () => element.querySelector('.ap-subtitle'), () => {
                const el = document.createElement('div'); el.className = 'ap-subtitle';
                const title = element.querySelector('.ap-title');
                if (title && title.parentNode) title.after(el); else main()?.prepend(el);
                return el;
            }, out('Podcast / author name'));

            // Audio file
            const audio = element.querySelector('.ap-audio');
            addMediaField(out('Audio File'), () => audio?.getAttribute('src'), 'audio', (url) => {
                if (audio) { audio.setAttribute('src', url); audio.load(); }
                onChange?.();
            }, out('Audio URL (mp3, etc.)'));

            // Artwork
            addMediaField(out('Artwork (optional)'), () => element.querySelector('.ap-art')?.getAttribute('src'), 'image', (url) => {
                let img = element.querySelector('.ap-art');
                const card = element.querySelector('.ap-card');
                if (url) {
                    if (!img) { img = document.createElement('img'); img.className = 'ap-art'; img.alt = ''; card?.insertBefore(img, card.firstChild); }
                    img.src = url;
                } else if (img) { img.remove(); }
                onChange?.();
            }, out('Image URL'));

            return container;
        }
    },

    mount: function (element, options) {
        const audio = element.querySelector('.ap-audio');
        if (!audio) return {};

        // Clear listeners from a previous mount (idempotent — the audio element
        // persists across re-mounts, so its listeners must not stack up).
        if (audio._apCleanup) audio._apCleanup();

        const card = element.querySelector('.ap-card');
        const main = element.querySelector('.ap-main');
        let controls = element.querySelector('.ap-controls');
        if (!controls && main) { controls = document.createElement('div'); controls.className = 'ap-controls'; main.appendChild(controls); }
        if (!controls) return {};

        // ---- Options → theme ----
        const truthy = (v, d) => (v === true || v === 'true') ? true : ((v === false || v === 'false') ? false : d);
        element.style.setProperty('--ap-accent', options.accentColor || '#3b82f6');
        element.style.setProperty('--ap-surface', options.bgColor || '#ffffff');
        element.style.setProperty('--ap-text', options.textColor || '#1a1a1a');
        element.style.setProperty('--ap-card-radius', (options.cornerRadius != null ? +options.cornerRadius : 14) + 'px');
        const artSize = parseInt(options.artSize, 10);
        element.style.setProperty('--ap-art-size', (isFinite(artSize) && artSize > 0 ? artSize : 68) + 'px');
        element.classList.toggle('ap-no-shadow', truthy(options.shadow, true) === false);
        element.classList.toggle('ap-no-border', truthy(options.border, true) === false);
        const shape = ['rounded', 'circle', 'square'].includes(options.artShape) ? options.artShape : 'rounded';
        element.classList.remove('ap-art-rounded', 'ap-art-circle', 'ap-art-square');
        element.classList.add('ap-art-' + shape);
        element.setAttribute('role', 'region');
        if (!element.getAttribute('aria-label')) element.setAttribute('aria-label', 'Audio player');

        const skipButtons = truthy(options.skipButtons, true);
        const skipSeconds = Math.max(1, parseInt(options.skipSeconds, 10) || 15);
        const speedControl = truthy(options.speedControl, true);
        const volumeControl = truthy(options.volumeControl, true);
        const showTime = truthy(options.showTime, true);
        const download = truthy(options.download, false);
        audio.loop = truthy(options.loop, false);

        const src = audio.getAttribute('src') || '';

        // ---- Render the control row from the options ----
        const html = [];
        html.push('<div class="ap-progress">');
        html.push('<div class="ap-seek" role="slider" tabindex="0" aria-label="Seek" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="ap-seek-track"><div class="ap-seek-buffered"></div><div class="ap-seek-played"></div><span class="ap-seek-handle"></span></div></div>');
        if (showTime) html.push('<span class="ap-time">0:00 / 0:00</span>');
        html.push('</div>');
        html.push('<div class="ap-buttons">');
        html.push('<button class="ap-play" type="button" aria-label="Play">' + SVG.play + SVG.pause + '</button>');
        if (skipButtons) {
            html.push('<button class="ap-skip ap-skip-back" type="button" aria-label="Back ' + skipSeconds + ' seconds">' + SVG.back + '<span class="ap-skip-n">' + skipSeconds + '</span></button>');
            html.push('<button class="ap-skip ap-skip-fwd" type="button" aria-label="Forward ' + skipSeconds + ' seconds">' + SVG.fwd + '<span class="ap-skip-n">' + skipSeconds + '</span></button>');
        }
        html.push('<span class="ap-spacer"></span>');
        if (speedControl) html.push('<button class="ap-speed" type="button" aria-label="Playback speed">1&times;</button>');
        if (volumeControl) html.push('<div class="ap-vol-wrap"><button class="ap-mute" type="button" aria-label="Mute">' + SVG.vol + SVG.mute + '</button><input class="ap-vol-slider" type="range" min="0" max="1" step="0.05" value="1" aria-label="Volume"></div>');
        if (download && src) html.push('<a class="ap-download" href="' + src + '" download aria-label="Download">' + SVG.dl + '</a>');
        html.push('</div>');
        controls.innerHTML = html.join('');

        const playBtn = controls.querySelector('.ap-play');
        const skipBack = controls.querySelector('.ap-skip-back');
        const skipFwd = controls.querySelector('.ap-skip-fwd');
        const speedBtn = controls.querySelector('.ap-speed');
        const muteBtn = controls.querySelector('.ap-mute');
        const volSlider = controls.querySelector('.ap-vol-slider');
        const seek = controls.querySelector('.ap-seek');
        const played = controls.querySelector('.ap-seek-played');
        const buffered = controls.querySelector('.ap-seek-buffered');
        const handle = controls.querySelector('.ap-seek-handle');
        const timeEl = controls.querySelector('.ap-time');

        // ---- Helpers ----
        const fmt = (s) => {
            if (!isFinite(s) || s < 0) return '0:00';
            s = Math.floor(s);
            const h = Math.floor(s / 3600);
            const m = Math.floor((s % 3600) / 60);
            const sec = String(s % 60).padStart(2, '0');
            return h ? (h + ':' + String(m).padStart(2, '0') + ':' + sec) : (m + ':' + sec);
        };
        const updateTime = () => {
            const cur = audio.currentTime || 0;
            const dur = audio.duration || 0;
            const pct = dur ? (cur / dur * 100) : 0;
            if (played) played.style.width = pct + '%';
            if (handle) handle.style.left = pct + '%';
            if (timeEl) timeEl.textContent = fmt(cur) + ' / ' + fmt(dur);
            if (seek) seek.setAttribute('aria-valuenow', String(Math.round(pct)));
        };
        const updateBuffered = () => {
            if (!buffered) return;
            const dur = audio.duration || 0;
            let end = 0;
            if (dur && audio.buffered.length) end = audio.buffered.end(audio.buffered.length - 1);
            buffered.style.width = (dur ? (end / dur * 100) : 0) + '%';
        };
        const setPlaying = (p) => {
            if (card) card.classList.toggle('is-playing', p);
            if (playBtn) playBtn.setAttribute('aria-label', p ? 'Pause' : 'Play');
        };
        const updateVolumeUI = () => {
            if (card) card.classList.toggle('is-muted', audio.muted || audio.volume === 0);
            if (volSlider) volSlider.value = String(audio.muted ? 0 : audio.volume);
        };

        // ---- Audio events ----
        const onPlay = () => setPlaying(true);
        const onPause = () => setPlaying(false);
        const onTime = () => updateTime();
        const onMeta = () => { updateTime(); updateBuffered(); };
        const onProgress = () => updateBuffered();
        const onEnded = () => setPlaying(false);
        const onVolume = () => updateVolumeUI();
        const onRate = () => { if (speedBtn) speedBtn.innerHTML = audio.playbackRate + '&times;'; };
        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('timeupdate', onTime);
        audio.addEventListener('loadedmetadata', onMeta);
        audio.addEventListener('progress', onProgress);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('volumechange', onVolume);
        audio.addEventListener('ratechange', onRate);

        // ---- Control events ----
        const onPlayBtn = (e) => { e.preventDefault(); if (audio.paused) audio.play().catch(() => {}); else audio.pause(); };
        const onBack = (e) => { e.preventDefault(); audio.currentTime = Math.max(0, audio.currentTime - skipSeconds); };
        const onFwd = (e) => { e.preventDefault(); if (audio.duration) audio.currentTime = Math.min(audio.duration, audio.currentTime + skipSeconds); };
        let speedIdx = 0;
        const onSpeed = (e) => { e.preventDefault(); speedIdx = (speedIdx + 1) % SPEEDS.length; audio.playbackRate = SPEEDS[speedIdx]; };
        const onMute = (e) => { e.preventDefault(); audio.muted = !audio.muted; };
        const onVol = () => { audio.muted = false; audio.volume = parseFloat(volSlider.value); };

        // Draggable seek (pointer events → keeps tracking during a drag).
        let dragging = false;
        const ratioFromX = (clientX) => { const r = seek.getBoundingClientRect(); return Math.min(1, Math.max(0, (clientX - r.left) / r.width)); };
        const applySeek = (clientX) => { if (audio.duration) audio.currentTime = ratioFromX(clientX) * audio.duration; };
        const onDown = (e) => { dragging = true; if (seek.setPointerCapture) { try { seek.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ } } applySeek(e.clientX); e.preventDefault(); };
        const onMove = (e) => { if (dragging) applySeek(e.clientX); };
        const onUp = () => { dragging = false; };
        const onKey = (e) => {
            if (e.key === 'ArrowRight') { if (audio.duration) audio.currentTime = Math.min(audio.duration, audio.currentTime + 5); e.preventDefault(); }
            else if (e.key === 'ArrowLeft') { audio.currentTime = Math.max(0, audio.currentTime - 5); e.preventDefault(); }
        };

        if (playBtn) playBtn.addEventListener('click', onPlayBtn);
        if (skipBack) skipBack.addEventListener('click', onBack);
        if (skipFwd) skipFwd.addEventListener('click', onFwd);
        if (speedBtn) speedBtn.addEventListener('click', onSpeed);
        if (muteBtn) muteBtn.addEventListener('click', onMute);
        if (volSlider) volSlider.addEventListener('input', onVol);
        if (seek) {
            seek.addEventListener('pointerdown', onDown);
            seek.addEventListener('pointermove', onMove);
            seek.addEventListener('pointerup', onUp);
            seek.addEventListener('pointercancel', onUp);
            seek.addEventListener('keydown', onKey);
        }

        updateTime();
        updateBuffered();
        updateVolumeUI();

        audio._apCleanup = () => {
            audio.pause();
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('timeupdate', onTime);
            audio.removeEventListener('loadedmetadata', onMeta);
            audio.removeEventListener('progress', onProgress);
            audio.removeEventListener('ended', onEnded);
            audio.removeEventListener('volumechange', onVolume);
            audio.removeEventListener('ratechange', onRate);
            audio._apCleanup = null;
        };

        return { destroy() { if (audio._apCleanup) audio._apCleanup(); } };
    },

    unmount: function (element, instance) {
        if (instance && instance.destroy) instance.destroy();
    }
};
