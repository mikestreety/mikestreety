---
title: Setting up a central bastion/jump server
intro: Having a central host your team uses for SSH connections centralises configuration
tags:
  - CLI
---

With several developers and a great deal of production servers we need access to, managing SSH keys and access across them all was getting complex with potential for mistakes and missed authentication.

Instead, we decided to set up a bastion/jump host (with a redundant backup) - this means the client servers need just 2 SSH keys added and we manage authentication and access for the team in a central location.

<div class="note">Note: This post has been sitting in my drafts for years and I'm posting it out of posterity. We've since moved to a more robust solution which I'll blog about later</div>

This is managed by a central, private, git repository which is synced to both servers regularly - enabling addition (and revocation) of clients and staff, with a central source of truth.

Our set up was mainly based off/inspired by [Zander's Jump Host](https://zanderwork.com/blog/jump-host/) blog post.

## Setup

This assumes a **Debian** VPS server. SSH in and update the basic packages along with installing required applications

```bash
apt update && apt upgrade -y
apt install curl vim iptables fail2ban -y
```

## User creation

Next, create a baseline user with no password and create an empty `authorized_keys` file

```bash
adduser --disabled-password --gecos "" ingress
su - ingress
cd ~
mkdir .ssh
touch .ssh/authorized_keys
chmod 600 .ssh/authorized_keys
nano .ssh/authorized_keys
```

Inside `authorized_keys` file, put the keys of everyone who needs access to the jump server

## SSH Restrictions

Next step is to restrict the SSH access and disable it for root. In doing so, SSH will be disabled - ensure you have access via your hosting (they normally have a web terminal you can access)

Edit the main SSHD Config file (`/etc/ssh/sshd_config`) - we replaced the whole contents.

<details>

<summary><code>/etc/ssh/sshd_config</code></summary>

```bash
# Move SSH to a non-standard port.
Port 2233

# Increase the log verbosity
LogLevel VERBOSE

# Disable root login
PermitRootLogin no

# Enable authentication with keypairs
PubkeyAuthentication yes

# Hardcode directory used for authorized public keys (this is expanded to $HOME/.ssh/authorized_keys)
AuthorizedKeysFile .ssh/authorized_keys

# Disable host authentication
HostbasedAuthentication no

# Explicitly disable .rhosts files
IgnoreRhosts yes

# Disable password-based auth
PasswordAuthentication no

# Disable empty passwords (this doesn't really matter because we disabled password auth but extra verbosity won't hurt)
PermitEmptyPasswords no

# Disable challenge/response auth
ChallengeResponseAuthentication no

# Enable PAM modules
UsePAM yes

# Allow SSH clients to forward SSH agents to use this host as a proxy
AllowAgentForwarding yes

# Disable SSH remote forwarding
GatewayPorts no

# Disable X11 forwarding. Depending on your use case you may need to enable this.
X11Forwarding no

# Disable printing the MOTD. This can be enabled/configured to your liking.
PrintMotd no

# Accept locale variables from SSH client
AcceptEnv LANG LC_*

# Whitelist the lowpriv user. This (in combination with PermitRootLogin no) effectively disables all other users from SSHing in.
AllowUsers ingress
```

</details>

## Firewall

Next is to lock down the firewall. If your team are accessing all from a predictable set of IPs, it would be an improvement to add them here to increase the security further

```bash
touch /etc/network/if-up.d/00-firewall
chmod +x /etc/network/if-up.d/00-firewall
nano /etc/network/if-up.d/00-firewall
```

<details>

<summary><code>/etc/network/if-up.d/00-firewall</code></summary>

```bash
#!/bin/sh

#
# Firewall rules
#
iptables -P INPUT ACCEPT
iptables -P OUTPUT ACCEPT
iptables -P FORWARD ACCEPT

#
# Delete all existing rules
#
iptables -F
iptables -t nat -F
iptables -t mangle -F
iptables -X

#
# Enable free use of loopback interfaces
#
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT

#
# Allow established connections
#
iptables -A INPUT -m state --state ESTABLISHED -j ACCEPT

iptables -A INPUT -p tcp --dport 2233 -j ACCEPT

iptables -A INPUT -j DROP
```

</details>

## Prevent Brute Forcing

The next step prevents people repeatedly trying different passwords & other access

```bash
systemctl start fail2ban
systemctl enable fail2ban
nano /etc/fail2ban/jail.d/sshd.conf
```

<details>

<summary><code>/etc/fail2ban/jail.d/sshd.conf</code></summary>

```bash
[sshd]
enabled = true
port = 2233
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
findtime = 60
bantime = 1800
```

</details>

## Unattended upgrades

Installed unattended upgrades to ensure the server stays patched and up-to-date

Setup

To setup and configure

```bash
apt update && apt upgrade && apt autoclean
apt install unattended-upgrades -y
systemctl enable unattended-upgrades
systemctl start unattended-upgrades
```

Edit the config file `/etc/apt/apt.conf.d/50unattended-upgrades`

```bash
nano /etc/apt/apt.conf.d/50unattended-upgrades
```

1. Uncomment out `"origin=Debian,codename=${distro_codename}-updates";` (so it is enabled)
2. Set `Unattended-Upgrade::Mail "YOUREMAIL";` - search for Mail and set the value
3. Set `Unattended-Upgrade::Remove-Unused-Dependencies "true";`

Edit `/etc/apt/apt.conf.d/20auto-upgrades` and replace the contents with the following

```bash
nano /etc/apt/apt.conf.d/20auto-upgrades
```

```bash
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::AutocleanInterval "7";
```

Test it with 

```bash
unattended-upgrades --dry-run --debug
```

## Final checks

- Restart SSH: `/etc/init.d/ssh restart` - Can you SSH in as `ingress` user?
- Reboot the server - can you SSH in?