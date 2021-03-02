---
title: Useful command line MySQL commands
date: 2020-07-05
updated: 2020-07-06
intro: It seems I have been doing a lot of command line work on Debian with MySQL recently and have been having to search the internet (or my bash history) every time I need to do something. Here is a collection of commands I have been using
tags:
 - Web
 - Command Line
 - Back-end Development
---

It seems I have been doing a lot of command line work on Debian with MySQL recently and have been having to search the internet (or my bash history) every time I ﻿need to do something. Here is a collection of commands I ﻿have been using.

<div class="info">I have included "variables" within <code>{curly_brackets}</code> - these need to be replaced with database names/usernames/passwords (including the brackets)</div>

## MySQL Console

The following commands are to be run in the `mysql` console (e.g. `sudo mysql`)

### Show all the databases 

<pre class="language-sql">show databases;</pre>

### Create a database

<pre class="language-sql">CREATE DATABASE {db_name} CHARACTER SET utf8 COLLATE utf8_general_ci;</pre>

### Create a user and allow access to database

Be sure to include the single quotes around ` {user_name}`, `localhost` and the password

<pre class="language-sql">GRANT ALL PRIVILEGES ON {db_name}.* TO ' {user_name}'@'localhost' IDENTIFIED BY '{password}';
FLUSH PRIVILEGES;</pre>

### Delete a database

<pre class="language-sql">DROP DATABASE {db_name};</pre>

## Bash commands
 
These commands are run on your bash shell

### Insert SQL dump from a file

The command assumes your file is called `db.sql`. The `-p` will ensure the prompt asks for your user SQL password.

<pre class="language-bash">mysql {db_name} -u {user_name} -p &lt; db.sql</pre>

### Dump a database to a file

This exports a database to a SQL file, so it can be imported (or used as a backup)

<pre class="language-bash"> sudo mysqldump -u {user_name} -p {db_name}  {optional: table} &gt; db.sql</pre>

You can also specify one table with the above command, or chose to ignore a table. `{option: table}` can either be:

- **Excluded:** Don't put anything here
- **Specify table name:** If you put the name of the table, it will only dump this one. For example: if my database was called `cms` and I had a table called `content`, the command would be `sudo mysqldump -u {user_name} -p cms content`
- **Ignore a table:** When ignoring a table, you need to specify the database `--ignore-table={db_name}.{table_name}`. For example, if I wanted to dump the whole database _except_ the content table, I could run: `sudo mysqldump -u {user_name} -p cms --ignore-table=cms.content`