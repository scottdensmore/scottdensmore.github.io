---
name: standardize-front-matter
description: Normalize tags, categories, and excerpts across all posts using _scripts/standardize-front-matter.rb and tag-mappings.yml. Use when the user wants to clean up, standardize, or re-tag post front matter across the blog.
disable-model-invocation: true
---

# Standardize Front Matter

Run the repo's front-matter normalizer across the posts and summarize the result.

## Steps

1. Review current mappings if the user wants to adjust them:
   `_scripts/tag-mappings.yml` (keyword → tag rules, category mappings, and the
   `config` block for excerpt length / defaults).
2. Run the normalizer:
   ```bash
   ruby _scripts/standardize-front-matter.rb
   ```
   It reads every post, applies the tag/category rules from `tag-mappings.yml`, and
   rewrites front matter in place.
3. Show the user what changed:
   ```bash
   git diff --stat _posts/
   ```
   Then summarize: how many posts changed, and the nature of the changes (tags added,
   categories set, excerpts trimmed). Spot-check a couple of diffs.
4. Remind the user this rewrites files in place — review the diff before committing.
   Do **not** commit or push unless asked.

## Notes

- The site uses `strict_front_matter: true`; if the script errors on a post with
  invalid YAML, fix that post's front matter and re-run.
- To change tagging behavior, edit `tag-mappings.yml` (not the Ruby script) and re-run.
