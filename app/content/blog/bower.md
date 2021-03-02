---
title: Bower
date: 2016-03-07
updated: 2016-06-17
intro: Please note&#58; When I have written commands for terminal/command line, I have preceded them with a $. This is not to be typed but signifies a terminal command I have ...
tags:
 - Web
 - Front-end Development
 - Command Line
---

<div class="info"><strong>Please note:</strong> When I have written commands for terminal/command line, I have preceded them with a <code>$</code>. This is not to be typed but signifies a terminal command</div>
<p>I have recently discovered the power of <a href="http://bower.io/">Bower</a> - a front end package manager. Rather than having to go and find the hosted jquery link, or download the files for fancybox and copy them into my application (website), I can download them off bower.</p>
<p>To get bower installed, you need node. If you haven't got node - where have you been? Install bower globally:</p>
<pre class="language-bash">$ npm install bower -g</pre>

<p>You might need to run that with <code>sudo</code></p>
<p>Once you've got that installed you need to <code>cd</code> to your directory and run:</p>
<pre class="language-bash">$ bower init</pre>

<p>And answer the questions it asks. Alternatively, you can make a <code>bower.json</code> yourself - the only field you need 'name', in which case, it will look like this:</p>
<pre class="language-json">{
  "name": "mikestreety"
}</pre>

<p>Once you have a <code>bower.json</code>, you can start installing modules. Try installing <strong>jquery</strong> with </p>
<pre class="language-bash">$ bower install jquery --save</pre>

<p>The <code>--save</code> saves the dependency to your <code>bower.json</code> meaning other developers can know what your application depends on.</p>
<p>Once completed, it has installed <strong>jquery</strong> in a <code>bower_components</code> folder. From here you can include this in your site directly (not recommended) or use a task runner such as gulp or grunt to compile it with all your other javascript files to be included.</p>
<p>If you wanted to use a different version of jquery (in this example 1.6), it can be changed by running:</p>
<pre class="language-bash">$ bower install jquery#1.6</pre>

<p>After the <code>#</code> you can specify a version, branch or commit SHA (which can be found on github).</p>
<p>If you need to update the library at any time, a </p>
<pre class="language-bash">$ bower update</pre>

<p>will do the job nicely for you!</p>
<h3>.gitignore</h3>
<p>As with the <strong>node_modules</strong> folder, make sure you add <strong>bower_components</strong> to your <code>.gitignore</code> file. <a href="http://www.mikestreety.co.uk/blog/ignoring-libraries-in-git">Libraries should never be committed</a> to the applications git repository. If you then pull down the code, you (or another developer) can run</p>
<pre class="language-bash">$ bower install</pre>

<p>to get the app dependencies.</p>