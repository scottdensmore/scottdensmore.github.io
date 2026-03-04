#!/bin/bash

# Usage: ./new-post.sh "Your Post Title"

set -e

if [ $# -lt 1 ]; then
    echo "Usage: ./new-post.sh \"Your Post Title\"" >&2
    exit 2
fi

TITLE="$1"

SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')
DATE=$(date '+%Y-%m-%d')
FILENAME="_posts/${DATE}-${SLUG}.md"

if [ -f "$FILENAME" ]; then
    echo "Error: $FILENAME already exists" >&2
    exit 1
fi

cat > "$FILENAME" << EOF
---
layout: post
title: "$TITLE"
author: "Scott Densmore"
date: $(date '+%Y-%m-%d %H:%M:%S %z')
tags: []
---

EOF

echo "Created: $FILENAME"
PREFERRED_EDITOR="${VISUAL:-${EDITOR:-code}}"
if command -v "$PREFERRED_EDITOR" >/dev/null 2>&1; then
    "$PREFERRED_EDITOR" "$FILENAME"
else
    echo "No editor found. Edit manually: $FILENAME" >&2
fi
