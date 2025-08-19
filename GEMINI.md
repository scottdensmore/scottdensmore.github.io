## Project Overview

This project is a personal blog built with Jekyll, a static site generator written in Ruby. It uses the "minimal-mistakes-jekyll" theme. The blog contains posts on software development, technology, and programming best practices.

**Key Technologies:**

*   **Jekyll:** The static site generator used to build the site.
*   **Liquid:** The templating language used by Jekyll.
*   **Markdown:** The markup language used for writing posts and pages.
*   **Ruby:** The programming language that Jekyll is built on.
*   **GitHub Pages:** The hosting platform for the site.

When doing git operation prefer using the GitHub CLI over the git command line.

## Building and Running

To build and run the site locally, you will need to have Ruby and Bundler installed.

1.  **Install dependencies:**
    ```bash
    bundle install
    ```

2.  **Build the output:**
    ```bash
    bundle exec jekyll build
    ```

## Development Conventions

### Creating New Posts

A shell script `new-post.sh` is provided to facilitate the creation of new blog posts. To use it, run the following command:

```bash
./new-post.sh "Your Post Title"
```

This will create a new Markdown file in the `_posts` directory with the correct filename format and front matter.

### Front Matter

All posts and pages should include front matter at the beginning of the file. The front matter is used to set variables for the page, such as the layout, title, and author.

**Example Post Front Matter:**

```yaml
---
layout: post
title: "Your Post Title"
author: "Scott Densmore"
date: 2025-08-05 10:00:00 -0700
tags: [tag1, tag2]
---
```

### Directory Structure

*   `_config.yml`: Main Jekyll configuration file.
*   `_data`: Contains data files, such as `navigation.yml`.
*   `_includes`: Contains reusable HTML snippets.
*   `_layouts`: Contains the main HTML layouts for pages and posts.
*   `_pages`: Contains the site's pages (e.g., about, contact).
*   `_posts`: Contains the blog posts.
*   `assets`: Contains static assets like CSS, JavaScript, and images.
*   `Gemfile`: Defines the project's Ruby dependencies.
*   `index.md`: The home page of the site.
*   `new-post.sh`: A script for creating new posts.
