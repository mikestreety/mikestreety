---
title: 'Notes #4'
date: 2020-05-18
updated: 2020-06-06
---

### Behind the Source going well

[Behind the Source](https://www.behindthesource.co.uk/) interviews are going well and are well received. Already on the third interview today and I have had nothing but positive comments. Fortunately it is all set up beforehand, so there is minimal work each week to get it live. Unfortunately, Mailchimp have taken away the scheduling for free accounts, otherwise I could do it all automated. I'm using Figma to create the social media images (if I had more than 8 interviews I would have automated this with the command line and ImageMagick).

### Apache Macros

I discovered [Apache Macros](https://httpd.apache.org/docs/2.4/mod/mod_macro.html) recently and they changed my life. They essentially allow you to "include" a template from another Apache file. To give context, I have a sever where all my sites are set up the same. The only difference between them is the location of the "site root" and where the SSL certificate lives (and a few other bits). Excuse the brevity in the examples, this is mainly for me to remember!

Using Apache Macros, I am able to add the following to a file in `/etc/apache2/conf-available`:

```
### Virtual host configuration ###
ServerName $sub.$parent
VirtualDocumentRoot /var/www/$parent/$sub.$parent/html
```

The first line declares the variable, assigns a name and sets out the variables used, while the rest is what you want to be included.

I can then "enable" that file and call it in my Apache site file, filling in the variables and making updates & new site launches _a lot_ easier (it also forces me to keep my server structured).

```
Use VHost80 www mikestreety.co.uk # www = $sub, mikestreety.co.uk = $parent
```

### email.subscribeto facelift

With Behind the Source re-energising my passion for side projects, I thought I would turn my attention back to [email.subscribeto.at](https://email.subscribeto.at/). The current tech stack was built with "prototype and push it live" in mind. I am currently in the process of re-building the backend with CraftCMS, so I am able to manage the content better and easier. So fare I've learnt a lot about extending Craft, including Twig Extensions, Behaviours and custom functions. I'll try and write a blog post about it when I understand it more!
