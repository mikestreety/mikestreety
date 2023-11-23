Sending emails in this mad world of spam is a tricky business. Spoofing and phishing are all too common, and email providers try to be smart to it, although sometimes at the detriment to honest and "real" emails.

If your website is sending emails at all (even to you for contact form responses), it is worth considering spending time to verify that you own the domain and you are allowed to send emails from it.

**SPF**, **DKIM** and **DMARC** records all help with this and below each one is explained as to what it does and how you set it ip.

## Testing Tools

- [mail-tester](https://www.mail-tester.com/) - Send an email to get real-world data

## SPF Record

- [SPF Records explained](https://mailtrap.io/blog/spf-records-explained/)
- [SPF Tester](https://mxtoolbox.com/spf.aspx)

This is how the most common SPF record looks like:

```
v=spf1 a mx -all
```

If they use **Google Workspace** you will need to add `include:_spf.google.com`

```
v=spf1 a mx include:_spf.google.com include:mailchimpapp.net -all
```

## DMARC Record

- [DMARC wizard](https://dmarcian.com/dmarc-record-wizard/)

A good standard is something like the following:

- Target: `_dmarc.@`
- Type: `TXT`
- Record: `v=DMARC1; p=quarantine; rua=mailto:email@example.com; aspf=r;`

```
v=DMARC1; p=quarantine; pct=100; aspf=s;
```

## DKIM Record

This can only be configured if the service is using Mailgun or similar. TYPO3, by default, does not include a DKIM header.

Check with the system for instructions.

## BIMI

- [BIMI Generator & Inspector](https://bimigroup.org/bimi-generator/)
- Use a 512px square SVG for the image (the Favicon SVG is perfect)
- We don't generally have a **VMC** available

Example BIMI:

- Target: `default._bimi.@`
- Type: `TXT`
- Record: `v=BIMI1; l=https://link/to/svg;`
