---
layout: single
title: "Archive"
permalink: /archive/
author_profile: false
classes: wide
---

<div class="archive-container">
  <div class="archive-header">
    <h1><i class="fas fa-archive"></i> Post Archive</h1>
    <p class="archive-summary">{{ site.posts.size }} posts spanning {{ site.posts.last.date | date: "%Y" }} to {{ site.posts.first.date | date: "%Y" }}</p>
  </div>

  <!-- Load centralized data processing -->
  {% include data-processors.html %}
  
  <div class="archive-layout">
    <!-- Year Navigation Sidebar -->
    <aside class="archive-sidebar">
      <h3><i class="fas fa-calendar-alt"></i> Browse by Year</h3>
      <nav class="year-navigation">
        {% for year_group in posts_by_year %}
          {% assign year = year_group.name %}
          {% assign post_count = year_group.items | size %}
          <a href="#year-{{ year }}" class="year-nav-link" data-year="{{ year }}">
            <span class="year">{{ year }}</span>
            <span class="post-count">{{ post_count }} post{% unless post_count == 1 %}s{% endunless %}</span>
          </a>
        {% endfor %}
      </nav>
    </aside>

    <!-- Main Archive Content -->
    <main class="archive-main">
      {% for year_group in posts_by_year %}
        {% assign year = year_group.name %}
        {% assign posts_by_month = year_group.items | group_by_exp: "post", "post.date | date: '%B'" %}
        
        <section class="year-section" id="year-{{ year }}">
          <h2 class="year-header">
            <i class="fas fa-calendar"></i>
            {{ year }}
            <span class="year-post-count">{{ year_group.items | size }} posts</span>
          </h2>
          
          <div class="months-grid">
            {% for month_group in posts_by_month %}
              {% assign month = month_group.name %}
              {% assign month_posts = month_group.items %}
              
              <div class="month-section">
                <h3 class="month-header">
                  {{ month }} {{ year }}
                  <span class="month-post-count">{{ month_posts | size }}</span>
                </h3>
                
                <div class="posts-list">
                  {% for post in month_posts %}
                    <article class="archive-post">
                      <div class="post-date">
                        <time datetime="{{ post.date | date_to_xmlschema }}">
                          {{ post.date | date: "%d" }}
                        </time>
                      </div>
                      
                      <div class="post-content">
                        <h4 class="post-title">
                          <a href="{{ post.url }}">{{ post.title }}</a>
                        </h4>
                        
                        {% if post.excerpt %}
                          <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 120 }}</p>
                        {% endif %}
                        
                        {% if post.tags and post.tags.size > 0 %}
                          <div class="post-tags">
                            {% for tag in post.tags limit: 3 %}
                              <span class="tag">#{{ tag }}</span>
                            {% endfor %}
                            {% if post.tags.size > 3 %}
                              <span class="tag-more">+{{ post.tags.size | minus: 3 }} more</span>
                            {% endif %}
                          </div>
                        {% endif %}
                      </div>
                    </article>
                  {% endfor %}
                </div>
              </div>
            {% endfor %}
          </div>
        </section>
      {% endfor %}
    </main>
  </div>
</div>

<script src="/assets/js/archive-navigation.js"></script>