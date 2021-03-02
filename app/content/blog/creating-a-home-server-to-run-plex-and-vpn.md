---
title: Creating a home server to run plex and vpn
date: 2017-07-19
updated: 2017-08-09
draft: true
---

- Buy thin client
- install debian
- Installed on a hard drive, USB stick tricky.
- skipped root but made user with password
- edit /etc/sudoers (last line to stop password on sudo)
- Install packages as per previous blog post (including PHP & VIM)
- Mount network drive (/etc/fstab) `sudo apt-get install ntfs-3g -y`
- Install web browser `w3m w3m-img`

Plex:
https://support.plex.tv/hc/en-us/articles/235974187
`sudo apt-get install apt-transport-https`
`sudo apt-get install plexmediaserver`
http://192.168.0.2:32400/web/index.html

VPN: 

I use nordvpn
sudo apt-get install openvpn openssl openresolv
Follow these instructions: https://support.cyberghostvpn.com/hc/en-us/articles/213190009-How-to-configure-OpenVPN-for-Linux-Debian-Terminal- and https://nordvpn.com/tutorials/linux/openvpn/
Created a folder somewhere
Downloaded nord stuff
Found and replaced: 
`perl -pi -w -e 's/auth-user-pass/auth-user-pass \/home\/vpn\/client\/NordVPN_cred.txt/g;' ./NordVPN/*.ovpn`


Updated URLs in conf to be absolute, then symlinked from `/etc/default/openvpn`
in `/etc/openvpn`
`sudo update-rc.d openvpn enable`
Test with `w3m https://dnsleaktest.com/`

VPN Server

https://www.digitalocean.com/community/tutorials/how-to-set-up-an-openvpn-server-on-debian-8
During this `ufw` is installed - more here: http://helpdeskgeek.com/linux-tips/common-configuration-rules-for-ufw-firewall-in-linux/

https://www.linode.com/docs/networking/vpn/set-up-a-hardened-openvpn-server

Debugging: `sudo tail -f /var/log/syslog | grep vpn`

Transmission:

sudo apt-get install transmission-cli transmission-common transmission-daemon
sudo service transmission-daemon stop
sudo vim /etc/transmission-daemon/settings.json
- disable rpc-authentication-required
- disable rpc-whitelist-enabled
- update `download-dir`
- update and enable `incomplete dir`
sudo service transmission-daemon start

If you wish to run it as a different user:

`sudo service transmission-daemon stop`
`sudo vim /etc/init.d/transmission-daemon` - change user at the top 
`sudo cp /etc/transmission-daemon/settings.json /var/lib/transmission-daemon/settings.json`
`sudo rm /etc/transmission-daemon/settings.json`
`sudo rm /var/lib/transmission-daemon/.config/transmission-daemon`
`ln -s /var/lib/transmission-daemon/settings.json /etc/transmission-daemon/settings.json`
`ln -s /var/lib/transmission-daemon/settings.json /var/lib/transmission-daemon/.config/transmission-daemon`
`sudo chown -R user:group /var/lib/transmission-daemon/`
`sudo chown -R user:group /etc/transmission-daemon/`
sudo mkdir -p /etc/systemd/system/transmission-daemon.service.d
sudo vi /etc/systemd/system/transmission-daemon.service.d/run-as-user.conf
```
[Service]
User=codon
```
`sudo vim /etc/init/transmission-daemon.conf`
Change setgid && setuid
`sudo service transmission-daemon start`

Nextcloud:

https://linuxconfig.org/how-to-install-nextcloud-on-debian-9-stretch-linux
` sudo ufw allow 80`
Change apache user - sudo vim /etc/apache2/envvars
https://docs.nextcloud.com/server/12/admin_manual/configuration_server/harden_server.html

Generate an SSL key

sudo certbot --manual certonly --preferred-challenges=dns
crontab -e