---
title: Steeplejack
intro: A website audit for agencies and freelancers. More than 40 checks across speed, accessibility, security, search and AI discoverability, in about a minute.
link: https://steeplejack.mikestreety.co.uk/
established: 2026
featured: 2
tags:
 - Security
 - Laravel
---

Steeplejack surveys a website from the outside. It runs **Lighthouse**, **axe-core** and its own checks in one go, then explains every result in plain English, ordered by what to fix first.

You could run most of these free tools yourself, but Steeplejack puts them in one report and says where each result came from.

### What it checks

- **Email spoofing** - could someone send a fake invoice from this domain? SPF, DKIM, DMARC and MTA-STS, read together
- **Security** - certificates, security headers, mixed content, security.txt and when the domain expires
- **Search** - stray noindex tags, canonicals, titles, sitemap errors, broken links and real-visitor speed
- **AI discoverability** - whether AI search crawlers actually get through, not just what robots.txt says
- **Accessibility** - automated WCAG checks and colour contrast, with a clear note of what automated tools miss
- **Performance** - Core Web Vitals, page weight, third-party trackers and a carbon estimate

### Who it's for

It's built for people who look after websites: survey a prospect's site before you quote, catch a stray noindex tag or broken share image before launch, or survey again after a round of work and show the client what changed. Many fixes include specific notes for **TYPO3** and **WordPress**.

### What it won't pretend to do

It isn't a penetration test - a free survey only looks from the outside and sends no attack traffic. It isn't an accessibility audit either, as automated tools find roughly a third of accessibility problems. If a site blocks the scanner, the report says so rather than guessing.

### How it's built

The site is a **Laravel** app, and the scanner is **TypeScript** driving **Playwright** and Lighthouse. The scanner makes no LLM calls. The free survey covers the homepage, while Pro (free during the beta) covers the top 10 pages and adds software and vulnerability checks.
