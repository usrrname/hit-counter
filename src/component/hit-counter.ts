export interface HitCounterAttributes {
  id?: string;
  value?: string;
  'is-negative'?: boolean;
  visitors?: boolean;
  'is-retro'?: boolean;
}

class HitCounter extends HTMLElement {
  private _attrs: HitCounterAttributes = {};
  shadowRoot!: ShadowRoot;

  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.render = this.render.bind(this);
    this.setProps(this._attrs);
  }

  static get observedAttributes(): (keyof HitCounterAttributes)[] {
    return ['id','value', 'is-negative', 'visitors', 'is-retro'];
  }

  connectedCallback() {
    this.render();
  }

  private setProps(_attrs: HitCounterAttributes) {
    for (const [key, value] of Object.entries(_attrs)) {
      switch (key) {
        case 'value':
          this.setAttribute('value', this.validateValue(value));
          break;
        case 'is-negative':
        case 'visitors':
        case 'is-retro':
          this.toggleAttribute(key);
          break;
        default:
          this._attrs[key as keyof HitCounterAttributes] = value || undefined;
      }
    }
  }

  attributeChangedCallback(name: keyof HitCounterAttributes, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue) {
      // @ts-ignore
      this._attrs[name] = newValue || undefined;
    }
    this.setProps(this._attrs);
  }

  get id() {
    return this.getAttribute('id') || '';
  }

  get value() {
    return this.getAttribute('value') || '0';
  }

  get isNegative() {
    return this.hasAttribute('is-negative') && this.getAttribute('is-negative') !== 'false';
  }

  get showVisitors() {
    return this.hasAttribute('visitors') && this.getAttribute('visitors') !== 'false';
  }

  get isRetro() {
    return this.hasAttribute('is-retro') && this.getAttribute('is-retro') !== 'false';
  }

  /**
   * Quantify the number of visitors.
   * @param {string} value - it's a string as values become coerced to string on component attribute APIs
   * @returns {string} The quantified number of visitors
   */
  private quantifyVisitors(value: string) {
    const numericValue = parseInt(value);
    switch (numericValue) {
      case 0:
        console.warn('🦔 HitCounter: 0 value detected, you might wanna check your setup');
        return 'No visitors yet 🍃';
      case 1:
        return ' visitor';
      default:
        return ' visitors';
    }
  }

  /**
   * Validate the value of the counter.
   * @param {string} value The value to validate
   * @returns {string} The validated value
   */
  validateValue(value: string) {
    const numValue = parseInt(value.split(',').join(''));

    if (isNaN(numValue)) {
      console.warn(`🦔 HitCounter: Invalid value "${value}" provided, but letting it through anyway`);
      return Math.abs(numValue).toString();
    }
    return Math.abs(numValue).toString();
  }

  render() {
    const id = this.id;
    const value = this.validateValue(this.value);
    const showNegativeSign = this.isNegative;
    const visitors = this.showVisitors || value == '0' ? this.quantifyVisitors(value) : '';

    // If the value is 0, don't display anything
    // If is-retro is true, render the digits
    // Otherwise, render the value
    let displayedValue = value == '0' ? '' : this.isRetro ? this.renderDigits(value) : value;

    this.shadowRoot!.innerHTML = `
      <style>
        .counter-container {
          display: inline-flex;
          align-items: flex-end;
          gap: 0.25em;
        }

        :host {
          color-scheme: light;
          display: inline-block;
          font-family: 'Noto Sans', 'Roboto', sans-serif;
          font-weight: 500;
          color: var(--hit-counter-color, #333);
          font-size: var(--hit-counter-font-size, 1.25rem);
          line-height: 1.2;
        }

        :host([is-retro]),
        :host([is-retro]) .digit,
        :host([is-retro]) .separator {
         font: bold 1em/1.2 'Fira Code', 'Monaco', monospace;
          position: relative;
          display: inline-block;
          width: 1em;
          height: 1.2em;
          text-align: center;
          background: linear-gradient(135deg, var(--hit-counter-bg-light, #e0e0e0), var(--hit-counter-bg-dark, #707070));
          border: 2px outset var(--hit-counter-border-color, #c0c0c0);
          border-radius: 4px;
          color: var(--hit-counter-text-color, #000);
          text-shadow: var(--hit-counter-text-glow, 1px 1px 0 #fff, -1px -1px 0 #404040);
          box-shadow: 
            inset 1px 1px 2px var(--hit-counter-inner-light, rgba(255,255,255,0.8)),
            inset -1px -1px 2px var(--hit-counter-inner-dark, rgba(0,0,0,0.5)),
            2px 2px 6px rgba(0,0,0,0.4),
            var(--hit-counter-outer-glow, none);
        }

        :host([is-retro]) .digit::before {
          content: '';
          position: absolute;
          inset: 1px;
          background: linear-gradient(135deg, var(--hit-counter-overlay-light, rgba(255,255,255,0.4)), var(--hit-counter-overlay-dark, rgba(0,0,0,0.1)));
          border-radius: 2px;
          pointer-events: none;
        }
  
        :host([is-negative]) .start-slot,
        :host([is-negative]) slot[name="start"] {
          display: inline-block;
          color: var(--hit-counter-negative-color, #e74c3c);
          font-weight: 600;
        }

        :host([visitors]) slot[name="end"],
        :host([visitors]) .end-slot {
          color: var(--hit-counter-label-color, #666);
          font-weight: 400;
          font-size: 0.9em;
        }

        /* Retro variant dark mode */
        @media (prefers-color-scheme: dark) {
          :host([is-retro]) {
            --hit-counter-bg-light: #2a2a2a;
            --hit-counter-bg-dark: #0a0a0a;
            --hit-counter-border-color: #404040;
            --hit-counter-text-color: #00ff00;
            --hit-counter-color: #00ff00;
            --hit-counter-text-glow: 0 0 3px currentColor, 1px 1px 0 #004400;
            --hit-counter-inner-light: rgba(255,255,255,0.1);
            --hit-counter-inner-dark: rgba(0,0,0,0.8);
            --hit-counter-outer-glow: 0 0 10px rgba(0,255,0,0.2);
            --hit-counter-overlay-light: rgba(0,255,0,0.1);
            --hit-counter-overlay-dark: rgba(0,0,0,0.2);
            }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          :host {
            color: CanvasText;
          }
          
          :host([slot="start"]), :host([slot[name="start"]]), :host([slot="end"]), :host([slot[name="end"]]) {
            color: CanvasText;
          }
        
        }
      </style>
      
      <div id="inner-${id}" data-testid="test-${this.getAttribute('id')}" class="counter-container" role="text" aria-label="${this.getAriaLabel()}">
          ${showNegativeSign ? '<slot class="start-slot" name="start" aria-hidden>-</slot>' : ''}
          <slot>${displayedValue}</slot>
          ${visitors ? `<slot class="end-slot" name="end" aria-hidden>${visitors}</slot>` : ''}
        </div>
    `;
  }
  /** Render digits with 90s beveled styling and formatting */
  renderDigits(value: string) {
    return (parseInt(value) || 0).toLocaleString()
      .split('')
      .map(char => char === ',' ? '<span class="digit separator">,</span>' : `<span class="digit">${char}</span>`)
      .join('');
  }

  getAriaLabel() {
    const value = this.validateValue(this.value);

    if (this.isNegative) return 'For some reason, this site\'s maintainer wants to show the number of visitors as negative. ';
    const numericValue = parseInt(value);
    const result = this.quantifyVisitors(value);
    return numericValue !== 0 ? ` ${numericValue} ${result}` : '0 visitors';
  }

  set value(value: string) {
    this.setAttribute('value', this.validateValue(value));
  }

  toggleNegative() {
    this.toggleAttribute('is-negative');
  }

  toggleVisitors() {
    this.toggleAttribute('visitors');
  }

  toggleRetro() {
    this.toggleAttribute('is-retro');
  }
}

export default HitCounter;

customElements.define('hit-counter', HitCounter);
