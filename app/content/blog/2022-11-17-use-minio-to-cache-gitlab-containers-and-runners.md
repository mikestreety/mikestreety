---
title: Use MinIO to cache Gitlab assets and leverage distributed runner caching
date: 2022-11-17
intro: Gitlab can utilise MinIO (S3 replacement) for caching built images, packages, uploads and for runner caches
permalink: blog/use-minio-to-cache-gitlab-containers-and-runners/
tags:
  - Gitlab CI
  - Docker
---

Gitlab can utilise [Amazon S3](https://aws.amazon.com/s3/) for several things throughout the application. If you have an existing sever, you may wish to self-host an S3 replacement, which is where [MinIO](https://min.io/) comes in.

MinIO has Amazon S3 compatible APIs, which means it can be a replacement without any additional development work.

Object Storage in Gitlab can be used for [distributed runner caching](https://docs.gitlab.com/runner/configuration/autoscale.html#distributed-runners-caching) along with storing built docker containers.

<div class="info"><strong>Note:</strong> This post assumes strong Gitlab knowledge and the instructions below are for the Gitlab Omnibus install. However, it should help with what key/values to put where. Please refer to the Gitlab documentation if you are unsure</div>

## Bucket creation

Once the MinIO server is setup configured (I won't cover that here), you need to make some buckets and credentials for your Gitlab server to access.

1. Go to Buckets -> Create Bucket
	 1. Create a bucket called `gitlab-registry` - this will be for your Docker images (I left all the other items unchecked)
2. Then go to Identity -> Users -> Create User
	 1. I named mine `gitlab-user` and set a password
	 2. Give the user `readwrite` policy

Create a Bucket for both `gitlab-registry` and `gitlab-ci`

## Configure registry caching

On your Gitlab server, edit your config file (typically `/etc/gitlab/gitlab.rb`) and configure the registry storage - the settings are similar to that [documented in the Gitlab docs](https://docs.gitlab.com/ee/administration/packages/container_registry.html#use-object-storage).

MinIO has an S3 compatible API - the thing to note is the region should be `us-east-1`.

Use the code below and replace the placeholders

- `[MINIO USERNAME]` - the username from the user made above - e.g. `gitlab-user`
- `[MINIO USER PASSWORD]` - the password for the `gitlab-user`
- `[BUCKET NAME]` - the name of the bucket created in step 1 above - e.g. `gitlab-registry`
- `[IP/URL TO MINIO INSTANCE]` - the IP & port to your minio instance, by default this would be something like `192.168.1.1:9000` (not forgetting the `:9000` at the end)

```ruby
registry['storage'] = {
	's3' => {
  	'accesskey' => '[MINIO USERNAME]',
  	'secretkey' => '[MINIO USER PASSWORD]',
  	'bucket' => '[BUCKET NAME]',
  	'region' => 'us-east-1',
  	'regionendpoint' => '[IP/URL TO MINIO INSTANCE]',
  	'secure' => false,
  	'encrypt' => false,
  	'v4Auth' => true
	}
}
```

Once added, reconfigure your Gitlab instance

```bash
sudo gitlab-ctl reconfigure
```

Once reconfigured, trigger the build of a Docker image. Once complete, you should be able to browse the bucket and see Docker contents

## Configure Object caching

Gitlab allows the use of [Consolidated object storage configuration](https://docs.gitlab.com/ee/administration/object_storage.html#consolidated-object-storage-configuration). This allows you to use one set of credentials for storing/caching many things, including dependencies, uploads and CI artifacts.

In MinIO, create the following buckets - if you don't use one of the features, omit the bucket creation and disable the storage in the configuration (which will be covered)

- `gitlab-artifacts` - CI artifacts
- `gitlab-dependency_proxy`
- `gitlab-external-diffs` - Merge request diffs
- `gitlab-lfs` - Git Large File Storage objects
- `gitlab-packages` - Project packages (for example, PyPI, Maven, or NuGet)
- `gitlab-pages`
- `gitlab-terraform_state` - Terraform state files
- `gitlab-uploads` - User uploads

Next, edit your Gitlab configuration file (follow the Gitlab link above if your file is yaml) and add the following:

```ruby
# Consolidated object storage configuration
gitlab_rails['object_store']['enabled'] = true
gitlab_rails['object_store']['proxy_download'] = true
gitlab_rails['object_store']['connection'] = {
	'provider' => 'AWS',
	'region' => 'us-east-1',
	'aws_access_key_id' => '[MINIO USERNAME]',
	'aws_secret_access_key' => '[MINIO USER PASSWORD]',
	'endpoint' => '[IP/URL TO MINIO INSTANCE]',
	'path_style' => true
}

gitlab_rails['object_store']['objects']['artifacts']['bucket'] = 'gitlab-artifacts'
gitlab_rails['object_store']['objects']['external_diffs']['bucket'] = 'gitlab-external-diffs'
gitlab_rails['object_store']['objects']['lfs']['bucket'] = 'gitlab-lfs-objects'
gitlab_rails['object_store']['objects']['uploads']['bucket'] = 'gitlab-uploads'
gitlab_rails['object_store']['objects']['packages']['bucket'] = 'gitlab-packages'
gitlab_rails['object_store']['objects']['dependency_proxy']['bucket'] = 'gitlab-dependency-proxy'
gitlab_rails['object_store']['objects']['terraform_state']['bucket'] = 'gitlab-terraform-state'
gitlab_rails['object_store']['objects']['pages']['bucket'] = 'gitlab-pages'
```

If you don't use all the features, for example `terraform_state`, you can disable the necessity for this bucket by replacing `['bucket'] = 'gitlab-terraform-state'` with `['enabled'] = false` e.g.

```ruby
gitlab_rails['object_store']['objects']['terraform_state']['enabled'] = false
```
<div class="info"><strong>Note:</strong> Each object type <em>must</em> have either a bucket name set or be disabled - omitting it will cause the reconfigure command to fail</div>

Once added, reconfigure your Gitlab instance

```bash
sudo gitlab-ctl reconfigure
```

If you have reconfigured successfully, you can migrate assets from being local to using your new storage - this also serves as a good litmus test as to whether you have configured your instance correctly.

All the details are in the [Gitlab documentation](https://docs.gitlab.com/ee/administration/object_storage.html#migrate-to-object-storage). As an example, you can migrate all your uploads with

```bash
sudo gitlab-rake "gitlab:uploads:migrate:all"
```

## Gitlab Runner caching

This is a bit of a bonus and assumes you have your own custom runners. If you have 1 runner, you can cache on the runner itself, however it is better practice to use an external cache, like an S3 bucket (or Minio bucket).

<div class="info"><strong>Note:</strong> This assumes you already have an existing <a href="https://docs.gitlab.com/runner/">custom runner</a> set up</div>


Start off, as you have with each of the steps, by creating a bucket (I called my `gitlab-ci`).

Next, `ssh` into your Gitlab runner server and edit the config file - `/etc/gitlab-runner/config.toml`.

The next step is a bit laborious as you need to add the following block _to each configured runner_

```toml
[runners.cache]
  Type = "s3"
  Shared = true
  [runners.cache.s3]
    AccessKey = "[MINIO USERNAME]"
    SecretKey = "[MINIO USER PASSWORD]"
    BucketName = "[BUCKET NAME]"
    Insecure = false
    ServerAddress = "[IP/URL TO MINIO INSTANCE]"
```

As an example, one of your runners config might look like:

```toml
[[runners]]
  name = "Gitlab Runner 1"
  url = "[GITLAB URL]"
  token = "[RUNNER TOKEN]"
  executor = "docker"
  [runners.cache]
    Type = "s3"
    Shared = true
    [runners.cache.s3]
      AccessKey = "[MINIO USERNAME]"
      SecretKey = "[MINIO USER PASSWORD]"
      BucketName = "[BUCKET NAME]"
      Insecure = false
      ServerAddress = "[IP/URL TO MINIO INSTANCE]"
  [runners.docker]
    tls_verify = false
    privileged = true
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/var/run/docker.sock:/var/run/docker.sock", "/cache"]
    pull_policy = ["if-not-present"]
    shm_size = 0
```

With that, you should hopefully have a smaller Gitlab instance with better caching - all still hosted in your own infrastructure.
