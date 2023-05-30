import { html, css, LitElement, adoptStyles } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import './x-list.js';
import { XList } from './XList.js';

@customElement('x-demo-app')
export class XDemoApp extends LitElement {
  static styles = [
    XList.styles,
    css`:host {
      display: block;
      background-color: #99d1f6;
      padding: 1rem;
    }]
  `];

  render() {
    return html`
      <x-list>
        <ul>
          <li><a href="#">Step 1</a></li>
          <li done><a href="#">Step 2</a></li>
          <li><a href="#">Step 3</a></li>
        </ul>
        <span>
      </x-list>
    `;
  }
}
