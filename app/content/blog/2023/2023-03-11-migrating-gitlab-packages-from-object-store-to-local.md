---
title: Migrating Gitlab packages from object store to local
date: 2023-03-11
intro: How to migrate your packages from using the remote object store back to using the Gitlab server
permalink: "blog/migrating-gitlab-packages-from-object-store-to-local/"
tags:
 - Gitlab
---

I was having an infrastructure sort out and wanted to move my Gitlab packages [from object storage hosted with MinIO](/blog/use-minio-to-cache-gitlab-containers-and-runners/) back to Gitlab itself.

I managed to get Gitlab responding to the local storage again, for example, when it made a new package it didn't error out, however it wasn't able to find the `tar.gz` files for existing packages. When trying to download, I was faced with the following:

```json
{
	"500 Internal server error"
}
```

First port of call was to resolve the permissions. Fortunately a [Stack Overflow](https://stackoverflow.com/a/55838256/1324321) answer lead me to the [Gitlab update permissions](https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/docker/assets/update-permissions) script.

This script has been great at solving some wrong permissions (and running this fixed a couple of other niggles I was having). However, this didn't resolve my issue.

I revisited the migration [instructions](https://docs.gitlab.com/ee/administration/packages/index.html#migrate-local-packages-to-object-storage) on how to migrate _to_ object storage and noticed some database commands near the bottom which, ultimately, solved the issue.

The steps I ran to migrate my Gitlab packages from object storage to local were:

1. Copy the packages from the object storage, back to the default packages localted (keep the folder structure the same):  `/var/opt/gitlab/gitlab-rails/shared/packages/`
2. Connect to the database (be very careful) - this took a few seconds to connect for me:` gitlab-rails dbconsole --database main`
3. Check the `file_store` location for the packages - **1** is local, **2** is object storage: `select id,file_store,file from packages_package_files;`

<span class="note">It was at this point I noticed all the packages (except a new one I had created) had a `file_store` of `2`.</span>

4. Update one of the packages to check it now resolves `update packages_package_files set file_store = 1 where id = 65;`
5. If successful, update all of the packages: `update packages_package_files set file_store = 1;`

P.s. Sorry for the overly verbose sentences and "keyword stuffing". I spent _hours_ trying to resolve this the other day and figured if I save even 1 person the time, then it would have been worth it.
