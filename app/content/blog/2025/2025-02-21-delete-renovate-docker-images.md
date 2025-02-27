---
title: Delete Docker images from a certain vendor
intro: A command to delete Docker images from a specific vendor which, in this case, is Renovate
tags:
 - Renovate
 - Docker
 - Bash
---

Using [Renovate](https://github.com/renovatebot/renovate) to update your dependencies is a great way of automating upgrades. However, using the Docker image can quickly fill up your CI server or machine.

With their rapid release schedule, a day can see several new versions appearing. We have Renovate running every 2 hours which, as Renovate updates itself, could see 6 new Docker images downloaded a day (Renovate make the version upgrade one run and then merges it the next).

As we have NPM, Composer, Docker and Gitlab CI dependencies updated by Renovate, we find outselves [using the `-full` image](https://hub.docker.com/r/renovate/renovate/tags?name=-full) which, uncompressed, is over 6GB.

Becuase of that, we now have the following command running weekly:

```bash
docker rmi `docker image ls | egrep "^renovate/" | awk '{print$3}'`
```

This finds all the images that start with renovate and deletes them. When Renovate next runs, it will pull down the image it needs.