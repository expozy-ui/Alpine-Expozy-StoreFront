/*
Countdown Timer plugin for ContentBuilder / ContentBox

Counts down to a fixed target date/time, or runs an "evergreen" per-visitor
countdown (a fixed duration from each visitor's first view, stored in
localStorage). Shows days/hours/minutes/seconds with editable labels, and an
"expired" message when it reaches zero. The unit structure lives in the HTML;
mount() computes and ticks. Target date + unit labels are set in the editor.

Usage (embed this HTML into your content):

<div data-cb-type="countdown-timer" data-cb-target="2026-12-31T23:59" data-cb-mode="date" data-cb-evergreen-hours="24" data-cb-expired-text="This offer has ended." data-cb-size="medium" data-cb-accent-color="#3b82f6" role="timer" aria-label="Countdown">
    <div class="cd-grid">
        <div class="cd-unit"><span class="cd-value" data-unit="days">00</span><span class="cd-label">Days</span></div>
        <div class="cd-unit"><span class="cd-value" data-unit="hours">00</span><span class="cd-label">Hours</span></div>
        <div class="cd-unit"><span class="cd-value" data-unit="minutes">00</span><span class="cd-label">Minutes</span></div>
        <div class="cd-unit"><span class="cd-value" data-unit="seconds">00</span><span class="cd-label">Seconds</span></div>
    </div>
    <div class="cd-expired">This offer has ended.</div>
</div>
*/

export default {
    name: 'countdown-timer',
    displayName: 'Countdown Timer',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'timing', label: 'Timing', fields: ['mode', 'evergreenHours'] },
            { id: 'content', label: 'Content', fields: ['expiredText'] },
            { id: 'appearance', label: 'Appearance', fields: ['size', 'accentColor'] }
        ],
        mode: {
            type: 'select',
            label: 'Mode',
            default: 'date',
            options: [
                { value: 'date', label: 'Fixed date' },
                { value: 'evergreen', label: 'Evergreen (per visitor)' }
            ],
            group: 'timing'
        },
        evergreenHours: {
            type: 'number',
            label: 'Evergreen Duration (hours)',
            default: 24,
            min: 1,
            max: 8760,
            group: 'timing'
        },
        expiredText: {
            type: 'text',
            label: 'Message When Ended',
            default: 'This offer has ended.',
            group: 'content'
        },
        size: {
            type: 'select',
            label: 'Size',
            default: 'medium',
            options: [
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' }
            ],
            group: 'appearance'
        },
        accentColor: { type: 'color', label: 'Accent Color', default: '#3b82f6', group: 'appearance' }
    },

    editor: {
        openContentEditor: function (element, builder, onChange) {
            // Translate editor-UI labels via the builder's language file (out()).
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            const addField = (labelText, control) => {
                const f = document.createElement('div');
                f.className = 'cbx-field';
                const l = document.createElement('label');
                l.textContent = labelText;
                f.append(l, control);
                container.appendChild(f);
                return f;
            };

            // Target date & time (used in "Fixed date" mode)
            const dtInput = document.createElement('input');
            dtInput.type = 'datetime-local';
            dtInput.value = element.getAttribute('data-cb-target') || '';
            dtInput.addEventListener('input', () => {
                element.setAttribute('data-cb-target', dtInput.value);
                onChange?.();
            });
            addField(out('Target date & time'), dtInput);

            // Unit labels (rename / localize Days / Hours / Minutes / Seconds)
            const labelNames = [out('Days label'), out('Hours label'), out('Minutes label'), out('Seconds label')];
            element.querySelectorAll('.cd-label').forEach((lbl, i) => {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = lbl.textContent;
                input.addEventListener('input', () => {
                    lbl.textContent = input.value;
                    onChange?.();
                });
                addField(labelNames[i] || out('Label'), input);
            });

            return container;
        }
    },

    mount: function (element, options) {
        const opts = {
            target: options.target || '',
            mode: options.mode === 'evergreen' ? 'evergreen' : 'date',
            evergreenHours: parseFloat(options.evergreenHours) || 24,
            expiredText: options.expiredText || '',
            accentColor: options.accentColor || '#3b82f6'
        };

        const grid = element.querySelector('.cd-grid');
        if (!grid) return {};

        element.style.setProperty('--cd-accent', opts.accentColor);
        element.setAttribute('role', 'timer');

        const expiredEl = element.querySelector('.cd-expired');
        if (expiredEl && opts.expiredText) expiredEl.textContent = opts.expiredText;

        const values = {};
        element.querySelectorAll('.cd-value').forEach((v) => { values[v.dataset.unit] = v; });

        // Resolve the target time (ms)
        let targetMs = 0;
        if (opts.mode === 'evergreen') {
            const key = 'cd-eg-' + (element.id || '') + '-' + opts.evergreenHours;
            let start = parseInt(window.localStorage ? localStorage.getItem(key) : '', 10);
            if (!start) {
                start = Date.now();
                try { localStorage.setItem(key, String(start)); } catch (e) { /* storage may be unavailable */ }
            }
            targetMs = start + opts.evergreenHours * 3600 * 1000;
        } else {
            const d = new Date(opts.target);
            targetMs = isNaN(d.getTime()) ? 0 : d.getTime();
        }

        const pad = (n) => String(n).padStart(2, '0');
        let timer = null;

        const tick = () => {
            const diff = targetMs - Date.now();
            if (diff <= 0) {
                Object.keys(values).forEach((u) => { values[u].textContent = '00'; });
                element.classList.add('is-expired');
                if (timer) { clearInterval(timer); timer = null; }
                return;
            }
            element.classList.remove('is-expired');
            const s = Math.floor(diff / 1000);
            if (values.days) values.days.textContent = pad(Math.floor(s / 86400));
            if (values.hours) values.hours.textContent = pad(Math.floor((s % 86400) / 3600));
            if (values.minutes) values.minutes.textContent = pad(Math.floor((s % 3600) / 60));
            if (values.seconds) values.seconds.textContent = pad(s % 60);
        };

        tick();
        // Only tick if there's a valid future target (or evergreen)
        if (targetMs > 0) timer = setInterval(tick, 1000);

        return {
            destroy() { if (timer) clearInterval(timer); }
        };
    },

    unmount: function (element, instance) {
        if (instance && instance.destroy) instance.destroy();
    }
};
