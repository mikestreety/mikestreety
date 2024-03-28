---
title: Build and push a Docker image to a private registry with Gitlab CI
date: 2022-11-11
intro: Gitlab can host your Docker images with the container registry, this blog post walks through building and pushing your image
permalink: blog/build-and-push-a-docker-image-to-a-private-registry-with-gitlab-ci/
tags:
  - Gitlab CI
  - Gitlab
  - Docker
---

Being able to create and host private Docker images for use in your team is a great way of speeding up development processes without having to publicly share your code. For example. at [Liquid Light](https://www.liquidlight.co.uk/) we have a Docker image with a private NPM token embedded for deployment of our packages.

In this post we'll build and push our Docker image to a private registry using Gitlab CI.


## Create your Dockerfile

First thing you'll need is a Dockerfile, I won't go into too much depth here as each Docker image will have a different purpose. As an example, we could have a Docker image that is a copy of the [latest Debain](https://hub.docker.com/_/debian) image bit with Git installed

```dockerfile
FROM debian:latest

RUN apt install git
```

Create a `Dockerfile` in a new repository and set your commands

## Build locally

Before pushing to Gitlab, make sure you can build your image locally

```bash
docker build .
```

This might give it a random generated name, but will at least tell you if your Dockerfile is correct

## Create a Gitlab file

Next to your Dockerfile, create a `.gitlab-ci.yml` file - this is going to run on Gitlab to build your Docker image

```yaml
image: docker:19.03

stages:
  - build

variables:
  DOCKER_TLS_CERTDIR: "/certs"

services:
  - docker:19.03.13-dind

before_script:
  - echo "$DOCKER_REGISTRY_PASS" | docker login $DOCKER_REGISTRY --username $DOCKER_REGISTRY_USER --password-stdin

build:
  stage: build
  script:
    - >
      docker build
      --no-cache
      --tag $DOCKER_IMAGE_NAME:latest
      .
    - docker push $DOCKER_IMAGE_NAME:latest
```

This yaml does the following:

- Uses a docker image and enables the `dind` (Docker in Docker) service - this allows Docker to build Docker
- Before the script starts, it logs into your Docker registry
- Lastly, in the `build` stage, it builds your Docker image and pushes it to the registry.

There are a few variables you need set up in your `CI/CD` config

- `$DOCKER_REGISTRY` - the URL to your Docker registry
- `$DOCKER_REGISTRY_USER` - The username to login to your private Docker registry
- `$DOCKER_REGISTRY_PASS` - The password to login to your private Docker registry
- `$DOCKER_IMAGE_NAME` - The full name of your Docker image (if you have enabled and are using the [Gitlab container registry](https://docs.gitlab.com/ee/administration/packages/container_registry.html#enable-the-container-registry), you can replace this with `$CI_REGISTRY_IMAGE` which contains the full image name/path you want)
