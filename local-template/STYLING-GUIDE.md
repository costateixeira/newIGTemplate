# Template Styling Guide

This document describes all configurable colors and parameters available in this FHIR IG template. All CSS variables are defined in `package/content/assets/css/project.css` within the `:root` selector.

## How to Customize

Edit the CSS variables in `project.css` under the `:root { }` section. Each variable uses the format `--variable-name: value;`.

---

## Layout Parameters

| Variable | Default | Description |
|----------|---------|-------------|
| `--nav-width` | `12.5rem` | Width of the left sidebar/menu |
| `--content-width` | `90rem` | Maximum width of the main content area |

---

## Header & Navigation Colors

| Variable | Default | Description |
|----------|---------|-------------|
| `--navbar-bg-color` | `#3f6986` | Background color of the sidebar/navigation |
| `--ig-status-text-color` | `maroon` | Color of the IG title and status text |
| `--ig-header-color` | `#f5f5f5` | Header background color (sides) |
| `--ig-header-container-color` | `#ffffff` | Header container color (center) |
| `--stripe-bg-color` | `#999999` | Top header stripe color |

---

## Menu Button Colors

| Variable | Default | Description |
|----------|---------|-------------|
| `--btn-text-color` | `#e6e6e6` | Menu button text color |
| `--btn-hover-color` | `#45a0d4` | Menu button hover background color |
| `--btn-active-color` | `#235b85` | Menu button active/selected background color |
| `--btn-gradient-start-color` | `#428bca` | Menu item gradient start color |
| `--btn-gradient-end-color` | `#357ebd` | Menu item gradient end color |
| `--btn-gradient-start-color-alpha` | `#ff428bca` | Menu item gradient start color (with alpha for IE) |
| `--btn-gradient-end-color-alpha` | `#ff357ebd` | Menu item gradient end color (with alpha for IE) |

---

## Menu Expander Button Colors

These control the arrow buttons that expand/collapse submenus.

| Variable | Default | Description |
|----------|---------|-------------|
| `--btn-expander-color` | `#f5ffd8` | Expander arrow icon color |
| `--btn-expander-bg-color` | `var(--navbar-bg-color)` | Expander button background color |
| `--btn-expander-hover-bg-color` | `rgba(255, 255, 255, 0.2)` | Expander button hover background |
| `--site-title-hover-bg` | `var(--btn-hover-color)` | Home/logo hover background color |

---

## Link Colors

| Variable | Default | Description |
|----------|---------|-------------|
| `--link-color` | `#428bca` | Hyperlink text color |
| `--link-hover-color` | `#2a6496` | Hyperlink text hover color |

---

## Footer Colors

| Variable | Default | Description |
|----------|---------|-------------|
| `--footer-bg-color` | `#707070` | Footer background color |
| `--footer-container-bg-color` | `#7b1fad` | Footer container color |
| `--footer-nav-bg-color` | `#f5f5f5` | Footer navigation background color |
| `--footer-text-color` | `#ffffff` | Footer text color |
| `--footer-hyperlink-text-color` | `#81BEF7` | Footer hyperlinks color |
| `--footer-highlight-text-color` | `#ffff77` | Footer highlight text color |

---

## Table of Contents (TOC) Box

The "On this page" box that displays the page table of contents.

| Variable | Default | Description |
|----------|---------|-------------|
| `--toc-box-bg-color` | `#ffffff` | TOC box background color |
| `--toc-box-border` | `none` | TOC box full border (e.g., `1px solid #ccc`) |
| `--toc-box-border-left` | `3px solid #203546` | TOC box left accent border |
| `--toc-box-title-color` | `#666666` | TOC box title ("On this page") color |

### TOC Positioning Behavior

The TOC automatically positions itself:
- **Wide screens**: Fixed position in the white space to the right of content
- **Narrow screens**: Floats right within the content area, text wraps around it

---

## Publish Box

The box displayed for draft/ballot publications.

| Variable | Default | Description |
|----------|---------|-------------|
| `--publish-box-bg-color` | `yellow` | Publish box background color |
| `--publish-box-border` | `1px solid #0A0008` | Publish box border definition |

---

## STU Note Box

Boxes for "Note to Balloters" and STU notes.

| Variable | Default | Description |
|----------|---------|-------------|
| `--stu-note-background-color` | `#fff2ff` | STU note background color |
| `--stu-note-border-left-color` | `#ffa0ff` | STU note left border color |

---

## Breadcrumb

| Variable | Default | Description |
|----------|---------|-------------|
| `--breadcrumb-bg-color` | `#f5f5f5` | Breadcrumb background color |
| `--breadcrumb-text-color` | `#555555` | Breadcrumb text color |

---

## Dragon Box

The "Here be dragons" warning box for experimental content.

| Variable | Default | Description |
|----------|---------|-------------|
| `--dragon-background-color` | `#fffbf7` | Dragon box background color |
| `--dragon-text-color` | `#101020` | Dragon box text color |

---

## Translation Box

| Variable | Default | Description |
|----------|---------|-------------|
| `--translation-background-color` | `#f0f0f0` | Translation box background color |
| `--translation-text-color` | `black` | Translation box text color |

---

## Example: Customizing Your IG

To change the sidebar to a dark blue theme with light text:

```css
:root {
  --navbar-bg-color: #1a365d;
  --btn-text-color: #ffffff;
  --btn-hover-color: #2c5282;
  --btn-active-color: #2b6cb0;
  --btn-gradient-start-color: #2c5282;
  --btn-gradient-end-color: #1a365d;
}
```

To make the content area wider:

```css
:root {
  --content-width: 100rem;
}
```

To add a full border to the TOC box:

```css
:root {
  --toc-box-border: 1px solid #cccccc;
  --toc-box-border-left: 3px solid #3f6986;
  --toc-box-bg-color: #f9f9f9;
}
```

---

## SCSS Variables (Advanced)

Additional styling is controlled in `package/content/_sass/color_schemes/light.scss`. These are SCSS variables that are compiled at build time:

| Variable | Default | Description |
|----------|---------|-------------|
| `$sidebar-color` | `#5e0b0b` | Fallback sidebar color |
| `$nav-child-link-color` | `#fffff0` | Child navigation link color |
| `$content-width` | `70rem` | Content width (SCSS fallback) |
| `$feedback-color` | `darken($sidebar-color, 3%)` | Feedback/hover gradient color |

---

## File Locations

| File | Purpose |
|------|---------|
| `package/content/assets/css/project.css` | Main CSS variables (runtime) |
| `package/content/_sass/color_schemes/light.scss` | Theme-specific SCSS styles |
| `package/content/_sass/custom/custom.scss` | Custom SCSS overrides |
| `package/includes/fhir-menu.html` | Menu transformation and TOC positioning JS |

