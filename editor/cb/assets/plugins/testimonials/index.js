/*
Testimonials plugin for ContentBuilder / ContentBox

A responsive grid of testimonial cards (quote, avatar, name, role, star rating).
The content lives in semantic HTML (figure/blockquote/figcaption) for SEO/a11y;
mount() only applies layout + accent. The field editor manages the cards.

Usage (embed this HTML into your content):

<div data-cb-type="testimonials" data-cb-columns="3" data-cb-variant="cards" data-cb-background="solid" data-cb-bg-color="#ffffff" data-cb-border-color="#e5e7eb" data-cb-gap="24" data-cb-show-rating="true" data-cb-accent-color="#3b82f6" data-cb-rounded="true" data-cb-hover="lift" role="region" aria-label="Testimonials">
    <div class="testimonials-grid">
        <figure class="testimonial">
            <div class="testimonial-rating" data-rating="5" aria-label="Rated 5 out of 5">
                <span class="star is-filled">★</span><span class="star is-filled">★</span><span class="star is-filled">★</span><span class="star is-filled">★</span><span class="star is-filled">★</span>
            </div>
            <blockquote class="testimonial-quote"><p>This tool completely changed how our team ships pages. Worth every penny.</p></blockquote>
            <figcaption class="testimonial-author">
                <img class="testimonial-avatar" src="assets/minimalist-blocks/images/ai-cvlfg.jpg" alt="Jane Doe">
                <span class="testimonial-meta">
                    <span class="testimonial-name">Jane Doe</span>
                    <span class="testimonial-role">CEO, Acme</span>
                </span>
            </figcaption>
        </figure>
        <figure class="testimonial">
            <div class="testimonial-rating" data-rating="5" aria-label="Rated 5 out of 5">
                <span class="star is-filled">★</span><span class="star is-filled">★</span><span class="star is-filled">★</span><span class="star is-filled">★</span><span class="star is-filled">★</span>
            </div>
            <blockquote class="testimonial-quote"><p>Setup took minutes and support was fantastic. Highly recommend.</p></blockquote>
            <figcaption class="testimonial-author">
                <img class="testimonial-avatar" src="assets/minimalist-blocks/images/ai-XUe84.jpg" alt="Mark Lee">
                <span class="testimonial-meta">
                    <span class="testimonial-name">Mark Lee</span>
                    <span class="testimonial-role">Founder, Bright</span>
                </span>
            </figcaption>
        </figure>
        <figure class="testimonial">
            <div class="testimonial-rating" data-rating="4" aria-label="Rated 4 out of 5">
                <span class="star is-filled">★</span><span class="star is-filled">★</span><span class="star is-filled">★</span><span class="star is-filled">★</span><span class="star">★</span>
            </div>
            <blockquote class="testimonial-quote"><p>A polished experience with just the right amount of flexibility.</p></blockquote>
            <figcaption class="testimonial-author">
                <img class="testimonial-avatar" src="assets/minimalist-blocks/images/ai-HzKor.jpg" alt="Sara Kim">
                <span class="testimonial-meta">
                    <span class="testimonial-name">Sara Kim</span>
                    <span class="testimonial-role">Designer, Studio</span>
                </span>
            </figcaption>
        </figure>
    </div>
</div>
*/

// Render 5 stars into a rating element, filled up to `rating`
function renderStars(ratingEl, rating) {
    const r = Math.max(0, Math.min(5, parseInt(rating) || 0));
    ratingEl.dataset.rating = String(r);
    ratingEl.setAttribute('aria-label', `Rated ${r} out of 5`);
    ratingEl.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'star' + (i <= r ? ' is-filled' : '');
        star.textContent = '★';
        ratingEl.appendChild(star);
    }
}

export default {
    name: 'testimonials',
    displayName: 'Testimonials',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'layout', label: 'Layout', fields: ['columns', 'variant', 'background', 'bgColor', 'borderColor', 'gap', 'hover', 'rounded'] },
            { id: 'display', label: 'Display', fields: ['showRating'] },
            { id: 'appearance', label: 'Appearance', fields: ['accentColor'] }
        ],
        columns: { type: 'number', label: 'Columns', default: 3, min: 1, max: 4, group: 'layout' },
        variant: {
            type: 'select', label: 'Style', default: 'cards',
            options: [
                { value: 'cards', label: 'Cards' },
                { value: 'minimal', label: 'Minimal (no card)' },
                { value: 'divided', label: 'Divided (vertical lines)' }
            ],
            group: 'layout'
        },
        background: {
            type: 'select', label: 'Background (Cards)', default: 'solid',
            options: [
                { value: 'solid', label: 'Solid' },
                { value: 'transparent', label: 'Transparent' },
                { value: 'glass', label: 'Glass (blur)' }
            ],
            group: 'layout'
        },
        bgColor: { type: 'color', label: 'Background Color', default: '#ffffff', group: 'layout' },
        borderColor: { type: 'color', label: 'Border Color (Cards)', default: '#e5e7eb', group: 'layout' },
        gap: { type: 'number', label: 'Gap', default: 24, min: 0, max: 80, step: 4, unit: 'px', group: 'layout' },
        hover: {
            type: 'select', label: 'Hover Effect', default: 'lift',
            options: [
                { value: 'none', label: 'None' },
                { value: 'lift', label: 'Lift' },
                { value: 'lift-shadow', label: 'Lift + Shadow (Cards)' }
            ],
            group: 'layout'
        },
        rounded: { type: 'boolean', label: 'Rounded Corners (Cards)', default: true, group: 'layout' },
        showRating: { type: 'boolean', label: 'Show Star Ratings', default: true, group: 'display' },
        accentColor: { type: 'color', label: 'Accent Color', default: '#3b82f6', group: 'appearance' }
    },

    editor: {
        openContentEditor: function (element, builder, onChange) {
            // Translate editor-UI labels via the builder's language file (out()).
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

            const grid = element.querySelector('.testimonials-grid');
            if (!grid) return container;

            const stack = document.createElement('div');
            stack.className = 'cbx-stack';
            container.appendChild(stack);

            const createEditor = (card, index) => {
                const item = document.createElement('div');
                item.className = 'cbx-item';
                item.dataset.cardId = card.dataset.cardId || `t-${Date.now()}-${index}`;
                card.dataset.cardId = item.dataset.cardId;

                const head = document.createElement('div');
                head.className = 'cbx-item-head';
                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                const title = document.createElement('span');
                title.className = 'cbx-title';
                title.textContent = card.querySelector('.testimonial-name')?.textContent || `Testimonial ${index + 1}`;
                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'cbx-iconbtn is-danger';
                del.setAttribute('aria-label', out('Delete testimonial'));
                del.innerHTML = '<svg><use xlink:href="#icon-trash2"></use></svg>';
                del.onclick = (e) => { e.preventDefault(); card.remove(); item.remove(); onChange?.(); };
                head.append(drag, title, del);

                const body = document.createElement('div');
                body.className = 'cbx-item-body';
                body.style.display = 'none';

                const addField = (labelText, input) => {
                    const f = document.createElement('div');
                    f.className = 'cbx-field';
                    const l = document.createElement('label');
                    l.textContent = out(labelText);
                    f.append(l, input);
                    body.appendChild(f);
                    return f;
                };

                // Quote
                const quoteIn = document.createElement('textarea');
                quoteIn.rows = 3;
                quoteIn.value = card.querySelector('.testimonial-quote')?.textContent.trim() || '';
                quoteIn.placeholder = out('Testimonial text');
                let qTimer;
                quoteIn.addEventListener('input', () => {
                    clearTimeout(qTimer);
                    qTimer = setTimeout(() => {
                        let q = card.querySelector('.testimonial-quote');
                        if (!q) return;
                        let p = q.querySelector('p');
                        if (!p) { p = document.createElement('p'); q.innerHTML = ''; q.appendChild(p); }
                        p.textContent = quoteIn.value;
                        onChange?.();
                    }, 300);
                });
                addField('Quote', quoteIn);

                // Name
                const nameIn = document.createElement('input');
                nameIn.type = 'text';
                nameIn.value = card.querySelector('.testimonial-name')?.textContent || '';
                nameIn.placeholder = out('Full name');
                nameIn.addEventListener('input', () => {
                    const el = card.querySelector('.testimonial-name');
                    if (el) el.textContent = nameIn.value;
                    const avatar = card.querySelector('.testimonial-avatar');
                    if (avatar) avatar.alt = nameIn.value;
                    title.textContent = nameIn.value || `Testimonial ${index + 1}`;
                    onChange?.();
                });
                addField('Name', nameIn);

                // Role
                const roleIn = document.createElement('input');
                roleIn.type = 'text';
                roleIn.value = card.querySelector('.testimonial-role')?.textContent || '';
                roleIn.placeholder = out('Role, company');
                roleIn.addEventListener('input', () => {
                    let el = card.querySelector('.testimonial-role');
                    if (!el) {
                        el = document.createElement('span');
                        el.className = 'testimonial-role';
                        card.querySelector('.testimonial-meta')?.appendChild(el);
                    }
                    el.textContent = roleIn.value;
                    onChange?.();
                });
                addField('Role', roleIn);

                // Avatar URL + browse — label on top, then a row of [input, button]
                const avatarIn = document.createElement('input');
                avatarIn.type = 'text';
                avatarIn.className = 'cbx-grow';
                avatarIn.placeholder = out('Avatar image URL');
                avatarIn.value = card.querySelector('.testimonial-avatar')?.getAttribute('src') || '';
                const setAvatar = (url) => {
                    let img = card.querySelector('.testimonial-avatar');
                    const fig = card.querySelector('.testimonial-author');
                    if (url) {
                        if (!img) {
                            img = document.createElement('img');
                            img.className = 'testimonial-avatar';
                            fig?.insertBefore(img, fig.firstChild);
                        }
                        img.src = url;
                        img.alt = nameIn.value;
                    } else if (img) {
                        img.remove();
                    }
                    onChange?.();
                };
                avatarIn.addEventListener('input', () => setAvatar(avatarIn.value.trim()));
                const avatarField = document.createElement('div');
                avatarField.className = 'cbx-field';
                const avatarLabelEl = document.createElement('label');
                avatarLabelEl.textContent = out('Avatar');
                const avatarRow = document.createElement('div');
                avatarRow.className = 'cbx-row';
                avatarRow.append(avatarIn, ...builder.createFileButtons('image', (url) => { avatarIn.value = url; setAvatar(url); }));
                avatarField.append(avatarLabelEl, avatarRow);
                body.appendChild(avatarField);

                // Rating
                const ratingSel = document.createElement('select');
                for (let i = 5; i >= 1; i--) {
                    const o = document.createElement('option');
                    o.value = String(i);
                    o.textContent = `${i} star${i > 1 ? 's' : ''}`;
                    if (parseInt(card.querySelector('.testimonial-rating')?.dataset.rating) === i) o.selected = true;
                    ratingSel.appendChild(o);
                }
                ratingSel.addEventListener('change', () => {
                    const el = card.querySelector('.testimonial-rating');
                    if (el) renderStars(el, ratingSel.value);
                    onChange?.();
                });
                addField('Rating', ratingSel);

                head.addEventListener('click', (e) => {
                    if (e.target.closest('.cbx-drag') || e.target.closest('button')) return;
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                item.append(head, body);
                return item;
            };

            grid.querySelectorAll('.testimonial').forEach((card, i) => stack.appendChild(createEditor(card, i)));

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function () {
                        const map = new Map();
                        grid.querySelectorAll('.testimonial').forEach((c) => {
                            if (c.dataset.cardId) map.set(c.dataset.cardId, c);
                        });
                        Array.from(stack.children).forEach((ed) => {
                            const c = map.get(ed.dataset.cardId);
                            if (c) grid.appendChild(c);
                        });
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag optional */ });

            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Testimonial');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const card = document.createElement('figure');
                card.className = 'testimonial';
                card.dataset.cardId = `t-${Date.now()}`;
                card.innerHTML = `
                    <div class="testimonial-rating" data-rating="5" aria-label="Rated 5 out of 5">
                        <span class="star is-filled">★</span><span class="star is-filled">★</span><span class="star is-filled">★</span><span class="star is-filled">★</span><span class="star is-filled">★</span>
                    </div>
                    <blockquote class="testimonial-quote"><p>Add the testimonial text here.</p></blockquote>
                    <figcaption class="testimonial-author">
                        <img class="testimonial-avatar" src="https://placehold.co/96x96?text=%20" alt="New person">
                        <span class="testimonial-meta">
                            <span class="testimonial-name">New Person</span>
                            <span class="testimonial-role">Role, Company</span>
                        </span>
                    </figcaption>
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
        const grid = element.querySelector('.testimonials-grid');
        if (!grid) return {};

        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = `repeat(${opts.columns}, 1fr)`;
        grid.style.gap = `${options.gap != null ? +options.gap : 24}px`;
        element.style.setProperty('--tst-accent', opts.accentColor);
        element.style.setProperty('--tst-surface', options.bgColor || '#ffffff');
        element.style.setProperty('--tst-border', options.borderColor || '#e5e7eb');

        element.setAttribute('role', 'region');
        if (!element.getAttribute('aria-label')) element.setAttribute('aria-label', 'Testimonials');

        return {};
    },

    unmount: function () {}
};
