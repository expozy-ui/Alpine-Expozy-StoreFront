/*
Usage — a floating 3D showcase of images or videos (screenshots of your work). Add
media in the editor; `mount` arranges them in perspective, drifts them slowly,
parallax-reacts to the cursor, and brings the hovered one forward.

<div data-cb-type="floating-showcase" data-cb-transparent-bg="false" data-cb-bg-color="#0b0b12" data-cb-corner-radius="12" data-cb-shadow="true" data-cb-drift="45" data-cb-parallax="55" data-cb-depth="50" data-cb-spread="100" style="min-height: 560px;">
    <div class="fg-stage">
        <div class="fg-item fg-featured"><a class="fg-card"><img class="fg-img" src="assets/minimalist-blocks/images/ai-01Opn.jpg" alt="Project one"></a></div>
        <div class="fg-item"><a class="fg-card"><img class="fg-img" src="assets/minimalist-blocks/images/ai-0Yhoi.jpg" alt="Project two"></a></div>
        <!-- an item can be a video instead of an image (autoplaying, muted, looping): -->
        <div class="fg-item"><a class="fg-card"><video class="fg-img fg-video" muted loop autoplay playsinline><source src="assets/minimalist-blocks/images/ai-cQ5ST.mp4" type="video/mp4"></video></a></div>
    </div>
</div>
*/

export default {
    name: 'floating-showcase',
    displayName: 'Floating Showcase',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'style', label: 'Style', fields: ['bgColor', 'transparentBg', 'cornerRadius', 'shadow', 'featuredSize'] },
            { id: 'motion', label: 'Motion', fields: ['drift', 'parallax', 'depth', 'spread'] },
            { id: 'hover', label: 'Hover', fields: ['dimOthers', 'hoverSpeed'] }
        ],
        bgColor: { type: 'color', label: 'Background Color', default: '#0b0b12' },
        transparentBg: { type: 'boolean', label: 'Transparent Background', default: true },
        cornerRadius: { type: 'number', label: 'Corner Radius', default: 12, min: 0, max: 40, unit: 'px' },
        shadow: { type: 'boolean', label: 'Card Shadow', default: true },
        featuredSize: { type: 'range', label: 'Featured Size', default: 135, min: 80, max: 400, unit: 'px' },
        drift: { type: 'range', label: 'Drift (ambient float)', default: 45, min: 0, max: 100, unit: '%' },
        parallax: { type: 'range', label: 'Cursor Parallax', default: 55, min: 0, max: 100, unit: '%' },
        depth: { type: 'range', label: 'Depth (3D strength)', default: 50, min: 0, max: 100, step: 5, unit: '%' },
        spread: { type: 'range', label: 'Spread', default: 100, min: 50, max: 150, unit: '%' },
        dimOthers: { type: 'boolean', label: 'Dim other cards on hover', default: true },
        hoverSpeed: {
            type: 'select', label: 'Hover speed', default: 'normal',
            options: [
                { value: 'fast', label: 'Fast' },
                { value: 'normal', label: 'Normal' },
                { value: 'slow', label: 'Slow' },
                { value: 'slower', label: 'Slower' }
            ]
        }
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

            let stage = element.querySelector('.fg-stage');
            if (!stage) { stage = document.createElement('div'); stage.className = 'fg-stage'; element.appendChild(stage); }

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
                item.dataset.itemId = item.dataset.itemId || `fg-${Date.now()}-${index}`;
                const card = item.querySelector('.fg-card');
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

                // Media URL (image or video)
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
                            video.className = 'fg-img fg-video';
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
                            image.className = 'fg-img';
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

                // Alt / Label
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

                // Link
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

                // Featured
                const featuredLabel = document.createElement('label');
                featuredLabel.className = 'checkbox';
                const featured = document.createElement('input');
                featured.type = 'checkbox';
                featured.checked = item.classList.contains('fg-featured');
                const featuredText = document.createElement('span');
                featuredText.textContent = out('Featured (centered)');
                featuredLabel.append(featured, featuredText);
                featured.addEventListener('change', () => {
                    item.classList.toggle('fg-featured', featured.checked);
                    onChange?.();
                });

                body.append(
                    makeField(out('Image or Video'), browseRow(urlInput, (url) => { urlInput.value = url; applyMedia(url); })),
                    makeField(out('Alt / Label'), altInput),
                    makeField(out('Link (Optional)'), linkInput),
                    featuredLabel
                );

                head.addEventListener('click', (e) => {
                    if (e.target.closest('.cbx-drag') || e.target.closest('button')) return;
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                section.append(head, body);
                return section;
            };

            Array.from(stage.querySelectorAll('.fg-item')).forEach((item, i) => stack.appendChild(createItemEditor(item, i)));

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function () {
                        const map = new Map();
                        stage.querySelectorAll('.fg-item').forEach(item => {
                            if (item.dataset.itemId) map.set(item.dataset.itemId, item);
                        });
                        Array.from(stack.children).forEach(editorItem => {
                            const actual = map.get(editorItem.dataset.itemId);
                            if (actual && actual.parentElement === stage) stage.appendChild(actual);
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
                item.className = 'fg-item';
                item.dataset.itemId = `fg-${Date.now()}`;
                item.innerHTML = '<a class="fg-card"><img class="fg-img" src="https://placehold.co/640x400?text=Screenshot" alt=""></a>';
                stage.appendChild(item);
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
        const stage = element.querySelector('.fg-stage');
        if (!stage) return {};
        const items = Array.from(stage.querySelectorAll('.fg-item'));
        if (!items.length) return {};

        const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // ---- Options ----
        const transparentBg = !(options.transparentBg === false || options.transparentBg === 'false');   // default transparent
        element.style.background = transparentBg ? 'transparent' : (options.bgColor || '#0b0b12');
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.style.setProperty('--fg-radius', (options.cornerRadius != null ? options.cornerRadius : 12) + 'px');
        element.style.setProperty('--fg-featured-w', (options.featuredSize != null ? +options.featuredSize : 135) + 'px');
        element.classList.toggle('fg-no-shadow', options.shadow === false);

        // Depth = 3D strength. Perspective stays fixed; the cards' front/back
        // spread (translateZ) is scaled by depth — so depth 0 = flat (all cards
        // coplanar, no near/far difference) and depth 100 = a strong pop.
        const depthK = (options.depth != null ? +options.depth : 50) / 100;
        stage.style.perspective = '1500px';
        stage.classList.add('fg-live');   // switch from the flow fallback to absolute 3D placement

        // Start any videos (autoplay only works while muted).
        stage.querySelectorAll('video').forEach(v => {
            v.muted = true;
            const p = v.play && v.play();
            if (p && p.catch) p.catch(() => {});
        });

        const spreadF = (options.spread != null ? +options.spread : 100) / 100;
        const driftK = (options.drift != null ? +options.drift : 45) / 100;
        const parK = (options.parallax != null ? +options.parallax : 55) / 100;
        const parallaxPx = reduced ? 0 : parK * 70;
        const tiltDeg = reduced ? 0 : parK * 7;
        const timeStep = 0.005 + driftK * 0.013;

        // Hover behaviour options.
        const dimOthers = !(options.dimOthers === false || options.dimOthers === 'false');   // default on
        // "Hover speed" = how fast the hovered card eases to its scaled/forward
        // state each frame (higher = snappier, lower = slower/smoother).
        const speedMap = { fast: 0.20, normal: 0.12, slow: 0.06, slower: 0.035 };
        const hoverEase = speedMap[options.hoverSpeed] || speedMap.normal;
        // Match the CSS dim/blur fade to the same speed so it feels coherent.
        const durMap = { fast: '0.2s', normal: '0.35s', slow: '0.6s', slower: '0.9s' };
        element.style.setProperty('--fg-hover-dur', durMap[options.hoverSpeed] || durMap.normal);

        // ---- Assign a 3D slot to each card ----
        // Card size is set in CSS (featured cards are larger); depth + perspective
        // give the size variation, so here we mostly place them. Featured cards go
        // centered and forward; the rest scatter toward the edges.
        const states = items.map((el, i) => {
            const featured = el.classList.contains('fg-featured');
            const ang = i * 2.3999632 + 0.6;                 // golden-angle scatter
            const jitter = 0.78 + ((i * 7) % 5) / 5 * 0.44;
            const ringX = 0.40 * spreadF;
            const ringY = 0.34 * spreadF;
            const baseXf = featured ? 0 : Math.cos(ang) * ringX * jitter;
            const baseYf = featured ? 0 : Math.sin(ang) * ringY * jitter;
            // Front-ness follows DOM order — the SAME thing that decides overlap
            // when the scene is flat (z=0). So the card on top at Depth 0 stays on
            // top at every Depth: Depth changes only size/distance, never who
            // overlaps whom. Later cards sit forward (they already paint on top).
            // depthK 0 → all on one plane at equal size (flat collage);
            // depthK 1 → near cards clearly larger, far cards clearly smaller.
            const layer = items.length > 1 ? (i / (items.length - 1)) * 2 - 1 : 0;  // -1 back .. +1 front
            // Resting near/far SIZE is an explicit scale so it always shows and
            // isn't left to perspective alone. z stays small — just enough to set
            // overlap order and weight the parallax.
            const baseScale = 1 + layer * 0.26 * depthK;
            const z = layer * 80 * depthK;
            const rx = -baseYf * 9 * depthK;
            const ry = baseXf * 11 * depthK;
            const depthFactor = 0.7 + layer * 0.26 * depthK;
            return {
                el, baseXf, baseYf, z, rx, ry, baseScale,
                driftAmp: reduced ? 0 : driftK * 38 * (0.65 + ((i * 11) % 7) / 7 * 0.5),
                driftFreq: 0.6 + ((i * 5) % 5) / 5 * 0.5,
                driftPhase: i * 1.7,
                depthFactor,
                curScale: baseScale, curZ: z, hover: false
            };
        });

        // ---- Cursor parallax + hover ----
        // Hover is resolved from the topmost card actually under the pointer
        // (elementFromPoint), which respects stacking. Per-card mouseenter is
        // unreliable when cards overlap in 3D — a covering card's transformed
        // hit-area can steal the pointer, so one card would never scale.
        const cleanups = [];
        let tmx = 0, tmy = 0, mx = 0, my = 0;
        let hovered = -1;
        const setHover = (idx) => {
            if (idx === hovered) return;
            if (hovered >= 0) { states[hovered].hover = false; items[hovered].classList.remove('fg-hover'); }
            hovered = idx;
            if (idx >= 0) { states[idx].hover = true; items[idx].classList.add('fg-hover'); if (dimOthers) stage.classList.add('fg-hovering'); }
            else { stage.classList.remove('fg-hovering'); }
        };
        const onMove = (e) => {
            const r = element.getBoundingClientRect();
            tmx = ((e.clientX - r.left) / Math.max(1, r.width) - 0.5) * 2;
            tmy = ((e.clientY - r.top) / Math.max(1, r.height) - 0.5) * 2;
            const under = document.elementFromPoint(e.clientX, e.clientY);
            const itemEl = (under && under.closest) ? under.closest('.fg-item') : null;
            setHover(itemEl ? items.indexOf(itemEl) : -1);
        };
        const onLeave = () => { tmx = 0; tmy = 0; setHover(-1); };
        element.addEventListener('mousemove', onMove);
        element.addEventListener('mouseleave', onLeave);
        cleanups.push(() => { element.removeEventListener('mousemove', onMove); element.removeEventListener('mouseleave', onLeave); });

        // ---- Animate ----
        // When hovered, a card eases just past the frontmost card's depth so it
        // isn't left behind a neighbour (preserve-3d stacks by translateZ, not
        // z-index). The lift is small and about the same at any Depth, so the
        // hover pop stays gentle whatever the Depth setting is.
        const frontZ = states.reduce((m, s) => Math.max(m, s.z), 0) + 80;
        let raf = null, time = 0;
        const loop = () => {
            time += timeStep;
            mx += (tmx - mx) * 0.06;
            my += (tmy - my) * 0.06;
            stage.style.transform = `rotateX(${(-my * tiltDeg).toFixed(2)}deg) rotateY(${(mx * tiltDeg).toFixed(2)}deg)`;

            const W = stage.clientWidth || element.clientWidth || 1;
            const H = stage.clientHeight || element.clientHeight || 1;
            for (const s of states) {
                const tS = s.hover ? s.baseScale * 1.08 : s.baseScale;
                const tZ = s.hover ? frontZ : s.z;
                s.curScale += (tS - s.curScale) * hoverEase;
                s.curZ += (tZ - s.curZ) * hoverEase;
                const driftX = Math.sin(time * s.driftFreq + s.driftPhase) * s.driftAmp;
                const driftY = Math.cos(time * s.driftFreq * 0.85 + s.driftPhase) * s.driftAmp;
                const x = s.baseXf * W + driftX + mx * s.depthFactor * parallaxPx;
                const y = s.baseYf * H + driftY + my * s.depthFactor * parallaxPx;
                s.el.style.transform =
                    `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${s.curZ.toFixed(1)}px) rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg) scale(${s.curScale.toFixed(3)})`;
            }
            raf = requestAnimationFrame(loop);
        };
        loop();

        return {
            destroy() {
                if (raf) cancelAnimationFrame(raf);
                cleanups.forEach(fn => fn());
                stage.classList.remove('fg-live', 'fg-hovering');
            }
        };
    },

    unmount: function (element, instance) {
        if (instance && typeof instance.destroy === 'function') instance.destroy();
    }
};
