---
title: Speed up Docker builds in Gitlab CI
date: 2020-04-20
updated: 2020-07-07
intro: I reduced our Gitlab CI powered Docker build by 80% - taking it more than 15 minutes to around 3 minutes to build and push with these steps
---

Our Gitlab CI powered Docker build is now 500% faster (I think?) - taking it more than 15 minutes to around 3 minutes to build and push to a registry.

Unfortunately, there isn't one thing to copy and paste - this blog post is more a collection of concepts and steps I took to drop the build time. 15 minutes wasn't the end of the world, but I wanted to see how far I could take it.

<div class="note">This blog post features some pseudo Dockerfile & Gitlab CI yaml code - it might not be able to be copied but should give you some idea as to what was happening</div>

## Application Background

The application is a website which runs on TYPO3 - a composer-based open-source CMS and the client provided a Docker environment to host the website. I'm a big fan of Gitlab CI, so took the challenge to completely compile and build a Docker image via Gitlab, rather than building assets and installing dependencies locally (which I had done in the past).

The site also features NPM dependencies - nothing over the top, but our SCSS and Webpack JS is compiled using Gulp, along with optimising images and [building a sprite](https://www.liquidlight.co.uk/blog/creating-svg-sprites-using-gulp-and-sass/).

**Note:** I'll be using "website" and "application" interchangeably - they ultimately mean the same thing.

## Requirements

The build needed to:

- Clone the repository
- `composer install` - to get the backend dependencies
- `npm ci` - this is "clean install"
- `gulp compile` - this generates all the assets
- Copy the compiled assets into an apache-ready Docker container
- Push the container to the registry

## Docker multi-stage build

The first attempt at building the application was to use a [multi-stage Docker build](/blog/creating-a-multi-stage-docker-build-to-make-your-images-smaller/) (this is actually the project that was written for). This used a custom image which had NPM and Composer preloaded to install and compile the dependencies and the final assets we passed to the Web image for pushing.

The Docker file looked something like

```Dockerfile
FROM custom-node-and-composer-image as build

composer i
npm ci
gulp compile

FROM custom-web-app

COPY --from=build /app/dist /var/www/
```

With the Gitlab CI file having a script block like:

```yaml
script:
  - docker build -t registry:my-image .
  - docker push registry:my-image
```

This meant the Gitlab file was extremely lightweight, which was great as it meant you could compile the full Docker image locally, if required. It left Docker to do most of the heavy lifting which seemed to make the most sense
