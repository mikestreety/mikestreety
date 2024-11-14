---
title: thisisunsafe - how to bypass Chrome's ERR_CERT_INVALID warning
date: 2024-11-14
intro: During development or pre-launch, you may be faced with a ERR_CERT_INVALID - how do you bypass it?
tags:
 - General
---

**TL:DR;** If presented with a `NET::ERR_CERT_INVALID` Chrome error then focus the chrome window and type the letters `thisisunsafe` - the window should refresh with the website.

During a website prelaunch, you may wish to preview the new website on an existing domain. To do this, you can update your host file, flush the DNS cache and open your browser.

**Side-note:** If you are on a Mac you can do this with:

- Host file is here: `/etc/hosts`
- Flush the computer's DNS cache with: `sudo killall -HUP mDNSResponder`
- You may need to go to `chrome://net-internals/#dns` to flush Chrome's DNS

However, if the ne server is using a self-signed SSL certificate then you are often faced with something that looks like this:

![Screenshot of Chrome showing a ERR_CERT_INVALID error](/assets/img/content/thisisunsafe-how-to-bypass-chromes-errcertinvalid-warning/chrome.png)


Self-signed certificates occur when Let's Encrypt is used as the SSL provider. The most common way for Let's Encrypt to issue a certificate is to be able to access the website on the "live" domain name - which if you are previewing a new environment it won't be able to do. In which case, a self-signed certificate is often used.

Chrome, by default, prevents you from accessing sites with a self-signed or invalid SSL (blah blah, security) and, instead, displays the page shown above with no obvious way to bypass.

There is a way around this, however, by typing **thisisunsafe**.

It goes without saying (despite me now saying it), you should only do this if you trust the website and server. Using a Chrome extension like [Website IP](https://chromewebstore.google.com/detail/website-ip/ghbmhlgniedlklkpimlibbaoomlpacmk?pli=1) allows you to see which IP you are visiting to ensure it is trustworthy.

To use the "thisisunsafe" workaround

1. Click the Chrome window to ensure it is active
2. Type the letters **thisisunsafe** and wait
3. The page should refresh with your website in view

---

Reference link: [Chrome: Bypass NET::ERR_CERT_INVALID for development](https://dblazeski.medium.com/chrome-bypass-net-err-cert-invalid-for-development-daefae43eb12)
