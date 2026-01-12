# Code Analysis Section for EXPOZY Template Schema Research Paper

*Insert this content after Section 3.2 in your paper*

---

## 3.3 Specific Files Analyzed and Patterns Extracted

The following source files from the Alpine-Expozy-StoreFront repository were systematically analyzed to derive schema constraints.

### 3.3.1 Repository Structure Overview

```
Alpine-Expozy-StoreFront/
├── pages/                          # PHP page templates
│   ├── header.php                  # Global header component
│   ├── footer.php                  # Global footer component
│   ├── index.php                   # Homepage template
│   └── login.php                   # Authentication page
├── components/
│   ├── core/
│   │   └── alpinejs-framework/     # Core Alpine.js integration
│   │       ├── autoload.js         # Global state initialization
│   │       ├── api-class.js        # REST API client
│   │       ├── data-collect.js     # Parameter extraction
│   │       └── directives/         # Custom Alpine directives
│   └── static/                     # Feature-specific modules
│       ├── shop.js                 # E-commerce operations
│       ├── blog.js                 # Blog functionality
│       ├── user.js                 # User authentication
│       ├── search.js               # Search functionality
│       └── newsletter.js           # Email subscriptions
├── core/                           # PHP backend classes
└── assets/                         # Static assets (CSS, fonts)
```

### 3.3.2 Global Reactive Data Model Analysis

**File:** `components/core/alpinejs-framework/autoload.js`

**Extracted Pattern:**
```javascript
data = Alpine.reactive({
    corePage: PAGEINIT,              // Current page metadata {id, target_id}
    user: USER,                       // Authenticated user object
    pageUrl: URL_PARAMETERS,          // URL query parameters
    settings: { logo, social },       // Site configuration
    openCart: false,                  // Shopping cart modal state
    openMobileMenu: false,            // Mobile navigation state
    screenWidth: window.screen.width, // Viewport dimensions
    scrollPosition: window.pageYOffset,
    openLogin: false,                 // Login modal visibility
    openRegistration: false,          // Registration modal visibility
    openProduct: false,               // Product detail modal
    darkMode: JSON.parse(localStorage.getItem('dark')),
    location: [],                     // Geolocation data
    modals: [],                       // Dynamic modal stack
    table: { loading: false }         // Data table loading state
});
```

**Schema Derivation:**
This pattern established that all template data bindings must reference the global `data` object. The schema's `keyName` property in `dataSources` directly maps to keys in this reactive object (e.g., `keyName: "products"` stores API responses in `data.products`).

**Resulting Schema Element:**
```json
{
  "dataSources": [{
    "id": "productList",
    "endpoint": "get.products",
    "keyName": "products"    // → Stored in data.products
  }]
}
```

### 3.3.3 Declarative API Binding Analysis

**File:** `components/core/alpinejs-framework/data-collect.js`

**Extracted Pattern:**
```javascript
class DataCollect {
    constructor(el) {
        this.element = el;
        this.attributesData = this.getDataAttributes(el);
        this.formData = this.getFormData(el);
        this.combinedData = {...this.attributesData, ...this.formData};
        this.keyName = el.getAttribute('keyName');
        this.keyGet = el.getAttribute('keyGet');
        this.pushurl = el.hasAttribute('options-pushurl');
        this.scroll = el.hasAttribute('options-scroll');
        this.clear = el.hasAttribute('options-clear');
    }

    getDataAttributes(el) {
        const data = {};
        for (const attr of el.attributes) {
            if (attr.name.startsWith('data-')) {
                const key = attr.name.slice(5); // Remove 'data-' prefix
                data[key] = attr.value;
            }
        }
        return data;
    }
}
```

**HTML Usage Pattern Discovered:**
```html
<div apiData="get.products"
     keyName="products"
     data-limit="12"
     data-page="1"
     data-category_id="5"
     options-pushurl>
</div>
```

**Schema Derivation:**
The `DataCollect` class revealed how EXPOZY extracts parameters from `data-*` attributes. This informed the schema's `params` object structure in data sources.

**Resulting Schema Element:**
```json
{
  "dataSources": [{
    "id": "productList",
    "endpoint": "get.products",
    "keyName": "products",
    "limit": 12,           // From data-limit
    "autoLoad": true       // From apiData presence
  }]
}
```

### 3.3.4 Action Handler Analysis

**File:** `components/core/alpinejs-framework/autoload.js`

**Extracted Pattern:**
```javascript
async function alpineListeners(method, element) {
    const dataCollect = new DataCollect(element);

    // Parse module and method from string like "Shop.post_carts"
    const [moduleName, methodName] = method.split('.');

    // Dynamically import the module
    const module = await import(`/components/static/${moduleName.toLowerCase()}.js`);

    // Execute the method with collected data
    const response = await module[moduleName][methodName](dataCollect);

    // Store response in global data object
    if (dataCollect.keyName) {
        data[dataCollect.keyName] = response.obj;
    }

    // Handle success/error states
    if (response.status === 1) {
        Helpers.show_toast_msg(response.message, 'success');
        element.dispatchEvent(new CustomEvent('success', { detail: response }));
    } else {
        Helpers.show_errors(response);
        element.dispatchEvent(new CustomEvent('error', { detail: response }));
    }
}
```

**HTML Usage Pattern Discovered:**
```html
<button @click="alpineListeners('Shop.post_carts', $event.currentTarget)"
        data-product_id="123"
        data-quantity="1"
        keyName="cart">
    Add to Cart
</button>
```

**Schema Derivation:**
The `alpineListeners` function revealed the `Module.method` endpoint format and how responses are stored. This directly informed the schema's `actions` structure.

**Resulting Schema Element:**
```json
{
  "actions": [{
    "id": "addToCart",
    "endpoint": "Shop.post_carts",  // Module.method format
    "keyName": "cart"               // Response stored in data.cart
  }]
}
```

### 3.3.5 Module Method Analysis

**File:** `components/static/shop.js`

**Extracted Pattern:**
```javascript
export let Shop = {
    get_products: async function(dataCollect) {
        let endpoint = Helpers.combineRequest("products", dataCollect.combinedData);
        const api = new ApiClass();
        await api.get(endpoint, false);
        if (dataCollect.pushurl) {
            history.replaceState(null, null, window.location.pathname + endpoint);
        }
        return api.response;
    },

    post_carts: async function(dataCollect) {
        let api = new ApiClass();
        await api.post('carts', dataCollect.combinedData);
        return api.response;
    },

    delete_carts: async function(dataCollect) {
        let api = new ApiClass();
        await api.delete('carts/' + dataCollect.combinedData.id);
        return api.response;
    },

    post_wishlists: async function(dataCollect) {
        let api = new ApiClass();
        await api.post('wishlists', dataCollect.combinedData);
        return api.response;
    }
};
```

**File:** `components/static/blog.js`

**Extracted Pattern:**
```javascript
export let Blog = {
    get_blogPosts: async function(dataCollect) {
        let endpoint = Helpers.combineRequest('blogPosts', dataCollect.combinedData);
        let api = new ApiClass();
        await api.get(endpoint, false);
        return api.response;
    },

    get_blogPost: async function(dataCollect) {
        let api = new ApiClass();
        await api.get('blogPosts/' + dataCollect.combinedData.slug, false);
        return api.response;
    }
};
```

**File:** `components/static/user.js`

**Extracted Pattern:**
```javascript
export let User = {
    post_login: async function(dataCollect) {
        let api = new ApiClass();
        await api.post('auth/login', dataCollect.combinedData);
        if (api.response.token) {
            localStorage.setItem('token', api.response.token);
        }
        return api.response;
    },

    post_register: async function(dataCollect) {
        let api = new ApiClass();
        await api.post('auth/register', dataCollect.combinedData);
        return api.response;
    },

    get_profile: async function(dataCollect) {
        let api = new ApiClass();
        await api.get('users/profile', true); // Authenticated request
        return api.response;
    }
};
```

**Schema Derivation:**
Analysis of all static modules revealed the endpoint naming convention: `{http_method}_{resource}`. This informed the expected format for `endpoint` values in the schema.

**Discovered Endpoint Patterns:**

| Module | Method | HTTP Operation |
|--------|--------|----------------|
| Shop | `get_products` | GET /products |
| Shop | `post_carts` | POST /carts |
| Shop | `delete_carts` | DELETE /carts/:id |
| Shop | `post_wishlists` | POST /wishlists |
| Blog | `get_blogPosts` | GET /blogPosts |
| Blog | `get_blogPost` | GET /blogPosts/:slug |
| User | `post_login` | POST /auth/login |
| User | `post_register` | POST /auth/register |
| Search | `get_results` | GET /search |
| Newsletter | `post_subscribe` | POST /newsletter |

### 3.3.6 SPA Navigation Analysis

**File:** `components/core/classes/page.js`

**Extracted Pattern:**
```javascript
window.href = async function(url) {
    history.pushState(null, null, url);
    data['pageUrl'] = [];
    data['openMobileMenu'] = false;
    Page.load();
    document.getElementById('main').scrollIntoView(true);
}

Page.load = async function() {
    const path = window.location.pathname;
    const lang = LANG;

    // Fetch page HTML
    const htmlResponse = await fetch(`/static/pages/${lang}${path}.html`);
    const html = await htmlResponse.text();

    // Fetch page CSS
    const cssResponse = await fetch(`/static/css/${lang}${path}.css`);
    const css = await cssResponse.text();

    // Update DOM
    document.getElementById('main').innerHTML = html;
    document.getElementById('pageCss').innerHTML = css;

    // Update SEO meta tags
    this.updateMeta();

    // Reinitialize Alpine components
    callBackMain();
}

window.changeLang = function(newLang) {
    if (LANG === newLang) return;
    const currentPath = window.location.pathname;
    window.location.href = currentPath.replace(`/${LANG}/`, `/${newLang}/`);
}
```

**Schema Derivation:**
The SPA navigation pattern revealed that links should use `href()` for internal navigation. This informed the schema's button `href` property for internal links.

**Resulting Schema Element:**
```json
{
  "buttons": [{
    "text": "View Products",
    "href": "/products",     // Uses href() for SPA navigation
    "variant": "primary"
  }]
}
```

### 3.3.7 API Client Analysis

**File:** `components/core/alpinejs-framework/api-class.js`

**Extracted Pattern:**
```javascript
class ApiClass {
    constructor() {
        this.baseUrl = SITEURL + '/api/';
        this.response = null;
    }

    getAuth() {
        const token = localStorage.getItem('token');
        return token ? 'Bearer ' + token : 'session ' + sessionId;
    }

    async get(endpoint, auth = false) {
        const headers = {
            'Content-Type': 'application/json',
            'SAAS-KEY': SAAS_KEY
        };
        if (auth) headers['Authorization'] = this.getAuth();

        const response = await fetch(this.baseUrl + endpoint, { headers });
        this.response = await response.json();
    }

    async post(endpoint, data) {
        const response = await fetch(this.baseUrl + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'SAAS-KEY': SAAS_KEY,
                'Authorization': this.getAuth()
            },
            body: JSON.stringify(data)
        });
        this.response = await response.json();
    }
}
```

**Schema Derivation:**
The API client revealed that all endpoints are prefixed with `/api/` and use JSON content type. This confirmed that schema endpoints should be resource names only (e.g., `get.products` not `/api/products`).

### 3.3.8 Custom Directive Analysis

**File:** `components/core/alpinejs-framework/directives/amount.js`

**Extracted Pattern:**
```javascript
Alpine.directive("amount", (el, { expression }, { effect, evaluate }) => {
    effect(() => {
        let val = evaluate(expression);
        let num = parseFloat(val);
        if (!isNaN(num)) {
            el.textContent = num.toFixed(2) + " " + CURRENCY.symbol;
        }
    });
});
```

**Usage:**
```html
<span x-amount="product.price"></span>
<!-- Outputs: "29.99 $" -->
```

**Schema Derivation:**
Custom directives like `x-amount` revealed that the framework has domain-specific display helpers. This informed the decision to include specialized section types like `products` that would handle currency formatting internally.

---

## 3.4 Pattern-to-Schema Mapping Summary

| Source File | Pattern Discovered | Schema Element |
|-------------|-------------------|----------------|
| `autoload.js` | Global `data` object | `keyName` property in dataSources |
| `data-collect.js` | `data-*` parameter extraction | `limit`, `autoLoad` properties |
| `autoload.js` | `alpineListeners()` function | `actions` array structure |
| `shop.js`, `blog.js` | Module method naming | `endpoint` format (`Module.method`) |
| `page.js` | `href()` navigation | Button `href` for SPA links |
| `api-class.js` | REST endpoint structure | Endpoint naming conventions |
| `directives/*.js` | Custom Alpine directives | Specialized section types |

---

## 3.5 Discovered UI Component Patterns

Analysis of `pages/*.php` templates and `editor/cb/modules/` revealed recurring UI patterns that informed the section types:

| UI Pattern | Source Location | Schema Section Type |
|------------|-----------------|---------------------|
| Full-width headers with CTA | `pages/index.php` | `hero` |
| Product grid layouts | `pages/category.php` | `products` |
| Blog post listings | `pages/blog.php` | `posts` |
| Contact/login forms | `pages/contact.php`, `pages/login.php` | `form` |
| Feature highlight blocks | `editor/cb/modules/features.js` | `features` |
| Customer review sections | `editor/cb/modules/testimonials.js` | `testimonials` |
| FAQ accordions | `editor/cb/modules/faq.js` | `faq` |
| Call-to-action banners | `editor/cb/modules/cta.js` | `cta` |
| Site footer | `pages/footer.php` | `footer` |

---

*End of code analysis section*
