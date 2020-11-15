---
title: Remaking the Sass News Newsletter
published: 2016-3-7
updated: 2016-6-17
tags:
 - Web
 - Front-end Development
 - CSS
---

<p>With the weekly golden nectar of <a href="https://twitter.com/SassNews">Sass News</a> winging its way into my inbox every week, I decided to take on the challenge of giving the newsletter a facelift (if you're not subscribed and you like Sass - <a href="http://sassnews.us7.list-manage.com/subscribe?u=b4a4054cce715a3b0ae5e7d35&id=f7c505323d">you should do it</a>)</p>
<p>Many people would run away at the thought of designing and making a HTML newsletter, but I strangely enjoy it!</p>
<h3>Start with a template</h3>
<p>Mailchimp have a <em>fantastic</em> resource of <a href="https://github.com/mailchimp/Email-Blueprints">email blueprints</a> to get you started. You can pick and chose from a whole myriad of templates - with cross-client compatibility. The other sites i've often referenced and used are <a href="http://zurb.com/ink/">Zurb's Ink framework</a> and <a href="http://internations.github.io/antwort/">Antwort</a></p>
<p>With mobiles and emails taking off, responsive mailouts are paramount. No-one wants to be zooming in and out on a mobile just to read the text! </p>
<h3>Build the mail</h3>
<p>I picked the basic <a href="https://github.com/mailchimp/Email-Blueprints/blob/master/responsive-templates/base_boxed_basic_body_image_query.html">single column responsive layout</a> and started modifying colours and fonts, taking hints from the <a href="http://us7.campaign-archive1.com/?u=b4a4054cce715a3b0ae5e7d35&id=2244d26e0b">current mailout</a>. I felt the current mailout was missing emphasis on the different sections and an image to draw the user in.</p>
<p>To make sure the mailout worked with the length and type of content that Stu would be sending out, I knocked up a couple of the past ones - making sure links worked and acted as expected in all the browsers.</p>
<p>To save time, I used  <code>&lt;style&gt;</code> blocks at the top of the page while prototyping and getting the mailout looking sweet. Those that build mailouts know that Outlook (and other clients) don't play well with style blocks - preferring inline styles. Rather than going through each element and replacing the class with style tags, I used mailchimp's amazing <a href="http://templates.mailchimp.com/resources/inline-css/">css inline tool</a> - it saved an absolute ton of time!</p>
<h3>Test, test, test</h3>
<p>Once built with initial content, I ran a few inbox tests. <a href="http://putsmail.com/">Putsmail</a> is a great service for creating and sending HTML newsletters for free - It enables you to send to up to 10 accounts at a time and it's a great, easy way of checking all sorts of email clients and devices. Always measure twice cut once, just becuase the change you made will "probably work", there is nothing worse than sending a big mailout and realising you missed an <code>&lt;/a&gt;</code>. Its also a good idea to look at the statistics of previous mailouts if you can, there is no point sweating over a missing border in Outlook 2003 if only 1 person uses it.</p>
<h3>Make it dynamic</h3>
<p>If you've ever had to do regular (or even irregular) mailout creations,  you quickly realise that copying and pasting <code>&lt;td&gt;</code> is tedious, boring and sometimes dangerous. Missing that vital <code>&lt;/tr&gt;</code> can be the difference between your mailout getting 1000s of clicks and it going into spam. It also takes a long time, working out where one story starts and another ends.</p>
<p>To speed up development of the Sass newsletter, I made it dynamic - running off a <code>json</code> file so the mailout does the heavy lifting of working out where to loop stories. I have used php to convert the json into an object</p>
<p>I started off by dividing the mailout up into stories and sections - and working out where each one is: (this is <em>not</em> the actual code - just example!)</p>
<pre class="language-html">&lt;tr&gt;
    &lt;td colspan="2"&gt;
        &lt;h1&gt;[NEWSLETTER STORY]&lt;/h1&gt;
        &lt;p&gt;[INTRO TEXT]&lt;/p&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
    &lt;td colspan="2"&gt;
        &lt;h3&gt;[TITLE]&lt;/h3&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
    &lt;td&gt;
        &lt;img src="[IMAGE]"&gt;
    &lt;/td&gt;
    &lt;td&gt;
        [CONTENT]
    &lt;/td&gt;
&lt;/tr&gt;</pre>

<p>You can see - even for a basic example thats already a few lines of code! </p>
<p>Once I had separated out the newsletter into sections, I started to build the json up:</p>
<pre class="language-javascript">{
    "title" : "Welcome to Issue #17",
    "intro_text" : "This issue features fun, frolics and even more articles from Hugo!",
    "content" : [
        {
            "image" : "http://www.mikestreety.co.uk/image1.png",
            "title" : "Speak at Sassconf",
            "text" : "Got a great idea for a talk or workshop? The closing date for submissions to this years Sassconf has been extended to May 30th. "
        }, {
            "image" : "http://www.mikestreety.co.uk/image2.png",
            "title" : "Speak at Sassconf",
            "text" : "Got a great idea for a talk or workshop? The closing date for submissions to this years Sassconf has been extended to May 30th. "
        }
    ]
}</pre>

<p>We have the structure and the content - we just need to tie the two together. Saving the <code>json</code> in a separate file enables us to pull it in and decode using php.</p>
<pre class="language-php"> &lt;?php $email = json_decode(file_get_contents('content.json')); ?&gt;</pre>

<p>The variable <code>$email</code> is now an object with all the data from the file. To get the title and intro text, output the <code>title</code> and <code>intro_text</code> properties on the <code>$email</code> object:</p>
<pre class="language-php">&lt;tr&gt;
    &lt;td colspan="2"&gt;
        &lt;h1&gt;&lt;?php echo $email-&gt;title?&gt;&lt;/h1&gt;
        &lt;p&gt;&lt;?php echo $email-&gt;intro_text?&gt;&lt;/p&gt;
    &lt;/td&gt;
&lt;/tr&gt;</pre>

<p>We now have an array of stories, enabling us to just use one block of html for all the articles. As its an array, we are able to <code>foreach</code> through them:</p>
<pre class="language-php">&lt;?php foreach($email-&gt;content as $article) : ?&gt;
&lt;tr&gt;
    &lt;td colspan="2"&gt;
        &lt;h3&gt;&lt;?php echo $article-&gt;title ?&gt;&lt;/h3&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
    &lt;td&gt;
        &lt;img src="&lt;?php echo $article-&gt;image ?&gt;" alt="&lt;?php echo $article-&gt;title ?&gt;"&gt;
    &lt;/td&gt;
    &lt;td&gt;
        &lt;?php echo $article-&gt;text ?&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;?php endforeach; ?&gt;</pre>

<p>Any bugs with the news story html only needs to be adjusted once, plus if you update the article title, it will update the <code>&lt;img&gt;</code> alt tag too. From there, upadting the newsletter each week is as simple as updating the JSON and copying the compiled HTML.</p>
<h3>Example</h3>
<p>I have uploaded all the code used as a <a href="https://gist.github.com/mikestreety/f32e8e0fd98692bcc9e4">Github Gist</a>. You can also <a href="http://apps.mikestreety.co.uk/sass-news/email.php">see the final template</a>.</p>