Gitlab registry:

`/etc/gitlab/gitlab.rb`

```
registry['storage'] = {
  's3' => {
    'accesskey' => 'USER FROM MINIO',
    'secretkey' => 'PASSWORD FROM MINIO',
    'bucket' => 'BUCKET NAME',
    'region' => 'us-east-1',
    'regionendpoint' => 'http://127.0.0.1:9000',
    'secure' => false,
    'encrypt' => false,
    'v4Auth' => true
  }
}
```

Gitlab runner:

`/etc/gitlab-runner/config.toml`

```
[[runners]]
  name = "Gitlab Runner 1"
  url = ""
  token = "
  executor = "docker"
  [runners.cache]
    Type = "s3"
    Shared = true
    [runners.cache.s3]
      AccessKey = "USER FROM MINIO"
      SecretKey = "PASSWORD FROM MINIO"
      BucketName = "BUCKET NAME"
      Insecure = true
      ServerAddress = "127.0.0.1:9000"
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
