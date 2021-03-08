---
title: Get an 'Even' Class
date: 2011-02-16
updated: 2016-06-17
intro: This  PHP statement applies class="even" to every other element when in a loop. Since this post was originally created, CSS has somewhat evolved, allowing you to do div&#58;...
tags:
 - Web
 - PHP
---

<p>This &nbsp;PHP statement applies <code>class="even"</code> to every other element when in a loop.</p>

<p><em>Since this post was originally created, CSS has somewhat evolved, allowing you to do <code>div:nth-child(even)</code> to style every other element</em></p>





<p>I often use this on tables to get an even class to help divide up the rows, but it can also be used to add a class to the 4th item in a list (if you want to remove certain margin/padding for example).</p>





<p>To start, 'clear' <code>$i</code> and make it equal to 0. (if <code>$i</code> is already used elsewhere in your code, you can replace it with anything)</p>





<pre class="language-php">$i = 0;</pre>









<p>Then once in the loop, use/adapt the following code to achieve the desired result (have broken it up into separate lines to add comments. The single line code is included after)</p>





<pre class="language-php">&lt;?php 
     echo $i++ % 2 ?          // if $i divided by 2 has no remainder
          ' class="even"' :   // then echo this result
          '';                 // if not echo this result
?&gt;</pre>









<p>the number 2 can be replaced with what ever number item you want the class. And if you already have existing classes on your item, then remove the <em>class=""</em> and just have the class name.</p>





<p>The code as a single line:</p>





<pre class="language-php">&lt;?php echo $i++ % 2 ? ' class="even"' : ''; ?&gt;</pre>