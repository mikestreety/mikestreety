---
title: Set up a private packagist using a server and open source
intro: Packeton is an open source clone of Packagist you can run yourself
tags:
  - CLI
---

Publishing private composer packages is a fiddly business - especially if you want a usable UI along with it.

After much research I came across [Packeton](https://github.com/vtsykun/packeton) - an open source fork of Packagist which you can run on a web server of your choosing.

This walkthrough sets Packeton up with Docker which requires the least amount of server setup.

The following how-to runs through setting it up and some hurdles I came across. It expects CLI experience and you need to be comfortable with SSH.

## Where to run

You need a server or VPS for this - I opted for a cloud server from [Hetzner](https://www.hetzner.com/) with Ubuntu 24 running.

## Server set up

Update the server applications and install caddy (which allows web traffic to docker images) and docker itself.

```bash
apt update && apt upgrade -y
apt install -y caddy
curl -fsSL https://get.docker.com | sh
```

## DNS

Point your domain (e.g. `packages.yourdomain.com`) at the server's public IP

## Firewall

Set up a firewall with the following inbound rules - I used the firewall built into the Hetzner control panel

| Port | Protocol | Source |
|------|----------|--------|
| 22 | TCP | Any IPv4, Any IPv6 |
| 80 | TCP | Any IPv4, Any IPv6 |
| 443 | TCP | Any IPv4, Any IPv6 |


## Generate an app secret

This can be run on the server or your local machine - you just need a 32 character string

```bash
openssl rand -hex 32
```

Copy the output for use in the next step. Keep it static — it's used to encrypt SSH keys in the database.

## Create your Docker compose file

I chose to keep all my Packeton-related files in `/opt/packeton`. Start off by making the folder & file

```bash
mkdir -p /opt/packeton
nano /opt/packeton/docker-compose.yml
```

This utilises a few different settings & configuration. Some points worth noting

- This include configuration for using Mailgun (we use it on the free tier) for sending the password reset emails
- This includes `watchtower` which will keep packeton updated

```yaml
services:
  packeton:
    image: packeton/packeton:latest
    container_name: packeton
    restart: unless-stopped
    environment:
      APP_SECRET: <output from step 5>
      ADMIN_USER: admin
      ADMIN_PASSWORD: changeme
      ADMIN_EMAIL: you@yourdomain.com
      PACKAGIST_DIST_HOST: https://packages.yourdomain.com
      TRUSTED_PROXIES: 127.0.0.1
      MAILER_DSN: smtp://you%40yourdomain.com:PASSWORD@smtp.eu.mailgun.org:587
      MAILER_FROM: Your Name <you@yourdomain.com>
    ports:
      - '127.0.0.1:8080:80'
    volumes:
      - ./data:/data
  watchtower:
    image: containrrr/watchtower
    restart: unless-stopped
    environment:
      DOCKER_API_VERSION: "1.40"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command: --interval 86400
```

<div class="info"><strong>Note:</strong> <code>ADMIN_USER</code> and <code>ADMIN_PASSWORD</code> only apply on first run. Change the password afterwards via the console (see Post-setup).</div>

<div class="info"><strong>Note:</strong> If using Mailgun, make sure you use the EU SMTP host (<code>smtp.eu.mailgun.org</code>) if your domain is on the EU region. Use the full email address as the SMTP username, URL-encoding the <code>@</code> as <code>%40</code>.</div>

## Configure Caddy

Caddy allows a domain name to be forwarded to a running docker container.

Replace the entire contents of `/etc/caddy/Caddyfile` with:

```
packages.yourdomain.com {
    reverse_proxy localhost:8080
}
```

Then reload caddy:

```bash
systemctl reload caddy
```

## Start Packeton

```bash
cd /opt/packeton
docker compose up -d
```

## Verify it all works

Visit `https://packages.yourdomain.com` and log in with the admin credentials you set.

## Post-setup

### Change the admin password

The `ADMIN_PASSWORD` env var only applies on first run. Change it via the console:

```bash
docker exec -it packeton bin/console packagist:user:manager admin --password=newpassword
```

### Create additional admin users

```bash
docker exec -it packeton bin/console packagist:user:manager newusername --password=newpassword --admin --no-interaction
```

### Configure GitLab OAuth

First, create a GitLab OAuth application at `https://gitlab.com/-/profile/applications`:

- **Redirect URIs:**
  ```
  https://packages.yourdomain.com/oauth2/gitlab/install
  https://packages.yourdomain.com/oauth2/gitlab/check
  ```
- **Scopes:** `api`, `read_user`, `read_repository`

Then create `/opt/packeton/data/config.yaml`:

```yaml
packeton:
    integrations:
        gitlab:
            base_url: 'https://gitlab.com/'
            clone_preference: 'clone_https'
            gitlab:
                client_id: 'xxx'
                client_secret: 'xxx'
```

Restart Packeton to apply:

```bash
cd /opt/packeton
docker compose restart packeton
```

Then go to the Packeton integrations page in the UI and click Install Integration, then Connect to complete the OAuth flow.

## Bonus Notes

### Data

All Packeton data lives in `/opt/packeton/data` on the host, mapped to `/data` inside the container. Back this directory up — it contains the database, config, and any stored artifacts.

### Ongoing maintenance

Watchtower checks for a new `packeton/packeton:latest` image daily and recreates the container automatically. No action needed.

Monitor the [Packeton releases](https://github.com/vtsykun/packeton/releases) for any updates that require manual migration steps before they land.
