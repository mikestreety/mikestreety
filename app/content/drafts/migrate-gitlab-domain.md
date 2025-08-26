# Migrating GitLab to a New Domain

In the examples below, I'll be using two domains:

- `old.gitlab-company.org` - This represents the old/existing domain GitLab currently runs on
- `new.gitlab-instance.com` - This is the domain we're migrating to

## Add the Second Domain

The first step is to allow GitLab to accept connections from the new domain.

Once you point the domain record to your GitLab instance, you'll find you can navigate to it and click around - GitLab doesn't try to redirect you back to the primary domain. You may, however, encounter an SSL error. This can be resolved by adding the secondary domain to Let's Encrypt and allowing GitLab to generate an SSL certificate for it.

Edit the GitLab config file `/etc/gitlab/gitlab.rb` and add the following:

```
letsencrypt['alt_names'] = ['new.gitlab-instance.com', 'registry.new.gitlab-instance.com']
```

**Note:** If you have a container registry or any other subdomains, these will need to be added too.

Reconfigure the instance:

```
gitlab-ctl reconfigure
```

This will generate the SSL certificates while reconfiguring and will error if there are any subdomains it can't generate certificates for.

I'd encourage using this new domain for a day or two (navigating, cloning projects, etc.) to ensure no basic issues arise.

## Switch the Instance Domain

The next step is to change the instance URL. This won't force a redirect but will mean GitLab responds with the new URL for API and internal requests. You'll still be able to navigate on the old URL, clone projects, and so on.

However, this is where you'll begin to see issues. If you use your GitLab instance as a Docker or package registry, you'll need to ensure you've authenticated with all your package managers using the new domain.

Edit the GitLab config file `/etc/gitlab/gitlab.rb` and update the `external_url` and `letsencrypt['alt_names']`:

```
external_url 'https://new.gitlab-instance.com'
registry_external_url 'https://registry.new.gitlab-instance.com'

letsencrypt['alt_names'] = ['old.gitlab-company.org', 'registry.old.gitlab-company.org']
```

Reconfigure the GitLab instance with `gitlab-ctl reconfigure`

I'd advise using this new domain with GitLab for a week or two. It won't redirect you to the new domain, but clone URLs and other requests will use the new domain.

If you use GitLab as your NPM registry, this will be the biggest pain. It'll update your `package-lock.json` but then refuse to let you install packages if you haven't authenticated with the new domain. If you use something like [Renovate](https://docs.renovatebot.com/), this can help with migration, but it takes a lot of planning (and a lot of head scratching).

[Get in touch](/contact/) if you need advice with your specific setup - I might be able to help.

## Redirect to the New Domain

With the new instance battle-tested and working, it's time to set up a redirect. You may choose to do this when you switch the instance domain above, but I left it a week or two in case we needed to fall back to the old domain.

Edit the GitLab config file `/etc/gitlab/gitlab.rb` and add the option to allow custom nginx configuration:

```
nginx['custom_nginx_config'] = 'include /etc/gitlab/nginx-extra.conf;'
```

Next, create a config file - `/etc/gitlab/nginx-extra.conf`. I chose not to redirect the registry, but if you need to, there's an example in [Running GitLab simultaneously on two domains](https://robinopletal.com/posts/gitlab-on-two-domains).

Before you reconfigure the GitLab instance, ensure the SSL certificates are in the location specified below:

```
# web
server {
        listen 443 ssl http2;

        server_name old.gitlab-company.org;

        server_tokens off;
        ssl_certificate /etc/gitlab/ssl/old.gitlab-company.org.crt;
        ssl_certificate_key /etc/gitlab/ssl/old.gitlab-company.org.key;
        ssl_ciphers 'ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256';
        ssl_protocols  TLSv1.2;
        ssl_prefer_server_ciphers on;
        ssl_session_cache  builtin:1000  shared:SSL:10m;
        ssl_session_timeout  5m;

        return 301 https://new.gitlab-instance.com$request_uri;
}
```

Reconfigure the GitLab instance: `gitlab-ctl reconfigure`