# 🚀 Front-End Framework -- Alpine.js, TailwindCSS & Core API

A lightweight, reactive, single-page front-end framework built on top
of:

-   **Alpine.js** -- reactive components without heavy overhead\
-   **Vanilla JavaScript (ES6)** -- core logic and routing\
-   **TailwindCSS (dynamic)** -- no build step required\
-   **Core API integration** -- HTML-based commands for backend
    communication

The framework dynamically replaces the `<main>` content without page
reloads, while keeping global state, UI modules, and Alpine components
active at all times.

------------------------------------------------------------------------

# 🔑 SAAS Key (Project Authentication)

Each project includes a unique **SAAS key**, located at:

    core/saas_key.php

This key is required to authenticate the project with the real **Expozy
Core**.

### ✔ How to obtain the SAAS key?

You can generate or retrieve your project's SAAS key from:

👉 **https://expozy.com**

### ✔ API Documentation

All available API endpoints from the core system can be found here:

👉 **https://wiki.expozy.com/**

You must configure the correct SAAS key for API requests to function
properly.

------------------------------------------------------------------------


## 🌍 Key Concepts

### ✔ No Full Page Reloads

The framework behaves like a lightweight SPA: routing updates only the
main page content.\
Global UI state and Alpine components remain intact.

### ✔ Global Reactive `data` Object

All UI data is stored in a single Alpine-reactive global object.\
Updating any property automatically updates the DOM.

### ✔ HTML-Based Commands

You can trigger API calls directly from HTML using attributes such as:

-   `apiData="get.products"`
-   `@click="alpineListener('post.cart', $event)"`
-   `options-pushurl`
-   `options-scroll`

### ✔ Tailwind Without Build Step

All default Tailwind classes work out of the box thanks to a dynamic
class generator.

------------------------------------------------------------------------

## 📁 Project Structure

    /admin              → Admin panel UI  
    /assets             → CSS, JS, images, fonts  
    /components         → Reusable UI components  
    /core               → Core framework logic (routing, API, helpers)  
    /ddos               → Lightweight DDOS protection  
    /editor/cb          → Content Builder / Code Builder  
    /pages              → Front-end page templates  
    /payments           → Payment modules  
    /static             → Static files  
    index.php           → Main entry point  
    .htaccess           → Rewrite rules & SEO  
    robots.txt          → Crawler rules  

------------------------------------------------------------------------

# ⚙️ Global Data Object

The application initializes a global Alpine reactive object:

``` js
data = Alpine.reactive({
    corePage: PAGEINIT,
    user: USER,
    pageUrl: URL_PARAMETERS,
    settings: { logo: LOGO_URL, social: SOCIAL_NETWORKS },
    openCart: false,
    openMobileMenu: false,
    screenWidth: window.screen.width,
    scrollPosition: window.pageYOffset,

    openLogin: false,
    openRegistration: false,
    openProduct: false,
    openForgotten: false,
    openGeolocation: false,

    darkMode: JSON.parse(localStorage.getItem('dark') || 'false'),

    location: [],
    modals: [],
});
```

### 🔹 Features

-   Fully reactive\
-   Accessible globally via `console.log(data)`\
-   Automatically updates Alpine templates\
-   Can be dynamically expanded (`data.cart = {...}`)\
-   Remains persistent between page transitions

------------------------------------------------------------------------

# 🔌 ApiData -- Automatic HTML-Based API Calls

Any element with `apiData=""` makes an API call when the page loads.

### Example

``` html
<div 
    apiData="get.products"
    keyName="products"
    data-limit="20"
    data-sort="discount">
</div>
```

### How It Works

1.  `apiData` provides the method and endpoint (e.g. `get.products`)
2.  All attributes that start with `data-` are sent as request
    parameters
3.  Response is automatically stored in `data[keyName]`
    -   here → `data.products`
4.  `apiData` elements **must not** be inside `<template>` tags
5.  All ApiData elements run on every page navigation

------------------------------------------------------------------------

# 🧲 alpineListener -- Global Event Handler

A universal action handler used for:

-   Forms\
-   Buttons\
-   Add-to-cart\
-   Login / Register\
-   Filters

### Example

``` html
<button
    @click="alpineListener('post.carts', $event)"
    keyName="cart"
    :data-product_id="product.id"
    :data-variation_id="product.variations[0].id"
    :data-qty="1"
    @success="alert('Success!')"
    @error="alert('Error!')">
    Add to cart
</button>
```

### What alpineListener Does

✔ Collects all `data-` attributes\
✔ Automatically collects inputs from the closest parent `<form>`\
✔ Sends the request\
✔ Saves response to `data[keyName]`\
✔ Displays validation errors automatically\


### ✔ Success & Error Hooks

Two optional event hooks are available:

-   `@success="..."` --- executed **after a successful request**
-   `@error="..."` --- executed **if the request fails**

These allow custom actions such as notifications, redirects, form
resets, etc.
------------------------------------------------------------------------

# 🛠️ Additional Attributes

## `options-pushurl`

Merges previous URL parameters with the new ones.

Useful for filtering pages (layered filters).

-   Must be used on the first request\
-   After that, the system checks by `keyName` and applies parameters
    automatically

## `options-scroll`

Scrolls the page to the top after the request completes.

------------------------------------------------------------------------

# 🌐 Routing

## `href('/bg/products')`

Replaces page content without reloading the browser.

### Behavior:

-   Loads the new HTML template\
-   Executes all ApiData for the new page\
-   Preserves global `data` state\
-   Updates the internal page object

------------------------------------------------------------------------

# 🌍 Language Switching

``` js
changeLang('bg');
```

Updates:

-   page content\
-   translations\
-   keeps UI state intact

------------------------------------------------------------------------

# 🎨 TailwindCSS -- Fully Supported Without Build

The framework dynamically generates Tailwind classes, enabling:

✔ All default Tailwind classes\
✔ Responsive prefixes (`md:`, `lg:`)\
✔ States (`hover:`, `focus:`)\
✔ Dark mode\
✔ Utilities without configuration

No build step or Tailwind config needed.

------------------------------------------------------------------------

# 📦 Setup

``` bash
git clone https://github.com/your-repo/project.git
```

Point your webserver to the root directory and start developing.

------------------------------------------------------------------------

# 🤝 Contributing

Pull Requests and suggestions are welcome.

------------------------------------------------------------------------


