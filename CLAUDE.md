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
- `_layouts/` - HTML templates (currently just `post.html`)
- `_site/` - Generated static site (git ignored)
- `assets/` - Static assets (images, files, CSS, JS)
- `index.md` - Homepage content

### Content Management
- Blog posts follow Jekyll naming convention: `YYYY-MM-DD-title.md`
- Posts use YAML front matter with `layout`, `title`, `date`, and `author` fields
- Historical posts span from 2008-2024 with extensive technical content
- Images and files stored in `assets/img/` and `assets/files/`

### Theme Configuration
- Uses Minimal Mistakes Jekyll theme with default skin
- Site configured for GitHub Pages deployment
- Author profile enabled on homepage

## Key Files
- `_config.yml:1-14` - Site configuration including title, author, and theme settings
- `Gemfile:1-3` - Ruby gem dependencies for GitHub Pages
- `index.md:1-8` - Homepage layout and welcome message
- `_layouts/post.html:1-5` - Simple post layout template

## Workflow Notes
- This is a Jekyll static site, so changes to content require regeneration
- GitHub Pages automatically builds and deploys on push to main branch
- Historical content includes technical posts about Microsoft technologies, Azure, iOS development, and software engineering practices