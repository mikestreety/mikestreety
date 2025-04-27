---
title: Using the TYPO3 redirects module to ensure your visitors don't end up at a dead-end
date: 2021-04-15
intro: With version 9, TYPO3 introduced a native redirects module - not only does it give you a place to centrally manage your redirects, it gracefully handles page renaming
canonical: https://www.liquidlight.co.uk/blog/using-the-typo3-redirects-module-to-ensure-your-visitors-dont-end-up-at-a-dead-end/
who: Liquid Light
permalink: "blog/using-the-typo3-redirects-module-to-ensure-your-visitors-dont-end-up-at-a-dead-end/"
tags:
 - Development
 - TYPO3
---

In TYPO3 v9, a new module was added - **Redirects**. This allows site-editors a central place to create, edit and remove redirects within the site. This gives the administrators the flexibilty to create redirects where they see fit, manage 404s and ensure vistors don't end up at dead ends.

It also allows you to create short URLs for campaigns - meaning you can use a consitent URL in your marketing and ensure people are landing in the right place when they visit your website.

When you login to TYPO3, you'll find the Redirects module in the sidebar. Let's walk through creating a redirect.

## Creating the redirect

<figure><img loading="lazy" class="image-embed-item" src="/assets/img/content/using-the-typo3-redirects-module-to-ensure-your-visitors-dont-end-up-at-a-dead-end/csm_typo3-redirects_4053313517.webp" width="1200" height="570" alt="Screenshot of the TYPO3 redirect module"></figure>

Once you click the **+** to create a redirect, you are presented with the screen above. Each of the fields serves a purpose explained below.

As an example, I would like to redirect `www.​liquidlight.​co.​uk/about-the-team` to `www.​liquidlight.​co.​uk/about`

### Source Domain

This is the URL you want the redirect to activate on. Next to the field is a drop-down listing all the available domains on your TYPO3 install. Unless you intend to be global, make sure you select the domain on this step. Leaving as a \* will affect all sites, which could have undesired consequences.

For our redirect we would put **www.​liquidlight.​co.​uk**

### Source

The source path is a part of the URL that comes after the domain that you want your redirect to happen on. Leaving this as a / will redirect people from your homepage - which is most likely what you don't want.

For our redirect, we would put **/about-the-team**

### Respect GET Parameters

GET parameters are extra parameters in the URL which can be used to modify the content, submit forms, or allow tracking for example. The page needs to be set up to "receive" these parameters and will present themselves as a ? and & in the URL.

It is rare you will want to enable this option, but if your Source path contains these parameters and you wish to redirect based on these then you will want it enabled.

For example, if I wanted **/about-the-team?a=1** to go to a different place than **/about-the-team?a=2** then you would enable this option.

### Is regular expression?

Regular express, or RegEx, is an advanced form of pattern matching which can be used when doing redirects. It allows repetitive, or similar, redirects which follow a template to be actioned in one record saving potentially hundreds of entries. If you find yourself entering similar Source URLs, get in touch to see if RegEx can save you some time.

For our redirect (and for the mojority of redirects) leave this option disabled.

### Target

This is where we want our redirect to go. We can paste a URL in here, if we want our redirect to go to an external URL or use the link tool to select a page in the page tree, a document or a record.

By using the link tool, we can select a page or record irrespective of the URL. This means that if our page URL changes later on (for example from **/about** to **/about-us**) the redirect will stay up-to-date.

For our redirect, I selected the **about** page in the page tree.

### Status Code HTTP Header

When a redirect happens, the website sends a HTTP code to the agent (be it a browser or search engine). This code tells the agent how to handle the redirect.

**Side note:** When any request on the web happens a HTTP code is sent to the agent. When it is successful, a 200 is sent. When a page cannot be found, a HTTP code of 404 is sent, which is why you might see “404 page not found”. Using redirects, we can avoid visitors receiving a 404 which is good for both user happiness and SEO.

The options in the Status code drop down are:

*   **301 Moved Permanently** - this is when the redirect is planned to stay. This tells Google and other search engines to update their links to the new page and browsers cache the redirect
*   **302 Found** - This is a generic “temporary” code to be used when none-others apply.
*   **303 See Other** - This is used if you are changing the “type” of request (e.g. converting a POST to a GET request). This would be rarely used within this TYPO3 module, but might be the case if you want to change a URL such as /search-for-shoes to redirect to your search page and submit the form, with the keyword of shoes.
*   **307 Temporary Redirect** - To be used if the redirect is temporary. For example, if the URL is going to redirect to a different page every other week or you are planning to use the URL for a page itself

In most cases, you will want to use either a **301** or **307** HTTP code.

### Force SSL Redirect

If your website runs on https, it has an SSL certificate installed. By enabling this option, you will be reducing the number of hops the agent has to do to get to your content. This is beneficial for both performance and SEO reasons.

For example, without this enabled, the following would happen:

1.  User goes to **(http://)www.​liquidlight.​co.​uk/about-the-team** (note the http) which redirects to
2.  **(http://)www.​liquidlight.​co.​uk/about** which redirects to
3.  **(https://)www.​liquidlight.​co.​uk/about**

With “Force SSL Redirect” enabled, the second step would be eliminated. Unless your website doesn’t run on https, we advise you to enable this option.

### Keep GET Parameters

As mentioned before, GET parameters are part of the URL and allow the website to either modify content or they can be used for tracking.

Google, for example, may add a **gclid** when people click through from adverts and Mailchimp also add GET parameters to the URL, allowing you to see where your traffic is coming from.

With this option enabled, these tracking parameters persist and we would advise enabling this option by default unless you specifically don’t want them carried across.

## Administrating the domains

Once a few domains have been made, you may lose track of what goes where. The top level “Redirects” module, allows you to search for redirects based on their source, target or http code.

From there you can preview, edit, disable (or enable) or delete the redirects. From the edit page, you can also set a start date and end time. Administrators can also see a history of the records, seeing who edited what and when.

The redirects module in TYPO3 is hugely powerful and can help you create new user flows in your website without having to restructure your website (or allowing you to restructure your website without impacting SEO). Let us know if you would like a hand in getting started with your redirects.
