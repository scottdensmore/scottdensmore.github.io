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
      // Tag filtering could be enhanced here in the future
      // For now, we just handle the basic navigation
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
      const targetUrl = window.POSTS_URL + `?tag=${encodedTag}`;
      
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

  // Make functions globally available for Jekyll template usage
  window.filterByTag = Homepage.filterByTag.bind(Homepage);
  window.showAllPosts = Homepage.showAllPosts.bind(Homepage);

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    Homepage.init();
  });

})();