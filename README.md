# 🦔 Hit Counter

*A web component and service for displaying site visits* ✨

## 🚀 Quick Start

```html
<script type="module" src="dist/component/hit-counter.js"></script>
<hit-counter value="1234"></hit-counter>
```

`pnpm start:client` to view component variants
`pnpm start:server` to start the server

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
| `is-negative` | boolean | Show minus sign |
| `visitors`    | boolean | Show "visitors" label |
| `is-retro`    | boolean | Enable 90s beveled styling |

## 🎨 Styling / Theming

### CSS Variables

There are 13 variables that can be overridden.

```css
hit-counter {
  /* Basic styling */
  --hit-counter-color: #333;              /* Main text color */
  --hit-counter-font-size: 1.25rem;       /* Font size */
  --hit-counter-negative-color: #e74c3c;  /* Negative sign color */
  --hit-counter-text-color: #666;        /* "visitors" label color */
}
```

### Retro Theme Variables
```css
hit-counter {
  /* Beveled digit backgrounds */
  --hit-counter-bg-light: #e0e0e0;                      /* Gradient light */
  --hit-counter-bg-dark: #707070;                       /* Gradient dark */
  
  /* Digit styling */
  --border-color: #c0c0c0;                  /* Digit border */
  --digit-color: #000;                       /* Digit text */
  --text-glow: 1px 1px 0 #fff, -1px -1px 0 #404040; /* Text shadow */
  
  /* Shadow effects */
  --inner-light: rgba(255,255,255,0.8);     /* Inner light shadow */
  --inner-dark: rgba(0,0,0,0.5);            /* Inner dark shadow */
  --outer-glow: none;                        /* Outer glow effect */
  
  /* Overlay effects */
  --overlay-light: rgba(255,255,255,0.4);   /* Overlay light */
  --overlay-dark: rgba(0,0,0,0.1);          /* Overlay dark */
}
```

### Dark Mode (Auto-Applied)
Dark mode automatically applies these values when `is-retro` is enabled:
```css
/* Matrix green terminal theme */
--hit-counter-bg-light: #2a2a2a;
--digit-color: #00ff00;
--text-glow: 0 0 3px currentColor, 1px 1px 0 #004400;
--outer-glow: 0 0 10px rgba(0,255,0,0.2);
```

## 🔧 JavaScript API

```javascript
const counter = document.querySelector('hit-counter');
counter.toggleNegative();
counter.toggleVisitors();
counter.toggleRetro();

HitCounter.render(); // re-render the component. This is not advised as it can cause performance issues

```

## 🌟 Browser Support

Modern browsers with Custom Elements v1, Shadow DOM v1, ES6 Classes  
*(Chrome 54+, Firefox 63+, Safari 10.1+, Edge 79+)*

**Accessibility:** ARIA labels, high contrast support, screen reader friendly
