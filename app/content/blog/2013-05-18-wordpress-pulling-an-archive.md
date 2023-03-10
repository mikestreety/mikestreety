---
title: Wordpress - Pulling An Archive
date: 2013-05-18
updated: 2020-04-15
intro: As I mentioned in my first post I have made an archive of my previous Wordpress blog posts into a static page. This is done through some SQL and ...
permalink: "blog/wordpress-pulling-an-archive/"
tags:
 - Web
 - PHP
 - Wordpress
---

As I mentioned in my [first post](/blog/starting-afresh-starting-anew/) I have made an archive of my previous Wordpress blog posts into a static page. This is done through some SQL and PHP.

_**note:** There may be better ways to do this - I am not a back end developer_

Wordpress is complex and heavy (but brilliant), it saves every draft you've ever made of a post and bloats the database because of this. All I wanted was to list out the posts I had written and store them on a page, so that if on the off chance, someone wanted some information - it was all there (also I wanted to store my content for SEO reasons!).

To separate the posts out from the Anchor CMS posts and the Wordpress posts, I wanted to isolate them to their own table (also, all the fields would be different). To do this, I ran an SQL command in Sequel Pro and export the result.

```sql
SELECT *
FROM  `wp_posts`
WHERE  `post_status` =  'publish'
AND  `post_type` !=  'page';
```

To simplify this command, what it's doing is pulling all the published posts which are not pages. This cuts out all the backs up and other bloat which is in the posts table.

From here, the result was imported into a new table titled **old_posts** which now resides in my Anchor CMS database. In a new php page, I use the code below to connect to the table and pull out the results:

```php
<?php
    $user="DATABASE_USERNAME";
    $password="PASSWORD";
    $database="DATABASE_NAME";
    $connection=mysql_connect('localhost',$user,$password);
    @mysql_select_db($database) or die( "Unable to select database");
    $query="SELECT * FROM `old_posts` ORDER by `post_date` desc";
    $result=mysql_query($query) or die(mysql_error());
?>
```

To display the posts, you now just need to loop through the results with a while php command.

```php
<?php while($row =  mysql_fetch_assoc($result)) : ?>
    <article>
        <h1><?=$row["post_title"];?></h1>
        <div class="date">Written on <?=date('jS F Y', strtotime($row["post_date"]))?></div>
        <?=wpautop($row["post_content"])?>
    </article>
<?php endwhile; ?>
```

The keen eyed will notice that the content is being output through a function. This function was taken from Wordpress' core, so that the double lines get converted to `<p>` tags - something which `<?=the_content()?>` passes through. More details about the `wpautop` function, can be found in the [codex](https://developer.wordpress.org/reference/functions/wpautop/).

As I said, this is not the most elegant way of doing it, but it works and means that my Wordpress posts have not been lost.
