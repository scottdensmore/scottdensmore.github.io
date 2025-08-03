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
      // Set up event delegation for tag buttons
      const sidebar = document.querySelector('.topic-sidebar');
      if (sidebar) {
        sidebar.addEventListener('click', function(event) {
          const button = event.target.closest('.topic-list__link');
          if (button && button.dataset.tag) {
            event.preventDefault();
            Homepage.filterByTag(button.dataset.tag);
          }
        });
      }
      
      // Set up keyboard navigation for tag buttons
      const tagButtons = document.querySelectorAll('.topic-list__link');
      tagButtons.forEach(button => {
        button.addEventListener('keydown', function(event) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            Homepage.filterByTag(this.dataset.tag);
          }
        });
      });
    },

    /**
     * Filter posts by tag
     * @param {string} tag - The tag to filter by
     */
    filterByTag: function(tag) {
      if (!tag) {
        console.warn('No tag provided for filtering');
        return;
      }
      
      // Validate tag parameter
      const encodedTag = encodeURIComponent(tag);
      const targetUrl = `/posts/?tag=${encodedTag}`;
      
      // Navigate to filtered posts page
      window.location.href = targetUrl;
    },

    /**
     * Navigate to all posts page
     */
    showAllPosts: function() {
      window.location.href = '/posts/';
    }
  };

  // Functions are now accessed via event listeners instead of global exposure

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    Homepage.init();
  });

})();