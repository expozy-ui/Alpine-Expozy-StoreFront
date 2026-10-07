/*
Team Members plugin for ContentBuilder / ContentBox

A responsive grid of team cards: photo, name, role, optional bio, and social
links. Content lives in semantic HTML; mount() only applies layout + accent.
Add / remove / reorder members and edit them (incl. per-member social links)
from the custom editor.

Usage (embed this HTML into your content):

<div data-cb-type="team-members" data-cb-columns="3" data-cb-image-shape="circle" data-cb-show-bio="true" data-cb-accent-color="#3b82f6" data-cb-shadow="true" data-cb-rounded="true" role="region" aria-label="Team members">
    <div class="team-grid">
        <div class="team-card">
            <img class="team-photo" src="assets/minimalist-blocks/images/ai-cvlfg.jpg" alt="Jane Doe">
            <div class="team-info">
                <h3 class="team-name">Jane Doe</h3>
                <p class="team-role">CEO &amp; Founder</p>
                <p class="team-bio">Leads product and vision.</p>
                <div class="team-social"></div>
            </div>
        </div>
        <div class="team-card">
            <img class="team-photo" src="assets/minimalist-blocks/images/ai-XUe84.jpg" alt="Mark Lee">
            <div class="team-info">
                <h3 class="team-name">Mark Lee</h3>
                <p class="team-role">Head of Engineering</p>
                <p class="team-bio">Builds the platform.</p>
                <div class="team-social"></div>
            </div>
        </div>
        <div class="team-card">
            <img class="team-photo" src="assets/minimalist-blocks/images/ai-HzKor.jpg" alt="Sara Kim">
            <div class="team-info">
                <h3 class="team-name">Sara Kim</h3>
                <p class="team-role">Design Lead</p>
                <p class="team-bio">Owns the experience.</p>
                <div class="team-social"></div>
            </div>
        </div>
    </div>
</div>
*/

const SOCIALS = [
    { key: 'linkedin', label: 'LinkedIn', icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 17V9.99H6V17h2.34zM7.17 8.9a1.36 1.36 0 1 0 0-2.71 1.36 1.36 0 0 0 0 2.7zM18 17v-3.86c0-2.06-.44-3.64-2.85-3.64-1.16 0-1.93.63-2.25 1.23h-.03V9.99H10.6V17h2.34v-3.47c0-.92.17-1.8 1.3-1.8 1.13 0 1.14 1.05 1.14 1.86V17H18z"/></svg>' },
    { key: 'twitter', label: 'Twitter / X', icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-7.6 8.7L23.3 22h-6.9l-5.4-7-6.2 7H1.7l8.1-9.3L.9 2h7l4.9 6.5L18.9 2zm-1.2 18h1.9L7.3 4H5.3l12.4 16z"/></svg>' },
    { key: 'github', label: 'GitHub', icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>' },
    { key: 'instagram', label: 'Instagram', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>' },
    { key: 'website', label: 'Website', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/></svg>' }
];

export default {
    name: 'team-members',
    displayName: 'Team Members',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'layout', label: 'Layout', fields: ['columns', 'imageShape'] },
            { id: 'display', label: 'Display', fields: ['showBio'] },
            { id: 'appearance', label: 'Appearance', fields: ['accentColor', 'shadow', 'rounded'] }
        ],
        columns: { type: 'number', label: 'Columns', default: 3, min: 1, max: 4, group: 'layout' },
        imageShape: {
            type: 'select',
            label: 'Photo Shape',
            default: 'circle',
            options: [
                { value: 'circle', label: 'Circle' },
                { value: 'rounded', label: 'Rounded' },
                { value: 'square', label: 'Square' }
            ],
            group: 'layout'
        },
        showBio: { type: 'boolean', label: 'Show Bio', default: true, group: 'display' },
        accentColor: { type: 'color', label: 'Accent Color', default: '#3b82f6', group: 'appearance' },
        shadow: { type: 'boolean', label: 'Card Shadow', default: true, group: 'appearance' },
        rounded: { type: 'boolean', label: 'Rounded Corners', default: true, group: 'appearance' }
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

            const grid = element.querySelector('.team-grid');
            if (!grid) return container;

            const stack = document.createElement('div');
            stack.className = 'cbx-stack';
            container.appendChild(stack);

            const createEditor = (card, index) => {
                const item = document.createElement('div');
                item.className = 'cbx-item';
                item.dataset.memberId = card.dataset.memberId || `m-${Date.now()}-${index}`;
                card.dataset.memberId = item.dataset.memberId;

                const head = document.createElement('div');
                head.className = 'cbx-item-head';
                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                const title = document.createElement('span');
                title.className = 'cbx-title';
                title.textContent = card.querySelector('.team-name')?.textContent || `${out('Member')} ${index + 1}`;
                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'cbx-iconbtn is-danger';
                del.setAttribute('aria-label', out('Delete member'));
                del.innerHTML = '<svg><use xlink:href="#icon-trash2"></use></svg>';
                del.onclick = (e) => { e.preventDefault(); card.remove(); item.remove(); onChange?.(); };
                head.append(drag, title, del);

                const body = document.createElement('div');
                body.className = 'cbx-item-body';
                body.style.display = 'none';

                const addField = (labelText, control) => {
                    const f = document.createElement('div');
                    f.className = 'cbx-field';
                    const l = document.createElement('label');
                    l.textContent = labelText;
                    f.append(l, control);
                    body.appendChild(f);
                    return f;
                };

                const setText = (selector, tag, parentSelector, value) => {
                    let el = card.querySelector(selector);
                    if (!el && value) {
                        el = document.createElement(tag);
                        el.className = selector.replace('.', '');
                        card.querySelector(parentSelector)?.appendChild(el);
                    }
                    if (el) el.textContent = value;
                };

                // Name
                const nameIn = document.createElement('input');
                nameIn.type = 'text';
                nameIn.value = card.querySelector('.team-name')?.textContent || '';
                nameIn.placeholder = out('Full name');
                nameIn.addEventListener('input', () => {
                    setText('.team-name', 'h3', '.team-info', nameIn.value);
                    const photo = card.querySelector('.team-photo');
                    if (photo) photo.alt = nameIn.value;
                    title.textContent = nameIn.value || `${out('Member')} ${index + 1}`;
                    onChange?.();
                });
                addField(out('Name'), nameIn);

                // Role
                const roleIn = document.createElement('input');
                roleIn.type = 'text';
                roleIn.value = card.querySelector('.team-role')?.textContent || '';
                roleIn.placeholder = out('Role / title');
                roleIn.addEventListener('input', () => { setText('.team-role', 'p', '.team-info', roleIn.value); onChange?.(); });
                addField(out('Role'), roleIn);

                // Bio
                const bioIn = document.createElement('textarea');
                bioIn.rows = 2;
                bioIn.value = card.querySelector('.team-bio')?.textContent || '';
                bioIn.placeholder = out('Short bio (optional)');
                bioIn.addEventListener('input', () => { setText('.team-bio', 'p', '.team-info', bioIn.value); onChange?.(); });
                addField(out('Bio'), bioIn);

                // Photo URL + browse
                const photoIn = document.createElement('input');
                photoIn.type = 'text';
                photoIn.className = 'cbx-grow';
                photoIn.placeholder = out('Photo URL');
                photoIn.value = card.querySelector('.team-photo')?.getAttribute('src') || '';
                const setPhoto = (url) => {
                    let img = card.querySelector('.team-photo');
                    if (url) {
                        if (!img) { img = document.createElement('img'); img.className = 'team-photo'; card.insertBefore(img, card.firstChild); }
                        img.src = url;
                        img.alt = nameIn.value;
                    } else if (img) { img.remove(); }
                    onChange?.();
                };
                photoIn.addEventListener('input', () => setPhoto(photoIn.value.trim()));
                const photoField = document.createElement('div');
                photoField.className = 'cbx-field';
                const photoLabel = document.createElement('label');
                photoLabel.textContent = out('Photo');
                const photoRow = document.createElement('div');
                photoRow.className = 'cbx-row';
                photoRow.append(photoIn, ...builder.createFileButtons('image', (url) => { photoIn.value = url; setPhoto(url); }));
                photoField.append(photoLabel, photoRow);
                body.appendChild(photoField);

                // Social links
                let social = card.querySelector('.team-social');
                if (!social) { social = document.createElement('div'); social.className = 'team-social'; card.querySelector('.team-info')?.appendChild(social); }
                SOCIALS.forEach((net) => {
                    const link = social.querySelector(`a[data-network="${net.key}"]`);
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = link?.getAttribute('href') || '';
                    input.placeholder = `https://…`;
                    input.addEventListener('input', () => {
                        const url = input.value.trim();
                        let a = social.querySelector(`a[data-network="${net.key}"]`);
                        if (url) {
                            if (!a) {
                                a = document.createElement('a');
                                a.className = 'team-link';
                                a.dataset.network = net.key;
                                a.target = '_blank';
                                a.rel = 'noopener noreferrer';
                                a.setAttribute('aria-label', net.label);
                                a.innerHTML = net.icon;
                                social.appendChild(a);
                            }
                            a.setAttribute('href', url);
                        } else if (a) { a.remove(); }
                        onChange?.();
                    });
                    addField(net.label, input);
                });

                head.addEventListener('click', (e) => {
                    if (e.target.closest('.cbx-drag') || e.target.closest('button')) return;
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                item.append(head, body);
                return item;
            };

            grid.querySelectorAll('.team-card').forEach((card, i) => stack.appendChild(createEditor(card, i)));

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function () {
                        const map = new Map();
                        grid.querySelectorAll('.team-card').forEach((c) => { if (c.dataset.memberId) map.set(c.dataset.memberId, c); });
                        Array.from(stack.children).forEach((ed) => { const c = map.get(ed.dataset.memberId); if (c) grid.appendChild(c); });
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag optional */ });

            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Member');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const card = document.createElement('div');
                card.className = 'team-card';
                card.dataset.memberId = `m-${Date.now()}`;
                card.innerHTML = `
                    <img class="team-photo" src="https://placehold.co/300x300?text=%20" alt="New member">
                    <div class="team-info">
                        <h3 class="team-name">New Member</h3>
                        <p class="team-role">Role</p>
                        <p class="team-bio">Short bio.</p>
                        <div class="team-social"></div>
                    </div>
                `;
                grid.appendChild(card);
                stack.appendChild(createEditor(card, stack.children.length));
                onChange?.();
            };
            container.appendChild(addBtn);

            return container;
        }
    },

    mount: function (element, options) {
        const opts = {
            columns: parseInt(options.columns) || 3,
            accentColor: options.accentColor || '#3b82f6'
        };
        const grid = element.querySelector('.team-grid');
        if (!grid) return {};

        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = `repeat(${opts.columns}, 1fr)`;
        element.style.setProperty('--tm-accent', opts.accentColor);

        element.setAttribute('role', 'region');
        if (!element.getAttribute('aria-label')) element.setAttribute('aria-label', 'Team members');

        return {};
    },

    unmount: function () {}
};
