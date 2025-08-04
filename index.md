---
layout: single
title: ""
author_profile: false
classes: wide
---

<div class="homepage-container">
  <div class="homepage-layout">
    {% include random-posts-sidebar.html %}
    
    <main class="main-content">
      <h2 class="main-content__title"><i class="fas fa-newspaper"></i> Latest Post</h2>
      {% include latest-post-card.html %}
      
      {% include archive-stats.html %}
    </main>
  </div>
</div>

{% include site-config.html %}
<script src="{{ '/assets/js/homepage.js' | relative_url }}"></script>