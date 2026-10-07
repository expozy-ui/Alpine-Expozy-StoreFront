/*
Usage (give the block a height; mount fills it with an animated canvas):
<div data-cb-type="aurora-glow" data-cb-background="dark" data-cb-color-a="#5b8cff" data-cb-color-b="#c15bff" data-cb-color-c="#38e8c6" data-cb-speed="1" data-cb-intensity="100" data-cb-blur="40" data-cb-grain="12" style="min-height: 480px;">
</div>
*/

export default {
    name: 'aurora-glow',
    displayName: 'Aurora Glow',
    version: '2.0.0',

    // ===== SETTINGS =====
    settings: {
        _groups: [
            { id: 'style', label: 'Style', fields: ['background', 'colorA', 'colorB', 'colorC'] },
            { id: 'feel', label: 'Motion & feel', fields: ['speed', 'intensity', 'blur', 'grain'] }
        ],
        background: {
            type: 'select',
            label: 'Background',
            default: 'dark',
            options: [
                { value: 'dark', label: 'Dark (glow)' },
                { value: 'light', label: 'Light (pastel)' },
                { value: 'transparent', label: 'Transparent (overlay)' }
            ]
        },
        colorA: { type: 'color', label: 'Color A', default: '#5b8cff' },
        colorB: { type: 'color', label: 'Color B', default: '#c15bff' },
        colorC: { type: 'color', label: 'Color C', default: '#38e8c6' },
        speed: { type: 'range', label: 'Speed', default: 1, min: 0.1, max: 10, step: 0.1, unit: '×' },
        intensity: { type: 'range', label: 'Glow Intensity', default: 100, min: 20, max: 160, step: 5, unit: '%' },
        blur: { type: 'range', label: 'Softness', default: 40, min: 0, max: 120, step: 5, unit: 'px' },
        grain: { type: 'range', label: 'Grain', default: 12, min: 0, max: 40, step: 1, unit: '%' }
    },

    // ===== MOUNT =====
    mount(element, options = {}) {
        element.style.position = 'relative';
        element.style.overflow = 'hidden';

        const canvas = document.createElement('canvas');
        canvas.className = 'aurora-canvas';
        canvas.style.position = 'absolute';
        canvas.style.inset = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        element.innerHTML = '';
        element.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const off = document.createElement('canvas');   // low-res render target (for softness + speed)
        const offctx = off.getContext('2d');

        // ---- Parse options ----
        const parseColor = (val, fallback) => {
            if (!val) return fallback;
            let h = String(val).trim();
            const rgb = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/i.exec(h);
            if (rgb) return { r: +rgb[1], g: +rgb[2], b: +rgb[3] };
            h = h.replace('#', '');
            if (h.length === 3) h = h.split('').map(c => c + c).join('');
            if (h.length >= 6) return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
            return fallback;
        };

        const bgMode = options.background || 'dark';
        const additive = bgMode === 'dark';                       // glow where clouds overlap
        const bgFill = bgMode === 'light' ? '#f3f4fb' : (bgMode === 'dark' ? '#070812' : null);
        const colors = [
            parseColor(options.colorA, { r: 91, g: 140, b: 255 }),
            parseColor(options.colorB, { r: 193, g: 91, b: 255 }),
            parseColor(options.colorC, { r: 56, g: 232, b: 198 })
        ];
        const speed = Math.max(0.1, +options.speed || 1);
        const intensity = (options.intensity != null ? +options.intensity : 100) / 100;
        const blurPx = Math.max(0, options.blur != null ? +options.blur : 40);
        const grainAmt = (options.grain != null ? +options.grain : 12) / 100;
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // ---- Colour clouds ("blobs") with organic, noise-like drift ----
        const rnd = (a, b) => a + Math.random() * (b - a);
        const blobs = [];
        for (let i = 0; i < 6; i++) {
            blobs.push({
                color: colors[i % colors.length],
                ax: rnd(0.15, 0.85), ay: rnd(0.10, 0.90),   // anchor (fraction of canvas)
                mx: rnd(0.12, 0.30), my: rnd(0.12, 0.30),   // drift amplitude
                rBase: rnd(0.55, 0.95),                     // radius factor
                f1: rnd(0.6, 1.0), f2: rnd(0.25, 0.5), f3: rnd(0.6, 1.0), f4: rnd(0.25, 0.5),
                p1: rnd(0, 6.28), p2: rnd(0, 6.28), p3: rnd(0, 6.28), p4: rnd(0, 6.28)
            });
        }

        // ---- Film-grain tile (generated once) ----
        let grainPattern = null;
        if (grainAmt > 0) {
            const gc = document.createElement('canvas');
            gc.width = gc.height = 160;
            const gg = gc.getContext('2d');
            const img = gg.createImageData(160, 160);
            for (let i = 0; i < img.data.length; i += 4) {
                const v = 128 + (Math.random() * 2 - 1) * 128;
                img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
                img.data[i + 3] = 255;
            }
            gg.putImageData(img, 0, 0);
            grainPattern = ctx.createPattern(gc, 'repeat');
        }

        // ---- Sizing (DPR-aware; offscreen at half res) ----
        let cssW = 1, cssH = 1, offW = 1, offH = 1;
        const RENDER_SCALE = 0.5;
        const resize = () => {
            const rect = element.getBoundingClientRect();
            cssW = Math.max(1, rect.width);
            cssH = Math.max(1, rect.height);
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(cssW * dpr);
            canvas.height = Math.round(cssH * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            offW = Math.max(1, Math.round(cssW * RENDER_SCALE));
            offH = Math.max(1, Math.round(cssH * RENDER_SCALE));
            off.width = offW;
            off.height = offH;
        };
        resize();

        const onResize = () => resize();
        window.addEventListener('resize', onResize);
        let ro = null;
        if (window.ResizeObserver) { ro = new ResizeObserver(onResize); ro.observe(element); }

        // ---- Animation loop ----
        let raf = null;
        let t = 0;
        const draw = () => {
            t += 0.006 * speed * (prefersReduced ? 0.15 : 1);

            // 1) Paint the colour clouds on the low-res offscreen canvas
            offctx.setTransform(1, 0, 0, 1, 0, 0);
            offctx.clearRect(0, 0, offW, offH);
            offctx.globalCompositeOperation = additive ? 'lighter' : 'source-over';
            const rMax = Math.max(offW, offH);
            const baseA = (additive ? 0.5 : 0.62) * intensity;
            for (const b of blobs) {
                const x = (b.ax + b.mx * (Math.sin(t * b.f1 + b.p1) * 0.6 + Math.sin(t * b.f2 + b.p2) * 0.4)) * offW;
                const y = (b.ay + b.my * (Math.cos(t * b.f3 + b.p3) * 0.6 + Math.cos(t * b.f4 + b.p4) * 0.4)) * offH;
                const r = b.rBase * rMax * 0.6;
                const c = b.color;
                const g = offctx.createRadialGradient(x, y, 0, x, y, r);
                g.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${baseA})`);
                g.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);
                offctx.fillStyle = g;
                offctx.beginPath();
                offctx.arc(x, y, r, 0, Math.PI * 2);
                offctx.fill();
            }

            // 2) Composite to the visible canvas: background, then the (softened) field
            ctx.globalCompositeOperation = 'source-over';
            ctx.filter = 'none';
            if (bgFill) { ctx.fillStyle = bgFill; ctx.fillRect(0, 0, cssW, cssH); }
            else { ctx.clearRect(0, 0, cssW, cssH); }

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            const ov = blurPx; // overscan so the blur's edge fade falls outside the view
            ctx.filter = blurPx > 0 ? `blur(${blurPx}px)` : 'none';
            ctx.drawImage(off, -ov, -ov, cssW + ov * 2, cssH + ov * 2);
            ctx.filter = 'none';

            // 3) Film grain
            if (grainPattern && grainAmt > 0) {
                ctx.save();
                ctx.globalCompositeOperation = 'overlay';
                ctx.globalAlpha = Math.min(0.5, grainAmt * 0.6);
                ctx.fillStyle = grainPattern;
                const ox = prefersReduced ? 0 : (Math.random() * 160) | 0;
                const oy = prefersReduced ? 0 : (Math.random() * 160) | 0;
                ctx.translate(ox, oy);
                ctx.fillRect(-ox, -oy, cssW, cssH);
                ctx.restore();
            }

            raf = requestAnimationFrame(draw);
        };
        draw();

        // ---- Instance ----
        return {
            destroy() {
                if (raf) cancelAnimationFrame(raf);
                window.removeEventListener('resize', onResize);
                if (ro) ro.disconnect();
            }
        };
    },

    // ===== UNMOUNT =====
    unmount(element, instance) {
        try {
            if (instance && typeof instance.destroy === 'function') instance.destroy();
        } catch (err) {
            console.error('aurora-glow unmount error', err);
        }
    }
};
