---
layout: single
title: ""
author_profile: false
classes: wide
---

<div class="homepage-container">
  <section class="homepage-posts">
    {% for post in site.posts limit: 20 %}
      <article class="post-item">
        <a href="{{ post.url }}" class="post-item__link">
          <h2 class="post-item__title">{{ post.title }}</h2>
        </a>
        <div class="post-item__meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            {{ post.date | date: "%b %d, %Y" }}
          </time>
          {% assign words = post.content | number_of_words %}
          {% assign minutes = words | divided_by: 200 %}
          {% if minutes < 1 %}{% assign minutes = 1 %}{% endif %}
          <span class="post-item__reading-time">{{ minutes }} min read</span>
        </div>
        {% if post.excerpt %}
          <p class="post-item__excerpt">{{ post.excerpt | strip_html | truncate: 160 }}</p>
        {% endif %}
      </article>
    {% endfor %}
  </section>

  <div class="homepage-more">
    <a href="/posts/" class="homepage-more__link">View all posts &rarr;</a>
  </div>
</div>
