---
title: Working with Cloudflare's Universal SSL
intro: Some learnings and links from my recent expedition into the realm of Universal SSL certificates from Cloudflare
tags:
  - Cloudflare
---

I was recently working on a Cloudflare setup for a client who was using a [partial CNAME setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/setup/). Because of the setup and to avoid any delays, we purchased an advanced certificate to cover the SSL requirements for launch. Now the site is live, we are looking into using the Universal certificate to avoid the extra maintenance and cost.

Below are a few related commands, settings & links I found in my discovery of understanding how the Universal Certificate works

## CAA Records

CAA records are DNS entries which specify which certificate authorities can issue certificates for your domains. If one doesn't exist, anyone can do it (but you do need access to the server or DNS to authorise) but adding any CAA record restricts generation to the listed services.

Cloudflare use 4 different [certificate authorities](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/limitations/#certificate-authority) for it's SSL generation and you have no choice as to which one it uses

> For Universal SSL certificates, Cloudflare chooses the certificate authority (CA) used for your certificate.
>
> Cloudflare can change the certificate authority without prior notification, and will not send any notification as the change happens.
>
> If you want to choose the issuing certificate authority, order an advanced certificate.

This means you have to add all 4 authorities as [CAA records](https://developers.cloudflare.com/ssl/reference/certificate-authorities/#caa-records) to your DNS if you wish to have this extra layer of protection.

Set the `Flag` to `0` and the `tag`/`type` to `issue` for each of the following records:

| Certificate authority | CAA record content |
|---|---|
| Let's Encrypt | `letsencrypt.org` |
| Google Trust Services | `pki.goog; cansignhttpexchanges=yes` |
| SSL.com | `ssl.com` |
| Sectigo | `sectigo.com` |


## Changing the verification type

For the Universal SSL, you can either use TXT or HTTP depending on your setup or access you may wish to change the method. Unfortunately, the only way to change the method is via the API rather than being able to do it via the UI. it also takes a few steps to gather the information.

### Get universal SSL status

First step is to check the Universal SSL is enabled - you can do this [via the UI](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/enable-universal-ssl/) or with [the API](https://developers.cloudflare.com/api/resources/ssl/subresources/universal/subresources/settings/methods/edit/)

```bash
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/universal/settings \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
      "enabled": true
    }'
```

### List the certification packs

Before you can change the verification type, you need to get the `cert_pack_uuid` of each domain via the API. This is done by calling the [SSL verification details](https://developers.cloudflare.com/api/resources/ssl/subresources/verification/methods/get/) endpoint

```bash
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/verification \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

### Modify the verification type

Armed with the `cert_pack_uuid`, you can then edit the SSL [certificate pack validation method](https://developers.cloudflare.com/api/resources/ssl/subresources/verification/methods/edit/). This needs to be called for each of the domains (and sub-domains if using the CNAME/partial setup)

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/verification/$CERTIFICATE_PACK_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
      "validation_method": "txt"
    }'
```

The `validation_method` can be either `txt` or `http` for Universal SSLs.
