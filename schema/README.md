# EXPOZY Template Schema v1

## Overview

Template Schema v1 is a JSON Schema designed for AI-powered page template generation in EXPOZY. It provides a structured output format that ensures validity, security, and compatibility with the EXPOZY front-end framework.

This schema enables LLMs to generate template packages that are:
- **Valid**: Structurally correct and machine-checkable
- **Secure**: Prevents script injection and unsafe patterns
- **Compatible**: Aligns with EXPOZY's `apiData`, `alpineListener`, and routing conventions
- **Maintainable**: Uses stable component building blocks

## Schema Dialect

Template Schema v1 uses **JSON Schema Draft 2020-12** for modern keyword support and broad validator compatibility.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema"
}
```

## Template Package Structure

A template package consists of five main sections:

```json
{
  "$schema": "https://expozy.com/schemas/template-schema-v1.json",
  "metadata": { ... },
  "designSystem": { ... },
  "dataSources": [ ... ],
  "actions": [ ... ],
  "layout": { ... }
}
```

### 1. Metadata

Identifies the template and provides SEO/routing information.

```json
{
  "metadata": {
    "id": "product-listing-page",
    "name": "Product Listing Page",
    "description": "A responsive product listing with filters and pagination",
    "pageType": "category",
    "schemaVersion": "1.0.0",
    "route": "/products",
    "seo": {
      "title": "Our Products",
      "description": "Browse our collection of products"
    },
    "languages": ["en", "bg"]
  }
}
```

### 2. Design System

Configures styling preferences and theme.

```json
{
  "designSystem": {
    "tailwindMode": "freeform",
    "theme": {
      "primaryColor": "indigo-600",
      "borderRadius": "lg"
    },
    "darkMode": true,
    "responsive": true
  }
}
```

### 3. Data Sources

Declarative REST API bindings that map to EXPOZY's `apiData` attribute pattern.

**EXPOZY HTML Pattern:**
```html
<div apiData="get.products" keyName="products" data-limit="12" data-page="1">
```

**Schema Equivalent:**
```json
{
  "dataSources": [
    {
      "id": "productList",
      "endpoint": "get.products",
      "keyName": "products",
      "params": {
        "limit": 12,
        "page": 1
      },
      "autoLoad": true
    }
  ]
}
```

### 4. Actions

User interaction handlers that map to EXPOZY's `alpineListener` pattern.

**EXPOZY HTML Pattern:**
```html
<button @click="alpineListeners('Shop.post_carts', $event.currentTarget)"
        data-product_id="123" keyName="cart">
  Add to Cart
</button>
```

**Schema Equivalent:**
```json
{
  "actions": [
    {
      "id": "addToCart",
      "endpoint": "Shop.post_carts",
      "keyName": "cart",
      "params": {
        "product_id": { "binding": "data.selectedProduct.id" }
      }
    }
  ]
}
```

### 5. Layout

A tree of components that defines the page structure.

```json
{
  "layout": {
    "className": "min-h-screen bg-gray-50",
    "children": [
      {
        "type": "hero",
        "variant": "centered",
        "title": "Our Products",
        "subtitle": "Discover our latest collection"
      },
      {
        "type": "container",
        "children": [
          {
            "type": "grid",
            "columns": { "default": 1, "md": 2, "lg": 4 },
            "gap": "6",
            "children": [
              {
                "type": "template",
                "iterator": "product",
                "collection": "data.products.result",
                "key": "product.id",
                "children": [
                  {
                    "type": "productCard",
                    "productBinding": "product"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

## Component Types

The schema supports 40+ component types organized by category:

### Layout Components
- `container` - Centered max-width container
- `section` - Semantic section with background options
- `grid` - CSS Grid layout with responsive columns
- `flex` - Flexbox layout container

### Content Components
- `heading` - H1-H6 headings with size variants
- `text` - Paragraph/span text content
- `image` - Optimized image with aspect ratio
- `icon` - Bootstrap icon
- `richText` - Sanitized HTML content

### Interactive Components
- `button` - Action button with variants
- `link` - Navigation link (SPA or external)
- `form` - Form container with action binding
- `input`, `select`, `textarea` - Form controls

### Data Display Components
- `productCard` - E-commerce product card
- `blogCard` - Blog post card
- `table` - Data table with sorting
- `gallery` - Image gallery with lightbox
- `carousel` - Image/content carousel

### Navigation Components
- `pagination` - Page navigation
- `breadcrumb` - Breadcrumb trail
- `tabs` - Tabbed content
- `accordion` - Collapsible sections

### Utility Components
- `modal` - Modal dialog
- `badge` - Status badge
- `divider` - Horizontal/vertical divider
- `spacer` - Vertical spacing

## Data Binding

Components can bind to the global `data` object using expressions:

```json
{
  "type": "text",
  "bindings": {
    "text": "product.title"
  }
}
```

### Conditional Display

```json
{
  "type": "badge",
  "content": "Sale",
  "conditional": {
    "show": "product.on_sale"
  }
}
```

### Event Binding

```json
{
  "type": "button",
  "content": "Add to Cart",
  "events": {
    "click": {
      "actionRef": "addToCart"
    }
  }
}
```

## Security Constraints

### Safe Expressions
Expressions are restricted to a safe character set to prevent injection:
```
^[a-zA-Z0-9_.\\[\\]'\"\\s+\\-*/%<>=!&|?:(),]+$
```

### Allowlisted Attributes
Only safe HTML attributes are permitted (id, name, title, alt, aria-*, role, etc.).

### Sanitized HTML
The `richText` component requires content sanitization before rendering.

### Forbidden Patterns
- Arbitrary `<script>` tags
- Inline event handlers (`onclick=`)
- DOM sinks without sanitization

## Mapping to EXPOZY Patterns

| Schema Concept | EXPOZY Pattern |
|---------------|----------------|
| `dataSources[].endpoint` | `apiData="get.products"` |
| `dataSources[].keyName` | `keyName="products"` |
| `dataSources[].params` | `data-*` attributes |
| `actions[].endpoint` | `alpineListeners('Shop.post_carts', ...)` |
| `bindings.text` | `x-text="product.title"` |
| `conditional.show` | `x-show="product.on_sale"` |
| `template` component | `<template x-for="...">` |
| Link `spa: true` | `@click="href('/path')"` |

## Validation

Validate template packages using any JSON Schema Draft 2020-12 compatible validator:

```javascript
import Ajv from 'ajv/dist/2020';
import schema from './template-schema-v1.json';

const ajv = new Ajv();
const validate = ajv.compile(schema);

const valid = validate(templatePackage);
if (!valid) {
  console.error(validate.errors);
}
```

## Semantic Validation

Some EXPOZY constraints require additional validation beyond JSON Schema:

1. **apiData Placement**: Data sources should not be rendered inside `<template>` tags
2. **keyName Uniqueness**: Each `keyName` should be unique across data sources
3. **Action References**: `actionRef` values must reference declared actions
4. **Data Source References**: Component bindings should reference declared data sources

## Version History

- **v1.0.0** (2025-12): Initial release with core component set and EXPOZY pattern mappings

## References

- [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12)
- [EXPOZY Storefront Framework](https://github.com/expozy-ui/Alpine-Expozy-StoreFront)
- [Alpine.js Documentation](https://alpinejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
