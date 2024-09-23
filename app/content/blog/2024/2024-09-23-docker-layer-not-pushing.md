---
title: Fixing a failing Docker layer
intro: I was experiencing a failing Docker push with one layer constantly timing out and retrying
tags:
  - Docker
---

## TL:DR;

**Problem**: I was getting a failing layer push to a Docker registry, even when the image was built without a cache.

**Solution**: It ended up being a layer which was too big and timing out - I identified the problem layer with [Dive](https://github.com/wagoodman/dive) and split out my `RUN` instructions.

---

## Too Long _Did_ Read

Recently, on a project which deploys via Docker, I started getting a Docker layer which wouldn't push. Nothing significant had changed with the Docker file, image or the base files in the repository.

It manifested itself in the logs (both locally and via Gitlab CI) with a forever looping retry:

```bash
ec7ca1533d1c: Retrying in 5 seconds
ec7ca1533d1c: Retrying in 4 seconds
ec7ca1533d1c: Retrying in 3 seconds
ec7ca1533d1c: Retrying in 2 seconds
ec7ca1533d1c: Retrying in 1 second
ec7ca1533d1c: Retrying in 10 seconds
ec7ca1533d1c: Retrying in 9 seconds
ec7ca1533d1c: Retrying in 8 seconds
ec7ca1533d1c: Retrying in 7 seconds
ec7ca1533d1c: Retrying in 6 seconds
ec7ca1533d1c: Retrying in 5 seconds
ec7ca1533d1c: Retrying in 4 seconds
ec7ca1533d1c: Retrying in 3 seconds
ec7ca1533d1c: Retrying in 2 seconds
ec7ca1533d1c: Retrying in 1 second
```

Each time it got down to 1 second a failed, the starting number would increase. Eventually, the whole process failed.

I originally thought it would be a caching issue, so I cleared CI caches, removed remote containers & built my image with the `--no-cache` option on the CLI. However, none of this seemed to make a difference.

Speaking to a colleague, he mentioned it was often **layer size** which timed out and prevented pushing. Upon doing research, I found a tool called Dive, which allowed you to inspect each layer (and the filesystem differences) of a Docker image: [See Dive on Github](https://github.com/wagoodman/dive).

It took me a while to identify the problem layer, as the order they appeared in the logs was not necessarily the order they were built. I also hadn't clocked that the first 12 characters in the logs were the **first 12 characters of the sha256 hash** of each layer. It seems obvious now, but when you're in the rage haze, it was easy to overlook.

Dive lists out the "Digest" (sha256) of each layer and I found that if you had the first 12 characters in the terminal search, they immediately highlighted when you got to the layer.

I identified the problem layer being the one where I update and install dependencies in our base Docker image:

```Dockerfile
### Install required packages
RUN DEBIAN_FRONTEND=noninteractive apt-get update -y && \
	DEBIAN_FRONTEND=noninteractive apt-get upgrade -y && \
	DEBIAN_FRONTEND=noninteractive apt-get install -y \
	apache2 \
	apg \
	brotli \
	bzip2 \
	catdoc \
	cron \
	curl \
	default-mysql-client \
	exim4 \
	gawk \
	gifsicle \
	git \
	htop \
	imagemagick \
	jpegoptim \
	less \
	locales \
	nfs-common \
	ntp \
	php7.4-common \
	php7.4-curl \
	php7.4-fpm \
	php7.4-gd \
	php7.4-intl \
	php7.4-json \
	php7.4-mbstring \
	php7.4-mysql \
	php7.4-simplexml \
	php7.4-xml \
	php7.4-zip \
	pngcrush \
	poppler-utils \
	rsync \
	snmp \
	sudo \
	supervisor \
	sysstat \
	vim \
	webp \
	wget \
	zopfli
```

My thinking behind combining the update & installs in one, ath the time, was to reduce the _amount_ of layers Docker created. I didn't consider the size of each layer ever being an issue.

With some trial an error of splitting up commands, I eventually landed on something like the following. I didn't identify exactly what package was causing the issue (it was late night), but splitting it up into 4 sections seemed to create small enough images that they could be pushed.

It's worth noting were are looking to deprecate this Docker image due to performance, so I didn't want to sink too much time into something which will be replaced soon

```Dockerfile
RUN DEBIAN_FRONTEND=noninteractive apt-get update -y
RUN DEBIAN_FRONTEND=noninteractive apt-get upgrade -y
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y \
	apache2 \
	apg \
	brotli \
	bzip2 \
	catdoc \
	cron \
	curl \
	default-mysql-client
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y \
	exim4 \
	gawk \
	gifsicle \
	git \
	htop \
	imagemagick \
	jpegoptim \
	less \
	locales \
	nfs-common \
	ntp
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y \
	php7.4-common \
	php7.4-curl \
	php7.4-fpm \
	php7.4-gd \
	php7.4-intl \
	php7.4-json \
	php7.4-mbstring \
	php7.4-mysql \
	php7.4-simplexml \
	php7.4-xml \
	php7.4-zip
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y \
	pngcrush \
	poppler-utils \
	rsync \
	snmp \
	sudo \
	supervisor \
	sysstat \
	vim \
	webp \
	wget \
	zopfli
```

The main reason for this post is to (hopefully) help someone. I spent a few hours hunting round the internet for similar issues and no-one mentioned it could be the size of your Docker layers.
