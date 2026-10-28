---
---
{%- comment -%}A script, not JSON, so it loads with a <script> tag and search also works from the file system{%- endcomment -%}
window.jtdSearchData = {
{%- comment -%}base2 renders this file once per language (/<lang>/assets/js/search-data.js): index only that language{%- endcomment -%}
{%- assign index_url_parts = page.url | split: '/' -%}
{%- assign lang_prefix = '/' | append: index_url_parts[1] | append: '/' -%}
{%- assign i = 0 -%}
{%- assign pages_array = "" | split: "" -%}
{%- assign pages_array = pages_array | push: site.html_pages -%}
{%- if site.just_the_docs.collections -%}
  {%- for collection_entry in site.just_the_docs.collections -%}
    {%- assign collection_key = collection_entry[0] -%}
    {%- assign collection_value = collection_entry[1] -%}
    {%- assign collection = site[collection_key] -%}
    {%- if collection_value.search_exclude != true -%}
      {%- assign pages_array = pages_array | push: collection -%}
    {%- endif -%}
  {%- endfor -%}
{%- endif -%}
{%- for pages in pages_array -%}
  {%- for page in pages -%}
    {%- comment -%}Skip AI and format views (XML/JSON/Turtle) and base2's own search page{%- endcomment -%}
    {%- unless page.url contains '.ai.html' or page.url contains '.xml.html' or page.url contains '.json.html' or page.url contains '.ttl.html' or page.url contains 'searchform.html' -%}
    {%- if page.search_exclude != true and page.url contains lang_prefix -%}
      {%- assign url_parts = page.url | split: '/' -%}
      {%- assign localPage = url_parts | last -%}
      {%- assign page_lang = url_parts[1] -%}
      {%- assign url_end = page.url | slice: -1 -%}
      {%- if url_end == '/' -%}
        {%- assign localPage = 'index.html' -%}
      {%- endif -%}
      {%- comment -%}base2 pages include the whole template; index only the page body{%- endcomment -%}
      {%- assign page_content = page.content | split: '<main>' | last | split: '</main>' | first -%}
      {%- comment -%}Pages the publisher generates from layouts (examples, history) are not in pages.json: use their first heading{%- endcomment -%}
      {%- assign h2_parts = page_content | split: '<h2' -%}
      {%- assign first_h2 = h2_parts[1] | split: '</h2>' | first | prepend: '<h2' | strip_html | strip -%}
      {%- assign doc_title = site.data.pages[localPage].titlelang[page_lang] | default: page.title | default: first_h2 | default: "Untitled Page" -%}
      {%- assign heading_level = site.search.heading_level | default: 2 -%}
      {%- for j in (2..heading_level) -%}
        {%- assign tag = '<h' | append: j -%}
        {%- assign closing_tag = '</h' | append: j -%}
        {%- assign page_content = page_content | replace: tag, '<h1' | replace: closing_tag, '</h1' -%}
      {%- endfor -%}
      {%- assign parts = page_content | split: '<h1' -%}
      {%- assign title_found = false -%}
      {%- for part in parts offset: 1 -%}
        {%- assign titleAndContent = part | split: '</h1>' -%}
        {%- assign title = titleAndContent[0] | replace_first: '>', '<h1>' | split: '<h1>' -%}
        {%- assign title = title[1] | strip_html -%}
        {%- assign content = titleAndContent[1] -%}
        {%- assign url = page.url -%}
        {%- if parts[0] == '' -%}
          {%- assign title_found = true -%}
        {%- else -%}
          {%- assign id = titleAndContent[0] -%}
          {%- assign id = id | split: 'id="' -%}
          {%- if id.size == 2 -%}
            {%- assign id = id[1] -%}
            {%- assign id = id | split: '"' -%}
            {%- assign id = id[0] -%}
            {%- capture url -%}{{ url | append: '#' | append: id }}{%- endcapture -%}
          {%- endif -%}
        {%- endif -%}
  {%- unless i == 0 -%},{%- endunless -%}
  "{{ i }}": {
    "doc": {{ doc_title | jsonify }},
    "title": {{ title | jsonify }},
    "content": {{ content | replace: '</h', ' . </h' | replace: '<hr', ' . <hr' | replace: '</p', ' . </p' | replace: '<ul', ' . <ul' | replace: '</ul', ' . </ul' | replace: '<ol', ' . <ol' | replace: '</ol', ' . </ol' | replace: '</tr', ' . </tr' | replace: '<li', ' | <li' | replace: '</li', ' | </li' | replace: '</td', ' | </td' | replace: '<td', ' | <td' | replace: '</th', ' | </th' | replace: '<th', ' | <th' | strip_html | remove: 'Table of contents' | normalize_whitespace | replace: '. . .', '.' | replace: '. .', '.' | replace: '| |', '|' | append: ' ' | jsonify }},
    "url": "{{ url | relative_url }}",
    {% include custom-data.json page=page %}
    "relUrl": "{{ url }}"
  }
        {%- assign i = i | plus: 1 -%}
      {%- endfor -%}
      {%- unless title_found -%}
  {%- unless i == 0 -%},{%- endunless -%}
  "{{ i }}": {
    "doc": {{ doc_title | jsonify }},
    "title": {{ doc_title | jsonify }},
    "content": {{ parts[0] | replace: '</h', ' . </h' | replace: '<hr', ' . <hr' | replace: '</p', ' . </p' | replace: '<ul', ' . <ul' | replace: '</ul', ' . </ul' | replace: '<ol', ' . <ol' | replace: '</ol', ' . </ol' | replace: '</tr', ' . </tr' | replace: '<li', ' | <li' | replace: '</li', ' | </li' | replace: '</td', ' | </td' | replace: '<td', ' | <td' | replace: '</th', ' | </th' | replace: '<th', ' | <th' | strip_html | remove: 'Table of contents' | normalize_whitespace | replace: '. . .', '.' | replace: '. .', '.' | replace: '| |', '|' | append: ' ' | jsonify }},
    "url": "{{ page.url | relative_url }}",
    {% include custom-data.json page=page %}
    "relUrl": "{{ page.url }}"
  }
        {%- assign i = i | plus: 1 -%}
      {%- endunless -%}
    {%- endif -%}
    {%- endunless -%}
  {%- endfor -%}
{%- endfor %}
};
