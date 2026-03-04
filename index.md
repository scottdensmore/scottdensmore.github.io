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
        <a href="{{ post.url | relative_url }}" class="post-item__link">
          <h2 class="post-item__title">{{ post.title }}</h2>
        </a>
        <div class="post-item__meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">
            {% include icon-calendar.html %}
            {{ post.date | date: "%b %d, %Y" }}
          </time>
          {% assign words = post.content | number_of_words %}
          {% assign minutes = words | plus: 199 | divided_by: 200 %}
          {% if minutes < 1 %}{% assign minutes = 1 %}{% endif %}
          <span class="post-item__reading-time">{{ minutes }} min read</span>
          {% if post.content contains '<img' or post.content contains '![' %}
            <span class="post-item__has-image" title="Contains images">{% include icon-image.html %}</span>
          {% endif %}
        </div>
        {% if post.excerpt %}
          <p class="post-item__excerpt">{{ post.excerpt | strip_html | truncate: 160 }}</p>
        {% endif %}
      </article>
    {% endfor %}
  </section>

  <div class="homepage-more">
    <a href="{{ '/posts/' | relative_url }}" class="homepage-more__link">View all posts &rarr;</a>
  </div>
</div>
