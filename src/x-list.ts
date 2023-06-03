import { html, LitElement, PropertyValues } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import lightdomStyles from './x-list.css' assert { type: 'css' };
import { adoptLightdomStyles } from './lib/adoptLightdomStyles.js';

export class XList extends LitElement {
  static tag = `x-list`;

  static styles = adoptLightdomStyles('x-list', lightdomStyles, { sync: true });

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
    e.preventDefault();
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
