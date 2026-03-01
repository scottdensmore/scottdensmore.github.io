(function () {
  'use strict';

  var searchIndex = null;
  var searchOverlay = null;
  var searchInput = null;
  var searchResults = null;
  var debounceTimer = null;

  var DEBOUNCE_MS = 200;
  var MAX_RESULTS = 10;
  var SNIPPET_LENGTH = 120;

  function init() {
    searchOverlay = document.getElementById('search-overlay');
    searchInput = document.getElementById('search-input');
    searchResults = document.getElementById('search-results');

    if (!searchOverlay || !searchInput || !searchResults) return;

    // Move overlay to body root to avoid stacking context issues
    document.body.appendChild(searchOverlay);

    var openBtn = document.getElementById('search-toggle');
    if (openBtn) {
      openBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openSearch();
      });
    }

    var closeBtn = document.getElementById('search-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        closeSearch();
      });
    }

    searchOverlay.addEventListener('click', function (e) {
      if (e.target === searchOverlay) {
        closeSearch();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && searchOverlay.classList.contains('is-active')) {
        closeSearch();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (searchOverlay.classList.contains('is-active')) {
          closeSearch();
        } else {
          openSearch();
        }
      }
    });

    searchInput.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        performSearch(searchInput.value.trim());
      }, DEBOUNCE_MS);
    });
  }

  function openSearch() {
    searchOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    searchInput.value = '';
    searchResults.innerHTML = '';
    searchInput.focus();
    loadIndex();
  }

  function closeSearch() {
    searchOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
    searchInput.value = '';
    searchResults.innerHTML = '';
  }

  function loadIndex() {
    if (searchIndex) return;

    fetch('/search.json')
      .then(function (response) {
        if (!response.ok) throw new Error('Failed to load search index');
        return response.json();
      })
      .then(function (data) {
        searchIndex = data;
      })
      .catch(function (err) {
        console.error('Search index load error:', err);
        searchResults.innerHTML =
          '<p class="search-results__error">Unable to load search data.</p>';
      });
  }

  function performSearch(query) {
    if (!query || query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }

    if (!searchIndex) {
      searchResults.innerHTML =
        '<p class="search-results__loading">Loading search data...</p>';
      return;
    }

    var words = query.toLowerCase().split(/\s+/).filter(function (w) {
      return w.length > 0;
    });

    var scored = [];

    for (var i = 0; i < searchIndex.length; i++) {
      var post = searchIndex[i];
      var titleLower = post.title.toLowerCase();
      var tagsLower = (post.tags || []).join(' ').toLowerCase();
      var contentLower = post.content.toLowerCase();
      var score = 0;
      var allMatch = true;

      for (var j = 0; j < words.length; j++) {
        var word = words[j];
        var inTitle = titleLower.indexOf(word) !== -1;
        var inTags = tagsLower.indexOf(word) !== -1;
        var inContent = contentLower.indexOf(word) !== -1;

        if (!inTitle && !inTags && !inContent) {
          allMatch = false;
          break;
        }

        if (inTitle) score += 10;
        if (inTags) score += 5;
        if (inContent) score += 1;
      }

      if (allMatch && score > 0) {
        scored.push({ post: post, score: score });
      }
    }

    scored.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.date_iso) - new Date(a.post.date_iso);
    });

    renderResults(scored.slice(0, MAX_RESULTS), words);
  }

  function renderResults(results, queryWords) {
    if (results.length === 0) {
      searchResults.innerHTML =
        '<p class="search-results__empty">No results found.</p>';
      return;
    }

    var html = '';
    for (var i = 0; i < results.length; i++) {
      var post = results[i].post;
      var snippet = getSnippet(post.content, queryWords);
      var tags = (post.tags || [])
        .map(function (t) {
          return '<span class="search-result__tag">' + escapeHtml(t) + '</span>';
        })
        .join(' ');

      html +=
        '<a href="' + escapeHtml(post.url) + '" class="search-result">' +
          '<h3 class="search-result__title">' + highlightWords(escapeHtml(post.title), queryWords) + '</h3>' +
          '<div class="search-result__meta">' +
            '<time>' + escapeHtml(post.date) + '</time>' +
            (tags ? '<span class="search-result__tags">' + tags + '</span>' : '') +
          '</div>' +
          '<p class="search-result__snippet">' + highlightWords(escapeHtml(snippet), queryWords) + '</p>' +
        '</a>';
    }

    searchResults.innerHTML = html;
  }

  function getSnippet(content, queryWords) {
    var lower = content.toLowerCase();
    var bestIndex = -1;

    for (var i = 0; i < queryWords.length; i++) {
      var idx = lower.indexOf(queryWords[i]);
      if (idx !== -1 && (bestIndex === -1 || idx < bestIndex)) {
        bestIndex = idx;
      }
    }

    if (bestIndex === -1) {
      return content.substring(0, SNIPPET_LENGTH) + (content.length > SNIPPET_LENGTH ? '...' : '');
    }

    var start = Math.max(0, bestIndex - 40);
    var end = Math.min(content.length, start + SNIPPET_LENGTH);
    var snippet = content.substring(start, end);

    if (start > 0) snippet = '...' + snippet;
    if (end < content.length) snippet = snippet + '...';

    return snippet;
  }

  function highlightWords(text, queryWords) {
    for (var i = 0; i < queryWords.length; i++) {
      var word = queryWords[i];
      var escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      var regex = new RegExp('(' + escaped + ')', 'gi');
      text = text.replace(regex, '<mark>$1</mark>');
    }
    return text;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
