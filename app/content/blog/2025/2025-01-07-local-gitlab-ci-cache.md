---
title: Use local filesystem for Gitlab CI cache
intro: Whether it be a mounted drive or just a local filesystem - how do you store your global runner caches locally?
tags:
 - Gitlab
---

Despite happily [using Minio to store my runner caches](/blog/use-minio-to-cache-gitlab-containers-and-runners/) for a few years now, I've been looking for a way to store my global Gitlab CI runner caches on the local filesystem.

My reasons for this are twofold, one being infrastructure cost, meaning we only need to pay for and maintain one VPS (as opposed to one for MinIO and one for Gitlab CI) and the other being speed - this is just a hunch but storing caches locally is probably quicker than uploading and downloading to a different server.

I did consider using AWS for my Gitlab runners & runner cache, however the big unknown is the cost. I have no clue as to how much my runners and storage would be and you hear so many horror stories I have steered clear.

Instead, I have a VPS on Hetzner which costs:

- €7.05 a month for a 3 CPU / 4 GB RAM / 80 GB HDD VPS
- ~€0.58 a month for an IP4 address
- €2.64 a month for the 60GB volume I have mounted for the cache

I decided to include an extra mounted volume to store the cache to allow a bit more flexibility and isolate the caching.

## Local Caching

Local caching isn't _really_ mentioned in the Gitlab docs - it is referenced but never explicitly laid out, so I had a lot of guessing as to how to do it and what goes where.

The below talks about the Docker executors and runners, but I assume it could work for the other ones two.

There are 2 caches when using a runner, the `runner` cache and the `runner.docker` cache. From what I can gather, the `runner` cache is for the actual filesystem, while the path used in the `runner.docker` section is where assets from the `cache:` section of your `.gitlab-ci.yml` get's stored.

## Setup

I had a lot of frustration setting this up, but got there in the end - the system I cam up with in the end is

1. Decide where you cache is going to live - mine was in `/mnt/HC_Volume_1234` (my mounted drive) - I then made a `cache` folder inside however Gitlab CI likes it being `/cache`.
	- Inside my `cache` folder, I made `runner` and `docker` as sub-folders to help separate the caches
2. If it's not `/cache`, symlink your cache folder to be `/cache` in the root of your server - `ln -s /path/to/folder /cache`
3. Register your runner
4. Edit your `config.yaml`

## Adding the `cache_dir`

From the standard runner registration, these were the things I had to add/change

```yaml
[[runners]]
  cache_dir = "/cache/runner"
  [runners.docker]
    privileged = true
    volumes = ["/var/run/docker.sock", "/cache:/cache"]
    cache_dir = "/cache/docker"
```

The thing that caught me out is you need to specify `"/cache:/cache"` in the volumes for the docker runner, although the Gitlab docs say you can just do `"/cache"` this didn't seem to work for me.

Note the two different `cache_dir` locations for the two different types.

Gitlab CI also expects/plays nicer if the folder is `/cache` in the docker runner - again I tried setting this as my mounted drive (or other folders) but it just wasn't playing ball.

With that in place - and added to as many runners as you want, they can all access the same cache from your local drive.

If your drive does start to fill up, you can nuke the `runner` and/or `docker` cache folders - it might be worth having this on a scheduled task once a week or similar.
