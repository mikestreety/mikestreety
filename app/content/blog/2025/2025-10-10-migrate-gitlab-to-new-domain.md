---
title: Migrate your GitLab instance to a new domain
intro: How to move your GitLab instance to a new domain while keeping the infrastructure
tags:
  - Gitlab
---

We were sunsetting a domain and wanted to migrate our GitLab instance to a different URL.

GitLab doesn't make this easy. There's no big "Change Domain" button, and if you're using package registries, you're in for a proper adventure and need to get your team on board.

## Steps we'll cover

1. Add the new domain alongside the old one (30 mins)
2. Switch the primary domain (30 mins + testing time)
3. Set up redirects (1 hour)
4. Clean up (10 mins)
5. Deal with package registry authentication (varies, but budget a day if you're unlucky)

In the examples below, I'm using:

- `old.gitlab-company.org` - the old domain
- `new.gitlab-instance.com` - where we're migrating to

Word of warning: if you're using GitLab as a package registry (NPM, Docker, whatever), prepare yourself. This is where most of the pain lives.

## Add the second domain

The first step is to allow GitLab to accept connections from the new domain. This lets you test everything works before you commit to the switch - you'll be able to access GitLab on both domains simultaneously, which is brilliant for testing.

Once you point the domain record to your GitLab instance, you'll find you can navigate to it and click around - GitLab doesn't try to redirect you back to the primary domain. You may, however, encounter an SSL error. This can be resolved by adding the secondary domain to Let's Encrypt and allowing GitLab to generate an SSL certificate for it.

Edit the GitLab config file `/etc/gitlab/gitlab.rb` and add the following:

```ruby
letsencrypt['alt_names'] = ['new.gitlab-instance.com', 'registry.new.gitlab-instance.com']
```

Note: If you have a container registry or any other subdomains, these will need to be added too.

Reconfigure the instance:

```ruby
gitlab-ctl reconfigure
```

This will generate the SSL certificates while reconfiguring and will error if there are any subdomains it can't generate certificates for.

I'd encourage using this new domain for a day or two (we left it longer, because paranoia, but two days is probably fine if you're braver than us). Navigate around, clone some projects, generally kick the tyres to make sure there are no basic issues.

## Switch the instance domain

The next step is to change the instance URL. This won't force a redirect but will mean GitLab responds with the new URL for API and internal requests. You'll still be able to navigate on the old URL, clone projects, and so on.

Edit the GitLab config file `/etc/gitlab/gitlab.rb` and update the `external_url` and `letsencrypt['alt_names']`:

```ruby
external_url 'https://new.gitlab-instance.com'
registry_external_url 'https://registry.new.gitlab-instance.com'
letsencrypt['alt_names'] = ['old.gitlab-company.org', 'registry.old.gitlab-company.org']
```

Reconfigure the GitLab instance:

```ruby
gitlab-ctl reconfigure
```

I'd advise using this new domain with GitLab for a week or two. It won't redirect you to the new domain, but clone URLs and other requests will use the new domain.

## Package registries

This is where you'll begin to see issues. If you use your GitLab instance as a Docker or package registry, you'll need to ensure you've authenticated with all your package managers using the new domain.

If you use GitLab as your NPM registry, this will be the biggest pain. Every project needs re-authenticating with the new domain, and npm will absolutely refuse to install packages until you do. It'll update your `package-lock.json` happily enough, then leave you staring at authentication errors wondering what you've done to deserve this.

If you use something like [Renovate](https://docs.renovatebot.com/), this can help with migration, but it takes a lot of planning (and a lot of head scratching). Weirdly, dealing with this across multiple projects was more time-consuming than the actual GitLab migration.

[Get in touch](/contact/) if you need advice with your specific setup - I spent enough time Googling obscure package registry authentication that I might actually be able to help.

## Redirect to the new domain

With the new instance battle-tested and working, it's time to set up a redirect. You may choose to do this when you switch the instance domain above, but I left it a week or two in case we needed to fall back to the old domain (which, to be fair, we didn't, but better safe than sorry).

Edit the GitLab config file `/etc/gitlab/gitlab.rb` and add the option to allow custom nginx configuration:

```ruby
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
  ssl_protocols TLSv1.2;
  ssl_prefer_server_ciphers on;
  ssl_session_cache builtin:1000 shared:SSL:10m;
  ssl_session_timeout 5m;

  return 301 https://new.gitlab-instance.com$request_uri;
}
```

Reconfigure the GitLab instance:

```bash
gitlab-ctl reconfigure
```

## Clean-up

After some time (we left it a month, but we're cautious like that), you can tidy things up:

- Delete `/etc/gitlab/nginx-extra.conf`
- Remove `nginx['custom_nginx_config']` from `/etc/gitlab/gitlab.rb`
- Remove any references to the old domain in `/etc/gitlab/gitlab.rb`
- Delete any references from your browser history

The whole migration took us about three weeks from start to finish, mostly because we were being cautious and dealing with the package registry nightmare. If you're not using registries heavily, you could probably knock this out in a few days.

There's still a lot I don't know about GitLab's internals (it's a proper beast of a system), but this process worked well for us. If you hit any snags or your setup is a bit different, [get in touch](/contact/) - I might be able to point you in the right direction.
