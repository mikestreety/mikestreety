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

**Edit:** Thanks to @mstoy on Twitter, it was pointed out there is a [**community edition** tutorial](https://about.gitlab.com/install/?version=ce) available.

I was able to do this by replacing `gitlab-ee` in the documentation with `gitlab-ce`. For example, the Debian install requires a script which is then piped through bash - it can be updated to the following:

<pre class="language-bash">curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash</pre>

We can then install `gitlab-ce` in the next step

<pre class="language-bash">sudo EXTERNAL_URL="https://gitlab.example.com" apt-get install gitlab-ce
</pre>

### 3. Create a backup

If you are up-to-date, you can use the following to make a backup. Run this on your exiting Gitlab server.

<pre class="language-bash">sudo gitlab-backup create</pre>

You will see it loop through all of the projects on your Gitlab server and eventually create a `tar` file. This tar filename contains the date and the Gitlab version - so you can double check your versions are in sync.

This file should be located in `/var/opt/gitlab/backups/` (unless you have changed this yourself in the `gitlab.rb` file).

### 4. Transfer the files

The most straight-forward way of getting the backup to the new server is a direct `scp` or `rsync`. The backup file will be owned by root, so however you get this to the new server is down to you.

I added my personal SSH key from the original server to the target server, transferred the backup file to my home directory, `chown`d it to me and `scp`d it from there.

Along with the `tar`, make sure you transfer the `gitlab` files in `/etc/gitlab/` (e.g. `/etc/gitlab/gitlab*`).

### 5. Move the files

Move the files you have just transferred to the places where you found them. The `tar` goes to `/var/opt/gitlab/backups/` and the two `gitlab` files to `/etc/gitlab/`.

### 6. Restore the backup

The restoration is details in the [Gitlab documentation](https://docs.gitlab.com/ee/raketasks/backup_restore.html#restore-for-omnibus-gitlab-installations), however once you have stopped the services listed, you can run

<pre class="language-bash">sudo gitlab-backup restore </pre>

This will restore the one and only backup that exists. If you do pass in the name of the file (if you, say, took a backup of the new server), you need to omit the `_gitlab_backup.tar` at the end of the name.

For example, if the file was `1612726810_2021_02_07_13.8.3_gitlab_backup.tar` you would do:

<pre class="language-bash">sudo gitlab-backup restore BACKUP=1612726810_2021_02_07_13.8.3</pre>

## Finished

You should now have a Gitlab instance that walks ands talks like your old one, but on a new server instead.
