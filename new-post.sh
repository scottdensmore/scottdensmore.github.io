#!/bin/bash

# Simple Jekyll post creation script
# Usage: ./new-post.sh "Your Post Title"

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_color() {
    printf "${1}${2}${NC}\n"
}

# Get the post title
if [ -z "$1" ]; then
    print_color $BLUE "Enter post title: "
    read -r TITLE
else
    TITLE="$1"
fi

# Validate title
if [ -z "$TITLE" ]; then
    print_color $RED "Error: Post title cannot be empty"
    exit 1
fi

# Generate filename-safe version of title
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')

# Get current date and time
DATE=$(date '+%Y-%m-%d')
DATETIME=$(date '+%Y-%m-%d %H:%M:%S %z')

# Create filename
FILENAME="_posts/${DATE}-${SLUG}.md"

# Check if file already exists
if [ -f "$FILENAME" ]; then
    print_color $YELLOW "Warning: File $FILENAME already exists"
    print_color $BLUE "Overwrite? (y/N): "
    read -r OVERWRITE
    if [ "$OVERWRITE" != "y" ] && [ "$OVERWRITE" != "Y" ]; then
        print_color $YELLOW "Aborted"
        exit 0
    fi
fi

# Prompt for tags
print_color $BLUE "Enter tags (comma-separated, or press Enter for none): "
read -r TAGS_INPUT

# Process tags
if [ -n "$TAGS_INPUT" ]; then
    # Convert comma-separated tags to YAML array format
    TAGS_YAML=$(echo "$TAGS_INPUT" | sed 's/,/ /g' | sed 's/^ *//g' | sed 's/ *$//g' | sed 's/  */ /g' | sed 's/ /, /g')
    TAGS_LINE="tags: [$TAGS_YAML]"
else
    TAGS_LINE="tags: []"
fi

# Create the post file
cat > "$FILENAME" << EOF
---
layout: post
title: "$TITLE"
author: "Scott Densmore"
date: $DATETIME
$TAGS_LINE
---

Write your post content here...

EOF

print_color $GREEN "✓ Created new post: $FILENAME"
print_color $BLUE "Opening in default editor..."

# Try to open in various editors (in order of preference)
if command -v code >/dev/null 2>&1; then
    code "$FILENAME"
elif command -v subl >/dev/null 2>&1; then
    subl "$FILENAME"
elif command -v vim >/dev/null 2>&1; then
    vim "$FILENAME"
elif command -v nano >/dev/null 2>&1; then
    nano "$FILENAME"
else
    print_color $YELLOW "No suitable editor found. You can manually edit: $FILENAME"
fi

print_color $GREEN "Post created successfully!"
print_color $BLUE "To preview: bundle exec jekyll serve"