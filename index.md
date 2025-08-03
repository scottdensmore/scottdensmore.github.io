---
layout: single
title: ""
author_profile: false
classes: wide
---

<div class="homepage-container">
  <div class="homepage-layout">
    {% include homepage-sidebar.html %}
    
    <main class="main-content">
      <h2 class="main-content__title">📝 Latest Post</h2>
      {% include latest-post-card.html %}
    </main>
  </div>
</div>

<script src="{{ '/assets/js/homepage.js' | relative_url }}"></script>