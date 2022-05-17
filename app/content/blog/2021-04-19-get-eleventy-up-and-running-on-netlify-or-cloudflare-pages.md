---
title: Get your Eleventy Site into the real world using a hosting provider like Netlify or Git pages
date: 2021-04-19
updated: 2022-05-17
intro: There are plenty of ways to get your 11ty site live depending on preferences and skill set, this blog walks through a few of the popular ones including Gitlab pages, Vercel, Netlify and Cloudflare pages
permalink: "blog/get-eleventy-up-and-running-on-netlify-or-cloudflare-pages/"
tags:
 - DevOps
 - 11ty
 - Netlify
 - Github
 - Gitlab
 - Cloudflare
---

Eleventy (11ty) is a great entry point for getting a markdown or JSON content from files to a website. There are plenty of tutorials out in the world to get 11ty up and running in a development environment.

But once you are ready to get your website out into the public domain, what are the options and how do you go about it? There are a couple of free options (with paid extras), as well as self-hosting if that is your JAM (geddit? Because 11ty is JAMstack... No? I'll move on...)

There were 3 main contenders when I planned this post a few weeks ago, however a new arrival (Cloudflare pages) gives an extra bit of variance. For ease of access with low barriers of entry, I would recommend:

- [Self-hosted](#self-hosted)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [Github/Gitlab pages](#githubgitlab-pages)
- [Cloudflare Pages](#cloudflare-pages)

<a name="self-hosted"></a>

## Self-hosted

This is the most manual of the options, but gives you the most control over your website. It is also the only one that requires a domain name of sorts to access the final result (the other options give you a placeholder/branded domain name).

With 11ty, you can either generate the site in a one-off, or run a watcher, which recompiles on save.

When self-hosting, you should run the "compile" step of Eleventy and manually move the source files to your designated hosting.

```bash
npx @11ty/eleventy  --serve
```

This will compile your site into your `output` dir as specified in your `.eleventy.js`. You can transfer this directory to your hosting environment, be it via FTP, SCP/RSYNC or you can zip it up to transfer it.

The other option is to `git clone` or similar your source files and run the compile step on the server you are hosting it on - some shared hosting environments, however, might not let you install npm/node.

<a name="netlify"></a>

## Netlify

[Netlify](https://www.netlify.com/) is a fantastic hosting service that provides a fairly straightforward deployment pipeline, as long as you are comfortable with git (although if you're not, they offer alternatives).

To get your 11ty site onto Netlify with git:

1. Push your git repository to Github, Gitlab or Bitbucket
1. Sign up for a Netlify account
1. Click "New site from Git"
1. Connect to your git repository host & select the repository
1. Choose the branch you want to use for deployment
1. Enter the build command and publish directory
	- Build command is `npx @11ty/eleventy`
	- Publish directory is your `output` directory specified in your `.eleventy.js` file
1. Click "deploy site"

Netlify will take a few minutes to deploy your website but, once complete you are provided with a random `.netlify.app` URL to view your website. You can rename this or you can link a custom domain (even [using Cloudflare](/blog/setting-up-a-custom-domain-with-netlify-with-cloudflare-ssl/)).

If you don't want to/can't connect your git provider (or your 11ty site isn't in a git repo), Netlify offer a drag and drop interface (at the bottom of the "Sites" page). Run the 11ty compilation steps locally and upload the output directory.

Side note: This site, [Behind the Source](https://www.behindthesource.co.uk/) and [Hovélo](https://hovelo.co.uk/) are all hosted on Netlify.

<a name="vercel"></a>

## Vercel

[Vercel](https://vercel.com/) (formally Zeit) is very similar to Netlify in that you can deploy with a branch push from a git provider, so the instructions may seem very similar to above. The deployment is quick and entirely managed through the UI.

1. Push your git repository to Github, Gitlab or Bitbucket
2. Sign up for a Vercel account
3. Click "New project"
4. Connect to your git repository host & search for your repository by clicking "Import"
5. Select the team you wish to deploy this to (most likely it will be the personal account)
6. Set a name and choose a framework preset - this populates default commands for building the site and if you haven't changed any of the default 11ty settings you won't have to change anything otherwise, expand "Build and Output Settings" to tweak to your needs
7. Click "Deploy"

You can then watch the build and, once complete, you will be presented with a celebratory screen with a link to your website (which will be presented as a `vercel.app` domain). You can then navigate to the dashboard and tweak settings, including setting a custom domain for the site. Vercel themselves have a tutorial on [How to Use Cloudflare with Vercel](https://vercel.com/support/articles/using-cloudflare-with-vercel).

<a name="githubgitlab-pages"></a>

## Github/Gitlab pages

Gitlab and Github pages are another great way of hosting your website for free. It takes a bit more configuration than Netlify, but if your website data is hosted on one of these services, there might an argument to reduce the number of services required.

I'm not a Github user really, and haven't really investigated using Github pages so I won't attempt to muddle my way through a tutorial. [Lea Tortay](https://www.linkedin.com/pulse/eleventy-github-pages-lea-tortay/) has written a comprehensive tutorial on this topic.

For Git**lab** however, I have just experimented and been able to spin my site up in the space of 15 minutes (pray the lords for 11ty!).

<div class="warning">To get this working, the output directory <em>had</em> to be <code>public</code>.</div>

1. Ensure your git repository is on [gitlab.com](https://gitlab.com/) (this can be done with self-hosted instances too, but the following steps follow the provided Gitlab instance)
1. Add a new file to the root directory called `.gitlab-ci.yml`
1. Add the following contents
```yaml
image: node:latest

# This folder is cached between builds
# http://docs.gitlab.com/ee/ci/yaml/README.html#cache
cache:
  paths:
    - node_modules/

pages:
  script:
    - npm install
    - ./node_modules/.bin/eleventy
  artifacts:
    paths:
      - public
  only:
    - master
```
4. Enable CI/CD and Pages on your repository
5. Push your changes to Gitlab

CI/CD should fire and compile your pages, you website should then be available at `<username>.gitlab.io/path/to/repo`. You can add a custom domain in the Gitlab pages config if that is the route you choose to take.

<a name="cloudflare-pages"></a>

## Cloudflare Pages

[Cloudflare pages](https://pages.cloudflare.com/) are the new kids on the block and (at time of writing) in beta. Looking like a direct competitor to Netlify, it appeals to me as an avid Cloudflare user to keep everything in one place.

Currently they only support Github (but [Gitlab and other things](https://developers.cloudflare.com/pages/platform/known-issues) are planned), however the workflow should be very familiar.

1. Sign up to Cloudflare and ensure your git repository is on Github
1. Connect your Github account and select your repository
1. Give it a name and select the branch
1. Enter the build command (e.g. `npx @11ty/eleventy`) and your output directory
1. Click save and deploy

You'll get a `pages.dev` domain, but this can be replaced with a custom domain name if desired.

<div class="info">Cloudflare Pages now supports Gitlab! This very blog is using it</div>

- - -

And there we have it. 4 methods for getting your Eleventy site out into the wild. You have no excuse now!
