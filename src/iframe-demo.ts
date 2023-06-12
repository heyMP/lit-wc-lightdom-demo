import { html, css, LitElement, PropertyValueMap, svg } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
// @ts-ignore
import ReloadArrow from '@patternfly/icons/fas/redo-alt.js';
import styles from './iframe-demo.css' assert { type: 'css' };
import { buttonStyles } from './styles.js';

@customElement('iframe-demo')
export class IframeDemo extends LitElement {
  static styles = [buttonStyles, styles];

  render() {
    return html`
      <div part="base">
        <div part="actions">
          <button part="action-button" @click=${this.reload}>
            ${svg`${ReloadArrow}`}
          </button>
        </div>
        <slot></slot>
      </div>
    `;
  }

  reload() {
    this.querySelector('iframe')?.contentWindow?.location?.reload();
  }
}


      // const instance = import('https://unpkg.com/shiki@0.14.2/dist/index.esm.js?module').then(() => {
      //   // @ts-ignore
      //   shikiInstances.set(options, window.shiki.getHighlighter({
      //       theme: this.theme,
      //       langs: this.type,
      //     })
      //     .then((highlighter: any) => {
      //       const code = highlighter.codeToHtml(this.querySelector('template')?.innerHTML.trim(), { lang: this.type })
      //       // @ts-ignore
      //       this.renderRoot.querySelector('#output')?.innerHTML = code;
      //     }))
