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
        // Set up event delegation for tag buttons
        const sidebar = document.querySelector('.topic-sidebar');
        if (sidebar) {
          sidebar.addEventListener('click', function(event) {
            try {
              const button = event.target.closest('.topic-list__link');
              if (button && button.dataset.tag) {
                event.preventDefault();
                Homepage.filterByTag(button.dataset.tag);
              }
            } catch (error) {
              console.error('Error handling tag button click:', error);
            }
          });
        } else {
          console.info('Topic sidebar not found, skipping tag button setup');
        }
        
        // Set up keyboard navigation for tag buttons
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
        const targetUrl = `/posts/?tag=${encodedTag}`;
        
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
        window.location.href = '/posts/';
      } catch (error) {
        console.error('Error navigating to posts page:', error);
        // Last resort fallback to home page
        window.location.href = '/';
      }
    }
  };

  // Functions are now accessed via event listeners instead of global exposure

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    Homepage.init();
  });

})();