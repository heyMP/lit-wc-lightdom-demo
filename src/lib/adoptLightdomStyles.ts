export function adoptLightdomStyles(tagname: string, styleSheet: CSSStyleSheet, options: { sync: boolean }) {
  if (!CSSStyleSheet.prototype.isPrototypeOf(styleSheet)) {
    throw new TypeError(`Only properties with a CSSStyleSheet can be decorated`);
  }
  // Make a shared constructable stylesheet.
  // This will be the canonical source of styles for this elements shadowroot
  // and lightdom.
  let styles = new CSSStyleSheet();
  // Read the original styleSheet that was created by a traditional <link>
  // @ts-ignore Cannot find name 'ownerNode'
  const styleSheets = Array.from(document.styleSheets).filter(i => [tagname, 'all'].includes(i.ownerNode.getAttribute('tagname')));
  // move all of the styles from the original into the new constructable stylesheet
  if (styleSheets && styleSheets.length > 0) {
    for (const styleSheet of styleSheets) {
      // Move all of the CSSRules from the lightdom stylesheet to
      // the constructed stylesheet
      for (const rule of Object.values(styleSheet.cssRules)) {
        styles.insertRule(rule.cssText, styles.cssRules.length);
      }
      if (options.sync) {
        // Now disabled the original lightdom stylesheet 
        // so that we don't have two competing stylesheets
        styleSheet.disabled = true;
      }
    }
  }
  else {
    styles = styleSheet;
  }
  if (options.sync) {
    // Adopt the constructable stylesheet to the document
    // so that it can be shared by both the lightdom and shadowroots
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, styles];
  }
  return styles;
}
