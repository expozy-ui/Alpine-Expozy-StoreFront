/*
Map plugin for ContentBuilder / ContentBox

Embeds an interactive map for an address, place name, "lat,lng", or a pasted
Google Maps link — no API key required (uses Google Maps' keyless output=embed
endpoint). For an exact spot (a home/office Google doesn't list), paste the map
link or the coordinates. Set the location, zoom, type, and height in the settings
panel; mount() builds the iframe.

Size: "fixed" gives the frame a pixel height (normal in-content use). "fill"
makes the block cover its container instead - for a map used as a section
background, e.g. inside ContentBox's .is-overlay-content. Size has no field in
the settings panel: it's set in the HTML that places the block.

Usage (embed this HTML into your content):

<div data-cb-type="map-embed" data-cb-location="Eiffel Tower, Paris, France" data-cb-zoom="14" data-cb-map-type="road" data-cb-size-mode="fixed" data-cb-height="380" data-cb-border-radius="12">
    <div class="map-embed-frame"></div>
</div>

Usage as a full-cover map (ContentBox section overlay):

<div class="is-section is-box is-section-100">
    <div class="is-overlay">
        <div class="is-overlay-content">
            <div data-cb-type="map-embed" data-cb-location="Eiffel Tower, Paris, France" data-cb-zoom="14" data-cb-map-type="road" data-cb-size-mode="fill">
                <div class="map-embed-frame"></div>
            </div>
        </div>
    </div>
</div>
*/

export default {
    name: 'map-embed',
    displayName: 'Map',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'location', label: 'Location', fields: ['location', 'zoom', 'mapType'] },
            { id: 'appearance', label: 'Appearance', fields: ['sizeMode', 'height', 'borderRadius'] }
        ],
        location: {
            type: 'text', label: 'Location', default: 'Eiffel Tower, Paris, France',
            placeholder: 'Address, place, lat,lng, or Google Maps link',
            description: 'Exact spot (home / office)? Paste a Google Maps link, or "lat,lng" — in Google Maps, right-click the point → What\'s here? → copy the numbers.',
            group: 'location'
        },
        zoom: { type: 'number', label: 'Zoom', default: 14, min: 1, max: 20, group: 'location' },
        mapType: {
            type: 'select', label: 'Map Type', default: 'road',
            options: [
                { value: 'road', label: 'Road' },
                { value: 'satellite', label: 'Satellite' }
            ],
            group: 'location'
        },
        // Attribute-only: "fill" is a decision made by whoever places the block
        // (a section snippet dropping the map into an overlay), not by the person
        // editing the page - and choosing it for an in-content map would collapse
        // the block to nothing. Set data-cb-size-mode="fill" in the HTML.
        sizeMode: {
            type: 'select', label: 'Size', default: 'fixed',
            options: [
                { value: 'fixed', label: 'Fixed Height' },
                { value: 'fill', label: 'Fill Container' }
            ],
            hidden: true,
            group: 'appearance'
        },
        // Only meaningful for a fixed-height map; hidden when the map fills its
        // container, where the size and square corners come from the container.
        height: {
            type: 'number', label: 'Height', default: 380, min: 160, max: 800, unit: 'px',
            dependsOn: { field: 'sizeMode', value: 'fixed' }, group: 'appearance'
        },
        borderRadius: {
            type: 'number', label: 'Border Radius', default: 12, min: 0, max: 64, unit: 'px',
            dependsOn: { field: 'sizeMode', value: 'fixed' }, group: 'appearance'
        }
    },

    mount: function (element, options) {
        const frame = element.querySelector('.map-embed-frame');
        if (!frame) return {};

        // Add iframe overlay
        frame.classList.add('iframe-overlay');

        // Fill mode covers the container (its size and square corners come from
        // CSS), so clear any inline values left over from a fixed-height map.
        if (options.sizeMode === 'fill') {
            element.style.removeProperty('--map-height');
            element.style.removeProperty('--map-radius');
        } else {
            const h = parseInt(options.height, 10);
            element.style.setProperty('--map-height', (isFinite(h) && h > 0 ? h : 380) + 'px');

            const r = parseInt(options.borderRadius, 10);
            element.style.setProperty('--map-radius', (isFinite(r) && r >= 0 ? r : 12) + 'px');
        }

        const location = (options.location || '').trim();
        frame.innerHTML = '';

        if (!location) {
            const ph = document.createElement('div');
            ph.className = 'map-embed-empty';
            ph.textContent = 'Set a location in the settings panel.';
            frame.appendChild(ph);
            return {};
        }

        const zoom = Math.max(1, Math.min(20, parseInt(options.zoom, 10) || 14));

        // If a Google Maps link was pasted, pull the exact coordinates out of it so
        // the pin lands on the precise spot (not an approximate address match).
        const extractLatLng = (str) => {
            let m = str.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);   // exact place marker
            if (m) return m[1] + ',' + m[2];
            m = str.match(/[/@](-?\d{1,3}\.\d+),(-?\d{1,3}\.\d+)/);          // /place/lat,lng or @lat,lng
            if (m) return m[1] + ',' + m[2];
            m = str.match(/[?&](?:q|ll)=(-?\d{1,3}\.\d+),(-?\d{1,3}\.\d+)/); // ?q=lat,lng or ?ll=lat,lng
            if (m) return m[1] + ',' + m[2];
            return null;
        };
        let q = location;
        if (/^https?:\/\//i.test(location)) {
            const coords = extractLatLng(location);
            if (coords) q = coords;
        }

        // Map type on the keyless endpoint: m = road, k = satellite.
        const typeMap = { road: 'm', satellite: 'k' };
        const t = typeMap[options.mapType] || 'm';

        const iframe = document.createElement('iframe');
        iframe.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(q) + '&z=' + zoom + '&t=' + t + '&output=embed';
        iframe.title = 'Map: ' + location;
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'no-referrer-when-downgrade';
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('frameborder', '0');
        frame.appendChild(iframe);

        return {};
    },

    unmount: function () {}
};
