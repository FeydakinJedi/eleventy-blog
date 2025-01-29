const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("./src/styles/");
  
  // Pass through static files
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/styles/main.css");

  // Add date filter
  eleventyConfig.addFilter("date", function(date, format = "yyyy-MM-dd") {
    return DateTime.fromJSDate(date).toFormat(format);
  });

  // Process CSS with PostCSS and Tailwind
  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function(inputContent, inputPath) {
      if (inputPath.includes("_site")) return;
      
      let result = await postcss([
        tailwindcss,
        autoprefixer
      ]).process(inputContent, {
        from: inputPath,
        to: inputPath
      });

      return async () => result.css;
    }
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
}; 