---
title: How can I score 100 on Google PageSpeed Insights?
date: 2017-03-13
updated: 2021-03-28
intro: PageSpeed Insights (PSI) is a tool developed by Google to rank the speed of your website. There are a few things it doesn’t look out for, such as code validation or usability but it’s a good starting point at getting your site up to scratch.
canonical: https://www.liquidlight.co.uk/blog/how-can-i-score-100-on-google-pagespeed-insights/
who: Liquid Light
permalink: "blog/how-can-i-score-100-on-google-pagespeed-insights/"
tags:
 - Web
 - Google
 - Lighthouse
 - Performance
---

PageSpeed Insights (PSI) is a tool developed by Google to rank the speed of your website. There are a few things it doesn’t look out for, such as code validation or usability but it’s a good starting point at getting your site up to scratch.

The first step is to head to the [insight tool](https://developers.google.com/speed/pagespeed/insights/) and put your URL in the box. Unless you have already worked your way through the results, you will no doubt be faced with a series of errors and warnings for you to fix. Even the most popular sites could make some improvements (at the time of writing `theguardian.com` receives a 16/100 rating).

PageSpeed Insights is split into two sections - Mobile and Desktop. When measuring your site Google will access it using two different ways; a mobile-user agent and desktop-user agent. When accessing via the mobile-user agent, PSI tries to replicate mobile characteristics, such as screen size, network speed and device processing power. The desktop analysis does not take these factors into consideration and will generally produce a higher score, as page speed will not be restricted.

**So how do you go about getting the elusive 100?**

![The Guardian Website only scores 16 on PSI](/assets/img/content/how-can-i-score-100-on-google-pagespeed-insights/csm_guardian-psi_7cabe9cbe0.webp)

## Minify JavaScript, HTML and CSS

In order to make PSI happy, all your images, CSS, JavaScript and HTML need to be optimised and minified. To minify your CSS and JavaScript, you can use a build tool such as Gulp or Grunt, or there are several online tools which can do this for you. As for minifying HTML, most CMS’s provide this as a plugin (if you are using one), if not services such as Cloudflare act as a CDN and asset compressor. Alternatively desktop applications such as [ImageOptim](https://imageoptim.com/mac) exist to allow you to “preprocess” your images before being uploaded.

If there are any optimisations to be made, PSI will generate a zip file containing all the new assets for you. If you are just running this tool on a static site, download the new assets and upload them to your site.

However, chances are you are going to want to know what optimisations have been made to the assets, so you can update and re-optimise any new assets you create.

## Optimise Images

Having un-optimised images on your site can really hinder your Google PageSpeed score. The messages from Google are very unhelpful, as to what is required to “optimise” your images. We’ve spent the last few weeks ticking all the boxes and working out what is needed:

**JPEG Quality - no higher than 85%**

The compression quality of your jpeg should be no higher than 85% (for example, when saving in Photoshop). In most cases, there is no need to have it this high anyway, but make sure it does not go past this number. Our designers often mention the magic number of “51” for jpeg compression, but use your judgement as to how low you can go.

**JPEG Subsampling - use 4:2:0 (aka 2x2,1x1,1x1 or 2:1:1)**

JPEG subsampling is a topic which is not widely talked about and required a substantial amount of research before we fully understood it. This article on [Chroma-Subsampling](https://calendar.perfplanet.com/2015/why-arent-your-images-using-chroma-subsampling/) explains it better than we ever could. A tool similar to [IMGOnline](http://www.imgonline.com.ua/eng/compress-image.php) can be used to change this. Alternatively we use ImageMagick on the command line.

**Greyscale PNGs - use the right colorspace**

This one caught us out but now seems obvious. If your PNG image only uses black & white colours (e.g. is a shade of grey and features no colour) you can set it to use the  “Gray” PNG colorspace when saving.

**PNG-8 over PNG-32**

Using PNG-8 over PNG-32 is down to personal judgement. Most of the time, PNG-8 will be sufficient for what you need and the file size is normally significantly smaller. This thread on [Stack Overflow](http://stackoverflow.com/questions/22707130/what-is-difference-between-png8-and-png24) explains more. IDUX also have a [great article](http://www.idux.com/2011/02/27/what-are-index-and-alpha-transparency/) explaining alpha transparency

**Image size**

PSI won’t generally pull you up on this, but it is good practice to ensure your images are not oversized for what is required. If your image is only every used as a thumbnail, the user shouldn’t need to download a 4000px image for it.

**Image meta data**

Every image created stores several bits of meta information about itself. Storing this data increases the file size, which isn’t needed on the web. Use an image optimiser or minifier to strip out this meta data, reducing the file size of the image.

## Eliminate render-blocking JavaScript and CSS in above-the-fold content

Google PageSpeed Insights requires any render blocking assets to be located in the footer of the page (just before your closing body tag). These render blocking assets include CSS and Javascript. Be careful - there may be some inline JavaScript on your page which relies on a library (such as jQuery) to be loaded before it can be executed. If this occurs and you are unable to move the inline script, you may wish to consider implementing a “javascript [handler](http://writing.colin-gourlay.com/safely-using-ready-before-including-jquery/)” to prevent your page from failing to execute.

It may seem counter-intuitive to move your CSS to the bottom of the page as the page would have rendered the content before applying styles and the user would see a FOUC (flash of unstyled content). However, this is where critical CSS comes in. The idea behind critical CSS is to include any layout and base styling in the head of your document so the page can render a basic wireframe-esque layout before applying the full styling. The CSS in the head should be inlined (e.g. in between style tags). For example:

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<style media="screen">
			/**
			 *  Critical CSS goes here
			 */
		</style>
	</head>
	<body>
		<div class="container">

			<!-- Web page content  -->

			<link rel="stylesheet" href="/path/to/your/style.css">
			<script src="/path/to/your/script.js"></script>
		</div>
	</body>
</html>
```

There will still be a small FOUC, but it should be barely visible as long as your page is not too big. Once the site has been visited, the CSS will be cached and the FOUC will then reduce.

The thought of creating and implementing critical CSS could seem quite a task, however many tools exist these days to allow automation. There are many gulp, grunt and webpack plugins if you are using a preprocessor/build tool. Alternatively, there is a [Critical CSS Generator](https://jonassebastianohlsson.com/criticalpathcssgenerator/) website which helps you extract your critical CSS.

## Leverage browser caching and enable compression

Both browser caching and compression require a bit more technical knowledge as they need to be done on the server side. Several CMS’s have this functionality built in if you are using one, if not, then you may need to get your hands dirty. The chances are your website/server already has this set up, so you only need to worry about this if it gets flagged up.

#### Leverage browser caching

PSI requires (we believe) the caching expiry to be set to at least 2 hours. Ironically, Google Analytics get’s flagged up in this section, which you can do nothing about.

#### Enable compression

You will need to enable “gzip” compression. This serves assets up compressed (think like a zip file) which makes them smaller and quicker to download.

## Other PSI Issues to note

### Avoid landing page redirects

Ensure your page doesn’t make any immediate HTTP redirects before any content is visible. For example if your “desktop” site redirects to a “mobile”, or if your users get automatically redirected to another page when landing on the homepage.

### Prioritize visible content needs more detail

Any content “above the fold” should be able to be rendered without any additional requests.  This can be achieved by removing any render blocking CSS and JavaScript plugins at the top of the page. A classic example of this is the homepage slider - as it would need the library and images to be rendered and loaded before being initialised. This is one of the most common issues websites fall foul of.

### Reduce server response time

Resolving this is beyond the scope of the article, but essentially requires your server to have a quick TTFB (time to first byte) and able to serve the HTML for your website quicker than 200ms.

## Conclusion

If you have corrected the issues listed above, you should be somewhere closer to that perfect 100. Google class anything above 85 as a good website, so don’t fret too much if you are not quite there.

However, it’s not all as perfect as it seems: Google do seem to keep moving the goalposts with these rules, already over the last couple of months we’ve seen our scores dramatically drop as they alter some algorithms.

Getting 100 on Google Page Speed Insights is not the golden bullet. You can score top marks and still have a really slow website. If you have a JPG which is still 15mb but optimised correctly, PSI will not penalise you for it. Your CSS and JS could be several megabytes in size, but as long as it is not render blocking and minified, your overall score will be high.

Web development also moves at such a pace, that nothing seems right for long. Today's optimisations often turn into tomorrow's “hacks” (remember when it was best practice to have all your CSS in one file served at the top of your page?!). With the progression of the internet and serving up assets ever evolving (HTTP/2 for example) if you don’t keep on top of it you can soon fall behind.

At the end of the day, as long as your website is fast for the user, accessible to everyone and works consistently and doesn’t eat up data, who cares what a machine on the internet says‽

All the information mentioned in this blog in more detail can be found on the Rules page - it’s well worth having a read over to get a better understanding of what they are after.
