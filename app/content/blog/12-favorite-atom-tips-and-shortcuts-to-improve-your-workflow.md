---
title: 12 Favorite Atom Tips and Shortcuts to Improve Your Workflow
date: 2016-05-27
updated: 2016-06-22
intro: Atom is the code editor released and maintained by the GitHub team. Released in 2014, the “Sublime Text killer” has over 1.1 million monthly users, and it’s no surprise&#58; easily ...
canonical: https://www.sitepoint.com/12-favorite-atom-tips-and-shortcuts-to-improve-your-workflow/
publication: Sitepoint
tags:
 - Web
---

<p><img src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/02/1455091612atom-logo.jpg" alt="Atom logo" width="160" class="alignright size-full wp-image-124491"></p>

<p>Atom is the code editor released and maintained by the GitHub team. Released in 2014, the “Sublime Text killer” has over <a href="http://blog.atom.io/2016/05/06/two-years-open-source.html">1.1 million monthly users</a>, and it’s no surprise: easily expandable, customizable and hackable, the IDE has become the favorite of many developers.</p>



<p>Despite its wide use, I often see competent developers taking the long way around to do things, or not knowing about its true potential. This post explores some tricks for improving your Atom workflow. I’m hoping that, by the time you’ve finished, you’ll have learned at least one new trick you can’t live without.</p>



<p><em>Note: Although this post is for Atom users, a lot of these tips and shortcuts also work in Sublime Text.</em></p>



<h2 id="tips">Tips</h2>



<p>The first stop is some general Atom tips. There are options you can enable, features the IDE has, and menu settings you never knew existed. It’s worth having a look through all the menu options &mdash; as you might spot something you never knew was there!</p>



<h3 id="multiplecursors">Multiple Cursors</h3>



<p>One of the most impressive features of Atom is its multiple cursor support. This enables to you type many things at once, on multiple lines, anywhere in the document. Just hold <strong>cmd</strong> (Mac) or <strong>ctrl</strong> (Windows/Linux) and click in every place you want to type. There are also other ways to get multiple cursors &mdash; but we’ll cover them later with keyboard shortcuts.</p>



<p><img src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/05/1464357838multcursor.gif" alt="multiple cursors" width="914" height="315" class="aligncenter size-full wp-image-131337"></p>



<h3 id="autoindent">Auto Indent</h3>



<p>One annoyance I have is when I copy code from somewhere and the indentation is all over the place. Luckily, Atom has you covered. Select the code and head to <strong>Edit &gt; Lines &gt; Auto Indent</strong>. This should copy the current indentation on the file to correct your code.</p>



<p><img src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/05/1464357903autoindent.gif" alt="auto indent" width="960" height="365" class="aligncenter size-full wp-image-131339"></p>



<p>To speed this up, I created a custom keyboard shortcut, enabling me to use <strong>Ctrl + Cmd + ]</strong> at any point. (On Windows, I would opt for <strong>Ctrl + }</strong> &mdash; which is <strong>Ctrl + Shift + ]</strong> &mdash; as <strong>Ctrl + Alt + ]</strong> is already taken.)</p>



<p>To do the same yourself, go to <strong>Atom &gt; Keymap</strong> (Mac) or <strong>File &gt; Settings &gt; Keybindings &gt; Keymap</strong> (Windows/Linux) and paste the following for Mac:</p>



<pre class=" language-javascript">&lt;code class=" language-javascript"&gt;&lt;span class="token string"&gt;'atom-text-editor'&lt;/span&gt;&lt;span class="token punctuation"&gt;:&lt;/span&gt;
    &lt;span class="token string"&gt;'ctrl-cmd-]'&lt;/span&gt;&lt;span class="token punctuation"&gt;:&lt;/span&gt; &lt;span class="token string"&gt;'editor:auto-indent'&lt;/span&gt;
&lt;/code&gt;</pre>





<p>or this for Windows/Linux:</p>



<pre class=" language-javascript">&lt;code class=" language-javascript"&gt;&lt;span class="token string"&gt;'atom-text-editor'&lt;/span&gt;&lt;span class="token punctuation"&gt;:&lt;/span&gt;
    &lt;span class="token string"&gt;'ctrl-}'&lt;/span&gt;&lt;span class="token punctuation"&gt;:&lt;/span&gt; &lt;span class="token string"&gt;'editor:auto-indent'&lt;/span&gt;
&lt;/code&gt;</pre>





<h3 id="showinvisibles">Show invisibles</h3>



<p>To make sure the document and all lines are using the correct indentation, I’ve enabled <strong>invisibles</strong> in my editor. This shows <code class=" language-javascript">···</code> for space indentation, <code class=" language-javascript">»</code> for tab and <code class=" language-javascript">¬</code> for new line characters. This helps you see exactly where you have mixed tabs and empty news filled with spaces.</p>



<p>Although it makes your screen feel “busy” to begin with, you soon get used to it, and I now find it invaluable.</p>



<p>To do this, go to <strong>Atom</strong> (Mac) or <strong>File</strong> (Windows/Linux) <strong>&gt; Preferences &gt; (Scroll Down) Show Invisibles</strong>.</p>



<p><img src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/05/1464358384invisibles-wrap.jpg" alt="preference settings" width="800" height="285" class="aligncenter size-full wp-image-131353"></p>



<h3 id="softwrap">Soft wrap</h3>



<p>I despise having to scroll left and right <em>and</em> up and down, so to make sure there’s only one direction, I’ve enabled <strong>soft wrap</strong> in Atom. This makes sure nothing goes off the edge of the screen but wraps around. If it has wrapped the line, it indents it to the same level as the previous line and replaces the line number in the gutter with a <code class=" language-javascript">·</code>.</p>



<p>To enable this option, it’s a few checkboxes down from the <strong>Show invisibles</strong> option in <strong>Atom</strong> (Mac) or <strong>File</strong> (Windows/Linux) <strong>&gt; Preferences &gt; (Scroll Down) Soft Wrap</strong>.</p>



<h3 id="charactercaseconvert">Character case convert</h3>



<p>Sometimes you have text that’s in the wrong case. You might want all uppercase, or you may need to convert a SHOUTY SENTENCE to all lowercase. Located in the <strong>Edit &gt; Text</strong> menu are some clever text manipulation tools, including <strong>Upper Case</strong> and <strong>Lower Case</strong> functions.</p>



<p><img src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/05/1464357957case.png" alt="character case conversion options" width="800" height="385" class="aligncenter size-full wp-image-131341"></p>



<h2 id="packages">Packages</h2>



<p>Packages are a compelling reason for choosing Atom. The ability to install and change anything and everything is what makes this code editor so great. I’m not about to reel off the best plugins that you <em>must</em> have installed &mdash; there are plenty of posts <a href="http://www.sitepoint.com/10-essential-atom-add-ons/">that do that already</a>.</p>



<p>Instead, I’m going to tell you to install every one that you come across, then uninstall the ones you don’t like (or add too many precious seconds to your start-up time). If you go to <strong>Settings &gt; Packages</strong> and click on an installed extension, it tells you how many milliseconds it adds to boot-up time.</p>



<p>These are a few packages that I rely on daily and that I haven’t seen listed in many other blog posts:</p>



<ul>
<li><a href="https://atom.io/packages/project-manager">Project Manager</a></li>
<li><a href="https://atom.io/packages/git-plus">Git Plus</a></li>
<li><a href="https://atom.io/packages/minimap">Minimap</a></li>
<li><a href="https://atom.io/packages/pigments">Pigments</a>.</li>
</ul>



<h2 id="keyboardshortcuts">Keyboard Shortcuts</h2>



<p>I love keyboard shortcuts. I can’t help but try and learn them all for every program I use. (There are things I do via shortcuts in Photoshop that I wouldn’t have a clue how to do any other way!) </p>



<p>Naturally, you forget the ones you don’t use, whereas the ones you use constantly get engraved in your mind. The ones I’ve listed below I tend to use <em>at least</em> once an hour. They’re lifesavers.</p>



<h3 id="duplicateline">Duplicate line</h3>



<pre class=" language-javascript">&lt;code class=" language-javascript"&gt;Cmd &lt;span class="token operator"&gt;+&lt;/span&gt; Shift &lt;span class="token operator"&gt;+&lt;/span&gt; D &lt;span class="token punctuation"&gt;(&lt;/span&gt;Mac&lt;span class="token punctuation"&gt;)&lt;/span&gt;
Ctrl &lt;span class="token operator"&gt;+&lt;/span&gt; Shift &lt;span class="token operator"&gt;+&lt;/span&gt; D &lt;span class="token punctuation"&gt;(&lt;/span&gt;Windows&lt;span class="token operator"&gt;/&lt;/span&gt;Linux&lt;span class="token punctuation"&gt;)&lt;/span&gt;&lt;/code&gt;</pre>





<p>If shortcuts got medals, this would be the one to win gold. I use this one constantly. It allows you to place your cursor anywhere on the line and duplicate it. </p>



<p><img src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/05/1464358015duplicate.gif" alt="duplicating a line" width="938" height="231" class="aligncenter size-full wp-image-131342"></p>



<p>It’s hugely helpful for duplicating CSS selectors, gradients or table cells. Of course, you can duplicate multiple lines at once, too &mdash; either by highlighting them or by using multiple cursors:</p>



<p><img src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/05/1464358060dupemult.gif" alt="duplicate multiple lines" width="935" height="323" class="aligncenter size-full wp-image-131343"></p>



<h3 id="movethecurrentlineupordown">Move the current line Up or Down</h3>



<pre class=" language-javascript">&lt;code class=" language-javascript"&gt;Cmd &lt;span class="token operator"&gt;+&lt;/span&gt; Ctrl &lt;span class="token operator"&gt;+&lt;/span&gt; Up &lt;span class="token punctuation"&gt;(&lt;/span&gt;or Down&lt;span class="token punctuation"&gt;)&lt;/span&gt; Arrow &lt;span class="token punctuation"&gt;(&lt;/span&gt;Mac&lt;span class="token punctuation"&gt;)&lt;/span&gt;
Ctrl &lt;span class="token operator"&gt;+&lt;/span&gt; Up &lt;span class="token punctuation"&gt;(&lt;/span&gt;or Down&lt;span class="token punctuation"&gt;)&lt;/span&gt; Arrow &lt;span class="token punctuation"&gt;(&lt;/span&gt;Windows&lt;span class="token operator"&gt;/&lt;/span&gt;Linux&lt;span class="token punctuation"&gt;)&lt;/span&gt;
&lt;/code&gt;</pre>





<p>This keyboard shortcut is great in conjunction with the duplicate line one above. Wherever your cursor is, this shortcut will move the current line above or below the lines around it. </p>



<p><img src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/05/1464358101move.gif" alt="moving lines up and down" width="935" height="323" class="aligncenter size-full wp-image-131345"></p>



<p>If you have selected multiple lines, it will move the whole block (and auto indent) as you move in and out of tags and brackets.</p>



<h3 id="selectthenextmatchingcharacters">Select the next matching characters</h3>



<pre class=" language-javascript">&lt;code class=" language-javascript"&gt;Cmd &lt;span class="token operator"&gt;+&lt;/span&gt; D &lt;span class="token punctuation"&gt;(&lt;/span&gt;Mac&lt;span class="token punctuation"&gt;)&lt;/span&gt;
Ctrl &lt;span class="token operator"&gt;+&lt;/span&gt; D &lt;span class="token punctuation"&gt;(&lt;/span&gt;Windows&lt;span class="token operator"&gt;/&lt;/span&gt;Linux&lt;span class="token punctuation"&gt;)&lt;/span&gt;
&lt;/code&gt;</pre>





<p>This command allows you to select the next matching word or characters to that which is highlighted. You can then (using the auto generated multiple cursors) delete, edit or update the highlighted values.</p>



<p><img src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/05/1464358146matching.gif" alt="matching characters" width="932" height="336" class="aligncenter size-full wp-image-131346"></p>



<p>This is particularly helpful if you want to update only a couple of values or properties, without resorting to find and replace.</p>



<h3 id="unselectthenextmatchingcharacters">Unselect the next matching characters</h3>



<pre class=" language-javascript">&lt;code class=" language-javascript"&gt;Cmd &lt;span class="token operator"&gt;+&lt;/span&gt; U &lt;span class="token punctuation"&gt;(&lt;/span&gt;Mac&lt;span class="token punctuation"&gt;)&lt;/span&gt;
Ctrl &lt;span class="token operator"&gt;+&lt;/span&gt; U &lt;span class="token punctuation"&gt;(&lt;/span&gt;Windows&lt;span class="token operator"&gt;/&lt;/span&gt;Linux&lt;span class="token punctuation"&gt;)&lt;/span&gt;
&lt;/code&gt;</pre>





<p>If you’re selecting the <em>next</em> matching characters, sometimes you go too far. This shortcut will <em>unselect</em> the most recently selected characters in reverse order.</p>



<p><img src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/05/1464358193unselect.gif" alt="unselect next matching character" width="932" height="336" class="aligncenter size-full wp-image-131348"></p>



<h3 id="selectallmatchingcharacters">Select all matching characters</h3>



<pre class=" language-javascript">&lt;code class=" language-javascript"&gt;Cmd &lt;span class="token operator"&gt;+&lt;/span&gt; Ctrl &lt;span class="token operator"&gt;+&lt;/span&gt; G &lt;span class="token punctuation"&gt;(&lt;/span&gt;Mac&lt;span class="token punctuation"&gt;)&lt;/span&gt;
Alt &lt;span class="token operator"&gt;+&lt;/span&gt; F3 &lt;span class="token punctuation"&gt;(&lt;/span&gt;Windows&lt;span class="token operator"&gt;/&lt;/span&gt;Linux&lt;span class="token punctuation"&gt;)&lt;/span&gt;
&lt;/code&gt;</pre>





<p>Sometimes you want to bulk edit <em>all</em> the matching characters in the document, rather than pressing <strong>Cmd/Ctrl + D</strong> for every one. This shortcut selects everything that matches what you’ve selected. (Warning: a large selection can seriously slow down Atom!)</p>



<p><img src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/05/1464358237selectall.gif" alt="select all matching characters" width="932" height="336" class="aligncenter size-full wp-image-131350"></p>



<h3 id="togglecommentsonandoff">Toggle comments (on and off)</h3>



<pre class=" language-javascript">&lt;code class=" language-javascript"&gt;Cmd &lt;span class="token operator"&gt;+&lt;/span&gt; &lt;span class="token operator"&gt;/&lt;/span&gt; &lt;span class="token punctuation"&gt;(&lt;/span&gt;Mac&lt;span class="token punctuation"&gt;)&lt;/span&gt;
Ctrl &lt;span class="token operator"&gt;+&lt;/span&gt; &lt;span class="token operator"&gt;/&lt;/span&gt; &lt;span class="token punctuation"&gt;(&lt;/span&gt;Windows&lt;span class="token operator"&gt;/&lt;/span&gt;Linux&lt;span class="token punctuation"&gt;)&lt;/span&gt;
&lt;/code&gt;</pre>





<p>There may be cases where you want to comment out a line or collections of lines. This shortcut appropriately comments out the current line (or selection of lines) with the correct commenting syntax for whatever language you are in. No longer do you need to remember your <code class=" language-javascript">&lt;span class="token operator"&gt;&lt;&lt;/span&gt;&lt;span class="token operator"&gt;!&lt;/span&gt;&lt;span class="token operator"&gt;--&lt;/span&gt;</code> or <code class=" language-javascript">&lt;span class="token operator"&gt;/&lt;/span&gt;&lt;span class="token operator"&gt;*&lt;/span&gt;</code> ever again.</p>



<p><img src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/05/1464358297comment.gif" alt="toggle comments" width="936" height="378" class="aligncenter size-full wp-image-131351"></p>



<h2 id="conclusion">Conclusion</h2>



<p>Atom is amazing, and I’m finding out new things about it every day. However, these are the shortcuts and plugins I use consistently. Do you have any favorites I haven’t covered? Let us know! </p>