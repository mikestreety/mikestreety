---
title: "Mayfly: short-lived preview environments for every merge request"
date: 2026-10-15
intro: Spinning up a full TYPO3 site for each merge request using DDEV and Cloudflare Tunnels
tags:
  - CLI
---

<!-- TODO: I couldn't find the Mayfly details, so check this whole post. I've assumed Mayfly is the name of our DDEV + Cloudflare Tunnels setup. Fill in the repo link, how it's triggered and anything I've guessed wrong -->

Mayflies are known for living about a day. That's exactly what I wanted from our preview environments: spin up, get looked at, disappear.

## The problem

When a developer opens a merge request, someone needs to look at it. That might be another developer, a project manager or the client. Until now, that meant one of:

- checking out the branch and running it locally (fine for developers, no good for anyone else)
- deploying it to the shared staging site, which is a queue. Two branches can't be on staging at once, and someone always forgets what's on there.

Services like Vercel and Netlify give you a preview link per pull request, but they're built for front-end sites. Our sites are TYPO3 with PHP, a database and a lot of moving parts.

## How Mayfly works

Mayfly runs on a Hetzner server and uses two tools we already lean on:

- **[DDEV](https://ddev.com/)**, which every developer already uses locally. Every project already has a working `.ddev` config, so there's nothing new to maintain.
- **[Cloudflare Tunnels](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)**, which give each environment a public URL without opening any ports on the server.

The flow looks like this:

1. A merge request is opened (or updated) in GitLab
2. A CI job tells the preview server to build it
3. The server clones the branch and runs `ddev start`
4. A database is imported
5. A tunnel route is added, so `mr-123.<preview domain>` points at the new DDEV project
6. The link gets posted back to the merge request
7. When the merge request is merged or closed, the project is torn down and the route removed

<!-- TODO: add the actual commands/CI job. Also note: how the CI job talks to the server (SSH via the bastion? a webhook?), and where the database comes from (sanitised copy? fixtures?) -->

## The TYPO3 base URL

The trickiest part was TYPO3 itself. A TYPO3 site configuration has a fixed `base` URL, and every preview needs a different one.

TYPO3 site configs can read environment variables, so the base can be set like this:

```yaml
base: '%env(TYPO3_BASE_URL)%'
```

A DDEV hook then sets the right URL when the project starts. Because it's a DDEV hook, it lives with the project and is the same everywhere.

<!-- TODO: paste your hook from .ddev/config.yaml -->

## Why DDEV and not Kubernetes?

Kubernetes is the textbook answer to "one environment per branch". For a team our size, it's a lot of extra infrastructure to run and understand.

DDEV is already how every one of our projects runs. If it works on a developer's machine, it works on Mayfly, and nobody has to learn anything new to debug it.

The trade-off is that a single server only fits so many environments.

<!-- TODO: how many environments can the server run at once, and what you do about stale ones (TTL? cleanup cron?) -->

## Things to watch out for

- **Data.** Don't point preview environments at production data. Use sanitised copies.
- **Clean-up.** Environments that never get torn down eat disk space and memory. Have something that removes old ones, even if the merge request close hook fails.
- **Search engines.** Make sure previews send `noindex` or sit behind Cloudflare Access, so they don't end up in Google.
- **Secrets.** Previews get their own non-production credentials. They should never be able to touch anything real.

<!-- TODO: anything that's bitten you since it went live -->

## What's next

<!-- TODO: open sourcing it? rolling it out across all projects? -->
