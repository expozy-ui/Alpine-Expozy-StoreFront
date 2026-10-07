# YouTube

Embeds a YouTube video from any YouTube link — `watch`, `youtu.be`, `/embed/`, `/shorts/`, `/live/`, or a raw 11-character ID. Advanced but easy: a **click-to-load** thumbnail facade (loads the heavy player only when clicked, so the page stays fast), **privacy mode** (`youtube-nocookie`), start time, autoplay/mute/loop/controls, a related-videos toggle, aspect ratio, and corner radius.

- **Server-side required:** No.
- **API key required:** No — uses YouTube's standard iframe embed and public thumbnails.
- **External dependencies:** Loads a YouTube iframe (and a thumbnail image) at runtime — needs internet.

## Embed code

```html
<div data-cb-type="youtube-embed" data-cb-video="https://www.youtube.com/watch?v=aqz-KE-bpKQ" data-cb-start-time="0" data-cb-click-to-load="true" data-cb-autoplay="false" data-cb-mute="false" data-cb-loop="false" data-cb-controls="true" data-cb-no-cookie="true" data-cb-related-videos="false" data-cb-aspect-ratio="16/9" data-cb-border-radius="12">
    <div class="yt-embed-frame"></div>
</div>
```

`mount` builds the player (or the facade) inside `.yt-embed-frame`, so no stale `<iframe>` is saved in your content — the frame is just an empty container.

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-video` | YouTube URL or 11-char ID | *(Big Buck Bunny)* | The video. A `?t=` start time in the link is picked up automatically |
| `data-cb-start-time` | number (s) | `0` | Start the video at this many seconds (overrides a `?t=` in the link) |
| `data-cb-click-to-load` | `true` / `false` | `true` | Show a thumbnail + play button and load the player only on click (faster page). Ignored when autoplay is on |
| `data-cb-autoplay` | `true` / `false` | `false` | Autoplay — forced muted, since browsers block unmuted autoplay |
| `data-cb-mute` | `true` / `false` | `false` | Start muted |
| `data-cb-loop` | `true` / `false` | `false` | Loop the video |
| `data-cb-controls` | `true` / `false` | `true` | Show the player controls |
| `data-cb-no-cookie` | `true` / `false` | `true` | Privacy mode — serve from `youtube-nocookie.com` (no cookies until play) |
| `data-cb-related-videos` | `true` / `false` | `false` | Show related videos when the video ends |
| `data-cb-aspect-ratio` | `16/9`, `4/3`, `1/1`, `21/9`, `9/16` | `16/9` | Frame aspect ratio (`9/16` for Shorts) |
| `data-cb-border-radius` | 0–64 (px) | `12` | Corner radius of the frame |

## Structure & behavior notes

- **Paste anything.** `mount` extracts the video ID from any common YouTube URL (or a raw ID), so you don't have to hand-build an embed URL.
- **Click-to-load (facade).** With `click-to-load` on, the block shows the video's thumbnail and a play button; the actual YouTube `<iframe>` is only injected when the visitor clicks. That keeps YouTube's scripts off the initial page load — much lighter, and better for Core Web Vitals. Because the click is a real user gesture, the video can start with sound (subject to the Muted option). Turning **autoplay** on skips the facade (it loads the player immediately, muted).
- **Privacy mode** serves the player from `youtube-nocookie.com`, which doesn't set tracking cookies until the visitor actually plays — friendlier for consent/GDPR.
- **Loop** automatically adds `playlist=<id>` (YouTube requires it to loop a single video).
- **In the editor**, the block uses the shared `.iframe-overlay` behavior (`mount` adds the class) so a click selects the block; the player becomes interactive once selected. On the live page it's fully interactive.
- The settings panel is auto-generated (no custom editor) — group order: Video, Playback, Privacy, Appearance.

## Dark mode

The player is YouTube's own iframe and can't be themed. Only the empty-state surface is themeable; `style.css` ships a small commented-out `.dark` override for it. All styling is scoped under `[data-cb-type="youtube-embed"]`.
