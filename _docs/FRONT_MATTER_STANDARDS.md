# Front Matter Standardization Guide

## Overview

This document outlines the standardized front matter structure for blog posts to improve SEO, social sharing, content organization, and the tagging system effectiveness.

## Current Status

- **Total Posts**: 206
- **Posts with Tags**: 5 (previously 1, updated 4 as examples)
- **Posts with Excerpts**: 4 (newly added)
- **Posts with Categories**: 4 (newly added)

## Standardized Front Matter Structure

```yaml
---
layout: post
title: "Your Post Title"
author: "Scott Densmore"
date: YYYY-MM-DD HH:MM:SS -TIMEZONE
tags: [tag1, tag2, tag3]
categories: [Category]
excerpt: "Brief description under 160 characters for SEO and social sharing"
image: /assets/img/optional-image.jpg  # Optional
---
```

## Tag Taxonomy

### Technology Tags
- **azure** - Windows Azure/Microsoft Azure content
- **cloud** - Cloud computing general
- **windows** - Windows platform, Windows development
- **ios** - iOS development, iPhone, iPad
- **objective-c** - Objective-C programming language
- **swift** - Swift programming language
- **dotnet** - .NET Framework, C#, ASP.NET
- **web** - Web development, JavaScript, APIs
- **database** - Database technologies, SQLite, Table Storage
- **git** - Git version control, GitHub
- **visual-studio** - Visual Studio, development tools

### Development Practice Tags
- **testing** - General testing topics
- **unit-testing** - Unit testing specifically
- **tdd** - Test-driven development
- **bdd** - Behavior-driven development
- **agile** - Agile methodologies, Scrum
- **architecture** - Software architecture, design patterns
- **security** - Security, authentication, authorization
- **best-practices** - Development best practices, code quality

### Personal Tags
- **personal** - Personal life updates
- **health** - Health, fitness, recovery
- **recovery** - Medical recovery, healing
- **career** - Career updates, job changes
- **family** - Family-related content
- **travel** - Travel experiences

### Community Tags
- **conference** - Conference talks, events
- **speaking** - Public speaking engagements
- **review** - Product or book reviews
- **opinion** - Opinion pieces, perspectives

## Category Taxonomy

### Technology
For posts about specific technologies, platforms, tools, or technical implementations.
**Related tags**: azure, cloud, windows, ios, objective-c, swift, dotnet, web, database, git, visual-studio

### Development
For posts about development practices, methodologies, testing, architecture, and software engineering principles.
**Related tags**: testing, unit-testing, tdd, bdd, agile, architecture, security, best-practices

### Personal
For personal updates, life events, health, career, and family content.
**Related tags**: personal, health, recovery, career, family, travel

### Community
For content related to community engagement, speaking, conferences, reviews, and opinions.
**Related tags**: conference, speaking, review, opinion

## Implementation Examples

### Azure Technical Post
```yaml
---
layout: post
title: "Fluent API for Windows Azure ACS Management"
author: "Scott Densmore"
date: 2012-01-29 02:30 -0700
tags: [azure, cloud, api, security, fluent-interface]
categories: [Technology]
excerpt: "SouthWorks team created a fluent API for configuring Windows Azure ACS, making setup much cleaner than our previous rough setup program."
---
```

### Development Best Practices Post
```yaml
---
layout: post
title: "Unit Testing Private Methods - Just Say No"
author: "Scott Densmore"
date: 2012-05-31 02:36 -0700
tags: [testing, unit-testing, best-practices, development]
categories: [Development]
excerpt: "Agreeing with Peter Provost's take on unit testing private methods - don't do it. Focus on testing public interfaces instead."
---
```

### Personal Update Post
```yaml
---
layout: post
title: "Bandages Off"
author: "Scott Densmore"
date: 2019-01-27T17:05:20-08:00
tags: [personal, health, recovery]
categories: [Personal]
excerpt: "Recovery update - bandages are off, feeling a bit sore and swollen but ready to get back to building strength."
---
```

## Benefits of Standardization

1. **SEO Improvement**: Consistent excerpts and tags improve search engine visibility
2. **Social Sharing**: Rich previews on social media with proper excerpts
3. **Content Discovery**: Better categorization helps readers find related content
4. **Site Navigation**: Enhanced tagging system enables filtering and topic exploration
5. **Analytics**: Better content performance tracking by category and tag
6. **Maintenance**: Consistent structure makes content management easier

## Migration Strategy

### Phase 1: Core Examples (Completed)
- Updated 4 representative posts across different content types
- Established patterns for each category type
- Validated build process with new front matter

### Phase 2: Bulk Update (Future)
- Use automated script to process remaining 200+ posts
- Manual review of automatically generated tags and excerpts
- Quality assurance on high-traffic posts

### Phase 3: Validation (Future)
- Verify all posts have required front matter fields
- Test social sharing previews
- Validate SEO improvements with search console

## Quality Guidelines

- **Excerpts**: Keep under 160 characters for optimal social media display
- **Tags**: Use 3-6 tags per post, focus on most relevant
- **Categories**: Use only one primary category per post
- **Consistency**: Follow established tag naming conventions
- **Relevance**: Ensure tags accurately reflect post content

## Maintenance

- Use the provided template for all new posts
- Review and update tags periodically as content themes evolve
- Monitor social sharing performance to optimize excerpts
- Keep tag taxonomy updated as new topics emerge