import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
// @ts-ignore
import lightdomStyles from './x-list.css' assert { type: 'css' };

// Make a shared constructable stylesheet.
// This will bethe cononical source of styles for this element's shadowroot
// and lightdom.
let styles = new CSSStyleSheet();
// Read the original styleSheet that was created by a traditional <link>
const styleSheets = Array.from(document.styleSheets).filter(i => i.title === "x-list");
// move all of the style from the original into the new constructable stylesheet
if (styleSheets && styleSheets.length > 0) {
  for (const styleSheet of styleSheets) {
    // Move all of the CSSRules from the lightdom stylesheet to
    // the constructed stylesheet
    for (const rule of Object.values(styleSheet.cssRules)) {
      styles.insertRule(rule.cssText, styles.cssRules.length);
    }
    // Now adopt the constructable stylesheet to the document
    // so that it can be shared by both the lightdom and shadowroots
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, styles];

    // Now disabled the original lightdom stylesheet and remove it
    // so that we don't have two competing stylesheets
    styleSheet.disabled = true;
    document.styleSheets.item(0)?.ownerNode?.remove();
  }
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

  _toggleCheckbox(e: any) {
    e.target.closest('li').toggleAttribute('done');
  }

  render() {
    return html`
      <div part="base" @click=${this._toggleCheckbox}>
        ${this.items?.length > 0 ? html`
          <ul @click=${() => console.log('callback')}>
            ${this.items.map((item, index) => html`
              <li ?done=${this.done.includes(index)} key=${index}><a href="#">${item}</a></li>
            `)}
          </ul>
        ` : html` <slot></slot> `}
      </div>
    `;
  }
}
