---
title: How to migrate your Gitlab instance to a new server
date: 2021-03-08
updated: 2021-02-20
intro: I recently migrated our Gitlab server install from one server to another. With the help of a few tutorials it was fairly painless, however I thought I would outline the steps here
permalink: "blog/migrating-gitlab-from-one-server-to-another/"
tags:
 - Web
 - DevOps
---

I recently migrated our Gitlab server install from one server to another. With the help of a few tutorials scattered around, it was fairly painless. I thought I would outline the steps here as there were a couple of bits that tripped me up.

This tutorial assumes you are running a self-hosted **Omnibus** version of [Gitlab](https://about.gitlab.com/) and are comfortable with the command-line. It also assumes you have SSH access to both the existing server and a new server you wish to migrate too. Lastly, sudo/root access is required on both servers for this process to work.

It also goes without saying that you should make sure no-one is utilising your Gitlab install while you are migrating.

### 1. Update your current install

You can only backup & restore to/from Gitlab running the same versions. To avoid having to find an older version for your new server, it makes this process smoother if your current version of Gitlab is up-to-date.

### 2. Set up a new server

All the tutorials tell you to create your backup first, however I found it easier to set the new server up as the first step. **Make sure you are installing the correct version**. I lost a couple of hours after I had followed the [Gitlab tutorial](https://about.gitlab.com/install/) - this sets up the Enterprise Edition as default, however I was running the **community edition**.

**Edit:** Thanks to @mstoy on Twitter, it was pointed out there is a [**community edition** tutorial](https://packages.gitlab.com/gitlab/gitlab-ce/install) available.

I was able to do this by replacing `gitlab-ee` in the documentation with `gitlab-ce`. For example, the Debian install requires a script which is then piped through bash - it can be updated to the following:

```bash
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash
```

We can then install `gitlab-ce` in the next step

```bash
sudo EXTERNAL_URL="https://gitlab.example.com" apt-get install gitlab-ce

```

**Note:** If you are using the same domain, configure the the new one for the domain and let Let's Encrypt fail, you can can then reconfigure afterwards.


### 3. Create a backup

If you are up-to-date, you can use the following to make a backup. Run this on your exiting Gitlab server.

```bash
sudo gitlab-backup create
```

You will see it loop through all of the projects on your Gitlab server and eventually create a `tar` file. This tar filename contains the date and the Gitlab version - so you can double check your versions are in sync.

This file should be located in `/var/opt/gitlab/backups/` (unless you have changed this yourself in the `gitlab.rb` file).

### 4. Transfer the files

The most straight-forward way of getting the backup to the new server is a direct `scp` or `rsync`. The backup file will be owned by root, so however you get this to the new server is down to you.

The files/folders you should copy are:

- `/var/opt/gitlab/backups/YOURBACKUP`
- `/etc/gitlab`
- Any cron files you have added

I allowed SSH from the new server to the old server and did the following:

```bash
rsync -vazP old.server:/etc/gitlab/ /etc/gitlab/
```

### 5. Restore the backup

The restoration is details in the [Gitlab documentation](https://docs.gitlab.com/ee/administration/backup_restore/restore_gitlab.html), however once you have stopped the services listed (`puma` and `sidekiq`), you can run

```bash
sudo gitlab-backup restore
```

This will restore the one and only backup that exists. If you do pass in the name of the file (if you, say, took a backup of the new server), you need to omit the `_gitlab_backup.tar` at the end of the name.

For example, if the file was `1612726810_2021_02_07_13.8.3_gitlab_backup.tar` you would do:

```bash
sudo gitlab-backup restore BACKUP=1612726810_2021_02_07_13.8.3
```

### 6. Check, reconfigure & set live

It's good practice to restart & reconfigure the install

```bash
sudo gitlab-ctl restart
```

```bash
sudo gitlab-ctl restart
sudo gitlab-rake gitlab:check SANITIZE=true

sudo gitlab-rake gitlab:doctor:secrets

sudo gitlab-rake gitlab:artifacts:check
sudo gitlab-rake gitlab:lfs:check
sudo gitlab-rake gitlab:uploads:check
```

Once you're happy with the commands, update your domain name (if you need to) and then recnfigure your install

```bash
sudo gitlab-ctl reconfigure
```

## Non-main branches

As [Tom pointed out](https://gitlab.com/mikestreety/mikestreety/-/issues/2), if you have any branches which don't use `main` as their default branch, you may get an error when cloning down a repo from your new instance.

If that is the case there is a solution, which was posted in the official [Gitlab Issue tracker](https://gitlab.com/gitlab-org/gitlab/-/issues/343905#note_770735311). 

You can run `gitlab-rails c` and then enter the following:

```ruby
Project.all.each {|p| p.change_head(p.default_branch) }
```

## Finished

You should now have a Gitlab instance that walks and talks like your old one, but on a new server instead.
