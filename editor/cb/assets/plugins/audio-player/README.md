# Audio / Podcast Player

A themeable player around a native `<audio>` — play/pause, draggable seek with a buffered bar, elapsed/total time, skip back/forward, playback speed, volume, and an optional download button. Set the audio file, title, subtitle, and artwork in the editor; the look and which controls appear are options.

- **Server-side required:** No — purely client-side. (You host the audio file; point the plugin at its URL.)
- **External dependencies:** None.

## Embed code

The `.ap-controls` element is left empty on purpose — `mount` renders the control row into it based on the options.

```html
<div data-cb-type="audio-player" data-cb-accent-color="#3b82f6" data-cb-bg-color="#ffffff" data-cb-text-color="#1a1a1a" data-cb-art-shape="rounded" data-cb-art-size="68" data-cb-corner-radius="14" data-cb-shadow="true" data-cb-border="true" data-cb-skip-buttons="true" data-cb-skip-seconds="15" data-cb-speed-control="true" data-cb-volume-control="true" data-cb-show-time="true" data-cb-download="false" data-cb-loop="false" role="region" aria-label="Audio player">
    <div class="ap-card">
        <img class="ap-art" src="assets/minimalist-blocks/images/ai-cvlfg.jpg" alt="">
        <div class="ap-main">
            <div class="ap-title">Episode 1 — Getting Started</div>
            <div class="ap-subtitle">The Podcast</div>
            <div class="ap-controls"></div>
        </div>
        <audio class="ap-audio" src="assets/minimalist-blocks/example.mp3" preload="metadata"></audio>
    </div>
</div>
```

## Options (`data-cb-*` attributes)

**Appearance**

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-accent-color` | any CSS color | `#3b82f6` | Play button, played bar, handle, active controls |
| `data-cb-bg-color` | any CSS color | `#ffffff` | Card background |
| `data-cb-text-color` | any CSS color | `#1a1a1a` | Title + control text |
| `data-cb-art-shape` | `rounded` / `circle` / `square` | `rounded` | Artwork shape |
| `data-cb-art-size` | `68` / `80` / `100` (px) | `68` | Artwork size (Small / Medium / Large) |
| `data-cb-corner-radius` | 0–40 (px) | `14` | Card corner radius |
| `data-cb-shadow` | `true` / `false` | `true` | Card shadow |
| `data-cb-border` | `true` / `false` | `true` | Card border (turn off for a minimal, borderless look) |

**Controls**

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-skip-buttons` | `true` / `false` | `true` | Show skip back / forward buttons |
| `data-cb-skip-seconds` | 5–60 (s) | `15` | How many seconds each skip jumps |
| `data-cb-speed-control` | `true` / `false` | `true` | Show the playback-speed button (0.75×–2×) |
| `data-cb-volume-control` | `true` / `false` | `true` | Show mute + volume slider |
| `data-cb-show-time` | `true` / `false` | `true` | Show the elapsed / total time |
| `data-cb-download` | `true` / `false` | `false` | Show a download button (links to the audio file) |
| `data-cb-loop` | `true` / `false` | `false` | Loop the track |

## Editor

- **Title** — the track/episode name.
- **Subtitle (optional)** — a second line (podcast/author). Leave empty to hide.
- **Audio File** — URL to the audio (mp3/…), with the file picker (`audio` type).
- **Artwork (optional)** — a cover image; clear it to hide.

## Notes

- **`mount` renders the controls** into `.ap-controls` from the options, then wires them to the hidden `<audio>`. So toggling a control on/off just re-renders — the saved HTML only holds the data (title, subtitle, artwork, audio `src`), never a stale control bar. Existing older embeds upgrade automatically.
- **Playback:** play/pause, drag or click the seek bar (a buffered bar shows how much has loaded), ←/→ keys nudge 5s, skip buttons jump the configured amount, the speed button cycles 1× → 1.25 → 1.5 → 1.75 → 2 → 0.75, and the volume control mutes / sets level. Uses `preload="metadata"` so duration is known without downloading the whole file.
- **Set the `src` on `.ap-audio`** via the editor's Audio File field — nothing plays until a source is set.
- **Accessibility:** the seek bar exposes `role="slider"` + `aria-valuenow`; every control has an `aria-label`; the play button's label toggles Play/Pause.

## Dark mode

Dark mode for the rendered block is the site's responsibility. Colors are CSS variables and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selector at your site's theme trigger. Note: the panel's **Background** and **Text** colors are applied as inline variables (which win over a CSS theme), so leave those at their defaults if you want site dark mode to drive them.

All styling is scoped under `[data-cb-type="audio-player"]`.
