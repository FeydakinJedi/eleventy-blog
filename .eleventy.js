const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("./src/styles/");
  
  // Pass through static files
  eleventyConfig.addPassthroughCopy("./src/assets");

  // Add date filter
  eleventyConfig.addFilter("date", function(date, format = "yyyy-MM-dd") {
    if (!date) {
      return DateTime.now().toFormat(format);
    }
    return DateTime.fromJSDate(new Date(date)).toFormat(format);
  });

  // Process CSS with PostCSS and Tailwind
  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function(inputContent, inputPath) {
      if (inputPath.includes("_site")) return;
      
      console.log('Processing CSS file:', inputPath);
      console.log('CSS Content:', inputContent);
      
      let result = await postcss([
        tailwindcss,
        autoprefixer
      ]).process(inputContent, {
        from: inputPath,
        to: inputPath
      });

      console.log('Processed CSS size:', result.css.length);
      return async () => result.css;
    }
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};    