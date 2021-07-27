---
title: Build and release Composer packages using a self-hosted Gitlab
intro: When developing with Composer, you may wish to create private packages and host them with Gitlab
date: 2021-09-06
permalink: "blog/build-and-release-composer-packages-using-a-self-hosted-gitlab/"
tags:
 - Gitlab
 - Composer
---

When building with Composer, it is great to be able to develop and maintain packages and libraries of your own. However it is not always possible or desirable to publish your code to [Packagist](https://packagist.org/).

Instead, you can use your self-hosted Gitlab to host your packages. This will allow you to include either the branches you set or tagged releases of your code.

The concept is using the Gitlab API to publish your package, which can be done with the following command:

```bash
curl --data tag=<tag> "<gitlab url>/api/v4/projects/$CI_PROJECT_ID/packages/composer"
```

You _can_ do this manually, however it is more efficient (and less boring for you) to do it via Gitlab CI. This code assumes you are at least familiar with the concept of CI.

The following uses a basic `curl` image - if you require your CI to perform operations, make sure you use the correct image.

Create a `.gitlab-ci.yml` and use the code below as a base. It features two steps in the `Release` stage, however one only activates on a new tag and the other on a new commit on the `main` branch. The allows you to either include the tag in your local `composer.json` or `dev-main` to get the latest code.

Make sure you have Packages enabled on the repository.

```yml
###
# Gitlab CI
#
# @author Mike Street
# @date 01-2021
#
###

stages:
  - Release

# Use custom LL docker image
image: curlimages/curl:latest

release:tag:
  stage: Release
  script:
    - 'curl --header "Job-Token: $CI_JOB_TOKEN" --data tag=$CI_COMMIT_TAG "<gitlab url>api/v4/projects/$CI_PROJECT_ID/packages/composer"'
  only:
    - tags

release:branch:
  stage: Release
  script:
    - 'curl --header "Job-Token: $CI_JOB_TOKEN" --data branch=$CI_COMMIT_BRANCH "<gitlab url>api/v4/projects/$CI_PROJECT_ID/packages/composer"'
  only:
    - main
```
