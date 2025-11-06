---
title: Keeping RustFS clear of old assets
intro: How to delete old files to save server space
tags:
  - CLI
---

After having [RustFS](/blog/setting-up-rustfs-as-an-amazon-s3-replacement/) running as our [Gitlab CI cache](/blog/use-minio-to-cache-gitlab-containers-and-runners/) for a few weeks the server (as expected) filled up.

Since we're only using RustFS to cache build assets, we can safely bin the old ones without worry. We settled on a 14-day cut-off - bit arbitrary really, but it works. The worst that can happen is the application won't deploy without them, which means you'll have to re-run the entire pipeline if you're trying to deploy something that hasn't been built in a fortnight. Not ideal, but hardly the end of the world.

RustFS is comapitble with `mc` - the MinIo command so I started looking there but then ended up with a default linux command

```bash
find /data/rustfs0/XXX -mindepth 1 -type f -mtime +14 | xargs rm
```

<div class="info"><strong>Note:</strong> Make sure you specify the path (<code>XXX</code> in the example above) to your bucket as RustFS stores configuration in <code>/data/rustfs0/.rustfs.sys</code> - I ended up deleting our user access by removing files older than 14 days in this folder</div>

Once you have the command and are happy with it, add it to a crontab to run once a night.

To edit the crontab, run `crontab -e` and place the following at the bottom (this will run a 10pm every evening)

```bash
0 22 * * * find /data/rustfs0/gitlab-ci -mindepth 1 -type f -mtime +14 | xargs rm
```