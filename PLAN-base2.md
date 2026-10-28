# Plan: clean up local-template and align it with base2

Goal: `local-template` keeps the just-the-docs (jtd) look, carries only what it needs, and follows
`fhir2.base.template` (base2): languages, RTL, translation notices, per-language menus.

## Progress

| Step | Status |
|---|---|
| 0. Decisions (see below) | ☑ |
| 1. Baseline build + asset inventory | ☑ |
| 2. Remove pure duplicates | ☑ (16 assets; output identical apart from timestamps/build IDs) |
| 3. Remove unused jtd parts | ☐ |
| 4. Trim runtime JS/CSS | ☐ |
| 5. Re-fork page shell from base2 (languages) | ◐ page lookup (`localPage`, `titlelang`) fixed, so numbering and titles work again; `lang` is passed to header/breadcrumbs |
| 6. Multilingual test IG (2nd language + RTL) | ◐ `pt es fr nl ar` added; language selector at the right of the jtd top bar; RTL: base2 `dir` logic + `direction-management.js` + `_sass/custom/rtl.scss` (sidebar right, menu, TOC, code/tree tables kept LTR) |
| 7. Upstream-sync safeguard | ☐ |
| 8. Branch / PR / CI | ☐ |

## What I found

**Inheritance is already base2.** `local-template` → `hl7.be.fhir.template` → `fhir2.base.template`.
The problem is that the local overrides were forked from **base1** (`fhir.base.template`). They
replace the base2 versions, so the language support never reaches the pages.

**Overrides that are byte-identical to base2.** They add nothing, because they're inherited anyway:
`css/jquery-ui.css`, `css/prism.css`, `css/pygments-manni.css`, all of `fonts/`, all of `ico/`,
`js/jquery.js`, `js/jquery-ui.min.js`, `js/window-hash.js`.

**Overrides that are unchanged base1 copies.** They hide the base2 versions, which are language-aware:
`js/tabs.js`, `includes/fragment-igTable.html`, `includes/fragment-pageTable.html`.
`fragment-resourceTable.html` is base1 plus 7 changed lines and has no `lang` handling (base2's version has 17 references to `lang`).

**What the page shell is missing from base2** (`fragment-pagebegin`, `fragment-pageend`, `template-page`, `template-page-md`):
- the `lang=include.lang` parameter isn't passed through, and `breadcrumbs.html lang="en"` is hard-coded
- `<html lang>` comes from `site.lang`, not `include.lang`; there's no `dir="rtl"` handling and no `direction-management.js`
- pages are looked up with `site.data.pages[page.path]`/`page.name` instead of `localPage`, and `.title` instead of `.titlelang[lang]`
- no translation notice box (`TRANS_HLP` / `NO_TRANS`)
- no language switcher (`fragment-language.html`, `flags.js`, `lang-redirects.js`)
- `fhir-menu.html` includes `menu.xml`, not `{{lang}}/menu.xml`
- `header_custom.html` uses `ig.title`, not `ig.titlelang[lang]`, and has a hard-coded "flag" alt text
- the `releaseLabellang` status logic is dropped (`{{status}}` is never assigned)
- `fragment-footer.html` replaces the hl7.be version; check whether that's intended

**Runtime JS/CSS that's likely redundant or conflicting:**
- `bootstrap.min.js`: the Bootstrap navbar is gone, since jtd's sidebar replaces it. Check whether anything else (tabs, collapses) still needs it.
- `respond.min.js` / `html5shiv`: for IE8 only. Drop them.
- `anchor.min.js` + `anchor-hover.js` duplicate jtd's `anchor_headings.html`. Keep one.
- `clipboard.min.js` + `clipboard-btn.js` vs jtd's `code_copy.html`. Keep one.
- Mermaid: jtd's `mermaid.html` loads from a CDN, while base2 ships `mermaid.js` + `mermaid-init.js`. Keep the local base2 one (no CDN).
- Prism: the local pagebegin dropped `prism.js` / `prism-fhirpath.js` / `prism-cql.js`. That's a likely regression in syntax highlighting.
- `bootstrap-fhir.css` is heavily customised (about 10k changed lines) and loaded next to jtd's CSS. Reduce it to the rules FHIR-generated content actually needs (tables, tabs, glyphicons).
- `fhir-menu.html` puts about 300 lines of inline `!important` CSS on every page. Move it into `_sass/custom`.
- The JS heading numbering in `template-page.html` replaces base2's CSS counters. Keep it, but check that it works in RTL.

**jtd parts that appear unused** (to be confirmed in step 1):
- layouts `about`, `home`, `minimal`, `page`, `post`, `table_wrappers`, `vendor/compress`, and probably `default`, since the publisher renders pages through `template-page*.html`
- includes `footer-content.html`, `children*.html`, `pages.html`, `sorted.html` (jtd page nav is disabled in `site_nav.html`), the empty `custom-data.json`, and the GA block in `head.html`

**Repo housekeeping:**
- `rename_unused_files.js` points at `c:\work\...\template2`. It's an earlier version of step 1. Reuse its approach, then remove it.
- `ml-template/` (a copy of base2) is deleted in the working tree but not committed.

## Steps

1. **Baseline.** Build the IG as it is now. Record the `<script>`/`<link>` references in `output/**/*.html`
   and the console errors per page type (index, page, profile, valueset, codesystem, example, artifacts).
   Save screenshots for visual comparison. Keep this output as `output_old`.
2. **Duplicates.** Delete the byte-identical overrides. Rebuild; the output must not change.
3. **Unused jtd parts.** Rename candidates (same idea as `rename_unused_files.js`), rebuild and diff
   against the baseline. Delete whatever has no effect.
4. **Runtime trim.** For each item in the redundant list: remove it or choose one of the pair, rebuild, check
   in Firefox (tabs, tree tables, copy buttons, mermaid, code highlighting, search, dark mode).
5. **Re-fork the shell from base2.** Start from the current base2 `fragment-pagebegin`/`pageend`/
   `template-page`/`template-page-md` and wrap the jtd structure around them, keeping every base2
   construct (`lang`, `dir`, `localPage`, translation box, language switcher, `{{lang}}/menu.xml`,
   status, jurisdictions). Remove the stale `igTable`/`pageTable`/`tabs.js` overrides so the base2 versions are inherited.
   Rebase `resourceTable` (and any other override that is still needed) onto base2 and keep its 7-line change.
   Thread `lang` through `breadcrumbs`, `page-nav`, `header_custom`, `fhir-menu`, `sidebar`/`title`.
6. **Multilingual test.** Add `pt`, `es`, `fr`, `nl`, `ar` to the test IG (`sushi-config.yaml` and
   `translations/`). Check the language switcher, translation notice, menus and RTL sidebar placement (`ar`)
   on each language. Search: one shared index, best effort.
7. **Upstream safeguard.** Add a small `BASE2-SYNC.md` that lists each override and the base2 version it was
   forked from, plus a script that diffs that base2 version against `fhir2.base.template#current`.
   Run it whenever base2 changes.
8. Branch off `v2`, one commit per step, and open a draft PR after review.

## Baseline (step 1, 2026-10-23, branch `base2-cleanup`, publisher 3.0.1, base `fhir2.base.template#current`)

- Build OK: 2 errors, 57 warnings, 512 broken links. The output before the base switch was kept as `output_old/`.
- base2 layout: the real pages are in `output/en/`. The root `*.html` files are 562-byte `lang-redirects.js` stubs.
- 22 pages under `en/` use the jtd shell. `en/searchform.html` (from base2 `content/`) uses the base2 shell and references
  `assets/css/fhir-ig.css`, which doesn't exist. Decide: restyle it, or drop it (jtd has its own search).
- Assets on every jtd page: `fhir.css`, `bootstrap-fhir.css`, `project.css`, `pygments-manni.css`, `jquery-ui.css`,
  `prism.css`, `just-the-docs-default.css`, `just-the-docs-head-nav.css`, `lunr.min.js`, `just-the-docs.js`,
  `fhir-table-scripts.js`, `jquery.js`, `jquery-ui.min.js`, `flags.js`, `window-hash.js`, `requirements-table.js`,
  `bootstrap.min.js`, `respond.min.js`, `anchor.min.js`, `clipboard.min.js`, `clipboard-btn.js`, `anchor-hover.js`,
  and `lang-redirects.js` (at the root). `tabs.js` is on 10 pages; the DataTables/artifacts-table assets only on `artifacts.html`.
- Not loaded anywhere: `prism.js` / `prism-fhirpath.js` / `prism-cql.js` (`prism.css` without the JS), and Mermaid
  (`site.mermaid` is unset, so `diagrams.html` doesn't render Mermaid). `direction-management.js` isn't loaded either.
- Broken links / errors: almost all come from the test IG's `input/includes/menu.xml` (links to ig-guidance pages
  that don't exist here, and `href='#'` on dropdowns). That's test content, not the template; fix it in step 6.
- Heading numbering and page titles were empty: base2 renders pages at `en/<page>`, so `site.data.pages[page.path]`
  found nothing. Fixed by using `localPage` (the last path segment), as base2 does.
- `.index.json` / `.index.db` files under `local-template/` are empty publisher cache files committed to git.
  Remove them and add them to `.gitignore` in a separate cleanup commit.
- Possible base2 (upstream) issues, seen in base2 itself, not caused by this template:
  - Pages the publisher generates from layouts (`-examples`, `.profile.history`, `.change.history`) aren't in
    `pages.json`, so `<title>` is empty (" - IG title vX"). Search falls back to the page's first heading.
  - The heading on `ValueSet-*.change.history.html` lacks the ValueSet name ("ValueSet:  - Change History").
- Copy of the output for comparison: scratchpad `baseline/`, inventory in `inventory-baseline.txt`
  (`node inventory.js output` regenerates it). Headless Firefox screenshots fail on this machine, so visual checks are done by hand in Firefox.

## Decisions (2026-10-23)

1. Base: `fhir2.base.template` directly. Done in `package.json`. The hl7.be layer is dropped, along with its
   Questionnaire (lforms) and ExampleScenario layouts, BE CSS/logos and `fragment-search.html`.
   The package is still named `hl7.fhir.be.my.template` with an hl7belgium author; rename later if wanted.
2. `ml-template/`: restored from git and kept for reference.
3. Test languages: `en` (default) + `pt`, `es`, `fr`, `nl`, `ar` (RTL).
4. Search: one shared index. Low priority; keep it if it's not much trouble, otherwise disable it.
