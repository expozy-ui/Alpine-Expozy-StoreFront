/*
Usage — a "wall of work": several columns of images scrolling continuously, with
columns alternating direction at slightly different speeds. Add images in the
editor (one flat list); `mount` splits them into columns and loops each seamlessly.
Images stay real <img> (SEO-friendly) and can link out. Bounded, inline block —
give it a height with the Height option.

<div data-cb-type="marquee-wall" data-cb-columns="3" data-cb-gap="16" data-cb-height="520" data-cb-corner-radius="12" data-cb-shadow="true" data-cb-transparent-bg="true" data-cb-speed="45" data-cb-direction="alternate" data-cb-pause-on-hover="true" data-cb-fade-edges="true" data-cb-tilt-x="0" data-cb-tilt-y="-8" data-cb-perspective="1600">
    <div class="mw-wall">
        <div class="mw-item"><a class="mw-card"><img class="mw-img" src="assets/minimalist-blocks/images/ai-01Opn.jpg" alt="Project one"></a></div>
        <div class="mw-item"><a class="mw-card"><img class="mw-img" src="assets/minimalist-blocks/images/ai-0Yhoi.jpg" alt="Project two"></a></div>
        <div class="mw-item"><a class="mw-card"><img class="mw-img" src="assets/minimalist-blocks/images/ai-1ANxo.jpg" alt="Project three"></a></div>
        <!-- an item can be a video instead of an image (autoplaying, muted, looping): -->
        <div class="mw-item"><a class="mw-card"><video class="mw-video" muted loop autoplay playsinline><source src="assets/minimalist-blocks/images/ai-cQ5ST.mp4" type="video/mp4"></video></a></div>
        <!-- add more .mw-item; they're distributed across the columns -->
    </div>
</div>
*/

export default {
    name: 'marquee-wall',
    displayName: 'Marquee Wall',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'layout', label: 'Layout', fields: ['columns', 'gap', 'height', 'cornerRadius'] },
            { id: 'style', label: 'Style', fields: ['bgColor', 'transparentBg', 'shadow'] },
            { id: 'motion', label: 'Motion', fields: ['speed', 'direction', 'pauseOnHover', 'fadeEdges'] },
            { id: 'depth', label: '3D Tilt', fields: ['tiltX', 'tiltY', 'perspective', 'offsetY'] }
        ],
        columns: { type: 'number', label: 'Columns', default: 3, min: 2, max: 5 },
        gap: { type: 'number', label: 'Gap', default: 16, min: 0, max: 48, unit: 'px' },
        height: { type: 'number', label: 'Height', default: 520, min: 240, max: 900, unit: 'px' },
        cornerRadius: { type: 'number', label: 'Corner Radius', default: 12, min: 0, max: 40, unit: 'px' },
        bgColor: { type: 'color', label: 'Background Color', default: '#0b0b12' },
        transparentBg: { type: 'boolean', label: 'Transparent Background', default: true },
        shadow: { type: 'boolean', label: 'Card Shadow', default: true },
        speed: { type: 'range', label: 'Speed', default: 45, min: 0, max: 100, unit: '%' },
        direction: {
            type: 'select', label: 'Direction', default: 'alternate',
            options: [
                { value: 'alternate', label: 'Alternate (up / down)' },
                { value: 'up', label: 'All up' },
                { value: 'down', label: 'All down' }
            ]
        },
        pauseOnHover: { type: 'boolean', label: 'Pause on Hover', default: true },
        fadeEdges: { type: 'boolean', label: 'Fade Top / Bottom Edges', default: true },
        tiltX: { type: 'range', label: 'Tilt X (up / down)', default: 0, min: -70, max: 70, unit: '°' },
        tiltY: { type: 'range', label: 'Tilt Y (left / right)', default: -8, min: -70, max: 70, unit: '°' },
        perspective: { type: 'range', label: 'Perspective (lower = stronger)', default: 1600, min: 100, max: 1600, step: 10, unit: 'px' },
        offsetY: { type: 'range', label: 'Vertical Offset (− up / + down)', default: 0, min: -120, max: 120, unit: 'px' }
    },

    editor: {
        openContentEditor: function (element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

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

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            // Work against a clean, un-mounted wall: pull real (non-clone) items to
            // the top level so editing/reordering always sees the source list.
            let wall = element.querySelector('.mw-wall');
            if (!wall) { wall = document.createElement('div'); wall.className = 'mw-wall'; element.appendChild(wall); }
            const originals = Array.from(wall.querySelectorAll('.mw-item:not([data-clone])'));
            originals.forEach(it => wall.appendChild(it));
            wall.querySelectorAll('.mw-col, .mw-item[data-clone]').forEach(n => n.remove());
            wall.classList.remove('mw-live', 'mw-fade', 'mw-pausehover');

            const stack = document.createElement('div');
            stack.className = 'cbx-stack';
            container.appendChild(stack);

            const makeField = (labelText, control) => {
                const f = document.createElement('div');
                f.className = 'cbx-field';
                const l = document.createElement('label');
                l.textContent = labelText;
                f.append(l, control);
                return f;
            };
            const browseRow = (input, onPick) => {
                input.classList.add('cbx-grow');
                const row = document.createElement('div');
                row.className = 'cbx-row';
                row.append(input, ...builder.createFileButtons('media', onPick));
                return row;
            };

            const createItemEditor = (item, index) => {
                item.dataset.itemId = item.dataset.itemId || `mw-${Date.now()}-${index}`;
                const card = item.querySelector('.mw-card');
                // Items can hold an <img> or a <video>. These helpers read whichever
                // is present so the same editor row handles both.
                const isVideoUrl = (url) => /\.(mp4|webm|ogg|mov)$/i.test((url || '').split(/[?#]/)[0]);
                const getMedia = () => item.querySelector('img, video');
                const getSrc = () => {
                    const m = getMedia();
                    if (!m) return '';
                    return m.tagName === 'VIDEO'
                        ? (m.querySelector('source')?.getAttribute('src') || m.getAttribute('src') || '')
                        : (m.getAttribute('src') || '');
                };
                const getLabel = () => {
                    const m = getMedia();
                    if (!m) return '';
                    return m.tagName === 'VIDEO' ? (m.getAttribute('aria-label') || '') : (m.getAttribute('alt') || '');
                };
                const videoThumb = 'https://placehold.co/60x60?text=Video';

                const section = document.createElement('div');
                section.className = 'cbx-item';
                section.dataset.itemId = item.dataset.itemId;

                const head = document.createElement('div');
                head.className = 'cbx-item-head';

                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                drag.setAttribute('aria-label', out('Drag to reorder'));

                const thumb = document.createElement('img');
                thumb.className = 'cbx-thumb';
                thumb.alt = '';
                thumb.src = getMedia() && getMedia().tagName === 'VIDEO' ? videoThumb : (getSrc() || 'https://placehold.co/60x60?text=No+Media');
                thumb.onerror = () => { thumb.src = 'https://placehold.co/40x40?text=Media'; };

                const titleText = document.createElement('span');
                titleText.className = 'cbx-title';
                titleText.textContent = getLabel() || `${out('Media')} ${index + 1}`;

                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className = 'cbx-iconbtn is-danger';
                deleteBtn.setAttribute('aria-label', out('Delete item'));
                deleteBtn.innerHTML = '<svg aria-hidden="true"><use xlink:href="#icon-trash2"></use></svg>';
                deleteBtn.onclick = (e) => { e.preventDefault(); item.remove(); section.remove(); onChange?.(); };

                head.append(drag, thumb, titleText, deleteBtn);

                const body = document.createElement('div');
                body.className = 'cbx-item-body';
                body.style.display = 'none';

                const urlInput = document.createElement('input');
                urlInput.type = 'text';
                urlInput.placeholder = out('Image or video URL');
                urlInput.value = getSrc();
                // Swap the element to match the URL: video URLs become an autoplaying,
                // muted, looping <video> (no controls — it's a decorative tile);
                // everything else becomes an <img>.
                const applyMedia = (url) => {
                    if (!card) return;
                    const current = getMedia();
                    const label = getLabel();
                    if (isVideoUrl(url)) {
                        let video = current && current.tagName === 'VIDEO' ? current : null;
                        if (!video) {
                            video = document.createElement('video');
                            video.className = 'mw-video';
                            video.muted = true; video.loop = true; video.autoplay = true; video.playsInline = true;
                            ['muted', 'loop', 'autoplay', 'playsinline'].forEach(a => video.setAttribute(a, ''));
                            if (label) video.setAttribute('aria-label', label);
                            video.appendChild(document.createElement('source'));
                            if (current) current.remove();
                            card.insertBefore(video, card.firstChild);
                        }
                        const source = video.querySelector('source');
                        source.setAttribute('src', url);
                        source.setAttribute('type', 'video/' + ((url.split(/[?#]/)[0].split('.').pop() || 'mp4').toLowerCase()));
                        video.load();
                        thumb.src = videoThumb;
                    } else {
                        let image = current && current.tagName === 'IMG' ? current : null;
                        if (!image) {
                            image = document.createElement('img');
                            image.className = 'mw-img';
                            if (label) image.setAttribute('alt', label);
                            if (current) current.remove();
                            card.insertBefore(image, card.firstChild);
                        }
                        image.setAttribute('src', url);
                        thumb.src = url || 'https://placehold.co/40x40?text=Image';
                    }
                    onChange?.();
                };
                urlInput.addEventListener('input', () => applyMedia(urlInput.value.trim()));

                const altInput = document.createElement('input');
                altInput.type = 'text';
                altInput.placeholder = out('Description for screen readers (optional)');
                altInput.value = getLabel();
                altInput.addEventListener('input', () => {
                    const m = getMedia();
                    if (m) {
                        if (m.tagName === 'VIDEO') m.setAttribute('aria-label', altInput.value);
                        else m.setAttribute('alt', altInput.value);
                    }
                    titleText.textContent = altInput.value || `${out('Media')} ${index + 1}`;
                    onChange?.();
                });

                const linkInput = document.createElement('input');
                linkInput.type = 'text';
                linkInput.placeholder = out('https://example.com (optional)');
                linkInput.value = (card && card.getAttribute('href')) || '';
                linkInput.addEventListener('input', () => {
                    const url = linkInput.value.trim();
                    if (!card) return;
                    if (url) {
                        card.setAttribute('href', url);
                        card.setAttribute('target', '_blank');
                        card.setAttribute('rel', 'noopener noreferrer');
                    } else {
                        card.removeAttribute('href');
                        card.removeAttribute('target');
                        card.removeAttribute('rel');
                    }
                    onChange?.();
                });

                body.append(
                    makeField(out('Image or Video'), browseRow(urlInput, (url) => { urlInput.value = url; applyMedia(url); })),
                    makeField(out('Alt / Label'), altInput),
                    makeField(out('Link (Optional)'), linkInput)
                );

                head.addEventListener('click', (e) => {
                    if (e.target.closest('.cbx-drag') || e.target.closest('button')) return;
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                section.append(head, body);
                return section;
            };

            Array.from(wall.querySelectorAll('.mw-item:not([data-clone])')).forEach((item, i) => stack.appendChild(createItemEditor(item, i)));

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function () {
                        const map = new Map();
                        wall.querySelectorAll('.mw-item:not([data-clone])').forEach(item => {
                            if (item.dataset.itemId) map.set(item.dataset.itemId, item);
                        });
                        Array.from(stack.children).forEach(editorItem => {
                            const actual = map.get(editorItem.dataset.itemId);
                            if (actual && actual.parentElement === wall) wall.appendChild(actual);
                        });
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag optional */ });

            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Media');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const item = document.createElement('div');
                item.className = 'mw-item';
                item.dataset.itemId = `mw-${Date.now()}`;
                item.innerHTML = '<a class="mw-card"><img class="mw-img" src="https://placehold.co/500x640?text=Image" alt=""></a>';
                wall.appendChild(item);
                stack.appendChild(createItemEditor(item, stack.children.length));
                onChange?.();
            };
            container.appendChild(addBtn);

            // Tip
            const tips = document.createElement('div');
            tips.className = 'cbx-hint';
            tips.innerHTML = `<strong>${out('Tip')}</strong> ${out('Videos autoplay muted and loop. A few are fine, but many at once can slow the page. Favor mostly images, with video used sparingly.')}`;
            container.appendChild(tips);

            return container;
        }
    },

    mount: function (element, options) {
        const wall = element.querySelector('.mw-wall');
        if (!wall) return {};

        // Reset to the clean source list (idempotent — clears any prior build / clones).
        const originals = Array.from(wall.querySelectorAll('.mw-item:not([data-clone])'));
        if (!originals.length) return {};
        originals.forEach(it => wall.appendChild(it));
        wall.querySelectorAll('.mw-col, .mw-item[data-clone]').forEach(n => n.remove());
        wall.classList.remove('mw-live', 'mw-fade', 'mw-pausehover');

        const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // ---- Options ----
        const columns = Math.max(1, Math.min(5, Math.min(options.columns != null ? +options.columns : 3, originals.length)));
        const gap = options.gap != null ? +options.gap : 16;
        const height = options.height != null ? +options.height : 520;
        const radius = options.cornerRadius != null ? +options.cornerRadius : 12;
        const speed = options.speed != null ? +options.speed : 45;
        const direction = options.direction || 'alternate';
        const pauseOnHover = !(options.pauseOnHover === false || options.pauseOnHover === 'false');
        const fadeEdges = !(options.fadeEdges === false || options.fadeEdges === 'false');
        const transparentBg = !(options.transparentBg === false || options.transparentBg === 'false');
        const tiltX = options.tiltX != null ? +options.tiltX : 0;
        const tiltY = options.tiltY != null ? +options.tiltY : -8;
        const perspective = options.perspective != null ? +options.perspective : 1600;
        const offsetY = options.offsetY != null ? +options.offsetY : 0;

        element.style.setProperty('--mw-cols', columns);
        element.style.setProperty('--mw-gap', gap + 'px');
        element.style.setProperty('--mw-height', height + 'px');
        element.style.setProperty('--mw-radius', radius + 'px');
        element.classList.toggle('mw-no-shadow', options.shadow === false);
        element.style.background = transparentBg ? 'transparent' : (options.bgColor || '#0b0b12');
        element.classList.toggle('mw-has-bg', !transparentBg);

        // Optional 3D tilt of the whole wall (perspective on the host, rotate on
        // the wall — same approach as the browser-mockup plugin) + a vertical nudge
        // to balance the wall against neighbouring content.
        element.style.setProperty('--mw-persp', perspective + 'px');
        element.style.setProperty('--mw-tiltx', tiltX + 'deg');
        element.style.setProperty('--mw-tilty', tiltY + 'deg');
        element.style.setProperty('--mw-offsety', offsetY + 'px');
        element.classList.toggle('mw-tilt', !!(tiltX || tiltY));

        // ---- Build columns and distribute images round-robin ----
        wall.classList.add('mw-live');
        if (fadeEdges) wall.classList.add('mw-fade');
        if (pauseOnHover) wall.classList.add('mw-pausehover');

        const tracks = [];
        for (let i = 0; i < columns; i++) {
            const col = document.createElement('div');
            col.className = 'mw-col';
            const track = document.createElement('div');
            track.className = 'mw-track';
            col.appendChild(track);
            wall.appendChild(col);
            tracks.push(track);
        }
        originals.forEach((item, i) => tracks[i % columns].appendChild(item));

        // ---- Fill each track and set up the seamless loop ----
        // A track is built as two identical halves; animating by exactly one half
        // brings the second half to where the first was → no visible seam.
        const setup = () => {
            if (reduced) return;
            const colHeight = wall.clientHeight || height;
            tracks.forEach((track, ci) => {
                track.querySelectorAll('.mw-item[data-clone]').forEach(c => c.remove());
                track.classList.remove('mw-animate');
                track.style.removeProperty('--mw-from');
                track.style.removeProperty('--mw-to');
                track.style.removeProperty('--mw-dur');

                const unit = Array.from(track.children);
                if (!unit.length) return;

                // Repeat the unit until it fills at least one column height.
                let guard = 0;
                while (track.scrollHeight < colHeight && guard < 40) {
                    unit.forEach(it => {
                        const c = it.cloneNode(true);
                        c.setAttribute('data-clone', 'true');
                        c.setAttribute('aria-hidden', 'true');
                        track.appendChild(c);
                    });
                    guard++;
                }
                // Duplicate the whole first half to make the seamless second half.
                const firstHalfCount = track.children.length;
                Array.from(track.children).forEach(it => {
                    const c = it.cloneNode(true);
                    c.setAttribute('data-clone', 'true');
                    c.setAttribute('aria-hidden', 'true');
                    track.appendChild(c);
                });
                const distance = track.children[firstHalfCount].offsetTop;
                if (!distance) return;

                const up = direction === 'up' || (direction === 'alternate' && ci % 2 === 0);
                // Per-column speed variation so the columns don't move in lockstep.
                // 0% is a barely-there drift (calm, non-distracting); 100% is brisk.
                // The low base + no floor is what lets the slow end actually be slow.
                const pxPerSec = (2 + speed / 100 * 48) * (1 + (((ci % 3) - 1) * 0.16));
                const dur = Math.max(6, distance / Math.max(0.4, pxPerSec));

                track.style.setProperty('--mw-from', up ? '0px' : `-${distance}px`);
                track.style.setProperty('--mw-to', up ? `-${distance}px` : '0px');
                track.style.setProperty('--mw-dur', dur.toFixed(1) + 's');
                track.classList.add('mw-animate');
            });

            // (Re)start every video, clones included — cloned <video>s can lose their
            // muted state, and autoplay only works while muted.
            wall.querySelectorAll('video').forEach(v => {
                v.muted = true;
                const p = v.play && v.play();
                if (p && p.catch) p.catch(() => {});
            });
        };

        // Measure once the media has real dimensions (images loaded / videos have
        // metadata), then keep it correct on resize.
        const media = Array.from(wall.querySelectorAll('.mw-item:not([data-clone]) img, .mw-item:not([data-clone]) video'));
        const isReady = (m) => m.tagName === 'IMG' ? m.complete : m.readyState >= 1; // HAVE_METADATA
        let pending = media.filter(m => !isReady(m)).length;
        if (pending === 0) {
            requestAnimationFrame(() => requestAnimationFrame(setup));
        } else {
            media.forEach(m => {
                if (isReady(m)) return;
                const done = () => {
                    m.removeEventListener('load', done);
                    m.removeEventListener('loadedmetadata', done);
                    m.removeEventListener('error', done);
                    if (--pending <= 0) setup();
                };
                m.addEventListener('load', done);
                m.addEventListener('loadedmetadata', done);
                m.addEventListener('error', done);
            });
            setTimeout(setup, 1500); // fallback in case some media never fires
        }

        let resizeTimer = null;
        const ro = new ResizeObserver(() => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(setup, 250);
        });
        ro.observe(element);

        return {
            destroy() {
                clearTimeout(resizeTimer);
                ro.disconnect();
                // Restore the clean source list so re-editing/re-saving stays clean.
                originals.forEach(it => wall.appendChild(it));
                wall.querySelectorAll('.mw-col, .mw-item[data-clone]').forEach(n => n.remove());
                wall.classList.remove('mw-live', 'mw-fade', 'mw-pausehover');
            }
        };
    },

    unmount: function (element, instance) {
        if (instance && typeof instance.destroy === 'function') instance.destroy();
    }
};
