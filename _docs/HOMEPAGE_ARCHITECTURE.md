# Homepage Architecture Documentation

## Overview

The homepage has been refactored to follow modern web development best practices with proper separation of concerns, maintainable code structure, and semantic HTML.

## File Structure

```
├── _includes/
│   ├── homepage-sidebar.html       # Left sidebar with topic navigation
│   ├── latest-post-card.html       # Reusable latest post component
│   └── masthead.html               # Custom header with profile integration
├── _sass/
│   └── custom.scss                 # All custom styles with CSS variables
├── assets/
│   ├── css/
│   │   └── main.scss              # Main stylesheet that imports everything
│   └── js/
│       └── homepage.js            # Homepage JavaScript functionality
└── index.md                       # Clean homepage markup
```

## Design Principles

### 1. Separation of Concerns
- **HTML**: Semantic markup in include files
- **CSS**: All styles in SCSS with CSS custom properties
- **JavaScript**: Separate file with proper error handling

### 2. Reusability
- Modular components that can be reused across pages
- CSS variables for consistent theming
- Include files for common UI patterns

### 3. Maintainability
- No inline styles or scripts
- Proper class naming following BEM methodology
- Documented CSS variables for easy customization

### 4. Performance
- Minified CSS/JS in production
- Semantic HTML for better SEO
- Responsive design with mobile-first approach

## CSS Architecture

### Custom Properties (CSS Variables)
All design tokens are defined as CSS custom properties in `:root`:

```scss
:root {
  --primary-color: #667eea;
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  
  --secondary-color: #6c757d;
  --text-primary: #2c3e50;
  --text-secondary: #666;
  // ... more variables
}
```

### Component Classes
Each UI component has its own class namespace:

- `.homepage-*` - Homepage layout classes
- `.topic-*` - Topic sidebar classes  
- `.latest-post*` - Latest post card classes
- `.site-title*` - Custom masthead classes

### Responsive Design
Mobile-first responsive design with breakpoints:
- Mobile: Default styles
- Tablet+: `@media (min-width: 768px)`

## JavaScript Architecture

### Module Pattern
Uses IIFE (Immediately Invoked Function Expression) to avoid global scope pollution:

```javascript
(function() {
  'use strict';
  
  const Homepage = {
    // Methods here
  };
  
  // Expose only needed functions globally
  window.filterByTag = Homepage.filterByTag.bind(Homepage);
})();
```

### Error Handling
Includes proper validation and error handling for user interactions.

## Component Documentation

### Homepage Sidebar (`homepage-sidebar.html`)
- Displays all unique tags from posts
- Handles empty state gracefully
- Semantic `<aside>` element for accessibility

### Latest Post Card (`latest-post-card.html`)
- Shows most recent blog post
- Includes metadata (date, tags)
- Handles empty state when no posts exist
- Uses semantic `<article>` and `<time>` elements

### Custom Masthead (`masthead.html`)
- Integrates profile picture with site branding
- Maintains Jekyll theme compatibility
- Clean HTML without inline styles

## Customization Guide

### Changing Colors
Update CSS custom properties in `_sass/custom.scss`:

```scss
:root {
  --primary-color: #your-color;
  --primary-gradient: linear-gradient(135deg, #start 0%, #end 100%);
}
```

### Adding New Components
1. Create new include file in `_includes/`
2. Add component styles to `_sass/custom.scss`
3. Follow BEM naming convention
4. Document component purpose and usage

### Modifying Layout
- Desktop layout: Adjust flexbox properties in `.homepage-layout`
- Mobile layout: Update media queries
- Spacing: Use CSS custom properties for consistency

## Browser Support

- Modern browsers (Chrome 88+, Firefox 78+, Safari 14+)
- CSS Grid and Flexbox support required
- ES6 JavaScript features used

## Performance Considerations

- CSS is compiled and minified by Jekyll
- JavaScript is loaded after DOM content for better performance
- Images should be optimized (WebP when possible)
- Minimal DOM manipulation for better performance

## Future Enhancements

Potential improvements that maintain the current architecture:

1. **Tag Filtering**: Implement client-side filtering without page refresh
2. **Dark Mode**: Add CSS custom property overrides
3. **Animation**: Add CSS transitions for better UX
4. **PWA Features**: Service worker for offline functionality
5. **SEO**: Structured data for better search engine visibility