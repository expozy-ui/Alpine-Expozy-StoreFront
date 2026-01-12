# EXPOZY Template Schema v1

## Overview

Template Schema v1 is a JSON Schema designed for AI-powered page template generation in EXPOZY using Google Vertex AI's structured output feature. The schema ensures that LLM-generated templates are valid, secure, and compatible with the EXPOZY front-end framework.

## Vertex AI Compatibility

This schema follows **Google Vertex AI structured output conventions** and uses only supported fields:

| Supported | Not Supported |
|-----------|---------------|
| `type` (UPPERCASE) | `$schema`, `$id`, `$defs`, `$ref` |
| `properties` | `additionalProperties` |
| `required` | `pattern`, `const`, `default` |
| `items` | `oneOf`, `allOf`, `if/then/else` |
| `enum` (strings only) | `minLength`, `maxLength` |
| `nullable` | `title`, `description` |
| `minimum`, `maximum` | |
| `minItems`, `maxItems` | |
| `format` (date, date-time, time, duration) | |
| `propertyOrdering` | |
| `anyOf` | |

## Type Format

All types use UPPERCASE format as required by Vertex AI:

```json
{
  "type": "OBJECT",
  "properties": {
    "name": { "type": "STRING" },
    "count": { "type": "INTEGER" },
    "price": { "type": "NUMBER" },
    "active": { "type": "BOOLEAN" },
    "items": { "type": "ARRAY", "items": { "type": "STRING" } }
  }
}
```

## Template Package Structure

A template package consists of five main sections:

```json
{
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

**Page Types:** `landing`, `product`, `category`, `blog`, `blogPost`, `cart`, `checkout`, `account`, `search`, `contact`, `custom`

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

**Tailwind Modes:** `freeform`, `tokenized`, `restricted`

**Border Radius:** `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `full`

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

**Available Params:** `limit`, `page`, `sort`, `order`, `category`, `category_id`, `brand`, `brand_id`, `search`, `slug`, `id`, `parent_id`, `post_id`, `product_id`, `user_id`, `exclude`, `min_price`, `max_price`, `in_stock`, `featured`, `on_sale`

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
        "quantity": 1
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
        "type": "container",
        "maxWidth": "xl",
        "children": [
          {
            "type": "heading",
            "level": 1,
            "content": "Welcome"
          }
        ]
      }
    ]
  }
}
```

## Component Types

The schema supports 40+ component types:

### Layout Components
| Type | Description |
|------|-------------|
| `container` | Centered max-width container |
| `section` | Semantic section with background options |
| `grid` | CSS Grid layout with responsive columns |
| `flex` | Flexbox layout container |

### Content Components
| Type | Description |
|------|-------------|
| `heading` | H1-H6 headings (level 1-6) |
| `text` | Paragraph/span text content |
| `image` | Optimized image with aspect ratio |
| `icon` | Bootstrap icon (bi-*) |
| `richText` | Sanitized HTML content |
| `badge` | Status badge |
| `divider` | Horizontal/vertical divider |
| `spacer` | Vertical spacing |

### Interactive Components
| Type | Description |
|------|-------------|
| `button` | Action button with variants |
| `link` | Navigation link (SPA or external) |
| `form` | Form container with action binding |
| `input` | Text input field |
| `select` | Dropdown select |
| `textarea` | Multi-line text input |
| `checkbox` | Checkbox input |
| `radio` | Radio button |
| `searchBar` | Search input with action |

### Data Display Components
| Type | Description |
|------|-------------|
| `productCard` | E-commerce product card |
| `blogCard` | Blog post card |
| `table` | Data table with columns |
| `gallery` | Image gallery |
| `carousel` | Image/content carousel |
| `rating` | Star rating display |
| `price` | Price display with currency |

### Navigation Components
| Type | Description |
|------|-------------|
| `pagination` | Page navigation |
| `breadcrumb` | Breadcrumb trail |
| `tabs` | Tabbed content |
| `accordion` | Collapsible sections |

### Utility Components
| Type | Description |
|------|-------------|
| `template` | Loop iterator (x-for) |
| `modal` | Modal dialog |
| `filter` | Filter controls |
| `quantity` | Quantity selector |

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

### Template Loops

```json
{
  "type": "template",
  "iterator": "product",
  "collection": "data.products.result",
  "itemKey": "product.id",
  "children": [
    {
      "type": "productCard",
      "productBinding": "product"
    }
  ]
}
```

## Property Ordering

The schema uses `propertyOrdering` to ensure consistent output order from the LLM. Properties are generated in the specified order, which is important for:

1. Consistent template structure
2. Predictable rendering behavior
3. Easier debugging and maintenance

## Mapping to EXPOZY Patterns

| Schema Concept | EXPOZY Pattern |
|----------------|----------------|
| `dataSources[].endpoint` | `apiData="get.products"` |
| `dataSources[].keyName` | `keyName="products"` |
| `dataSources[].params` | `data-*` attributes |
| `actions[].endpoint` | `alpineListeners('Shop.post_carts', ...)` |
| `bindings.text` | `x-text="product.title"` |
| `conditional.show` | `x-show="product.on_sale"` |
| `template` component | `<template x-for="...">` |
| Link `spa: true` | `@click="href('/path')"` |

## Usage with Vertex AI

### Python Example

```python
from google import genai
from google.genai.types import GenerateContentConfig, HttpOptions
import json

# Load the schema
with open('template-schema-v1.json', 'r') as f:
    response_schema = json.load(f)

client = genai.Client(http_options=HttpOptions(api_version="v1"))

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Create a product listing page with filters and pagination",
    config=GenerateContentConfig(
        response_mime_type="application/json",
        response_schema=response_schema,
    ),
)

template = json.loads(response.text)
```

### REST API Example

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": {
      "role": "user",
      "parts": {
        "text": "Create a product listing page with filters and pagination"
      }
    },
    "generation_config": {
      "responseMimeType": "application/json",
      "responseSchema": '"$(cat template-schema-v1.json)"'
    }
  }' \
  "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-2.5-flash:generateContent"
```

## Semantic Validation

Some EXPOZY constraints require additional validation beyond JSON Schema:

1. **apiData Placement**: Data sources should not be rendered inside `<template>` tags
2. **keyName Uniqueness**: Each `keyName` should be unique across data sources
3. **Action References**: `actionRef` values must reference declared actions
4. **Data Source References**: Component bindings should reference declared data sources

## Version History

- **v1.0.0** (2025-12): Initial release with Vertex AI structured output compatibility

## References

- [Google Vertex AI Structured Output](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/control-generated-output)
- [EXPOZY Storefront Framework](https://github.com/expozy-ui/Alpine-Expozy-StoreFront)
- [Alpine.js Documentation](https://alpinejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
