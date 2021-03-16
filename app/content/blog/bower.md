---
title: Bower
date: 2014-05-08
updated: 2016-06-17
intro: Please note&#58; When I have written commands for terminal/command line, I have preceded them with a $. This is not to be typed but signifies a terminal command I have ...
tags:
 - Web
 - Front-end Development
 - Command Line
---

<div class="info"><strong>Please note:</strong> When I have written commands for terminal/command line, I have preceded them with a <code>$</code>. This is not to be typed but signifies a terminal command</div>

I have recently discovered the power of [Bower](http://bower.io/) - a front end package manager. Rather than having to go and find the hosted jquery link, or download the files for fancybox and copy them into my application (website), I can download them off bower.

To get bower installed, you need node. If you haven't got node - where have you been? Install bower globally:


```bash
$ npm install bower -g
```

You might need to run that with `sudo`

Once you've got that installed you need to `cd` to your directory and run:

```bash
$ bower init
```

And answer the questions it asks. Alternatively, you can make a `bower.json` yourself - the only field you need 'name', in which case, it will look like this:

```json
{
	"name": "mikestreety"
}
```

Once you have a `bower.json`, you can start installing modules. Try installing **jquery** with


```bash
$ bower install jquery --save
```

The `--save` saves the dependency to your `bower.json` meaning other developers can know what your application depends on.

Once completed, it has installed **jquery** in a `bower_components` folder. From here you can include this in your site directly (not recommended) or use a task runner such as gulp or grunt to compile it with all your other javascript files to be included.

If you wanted to use a different version of jquery (in this example 1.6), it can be changed by running:

```bash
$ bower install jquery#1.6
```

After the `#` you can specify a version, branch or commit SHA (which can be found on github).

If you need to update the library at any time, a

```bash
$ bower update
```

will do the job nicely for you!

### .gitignore

As with the **node_modules** folder, make sure you add **bower_components** to your `.gitignore` file. [Libraries should never be committed](http://www.mikestreety.co.uk/blog/ignoring-libraries-in-git) to the applications git repository. If you then pull down the code, you (or another developer) can run

```bash
$ bower install
```

to get the app dependencies.
