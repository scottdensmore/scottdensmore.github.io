/**
 * Homepage functionality for blog tagging system
 */

(function() {
  'use strict';

  const Homepage = {
    /**
     * Initialize homepage functionality
     */
    init: function() {
      this.bindEvents();
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
        
        const encodedTag = encodeURIComponent(sanitizedTag);
        const postsUrl = window.SiteConfig?.postsUrl || '/posts/';
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
        const postsUrl = window.SiteConfig?.postsUrl || '/posts/';
        window.location.href = postsUrl;
      } catch (error) {
        console.error('Error navigating to posts page:', error);
        // Last resort fallback to home page
        window.location.href = '/';
      }
    }
  };

  // All interactions handled via event delegation - no global function exposure needed
  // HTML buttons use data attributes and event listeners instead of onclick handlers
  // This provides better security, accessibility, and maintainability

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    Homepage.init();
  });

})();