---
title: '#4'
date: 2020-05-18
updated: 2020-06-06
tags:
  - Notes
---

<h3>Behind the Source going well</h3>
<p><a href="https://www.behindthesource.co.uk/">Behind the Source</a> interviews are going well and are well received. Already on the third interview today and I have had nothing but positive comments. Fortunately it is all set up beforehand, so there is minimal work each week to get it live. Unfortunately, Mailchimp have taken away the scheduling for free accounts, otherwise I could do it all automated. I'm using Figma to create the social media images (if I had more than 8 interviews I would have automated this with the command line and ImageMagick).</p>
<h3>Apache Macros</h3>
<p>I discovered <a href="https://httpd.apache.org/docs/2.4/mod/mod_macro.html">Apache Macros</a> recently and they changed my life. They essentially allow you to "include" a template from another Apache file. To give context, I have a sever where all my sites are set up the same. The only difference between them is the location of the "site root" and where the SSL certificate lives (and a few other bits). Excuse the brevity in the examples, this is mainly for me to remember!</p>
<p>Using Apache Macros, I am able to add the following to a file in <code>/etc/apache2/conf-available</code>:</p>
<pre class="language-bash"><Macro VHost80 $sub $parent>
    ### Virtual host configuration ###
    ServerName $sub.$parent
    VirtualDocumentRoot /var/www/$parent/$sub.$parent/html
</Macro></pre>
<p>The first line declares the variable, assigns a name and sets out the variables used, while the rest is what you want to be included.</p>
<p>I can then "enable" that file and call it in my Apache site file, filling in the variables and making updates & new site launches <em>a lot</em> easier (it also forces me to keep my server structured).</p>
<pre class="language-bash"><VirtualHost *:80>
    Use VHost80 www mikestreety.co.uk # www = $sub, mikestreety.co.uk = $parent
</VirtualHost></pre>
<h3>email.subscribeto facelift</h3>
<p>With Behind the Source re-energising my passion for side projects, I thought I would turn my attention back to <a href="https://email.subscribeto.at/">email.subscribeto.at</a>. The current tech stack was built with "prototype and push it live" in mind. I am currently in the process of re-building the backend with CraftCMS, so I am able to manage the content better and easier. So fare I've learnt a lot about extending Craft, including Twig Extensions, Behaviours and custom functions. I'll try and write a blog post about it when I understand it more!<em></em></p>
