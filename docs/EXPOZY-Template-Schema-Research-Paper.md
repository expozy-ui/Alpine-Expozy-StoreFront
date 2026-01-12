# Deriving the EXPOZY Template JSON Schema (v1) from Front-End Code Analysis

**Author:** Generated with AI Assistance
**Program:** EXPOZY Template Generation System
**Date:** January 2026

---

## Abstract

This paper documents the systematic methodology used to derive Template Schema v1 for AI-powered page generation in EXPOZY. The schema was created by analyzing the EXPOZY Alpine.js storefront framework codebase to identify key patterns, conventions, and constraints. Due to Google Vertex AI's structured output limitations, the schema underwent significant simplification while preserving core EXPOZY compatibility. The final schema uses a section-based model with 10 section types, mapping directly to EXPOZY's `apiData` and `alpineListener` patterns.

**Keywords:** JSON Schema, Vertex AI, structured output, Alpine.js, EXPOZY, LLM guardrails, template generation

---

## 1. Introduction

### 1.1 Problem Statement

EXPOZY templates are traditionally built manually, requiring deep knowledge of the platform's Alpine.js-based reactive system, REST API bindings, and TailwindCSS conventions. The goal of this project is to enable AI-powered generation of EXPOZY-compatible page templates from natural language prompts.

### 1.2 Challenges

Direct LLM code generation poses several risks:
- **Validity**: Generated HTML/JS may be syntactically or semantically invalid
- **Security**: Unconstrained output may contain XSS vectors or unsafe patterns
- **Compatibility**: Output may not align with EXPOZY framework conventions
- **Consistency**: Free-form generation produces unpredictable structures

### 1.3 Solution Approach

The project adopts a **structured output approach**: the AI outputs a restricted JSON template package validated against a JSON Schema. This schema was derived by reverse-engineering the EXPOZY storefront framework to identify allowable patterns and constraints.

---

## 2. Background: EXPOZY Framework Architecture

### 2.1 Technology Stack

The EXPOZY storefront framework uses:
- **Alpine.js** - Lightweight reactive JavaScript framework
- **TailwindCSS** - Utility-first CSS framework
- **PHP** - Server-side rendering and API
- **SPA-like routing** - Partial page updates without full reloads

### 2.2 Repository Structure

Analysis of the EXPOZY repository revealed the following structure:

```
Alpine-Expozy-StoreFront/
├── pages/                          # PHP page templates
│   ├── header.php                  # Global header with navigation
│   ├── footer.php                  # Global footer
│   ├── index.php                   # Main entry point
│   ├── login.php                   # Authentication page
│   ├── editor.php                  # Content editor loader
│   └── rss.php                     # RSS feed generator
├── components/
│   ├── core/
│   │   ├── alpinejs-framework/     # Core Alpine.js system
│   │   │   ├── autoload.js         # Global reactive data initialization
│   │   │   ├── api.js              # API client wrapper
│   │   │   ├── helpers.js          # Utility functions
│   │   │   ├── dataCollect.js      # data-* attribute extraction
│   │   │   ├── formDataCollector.js # Form data collection
│   │   │   └── directives/         # Custom Alpine directives
│   │   ├── api/                    # API utilities
│   │   │   ├── api.js              # Core API class
│   │   │   └── cache.js            # Response caching
│   │   └── classes/                # Core classes
│   │       ├── page.js             # SPA page navigation
│   │       └── link.js             # Link handling
│   └── static/                     # Feature modules (30+ files)
│       ├── shop.js                 # E-commerce: products, carts, wishlists
│       ├── blog.js                 # Blog posts and categories
│       ├── user.js                 # Authentication and profiles
│       ├── search.js               # Site search functionality
│       ├── contacts.js             # Contact form handling
│       ├── gallery.js              # Image gallery functionality
│       ├── reviews.js              # Product/service reviews
│       ├── newsletter.js           # Email subscription
│       ├── menu.js                 # Navigation menus
│       ├── brands.js               # Brand listings
│       ├── banners.js              # Promotional banners
│       ├── sliders.js              # Image sliders
│       └── ...                     # Additional modules
├── editor/cb/                      # Content Builder editor
│   ├── editor.php                  # Main editor interface
│   ├── contentbuilder/             # Visual page builder
│   └── assets/                     # Editor resources
│       ├── modules/                # HTML block templates
│       │   ├── slider.html
│       │   ├── navbar-builder.html
│       │   └── ...
│       └── minimalist-blocks/      # Pre-built content blocks
├── core/                           # PHP backend logic
├── assets/                         # CSS, fonts, plugins
└── static/                         # Generated static files
```

---

## 3. Code Analysis Methodology

### 3.1 Analysis Procedure

The schema was derived using a four-step static analysis procedure:

**Step A: Map Template Surface Area**

*Template Locations Identified:*
| Directory | Contents | Purpose |
|-----------|----------|---------|
| `pages/` | header.php, footer.php, index.php, login.php | PHP page templates |
| `components/static/` | shop.js, blog.js, user.js, contacts.js, etc. | Feature modules (30+ files) |
| `components/core/alpinejs-framework/` | autoload.js, api.js, helpers.js | Core framework logic |
| `editor/cb/assets/modules/` | slider.html, navbar-builder.html | HTML block templates |

*Recurring Patterns Identified:*
| Pattern Type | Source Files | Schema Mapping |
|--------------|--------------|----------------|
| Global header/footer | `pages/header.php`, `pages/footer.php` | Consistent page structure |
| E-commerce logic | `components/static/shop.js` | `products`, `cta` sections |
| Blog/content logic | `components/static/blog.js` | `posts`, `content` sections |
| User authentication | `components/static/user.js`, `pages/login.php` | `form` section (login/register) |
| Contact forms | `components/static/contacts.js` | `form` section |
| Search functionality | `components/static/search.js` | Search integration |

*UI Patterns Extracted from Module Files:*
| Module File | Extracted Patterns | Schema Section |
|-------------|-------------------|----------------|
| `shop.js` | Product listings, cart actions | `products`, button actions |
| `blog.js` | Post listings, categories | `posts` |
| `sliders.js`, `banners.js` | Image carousels, hero banners | `hero` |
| `gallery.js` | Image galleries | `content` with images |
| `reviews.js` | Testimonial displays | `testimonials` |
| `newsletter.js` | Email signup forms | `form`, `cta` |

**Step B: Inventory Allowed Behaviors**
- Cataloged data-fetch patterns (`apiData`, `keyName`, `data-*`)
- Cataloged action patterns (`alpineListener`, hooks, options)
- Documented parameter passing conventions

**Step C: Identify Security Boundaries**
- Determined where HTML injection could occur
- Identified safe vs. unsafe Alpine.js directives
- Documented sanitization requirements

**Step D: Convert to Schema**
- Transformed findings into typed JSON structures
- Defined component/section types
- Established data binding conventions

### 3.2 Key Files Analyzed

| File | Path | Purpose | Extracted Patterns |
|------|------|---------|-------------------|
| `autoload.js` | `components/core/alpinejs-framework/` | Global reactive state | `Alpine.reactive()`, `data` object structure |
| `api.js` | `components/core/alpinejs-framework/` | API client wrapper | Request/response handling |
| `dataCollect.js` | `components/core/alpinejs-framework/` | Parameter collection | `data-*` attribute extraction |
| `page.js` | `components/core/classes/` | SPA navigation | `href()` function, page transitions |
| `shop.js` | `components/static/` | E-commerce module | `get_products`, `post_carts` methods |
| `blog.js` | `components/static/` | Blog module | `get_blogPosts` methods |
| `user.js` | `components/static/` | User module | `post_login`, `post_register` methods |
| `contacts.js` | `components/static/` | Contact forms | Form submission patterns |
| `newsletter.js` | `components/static/` | Email signup | Subscription actions |
| `header.php` | `pages/` | Global header | Navigation structure, menu patterns |

---

## 4. Key Patterns Discovered

### 4.1 Global Reactive Data Model

**Source:** `components/core/alpinejs-framework/autoload.js`

```javascript
data = Alpine.reactive({
    corePage: PAGEINIT,           // Current page info
    user: USER,                    // Logged-in user
    pageUrl: URL_PARAMETERS,       // URL query parameters
    settings: { logo, social },    // Site settings
    openCart: false,               // Cart modal state
    openMobileMenu: false,         // Mobile menu state
    darkMode: JSON.parse(localStorage.getItem('dark')),
    modals: [],                    // Dynamic modals
    table: { loading: false }      // Data table state
});
```

**Schema Implication:** Templates must bind data consistently using `data.{keyName}` pattern.

### 4.2 Declarative REST Bindings (apiData)

**Source:** `components/core/alpinejs-framework/data-collect.js`

**HTML Pattern:**
```html
<div apiData="get.products"
     keyName="products"
     data-limit="12"
     data-page="1">
```

**Behavior:**
1. `apiData="get.products"` → Calls `Shop.get_products()` method
2. `keyName="products"` → Stores response in `data.products`
3. `data-*` attributes → Passed as request parameters

**Schema Mapping:**
```json
{
  "dataSources": [{
    "id": "productList",
    "endpoint": "get.products",
    "keyName": "products",
    "limit": 12
  }]
}
```

### 4.3 Action Handler Pattern (alpineListener)

**Source:** `components/core/alpinejs-framework/autoload.js`

**HTML Pattern:**
```html
<button @click="alpineListeners('Shop.post_carts', $event.currentTarget)"
        data-product_id="123"
        keyName="cart">
    Add to Cart
</button>
```

**Behavior:**
1. Collects `data-*` attributes and form inputs
2. Calls specified module method
3. Stores response in `data[keyName]`
4. Triggers success/error hooks

**Schema Mapping:**
```json
{
  "actions": [{
    "id": "addToCart",
    "endpoint": "Shop.post_carts",
    "keyName": "cart"
  }]
}
```

### 4.4 Available Modules

**Source:** `components/static/*.js`

| Module | Methods | Purpose |
|--------|---------|---------|
| Shop | `get_products`, `post_carts`, `post_wishlists` | E-commerce |
| Blog | `get_blogPosts`, `get_blogPost` | Blog content |
| User | `post_login`, `post_register`, `get_profile` | Authentication |
| Search | `get_results` | Site search |
| Newsletter | `post_subscribe` | Email signup |
| Gallery | `open` | Image galleries |

### 4.5 SPA Navigation

**Source:** `components/core/classes/page.js`

```javascript
window.href = async function(url) {
    history.pushState(null, null, url);
    data['pageUrl'] = [];
    Page.load();
    document.getElementById('main').scrollIntoView(true);
}
```

**Schema Implication:** Links with `href` property use SPA navigation via `href()` function.

---

## 5. Initial Schema Design

### 5.1 First Iteration: Component-Based Model

The initial schema design used a deeply nested component tree:

```json
{
  "layout": {
    "children": [
      {
        "type": "container",
        "children": [
          {
            "type": "grid",
            "children": [
              {
                "type": "productCard",
                "children": [...]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

**Features:**
- 46 component types
- 4 levels of nested `children` arrays
- ~100 properties per component
- Conditional schemas (`if/then/else`) for type-specific props

### 5.2 Schema Complexity Metrics

| Metric | Value |
|--------|-------|
| Total lines | ~1,900 |
| Component types | 46 |
| Nesting depth | 4 levels |
| Properties per component | ~100 |
| Enum values (component types) | 46 |

---

## 6. Vertex AI Constraints

### 6.1 Encountered Error

When submitted to Google Vertex AI, the initial schema failed with:

```
Error: "The specified schema produces a constraint that has too many
states for serving. Typical causes: schemas with lots of text, long
array length limits (especially when nested), or complex value matchers"

Status: 400, Error code: 3
```

### 6.2 Vertex AI Schema Limitations

| Supported | Not Supported |
|-----------|---------------|
| `type` (UPPERCASE) | `$schema`, `$id`, `$defs`, `$ref` |
| `properties`, `required` | `additionalProperties` |
| `items`, `enum` | `pattern`, `const`, `default` |
| `nullable` | `oneOf`, `allOf`, `if/then/else` |
| `minimum`, `maximum` | `minLength`, `maxLength` |
| `propertyOrdering` | `title`, `description` |

### 6.3 Complexity Factors

The error was caused by:
1. **Deep nesting** - 4 levels of `children` arrays
2. **Large enum** - 46 component types creating combinatorial explosion
3. **Many properties** - ~100 optional properties per component
4. **Recursive structure** - Components containing components

---

## 7. Schema Simplification

### 7.1 Design Decision: Section-Based Model

Instead of fine-grained components, the simplified schema uses **high-level sections**:

| Component Model | Section Model |
|-----------------|---------------|
| `container > grid > card > image + text + button` | `products` section |
| `container > form > input + input + button` | `form` section |
| `section > heading + text + buttons` | `hero` section |

### 7.2 Section Types

10 section types derived from common EXPOZY page patterns:

| Section | Use Case | Source Pattern |
|---------|----------|----------------|
| `hero` | Page headers with CTA | Landing page headers |
| `content` | Text/HTML content blocks | Article bodies |
| `products` | Product grid display | Category pages |
| `posts` | Blog post listings | Blog index pages |
| `form` | User input forms | Contact, login, signup |
| `cta` | Call-to-action blocks | Conversion sections |
| `features` | Feature/benefit lists | Marketing sections |
| `testimonials` | Customer reviews | Social proof sections |
| `faq` | Q&A accordions | Support pages |
| `footer` | Page footers | Site-wide footer |

### 7.3 Simplified Structure

```json
{
  "metadata": { "id", "name", "pageType", "route", "title", "description" },
  "theme": { "primaryColor", "darkMode" },
  "dataSources": [{ "id", "endpoint", "keyName", "limit", "autoLoad" }],
  "actions": [{ "id", "endpoint", "keyName" }],
  "sections": [{
    "type": "hero|content|products|...",
    "title", "subtitle", "content", "className",
    "dataSource", "actionRef", "columns",
    "items": [{ "title", "content", "icon", "href", "image" }],
    "buttons": [{ "text", "href", "actionRef", "variant" }],
    "fields": [{ "name", "label", "type", "placeholder", "required" }]
  }]
}
```

### 7.4 Complexity Reduction

| Metric | Before | After | Reduction |
|--------|--------|-------|-----------|
| Lines | 1,900 | 140 | 93% |
| Section/Component types | 46 | 10 | 78% |
| Nesting depth | 4 | 2 | 50% |
| Properties per section | ~100 | ~13 | 87% |

---

## 8. Final Schema Specification

### 8.1 Top-Level Structure

```json
{
  "type": "OBJECT",
  "properties": {
    "metadata": { ... },
    "theme": { ... },
    "dataSources": { ... },
    "actions": { ... },
    "sections": { ... }
  },
  "required": ["metadata", "sections"],
  "propertyOrdering": ["metadata", "theme", "dataSources", "actions", "sections"]
}
```

### 8.2 EXPOZY Pattern Mapping

| Schema Element | EXPOZY Pattern | Example |
|----------------|----------------|---------|
| `dataSources[].endpoint` | `apiData` attribute | `get.products` |
| `dataSources[].keyName` | `keyName` attribute | `products` |
| `dataSources[].limit` | `data-limit` attribute | `12` |
| `actions[].endpoint` | `alpineListeners()` first arg | `Shop.post_carts` |
| `actions[].keyName` | `keyName` attribute | `cart` |
| `sections[].dataSource` | Reference to data source | Links to `dataSources[].id` |
| `buttons[].actionRef` | Reference to action | Links to `actions[].id` |

### 8.3 Property Ordering

The schema uses `propertyOrdering` to ensure consistent LLM output:

```json
"propertyOrdering": ["id", "type", "className", "title", "subtitle",
                     "content", "backgroundImage", "dataSource",
                     "actionRef", "columns", "items", "buttons", "fields"]
```

This ensures generated templates have predictable structure for downstream processing.

---

## 9. Validation Results

### 9.1 Vertex AI Testing

The simplified schema was successfully tested with Google Vertex AI:

**Prompt:** "Create a website for cars"

**Result:** Valid JSON output containing:
- Metadata with proper page type and SEO fields
- Theme configuration
- Data source for featured cars
- Newsletter signup action
- 6 sections: hero, products, features, testimonials, form, footer

### 9.2 EXPOZY Compatibility

Generated templates maintain EXPOZY compatibility through:
- `endpoint` format matching EXPOZY module patterns
- `keyName` for global data store integration
- `dataSource` / `actionRef` linking sections to declared resources
- `className` supporting TailwindCSS utility classes

---

## 10. Conclusion

### 10.1 Summary

Template Schema v1 was successfully derived from EXPOZY front-end code analysis. The initial component-based design exceeded Vertex AI's complexity limits, necessitating simplification to a section-based model. The final schema:

- Contains 10 high-level section types
- Maps directly to EXPOZY `apiData` and `alpineListener` patterns
- Stays within Vertex AI structured output constraints
- Produces valid, predictable template structures

### 10.2 Trade-offs

| Gained | Lost |
|--------|------|
| Vertex AI compatibility | Fine-grained component control |
| Simpler validation | Deep nesting capabilities |
| Predictable output | 46 → 10 component types |
| Faster generation | Complex conditional layouts |

### 10.3 Future Work

1. **Component expansion** - Add more section types as Vertex AI limits evolve
2. **Validation layer** - Post-generation validation for EXPOZY-specific rules
3. **Template renderer** - Convert JSON templates to EXPOZY HTML/Alpine.js
4. **Prompt engineering** - Optimize prompts for EXPOZY endpoint conventions

---

## References

1. Alpine.js. (n.d.). *Directives documentation*. https://alpinejs.dev/directives

2. expozy-ui. (n.d.). *Alpine-Expozy-StoreFront* [Source code]. GitHub. https://github.com/expozy-ui/Alpine-Expozy-StoreFront

3. Google Cloud. (n.d.). *Structured output - Vertex AI*. https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/control-generated-output

4. Tailwind CSS. (n.d.). *Utility-first CSS framework*. https://tailwindcss.com/docs

5. JSON Schema. (n.d.). *Draft 2020-12 specification*. https://json-schema.org/draft/2020-12

---

## Appendix A: Analyzed Source Files

### A.1 autoload.js - Global Reactive Data

```javascript
// Key pattern: Global Alpine.reactive() initialization
data = Alpine.reactive({
    corePage: PAGEINIT,
    user: USER,
    pageUrl: URL_PARAMETERS,
    openCart: false,
    darkMode: JSON.parse(localStorage.getItem('dark')),
    modals: [],
    table: { loading: false }
});
```

### A.2 data-collect.js - Parameter Collection

```javascript
// Key pattern: data-* attribute extraction
class DataCollect {
    constructor(el) {
        this.attributesData = this.getDataAttributes(el);
        this.formData = this.getFormData(el);
        this.combinedData = {...this.attributesData, ...this.formData};
    }
}
```

### A.3 shop.js - Module Pattern

```javascript
// Key pattern: Module method structure
export let Shop = {
    get_products: async function(dataCollect) {
        let endpoint = Helpers.combineRequest("products", dataCollect.combinedData);
        const api = new ApiClass();
        await api.get(endpoint, false);
        return api.response;
    },
    post_carts: async function(dataCollect) {
        let api = new ApiClass();
        await api.post('carts', dataCollect.combinedData);
        return api.response;
    }
};
```

---

## Appendix B: Schema Evolution

| Version | Date | Changes |
|---------|------|---------|
| v0.1 | Dec 2025 | Initial component-based design (46 types) |
| v0.2 | Dec 2025 | Vertex AI format compliance (UPPERCASE types) |
| v0.3 | Jan 2026 | Removed unsupported fields ($defs, pattern, etc.) |
| v1.0 | Jan 2026 | Section-based model (10 types), Vertex AI compatible |
