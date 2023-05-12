import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
// @ts-ignore
import lightdomStyles from './x-list-lightdom.css' assert { type: 'css'};

export class XList extends LitElement {
  static tag = `x-list`;
  static styles = lightdomStyles;

  @property({ type: Array })
  public items = [];

  @property({ type: Array })
  public done: Number[] = [];

  willUpdate(changed: PropertyValues<this>) {
    if (changed.has('done') && this.done) {
      this.done = this.done.map(i => Number(i));
    }
  }

  connectedCallback() {
    super.connectedCallback()
    /**
     * Append any lightdom styles for this element to the parent 
     */
    const root = this.parentNode?.getRootNode();
    if (root) {
      console.log(root);
      // @ts-ignore
      // const lightdomStylesStylesheet = lightdomStyles.styleSheet;
      // // @ts-ignore
      // const hasAdoptedStylesheet = [...root.adoptedStyleSheets].find(s => {
      //   if (s.cssRules.length !== lightdomStylesStylesheet.cssRules.length) return false;
      //   if (s.cssRules[0].cssText !== lightdomStylesStylesheet.cssRules[0].cssText) return false;
      //   return true;
      // });
      // if (!hasAdoptedStylesheet) {
      // @ts-ignore
      root.adoptedStyleSheets = [...root.adoptedStyleSheets ?? [], lightdomStyles];
      // }
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
