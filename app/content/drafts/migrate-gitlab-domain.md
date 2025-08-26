
In the examples below I will be using the two domains

- `old.gitlab-company.org` - This will represent the old/existing domain Gitlab currently runs on
- `new.gitlab-instance.com` - This is the domain we are migrating to

## Add the second domain

The first step is to allow Gitlab to accept connections from the new domain.

Once you point the domain record to your Gitlab instance, you will see you can navigate to it and click around - Gitlab doesn't try to redirect you off to the primary domain. You may, however, encounter an SSL error. This can be resolved by adding the secondary domain to Let's Encrypt and allowing Gitlab to generate an SSL certificate for it.

Edit the Gitlab config file `/etc/gitlab/gitlab.rb` and add the following

```
letsencrypt['alt_names'] = ['new.gitlab-instance.com', 'registry.new.gitlab-instance.com']
```

**Note:** If you have a container registry or any other sub-domains, these will need to be added to.

Reconfigure the instance

```
gitlab-ctl reconfigure
```

This will generate the SSL certificates while reconfiguring and will error if there are any subdomains it can't generate SSL certificates for.

I would encourage using this new domain for a day or two (navigating, cloning projects etc.) to ensure no basic issues arise.

## Switch the instance domain

The next step is to change the instance URL. This won't force a redirect but will mean Gitlab will respond with the new URL for API and internal requests. You will still be able to navigate on the old URL, clone projects etc.

However, this is where you will begin to see issues. If you use your Gitlab instance as a Docker or Package registry, you will need to ensure you have auth'd with all your package manaagers.

Edit the Gitlab config file `/etc/gitlab/gitlab.rb` and update the `external_url` and `letsencrypt['alt_names']`.

```
external_url 'https://new.gitlab-instance.com'
registry_external_url 'https://registry.new.gitlab-instance.com'

letsencrypt['alt_names'] = ['old.gitlab-company.org', 'registry.old.gitlab-company.org']
```

Reconfigure the Gitlab instance with `gitlab-ctl reconfigure`

I would advise using this new domain and Gitlab for a week or two. It won't redirect you to the new domain, but clone URLs and other requests will use the new domain.

If you use Gitlab as your NPM registry, this will be the biggest pain as it will update your `package-lock.json` but then refuse to let you install them if you haven't auth'd with the new domain. If you use something like [Renovate](https://docs.renovatebot.com/), this can help in your migrating but it takes a lot of planning (and a lot of head scratching). 

[Get in touch](/contact/) if you need some advice with your specific set-up and I might be able to help.

## Redirect to the new domain

With the new instance battletested and working, it's time to set up a redirect. You may choose to do this when you switch above, but I left it a week or two in case we needed to get back to the old domain.

Edit the Gitlab config file `/etc/gitlab/gitlab.rb` and add the options to allow custom nginx configuration

```
nginx['custom_nginx_config'] = 'include /etc/gitlab/nginx-extra.conf;'
```

Next, create a config file - `/etc/gitlab/nginx-extra.conf`. I chose to not redirect the registry, but if you do there is an example in [Running Gitlab simultaneously on two domains](https://robinopletal.com/posts/gitlab-on-two-domains).

Before you reconfigure the Gitlab instance, ensure the SSL certificates are in the location specified below

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

Reconfigure the Gitlab instance: `gitlab-ctl reconfigure`