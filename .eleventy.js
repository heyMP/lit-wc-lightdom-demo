const pluginWebc = require("@11ty/eleventy-plugin-webc");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc);
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("src/**/*.css");
  eleventyConfig.addPassthroughCopy("src/**/*.js");
  eleventyConfig.addPassthroughCopy("src/**/*.map");
  eleventyConfig.addPassthroughCopy("demo/**/*.js");
  eleventyConfig.addPassthroughCopy("demo/**/*.css");
  eleventyConfig.addWatchTarget("./src/");

  eleventyConfig.addCollection("customSlides", function(collectionApi) {
    const ret = collectionApi
      .getAll()
      .filter(item => {
        return item?.data?.tags?.includes?.('slide') ?? false;
      })
      // sort by file name
      // ex: [ '', 'step01', 'step02', 'step03', 'step04' ]
      .sort((a, b) => {
        return a.fileSlug < b.fileSlug ? -1 : 1;
      });
    console.log(ret.map(i => i.fileSlug));
    return ret;
  });
}


/**
  *
  * Get number from slug
  * ex: 'step04'.match(/\d+/)
  * ['04', index: 4, input: 'step04', groups: undefined]
  */
function extractFileNumberFromSlug(slug) {
  return Number(slug.fileSlug.match(/\d+/));
}
