# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Scott Densmore's personal Jekyll blog hosted on GitHub Pages using the Minimal Mistakes theme. The site contains historical blog posts dating from 2008 to 2024, covering topics like software development, Microsoft technologies, Windows Azure, iOS development, and personal reflections.

## Development Commands

### Local Development
- `bundle install` - Install Ruby gem dependencies
- `bundle exec jekyll serve` - Start local development server (typically runs on http://localhost:4000)
- `bundle exec jekyll build` - Build the site for production

### Dependencies
- Uses GitHub Pages compatible gems via the `github-pages` gem
- Primary theme: `minimal-mistakes-jekyll`
- Plugins: `jekyll-feed`, `jekyll-seo-tag`

## Site Architecture

### Directory Structure
- `_config.yml` - Main Jekyll configuration file
- `_posts/` - Blog posts in Markdown format with YAML front matter
- `_includes/` - Reusable HTML components (masthead, homepage components)
- `_layouts/` - HTML templates
- `_sass/` - Custom SCSS stylesheets
- `_docs/` - Architecture and development documentation
- `_site/` - Generated static site (git ignored)
- `assets/` - Static assets organized by type
  - `assets/css/` - Compiled stylesheets
  - `assets/js/` - JavaScript files
  - `assets/img/` - Images and media files

### Content Management
- Blog posts follow Jekyll naming convention: `YYYY-MM-DD-title.md`
- Posts use YAML front matter with `layout`, `title`, `date`, `author`, and `tags` fields
- **Tags system**: Posts can be tagged for categorization and filtering
- Historical posts span from 2008-2024 with extensive technical content
- Images optimized and stored in `assets/img/`

### Modern Architecture (2024 Refactor)
- **Component-based**: Modular HTML includes for reusability
- **CSS Architecture**: SCSS with CSS custom properties for theming
- **JavaScript**: Modular ES6 with proper error handling
- **No inline styles**: All styling externalized to SCSS files
- **Responsive design**: Mobile-first approach with flexbox/grid
- **Accessibility**: Semantic HTML with ARIA labels where needed

### Homepage Features
- **Two-column layout**: Sidebar navigation + main content
- **Dynamic tagging**: Auto-generated tag navigation from all posts
- **Latest post card**: Displays most recent blog post with metadata
- **Custom masthead**: Profile integration with gradient branding

## Key Files
- `_config.yml:1-14` - Site configuration including title, author, and theme settings
- `Gemfile:1-3` - Ruby gem dependencies for GitHub Pages
- `index.md:1-8` - Homepage layout and welcome message
- `_layouts/post.html:1-5` - Simple post layout template

## Workflow Notes
- This is a Jekyll static site, so changes to content require regeneration
- GitHub Pages automatically builds and deploys on push to main branch
- Historical content includes technical posts about Microsoft technologies, Azure, iOS development, and software engineering practices