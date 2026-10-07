/*
Chart plugin for ContentBuilder / ContentBox

A dependency-free chart (bar / line / donut) rendered with plain SVG + CSS — no
Chart.js, no CDN, nothing loaded at runtime. The data lives in the block as an
accessible <ul> (screen-reader friendly); mount() reads it and paints the chart
into .chart-canvas. Edit the data (label + value, add/remove/reorder) from the
content editor. Add a heading above the block with the normal editor if you want
a title — the chart intentionally doesn't own one.

Usage (embed this HTML into your content):

<div data-cb-type="chart" data-cb-chart-type="bar" data-cb-accent-color="#3b82f6" data-cb-height="320" data-cb-show-values="true" data-cb-show-grid="true">
    <ul class="chart-data">
        <li data-value="40">Jan</li>
        <li data-value="65">Feb</li>
        <li data-value="52">Mar</li>
        <li data-value="78">Apr</li>
        <li data-value="90">May</li>
    </ul>
    <div class="chart-canvas" aria-hidden="true"></div>
</div>
*/

const PALETTE = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'];

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = (n) => { const v = Number(n); return Number.isFinite(v) ? v.toLocaleString() : String(n); };

function renderBar(data, o) {
    const max = Math.max(...data.map((d) => Math.max(0, d.value)), 1);
    const cols = data.map((d) => {
        const pct = Math.max(0, d.value) / max * 100;
        return `<div class="chart-col">`
            + (o.showValues ? `<span class="chart-val">${esc(fmt(d.value))}</span>` : '')
            + `<span class="chart-bar" style="height:${pct.toFixed(2)}%"></span>`
            + `</div>`;
    }).join('');
    const labels = data.map((d) => `<span>${esc(d.label)}</span>`).join('');
    return `<div class="chart-plot${o.showGrid ? ' chart-grid' : ''}"><div class="chart-bars">${cols}</div></div>`
        + `<div class="chart-xlabels">${labels}</div>`;
}

function renderLine(data, o) {
    const n = data.length;
    const max = Math.max(...data.map((d) => Math.max(0, d.value)), 1);
    const pts = data.map((d, i) => {
        const x = (i + 0.5) / n * 100;
        const y = 6 + (1 - Math.max(0, d.value) / max) * 88;
        return [x, y];
    });
    const line = pts.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ');
    const area = `${pts[0][0].toFixed(2)},100 ${line} ${pts[n - 1][0].toFixed(2)},100`;
    const dots = pts.map((p, i) => {
        const val = o.showValues ? `<span class="chart-pt-val" style="left:${p[0]}%;top:${p[1]}%">${esc(fmt(data[i].value))}</span>` : '';
        return `<span class="chart-dot" style="left:${p[0]}%;top:${p[1]}%"></span>${val}`;
    }).join('');
    const labels = data.map((d) => `<span>${esc(d.label)}</span>`).join('');
    return `<div class="chart-plot chart-line-plot${o.showGrid ? ' chart-grid' : ''}">`
        + `<svg class="chart-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">`
        + `<polygon class="chart-area" points="${area}"></polygon>`
        + `<polyline class="chart-stroke" points="${line}" vector-effect="non-scaling-stroke"></polyline>`
        + `</svg>`
        + `<div class="chart-points">${dots}</div>`
        + `</div><div class="chart-xlabels">${labels}</div>`;
}

function renderDonut(data, o) {
    const total = data.reduce((a, d) => a + Math.max(0, d.value), 0) || 1;
    let cumulative = 0;
    const segs = data.map((d, i) => {
        const pct = Math.max(0, d.value) / total * 100;
        const dashoffset = 25 - cumulative;
        cumulative += pct;
        return `<circle class="chart-seg" cx="21" cy="21" r="15.915" fill="none"`
            + ` stroke="${PALETTE[i % PALETTE.length]}" stroke-width="5"`
            + ` stroke-dasharray="${pct.toFixed(2)} ${(100 - pct).toFixed(2)}" stroke-dashoffset="${dashoffset.toFixed(2)}"></circle>`;
    }).join('');
    const center = o.showValues ? `<div class="chart-donut-center"><b>${esc(fmt(total))}</b><span>Total</span></div>` : '';
    const legend = data.map((d, i) =>
        `<li><span class="chart-swatch" style="background:${PALETTE[i % PALETTE.length]}"></span>`
        + `<span class="chart-legend-label">${esc(d.label)}</span>`
        + (o.showValues ? `<span class="chart-legend-val">${esc(fmt(d.value))}</span>` : '')
        + `</li>`).join('');
    return `<div class="chart-donut">`
        + `<div class="chart-donut-ring"><svg viewBox="0 0 42 42" aria-hidden="true">`
        + `<circle cx="21" cy="21" r="15.915" fill="none" class="chart-donut-track" stroke-width="5"></circle>${segs}</svg>${center}</div>`
        + `<ul class="chart-legend">${legend}</ul>`
        + `</div>`;
}

const RENDERERS = { bar: renderBar, line: renderLine, donut: renderDonut };

export default {
    name: 'chart',
    displayName: 'Chart',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'data', label: 'Chart', fields: ['chartType', 'accentColor'] },
            { id: 'display', label: 'Display', fields: ['height', 'showValues', 'showGrid'] }
        ],
        chartType: {
            type: 'select',
            label: 'Type',
            default: 'bar',
            options: [
                { value: 'bar', label: 'Bar' },
                { value: 'line', label: 'Line' },
                { value: 'donut', label: 'Donut' }
            ],
            group: 'data'
        },
        accentColor: { type: 'color', label: 'Accent Color', default: '#3b82f6', group: 'data' },
        height: { type: 'number', label: 'Height', default: 320, min: 160, max: 640, unit: 'px', group: 'display' },
        showValues: { type: 'boolean', label: 'Show Values', default: true, group: 'display' },
        showGrid: { type: 'boolean', label: 'Show Grid', default: true, group: 'display' }
    },

    editor: {
        openContentEditor: function (element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

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
                        const s = document.createElement('script');
                        s.src = 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js';
                        s.dataset.sortableLoader = 'true';
                        s.onload = () => resolve(window.Sortable);
                        s.onerror = () => { p = null; reject(new Error('Failed to load SortableJS')); };
                        document.head.appendChild(s);
                    });
                    return p;
                };
            })();

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            const list = element.querySelector('.chart-data');
            if (!list) return container;

            const stack = document.createElement('div');
            stack.className = 'cbx-stack';
            container.appendChild(stack);

            const createRow = (li, index) => {
                const row = document.createElement('div');
                row.className = 'cbx-row';
                row.dataset.rowId = li.dataset.rowId || `r-${Date.now()}-${index}`;
                li.dataset.rowId = row.dataset.rowId;

                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                drag.setAttribute('aria-label', out('Drag to reorder'));

                const label = document.createElement('input');
                label.type = 'text';
                label.className = 'cbx-grow';
                label.placeholder = out('Label');
                label.value = li.textContent.trim();
                label.setAttribute('aria-label', out('Label'));
                label.addEventListener('input', () => { li.textContent = label.value; onChange?.(); });

                const value = document.createElement('input');
                value.type = 'number';
                value.style.width = '84px';
                value.placeholder = out('Value');
                value.value = li.getAttribute('data-value') || '';
                value.setAttribute('aria-label', out('Value'));
                value.addEventListener('input', () => { li.setAttribute('data-value', value.value); onChange?.(); });

                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'cbx-iconbtn is-danger';
                del.setAttribute('aria-label', out('Delete row'));
                del.innerHTML = '<svg aria-hidden="true"><use xlink:href="#icon-trash2"></use></svg>';
                del.onclick = (e) => { e.preventDefault(); li.remove(); row.remove(); onChange?.(); };

                row.append(drag, label, value, del);
                return row;
            };

            list.querySelectorAll('li').forEach((li, i) => stack.appendChild(createRow(li, i)));

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function () {
                        const map = new Map();
                        list.querySelectorAll('li').forEach((li) => { if (li.dataset.rowId) map.set(li.dataset.rowId, li); });
                        Array.from(stack.children).forEach((row) => { const li = map.get(row.dataset.rowId); if (li) list.appendChild(li); });
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag optional */ });

            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Row');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const li = document.createElement('li');
                li.dataset.rowId = `r-${Date.now()}`;
                li.setAttribute('data-value', '50');
                li.textContent = 'New';
                list.appendChild(li);
                stack.appendChild(createRow(li, stack.children.length));
                onChange?.();
            };
            container.appendChild(addBtn);

            return container;
        }
    },

    mount: function (element, options) {
        const canvas = element.querySelector('.chart-canvas');
        if (!canvas) return {};

        const type = RENDERERS[options.chartType] ? options.chartType : 'bar';
        element.setAttribute('data-cb-chart-type', type);
        element.style.setProperty('--chart-accent', options.accentColor || '#3b82f6');
        const h = parseInt(options.height, 10);
        element.style.setProperty('--chart-h', (isFinite(h) && h > 0 ? h : 320) + 'px');

        const opts = { showValues: options.showValues !== false, showGrid: options.showGrid !== false };
        const data = Array.prototype.map.call(element.querySelectorAll('.chart-data > li'), (li) => ({
            label: li.textContent.trim(),
            value: parseFloat(li.getAttribute('data-value')) || 0
        }));

        canvas.innerHTML = data.length ? RENDERERS[type](data, opts) : '';
        return {};
    },

    unmount: function () {}
};
