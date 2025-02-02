# Deonna Does AI Blog Template

## Made for those new to AI-First Development

A modern, responsive blog template built for developers documenting their AI journey. This template was created using [Cursor](https://cursor.sh), an AI-powered code editor, and the entire development process is documented in `Entire Chat with Cursor.md`.

![Blog Screenshot](screenshot.png)

## Features

- 🎨 Clean, minimal design
- 📱 Fully responsive
- 🔍 Built-in search
- 🏷️ Category filtering
- 📊 Reading progress bar
- 🔗 Social sharing
- 📈 RSS feed support
- ⚡ Fast build times with 11ty

## Getting Started

### 1. Install Cursor

1. Visit [cursor.sh](https://cursor.sh)
2. Download the appropriate version for your operating system
3. Install and launch Cursor
4. (Optional) Read through `Entire Chat with Cursor.md` to see how this blog was built with AI assistance

### 2. Set Up the Blog

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-first-blog.git
cd ai-first-blog

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:8080` to see your blog.

### 3. Customize Your Blog

#### Essential Files to Modify

1. **Site Metadata** (`src/_data/metadata.js`):

```javascript
module.exports = {
  title: "Your Blog Name",
  description: "Your blog description",
  url: "https://yourdomain.com",
  author: {
    name: "Your Name",
    email: "your@email.com",
  },
}
```

2. **Categories** (`src/_data/categories.js`):

```javascript
module.exports = {
  development: {
    name: "Development",
    description: "Technical posts about AI development",
  },
  // Add your own categories...
}
```

3. **Styling** (`tailwind.config.js`):

- Modify colors in the `theme.extend.colors` section
- Customize typography and other design elements

4. **Layout** (`src/_includes/base.njk`):

- Update navigation links
- Modify footer content
- Add/remove social media links

5. **Author Component** (`src/_includes/components/author.njk`):

- Update author information and image

### 4. Adding Content

1. Create new blog posts in `src/posts/`:

```markdown
---
layout: "layouts/post.njk"
title: "Your Post Title"
date: 2024-01-01
category: development
description: "Brief description of your post"
tags: post
showPlaceholder: true # Set to false to hide placeholder image
---

Your content here...
```

2. Add images to `src/assets/`
3. Update social media links in `src/_includes/base.njk`

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Serve production build
npm run serve
```

## Deployment

This site can be deployed to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Learning from the Build Process

The entire development process of this blog is documented in `Entire Chat with Cursor.md`. This file contains:

- Conversations with Cursor AI about design decisions
- Problem-solving approaches
- Code explanations and iterations
- Best practices for AI-first development

It's a valuable resource for understanding how to:

- Work effectively with AI coding assistants
- Structure an 11ty project
- Implement modern web features
- Debug common issues

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- Built with [11ty](https://www.11ty.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Enhanced with [Alpine.js](https://alpinejs.dev/)
- Developed using [Cursor](https://cursor.sh)
