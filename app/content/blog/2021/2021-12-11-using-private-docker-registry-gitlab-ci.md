---
title: Using a private Docker registry with Gitlab CI
intro: You may wish to use your own private registry when building Docker images in a Gitlab CI pipeline - this blog shows how to access your private registry
date: 2021-12-11
permalink: "blog/using-private-docker-registry-gitlab-ci/"
tags:
 - Gitlab
 - Docker
 - Gitlab CI
---

Whether you are using it for running the CI pipelines or need to build a Docker image with it as the base, there may be times you wish to use a Docker image or two from a private Docker registry.

When using it on your computer, you would probably access it with a `docker login` - however this is impossible to do when using the `image:` in the `.gitlab-ci.yml` file.

To get round this, you can specify a `DOCKER_AUTH_CONFIG` CI Variable containing encoded login credentials. You can then use this to `docker login` within the Pipeline to build an image `FROM` a private registry.

<div class="info"><strong>Note:</strong> This blog post assumes you have knowledge in Gitlab CI/CD and an understanding of Docker</div>

In the steps below, replace `registry.private.com` with the URL to your private Docker registry

1. If your registry is hosted on Gitlab: Generate a Gitlab Access Token (on the instance where the registry is) which, as a minimum, has `read_registry` access (if you need to build and push you will also need `write_registry`).
2. Make a note of your token and, on your local machine, check it works with `docker login registry.private.com -u [username] -p [password/token]`
3. Once verified, generate a base64 encoding of your username and password: `echo -n "my_username:my_password" | base64` - make a note of the result
4. In the Gitlab instance you wish to use your private registry from, make a new CI/CD variable of type 'File' called `DOCKER_AUTH_CONFIG` - in it, paste the following (replacing both the registry URL and base64 output):
```json
{
    "auths": {
        "registry.private.com": {
            "auth": "[base64 output]"
        }
    }
}
```
5. You can now use `image: registry.private.com/path/to/image` in your `.gitlab-ci.yaml` files
6. If you are building another docker image that relies on your private registry you can login using the same credentials stored in the variable. Add the following to your `.gitlab-ci.yml` file before you build the image
```yaml
- echo "${DOCKER_AUTH_CONFIG}" > ~/.docker/config.json
- docker login registry.private.com
```
