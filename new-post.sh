#!/bin/bash

# Usage: ./new-post.sh "Your Post Title"

set -e

TITLE="${1:?Usage: ./new-post.sh \"Your Post Title\"}"

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
${EDITOR:-code} "$FILENAME"
