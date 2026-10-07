# Countdown Timer

Counts down to a fixed date/time — or runs an **evergreen** per-visitor countdown (a fixed duration from each visitor's first view, remembered in `localStorage`). Shows days / hours / minutes / seconds with editable labels, and a message when it reaches zero.

- **Server-side required:** No — purely client-side.
- **External dependencies:** None.

## Embed code

```html
<div data-cb-type="countdown-timer" data-cb-target="2026-12-31T23:59" data-cb-mode="date" data-cb-evergreen-hours="24" data-cb-expired-text="This offer has ended." data-cb-size="medium" data-cb-accent-color="#3b82f6" role="timer" aria-label="Countdown">
    <div class="cd-grid">
        <div class="cd-unit"><span class="cd-value" data-unit="days">00</span><span class="cd-label">Days</span></div>
        <div class="cd-unit"><span class="cd-value" data-unit="hours">00</span><span class="cd-label">Hours</span></div>
        <div class="cd-unit"><span class="cd-value" data-unit="minutes">00</span><span class="cd-label">Minutes</span></div>
        <div class="cd-unit"><span class="cd-value" data-unit="seconds">00</span><span class="cd-label">Seconds</span></div>
    </div>
    <div class="cd-expired">This offer has ended.</div>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-target` | `YYYY-MM-DDTHH:mm` (local time) | — | Target date/time (Fixed-date mode). Set it via the editor's date picker |
| `data-cb-mode` | `date` / `evergreen` | `date` | Fixed date, or a per-visitor duration |
| `data-cb-evergreen-hours` | number | `24` | Duration in hours for Evergreen mode |
| `data-cb-expired-text` | string | `This offer has ended.` | Message shown at zero |
| `data-cb-size` | `small` / `medium` / `large` | `medium` | Digit size |
| `data-cb-accent-color` | any CSS color | `#3b82f6` | Digit color |

## Editor

- **Target date & time** — a native date-time picker sets `data-cb-target` (Fixed-date mode).
- **Unit labels** — rename/localize Days / Hours / Minutes / Seconds.
- The rest (mode, evergreen duration, message, size, accent) are in the settings panel.

## Notes

- **Evergreen** stores each visitor's start time in `localStorage`; the countdown resumes across reloads and restarts only when storage is cleared. For multiple evergreen timers on one page, give each block a unique `id` so they don't share the stored start time.
- At zero the digit grid is hidden and the message is shown (`.is-expired` on the block).
- Numbers use tabular figures so they don't jitter as they tick.

## Dark mode

Dark mode for the rendered block is the site's responsibility. Colors are CSS variables and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selector at your site's theme trigger. The accent color stays as configured.

All styling is scoped under `[data-cb-type="countdown-timer"]`.
