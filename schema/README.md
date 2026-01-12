# EXPOZY Template Schema v1

## Overview

A simplified JSON Schema for AI-powered page template generation using Google Vertex AI's structured output. Designed to stay within Vertex AI's complexity limits while mapping to EXPOZY framework patterns.

## Schema Structure

```json
{
  "metadata": { ... },
  "theme": { ... },
  "dataSources": [ ... ],
  "actions": [ ... ],
  "sections": [ ... ]
}
```

## Metadata

```json
{
  "metadata": {
    "id": "product-page",
    "name": "Product Page",
    "pageType": "category",
    "route": "/products",
    "title": "Our Products",
    "description": "Browse our collection"
  }
}
```

**Page Types:** `landing`, `product`, `category`, `blog`, `cart`, `account`, `contact`, `custom`

## Theme

```json
{
  "theme": {
    "primaryColor": "indigo-600",
    "darkMode": true
  }
}
```

## Data Sources

Maps to EXPOZY `apiData` pattern.

```json
{
  "dataSources": [
    {
      "id": "productList",
      "endpoint": "get.products",
      "keyName": "products",
      "limit": 12,
      "autoLoad": true
    }
  ]
}
```

## Actions

Maps to EXPOZY `alpineListener` pattern.

```json
{
  "actions": [
    {
      "id": "addToCart",
      "endpoint": "Shop.post_carts",
      "keyName": "cart"
    }
  ]
}
```

## Sections

High-level page sections instead of deeply nested components.

**Section Types:** `hero`, `content`, `products`, `posts`, `form`, `cta`, `features`, `testimonials`, `faq`, `footer`

### Hero Section

```json
{
  "type": "hero",
  "title": "Welcome",
  "subtitle": "Discover our products",
  "backgroundImage": "/images/hero.jpg",
  "buttons": [
    { "text": "Shop Now", "href": "/products", "variant": "primary" }
  ]
}
```

### Products Section

```json
{
  "type": "products",
  "dataSource": "productList",
  "columns": 4
}
```

### Form Section

```json
{
  "type": "form",
  "title": "Contact Us",
  "actionRef": "submitContact",
  "fields": [
    { "name": "email", "type": "email", "required": true },
    { "name": "message", "type": "textarea" }
  ],
  "buttons": [
    { "text": "Send", "variant": "primary" }
  ]
}
```

### Features Section

```json
{
  "type": "features",
  "title": "Why Choose Us",
  "columns": 3,
  "items": [
    { "title": "Fast Shipping", "icon": "bi-truck", "content": "Free delivery" },
    { "title": "Secure", "icon": "bi-shield", "content": "Safe payments" }
  ]
}
```

### CTA Section

```json
{
  "type": "cta",
  "title": "Ready to Start?",
  "content": "Join thousands of happy customers",
  "buttons": [
    { "text": "Get Started", "href": "/signup", "variant": "primary" }
  ]
}
```

## Button Variants

`primary`, `secondary`, `outline`

## Field Types

`text`, `email`, `password`, `textarea`, `select`, `checkbox`

## Mapping to EXPOZY

| Schema | EXPOZY Pattern |
|--------|----------------|
| `dataSources[].endpoint` | `apiData="get.products"` |
| `dataSources[].keyName` | `keyName="products"` |
| `actions[].endpoint` | `alpineListeners('Shop.post_carts', ...)` |
| `sections[].dataSource` | References a declared data source |
| `buttons[].actionRef` | References a declared action |

## Usage with Vertex AI

```python
from google import genai
import json

with open('template-schema-v1.json', 'r') as f:
    schema = json.load(f)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Create a product listing page",
    config=GenerateContentConfig(
        response_mime_type="application/json",
        response_schema=schema,
    ),
)
```

## Design Philosophy

This schema prioritizes:

1. **Simplicity** - Section-based model instead of deeply nested components
2. **Vertex AI compatibility** - Stays within state complexity limits
3. **EXPOZY alignment** - Maps to apiData, alpineListener, and routing patterns
4. **Flexibility** - className allows custom Tailwind styling per section
