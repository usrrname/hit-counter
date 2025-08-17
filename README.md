# 🦔 Hit Counter

*A web component and service for displaying site visits from Google Analytics* ✨

## 🚀 Quick Start

```html
<script type="module" src="./component/index.js"></script>
<hit-counter value="1234"></hit-counter>
```
`pnpm start:server` to start the server with the service at http://localhost:3000/index.html
`pnpm start:client` to view the component variants at http://localhost:3000/


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

There are 13 variables to theme the component.

```css
/* Basic styling */
  --hit-counter-text-color: #000 | #00ff00;              /* Main text color */
  --hit-counter-font-size: 1.25rem;       /* Font size */
  --hit-counter-negative-color: #e74c3c;  /* Negative sign color */
```

### All variables (defaults)
```css
  /* Font styling */
  --hit-counter-font-size: 1.25rem;

  /* Text effect <light|dark> */
  --hit-counter-text-color: #000 | #00ff00;
  --hit-counter-text-glow: none | 0 0 3px currentColor, 1px 1px 0 #00ff00;

  /* Digit styling */
  --hit-counter-bg-light: #e0e0e0;
  --hit-counter-bg-dark: #707070;
  --hit-counter-border-color: #c0c0c0;
  --hit-counter-overlay-light: rgba(0,255,0,0.1);
  --hit-counter-overlay-dark: rgba(0,0,0,0.2);
  --hit-counter-inner-light: rgba(255,255,255,0.8);
  --hit-counter-inner-dark: rgba(0,0,0,0.5);
  --hit-counter-outer-glow: none | 0 0 10px rgba(0,255,0,0.2);
```

### Retro Theme Variables (defaults)

There are 10 variables to theme the retro variant.
```css
/* Retro variant dark mode defaults */
--hit-counter-text-color: var(--hit-counter-text-color, #00ff00);
--hit-counter-bg-light: var(--hit-counter-bg-light, #1b1b1b);
--hit-counter-bg-dark: var(--hit-counter-bg-dark, #6d6b6b);
--hit-counter-text-glow: 0 0 3px currentColor, 1px 1px 0 var(--hit-counter-text-glow, #00ff00);
--hit-counter-inner-light: var(--hit-counter-inner-light, rgba(255,255,255,0.1));
--hit-counter-inner-dark: var(--hit-counter-inner-dark, rgba(0,0,0,0.8));
--hit-counter-outer-glow: var(--hit-counter-outer-glow, 0 0 10px rgba(0,255,0,0.2));
--hit-counter-overlay-light: var(--hit-counter-overlay-light, rgba(0,255,0,0.1));
--hit-counter-overlay-dark: var(--hit-counter-overlay-dark, rgba(0,0,0,0.2));
--hit-counter-border-color: var(--hit-counter-border-color, rgb(130, 0, 229));

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

