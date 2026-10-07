# Contact / Newsletter Form

A real, accessible `<form>` block with a configurable field set (text, email, phone, textarea, consent checkbox), client-side validation, and submit-via-`fetch` with inline success/error feedback.

- **Server-side required:** **Yes** — you must provide the endpoint that receives the submission (see below).
- **External dependencies:** None at runtime. (The editor loads SortableJS from a CDN on demand, only for drag-to-reorder inside the settings panel.)

## Embed code

```html
<div data-cb-type="contact-form" data-cb-action="/submit-form" data-cb-method="POST" data-cb-button-text="Send Message" data-cb-success-message="Thanks! We'll be in touch soon." data-cb-error-message="Something went wrong. Please try again." data-cb-accent-color="#3b82f6" role="form" aria-label="Contact form">
    <form class="cf-form" novalidate>
        <div class="cf-fields">
            <label class="cf-field">
                <span class="cf-label">Name <span class="cf-req" aria-hidden="true">*</span></span>
                <input type="text" name="name" placeholder="Your name" required>
            </label>
            <label class="cf-field">
                <span class="cf-label">Email <span class="cf-req" aria-hidden="true">*</span></span>
                <input type="email" name="email" placeholder="you@example.com" required>
            </label>
            <label class="cf-field">
                <span class="cf-label">Message</span>
                <textarea name="message" placeholder="How can we help?" rows="4"></textarea>
            </label>
        </div>
        <button type="submit" class="cf-submit">Send Message</button>
        <p class="cf-status" role="status" aria-live="polite"></p>
    </form>
</div>
```

> For a **newsletter** form, delete all fields except Email (and optionally add a consent checkbox) in the field editor.

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-action` | URL / path | `/submit-form` | Where the submission is sent |
| `data-cb-method` | `POST` / `GET` | `POST` | HTTP method |
| `data-cb-button-text` | string | `Send Message` | Submit button label |
| `data-cb-success-message` | string | `Thanks! …` | Shown after a successful submit |
| `data-cb-error-message` | string | `Something went wrong. …` | Shown on a failed submit |
| `data-cb-accent-color` | CSS color | `#3b82f6` | Focus rings, submit button, required `*` |

### Field structure

Each field is a `<label class="cf-field">` with the control **inside** it (implicit label association, so duplicate embeds never collide on ids). A consent checkbox uses `<label class="cf-field cf-check">` with the `<input type="checkbox">` first. Use the plugin's field editor to add/remove/reorder fields rather than editing this by hand.

---

## ⚠️ Server-side implementation (your responsibility)

**ContentBuilder is a client-side product.** This plugin only *sends* the submission — it does **not** include a production backend. Standing up the endpoint at `data-cb-action` (sending the email, storing the lead, spam-protection, auth, rate-limiting, etc.) is the **developer's responsibility**.

The `server.js` route and `public/api/submit-form.php` shipped in this repo are **examples for guidance only** — they simply log the data and return success. Do not use them as-is in production.

### The contract your endpoint must satisfy

1. **Request** — the plugin sends the fields as **`application/x-www-form-urlencoded`** (for `POST`) or as **query-string params** (for `GET`). Field keys are the `name` attributes you set in the editor.
2. **Response** — return an **HTTP 2xx** status for success (any body). Return a **non-2xx** status (4xx/5xx) to trigger the plugin's error message. The response body is not parsed by the plugin.

### Example: Node / Express (from this repo's `server.js`)

```js
app.post('/submit-form', (req, res) => {
    const data = req.body; // requires express.urlencoded()
    if (!data.email) {
        return res.status(400).json({ success: false, error: 'Email is required.' });
    }
    // TODO: send an email / store the lead / call your CRM here
    res.status(200).json({ success: true });
});
```

### Example: PHP (from this repo's `public/api/submit-form.php`)

```php
<?php
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }
if (empty($_POST['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Email is required.']);
    exit;
}
// TODO: mail(...) / store / CRM here
echo json_encode(['success' => true]);
```

### Third-party form backends

You can also point `data-cb-action` at a hosted form service (e.g. Formspree, Basin, Getform). Confirm the service accepts `application/x-www-form-urlencoded` and returns a 2xx on success. Some services want JSON or specific field names — adjust accordingly, and add your own spam protection (honeypot, captcha) as needed.

---

## Accessibility

- Real `<form>` with labelled controls, `required` attributes, and native HTML5 validation (runs before submit).
- The status line uses `role="status"` + `aria-live="polite"`, so success/error is announced to screen readers.
- All styling is scoped under `[data-cb-type="contact-form"]`.

## Dark mode

**Dark mode is the site's responsibility** (your site owns its theme and toggle). To make it easy, every color is a CSS variable and `style.css` ships a ready-made dark palette **commented out**. To enable it: uncomment that block and change the selector (`.dark`, `[data-theme="dark"]`, `@media (prefers-color-scheme: dark)`, …) to match your site's theme system. The accent color stays as configured.

> `.dark` is also the ContentBuilder editor's own UI theme — on a page that runs the editor, key your site's dark mode to a *different* class so the editor doesn't repaint your content while you edit.
