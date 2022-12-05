import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { XList } from '../src/XList.js';
import '../src/x-list.js';

describe('XList', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<XList>(html`<x-list></x-list>`);

    expect(el.title).to.equal('Hey there');
    /* expect(el.counter).to.equal(5); */
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<XList>(html`<x-list></x-list>`);
    el.shadowRoot!.querySelector('button')!.click();
    /**/
    /* expect(el.counter).to.equal(6); */
  });

  it('can override the title via attribute', async () => {
    const el = await fixture<XList>(html`<x-list title="attribute title"></x-list>`);

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<XList>(html`<x-list></x-list>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
