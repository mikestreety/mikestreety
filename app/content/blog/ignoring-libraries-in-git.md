---
title: Ignoring libraries in git
published: 2016-3-7
updated: 2016-6-17
tags:
 - Web
 - Command Line
 - Git
---

<p>Far too often recently I've noticed people committing libraries and packages to their main application (website) repository.</p>

<p>If you use <a href="https://getcomposer.org/">composer</a>, <a href="http://bower.io/">bower</a>, <a href="https://npmjs.org/">npm</a> or any other dependency manager, then you don't need to commit the downloaded code. </p>



<div class="info">For those unfamiliar, Composer is a PHP dependency manager. Think of it as Bower but for programmers. Where Bower uses the <code>bower_components</code> folder, Composer uses <code>vendor</code> as its installation directory.</div>



<p>For example, your project could contain a <code>bower.json</code> file, which lists the package dependencies - there is no need to commit the <code>bower_packages</code> folder. Other developers would run <code>bower install</code> (or whatever package manager you're using) to download the latest version of the packages within the version constraints defined in the config file.</p>



<p>The other culprit is the php <code>error_log</code> this is a reference for the developer at the time, and is not welcome in a git repository.</p>



<p>As a guide - this is our base <code>.gitignore</code> file:</p>



<pre class="language-git"># Metadata files
Thumbs.db
.DS_Store
# Frontend
.sass-cache
/bootstrap/compiled.php
public/assets/**/min/*
public/assets/images/originals/*
node_modules
bower_components
# Composer
/vendor
# Misc.
error_log
robots.txt
# CMS assets
/media</pre>





<p>It includes minified files (they should be compiled and copied on deployment to avoid merge conflicts), <code>.sass-cache</code> (again, this is for the developer currently developing), the <code>robots.txt</code> file (so that the staging and live servers can have different robots files and standard mac files.</p>



<p>Think about what you commit and make sure you are only adding files to the repository that need to be there.</p>



<h3>Handy Links</h3>



<p>If you're not sure what files and folders should be in your <code>.gitignore</code> file, then using this awesome <a href="http://www.gitignore.io/"><code>.gitignore</code> website</a> you can build up your file based on the technologies using.</p>



<p>In the npm faqs, they share their opinion on committing  the <code>node_modules</code> directory; <a href="https://www.npmjs.org/doc/faq.html#Should-I-check-my-node_modules-folder-into-git">"Should I check my node_modules folder into git?"</a></p>



<p>Composer have shared their opinion on the matter: <a href="https://getcomposer.org/doc/faqs/should-i-commit-the-dependencies-in-my-vendor-directory.md">Should I commit the dependencies in my vendor directory?</a></p>



<p>Lastly, Addy Osmani shares his opinions on <a href="http://addyosmani.com/blog/checking-in-front-end-dependencies/">checking in dependencies</a></p>