---
title: Building and Pushing Docker images using Github Actions
date: 2023-09-07
intro: How you build a Docker image with Github actions and push to the Github Package registry
permalink: "blog/building-and-pushing-docker-images-using-github-actions/"
tags:
 - Github
 - Docker
---

We needed to build a Docker image via Github Actions and push to the Package repository to create a public, shareable image.

Add the following in a `.github/workflows` folder with a `.yml` extension. You'll also need to add the following secrets to the respoitory:

- `DOCKER_USERNAME` - the username whose token you will be using
- `DOCKER_TOKEN` -an access token with `write:packages` permission

Once you have pushed the package, you will need to go to the **Packages** tab on either the organisation and associate it with the repository. Once that is done, the package appears on the right-hand side of the repository list.

## Action YAML Example

This code was copied (and adapted) from the official [Github Docs](https://docs.github.com/en/actions/publishing-packages/publishing-docker-images) website.

I've added (but left commented out) and example of how to pass in a build argument too.

```yaml
name: Create and publish a Docker image

on:
  push:
    branches: ['main']

env:
  REGISTRY: ghcr.io
  REPO_NAME: ${{ github.repository }}
  IMAGE_TAG: latest

jobs:
  build-and-push-image:
    runs-on: ubuntu-latest

    permissions:
      contents: read
      packages: write

    steps:
	  # Hack to add an env variable built up of env variables
      - name: Set docker image env var
        run: |
          echo "IMAGE_NAME=${{ env.REGISTRY }}/${{ env.REPO_NAME }}:${{ env.IMAGE_TAG }}" >> $GITHUB_ENV

      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
           #build-args: |
             #"ARG_KEY=VALUE"
          push: true
          tags: ${{ env.IMAGE_NAME }}
```
