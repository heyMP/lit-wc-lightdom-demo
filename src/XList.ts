import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
// @ts-ignore
import lightdomStyles from './x-list-lightdom.css' assert { type: 'css' };

// Make a shared constructable stylesheet.
// This will bethe cononical source of styles for this element's shadowroot
// and lightdom.
let styles = new CSSStyleSheet();
// Read the original styleSheet that was created by a traditional <link>
const styleSheet = Array.from(document.styleSheets).find(i => i.title === "x-list");
// move all of the style from the original into the new constructable stylesheet
if (styleSheet) {
  for (const rule of Object.values(styleSheet.cssRules)) {
    styles.insertRule(rule.cssText, styles.cssRules.length);
  }
  // Now adopt the constructable stylesheet to the document
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, styles];

  // Now disabled the original lightdom style
  styleSheet.disabled = true;
  document.styleSheets.item(0)?.ownerNode?.remove();
}
else {
  styles = lightdomStyles;
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, styles];
}

export class XList extends LitElement {
  static tag = `x-list`;
  static styles = styles;

  @property({ type: Array })
  public items = [];

  @property({ type: Array })
  public done: Number[] = [];

  willUpdate(changed: PropertyValues<this>) {
    if (changed.has('done') && this.done) {
      this.done = this.done.map(i => Number(i));
    }
  }

  render() {
    return html`
      ${this.items?.length > 0 ? html`
        <ul>
          ${this.items.map((item, index) => html`
            <li ?done=${this.done.includes(index)}><a href="#">${item}</a></li>
          `)}
        </ul>
      ` : html` <slot></slot> `}
    `;
  }
}
