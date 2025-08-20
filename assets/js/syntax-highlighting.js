/**
 * Enhanced Syntax Highlighting with Copy Functionality
 * Integrates Prism.js with custom enhancements for blog code blocks
 */

class SyntaxHighlighter {
  constructor() {
    this.loadPrismComponents();
    this.initializeAfterLoad();
  }

  /**
   * Load Prism.js core and plugins
   */
  loadPrismComponents() {
    // Load Prism core
    this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js')
      .then(() => this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js'))
      .then(() => this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/toolbar/prism-toolbar.min.js'))
      .then(() => this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js'))
      .then(() => this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/normalize-whitespace/prism-normalize-whitespace.min.js'))
      .then(() => this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/match-braces/prism-match-braces.min.js'))
      .then(() => {
        this.setupPrismConfiguration();
        this.enhanceCodeBlocks();
      })
      .catch(error => {
        console.warn('Failed to load Prism.js components:', error);
        this.fallbackHighlighting();
      });
  }

  /**
   * Load script dynamically
   */
  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  /**
   * Configure Prism.js settings
   */
  setupPrismConfiguration() {
    if (typeof Prism !== 'undefined') {
      // Configure autoloader for dynamic language loading
      Prism.plugins.autoloader.languages_path = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/';
      
      // Configure normalization
      Prism.plugins.NormalizeWhitespace.setDefaults({
        'remove-trailing': true,
        'remove-indent': true,
        'left-trim': true,
        'right-trim': true
      });

      // Customize copy button text
      Prism.plugins.toolbar.registerButton('copy-to-clipboard', {
        text: 'Copy',
        success: 'Copied!',
        error: 'Press Ctrl+C to copy'
      });
    }
  }

  /**
   * Initialize after DOM content is loaded
   */
  initializeAfterLoad() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.enhanceCodeBlocks());
    } else {
      this.enhanceCodeBlocks();
    }
  }

  /**
   * Enhance existing code blocks with better styling and functionality
   */
  enhanceCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre > code, .highlight pre, .highlighter-rouge pre');
    
    codeBlocks.forEach((block, index) => {
      this.enhanceIndividualBlock(block, index);
    });

    // Re-run Prism highlighting if available
    if (typeof Prism !== 'undefined' && Prism.highlightAll) {
      Prism.highlightAll();
    }
  }

  /**
   * Enhance individual code block
   */
  enhanceIndividualBlock(block, index) {
    const pre = block.tagName === 'PRE' ? block : block.closest('pre');
    if (!pre) return;

    // Add unique ID for referencing
    const blockId = `code-block-${index}`;
    pre.id = blockId;

    // Add custom classes for styling
    pre.classList.add('enhanced-code-block');
    
    // Wrap in container for better control
    if (!pre.parentElement.classList.contains('code-block-container')) {
      const container = document.createElement('div');
      container.className = 'code-block-container';
      pre.parentElement.insertBefore(container, pre);
      container.appendChild(pre);
    }

    // Add language label if detectable
    this.addLanguageLabel(pre, block);
    
    // Add line numbers if not already present
    this.addLineNumbers(pre, block);

    // Add custom copy functionality as fallback
    if (typeof Prism === 'undefined' || !Prism.plugins.toolbar) {
      this.addCustomCopyButton(pre, block);
    }
  }

  /**
   * Add language label to code block
   */
  addLanguageLabel(pre, block) {
    const language = this.detectLanguage(block);
    if (language && !pre.querySelector('.code-language-label')) {
      const label = document.createElement('div');
      label.className = 'code-language-label';
      label.textContent = language.toUpperCase();
      pre.parentElement.insertBefore(label, pre);
    }
  }

  /**
   * Detect programming language from code block
   */
  detectLanguage(block) {
    // Check class names for language hints
    const classes = (block.className || '').split(' ');
    for (const cls of classes) {
      if (cls.startsWith('language-')) {
        return cls.replace('language-', '');
      }
      if (cls.startsWith('lang-')) {
        return cls.replace('lang-', '');
      }
    }

    // Check parent element
    const pre = block.closest('pre');
    if (pre) {
      const preClasses = (pre.className || '').split(' ');
      for (const cls of preClasses) {
        if (cls.startsWith('language-')) {
          return cls.replace('language-', '');
        }
      }
    }

    // Basic content-based detection
    const content = block.textContent || '';
    if (content.includes('function') && content.includes('{')) {
      if (content.includes('var ') || content.includes('let ') || content.includes('const ')) {
        return 'javascript';
      }
      if (content.includes('public ') || content.includes('private ')) {
        return 'csharp';
      }
    }
    
    return null;
  }

  /**
   * Add line numbers to code blocks
   */
  addLineNumbers(pre, block) {
    if (pre.querySelector('.line-numbers') || pre.classList.contains('line-numbers')) {
      return; // Already has line numbers
    }

    const content = block.textContent || '';
    const lines = content.split('\n');
    
    // Only add line numbers for blocks with more than 3 lines
    if (lines.length > 3) {
      pre.classList.add('line-numbers');
      
      // Create line numbers container
      const lineNumbers = document.createElement('span');
      lineNumbers.className = 'line-numbers-rows';
      lineNumbers.setAttribute('aria-hidden', 'true');
      
      // Add span for each line
      for (let i = 0; i < lines.length; i++) {
        const lineSpan = document.createElement('span');
        lineNumbers.appendChild(lineSpan);
      }
      
      pre.appendChild(lineNumbers);
    }
  }

  /**
   * Add custom copy button (fallback)
   */
  addCustomCopyButton(pre, block) {
    if (pre.querySelector('.copy-button')) {
      return; // Already has copy button
    }

    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerHTML = '📋 Copy';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    
    copyButton.addEventListener('click', () => this.copyToClipboard(block, copyButton));
    
    // Position button
    const container = pre.parentElement;
    if (container.classList.contains('code-block-container')) {
      container.style.position = 'relative';
      copyButton.style.position = 'absolute';
      copyButton.style.top = '10px';
      copyButton.style.right = '10px';
      container.appendChild(copyButton);
    }
  }

  /**
   * Copy code content to clipboard
   */
  async copyToClipboard(block, button) {
    const text = block.textContent || '';
    const originalText = button.textContent;
    
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        button.textContent = '✅ Copied!';
        button.classList.add('success');
      } else {
        // Fallback for older browsers
        this.fallbackCopyToClipboard(text);
        button.textContent = '✅ Copied!';
        button.classList.add('success');
      }
    } catch (error) {
      console.warn('Copy failed:', error);
      button.textContent = '❌ Failed';
      button.classList.add('error');
    }
    
    // Reset button after 2 seconds
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('success', 'error');
    }, 2000);
  }

  /**
   * Fallback copy method for older browsers
   */
  fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
    } finally {
      document.body.removeChild(textArea);
    }
  }

  /**
   * Fallback highlighting for when Prism fails to load
   */
  fallbackHighlighting() {
    console.info('Using fallback code block enhancement');
    // Add basic styling classes
    const codeBlocks = document.querySelectorAll('pre > code');
    codeBlocks.forEach(block => {
      block.classList.add('fallback-highlighted');
    });
  }
}

// Initialize syntax highlighter
if (typeof window !== 'undefined') {
  window.SyntaxHighlighter = SyntaxHighlighter;
  new SyntaxHighlighter();
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SyntaxHighlighter;
}