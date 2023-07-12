---
title: Docker image with Node, PHP and Composer
date: 2023-07-12
intro: Using Alpine, you can build a lightweight Docker image which contains all the tech you need to deploy your LAMP stack
permalink: "blog/docker-image-wth-node-php-and-composer/"
tags:
 - Docker
 - Node
 - Composer
 - PHP
---

Website deployment strategies are tricky things to get into. There are _so many_ ways and means of deploying your application to the web that it is hard to pick one. That's why, when you find one you like, you just need to stick with it and tweak it, rather than trying to re-invent the wheel.

Our TYPO3 websites are deployed using [PHP Deployer](https://deployer.org/) - I wrote a blog post about [deploying a Lumen app](https://www.mikestreety.co.uk/blog/automatically-deploying-your-lumen-app-with-php-deployer-and-zero-downtime-so-you-dont-have-to-manually-do-it/) with it a couple of years ago.

Instead of deploying via local command line, we use Gitlab CI to do the heavy lifting and ensure a single source of truth for our deployments. Because of this, we need a Docker image which contains the tech we need to build and deploy our application. Our websites are built on TYPO3, which use PHP and MySQL and composer as a dependency manager. Our front-end assets are built with Gulp which uses NPM as a dependency manager.

So we need an image with

- PHP
- Composer
- NPM

MySQL isn't required as the application, when building, doesn't actually _run_ or need a database.

Our original image used `bullseye` as a base image, but when everything was installed it came out at just over 500mb. The new one (below) is built on `alpine`, which is a linux OS specifically designed for containers and comes in at around 130mb.

## The Dockerfile

```dockerfile
# Global Arguments
ARG PHP_VERSION

# Set component images
FROM composer:2 as COMPOSER

# Create base image
FROM php:$PHP_VERSION-cli-alpine3.16

# Copy artifacts from component images
COPY --from=COMPOSER /usr/bin/composer /usr/bin/composer

# Install dependencies
RUN apk add \
	--update \
	--no-cache \
	# Deployment
	bash \
	git \
	rsync \
	# Front-end tools
	nodejs \
	npm \
	# Tools for imagemin
	autoconf \
	automake \
	g++ \
	openssh \
	libc6-compat \
	libjpeg-turbo-dev \
	libpng-dev \
	make \
	nasm

ENTRYPOINT ["/bin/sh", "-c"]
```

Once I had culled the dependencies to what we need, the resulting file ended up quite tidy. There are some dependencies in there for `gulp-imagemin` which, if you don't use, you can remove to make it even smaller.

The only variable this `dockerfile` takes is `PHP_VERSION` so you can build images based on what PHP version you would like.

## Gitlab CI Image Building

The CI pipeline which builds the image looks like the following (yes, I know 7.4 is deprecated, but we need it for legacy reasons 😉)

```yaml
image: docker:20.10.24

stages:
  - build

services:
  - docker:20.10.24-dind

.build:
  stage: build
  interruptible: true
  variables:
    COMPOSER_VERSION: "2"
    DOCKER_TLS_CERTDIR: "/certs"
    DOCKER_BUILDKIT: 1
  before_script:
    - echo "$DOCKER_REGISTRY_PASS" | docker login $DOCKER_REGISTRY --username $DOCKER_REGISTRY_USER --password-stdin
  script:
    - >
      docker build
      --tag $CI_REGISTRY_IMAGE:php${PHP_VERSION}
      --build-arg PHP_VERSION=${PHP_VERSION}
      .
    - docker push $CI_REGISTRY_IMAGE:php${PHP_VERSION}

build:7.4:
  extends:
    - .build
  variables:
    PHP_VERSION: "7.4"

build:8.0:
  extends:
    - .build
  variables:
    PHP_VERSION: "8.0"

build:8.1:
  extends:
    - .build
  variables:
    PHP_VERSION: "8.1"

build:8.2:
  extends:
    - .build
  variables:
    PHP_VERSION: "8.2"
```

This then builds 4 different images based on PHP version.
