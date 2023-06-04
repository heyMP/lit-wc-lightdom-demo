export function adoptLightdomStyles(ref: HTMLElement, tagname: string, styleSheet: CSSStyleSheet, options?: { 'open-stylable-ish'?: boolean, sync?: boolean, adopt?: boolean }) {
  const lightdomStyleSheets = Array.from(document.styleSheets)

  let adopted = false;

  // Convert the lightdom css
  if (options?.sync) {
    // @ts-ignore
    const lightdomStyleSheet = lightdomStyleSheets.find(i => i.ownerNode.getAttribute('tagname') === tagname && i.ownerNode.hasAttribute('sync'));
    if (lightdomStyleSheet && !lightdomStyleSheet.disabled) {
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];
      lightdomStyleSheet.disabled = true;
      adopted = true;
    }
  }

  // Automatically adopted the stylesheet to the root document lightdom
  if (options?.adopt && !adopted) {
    const root = ref.getRootNode() as Document;
    if (root.adoptedStyleSheets && !root.adoptedStyleSheets.find(i => i === styleSheet)) {
      root.adoptedStyleSheets = [...root.adoptedStyleSheets, styleSheet];
    }
  }

  if (options?.["open-stylable-ish"]) {
    // @ts-ignore
    for (const lightdomStyleSheet of lightdomStyleSheets.filter(i => [tagname, 'all'].includes(i.ownerNode?.getAttribute?.('tagname')) && !i.ownerNode?.hasAttribute?.('sync'))) {
      for (const rule of Object.values(lightdomStyleSheet.cssRules)) {
        styleSheet.insertRule(rule.cssText, styleSheet.cssRules.length);
      }
    }
  }
  return styleSheet;
}

// export function adoptLightdomStyles(tagname: string, styleSheet: CSSStyleSheet, options: { sync: boolean }) {
//   if (!CSSStyleSheet.prototype.isPrototypeOf(styleSheet)) {
//     throw new TypeError(`Only properties with a CSSStyleSheet can be decorated`);
//   }
//   if (initialized.has(styleSheet)) {
//     return initialized.get(styleSheet);
//   }
//   // Make a shared constructable stylesheet.
//   // This will be the canonical source of styles for this elements shadowroot
//   // and lightdom.
//   let styles = new CSSStyleSheet();
//   initialized.set(styleSheet, styles);
//   // Read the original styleSheet that was created by a traditional <link>
//   // @ts-ignore Cannot find name 'ownerNode'
//   const styleSheets = Array.from(document.styleSheets).filter(i => [tagname, 'all'].includes(i.ownerNode.getAttribute('tagname')));
//   // move all of the styles from the original into the new constructable stylesheet
//   if (styleSheets && styleSheets.length > 0) {
//     for (const styleSheet of styleSheets) {
//       // Move all of the CSSRules from the lightdom stylesheet to
//       // the constructed stylesheet
//       for (const rule of Object.values(styleSheet.cssRules)) {
//         styles.insertRule(rule.cssText, styles.cssRules.length);
//       }
//       if (options.sync) {
//         // Now disabled the original lightdom stylesheet 
//         // so that we don't have two competing stylesheets
//         styleSheet.disabled = true;
//       }
//     }
//   }
//   else {
//     styles = styleSheet;
//   }
//   if (options.sync) {
//     // Adopt the constructable stylesheet to the document
//     // so that it can be shared by both the lightdom and shadowroots
//     document.adoptedStyleSheets = [...document.adoptedStyleSheets, styles];
//   }
//   return styles;
// }
