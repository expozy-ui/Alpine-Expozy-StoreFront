/*
YouTube Embed plugin for ContentBuilder / ContentBox

Embeds a YouTube video from any YouTube link (watch / youtu.be / embed / shorts /
live) or a raw video ID — no API key. "Advanced but easy": a click-to-load facade
(shows the thumbnail and only loads the player when clicked, for a fast page),
privacy mode (youtube-nocookie), start time, autoplay/mute/loop/controls, related-
videos toggle, aspect ratio and corner radius. mount() builds the player; the
`.yt-embed-frame` is just an empty container.

Usage (embed this HTML into your content):

<div data-cb-type="youtube-embed" data-cb-video="https://www.youtube.com/watch?v=aqz-KE-bpKQ" data-cb-start-time="0" data-cb-click-to-load="true" data-cb-autoplay="false" data-cb-mute="false" data-cb-loop="false" data-cb-controls="true" data-cb-no-cookie="true" data-cb-related-videos="false" data-cb-aspect-ratio="16/9" data-cb-border-radius="12">
    <div class="yt-embed-frame"></div>
</div>
*/

export default {
    name: 'youtube-embed',
    displayName: 'YouTube',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'video', label: 'Video', fields: ['video', 'startTime'] },
            { id: 'playback', label: 'Playback', fields: ['clickToLoad', 'autoplay', 'mute', 'loop', 'controls'] },
            { id: 'privacy', label: 'Privacy', fields: ['noCookie', 'relatedVideos'] },
            { id: 'appearance', label: 'Appearance', fields: ['aspectRatio', 'borderRadius'] }
        ],
        video: {
            type: 'text', label: 'YouTube URL or ID',
            default: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
            placeholder: 'Paste a YouTube link (watch, youtu.be, shorts…)',
            description: 'Any YouTube link works — watch, youtu.be, /embed/, /shorts/, /live/ — or paste just the 11-character video ID. A start time in the link (e.g. ?t=90) is picked up too.',
            group: 'video'
        },
        startTime: { type: 'number', label: 'Start At (seconds)', default: 0, min: 0, max: 86400, unit: 's', group: 'video' },
        clickToLoad: { type: 'boolean', label: 'Load on click (faster page)', default: true, group: 'playback' },
        autoplay: { type: 'boolean', label: 'Autoplay (starts muted)', default: false, group: 'playback' },
        mute: { type: 'boolean', label: 'Muted', default: false, group: 'playback' },
        loop: { type: 'boolean', label: 'Loop', default: false, group: 'playback' },
        controls: { type: 'boolean', label: 'Show Controls', default: true, group: 'playback' },
        noCookie: { type: 'boolean', label: 'Privacy mode (no cookies until play)', default: true, group: 'privacy' },
        relatedVideos: { type: 'boolean', label: 'Show related videos at end', default: false, group: 'privacy' },
        aspectRatio: {
            type: 'select', label: 'Aspect Ratio', default: '16/9',
            options: [
                { value: '16/9', label: '16:9 (Widescreen)' },
                { value: '4/3', label: '4:3 (Standard)' },
                { value: '1/1', label: '1:1 (Square)' },
                { value: '21/9', label: '21:9 (Ultrawide)' },
                { value: '9/16', label: '9:16 (Vertical / Shorts)' }
            ],
            group: 'appearance'
        },
        borderRadius: { type: 'number', label: 'Border Radius', default: 12, min: 0, max: 64, unit: 'px', group: 'appearance' }
    },

    mount: function (element, options) {
        const frame = element.querySelector('.yt-embed-frame');
        if (!frame) return {};

        // Opt into the editor's selectable-iframe contract (so the block stays
        // selectable and the player/facade doesn't steal clicks while editing).
        frame.classList.add('iframe-overlay');

        // Appearance (CSS only — no player reload).
        const radius = parseInt(options.borderRadius, 10);
        element.style.setProperty('--yt-radius', (isFinite(radius) && radius >= 0 ? radius : 12) + 'px');
        const aspect = (options.aspectRatio || '16/9').replace('/', ' / ');
        frame.style.aspectRatio = aspect;

        // Pull the 11-char video ID out of whatever was pasted.
        const extractId = (input) => {
            const s = (input || '').trim();
            if (!s) return '';
            if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
            const patterns = [
                /[?&]v=([a-zA-Z0-9_-]{11})/,
                /youtu\.be\/([a-zA-Z0-9_-]{11})/,
                /\/embed\/([a-zA-Z0-9_-]{11})/,
                /\/shorts\/([a-zA-Z0-9_-]{11})/,
                /\/live\/([a-zA-Z0-9_-]{11})/,
                /\/v\/([a-zA-Z0-9_-]{11})/,
                /([a-zA-Z0-9_-]{11})/
            ];
            for (const re of patterns) { const m = s.match(re); if (m) return m[1]; }
            return '';
        };
        // Read a start time (?t=90 or ?t=1m30s) from the link.
        const parseTime = (s) => {
            const m = (s || '').match(/[?&#]t=([0-9hms]+)/i);
            if (!m) return 0;
            const v = m[1];
            if (/^\d+$/.test(v)) return parseInt(v, 10);
            let total = 0;
            const h = v.match(/(\d+)h/i); if (h) total += +h[1] * 3600;
            const mn = v.match(/(\d+)m/i); if (mn) total += +mn[1] * 60;
            const sc = v.match(/(\d+)s/i); if (sc) total += +sc[1];
            return total;
        };

        const id = extractId(options.video || '');
        frame.innerHTML = '';

        if (!id) {
            frame.innerHTML = '<div class="yt-embed-empty">Paste a YouTube link in the settings panel.</div>';
            return {};
        }

        const truthy = (v, def) => (v === true || v === 'true') ? true : ((v === false || v === 'false') ? false : def);
        const autoplay = truthy(options.autoplay, false);
        const mute = truthy(options.mute, false);
        const loop = truthy(options.loop, false);
        const controls = truthy(options.controls, true);
        const noCookie = truthy(options.noCookie, true);
        const related = truthy(options.relatedVideos, false);
        const clickToLoad = truthy(options.clickToLoad, true);
        const start = (parseInt(options.startTime, 10) || 0) || parseTime(options.video || '');

        const host = noCookie ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com';

        const buildSrc = (ap, mt) => {
            const p = new URLSearchParams();
            if (ap) p.set('autoplay', '1');
            if (mt) p.set('mute', '1');
            if (!controls) p.set('controls', '0');
            if (loop) { p.set('loop', '1'); p.set('playlist', id); }   // loop needs playlist=ID for a single video
            if (start) p.set('start', String(start));
            if (!related) p.set('rel', '0');
            p.set('playsinline', '1');
            return host + '/embed/' + id + '?' + p.toString();
        };

        const makeIframe = (src) => {
            const iframe = document.createElement('iframe');
            iframe.src = src;
            iframe.title = 'YouTube video player';
            iframe.loading = 'lazy';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('frameborder', '0');
            return iframe;
        };

        if (autoplay) {
            // Autoplay must be muted to be allowed by browsers.
            frame.appendChild(makeIframe(buildSrc(true, true)));
        } else if (clickToLoad) {
            // Facade: thumbnail + play button; the heavy player loads only on click
            // (a user gesture, so it can start with sound per the Muted option).
            const facade = document.createElement('button');
            facade.type = 'button';
            facade.className = 'yt-facade';
            facade.setAttribute('aria-label', 'Play video');

            const thumb = document.createElement('img');
            thumb.className = 'yt-thumb';
            thumb.alt = '';
            thumb.loading = 'lazy';
            thumb.src = 'https://i.ytimg.com/vi/' + id + '/maxresdefault.jpg';
            thumb.onerror = () => { thumb.onerror = null; thumb.src = 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg'; };

            const play = document.createElement('span');
            play.className = 'yt-play';
            play.setAttribute('aria-hidden', 'true');

            facade.append(thumb, play);
            facade.addEventListener('click', () => {
                const iframe = makeIframe(buildSrc(true, mute));
                frame.innerHTML = '';
                frame.appendChild(iframe);
            });
            frame.appendChild(facade);
        } else {
            frame.appendChild(makeIframe(buildSrc(false, mute)));
        }

        return {};
    },

    unmount: function () {}
};
