---
title: Generating a Lets Encrypt SSL certificate with Cloudflare
date: 2020-04-20
updated: 2020-07-07
intro: This blog post walks through generating an SSL certificate with `certbot` from Let's Encrypt, specifically, when your DNS is with Cloudflare. For those on Cloudflare wondering why you would want ...
---

This blog post walks through generating an SSL certificate with `certbot` from Let's Encrypt, specifically, when your DNS is with Cloudflare. For those on Cloudflare wondering why you would want to generate an SSL certificate, it is if you want to run Cloudflare on "Full" SSL mode. More about the modes in my blog [What are the different SSL modes on Cloudflare?](https://www.mikestreety.co.uk/blog/what-are-the-different-ssl-modes-on-cloudflare). Alternatively, if you are using Cloudflare for just DNS or wish to have a sub-sub domain, then an SSL certificate will need to be generated for it to be available.

This post assumes you know what [SSL certificates are](https://www.cloudflare.com/learning/ssl/what-is-an-ssl-certificate/), and who [Let's Encrypt](https://letsencrypt.org/) are

Certbot generates an SSL certificate by contacting the Let's Encrypt servers for a challenge. Using the API, the challenge is then placed in your Cloudflare DNS entries as a TXT entry. The Let's Encrypt servers then accept this challenge (if the domain name matches) and issue the certificate.

## Set up the API

Before we get generating, we need to create and set up an API token so that our server can modify the DNS

Go to https://dash.cloudflare.com/profile/api-tokens

Make a new one called certbot (create custom token)

Permissions:

zone | dns | edit
zone | zone | read

Include all zones

IP Address filtering:

IP of the server

Copy the key

(run the test that is recommended to make sure the is address is right)


## Or is it

"Global API Key" when installed with:

`apt install certbot python-certbot-apache python3-certbot-dns-cloudflare`

dns_cloudflare_email = admin@liquidlight.co.uk
dns_cloudflare_api_key = ccf454044628751621a5dfc14271f98c95bbe

- - -

switch to root, make a new folder in /root/.secrets/certbot/

Make file called cloudflare.ini

with contents:

dns_cloudflare_api_token = "XXXXX"

chmod (chmod 600 .serects -r)

- - -

apt install python3-pip
pip3 install certbot
pip3 install certbot-dns-cloudflare

sudo certbot certonly \
	--dns-cloudflare --dns-cloudflare-credentials /root/.keys/cloudflare.ini \
	-d mikestreety.co.uk,*.mikestreety.co.uk --preferred-challenges dns-01


- - -

Edit apache conf file

<VirtualHost *:80>
	### Virtual host configuration ###
	ServerName mikestreety.co.uk
	ServerAlias www.mikestreety.co.uk
	VirtualDocumentRoot /var/www/mikestreety.co.uk/html

	### Redirect all traffic to HTTPS ###
	RewriteEngine On
	RewriteCond %{HTTPS} !=on
	RewriteRule ^/?(.*) https://%{SERVER_NAME}/$1 [R,L]

	### Logging ###
	LogLevel warn
	ErrorLog /var/log/apache2/error.log
	CustomLog /var/log/apache2/access.log vhost_combined
</VirtualHost>

	### SSL Proxy server ###
	SSLProxyEngine on

	ServerName {DOMAIN}
	ServerAlias *.{DOMAIN}

	SSLEngine on
	SSLCertificateFile /etc/letsencrypt/live/mikestreety/cert.pem
	SSLCertificateKeyFile /etc/letsencrypt/live/mikestreety/privkey.pem
	SSLCACertificateFile /etc/letsencrypt/live/mikestreety/chain.pem
