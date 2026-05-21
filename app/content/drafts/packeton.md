# Packeton on Hetzner — Setup Guide

## 1. Provision a Hetzner server

CX22 or CX32 is sufficient. Use Ubuntu 24.04 LTS, add your SSH key during creation.

## 2. Initial server setup

```bash
apt update && apt upgrade -y
apt install -y caddy
curl -fsSL https://get.docker.com | sh
```

## 3. DNS

Point your domain (e.g. `packages.yourdomain.com`) at the server's public IP via an A record.

## 4. Firewall

In the Hetzner Cloud UI, create a firewall with three inbound rules:

| Port | Protocol | Source |
|------|----------|--------|
| 22 | TCP | Any IPv4, Any IPv6 |
| 80 | TCP | Any IPv4, Any IPv6 |
| 443 | TCP | Any IPv4, Any IPv6 |

Leave outbound rules as-is.

## 5. Generate an app secret

```bash
openssl rand -hex 32
```

Copy the output for use in the next step. Keep it static — it's used to encrypt SSH keys in the database.

## 6. Create your compose file

```bash
mkdir -p /opt/packeton
nano /opt/packeton/docker-compose.yml
```

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

> **Note:** `ADMIN_USER` and `ADMIN_PASSWORD` only apply on first run. Change the password afterwards via the console (see Post-setup).

> **Note:** If using Mailgun, make sure you use the EU SMTP host (`smtp.eu.mailgun.org`) if your domain is on the EU region. Use the full email address as the SMTP username, URL-encoding the `@` as `%40`.

## 7. Configure Caddy

Replace the entire contents of `/etc/caddy/Caddyfile` with:

```
packages.yourdomain.com {
    reverse_proxy localhost:8080
}
```

Then reload:

```bash
systemctl reload caddy
```

## 8. Start Packeton

```bash
cd /opt/packeton
docker compose up -d
```

## 9. Verify

Visit `https://packages.yourdomain.com` and log in with the admin credentials you set.

---

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

---

## Data

All Packeton data lives in `/opt/packeton/data` on the host, mapped to `/data` inside the container. Back this directory up — it contains the database, config, and any stored artifacts.

---

## Ongoing maintenance

Watchtower checks for a new `packeton/packeton:latest` image daily and recreates the container automatically. No action needed.

Monitor the [Packeton releases](https://github.com/vtsykun/packeton/releases) for any updates that require manual migration steps before they land.