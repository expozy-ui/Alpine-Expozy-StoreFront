# Form (panel variant)

The earlier version of the Form plugin: the same block, but its submission settings live in the plugin settings panel and the form builder is opened from an **Edit Form** button. Kept alongside the current `form` plugin; register it only if you want this arrangement.

Build a form visually — short and long text, email, phone, number, dropdown, select, multi-select, switch, slider, date, time, url, colour, file upload — style it in the builder's Designer, and drop it into a page. The form is written into the page's HTML, so search engines see it and visitors see it immediately, before any script has run.

- **Server-side required:** **Yes** — you provide the endpoint that receives the submission (see below).
- **External dependencies:** None. Forms are rendered by the ContentBox runtime you already include, and the form builder loads only while you are editing — visitors never download it. reCAPTCHA is fetched only if you set a site key.

## Embed code

```html
<div data-cb-type="form-panel" data-cb-loading="none" data-cb-action="/formsubmission" data-cb-submission-type="json" data-cb-success-message="Thanks for your submission!" data-cb-error-message="Oops! There was a problem submitting your form." data-cb-recaptcha-key="" data-cb-result-selector="">
    <form class="cb-form" method="POST" action="/formsubmission">
        <div class="cb-form-fields formview-container fb-ui"><div class="form-header"><h1 class="form-title">Get in touch</h1><p class="form-desc">We usually reply within one business day.</p></div><div class="form-wrapper" style="flex-flow: wrap;"><div class="form-field"><label for="short_text_label_id-xih1ow90g" class="field-label">Your Name: <span class="text-red-500">*</span></label><input id="short_text_label_id-xih1ow90g" type="text" name="your_name" class="inp-base" placeholder="Enter your name" required="required"></div><div class="form-field"><label for="email_label_id-1tz92khft" class="field-label">Your Email: <span class="text-red-500">*</span></label><input id="email_label_id-1tz92khft" type="email" name="email" class="inp-base" placeholder="Enter your email" required="required"></div><div class="form-field"><label for="long_text_label_id-92mowv747" class="field-label">Message:</label><textarea id="long_text_label_id-92mowv747" name="message" class="inp-base" placeholder="How can we help?"></textarea></div><div class="form-field reference_code"><label for="short_text_label_id-2nnlpbfdg" class="field-label">Reference Code:</label><input id="short_text_label_id-2nnlpbfdg" type="text" name="reference_code" autocomplete="off" aria-hidden="true" tabindex="-1" class="inp-base"></div><div class="submit-container"><button class="btn-submitform">Send</button></div></div></div>
        <div class="cb-form-status" role="status" aria-live="polite"></div>
    </form>
    <div class="cb-form-result"></div>
    <script type="application/json" class="cb-form-def">{
  "form": {
    "title": "Get in touch",
    "description": "We usually reply within one business day.",
    "elements": [
      {
        "title": "Your Name:",
        "name": "your_name",
        "type": "short-text",
        "isRequired": true,
        "placeholder": "Enter your name"
      },
      {
        "title": "Your Email:",
        "name": "email",
        "type": "email",
        "isRequired": true,
        "placeholder": "Enter your email"
      },
      {
        "title": "Message:",
        "name": "message",
        "type": "long-text",
        "placeholder": "How can we help?"
      }
    ],
    "useSubmitButton": true,
    "submitText": "Send"
  }
}</script>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-action` | URL / path | `/formsubmission` | Where the submission is sent |
| `data-cb-submission-type` | `json` / `standard` | `json` | `json` posts with `fetch` and shows the message below without leaving the page. `standard` is a normal browser form POST, which also works with JavaScript disabled |
| `data-cb-success-message` | text | `Thanks for your submission!` | Shown under the form after a successful `json` submission |
| `data-cb-error-message` | text | `Oops! There was a problem…` | Shown when the request fails or the response contains `error` |
| `data-cb-recaptcha-key` | site key | *(empty)* | Google reCAPTCHA **v2** site key. Empty = no captcha, and nothing is loaded |
| `data-cb-loading` | `none` | `none` | Keep this. It turns off the loading placeholder so the form is visible immediately instead of appearing only after the plugin loads |

The fields themselves — labels, types, order, validation, theme — are edited by clicking **Edit Form**, which opens the form builder full screen. Everything else is in the settings panel.

## ⚠️ Server-side implementation (your responsibility)

The block posts the form to `data-cb-action`. Nothing about storing, validating, or emailing the submission is included.

With `json` submission the request is a `POST` of `FormData` with `Accept: application/json`, and the response decides which message is shown:

```json
{ "success": true }              // anything without an "error" key = success
{ "error": "Invalid email" }     // shows the error message
```

With `standard` submission it is an ordinary form POST and your endpoint owns the response page. The encoding follows what the form actually carries: `application/x-www-form-urlencoded` normally, and `multipart/form-data` only when the form has a file field — so an endpoint reading ordinary POST fields works without any special handling, and the result is the same whether or not JavaScript ran.

## Spam protection

Two mechanisms are available, and **both are enforced on your server** — anything checked only in the browser can be skipped by posting straight to your endpoint.

**A signed token (recommended).** Put `data-site-token` on any element wrapping the rendered page — the page template, not the saved content — and the runtime adds its value as a hidden `form_token` field on every form:

```html
<div class="is-wrapper" data-site-token="<?= $token ?>">
    …page content…
</div>
```

Generate the token per request (a time-limited signed hash), then reject any submission whose `form_token` is missing, wrong, or expired. This is the only measure a bot cannot skip, since a direct POST has no valid token. Keep it **outside** the content: a token saved into a page is stale the moment it is written.

**A honeypot (already there).** Every rendered form includes a hidden `reference_code` field. A human never fills it, so reject any submission where it is not empty. Free, but it only catches bots that fill in everything.

`data-cb-recaptcha-key` remains available for reCAPTCHA v2. If you set one, verify `g-recaptcha-response` server-side with your secret key — the browser check alone is not protection.

## What the block contains

```
<div data-cb-type="form-panel" …>            the settings above
    <form class="cb-form">             a real form element — action and method live here
        <div class="cb-form-fields">   the fields
        <div class="cb-form-status">   the message after submitting, empty until then
    <div class="cb-form-result">       where a generating form writes its answer
    <script class="cb-form-def">       your form, saved as JSON
```

The fields are written for you each time you save in the form builder, so don't edit them by hand — the next save replaces them. Everything you change lives in the form builder or the settings panel.

## Accessibility

Every rendered control has a `<label for>`, required fields are marked, and the submit button is a real `<button>`. The status message is a `role="status"` live region, so success and failure are announced. In the form builder, `Esc` closes the overlay without saving.
