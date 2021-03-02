---
title: Wordpress - Pulling An Archive
date: 2016-03-07
updated: 2020-04-15
intro: As I mentioned in my first post I have made an archive of my previous Wordpress blog posts into a static page. This is done through some SQL and ...
tags:
 - Web
 - PHP
---

<p>As I mentioned in my <a href="/blog/starting-afresh-starting-anew">first post</a> I have made an archive of my previous Wordpress blog posts into a static page. This is done through some&nbsp;SQL and PHP.<br></p>
<p><em><strong>note:</strong> There may be better ways to do this - I am not a back end developer</em></p>
<p>Wordpress is complex and heavy (but brilliant), it saves every draft you've ever made of a post and bloats the database because of this. All I wanted was to list out the posts I had written and store them on a page, so that if on the off chance, someone wanted some information - it was all there (also I wanted to store my content for SEO reasons!).</p>
<p>To separate the posts out from the Anchor CMS posts and the Wordpress posts, I wanted to isolate them to their own table (also, all the fields would be different). To do this, I ran an&nbsp;SQL command in Sequel Pro and export the result.</p>
<pre class="language-sql">SELECT * 
FROM  `wp_posts` 
WHERE  `post_status` =  'publish'
AND  `post_type` !=  'page';</pre>
<p>To simplify this command, what it's doing is pulling all the published posts which are not pages. This cuts out all the backs up and other bloat which is in the posts table.</p>
<p>From here, the result was imported into a new table titled <strong>old_posts</strong> which now resides in my Anchor CMS database. In a new php page, I use the code below to connect to the table and pull out the results:</p>
<pre class="language-php">&lt;?php
    $user="DATABASE_USERNAME";
    $password="PASSWORD";
    $database="DATABASE_NAME";
    $connection=mysql_connect('localhost',$user,$password);
    @mysql_select_db($database) or die( "Unable to select database");
    $query="SELECT * FROM `old_posts` ORDER by `post_date` desc";
    $result=mysql_query($query) or die(mysql_error());
?&gt;</pre>
<p>To display the posts, you now just need to loop through the results with a while php command.</p>
<pre class="language-php">&lt;?php while($row =  mysql_fetch_assoc($result)) : ?&gt;
    &lt;article&gt;
        &lt;h1&gt;&lt;?=$row["post_title"];?&gt;&lt;/h1&gt;
        &lt;div class="date"&gt;Written on &lt;?=date('jS F Y', strtotime($row["post_date"]))?&gt;&lt;/div&gt;
        &lt;?=wpautop($row["post_content"])?&gt;
    &lt;/article&gt;
&lt;?php endwhile; ?&gt;</pre>
<p>The keen eyed will notice that the content is being output through a function. This function was taken from Wordpress' core, so that the double lines get converted to <code>&lt;p&gt;</code> tags - something which <code>&lt;?=the_content()?&gt;</code> passes through. More details about the <code>wpautop</code> function, can be found in the <a href="http://codex.wordpress.org/Function_Reference/wpautop">codex</a>.</p>
<p>As I said, this is not the most elegant way of doing it, but it works and means that my Wordpress posts have not been lost.</p>