/**
 * Homepage functionality for blog tagging system
 */

(function() {
  'use strict';
  
  // Allowed origins for security validation
  const ALLOWED_ORIGINS = [
    'https://scottdensmore.com',
    'https://scottdensmore.github.io'
  ];
  
  // Add development URLs only in development environment
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    ALLOWED_ORIGINS.push('http://localhost:4000', 'http://127.0.0.1:4000');
  }

  const Homepage = {
    /**
     * Initialize homepage functionality
     */
    init: function() {
      this.validateSiteConfig();
      this.bindEvents();
    },

    /**
     * Validate and warn about SiteConfig availability
     */
    validateSiteConfig: function() {
      if (!window.SiteConfig) {
        console.warn('SiteConfig not available - using fallback URLs');
        return false;
      }
      
      if (!window.SiteConfig.postsUrl) {
        console.warn('SiteConfig.postsUrl not configured - using fallback');
      }
      
      return true;
    },

    /**
     * Get posts URL with robust fallback mechanism
     */
    getPostsUrl: function() {
      // Primary: Use configured posts URL
      if (window.SiteConfig?.postsUrl) {
        return window.SiteConfig.postsUrl;
      }
      
      // Secondary: Try to derive from current page structure
      const currentPath = window.location.pathname;
      if (currentPath === '/' || currentPath === '/index.html') {
        // Look for posts link in navigation
        const postsLink = document.querySelector('a[href*="posts"]');
        if (postsLink) {
          const href = postsLink.getAttribute('href');
          console.info('Derived posts URL from navigation:', href);
          return href;
        }
      }
      
      // Tertiary: Check for posts directory in current URL structure
      let baseUrl;
      if (window.SiteConfig?.baseUrl) {
        baseUrl = window.SiteConfig.baseUrl;
      } else if (ALLOWED_ORIGINS.includes(window.location.origin)) {
        baseUrl = window.location.origin;
      } else {
        console.warn('Current origin is not in allowed origins, using "/" as baseUrl');
        baseUrl = '/';
      }
      const postsPath = baseUrl.endsWith('/') ? 'posts/' : '/posts/';
      
      console.warn('Using constructed posts URL:', baseUrl + postsPath);
      return baseUrl + postsPath;
    },

    /**
     * Bind event listeners
     */
    bindEvents: function() {
      try {
        // Set up event delegation for tag buttons and view all button
        const sidebar = document.querySelector('.topic-sidebar');
        if (sidebar) {
          sidebar.addEventListener('click', function(event) {
            try {
              // Handle tag filter buttons
              const tagButton = event.target.closest('.topic-list__link');
              if (tagButton && tagButton.dataset.tag) {
                event.preventDefault();
                Homepage.filterByTag(tagButton.dataset.tag);
                return;
              }
              
              // Handle view all posts button
              const viewAllButton = event.target.closest('.view-all-link');
              if (viewAllButton) {
                event.preventDefault();
                Homepage.showAllPosts();
                return;
              }
            } catch (error) {
              console.error('Error handling sidebar button click:', error);
            }
          });
        } else {
          console.info('Topic sidebar not found, skipping button setup');
        }
        
        // Set up keyboard navigation for buttons
        const tagButtons = document.querySelectorAll('.topic-list__link');
        if (tagButtons.length > 0) {
          tagButtons.forEach(button => {
            button.addEventListener('keydown', function(event) {
              try {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  Homepage.filterByTag(this.dataset.tag);
                }
              } catch (error) {
                console.error('Error handling keyboard navigation:', error);
              }
            });
          });
        } else {
          console.info('No tag buttons found, skipping keyboard navigation setup');
        }
        
        // Set up keyboard navigation for view all button
        const viewAllButton = document.querySelector('.view-all-link');
        if (viewAllButton) {
          viewAllButton.addEventListener('keydown', function(event) {
            try {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                Homepage.showAllPosts();
              }
            } catch (error) {
              console.error('Error handling view all keyboard navigation:', error);
            }
          });
        }
      } catch (error) {
        console.error('Error setting up event listeners:', error);
      }
    },

    /**
     * Filter posts by tag
     * @param {string} tag - The tag to filter by
     */
    filterByTag: function(tag) {
      try {
        if (!tag || typeof tag !== 'string') {
          console.warn('Invalid tag provided for filtering:', tag);
          this.showAllPosts();
          return;
        }
        
        // Sanitize and validate tag parameter
        const sanitizedTag = tag.trim();
        if (sanitizedTag.length === 0) {
          console.warn('Empty tag provided for filtering');
          this.showAllPosts();
          return;
        }
        // Only allow uppercase/lowercase letters, digits, hyphens, and underscores (A-Z, a-z, 0-9, -, _)
        const validTagPattern = /^[A-Za-z0-9_-]+$/;
        if (!validTagPattern.test(sanitizedTag)) {
          console.warn('Tag contains invalid characters:', sanitizedTag);
          this.showAllPosts();
          return;
        }
        const encodedTag = encodeURIComponent(sanitizedTag);
        const postsUrl = this.getPostsUrl();
        const targetUrl = `${postsUrl}?tag=${encodedTag}`;
        
        // Navigate to filtered posts page
        window.location.href = targetUrl;
      } catch (error) {
        console.error('Error filtering by tag:', error);
        // Fallback to all posts page
        this.showAllPosts();
      }
    },

    /**
     * Navigate to all posts page
     */
    showAllPosts: function() {
      try {
        const postsUrl = this.getPostsUrl();
        window.location.href = postsUrl;
      } catch (error) {
        console.error('Error navigating to posts page:', error);
        // Last resort fallback to home page
        const homeUrl = window.SiteConfig?.baseUrl || '/';
        window.location.href = homeUrl;
      }
    }
  };

  // HTML buttons use data attributes and event listeners instead of global onclick handlers
  // This approach improves security, accessibility, and maintainability

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    Homepage.init();
  });

})();