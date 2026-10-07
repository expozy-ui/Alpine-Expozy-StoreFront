# Video Background

A full-cover looping background video for a section, with an optional color overlay and optional play/pause & mute controls. Supports **responsive sources** — different video files per screen size, chosen automatically by the browser — plus a poster image for the loading state.

- **Server-side required:** No — purely client-side. (Browsing for video/poster uses the editor's own file picker / upload handler.)
- **External dependencies:** None.

## Embed code

It's a **background layer** — it renders `position: absolute; inset: 0`, so place it inside a **positioned** container that has a height, and let your content sit above it:

```html
<div style="min-height:450px; position:relative;">
    <div data-cb-type="video-background" data-cb-autoplay="true" data-cb-loop="true" data-cb-muted="true" data-cb-plays-inline="true" data-cb-show-overlay="false" data-cb-overlay-opacity="20" data-cb-overlay-color="#000000" data-cb-show-controls="true" data-cb-controls-position="bottom-right">
        <div class="video-bg-wrapper">
            <video>
                <source src="assets/clip.mp4" type="video/mp4">
            </video>
            <div class="video-bg-overlay"></div>
        </div>
    </div>

    <!-- your foreground content here (sits above the video) -->
</div>
```

Content that follows the video-background element is automatically stacked above it (`[data-cb-type="video-background"] ~ * { position: relative; z-index: 1 }`).

## Options (`data-cb-*` attributes)

**Video:** `data-cb-autoplay` (needs muted), `data-cb-loop`, `data-cb-muted`, `data-cb-plays-inline` (all `true`/`false`).

**Controls:** `data-cb-show-play-pause`, `data-cb-show-mute-unmute` (`true`/`false`), `data-cb-controls-position` (`top-left` / `top-right` / `bottom-left` / `bottom-right`).

**Overlay:** `data-cb-show-overlay` (`true`/`false`), `data-cb-overlay-opacity` (0–100%), `data-cb-overlay-color` (any CSS color).

## Responsive sources & poster

Inside `<video>`, sources are chosen by the browser via `media` queries:

```html
<video poster="assets/poster.jpg">
    <source src="assets/4k.mp4"      media="(min-width: 1920px)" type="video/mp4">
    <source src="assets/tablet.mp4"  media="(max-width: 1280px)" type="video/mp4">
    <source src="assets/mobile.mp4"  media="(max-width: 760px)"  type="video/mp4">
    <source src="assets/desktop.mp4" type="video/mp4"> <!-- default (no media) last -->
</video>
```

The editor writes these for you — set a Desktop (default) URL plus optional 4K / Tablet / Mobile URLs, and an optional poster image. The default source (no `media`) is always appended **last**.

**Tips:** compress mobile files harder; MP4 is the most compatible (WebM is smaller); keep loops to ~10–30s; a poster image improves the loading experience.

## Structure & behavior notes

- The video lives in `.video-bg-wrapper` → `<video>` (+ `.video-bg-overlay`). `mount` applies the video attributes, overlay, and (if enabled) builds the play/pause & mute controls. Its listeners are only on elements it creates inside the block, so no teardown is needed.
- The settings-panel editor uses the shared `.cbx-*` panel classes; strings run through `builder.out()` for translation.

## Dark mode

Not applicable as a CSS theme — the visible surface is your video plus a configurable color **overlay** (`overlayColor` / `overlayOpacity`), so tune those to suit a light or dark section. `style.css` also ships a commented-out `@media (prefers-color-scheme: dark)` block if you want a dark loading backdrop.

All styling is scoped under `[data-cb-type="video-background"]`.
