---
layout: page
title: .history
permalink: /archive
---

{%- if site.posts.size > 0 -%}
  {%- for post in site.posts -%}
    {{ post.date | date: "%Y-%m-%d" }}&emsp;
    [{{ post.title | escape }}]({{ post.url | relative_url }})
    <br>
  {%- endfor -%}
{%- endif -%}
