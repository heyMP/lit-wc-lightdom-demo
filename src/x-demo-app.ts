import { html, css, LitElement, adoptStyles } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import './x-list.js';
import { XList } from './x-list.js';
import lightdomStyles from './x-list.css' assert {type: 'css'};

@customElement('x-demo-app')
export class XDemoApp extends LitElement {
  static styles = [
    XList.styles,
    css`
      :host {
        display: contents;
      }
      .list {
        display: block;
        background-color: #99d1f6;
        padding: 1rem;
      }
    ]
  `];

  applyOriginalStylesheet() {
    XList.styles.replaceSync('');
    for (const rule of Object.values(lightdomStyles.cssRules)) {
      XList.styles.insertRule(rule.cssText, XList.styles.cssRules.length);
    }
    this.requestUpdate();
  }

  addCSSRule() {
    XList.styles.insertRule('li[done] a { background: pink; }', XList.styles.cssRules.length);
    this.requestUpdate();
  }

  removeLatestRule() {
    XList.styles.removeRule(XList.styles.cssRules.length - 1);
    this.requestUpdate();
  }

  removeAllRules() {
    XList.styles.replaceSync('');
    this.requestUpdate();
  }

  render() {
    return html`
      <h2> Nested ShadowRoot version </h2>
      <div class="list">
        ${Array.from(Array(1)).map(() => html`
          <x-list>
            <ul>
              <li><a href="#">Step 1</a></li>
              <li done><a href="#">Step 2</a></li>
              <li><a href="#">Step 3</a></li>
            </ul>
            <span>
          </x-list>
        `)}
      </div>

      <div>Active Document Stylesheets ${Array.from(document.styleSheets).filter(i => !i.disabled).length}</div>
      <div>Inactive Document Stylesheets ${Array.from(document.styleSheets).filter(i => i.disabled).length}</div>
      <div>Document Adopted Stylesheets ${document.adoptedStyleSheets.length}</div>
      <div>XList Rules ${XList.styles.cssRules.length}</div>

      <button @click=${this.applyOriginalStylesheet}>Apply original stylesheet</button>
      <button @click=${this.addCSSRule}>Add CSS Rule</button>
      <button @click=${this.removeLatestRule}>Remove CSS Rule</button>
      <button @click=${this.removeAllRules}>Empty stylesheet</button>
    `;
  }
}
