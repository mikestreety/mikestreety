---
layout: page.njk
title: "About Mike Street"
permalink: /about/
eleventyNavigation:
  key: About
  order: 4
---

# About Mike Street

I am a process driven fullstack developer who specialises in **PHP**, **MySQL**, **(S)CSS**, **JavaScript** & **jQuery** (yes, it's still a thing), **CI/CD** and **DevOps**. I enjoy find better, faster, more efficient ways of doings things and am driven by automating as much as possible. From code minification to spreadsheets, I geek out on making things work.

## A brief history

I am currently a CTO & Lead Developer for [Liquid Light](https://www.liquidlight.co.uk/); a web agency based on the South Coast of the UK and have worked there since 2014. Starting as a front-end developer, I worked my way up to Director level and leading the development team. Before then, I started work at [Bozboz](https://www.bozboz.co.uk/) in 2008 as a work experience kid before taking a part-time job there. Over several years I was promoted to Senior Frontend Developer - working with the Systems Administrator and Senior Backend developer to push the development team forward.

In every role, I look for optimisations and performance enhancements, and not just in our websites.

## A long history

### Bozboz

When starting at **Bozboz**, they wrote plain CSS and used Dreamweaver - editing files over FTP without any source control. Within a few years, I had implemented using [**Less**](/category/less/) to write better CSS, which quickly moved onto [**SCSS**](/category/scss/). With the introduction of SCSS, I moved the front-end stack onto [**Gulp**](/category/gulp/) to help us optimise CSS, JS and Images. I then prototyped a **development environment** - where each developer had a local server to run local versions of the websites using **Linux** and Webmin. The initial process of this is outlined in [Setting up a local development server](/blog/setting-up-a-local-development-server/). Naturally, this process fed into setting up [**Git**](/category/git/) and centrally hosting our repositories on **Gitlab**. I also helped develop a custom CLI for deploying, cloning, migrating and creating development and live websites. Alongside the front-end improvements, I was also [learning **PHP**](/category/php/) and improving my **SysAdmin** skills.

Outside of the development processes, I encouraged the company to swap from Skype to **Slack** for more asynchronous communication, I built a user-friendly time logging interface and allowed **Trello** (another tool I introduced) to be updated via commit messages.

When I started at Bozboz there were 9 employees, when I moved on 4.5 years later, there were 35. I am by no means saying my processes and optimisations were the reason for this growth, but they allowed the development team to scale from the two others and me when I joined to the 8 people that worked there when I left.

### Liquid Light

In 2014 I moved to Liquid Light as a Frontend developer and it felt like taking a few steps back. Fortunately, I was able to learn from my implementations at Bozboz and quickly help get Slack, Trello, Git and Gitlab in place, while developing a new front-end pipeline using Gulp, SCSS and all the other goodies included.

Once I was at a comfortable baseline, I could start exploring and pushing forward. My first task was to create an [**SVG** sprite workflow](/blog/working-with-svgs-in-sprites/) which was iterated and folded into the [**Gulp** pipeline](/blog/creating-svg-sprites-using-gulp-and-sass/). I also created a [SCSS Typography framework](/blog/responsive-typography-in-scss/) and created my first [**Vue** web application](/blog/building-a-vue-v2-js-app-using-vue-router/) for an internal tool.

I started looking into [**Gitlab CI**](/category/gitlab-ci/) - after a previous developer had got the groundwork setup, I picked it up and expanding the initial PHP Lint into a suite of **linting** tools available as CI tools as well as being able to run locally so you don't have to wait for your work to be pushed to Gitlab to confirm the conventions. We now run **[PHP Coding Standards Fixer](https://cs.symfony.com/)**, **[ESLint](https://eslint.org/)** and **[Stylelint](https://stylelint.io/)** to ensure our code stays up-to-date with out conventions. Furthermore, I have implemented the use of **[editorconfig](https://editorconfig.org/)** t

With the progression of **[TYPO3](/category/typo3/)**, we needed to convert all of our projects to using **Composer**. I researched and [utilised our self-hosted **Gitlab**](/blog/build-and-release-composer-packages-using-a-self-hosted-gitlab/) to host our own private packages. Once completed I set out a workflow for our upgrade chain which includes converting to the use of **`.env` files** rather than committing secrets to the Git repositories.

To optimise our workflow further, I created a deployment workflow with **[PHP Deployer](/blog/automatically-deploying-your-lumen-app-with-php-deployer-and-zero-downtime-so-you-dont-have-to-manually-do-it/)** and integrated it into our Gitlab CI process.

For both the CI processes and a requirement for some of our clients, I created several **[Docker](/category/docker/)** images, fine-tuning and ensuring they are as lean and optimised as possible. Similar to the packages, I developed a CI pipeline which built and pushed the Docker images to the private, [Gitlab-hosted registry](/blog/deploying-a-docker-image-to-a-remote-private-registry-with-gitlab-ci/).

To keep packages and dependencies up-to-date, I set up **Renovate** to run regularly on our private Gitlab repositories.

### Side-projects

When not working, I like to keep busy with web-related side-projects.

When getting and using Vue.js, I was approached to [write a book](https://www.packtpub.com/product/vuejs-2x-by-example/9781788293464) on the subject. I've also written [copious amounts of blog posts](/diary/) on this very site.

Talking of this site, it has had many iterations, from **Wordpress** to **CraftCMS** to it's current version which is built with **11ty**.

In 2020 I [**interviewed 8 web-folk**](https://www.behindthesource.co.uk/interviews/) for a side-project called [Behind the Source](https://www.behindthesource.co.uk/). This was followed in 2022 by a [**Podcast**](https://www.behindthesource.co.uk/podcasts/), talking about tech for people who want to get into a specific topic. We spoke about **Svelte**, **Umbraco**, **jQuery**, **Design Systems**, **Gitpod** and **Coolify**.

I also featured on [Series 5](https://makelifeworkpodcast.com/tag/season-5/) of the **Make Life Work** podcast alongside Si and Sam, featured as an "[**On the Side**](http://ontheside.network/)" takeover.

I review beers and [post them online](https://alehouse.rocks/) to create a searchable, filterable and stat-gathering 11ty powered website. It uses **Cloudflare Workers** to convert Untappd reviews to **JSON**, this is then absorbed by a **Netlify function** to commit to the repository.
