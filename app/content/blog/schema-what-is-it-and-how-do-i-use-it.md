---
title: Schema - what is it and how do I use it?
date: 2017-10-25
updated: 2019-03-27
intro: ## What is Schema? Schema ([schema.org](http&#58;//schema.org/)) is a way of structuring your code to make your content available in a "richer" format. It allows you to provide ...
canonical: https://www.liquidlight.co.uk/blog/schema-what-is-it-and-how-do-i-use-it/
publication: Liquid Light
tags:
 - Web
 - Front-end Development
 - HTML
---

## What is Schema?

Schema ([schema.org](http://schema.org/)) is a way of structuring your code to make your content available in a "richer" format. It allows you to provide information in both human and computer, and search engine, friendly formats.

While your website content is written and crafted for your users and visitors, colloquial English can sometimes be difficult for machines to interpret - although they seem to be doing a pretty good job these days.

Using Schema markup, you are able to specifically tell search engines what particular information is relevant - for example your company address or the price and title of a product you're selling. It is also written in a language computers understand - so there is no miscommunication with the "facts".

Schema markup also allows Google to construct rich snippets - allowing your website to appear with more visual appeal and information in the search results - making you a more enticing prospect for users. Rich snippets can appear either on the side of search results or within the search listing.

For a more comprehensive introduction into Schema, [Google have written one](https://developers.google.com/search/docs/guides/intro-structured-data) themselves.

## How do I add Schema to my website?

Schema can be written in several ways: you can use HTML classes  in the Microdata format, HTML attributes conforming with RDFa standards or in a JSON object - labelled `JSON-LD`

So what could you use Schema for? Below is a list of scenarios where we have used schema markup and examples for each. At Liquid Light we prefer to use the Microdata format, so the examples below will be using that.

Schema can be nested inside of other schema, to make a richer web page. For example, the opening times and address of your business could appear inside a "Local Business" listing - to group various attributes together. Each group includes an `itemscope` attribute and an `itemtype` attribute with a link to the schema page.

Many different `itemscope` schemas can share and inherit various attributes. For example, if you are placing your address inside a `LocalBusiness` scope which already has your business name, there is no need to repeat it inside the `PostalAddress` scope.

Once you've implemented your Schema markup, make sure you run your code through the [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool/u/0/) to ensure it's been set-up correctly.

Most Schema objects inherit off of other objects. This means that although there might only be a couple of properties available for an object, the item it inherits off might have several more properties to utilise. The most popular object which gets inherited is the general sounding "[Thing](http://schema.org/Thing)".

## Examples

### Local Business {[Schema page](http://schema.org/LocalBusiness)}

Local Business is an overarching umbrella which can contain many different aspects of your schema. From contact details to reviews, the Local Business `itemtype` is crucial to adding Schema markup to your website.

<pre class="language-html"><code>&lt;div itemscope itemtype="http://schema.org/LocalBusiness"&gt;
	&lt;span itemprop="name"&gt;Liquid Light&lt;/span&gt;
&lt;/div&gt;</code></pre>
 

With the basic shell added, there are a few properties of note it might be worth considering adding: 


#### sameAs

These are links to social media networks and other sites which you have public profiles - these tell Google where else people can find you

<pre class="language-html"><code> 
&lt;link itemprop="sameAs" href="https://twitter.com/liquidlightuk"&gt;</code></pre>

#### hasMap

This links to a Google map to tell Google where to find your physical location

<pre class="language-html"><code>&lt;link itemprop="hasMap" href="https://goo.gl/maps/WoVnkKgg6w12"&gt;</code></pre>


#### telephone

The telephone number for your business

<pre class="language-html"><code>&lt;span itemprop="telephone"&gt;+44 (0) 1273 623 303&lt;/span&gt;</code></pre>

Once you have provided an all-round overview of your business, there are some more advanced Schema types which can be added to give your website more context and rich metadata.


### Opening Times {[schema page](http://schema.org/openingHours)}

Opening times need to be placed within a `LocalBusiness` scope and provide Google and other services with when your business is open. This is particularly handy if someone searches for your company and wishes to phone or visit you, as the opening times will be listed on the search result page.

Below are a few examples of how you might structure the opening times:

**Open Monday - Friday, 9am until 6pm**

<pre class="language-html"><code>&lt;div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress"&gt;
	&lt;span itemprop="name"&gt;Liquid Light&lt;/span&gt;
	&lt;span itemprop="openingHours" content="Mo,Tu,We,Th,Fr 09:00-18:00"&gt;Monday - Friday, 9am - 6pm&lt;/span&gt; 
&lt;/div&gt;</code></pre>

**Open 24/7**

<pre class="language-html"><code>&lt;div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress"&gt;
	&lt;span itemprop="name"&gt;Liquid Light&lt;/span&gt;
	&lt;time itemprop="openingHours" datetime="Mo-Su"&gt;Open 24 hours&lt;/time&gt;
&lt;/div&gt;</code></pre>

**Various opening times**

<pre class="language-html"><code>&lt;div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress"&gt;
	&lt;span itemprop="name"&gt;Liquid Light&lt;/span&gt;
	&lt;time itemprop="openingHours" datetime="Mo,Tu 10:00-13:00"&gt;Monday and Tuesday, 10am - 1pm&lt;/time&gt;
	&lt;time itemprop="openingHours" datetime="Fi-Su 11:00-14:00"&gt;Friday to Sunday, 11am - 2pm&lt;/time&gt;
&lt;/div&gt;</code></pre>

### Address {[Schema link](http://schema.org/PostalAddress)}

The address schema allows you to give a physical location to your business and can be used independently or within the LocalBusiness `itemtype`.

<pre class="language-html"><code>&lt;div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress"&gt;
	&lt;span itemprop="name"&gt;Liquid Light&lt;/span&gt;
	&lt;span itemprop="streetAddress"&gt;28 Kensington Street&lt;/span&gt;
	&lt;span itemprop="addressLocality"&gt;Brighton&lt;/span&gt;
	&lt;span itemprop="addressRegion"&gt;East Sussex&lt;/span&gt;
	&lt;span itemprop="postalCode"&gt;BN1 4AJ&lt;/span&gt;
&lt;/div&gt;</code></pre>

### People {[Schema link](http://schema.org/Person)}

The person schema is used for marking up people on your website, such as on an about or contact page. It can also be used, for example, on a film database when listing actors or on a website listing deaths and births. 

The official description is _"alive, dead, undead, or fictional"_ and, because of this, features a lot of properties!

<pre class="language-html"><code>&lt;div itemprop="customer" itemscope itemtype="http://schema.org/Person"&gt;
    &lt;h1&gt;
	    &lt;span itemprop="givenName"&gt;Mike&lt;/span&gt;
	    &lt;span itemprop="familyName"&gt;Street&lt;/span&gt;
    &lt;/h1&gt;
    &lt;h3 itemprop="jobTitle"&gt;Front-end developer&lt;/h3&gt;
&lt;/div&gt;</code></pre>

Within the person schema, you can have several schemas already covered, such as a company and/or an address. This would be placed _within_ the People scope. For example:

<pre class="language-html"><code>&lt;div itemprop="customer" itemscope itemtype="http://schema.org/Person"&gt;
	&lt;h1&gt;
		&lt;span itemprop="givenName"&gt;Mike&lt;/span&gt;
		&lt;span itemprop="familyName"&gt;Street&lt;/span&gt;
	&lt;/h1&gt;
	&lt;h3 itemprop="jobTitle"&gt;Front-end developer&lt;/h3&gt;
    
	&lt;div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress"&gt;
		&lt;span itemprop="name"&gt;Liquid Light&lt;/span&gt;
		&lt;span itemprop="streetAddress"&gt;28 Kensington Street&lt;/span&gt;
		&lt;span itemprop="addressLocality"&gt;Brighton&lt;/span&gt;
		&lt;span itemprop="addressRegion"&gt;East Sussex&lt;/span&gt;
		&lt;span itemprop="postalCode"&gt;BN1 4AJ&lt;/span&gt;
	&lt;/div&gt;
&lt;/div&gt;</code></pre>

### Reviews {[Schema link](http://schema.org/Review)}

You may wish to feature reviews on your website of either your company or products. Although Google has it's own reviewing mechanism, you are able to use your own, or a third party platform, and mark it up correctly for Google to fully understand your review ratings.

Reviews need to exist with the `itemtype` of what it is reviewing. For example, if the reviews are for your company, they should be placed within the LocalBusiness item type. However, if they are for a product, they should be within the [Product](http://schema.org/Product) schema.

Reviews can either be an individual [Review](http://schema.org/Review) or an overall rating, call [AggregateRating](http://schema.org/AggregateRating).

#### Review

Your web page can contain either one or many reviews and the markup is the same for both scenarios. Below is an example for a single review.

_Note the `Rating` and `Person` item types within the Review. These can contain any of the elements from these types._

<pre class="language-html"><code>&lt;div itemprop="review" itemscope itemtype="http://schema.org/Review"&gt;
	&lt;div itemprop="reviewRating" itemscope itemtype="http://schema.org/Rating"&gt;
		&lt;span itemprop="ratingValue"&gt;5&lt;/span&gt;
	&lt;/div&gt;

	&lt;h4 itemprop="author" itemtype="http://schema.org/Person"&gt;
		&lt;span itemprop="name"&gt;Reviewer Name&lt;/span&gt;
	&lt;/h4&gt;
		
	&lt;p itemprop="reviewBody"&gt;Review text&lt;/p&gt;

	&lt;time itemprop="datePublished" datetime="1970-01-01T12:00"&gt;2 hours ago&lt;/time&gt;
&lt;/div&gt;</code></pre>

#### AggregateRating

The `AggregateRating` provides an overall rating for the item or business being reviewed.

Although there are several attributes available for the `AggregateRating` type, there are only two which are required - the average rating value (this should be out of **5**) and the total number of reviews.

<pre class="language-html"><code>&lt;div itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating"&gt;
	&lt;strong itemprop="ratingValue"&gt;4.82&lt;/strong&gt; 
	average rating out of
	&lt;strong itemprop="ratingCount"&gt;786&lt;/strong&gt; 
	total reviews
&lt;/div&gt;</code></pre>

If the aggregate rating is not within a "Thing", you can specify   an `itemReviewed` itemtype with any attributes from the [Thing](http://schema.org/Thing) object.

- - - 

Although we've only scraped the surface of the Schema objects, I hope this article helps you get started with making your website more search-engine friendly. I also hope it helps you become familiar with the Schema markup.

Drop a comment below if you would like to see any other specific examples or have any questions!