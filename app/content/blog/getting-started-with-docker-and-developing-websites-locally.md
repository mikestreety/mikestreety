---
title: Developing websites locally with Docker
date: 2019-02-04
updated: 2019-03-27
intro: Docker allows you to host websites locally, which allows you can develop them within an environment which can be an exact replica of the live one. This blog post explores my first experience with Docker.
tags:
 - Web
 - Command Line
 - Back-end Development
---

I've never used Docker before and found it quite daunting getting started. It is something I've had my eye on for a while for developing my personal website in a consistent environment. 

Docker can be used to create a custom environment for each project, allowing you to "spin" up services depending on your requirements. To develop this website, which runs on Craft CMS, I was after the following:

- PHP 7.2
- MySQL
- phpmyadmin

Although there were a whole host of tutorials and StackOverflow questions out there, I struggled to achieve what I wanted. Along with the above requirements, I wanted to mount the current folder - so that all the development was contained with the local git repository.

I also wanted to persist the data in the database, so I could start the docker container and the local site would be ready for development.

This blog post uses `docker-compose` functionality, which stores all the configuration in a file within the git repo.

### Getting started

The best way of getting started is to install the [Docker Desktop app](https://www.docker.com/products/docker-desktop). This installs necessary tools needed to get you started.

### Create the file

The next step is to create your docker file. In the root of your website (where the `.git` folder is) create a new file called `docker-compose.yml`

The following is my configuration in two versions. The first is uncommented and the second includes detail comments - within the comments there are several square brackets which reference further explanation afterwards..

<details>
<summary>`docker-compose.yml` <em>without</em> comments</summary>
<pre class="language-yaml">version: '3'
services:

    web:
        image: 'flipbox/php:72-apache'
        ports:
            - '80:80'
            - '443:443'
        volumes:
            - "$PWD:/var/www"
        links:
            - db
        environment:
            APACHE_DOCUMENT_ROOT: "/var/www/html"

    db:
        image: 'mysql:5.7'
        ports:
            - '3306:3306'
        environment:
            MYSQL_ROOT_PASSWORD: craft
            MYSQL_DATABASE: craft
            MYSQL_USER: craft
            MYSQL_PASSWORD: craft
        volumes:
            - db-data:/var/lib/mysql

    phpmyadmin:
        image: phpmyadmin/phpmyadmin
        ports:
            - 8181:80
        links:
            - db
        environment:
            MYSQL_ROOT_PASSWORD: craft
volumes:
    db-data:</pre>
</details>

<details>
<summary>`docker-compose.yml`  <em>with</em> comments</summary>
<pre class="language-yaml">version: '3'
services:

    ## Create the web service
    web:

        ## Use an image with PHP 7.2
        image: 'flipbox/php:72-apache'

        ## Map the ports 80 (http) and 443 (https) to standard ports
        ports:
            - '80:80'
            - '443:443'

        ## Maps the current folder to the default linux web folders [1]
        volumes:
            - "$PWD:/var/www"

        ## Use database & credentials
        links:
            - db

        ## Set the web root to the html folder inside our repo [2]
        environment:
            APACHE_DOCUMENT_ROOT: "/var/www/html"

    ## Create the db service
    db:
        ## mysql 5.7 image
        image: 'mysql:5.7'

        ## Map the default MySQL port
        ports:
            - '3306:3306'

        ## Create database, username and password
        environment:
            MYSQL_ROOT_PASSWORD: craft
            MYSQL_DATABASE: craft
            MYSQL_USER: craft
            MYSQL_PASSWORD: craft

        ## Map to a persistent volume [3]
        volumes:
            - db-data:/var/lib/mysql

    ## phpmyadmin service
    phpmyadmin:
        image: phpmyadmin/phpmyadmin

        ## Map port 8181 to the service (e.g. localhost:8181)
        ports:
            - 8181:80

        ## Use the db service
        links:
            - db

        ## Set a root user password
        environment:
            MYSQL_ROOT_PASSWORD: craft

## Placeholder for the persistent db storage [3]
volumes:
    db-data:</pre>
</details>

**[1]**  When using the standard apache settings on a linux server, the web root for the default site is located in `/var/www/web` (or `/var/www/html`). This line maps the present working directory (`pwd`- the one where your dockerfile is located) to the default `/var/www` folder.

**[2]** With the `/var/www` folder mapped to your current directory, you can then store the folder destined to be your "document root" in your git repository. This then allows you to store code out of the web root. In this example, the web root is in a `html` folder inside of my code repository. This line informs apache where to find the code for the website.

**[3]** This creates a volume for our database which persists through creation and destruction of the docker container and means you don't have to load in your database each time you start your container.

### Start your server

Once you have installed Docker Desktop and created your `docker-compose` file, you are ready to get started. Open up your terminal and navigate to the folder where your docker file is located and type:

<pre class="language-bash">$ docker up</pre>

The first time you run this command, it will download the necessary images and start your web server. You should then be able to go to `http://localhost` (or `https://localhost` for SSL site) and view the contents of your `html` folder in the browser.

To access phpmyadmin, you can add `8181` as a port at the end of the URL: `http://localhost:8181`. From here, you can login using the credentials set in the file (username and password are set as _craft_ based on the file config above) and access the database in your code.

If you would like to use `gulp` or `composer`, you can open a new terminal window, `cd` to your directory and run the commands as you have previously done.

To stop the docker process, you can press `ctrl + c` and to process will stop.

If you would like to run docker in the background, you can do so by running:

<pre class="language-bash">$ docker-compose up -d</pre>

If you have done this, you can then stop docker with:

<pre class="language-bash">$ docker-compose down</pre>

### Conclusion

Docker is a great way of making a contained local server for development which ensures consistency when setting up a development environment.

I would love to hear how you get on, or if you have any recommendations on how I can improve my docker file.