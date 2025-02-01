const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const fs = require('fs');
const { DateTime } = require("luxon");
const readingTime = require('reading-time');

module.exports = function(eleventyConfig) {
  console.log("Registering shortcodes...");

  // Get Nunjucks engine instance
  let nunjucksEngine;
  eleventyConfig.on('eleventy.engine', engine => {
    nunjucksEngine = engine;
  });

  // URL encoding filter
  eleventyConfig.addFilter("encodeURIComponent", function(str) {
    return encodeURIComponent(str);
  });

  // Transform for XML files
  eleventyConfig.addTransform("xmlTransform", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".xml")) {
      // Remove any whitespace before the XML declaration
      return content.replace(/^\s+<?xml/, '<?xml');
    }
    return content;
  });

  // Hero Placeholder Shortcode
  eleventyConfig.addShortcode("heroPlaceholder", function(title) {
    return `
      <div class="aspect-w-16 aspect-h-9 bg-secondary rounded-xl overflow-hidden">
        <div class="flex items-center justify-center p-8">
          <div class="relative">
            <div class="absolute inset-0 bg-primary/10 rounded-lg -rotate-3"></div>
            <div class="relative px-6 py-4 text-xl md:text-2xl font-medium text-primary text-center">
              ${title}
            </div>
          </div>
        </div>
      </div>
    `;
  });

  // SVG Icon Shortcode
  eleventyConfig.addShortcode("svg", function(name, className) {
    // console.log(`Loading SVG: ${name} from ./src/svg/${name}.svg`);
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

  // Category filter
  eleventyConfig.addFilter("filterByCategory", function(posts, category) {
    return posts.filter(post => post.data.category === category);
  });

  // Reading time filter
  eleventyConfig.addFilter("readingTime", function(content) {
    const stats = readingTime(content);
    return Math.ceil(stats.minutes);
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

  // RSS Feed Filters
  eleventyConfig.addFilter("dateToRfc3339", (date) => {
    return DateTime.fromJSDate(date).toISO();
  });

  eleventyConfig.addFilter("getNewestCollectionItemDate", (collection) => {
    if (!collection || !collection.length) {
      return new Date();
    }
    return collection.reduce((acc, curr) => {
      const currDate = curr.date || curr.data.date;
      return currDate > acc ? currDate : acc;
    }, collection[0].date || collection[0].data.date);
  });

  // Add absolute URL filter for RSS feed
  eleventyConfig.addFilter("absoluteUrl", function(url, base) {
    try {
      // Handle both relative and absolute URLs
      const baseUrl = base.endsWith('/') ? base : base + '/';
      const fullUrl = url.startsWith('/') ? url.slice(1) : url;
      return new URL(fullUrl, baseUrl).toString();
    } catch(e) {
      console.error("Error creating URL:", e);
      return url;
    }
  });

  // Add HTML to absolute URLs filter for RSS feed
  eleventyConfig.addFilter("htmlToAbsoluteUrls", (content, base) => {
    if (!base) return content;
    
    // Convert relative URLs to absolute
    return content.replace(/(href|src)="\/([^"]*)"/g, (match, attr, path) => {
      return `${attr}="${new URL(path, base).toString()}"`;
    });
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
}    