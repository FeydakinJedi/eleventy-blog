const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const fs = require('fs');
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // SVG Icon Shortcode
  eleventyConfig.addShortcode("svg", function(name, className) {
    console.log(`Loading SVG: ${name} from ./src/svg/${name}.svg`);
    try {
      if (!fs.existsSync(`./src/svg/${name}.svg`)) {
        console.error(`SVG file not found: ${name}.svg`);
        return `<!-- SVG ${name} not found -->`;
      }
      let svg = fs.readFileSync(`./src/svg/${name}.svg`, 'utf8');
      if (!svg || svg.length === 0) {
        console.error(`SVG file empty: ${name}.svg`);
        return `<!-- SVG ${name} empty -->`;
      }
      // console.log(`SVG content found: ${svg.length > 0 ? 'yes' : 'no'}`);
      const result = svg.replace('<svg', `<svg class="${className}"`);
      // console.log(`Modified SVG: ${result.substring(0, 50)}...`);
      return result;
    } catch (error) {
      console.error(`Error loading SVG ${name}:`, error);
      return `<!-- Error loading SVG ${name} -->`;
    }
  });

  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("./src/styles/");
  
  // Pass through static files
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy("./src/svg");

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
      console.log('CSS Content Length:', inputContent.length);
      
      let result = await postcss([
        tailwindcss,
        autoprefixer
      ]).process(inputContent, {
        from: inputPath,
        to: inputPath
      });

      console.log('Processed CSS size:', result.css.length);
      console.log('Sample of processed CSS:', result.css.substring(0, 500));
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