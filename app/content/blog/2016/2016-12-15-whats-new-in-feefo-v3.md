---
title: What's new in Feefo v3?
date: 2016-12-15
updated: 2019-03-27
intro: Feefo, the customer feedback and review website, launched version 3 of their product at the end of September. Although customers had no choice to be updated to version 3, what does this ...
canonical: https://www.liquidlight.co.uk/blog/whats-new-in-feefo-v3/
publication: Liquid Light
permalink: "blog/whats-new-in-feefo-v3/"
tags:
 - Web
---

Feefo, the customer feedback and review website, launched version 3 of their product at the end of September. Although customers had no choice to be updated to version 3, what does this mean for users, customers and developers using the platform? 

### Review rating and calculations

The big, noticeable change for Feefo is that they’ve moved from a four point rating to a five star rating.

The four point rating ranged from two pluses, which was the highest rating, to two minuses, which was the lowest. To total score was also rated as a percentage, which has now been converted to a rating out of 5. The rating can be converted back to percentage though, if required.

Updating the results, and mapping to the new ratings is outlined on the Feefo website, but to summarise how they’ve mapped them, we’ve outlined below.

| Old Rating | New Rating |
|---|---|
| ++ | 5 stars |
| + | 4 stars |
| - | 2 stars |
| -- | 1 star |

Using a 5 star rating brings Feefo into line with the likes of reviews.co.uk, Trip Advisor, Google reviews and plenty of other review websites. We can assume they’ve made this change to make the ratings more useable, understandable and SEO friendly.

### Analytics and visual updates

Along with the review style changing, Feefo have claimed to have updated “faster access to information in real time” with regards to the analytics and insights of your reviews. This means you can get statistics and results of your reviews and ranks easier and quicker using their online dashboard.

### API Update

The most interesting aspect of the update for us is the major change in the API. Not only have they updated the templating system, they’ve made more information available to us as developers - allowing a more seamless integration into your website.

#### Template

The old v2 Feefo API used xml/xslt as a template for displaying reviews on your website. This code was very strict and rigid, and made it difficult to style and display in keeping with the design of your website. The new, version 3, API uses a language called JSON. This means they only pass us the raw data of the reviews - leaving the layout and display up to us. This allows use to use existing styles and designs to display a [seamless experience](http://www.sjahealthinsurance.com/about/testimonials/feefo-testimonials/) when reading the reviews.

#### Data

With v3, the data the API exposes is vastly superior to that of v2, allowing us to provide better context and updates to the reviews. Not only do we now get the reviewers location (if they have entered it when submitting a review) we also get any actions performed on the review after it has been submitted. The actions which we can now show on your website include:

- **Replies** - if the company replies to a review or the original review replies
- **Review rating update** - If the reviewer updates the score rating after the initial review
- **Review retitle** - If the review has updated the title/subject of their review
