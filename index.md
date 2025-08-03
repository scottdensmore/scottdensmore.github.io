---
layout: single
title: ""
author_profile: false
classes: wide
---

<div class="container-max">
  <div class="flex-gap">
    
    <!-- Explore by Topic - Left Sidebar -->
    <div style="width: 250px; flex-shrink: 0;">
      <h3 style="color: #2c3e50; margin-bottom: 1rem; font-size: 1.2rem;">🏷️ Explore by Topic</h3>
      
      {% assign all_tags = site.posts | map: 'tags' | flatten | uniq | sort %}
      <ul style="list-style: none; padding: 0; margin: 0;">
        {% for tag in all_tags %}
          <li style="margin-bottom: 0.5rem;">
            <a href="#" onclick="filterByTag('{{ tag }}')" style="color: #667eea; text-decoration: none; font-weight: 500; display: flex; align-items: center; padding: 0.3rem 0; border-bottom: 1px solid #eee; transition: color 0.2s ease;">
              <span style="margin-right: 0.5rem;">#</span>{{ tag }}
            </a>
          </li>
        {% endfor %}
      </ul>
      
      <div style="margin-top: 1.5rem;">
        <a href="#" onclick="showAllPosts()" style="color: #6c757d; text-decoration: none; font-weight: 500; font-size: 0.9rem;">→ View All Posts</a>
      </div>
    </div>
    
    <!-- Latest Post - Main Content -->
    <div style="flex: 1; min-width: 0;">
      <h2>📝 Latest Post</h2>

{% assign latest_post = site.posts.first %}
{% if latest_post %}
<div class="latest-post" style="background: #f8f9fa; padding: 2rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 1rem; border-left: 4px solid #667eea;">
  <h3 style="color: #2c3e50; margin-bottom: 1rem; font-size: 1.5rem;"><a href="{{ latest_post.url }}" style="text-decoration: none; color: inherit;">{{ latest_post.title }}</a></h3>
  <p style="color: #666; margin-bottom: 1rem; font-size: 0.9rem; display: flex; align-items: center;"><i class="fas fa-calendar-alt" style="margin-right: 0.5rem;"></i>{{ latest_post.date | date: "%B %d, %Y" }}</p>
  {% if latest_post.tags and latest_post.tags.size > 0 %}
    <div style="margin-bottom: 1rem;">
      {% for tag in latest_post.tags %}
        <span style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.8rem; margin-right: 0.5rem;">#{{ tag }}</span>
      {% endfor %}
    </div>
  {% endif %}
  {% if latest_post.excerpt %}
    <p style="line-height: 1.6; margin-bottom: 1.5rem; font-size: 1.1rem;">{{ latest_post.excerpt | strip_html | truncate: 200 }}</p>
  {% else %}
    <p style="line-height: 1.6; margin-bottom: 1.5rem; font-size: 1.1rem;">{{ latest_post.content | strip_html | truncate: 200 }}</p>
  {% endif %}
  <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;">
    <span style="background: #667eea; color: white; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.85rem;">Latest</span>
    <a href="{{ latest_post.url }}" style="color: #667eea; text-decoration: none; font-weight: 600; display: flex; align-items: center;">Read More <i class="fas fa-arrow-right" style="margin-left: 0.5rem;"></i></a>
  </div>
</div>
{% else %}
<div class="latest-post" style="background: #f8f9fa; padding: 2rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 1rem; border-left: 4px solid #667eea;">
  <h3 style="color: #2c3e50; margin-bottom: 1rem; font-size: 1.5rem;">No Posts Yet</h3>
  <p style="line-height: 1.6; margin-bottom: 1.5rem; font-size: 1.1rem;">Start writing your first blog post!</p>
  <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;">
    <span style="background: #6c757d; color: white; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.85rem;">Coming Soon</span>
  </div>
</div>
{% endif %}
    </div>
  </div>
</div>

<script>
function filterByTag(tag) {
  // This will redirect to a tag-filtered posts page
  window.location.href = '/posts/?tag=' + encodeURIComponent(tag);
}

function showAllPosts() {
  window.location.href = '/posts/';
}
</script>