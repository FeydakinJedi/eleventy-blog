module.exports = {
  eleventyComputed: {
    permalink: (data) => {
      // If it's the feed template, add content type headers
      if (data.page.inputPath.includes('feed.njk')) {
        return {
          build: "feed.xml",
          render: "feed.xml",
          headers: {
            "Content-Type": "application/atom+xml; charset=utf-8"
          }
        };
      }
      return data.permalink;
    }
  }
}; 