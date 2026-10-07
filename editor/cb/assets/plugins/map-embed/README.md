# Map

Embeds an interactive map for an address, place name, `lat,lng` coordinates, or a pasted Google Maps link. Set the location, zoom, map type, and height in the settings panel.

- **Server-side required:** No.
- **API key required:** No — uses Google Maps' keyless `output=embed` endpoint.
- **External dependencies:** Loads a Google Maps iframe at runtime (needs internet).

## Pointing to an exact spot

A place *name* ("Eiffel Tower") is found instantly, but an arbitrary home/office address can land approximately. For a precise pin, give it **coordinates** — two easy ways:

- **Paste a Google Maps link.** Find the spot in Google Maps, copy the URL, and paste it into Location. The plugin pulls the exact coordinates out of the link.
- **Paste `lat,lng`.** In Google Maps, right-click the exact point → **What's here?** → copy the `48.8584, 2.2945` numbers into Location.

## Embed code

```html
<div data-cb-type="map-embed" data-cb-location="Eiffel Tower, Paris, France" data-cb-zoom="14" data-cb-map-type="road" data-cb-size-mode="fixed" data-cb-height="380" data-cb-border-radius="12">
    <div class="map-embed-frame"></div>
</div>
```

## Full-cover map (section background)

Add `data-cb-size-mode="fill"` to the block and it covers its container instead
of taking a pixel height. The container must be positioned and have a height; in
ContentBox, drop it into a section overlay:

```html
<div class="is-section is-box is-section-100">
    <div class="is-overlay">
        <div class="is-overlay-content">
            <div data-cb-type="map-embed" data-cb-location="Eiffel Tower, Paris, France" data-cb-zoom="14" data-cb-map-type="road" data-cb-size-mode="fill">
                <div class="map-embed-frame"></div>
            </div>
        </div>
    </div>
</div>
```

Text placed in the section's container sits above the map, so you can lay an
address or a heading over it.

Size is **set in the HTML, not in the settings panel** — it's a decision that
belongs to whoever places the block, and choosing it for an ordinary in-content
map would collapse the block to nothing. The panel adapts to it: a `fill` map
shows only Location, Zoom, and Map Type, since Height and Border Radius don't
apply.

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-location` | address / place / `lat,lng` / Maps link | `Eiffel Tower, Paris, France` | What the map centers on / marks (a pasted Maps link is resolved to its coordinates) |
| `data-cb-zoom` | 1–20 | `14` | Zoom level |
| `data-cb-map-type` | `road` / `satellite` | `road` | Map style |
| `data-cb-size-mode` | `fixed` / `fill` | `fixed` | `fixed` = pixel height; `fill` = cover the container. **No panel field — set it in the HTML** |
| `data-cb-height` | number (px) | `380` | Frame height (`fixed` only — the field is hidden in the panel otherwise) |
| `data-cb-border-radius` | 0–64 (px) | `12` | Corner radius of the frame (`fixed` only — the field is hidden in the panel otherwise) |

## Notes

- `mount` builds the iframe from the data attributes, so no stale `<iframe>` is saved in your content — the `.map-embed-frame` is just an empty container.
- **In the editor**, a transparent shield covers the map so it isn't interactive (you can still select, drag, and move the block). On the live page the map is fully interactive.
- If the location is empty, the block shows a small "set a location" hint instead of a broken map.
- **Production tip:** the keyless `output=embed` endpoint is convenient but not officially documented by Google. For a guaranteed-supported embed, switch the iframe `src` to the [Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started) (requires an API key), or an [OpenStreetMap](https://www.openstreetmap.org) embed if you prefer a keyless open-data map.

## Dark mode

The embedded map is Google's own iframe and can't be themed. Only the frame surface and the empty-state text are variable-driven; `style.css` ships a small commented-out `.dark` palette for those.

All styling is scoped under `[data-cb-type="map-embed"]`.
