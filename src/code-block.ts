import { html, css, LitElement, PropertyValueMap } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

declare global {
  interface Window { 
    shiki: Record<any, any>;
    shikiInstances: Map<any, any>;
  }
}

@customElement('code-block')
export class CodeBlock extends LitElement {
  static styles = css`
    pre {
      font-size: var(--font-size-2);
      margin: 0;
      margin-block: var(--size-3);
      text-align: start;
      border-radius: var(--radius-3);
      padding-block: var(--size-8) var(--size-3);
      padding-inline: var(--size-5);
      box-shadow: var(--shadow-3);
      max-inline-size: max(var(--size-content-1),95vw);
      background: linear-gradient(to bottom,#0003 0 0,2.5rem,#0000 0 0),radial-gradient(circle at 2rem 1.25rem,var(--gray-10) 0 0,.5rem,#0000 0 0),radial-gradient(circle at 3.5rem 1.25rem,var(--gray-9) 0 0,.5rem,#0000 0 0),radial-gradient(circle at 5rem 1.25rem,var(--gray-8) 0 0,.5rem,#0000 0 0),conic-gradient(from 25deg at 35% 75%,#ffffff09,85%,#fff0);
    }
  `;

  @property()
  type: string = 'html';

  @property()
  theme: string = 'dracula';

  protected firstUpdated(): void {
    this.renderCodeblock();
  }

  renderCodeblock() {
    const options = {
      theme: this.theme,
      type: this.type
    }

    window.shiki.getHighlighter({
      theme: this.theme,
      langs: this.type.split(',').map(i => i.trim()),
    })
      .then((highlighter: any) => {
        const code = highlighter.codeToHtml(this.querySelector('template')?.innerHTML.trim(), { lang: this.type })
        this.renderRoot.querySelector('#output')!.innerHTML = code;
      });
  }

  render() {
    return html`
      <slot hidden></slot>
      <div id="output"></div>
    `;
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
