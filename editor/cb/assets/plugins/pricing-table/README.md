# Pricing Table

A responsive pricing/plans block with an optional **Monthly / Annually** toggle, a highlighted "featured" plan, per-plan badges, and a features list (with included / not-included states).

- **Server-side required:** No — this is a purely client-side block.
- **External dependencies:** None at runtime. (The editor loads SortableJS from a CDN on demand, only for drag-to-reorder inside the settings panel.)

## Embed code

```html
<div data-cb-type="pricing-table" data-cb-columns="3" data-cb-currency="$" data-cb-accent-color="#3b82f6" data-cb-billing-toggle="true" data-cb-monthly-label="Monthly" data-cb-annually-label="Annually" data-cb-save-label="Save 20%" data-cb-default-period="monthly" data-cb-shadow="true" data-cb-rounded="true" role="region" aria-label="Pricing plans">
    <div class="pricing-billing-toggle" role="group" aria-label="Billing period">
        <button type="button" class="billing-option is-active" data-period="monthly">Monthly</button>
        <button type="button" class="billing-option" data-period="annually">Annually <span class="billing-save">Save 20%</span></button>
    </div>
    <div class="pricing-grid">
        <div class="pricing-plan">
            <div class="plan-header">
                <h3 class="plan-name">Starter</h3>
                <p class="plan-description">For individuals getting started</p>
            </div>
            <div class="plan-price">
                <span class="price-currency">$</span><span class="price-amount" data-monthly="9" data-annually="90">9</span><span class="price-period">/mo</span>
            </div>
            <ul class="plan-features">
                <li>1 project</li>
                <li>Up to 5 pages</li>
                <li class="feature-disabled">Priority support</li>
            </ul>
            <a href="#" class="plan-button">Get Started</a>
        </div>
        <div class="pricing-plan is-featured">
            <div class="plan-badge">Most Popular</div>
            <div class="plan-header">
                <h3 class="plan-name">Pro</h3>
                <p class="plan-description">For growing teams</p>
            </div>
            <div class="plan-price">
                <span class="price-currency">$</span><span class="price-amount" data-monthly="29" data-annually="290">29</span><span class="price-period">/mo</span>
            </div>
            <ul class="plan-features">
                <li>Unlimited projects</li>
                <li>Unlimited pages</li>
                <li>Priority support</li>
            </ul>
            <a href="#" class="plan-button">Get Started</a>
        </div>
        <div class="pricing-plan">
            <div class="plan-header">
                <h3 class="plan-name">Enterprise</h3>
                <p class="plan-description">For large organizations</p>
            </div>
            <div class="plan-price">
                <span class="price-currency">$</span><span class="price-amount" data-monthly="99" data-annually="990">99</span><span class="price-period">/mo</span>
            </div>
            <ul class="plan-features">
                <li>Everything in Pro</li>
                <li>Dedicated manager</li>
                <li>Custom integrations</li>
            </ul>
            <a href="#" class="plan-button">Contact Sales</a>
        </div>
    </div>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-columns` | 1–4 | `3` | Number of plan columns |
| `data-cb-currency` | any string | `$` | Currency symbol shown before each price |
| `data-cb-billing-toggle` | `true` / `false` | `true` | Show the Monthly / Annually switch |
| `data-cb-monthly-label` | text | `Monthly` | Text of the monthly toggle button |
| `data-cb-annually-label` | text | `Annually` | Text of the annually toggle button |
| `data-cb-save-label` | text | `Save 20%` | Small badge next to the annually label (empty = hidden) |
| `data-cb-default-period` | `monthly` / `annually` | `monthly` | Which price is shown first |
| `data-cb-accent-color` | any CSS color | `#3b82f6` | Accent used for the featured plan, badge, checks, buttons |
| `data-cb-shadow` | `true` / `false` | `true` | Card shadow (resting + hover). Set `false` for a flat, minimalist look |
| `data-cb-rounded` | `true` / `false` | `true` | Rounded corners on cards/buttons/badges. Set `false` for square corners |

## Structure notes

- **Monthly / annual prices** live on each `.price-amount` as `data-monthly` and `data-annually`. The toggle swaps the displayed number and the `/mo` ↔ `/yr` suffix at runtime.
- **Featured plan:** add `is-featured` to a `.pricing-plan`.
- **Badge:** add a `<div class="plan-badge">…</div>` as the first child of a plan (omit for no badge).
- **Not-included feature:** add `feature-disabled` to an `<li>` (renders struck-through with an ✗).

All styling is scoped under `[data-cb-type="pricing-table"]`, so it never affects the rest of the page.

## Dark mode

**Dark mode is the site's responsibility** (your site owns its theme and toggle). To make it easy, every color is a CSS variable and `style.css` ships a ready-made dark palette **commented out**. To enable it: uncomment that block and change the selector (`.dark`, `[data-theme="dark"]`, `@media (prefers-color-scheme: dark)`, …) to match your site's theme system. The accent color stays as configured.

> `.dark` is also the ContentBuilder editor's own UI theme — on a page that runs the editor, key your site's dark mode to a *different* class so the editor doesn't repaint your content while you edit.
