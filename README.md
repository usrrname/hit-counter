# 🦔 Hit Counter

*A web component and service for displaying site visits from Google Analytics* ✨

## 🚀 Quick Start

```html
<script type="module" src="./component/index.js"></script>
<hit-counter value="1234"></hit-counter>
```
`pnpm start` to start the server and view the component variants at http://localhost:3000/app.html
`pnpm start:client` to view the component variants at http://localhost:3000/
`pnpm start:server` to start the server with the service at http://localhost:3000/api

## 📖 Usage

```html
<!-- Basic -->
<hit-counter value="1234"></hit-counter>

<!-- Negative with visitors -->
<hit-counter value="1234" is-negative="true" visitors="true"></hit-counter>
<!-- Output: -1234 visitors -->

<!-- Retro themes -->
<hit-counter value="1337" is-retro="true"></hit-counter>
```

## 🎛️ Attributes

| Attribute     | Type    | Description |
|---------------|---------|-------------|
| `value`       | string  | Number to display (auto-formatted) |
| `is-negative` | boolean | Show minus sign in front of value - just for fun|
| `visitors`    | boolean | Show "visitors" label |
| `is-retro`    | boolean | Enable 90s beveled styling |

## 🎨 Styling / Theming

### CSS Variables

There are 11 variables to theme the component.

```css
/* Basic styling */
hit-counter {
  --hit-counter-text-color: #000 | #00ff00;              /* Main text color */
  --hit-counter-font-size: 1.25rem;       /* Font size */
  --hit-counter-negative-color: #e74c3c;  /* Negative sign color */
}
```

### Retro Theme Variables (default light and dark)
```css
  /* Digit styling - light and dark*/
hit-counter {
  --hit-counter-bg-light: #e0e0e0 | #1b1b1b;                      /* Gradient light */
  --hit-counter-bg-dark: #707070 | #6d6b6b;                       /* Gradient dark */
  --hit-counter-border-color: #c0c0c0 | rgb(130, 0, 229);                  /* Digit border */
  --hit-counter-text-glow: 1px 1px 0 #fff, -1px -1px 0 #404040; /* Text shadow */
  
  /* Shadow effects */
  --hit-counter-text-glow: 0 0 3px currentColor, 1px 1px 0 #004400;
  --hit-counter-inner-light: rgba(255,255,255,0.8);     /* Inner light shadow */
  --hit-counter-inner-dark: rgba(0,0,0,0.5);            /* Inner dark shadow */
  --hit-counter-outer-glow: none | 0 0 10px rgba(0,255,0,0.2);                        /* Outer glow effect */
  
  /* Overlay effects */
  --hit-counter-overlay-light: rgba(255,255,255,0.4);   /* Overlay light */
  --hit-counter-overlay-dark: rgba(0,0,0,0.1);          /* Overlay dark */
}
```

## 🔧 JavaScript API

```javascript
const counter = document.querySelector('hit-counter');
counter.toggleNegative();
counter.toggleVisitors();
counter.toggleRetro();

```

## 🌟 Browser Support

Modern browsers with Custom Elements v1, Shadow DOM v1, ES6 Classes  
*(Chrome 54+, Firefox 63+, Safari 10.1+, Edge 79+)*

**Accessibility:** ARIA labels, high contrast support, screen reader friendly
