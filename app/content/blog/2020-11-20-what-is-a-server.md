---
title: "What is a server?"
date: 2020-11-20
intro: Servers power the internet and have done since the creation of it. All the websites in the world run on servers (with varying levels of web interfaces & logins). So what are they, how do they work and what do Liquid Light typically use?
canonical: https://www.liquidlight.co.uk/blog/what-is-a-server/
publication: Liquid Light
permalink: "blog/what-is-a-server/"
tags:
 - General
---

Servers power the internet and have done since the creation of it. All the websites in the world run on servers (with varying levels of web interfaces & logins). So what are they, how do they work and what do Liquid Light typically use?

You might have heard the phrase “servers are just computers”, but computers are complex devices with a huge array of hardware, applications and operating systems available. Your phone, tablet, and even fridge can be computers but they are not typically servers . It is true that servers have a motherboard, RAM and a hard disk like any computer you may be familiar with, but that is where the similarities end. 

The components which build up a server tend to be designed for the purpose of being in a server. The hard disks are built with “always-on” in mind, as a server is never shut down - it would be quite annoying if websites only worked 9-5 (although that may solve a few arguments)! They are also more resilient to power outages and hardware failure - a good server will have a constant backup of data and be kept up-to-date with bug fixes and security patches.

While you can set up a server at home to host your website, dedicated servers tend to be housed in buildings with more rigorous protocols in place. They are normally situated behind physically locked doors with rigorous security procedures in place for accessing them. The buildings also tend to have a high speed internet connection, backup power and strict health and safety regulations including fire protection.

Hardware aside, servers can run on different operating systems depending on developer/company preference and requirements. The applications/services available for each operating system tend to be universal (with a few exceptions). I’ve broken down a couple of terms and what they apply to in the world of servers:

## Operating System

Every computer needs an operating system (OS) to run & control the computer processes. This takes care of the everyday tasks and manages the software and hardware of the machine ensuring each app has resources to run. It may be there aren't enough resources for all the applications running, in which case the OS will do its best to manage what it can but ultimately applications will need to be closed, the server upgraded or the operating system will crash.

Think of it as school cook - making sure there is enough food for each child and that each child gets what they need to run. If the number of children increases, there are warnings and alerts for the “management” to buy more food or some children will go without.

Most operating systems you’ll be familiar with tend to have a Graphical User Interface (GUI). These would include Windows and OSX on your computer, iOS and Android to name a few. The GUI is responsible for showing you applications, allowing you to use keyboard, mouse or maybe your finger and making things look “pretty”.

The OS we tend to run on servers doesn’t have a GUI installed. Servers don’t tend to have any screens plugged in and, as having a GUI uses valuable resources, opt to not have this running. We want to focus as much of the resources for running the applications which serve up the website rather than “waste” them on something no-one would look at. Servers aren’t something you generally need to open and access everyday - they tend to be a “set up and run” kind of thing.

All of the managing of the server and the operating system is done via command line. This is a text-based operation (what you tend to see in films when someone is “hacking”). Using command line we can control the underlying operations of the server - it is also quicker for the server to run any operations via command line as you are using the direct commands. Every operating system has a command line which you can access (if you want). To be nitpicky, even the command line is a “GUI” as it takes human readable commands and converts them to machine code for the server to use.

The operating system we use at Liquid Light for our servers is called Debian. This is based on a more general OS called Linux (which forms the basis for a lot of operating systems including Apple’s OSX). “Fun” fact - each of the Debian operating system versions are named after Toy Story characters.

## Services/Applications

Once a server is running, the next step is to install the applications (or services) which actually serve up the website. The number of applications available for servers is huge but you only need to install the ones you want. We try to keep our servers as lean as possible, as resources are finite and we don’t want to waste them on services we don’t need.

The most important services we tend use are:

- Apache - This is the web server itself and handles the HTTP requests, this is how the server knows which page content to display when someone visits a web page
- PHP - This is the programming language we use and that all of our sites are built from. It calculates and renders based on logic and conditions
- MySQL - This is the database to our websites which is where the content is stored

As a high-level overview of what happens:

1. A user makes a request, which ends up at our server
2. Apache accepts the request and loads the correct folder
3. PHP then loads the specific components required and pulls the content from the MySQL database to create a web page which is then returned to the user

As with anything technological, sometimes the applications or services crash or “hang”. This can cause the server to stop returning content and prevent the website from working. As with all tech issues, more often than not  “turning it off and on again” will resolve the issue. The individual applications are able to be restarted without restarting the whole server.

## But what about serverless?

You may have heard of the term “serverless”. This doesn’t mean there is no server, it means that there is no server to manage. Serverless service providers offer a space for you to upload your website and they take care of the rest. The advantage being you don’t need to be a server nerd to get a website up and running, the disadvantage is you have no control over the server itself. 

At Liquid Light we have optimised and refined our processes and server requirements that require access to the underlying operating system to ensure our websites run smoothly and, most importantly, fast.

I hope that helps with understand exactly what a server is and how it works.
