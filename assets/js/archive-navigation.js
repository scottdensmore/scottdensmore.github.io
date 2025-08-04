/**
 * Archive Navigation Module
 * Handles smooth scrolling and active year highlighting for the archive page
 */

class ArchiveNavigation {
  constructor(config = {}) {
    this.config = {
      selectors: {
        yearLinks: '.year-nav-link',
        yearSections: '.year-section'
      },
      scrollOffset: 100,
      scrollThrottle: 50,
      ...config
    };
    
    this.yearLinks = null;
    this.yearSections = null;
    this.scrollTimeout = null;
    
    this.init();
  }
  
  init() {
    if (!this.validateElements()) {
      console.warn('Archive navigation elements not found');
      return;
    }
    
    this.bindSmoothScrolling();
    this.bindScrollHighlighting();
    this.setInitialActiveYear();
  }
  
  validateElements() {
    this.yearLinks = document.querySelectorAll(this.config.selectors.yearLinks);
    this.yearSections = document.querySelectorAll(this.config.selectors.yearSections);
    
    return this.yearLinks.length > 0 && this.yearSections.length > 0;
  }
  
  bindSmoothScrolling() {
    this.yearLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleYearNavClick(link);
      });
    });
  }
  
  handleYearNavClick(clickedLink) {
    const targetId = clickedLink.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (!targetElement) {
      console.warn(`Target element not found: ${targetId}`);
      return;
    }
    
    // Update active state
    this.setActiveYear(clickedLink);
    
    // Smooth scroll to target
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
  
  setActiveYear(activeLink) {
    this.yearLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }
  
  bindScrollHighlighting() {
    window.addEventListener('scroll', () => {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      this.scrollTimeout = setTimeout(() => {
        this.updateActiveYearOnScroll();
      }, this.config.scrollThrottle);
    });
  }
  
  updateActiveYearOnScroll() {
    let currentYear = '';
    
    this.yearSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= this.config.scrollOffset && rect.bottom >= this.config.scrollOffset) {
        currentYear = section.id.replace('year-', '');
      }
    });
    
    if (currentYear) {
      this.yearLinks.forEach(link => {
        const isActive = link.dataset.year === currentYear;
        link.classList.toggle('active', isActive);
      });
    }
  }
  
  setInitialActiveYear() {
    // Set initial active year on page load
    this.updateActiveYearOnScroll();
  }
  
  destroy() {
    // Cleanup method for SPA scenarios
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }
}

// Auto-initialize on DOM ready if archive elements exist
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.year-nav-link')) {
    window.archiveNavigation = new ArchiveNavigation();
  }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ArchiveNavigation;
}