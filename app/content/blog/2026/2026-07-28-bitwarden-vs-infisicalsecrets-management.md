---
title: Comparing Bitwarden Secrets Manager to Infisical
intro: Looking at secrets managers, this compares Bitwarden to Infisical
tags:
  - CLI
---

We've been reviewing our secret management process and have been evaluating tools to help with streamlining it.

Looking at our current services and platforms, we have narrowed it down to either Bitwarden or Infisical (more details below). This post discusses the differences and compares features.

We have a few specific requirements for our secret management tool; the main one being that the production site/application should not rely on it to run day-to-day.

<div class="info">Although we will discuss pricing at various points, most of the below was carried out on their free tiers</div>

## Overview

### Bitwarden Secrets Manager

[Bitwarden Secrets Manager](https://bitwarden.com/en-gb/products/secrets-manager/) is a service provided by the password management tool we use. If you don't use Bitwarden, I wouldn't expect you to be considering it. However, [1Password](https://1password.com/developers/secrets-management) and other password managers often offer a secret management service which, I suspect, acts in the same way.

### Infisical

[Infisical](https://infisical.com/) is a separate, dedicated, secret management platform.

## Sign up

Signing up for both is fairly straightforward. It's worth noting that they both offer US/EU hosting (it seems to be a very small option on the sign up page for both of them). Unfortunately, for both services, it doesn't seem like it is possible to migrate your data between instances - so make sure you pick the right one.

If you already use Bitwarden, adding on the Secrets Manager is a case of visiting your billing profile. One thing that wasn't clear was that you don't have to pay for every person in your company - you can select who has access to the secrets manager and only pay for them.

## Adding secrets

Infisical has the idea of projects and environments. Once you make a project, you can add a secret to an environment (one or many). You can then see which environments have which secrets and copy between (should you need to). When calling it, you can pass in an `--env` flag to get the different environment secrets.

Bitwarden is more of a flat structure - there is a project which has secrets. If you wish to have different "environments", then you would use multiple projects. This is managed by passing in the `project-id`.

Infisical has an interface which allows you to paste an existing `.env` file and import the secrets from there. With Bitwarden, you have to add them individually.

## Local Installation

Both Bitwarden and Infisical have a CLI to programmatically interact with secrets.

- [Installing Infisical](https://infisical.com/docs/cli/overview)
- [Installing Bitwarden Secrets Manager CLI](https://bitwarden.com/en-gb/help/secrets-manager-cli/)

From a MacOS perspective, the following was required:

### Infisical

```bash
brew install infisical/get-cli/infisical
infisical login
```

Infisical login is interactive and loads the browser for access.

For each project, you'll then need to run the following:

```bash
infisical init
```

This gives you an interactive prompt to select the organisation & project for the secrets - this creates a `.infisical.json` file which can be committed for other developers to take advantage of. This has several [configuration options](https://infisical.com/docs/cli/project-config) you can set.

### Bitwarden

```bash
curl https://bws.bitwarden.com/install | sh
bws config server-base https://vault.bitwarden.eu # if you chose the EU one
```

You then need to make a machine account and associate it with the projects to use.

Once done, you can set the auth token

```bash
export BWS_ACCESS_TOKEN=0.48c78342-1...Iq6Bow==
```

## Usage

### ddev

The first requirement is for local development - we use DDEV for our TYPO3 sites and both CLIs offer an out-of-the-box method of injecting the environment variables into the ddev container at runtime rather than leaving `.env` files lying around.

By adding an extra step, it is then a conscious decision to include the secrets, rather than them being there by default.

<div class="note">When using a secrets manager with ddev, you need to specify each variable in your `.ddev/config.yaml` file:</div>

```yaml
web_environment:
  - DB_PASSWORD=${DB_PASSWORD}
  - API_KEY=${API_KEY}
```

#### Infisical

Once you have your `.infisical.json` file, you can run

```bash
infisical run --env=dev -- ddev start
```

This can be shortened by setting `defaultEnvironment` and `gitBranchToEnvironmentMapping` in your JSON config.


#### Bitwarden

Bitwarden has no concept of storing the project locally, so it needs to be specified on launch. For example:

```bash
bws run --project-id 7b006643-89c1-4202-a5ca-90510f566030 -- ddev start
```

### Environment Files (`.env`)

The next requirement of ours was to build `.env` files for production. We want the projects to work whether our secrets management tool is online or not. For this, we need to export the secrets from the tool during the CI process.

#### Infisical

Infisical has a `.env` export for this very purpose:

```bash
infisical export --env=prod > .env
```

#### Bitwarden

Bitwarden too has a native `.env` export:

```bash
bws secret list 7b006643-89c1-4202-a5ca-90510f566030  -o env > .env
```

## Cost

At time of writing, for unlimited projects:

- Bitwarden is $6 per user per month (up to 20 machine accounts)
- Infisical is $20 per _identity_ per month (note: even machine accounts count as identities)

However, you can [self-host](https://infisical.com/docs/self-hosting/overview) Infisical for the cost of a small VPS (around $8 a month) - although you have the added "cost" of maintenance and updates (and security).

## A note on projects

With Infisical, the `.infisical.json` file is native - it keeps you and your teammates in sync on the project, and the environments can be switched with a `--env` flag.

With Bitwarden, the project ID needs to be stored somewhere, or accessed each time. This could be used as an extra security step but could lead to project secrets being injected into the wrong project. A minor issue in development but a major one if done on production.

## Conclusion

For now, we're still in discussions as to how we want to work and what we want. We are already in the Bitwarden ecosystem, but the features of Infisical are appealing.

Let me know if you've faced a similar decision and what you ended up with.
