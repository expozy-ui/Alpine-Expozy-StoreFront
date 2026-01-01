<p align="center">
  <img src="expozy-ui-logo.png" alt="Expozy UI" width="400">
</p>

<h1 align="center">Expozy Front-End Framework</h1>

<p align="center">
  <strong>Lightweight, Reactive Single-Page Framework</strong><br>
  Built with Alpine.js, TailwindCSS & Core API Integration
</p>

<p align="center">
  <a href="#installation"><img src="https://img.shields.io/badge/version-2.0.0-red.svg" alt="Version"></a>
  <a href="#license"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="https://alpinejs.dev"><img src="https://img.shields.io/badge/Alpine.js-3.x-8BC0D0.svg" alt="Alpine.js"></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/TailwindCSS-3.x-38B2AC.svg" alt="TailwindCSS"></a>
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🚀 **No Page Reloads** | SPA-like navigation, only `<main>` content updates |
| ⚡ **Reactive Data** | Global Alpine.js reactive object syncs UI automatically |
| 📡 **HTML-Based API** | Trigger API calls directly from HTML attributes |
| 🎨 **Zero Build Step** | TailwindCSS works out-of-the-box, no config needed |
| 🌍 **Multi-Language** | Built-in language switching with preserved state |
| 🔒 **SAAS Authentication** | Secure project authentication with Expozy Core |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/expozy/expozy-frontend.git

# Navigate to project
cd expozy-frontend

# Configure your SAAS key
# Edit: core/saas_key.php

# Point your webserver to the root directory
# Done! Start developing.
```

---

## 🔑 SAAS Key Authentication

Each project requires a unique **SAAS key** to authenticate with Expozy Core.

```
📁 core/
   └── 📄 saas_key.php    ← Your authentication key
```

### Get Your SAAS Key

| Resource | URL |
|----------|-----|
| 🔐 Generate Key | [expozy.com](https://expozy.com) |
| 📖 API Documentation | [wiki.expozy.com](https://wiki.expozy.com) |

> **Important:** API requests will fail without a valid SAAS key configured.

---

## 🧠 Core Concepts

### Single-Page Architecture

```
┌─────────────────────────────────────────────────────────┐
│  BROWSER                                                │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Header, Navigation, Footer (persistent)         │  │
│  ├───────────────────────────────────────────────────┤  │
│  │                                                   │  │
│  │            <main> Content Area </main>            │  │
│  │                                                   │  │
│  │         ↻ Only this section updates ↻            │  │
│  │                                                   │  │
│  ├───────────────────────────────────────────────────┤  │
│  │  Global State & Alpine Components (persistent)   │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### How It Works

| Concept | Description |
|---------|-------------|
| **Routing** | Updates only `<main>` content without full page reload |
| **Global State** | Single reactive `data` object accessible everywhere |
| **API Calls** | HTML attributes trigger backend communication |
| **Styling** | Dynamic TailwindCSS generation, no build required |

---

## 📁 Project Structure

```
expozy-frontend/
│
├── 📂 admin/              # Admin panel UI
├── 📂 assets/             # CSS, JS, images, fonts
│   ├── 📂 css/
│   ├── 📂 js/
│   ├── 📂 images/
│   └── 📂 fonts/
│
├── 📂 components/         # Reusable UI components
│   ├── header.php
│   ├── footer.php
│   ├── cart.php
│   └── ...
│
├── 📂 core/               # Framework core logic
│   ├── routing.php
│   ├── api.php
│   ├── helpers.php
│   └── saas_key.php       # ⚠️ Configure this!
│
├── 📂 pages/              # Front-end page templates
│   ├── home.php
│   ├── products.php
│   ├── product.php
│   └── ...
│
├── 📂 editor/cb/          # Content Builder / Code Builder
├── 📂 payments/           # Payment modules
├── 📂 ddos/               # DDOS protection
├── 📂 static/             # Static files
│
├── 📄 index.php           # Main entry point
├── 📄 .htaccess           # Rewrite rules & SEO
└── 📄 robots.txt          # Crawler rules
```

---

## ⚙️ Global Data Object

The framework initializes a global Alpine.js reactive object accessible throughout your application.

```javascript
data = Alpine.reactive({
    // Page & User State
    corePage: PAGEINIT,
    user: USER,
    pageUrl: URL_PARAMETERS,
    
    // Settings
    settings: {
        logo: LOGO_URL,
        social: SOCIAL_NETWORKS
    },
    
    // UI State
    openCart: false,
    openMobileMenu: false,
    openLogin: false,
    openRegistration: false,
    openProduct: false,
    openForgotten: false,
    openGeolocation: false,
    
    // Device & Scroll
    screenWidth: window.screen.width,
    scrollPosition: window.pageYOffset,
    
    // Theme
    darkMode: JSON.parse(localStorage.getItem('dark') || 'false'),
    
    // Dynamic Data
    location: [],
    modals: [],
});
```

### Data Object Features

| Feature | Description |
|---------|-------------|
| ✅ Fully Reactive | Changes automatically update the DOM |
| ✅ Globally Accessible | Use `data.property` anywhere, debug via `console.log(data)` |
| ✅ Dynamically Expandable | Add new properties: `data.cart = {...}` |
| ✅ Persistent | Survives page transitions within the SPA |

---

## 📡 ApiData — Declarative API Calls

Fetch data automatically when a page loads using HTML attributes.

### Basic Usage

```html
<div 
    apiData="get.products"
    keyName="products"
    data-limit="20"
    data-sort="discount">
</div>
```

### How It Works

```
┌─────────────────────────────────────────────────────────┐
│  HTML Element with apiData                              │
│  ┌───────────────────────────────────────────────────┐  │
│  │  apiData="get.products"    → API endpoint         │  │
│  │  keyName="products"        → Storage key          │  │
│  │  data-limit="20"           → Request param        │  │
│  │  data-sort="discount"      → Request param        │  │
│  └───────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  API Request: GET /products?limit=20&sort=discount      │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  Response stored in: data.products                      │
│  DOM automatically updates via Alpine.js                │
└─────────────────────────────────────────────────────────┘
```

### Attribute Reference

| Attribute | Required | Description |
|-----------|:--------:|-------------|
| `apiData` | ✅ | API method & endpoint (e.g., `get.products`) |
| `keyName` | ✅ | Property name in global `data` object |
| `data-*` | ❌ | Request parameters (sent to API) |

> ⚠️ **Note:** `apiData` elements must **not** be placed inside `<template>` tags.

### Example: Product Listing

```html
<!-- Fetch products on page load -->
<div apiData="get.products" keyName="products" data-limit="12"></div>

<!-- Display products reactively -->
<template x-for="product in data.products" :key="product.id">
    <div class="bg-white rounded-lg shadow p-4">
        <img :src="product.image" :alt="product.name">
        <h3 x-text="product.name" class="font-bold text-lg"></h3>
        <p x-text="'$' + product.price" class="text-red-600"></p>
    </div>
</template>
```

---

## 🧲 alpineListener — Universal Event Handler

A powerful action handler for forms, buttons, and user interactions.

### Basic Usage

```html
<button
    @click="alpineListener('post.carts', $event)"
    keyName="cart"
    :data-product_id="product.id"
    :data-variation_id="product.variations[0].id"
    :data-qty="1"
    @success="alert('Added to cart!')"
    @error="alert('Something went wrong')">
    Add to Cart
</button>
```

### How It Works

| Step | Action |
|:----:|--------|
| 1️⃣ | Collects all `data-*` attributes from the element |
| 2️⃣ | Automatically gathers inputs from parent `<form>` (if exists) |
| 3️⃣ | Sends API request with collected data |
| 4️⃣ | Stores response in `data[keyName]` |
| 5️⃣ | Displays validation errors automatically |
| 6️⃣ | Triggers `@success` or `@error` callback |

### Event Hooks

| Hook | Triggered When | Use Case |
|------|----------------|----------|
| `@success` | Request succeeds | Show notification, redirect, reset form |
| `@error` | Request fails | Display error message, log issue |

### Example: Login Form

```html
<form>
    <input type="email" name="email" placeholder="Email" required>
    <input type="password" name="password" placeholder="Password" required>
    
    <button 
        type="button"
        @click="alpineListener('post.login', $event)"
        keyName="user"
        @success="data.openLogin = false; href('/account')"
        @error="alert('Invalid credentials')">
        Sign In
    </button>
</form>
```

### Example: Filter Products

```html
<select 
    @change="alpineListener('get.products', $event)"
    keyName="products"
    options-pushurl
    options-scroll>
    <option value="">Sort by</option>
    <option value="price_asc" data-sort="price_asc">Price: Low to High</option>
    <option value="price_desc" data-sort="price_desc">Price: High to Low</option>
    <option value="newest" data-sort="newest">Newest First</option>
</select>
```

---

## 🛠️ Additional Attributes

### `options-pushurl`

Merges URL parameters for filter persistence (layered navigation).

```html
<div 
    @click="alpineListener('get.products', $event)"
    keyName="products"
    data-category="shoes"
    options-pushurl>
    Filter: Shoes
</div>

<!-- URL becomes: /products?category=shoes -->
<!-- Additional filters append: /products?category=shoes&color=red -->
```

### `options-scroll`

Scrolls to top of page after request completes.

```html
<button 
    @click="alpineListener('get.products', $event)"
    keyName="products"
    data-page="2"
    options-scroll>
    Next Page
</button>
```

---

## 🌐 Routing

### Navigate Without Reload

```javascript
href('/products');
href('/bg/products');
href('/product/123');
```

### What Happens

| Action | Result |
|--------|--------|
| Load HTML | New page template fetched |
| Execute ApiData | All `apiData` elements on new page run |
| Preserve State | Global `data` object remains intact |
| Update URL | Browser history updated |

### Example: Navigation Link

```html
<a @click.prevent="href('/products')" href="/products">
    View Products
</a>
```

---

## 🌍 Language Switching

```javascript
changeLang('bg');  // Switch to Bulgarian
changeLang('en');  // Switch to English
changeLang('de');  // Switch to German
```

### What Updates

| ✅ Updates | ❌ Preserves |
|-----------|-------------|
| Page content | UI state (cart, modals) |
| Translations | User session |
| URL prefix | Alpine components |

---

## 🎨 TailwindCSS — Zero Configuration

The framework dynamically generates TailwindCSS classes at runtime.

### Supported Features

| Feature | Example | Status |
|---------|---------|:------:|
| Default utilities | `bg-red-500`, `p-4`, `flex` | ✅ |
| Responsive prefixes | `md:flex`, `lg:grid-cols-3` | ✅ |
| State variants | `hover:bg-blue-600`, `focus:ring` | ✅ |
| Dark mode | `dark:bg-gray-800` | ✅ |
| Arbitrary values | `w-[300px]`, `bg-[#E53E2E]` | ✅ |

### Example

```html
<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg
            hover:shadow-xl transition-shadow duration-300
            md:flex md:items-center lg:p-8">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        No build step required!
    </h2>
</div>
```

> **Note:** No Tailwind config, PostCSS, or build process needed.

---

## 📋 API Quick Reference

### ApiData Attributes

| Attribute | Description | Example |
|-----------|-------------|---------|
| `apiData` | API endpoint | `get.products`, `post.cart` |
| `keyName` | Storage key | `products`, `cart`, `user` |
| `data-*` | Request params | `data-limit="10"` |

### alpineListener Options

| Attribute | Description | Example |
|-----------|-------------|---------|
| `@click` | Trigger on click | `@click="alpineListener('post.cart', $event)"` |
| `@change` | Trigger on change | `@change="alpineListener('get.products', $event)"` |
| `keyName` | Storage key | `keyName="cart"` |
| `data-*` | Request params | `:data-id="product.id"` |
| `@success` | Success callback | `@success="alert('Done!')"` |
| `@error` | Error callback | `@error="alert('Failed')"` |
| `options-pushurl` | Merge URL params | `options-pushurl` |
| `options-scroll` | Scroll to top | `options-scroll` |

### Global Functions

| Function | Description | Example |
|----------|-------------|---------|
| `href(url)` | Navigate to page | `href('/products')` |
| `changeLang(code)` | Switch language | `changeLang('bg')` |

---

## 🔗 Resources

| Resource | Link |
|----------|------|
| 🌐 Expozy Platform | [expozy.com](https://expozy.com) |
| 📖 API Documentation | [wiki.expozy.com](https://wiki.expozy.com) |
| 🐛 Issue Tracker | [GitHub Issues](https://github.com/expozy/expozy-frontend/issues) |

---

## 🤝 Contributing

We welcome contributions! Whether it's bug fixes, features, or documentation.

1. Fork the repository
2. Create your branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by the <a href="https://expozy.com">Expozy</a> Team
</p>
