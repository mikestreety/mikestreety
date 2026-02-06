---
title: Completely remove DDEV from your computer
intro: Remove DDEV, it's images and all config files
tags:
  - CLI
---

I recently ran into an issue with DDEV 1.25 and was upgrading and downgrading between the two versions to test, check and verify.

Eventually, my DDEV got confused and started producing 404s. With mixed version images & config, I wanted to remove everything and start again.

With the help of Claude, I created a bash script which will run through and delete every DDEV related configuration.

[Completely remove DDEV](https://gist.github.com/mikestreety/07d531b346ab8ce9c62ec655dd4274a4).

## Steps

1. Copy the contents or download the zip
2. Make the file executeable - `cd path/to/file` and `chmod +x ./remove-ddev.sh`
3. Run the script `./remove-ddev.sh` - there is `--help` and `--dry-run` flags available