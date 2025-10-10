---
title: Setting up RustFS as an Amazon S3 replacement
intro: Replacing Amazon S3 and/or MinIO with RustFS
tags:
  - CLI
---

I was at [TYPO3 Camp London](https://t3cl25.typo3.com/) recently when Martin Helmich casually dropped that [RustFS](https://rustfs.com/en/) was a solid MinIO replacement. That got my attention.

I've written about MinIO before - [speeding up Gitlab CI](/blog/how-i-improved-the-speed-of-docker-builds-in-gitlab-ci/) and [caching Gitlab assets](/blog/use-minio-to-cache-gitlab-containers-and-runners/) - and it's been great as a self-hosted S3 alternative. But I'm always up for trying new toys, especially when they promise improvements.

Turns out RustFS has been benchmarked against MinIO and is [faster across the board](https://github.com/orgs/rustfs/discussions/598#discussion-8952907). That was enough to convince me to give it a go.

## Server setup

We're running RustFS on a dedicated Ubuntu server with [Hetzner](https://www.hetzner.com/) (our go-to VPS provider). I went with an Intel CX32:

- 4 vCPU
- 8 GB RAM
- 80 GB Disk

**Note:** You'll need an external IPv4 address - `rustfs.com` only supports IPv4 for setup.

## Installation

Once your VPS is up, installation is pleasantly straightforward. First, make sure you've got `unzip`:

```bash
apt update && apt upgrade
apt install zip unzip
```

Then grab the [install script](https://rustfs.com/en/download/?platform=linux):

```bash
curl -O https://rustfs.com/install_rustfs.sh && bash install_rustfs.sh
```

Follow the CLI prompts and you're sorted.

## Setup

After installation, hit up the web interface at `http://[server-ip]:9000`. Default credentials are `rustfsadmin` for both username and password.

Change that immediately by editing:

```
/etc/default/rustfs
```

Once logged in, you can create buckets and extra users or access keys - which is what I've been using for Gitlab CI.
