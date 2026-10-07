# Team Members

A responsive grid of team cards — photo, name, role, optional bio, and social links. Add / remove / reorder members and edit each (including per-member social links) from the editor.

- **Server-side required:** No — purely client-side.
- **External dependencies:** None at runtime. (The editor loads SortableJS from a CDN on demand, only for drag-to-reorder inside the settings panel.)

## Embed code

```html
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
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-columns` | 1–4 | `3` | Columns |
| `data-cb-image-shape` | `circle` / `rounded` / `square` | `circle` | Photo shape |
| `data-cb-show-bio` | `true` / `false` | `true` | Show/hide the bio line |
| `data-cb-accent-color` | any CSS color | `#3b82f6` | Role text, social hover, focus |
| `data-cb-shadow` | `true` / `false` | `true` | Card shadow (flat when off) |
| `data-cb-rounded` | `true` / `false` | `true` | Rounded card corners |

## Editor

- Add / remove / reorder members; per member: name, role, bio, photo (with the image picker), and social links.
- **Social links:** LinkedIn, Twitter/X, GitHub, Instagram, Website — enter a URL to show that icon link; clear it to hide. Icons are inline SVG (no external requests).

## Structure notes

- Each card is a `.team-card` with a `.team-photo` image and a `.team-info` block (`.team-name`, `.team-role`, `.team-bio`, `.team-social`).
- Social links are `<a class="team-link" data-network="…">` inside `.team-social`; the network's icon is inlined. The editor manages them — don't hand-edit.
- Bio and photo are optional (remove them / clear the field and the layout adjusts).

## Dark mode

Dark mode for the rendered block is the site's responsibility. Colors are CSS variables and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selector at your site's theme trigger. The accent color stays as configured.

All styling is scoped under `[data-cb-type="team-members"]`.
