---
title: Rolling out a self-hosted Infisical
date: 2026-10-27
intro: A couple of months on from comparing Bitwarden Secrets Manager with Infisical, here's how the rollout actually went
tags:
  - Command Line
---

Back in July I [compared Bitwarden Secrets Manager to Infisical](/blog/comparing-bitwarden-secrets-manager-to-infisical/). Since then we've been running a self-hosted version of Infisical which, after a bit of setup, has been quietly providing our secrets ever since.

Before committing to anything, we had a couple of requirements for whatever secrets manager we picked:

- It shouldn't add mountains of setup or extra commands for our developers
- Client servers shouldn't need anything installing for us to use it

Infisical ticked both boxes. Locally, it's one extra word in front of a command developers already run, and for production, GitLab CI generates the `.env` file and drops it on the server, so there's nothing for the client's server to install or know about.

## Using Infisical

Each project has a `.infisical.yaml` (or `.infisical.json`) file containing the Infisical project ID it's associated with.

To start DDEV with the secrets loaded, our developers run:

```bash
infisical run -- ddev start
```

In the config file we set `dev` as the default environment, so nobody accidentally ends up with production values on their laptop.

On the CI side, we [export the secrets as JSON](https://github.com/liquidlight/deployer-typo3-ci/blob/main/deployer/tasks/secrets_infisical.php#L26) rather than `env` format, which saves a lot of headaches with secrets containing special characters.

## Self-hosting vs SaaS

We went self-hosted mostly on cost. Their cheapest paid tier is $20 per identity per month beyond the free 5, so even just our 7 developers would be $140 a month. The server costs us $8, which makes it a saving of (at least) $132 a month.

The thing to watch with their pricing is that machine identities count too. Following best practice, we have a machine identity per project, which would have put us at $1,160 a month had we used the same setup on their SaaS. For a company built around security, that's a pricing model that nudges people towards sharing logins and using one identity for everything to keep costs down, which feels like exactly the wrong incentive.

The self-hosted "free" tier is effectively the same as their [SaaS offering](https://infisical.com/pricing), just without the cap on identities.

## Server notes

Self-hosting a secrets manager is a risky business - if that box gets compromised, so does everything. I'm not a security specialist, so I leaned on Google (and sense-checked my choices against a few different LLMs) to make sure the server is as locked down as I can make it.

Infisical runs with Docker Compose on a bare Debian 13 VPS. I picked Docker Compose over the native `.deb` package mostly because it fits how we run everything else, and Renovate can open merge requests when a new image is released.

A few decisions I made early on:

- **No open ports**: The domain was already on Cloudflare, so the server sits behind a Cloudflare Tunnel (`cloudflared`) rather than exposing 80 and 443.
- **No SSH**: Once everything was set up, SSH was turned off for everyone. If I need to get on the box, I open the port via the hosting console and allow only my IP address.
- **You can't have too many backups**: The host backs up as often as it allows - you can never be too careful.
- **Powered by Ansible**: The whole server can be predictably recreated. If it fails or is compromised, I can shut it down straight away and spin up a fresh one from a backup.

## Structuring the secrets

This is the bit I'd spend the most time on if you're starting out, because changing your mind later means re-scoping every access policy.

### Internal servers

Our internal servers (GitLab, the CI runners, Packeton etc.) are configured with Ansible and pull their secrets from Infisical. They all live in one project, organised by folder:

```
/shared
/servers/gitlab
/servers/gitlab-ci
/servers/packeton
...
```

Anything used by more than one server goes in `/shared`, so there's only ever one copy to rotate. Each server gets its own machine identity, which can read `/shared/**` and its own `/servers/<name>/**` and nothing else. The folder names match the Ansible inventory hostnames, which keeps the Ansible side nice and boring.

### Client sites

Each client is its own Infisical project, with one machine identity per client for CI. The production `.env` is generated in GitLab CI and written straight onto the server, so a local copy never exists. It ends up as a plain `.env`, permissions `600`, owned by the deploy user.

We deploy with [Deployer](https://deployer.org/), but I deliberately kept the Infisical login and export logic in the GitLab CI config rather than the Deployer recipe. That way the recipe stays reusable with a different Infisical instance (or without Infisical at all).

## Sharing secrets across environments

Best practice says you should have separate production and development secrets and, most of the time, we do. There are a few exceptions, though - a Google Maps API key, for example, is restricted by domain in the Google Cloud console, so it's safe to use the same key everywhere.

Rather than copying the value into each environment (and risking them drifting out of sync), Infisical lets you reference a secret from another environment. Once the key is added to production (e.g. `GOOGLE_MAPS_API`), you can reference it from the development environment:

```
${prod.GOOGLE_MAPS_API}
```

That pulls the value straight from `prod`, giving you a single source of truth. The documentation has [more detail and examples](https://infisical.com/docs/documentation/platform/secret-reference), including referencing secrets inside folders. Make sure each user that needs this has the correct permissions as that can catch you out.

## Tokens and OIDC

We started out using Token Auth for the CI machine identities. The catch is that tokens max out at 90 days, which would mean rotating a token for every client project every quarter. There wasn't an easy, programmatic way to do that without leaving a read/write token lying around globally somewhere - which rather defeats the point.

Instead, we migrated to [OIDC](https://infisical.com/docs/documentation/platform/identities/oidc-auth/general). It integrates nicely with GitLab: each CI job gets a short-lived token from GitLab itself, and Infisical trusts that, so there's nothing to expire or rotate.

Our GitLab CI deployment job looks like the following (some config removed for brevity)

```yaml
deploy:
  id_tokens:
    GITLAB_OIDC_TOKEN:
      aud: ${INFISICAL_HOST}
  image:
    # Has infisical preinstalled
    name: ghcr.io/liquidlight/deployer-infisical:v7
  before_script:
    - |
      # OIDC login
      if { [ -f .infisical.json ] || [ -f .infisical.yaml ]; } && [ -n "${INFISICAL_IDENTITY_ID}" ]; then
        INFISICAL_TOKEN=$(infisical login --method=oidc-auth --machine-identity-id="${INFISICAL_IDENTITY_ID}" --jwt="${GITLAB_OIDC_TOKEN}" --domain=${INFISICAL_HOST} --silent --plain)
        export INFISICAL_TOKEN
        echo "Logged in to Infisical as identity ${INFISICAL_IDENTITY_ID} (${CI_PROJECT_PATH} @ ${CI_COMMIT_REF_NAME})"
      fi
  script:
    - ...
```

For the above you need the following CI variables configured:

- `INFISICAL_HOST`: The URL to your Infisical instance
- `INFISICAL_IDENTITY_ID`: The machine identity ID

There's no token to store: the `id_tokens` block asks GitLab to mint a short-lived JWT for each job, which Infisical verifies against your GitLab instance. Infisical's [GitLab OIDC guide](https://infisical.com/docs/documentation/platform/identities/oidc-auth/gitlab) covers setting up the machine identity side - just make sure you bind it to the project so other repos can't authenticate as it.

## Summary

Infisical has been great. Once the initial server setup was out of the way, it slotted into our process without anyone really noticing, which is about the highest praise I can give a bit of infrastructure.

It's a shame the pricing is structured the way it is. I don't begrudge them charging for their product, but it would be nice to see a plan aimed at small agencies. I am, however, very thankful they allow self-hosting.

If you've been running Infisical (self-hosted or otherwise) I'd [love to hear](/contact/) any tips and tricks.
