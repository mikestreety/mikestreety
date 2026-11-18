---
title: Steeplejack
intro: A website audit tool aimed at freelancers, agencies and website owners. Audits include SEO, accessibility and security, plus plenty more.
link: https://steeplejack.mikestreety.co.uk/
established: 2026
featured: 2
tags:
 - Security
 - Laravel
---

Most of the tools for checking a website are free, but running them one by one and making sense of the results takes time. Steeplejack runs them in one go, adds checks of its own, and explains every result in plain English - ordered by what to fix first.

A survey takes about a minute and covers:

- **Email spoofing** - SPF, DKIM, DMARC and MTA-STS, read together
- **Security** - certificates, headers, mixed content and domain expiry
- **Search** - noindex tags, canonicals, sitemaps, broken links and real-visitor speed
- **AI discoverability** - whether AI crawlers actually get through, not just what robots.txt says
- **Accessibility** - automated WCAG checks, with a note of what automated tools miss
- **Performance** - Core Web Vitals, page weight, trackers and a carbon estimate

It's useful before quoting for a prospect's site, before a launch, or after a round of work to show a client what changed. It doesn't pretend to be a penetration test or an accessibility audit, and if a site blocks the scanner, the report says so rather than guessing.

### How it's built

The site is a **Laravel** app, and the scanner is **TypeScript** driving **Playwright** and **Lighthouse**. The free survey covers the homepage, while Pro covers the top 10 pages and adds software and vulnerability checks.
