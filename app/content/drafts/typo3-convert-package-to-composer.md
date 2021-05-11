Moving from global `ext` folder to composer.

- Git it up (`git init`)
- Create a gitignore

Include the composer lock as it is a library: http://getcomposer.org/doc/02-libraries.md#lock-file

```
.DS_Store
._*

### Composer ###
composer.phar
/vendor/
composer.lock
```

- Composer init (or use the example below as a template) - good tutorial herE: https://insight.helhum.io/post/148886148725/composerjson-specification-for-typo3-extensions
- Can use a lot of the details from emconf
- Create a gitlab ci

```
###
# Gitlab CI
#
# @author Mike Street
# @date 01-2021
#
# Utilises the custom Liquid Light linter
# https://gitlab.lldev.co.uk/devops/lint
#
###

stages:
  - Linting
  - Release

# Use custom LL docker image
image: ll:latest

# Lint the PHP
php:coding-standards:
  stage: Linting
  script:
    - lint php:coding-standards

release:tag:
  stage: Release
  script:
    - 'curl --header "Job-Token: $CI_JOB_TOKEN" --data tag=$CI_COMMIT_TAG "https://gitlab.lldev.co.uk/api/v4/projects/$CI_PROJECT_ID/packages/composer"'
  only:
    - tags

release:branch:
  stage: Release
  script:
    - 'curl --header "Job-Token: $CI_JOB_TOKEN" --data branch=$CI_COMMIT_BRANCH "https://gitlab.lldev.co.uk/api/v4/projects/$CI_PROJECT_ID/packages/composer"'
  only:
    - master
    - /^rc\/.*$/i
```
