---
title: Rolling out a self-hosted Infisical
date: 2026-10-15
intro: A couple of months on from comparing Bitwarden Secrets Manager with Infisical, here's how the rollout actually went
tags:
  - CLI
---

Back in July I [compared Bitwarden Secrets Manager to Infisical](/blog/comparing-bitwarden-secrets-manager-to-infisical/). We went with Infisical, self-hosted, and it's now holding the secrets for our internal servers and a growing number of client sites.

This post covers how we set it up, how we structured it and the things that caught me out along the way.

## The server

Infisical runs with Docker Compose on a bare Debian 13 VPS at `vault.liquidlight.co.uk`. I went for Docker Compose over the native `.deb` package mostly because it fits how we run everything else, and Renovate can open merge requests when a new image comes out.

A few decisions I made early on:

- **No open ports.** The domain was already on Cloudflare, so the server sits behind a Cloudflare Tunnel (`cloudflared`) rather than exposing 80 and 443.
- **No SSH.** Once it was set up, SSH was turned off for everyone. If I need to get on the box, it's root via the hosting provider's console.
- **No optional steps in the docs.** The setup doc produces one way of doing it. If you follow it twice, you get two identical servers.

### Things that caught me out

The first was OAuth. Logging in kept failing with a redirect URI mismatch, which turned out to be Caddy not trusting the proxy in front of it, so Infisical saw the wrong scheme and host. Setting `trusted_proxies` in Caddy fixed it.

The second was the tunnel going down about a week after setup.

<!-- TODO: what caused the tunnel to drop and what you changed to stop it happening again -->

The third was Renovate. It struggled to track the `infisical/infisical` image because of how Docker Hub paginates its anonymous API. Adding this to the Renovate config sorted it:

```json
{
	"minimumReleaseAgeBehaviour": "timestamp-optional"
}
```

## Structuring the secrets

This is the bit I'd spend time on if you're starting out, because changing your mind later means re-scoping every access policy.

### Internal servers

Our internal servers (GitLab, the CI runners, Packeton, the bastions and so on) are configured with Ansible and pull their secrets from Infisical. They all live in one project, organised by folder:

```
/shared
/servers/gitlab
/servers/packeton
/servers/bastion-01
...
```

Anything used by more than one server goes in `/shared`, so there's only ever one copy to rotate. Each server gets its own machine identity, which can read `/shared/**` and its own `/servers/<name>/**` and nothing else. The folder names match the Ansible inventory hostnames, which keeps the lookup logic simple.

### Client sites

Each client is its own Infisical project, with one machine identity per client for CI. The production `.env` is generated in GitLab CI and written straight onto the server, so a local copy never exists. It ends up as a plain `.env`, `600`, owned by the deploy user.

We deploy with [Deployer](https://deployer.org/), but I kept the Infisical login and export logic in the GitLab CI config rather than the Deployer recipe. Developer machines pull secrets from Infisical too, so nobody is passing `.env` files around on Slack anymore.

## Migrating existing sites

Moving dozens of sites over by hand wasn't going to happen, so I wrote a `migrate-repo-secrets.sh` script. You create the project in the Infisical UI, run `infisical init` in the cloned repo, then run the script. It:

1. Reads the project ID from `.infisical.json`
2. Pulls the live `.env` from the server with `dep run`
3. Flags any variable it doesn't recognise (without blocking)
4. Pushes the secrets into Infisical for each environment
5. Creates a `<repo>-ci` machine identity
6. Puts the token into GitLab CI as a masked, protected and hidden variable using `glab`

Two gotchas from writing it:

- When using a machine identity, the Infisical CLI needs `--projectId` passing explicitly. It doesn't pick it up from `.infisical.json`.
- Some versions of `glab` always send `--hidden`, even when you don't ask for it, which gives you a 400 on short values.

## Tokens and OIDC

We started out using Token Auth for the CI machine identities. The catch is that tokens max out at 90 days, which would mean rotating a token for every client project every quarter.

So we're moving to GitLab OIDC auth, where the CI job proves who it is with a short-lived JWT and there's no long-lived token stored anywhere. I'm trialling it on one project before rolling it out.

<!-- TODO: how the OIDC trial went, if there's anything to report yet -->

## A bonus: Postman

We use Postman for API work, and it can pull secrets from Infisical too. A pre-request script logs in with Universal Auth, caches the access token and fetches what it needs, so API keys no longer live in shared Postman environments.

## Would I choose it again?

<!-- TODO: your honest verdict. What's been good, what's been annoying, and whether you'd still pick it over Bitwarden -->
