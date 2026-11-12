# Xylum Foundation Website

The official website for the Xylum Foundation, built with vanilla HTML, CSS, and JavaScript.

## Overview

This repository contains the source code for the Xylum Foundation's landing page, project hubs, documentation, and release notes. It is designed to be lightweight, fast, and dependency-free.

## Architecture

- **Vanilla HTML/CSS/JS:** No frameworks, no build steps.
- **Web Components:** Used for the Header and Footer (`components/Header.js`, `components/Footer.js`).
- **Vercel Hosting:** Configured with `cleanUrls` for clean, extension-less URLs (e.g., `/about` instead of `/about.html`).

## Structure

```text
/
├── index.html              # Homepage
├── projects.html           # Project listing
├── documentation.html      # Documentation hub
├── releases.html           # Releases hub
├── about.html              # Foundation overview
├── /about/                 # Deep dives into projects
├── /documentation/         # Technical docs for projects
├── /releases/              # Changelogs for projects
├── /components/            # JS Web Components (Header, Footer)
├── /styles/                # Main CSS file
├── /icons/                 # SVGs
├── vercel.json             # Vercel configuration (clean URLs)
├── robots.txt              # SEO crawl rules
└── sitemap.xml             # SEO sitemap
```

## Run

Since this is a static site, you can serve it locally using any HTTP server. For example, using Python:

```Bash
# In the root of the repository
python3 -m http.server 8000
```