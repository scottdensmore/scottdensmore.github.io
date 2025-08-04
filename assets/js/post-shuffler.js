/**
 * Post Shuffler Module
 * Handles randomization and shuffling of post lists
 */

class PostShuffler {
  constructor(config = {}) {
    this.config = {
      selectors: {
        shuffleButton: '.shuffle-posts-btn',
        postsList: '.random-posts-list',
        postCards: '.random-post-card'
      },
      animation: {
        duration: 150,
        fadeOpacity: 0.7
      },
      ...config
    };
    
    this.shuffleButton = null;
    this.postsList = null;
    
    this.init();
  }
  
  init() {
    if (!this.validateElements()) {
      console.warn('Post shuffler elements not found');
      return;
    }
    
    this.bindShuffleButton();
    this.performInitialShuffle();
  }
  
  validateElements() {
    this.shuffleButton = document.querySelector(this.config.selectors.shuffleButton);
    this.postsList = document.querySelector(this.config.selectors.postsList);
    
    return this.shuffleButton && this.postsList;
  }
  
  bindShuffleButton() {
    this.shuffleButton.addEventListener('click', () => {
      this.shufflePosts();
    });
  }
  
  shufflePosts() {
    const posts = Array.from(this.postsList.children);
    
    if (posts.length <= 1) {
      console.warn('Need at least 2 posts to shuffle');
      return;
    }
    
    // Apply fade animation
    this.animateShuffle(() => {
      // Fisher-Yates shuffle algorithm
      const shuffledPosts = this.fisherYatesShuffle([...posts]);
      
      // Re-append shuffled posts
      shuffledPosts.forEach(post => {
        this.postsList.appendChild(post);
      });
    });
  }
  
  fisherYatesShuffle(array) {
    const shuffled = [...array];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  }
  
  animateShuffle(callback) {
    // Fade out
    this.postsList.style.opacity = this.config.animation.fadeOpacity;
    
    // Execute shuffle after fade
    setTimeout(() => {
      callback();
      
      // Fade back in
      setTimeout(() => {
        this.postsList.style.opacity = '1';
      }, 10); // Small delay to ensure DOM update
      
    }, this.config.animation.duration);
  }
  
  performInitialShuffle() {
    // Auto-shuffle on page load for randomness
    setTimeout(() => {
      this.shufflePosts();
    }, 100); // Small delay to ensure DOM is fully loaded
  }
  
  // Utility method for external shuffling
  static shuffle(array) {
    const shuffler = new PostShuffler();
    return shuffler.fisherYatesShuffle(array);
  }
}

// Auto-initialize on DOM ready if shuffle elements exist
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.shuffle-posts-btn')) {
    window.postShuffler = new PostShuffler();
  }
});

// Export for module systems  
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PostShuffler;
}