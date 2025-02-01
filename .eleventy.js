const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const fs = require('fs');
const { DateTime } = require("luxon");
const readingTime = require('reading-time');

module.exports = function(eleventyConfig) {
  console.log("Registering shortcodes...");

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
    console.log("Generating placeholder for:", title);
    return `<svg width="100%" height="100%" viewBox="0 0 16 9" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="16" height="9" fill="#2D3047" />
      <rect x="1.5" y="2.5" width="13" height="4" fill="#FF3B6F" fill-opacity="0.1" rx="0.5" />
      <text x="8" y="5" font-family="system-ui" font-size="0.8" fill="#FF3B6F" text-anchor="middle"
        dominant-baseline="middle">
        ${title}
      </text>
    </svg>`;
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