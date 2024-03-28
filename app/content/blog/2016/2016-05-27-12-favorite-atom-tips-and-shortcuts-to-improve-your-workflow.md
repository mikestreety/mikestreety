---
title: 12 favourite atom tips and shortcuts to improve your workflow
date: 2016-05-27
updated: 2021-03-17
intro: Atom is a fantastic IDE and is hugely powerful. I share my favourite, time-saving tips, packages and shortcuts for GitHub's Atom code editor.
canonical: https://www.sitepoint.com/12-favorite-atom-tips-and-shortcuts-to-improve-your-workflow/
publication: Sitepoint
permalink: "blog/12-favorite-atom-tips-and-shortcuts-to-improve-your-workflow/"
tags:
 - Web
 - IDE
 - External
---

Atom is the code editor released and maintained by the GitHub team. Released in 2014, the “Sublime Text killer” has over [1.1 million monthly users](http://blog.atom.io/2016/05/06/two-years-open-source.html), and it’s no surprise: easily expandable, customizable and hackable, the IDE has become the favourite of many developers.

Despite its wide use, I often see competent developers taking the long way around to do things, or not knowing about its true potential. This post explores some tricks for improving your Atom workflow. I’m hoping that, by the time you’ve finished, you’ll have learned at least one new trick you can’t live without.

_Note: Although this post is for Atom users, a lot of these tips and shortcuts also work in Sublime Text._

## Tips

The first stop is some general Atom tips. There are options you can enable, features the IDE has, and menu settings you never knew existed. It’s worth having a look through all the menu options — as you might spot something you never knew was there!

### Multiple Cursors

One of the most impressive features of Atom is its multiple cursor support. This enables to you type many things at once, on multiple lines, anywhere in the document. Just hold **cmd** (Mac) or **ctrl** (Windows/Linux) and click in every place you want to type. There are also other ways to get multiple cursors — but we’ll cover them later with keyboard shortcuts.

![multiple cursors](/assets/img/content/atom-tips/1464357838multcursor.gif)

### Auto Indent

One annoyance I have is when I copy code from somewhere and the indentation is all over the place. Luckily, Atom has you covered. Select the code and head to **Edit > Lines > Auto Indent**. This should copy the current indentation on the file to correct your code.

![auto indent](/assets/img/content/atom-tips/1464357903autoindent.gif)

To speed this up, I created a custom keyboard shortcut, enabling me to use **Ctrl + Cmd + \]** at any point. (On Windows, I would opt for **Ctrl + }** — which is **Ctrl + Shift + \]** — as **Ctrl + Alt + \]** is already taken.)

To do the same yourself, go to **Atom > Keymap** (Mac) or **File > Settings > Keybindings > Keymap** (Windows/Linux) and paste the following for Mac:

```
'atom-text-editor':
    'ctrl-cmd-]': 'editor:auto-indent'
```

or this for Windows/Linux:

```
'atom-text-editor':
    'ctrl-}': 'editor:auto-indent'
```

### Show invisibles

To make sure the document and all lines are using the correct indentation, I’ve enabled **invisibles** in my editor. This shows `···` for space indentation, `»` for tab and `¬` for new line characters. This helps you see exactly where you have mixed tabs and empty news filled with spaces.

Although it makes your screen feel “busy” to begin with, you soon get used to it, and I now find it invaluable.

To do this, go to **Atom** (Mac) or **File** (Windows/Linux) **\> Preferences > (Scroll Down) Show Invisibles**.

![preference settings](/assets/img/content/atom-tips/1464358384invisibles-wrap.webp)

### Soft wrap

I despise having to scroll left and right _and_ up and down, so to make sure there’s only one direction, I’ve enabled **soft wrap** in Atom. This makes sure nothing goes off the edge of the screen but wraps around. If it has wrapped the line, it indents it to the same level as the previous line and replaces the line number in the gutter with a `·`.

To enable this option, it’s a few checkboxes down from the **Show invisibles** option in **Atom** (Mac) or **File** (Windows/Linux) **\> Preferences > (Scroll Down) Soft Wrap**.

### Character case convert

Sometimes you have text that’s in the wrong case. You might want all uppercase, or you may need to convert a SHOUTY SENTENCE to all lowercase. Located in the **Edit > Text** menu are some clever text manipulation tools, including **Upper Case** and **Lower Case** functions.

![character case conversion options](/assets/img/content/atom-tips/1464357957case.webp)

## Packages

Packages are a compelling reason for choosing Atom. The ability to install and change anything and everything is what makes this code editor so great. I’m not about to reel off the best plugins that you _must_ have installed — there are plenty of posts [that do that already](https://www.sitepoint.com/10-essential-atom-add-ons/).

Instead, I’m going to tell you to install every one that you come across, then uninstall the ones you don’t like (or add too many precious seconds to your start-up time). If you go to **Settings > Packages** and click on an installed extension, it tells you how many milliseconds it adds to boot-up time.

These are a few packages that I rely on daily and that I haven’t seen listed in many other blog posts:

- [Project Manager](https://atom.io/packages/project-manager)
- [Git Plus](https://atom.io/packages/git-plus)
- [Minimap](https://atom.io/packages/minimap)
- [Pigments](https://atom.io/packages/pigments).

## Keyboard Shortcuts

I love keyboard shortcuts. I can’t help but try and learn them all for every program I use. (There are things I do via shortcuts in Photoshop that I wouldn’t have a clue how to do any other way!)

Naturally, you forget the ones you don’t use, whereas the ones you use constantly get engraved in your mind. The ones I’ve listed below I tend to use _at least_ once an hour. They’re lifesavers.

### Duplicate line

```
Cmd + Shift + D (Mac)
Ctrl + Shift + D (Windows/Linux)
```

If shortcuts got medals, this would be the one to win gold. I use this one constantly. It allows you to place your cursor anywhere on the line and duplicate it.

![duplicating a line](/assets/img/content/atom-tips/1464358015duplicate.gif)

It’s hugely helpful for duplicating CSS selectors, gradients or table cells. Of course, you can duplicate multiple lines at once, too — either by highlighting them or by using multiple cursors:

![duplicate multiple lines](/assets/img/content/atom-tips/1464358060dupemult.gif)

### Move the current line Up or Down

```
Cmd + Ctrl + Up (or Down) Arrow (Mac)
Ctrl + Up (or Down) Arrow (Windows/Linux)
```

This keyboard shortcut is great in conjunction with the duplicate line one above. Wherever your cursor is, this shortcut will move the current line above or below the lines around it.

![moving lines up and down](/assets/img/content/atom-tips/1464358101move.gif)

If you have selected multiple lines, it will move the whole block (and auto indent) as you move in and out of tags and brackets.

### Select the next matching characters

```
Cmd + D (Mac)
Ctrl + D (Windows/Linux)
```

This command allows you to select the next matching word or characters to that which is highlighted. You can then (using the auto generated multiple cursors) delete, edit or update the highlighted values.

![matching characters](/assets/img/content/atom-tips/1464358146matching.gif)

This is particularly helpful if you want to update only a couple of values or properties, without resorting to find and replace.

### Unselect the next matching characters

```
Cmd + U (Mac)
Ctrl + U (Windows/Linux)
```

If you’re selecting the _next_ matching characters, sometimes you go too far. This shortcut will _unselect_ the most recently selected characters in reverse order.

![unselect next matching character](/assets/img/content/atom-tips/1464358193unselect.gif)

### Select all matching characters

```
Cmd + Ctrl + G (Mac)
Alt + F3 (Windows/Linux)
```

Sometimes you want to bulk edit _all_ the matching characters in the document, rather than pressing **Cmd/Ctrl + D** for every one. This shortcut selects everything that matches what you’ve selected. (Warning: a large selection can seriously slow down Atom!)

![select all matching characters](/assets/img/content/atom-tips/1464358237selectall.gif)

### Toggle comments (on and off)

```
Cmd + / (Mac)
Ctrl + / (Windows/Linux)
```

There may be cases where you want to comment out a line or collections of lines. This shortcut appropriately comments out the current line (or selection of lines) with the correct commenting syntax for whatever language you are in. No longer do you need to remember your `<!--` or `/*` ever again.

![toggle comments](/assets/img/content/atom-tips/1464358297comment.gif)

## Conclusion

Atom is amazing, and I’m finding out new things about it every day. However, these are the shortcuts and plugins I use consistently. Do you have any favourites I haven’t covered? Let us know!
