# Video Embed

A self-hosted `<video>` player embedded in the content — with aspect-ratio, fit, and corner-radius controls, plus the usual autoplay/loop/muted/controls/inline options and an optional poster image. For a *background* video use the **Video Background** plugin instead; this one is an in-flow player.

- **Server-side required:** No — purely client-side. (Browsing for video/poster uses the editor's own file picker / upload handler.)
- **External dependencies:** None.

## Embed code

```html
<div data-cb-type="video-embed" data-cb-autoplay="false" data-cb-loop="false" data-cb-muted="false" data-cb-controls="true" data-cb-plays-inline="true" data-cb-aspect-ratio="16/9" data-cb-object-fit="cover" data-cb-border-radius="8" data-cb-hover-shadow="true" data-cb-controls-overlay="70">
    <div class="video-wrapper">
        <video>
            <source src="assets/clip.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
</div>
```

## Options (`data-cb-*` attributes)

**Video:** `data-cb-autoplay` (starts muted — browsers require it), `data-cb-loop`, `data-cb-muted`, `data-cb-controls`, `data-cb-plays-inline` (all `true`/`false`).

**Display:**

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-aspect-ratio` | `16/9`, `4/3`, `1/1`, `21/9`, `9/16`, `auto` | `16/9` | Frame aspect ratio (`auto` = the video's own) |
| `data-cb-object-fit` | `cover` / `contain` / `fill` / `none` | `cover` | How the video fills the frame |
| `data-cb-border-radius` | 0–50 (px) | `8` | Corner radius (scales down on smaller screens) |

**Appearance:**

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-hover-shadow` | `true` / `false` | `true` | Drop shadow on the player when hovered |
| `data-cb-controls-overlay` | 0–100 (%) | `70` | Strength of the dark scrim behind the native controls (`0` = none, for a minimalist look) |

## Structure & behavior notes

- The video lives in `.video-wrapper` → `<video>` → `<source>`. `mount` applies the playback attributes and object-fit, sets the aspect ratio, and exposes the radius as a `--border-radius` CSS variable (the stylesheet applies and responsively scales it). No listeners are added, so no teardown is needed.
- `mount` auto-mutes when autoplay is on, since browsers block unmuted autoplay.
- **Hover Shadow** and **Controls Overlay** are exposed as `--ve-hover-shadow` and `--ve-controls-alpha` CSS variables — turn the shadow off, and lower the scrim toward `0` for a cleaner, minimalist player. (The controls scrim is a WebKit control style, so this affects Chrome/Safari; it has no dark overlay to soften elsewhere.)
- The settings-panel editor uses the shared `.cbx-*` panel classes; strings run through `builder.out()` for translation. It has a Video URL field (with a live preview), and an optional Poster Image field.

## Dark mode

Dark mode for the rendered block is the site's responsibility (so the player matches the site's theme, not the visitor's OS). The only theme-dependent color is the wrapper backdrop (letterbox / pre-load), routed through the `--ve-wrapper-bg` variable; `style.css` ships a `.dark` override **commented out** — uncomment it and point the selector at your site's theme trigger. All styling is scoped under `[data-cb-type="video-embed"]`.
