# Handling lightdom CSS in Lit

## The Problem

When making web components, often you will want to style nested elements to fall outside the
scope of `::slotted()`.  Unfortunitely, `::slotted()` can only target elements that are direct children of
web components.  Because of this we need to get creative.

Consider the follow `x-list` example.  This component displays a simple unordered list as a to-do list.

```html
<x-list>
  <ul>
    <li done><a href="#">Step 1</a></li>
    <li><a href="#">Step 2</a></li>
    <li><a href="#">Step 3</a></li>
  </ul>
</x-list>
```

`x-list` is unable to style the li and a elements since they are not direct children. The easy fix is to create `x-list-lightdom.css` 
that contain styles for the nested elements along with instructions for our users that they will need to manually import this lightdom file
along with the `x-list.js` file.

While this works, it puts more work in the hands of users of the component. Especially if `x-list` is being used in a Shadow Root. Consider the follwoing example.

```html
<my-app>
  <!-- shadowroot -->
    <x-list>
      <ul>
        <li done><a href="#">Step 1</a></li>
        <li><a href="#">Step 2</a></li>
        <li><a href="#">Step 3</a></li>
      </ul>
    </x-list>
</my-app>
```

Even after importing the `x-list-lightdom.css` stylesheet to website none of the styles would apply since the `x-list` component is contained in
shadow boundry. The user would then need to know how to adopt the lightdom stylesheet into the `my-app` component.

## A Solution

If a component relies on lightdom file we can attempt to adopt the lightdom file by default.

```js
import { adoptStyles, LitElement } from 'lit';
import lightdomStyles from './x-list-lightdom.css';

export class XList extends LitElement {
  ...
  connectedCallback() {
    super.connectedCallback()
    /**
     * Append any lightdom styles for this element to the parent 
     */
    const root = this.parentNode?.getRootNode();
    if (root) {
      // @ts-ignore
      adoptStyles(root, [...root.adoptedStyleSheets ?? [], lightdomStyles])
    }
  }
}
```

This utlizes a [patched version of Lit's adoptStyles helper](patches/%40lit%2Breactive-element%2B1.4.2.patch) which allows these styles to be adopted
to a document or document-fragment node type.
