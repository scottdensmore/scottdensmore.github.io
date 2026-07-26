---
name: new-post
description: Scaffold a new Jekyll blog post in _posts/ with correct filename and front matter. Use when the user wants to start writing a new post, draft an article, or create a blog entry.
disable-model-invocation: true
---

# New Post

Create a new blog post for this Jekyll site.

## Steps

1. Take the post title from the user's request. If no title was given, ask for one.
2. Create the post file with the repo's scaffolder:
   ```bash
   ./new-post.sh "The Post Title"
   ```
   This produces `_posts/YYYY-MM-DD-slugified-title.md` with starter front matter
   (`layout`, `title`, `author`, `date`, empty `tags`). It also tries to open the
   file in an editor — that's fine to ignore in an agent context.
3. Read the created file and confirm the front matter is valid YAML (the site sets
   `strict_front_matter: true`, so bad front matter breaks the build).
4. Fill in `tags:` using the vocabulary in `_scripts/tag-mappings.yml` — pick the
   tags whose keywords match the post's topic. Leave `tags: []` only if truly none fit.
5. If the user provided body content or an outline, write it into the file below the
   front matter using Markdown.
6. Report the created path. Do **not** commit or push unless asked.

## Notes

- Filenames must stay in `YYYY-MM-DD-title.md` form — let `new-post.sh` generate it
  rather than hand-naming files.
- `last_modified_at` is managed automatically (post-edit hook + pre-commit script);
  don't add it by hand.
