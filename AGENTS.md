# AGENTS.md

Shared conventions for all coding agents (Claude Code, Codex, Cursor, Gemini, …)
working in this repository. This is the single source of truth — agent-specific
files (`CLAUDE.md`, etc.) should point here rather than duplicate it.

## What this is

A personal blog by Scott Densmore, built with **Jekyll** (static site generator)
using the **`minimal-mistakes-jekyll`** theme and hosted on **GitHub Pages**.
Posts cover software development, technology, and programming best practices.

Ruby is pinned to **3.3.6** via `mise` (`.mise.toml`) and `.ruby-version`.

## Build & serve

```bash
bundle install                 # install gems (first run)
bundle exec jekyll serve       # local preview at http://localhost:4000 with live reload
bundle exec jekyll build       # production build into _site/
```

Deployment is automatic: pushing to `main` triggers `.github/workflows/jekyll.yml`,
which builds with `JEKYLL_ENV=production` and deploys to GitHub Pages. Do **not**
deploy by hand.

## Conventions (non-obvious — read before editing)

- **Never edit `_site/`.** It is the generated build output; `jekyll build`
  overwrites it every run and it is not the source of anything. Edit the source
  files (`_posts/`, `_layouts/`, `_includes/`, `_sass/`, `_pages/`) instead.
  A pre-tool hook blocks writes to `_site/` for Claude Code.
- **`strict_front_matter: true`** is set in `_config.yml` — a post with malformed
  YAML front matter will fail the build, not just warn. Keep front matter valid.
- **`last_modified_at`** is maintained automatically: a Claude Code post-edit hook
  stamps it on any `_posts/*.md` you change, and `_scripts/update-last-modified.rb`
  stamps staged posts at commit time. Don't hand-maintain it.
- **Client-side search** reads `search.json`, which is a Liquid template rendered at
  build time from `site.posts`. New posts appear in search automatically after a
  build — no manual index step.

## Creating a new post

```bash
./new-post.sh "Your Post Title"
```

Creates `_posts/YYYY-MM-DD-slugified-title.md` with the correct filename format and
starter front matter, then opens it in `$VISUAL`/`$EDITOR` (default `code`).

Required post front matter:

```yaml
---
layout: post
title: "Your Post Title"
author: "Scott Densmore"
date: 2025-08-05 10:00:00 -0700
tags: [tag1, tag2]
---
```

## Maintenance scripts (`_scripts/`)

- `standardize-front-matter.rb` — normalizes tags/categories/excerpts across all
  posts using the keyword rules in `tag-mappings.yml`. Run after bulk tagging work.
- `update-last-modified.rb` — stamps `last_modified_at` on staged posts; intended as
  a git pre-commit step.
- `update-modified.rb` — helper invoked by the Claude Code post-edit hook to stamp a
  single edited post.

## Git & GitHub

Prefer the **GitHub CLI (`gh`)** for all GitHub operations (PRs, issues, CI status)
over the web UI or raw API calls. Changes land on `main` via pull request.
