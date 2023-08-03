```dockerfile
###
# Global Arguments
###
ARG PHP_VERSION

###
# Set global component images
###
FROM composer:2 as COMPOSER

###
# baseline
# Create base image for baseline image build
###
FROM php:$PHP_VERSION-cli-alpine3.16 AS image_baseline

# Copy artifaxcts from component images
COPY --from=COMPOSER /usr/bin/composer /usr/bin/composer

# Install dependencies
RUN apk add \
	--update \
	--no-cache \
	# Deployment
	bash \
	git \
	openssh \
	rsync \
	# Front-end tools
	nodejs \
	npm \
	# Tools for imagemin
	autoconf \
	automake \
	g++ \
	gcc \
	jpeg \
	libc6-compat \
	libjpeg-turbo-dev \
	libpng-dev \
	libtool \
	make \
	musl-dev \
	nasm \
	tiff \
	zlib \
	zlib-dev

# Create SSH config
RUN mkdir /root/.ssh \
	&& touch /root/.ssh/id_ed25519 \
	&& chmod 700 /root/.ssh; \
	chmod 600 /root/.ssh/id_ed25519;

ENTRYPOINT ["/bin/sh", "-c"]

###
# docker_image
# Base image with docker included
###

FROM image_baseline AS image_dind
# Install dependencies
RUN apk add \
	--update \
	--no-cache \
	# Deployment
	docker
```


```bash
 docker build \
	--target image_baseline \
	--tag $CI_REGISTRY_IMAGE:php${PHP_VERSION} \
	--build-arg PHP_VERSION=${PHP_VERSION} \
	.
```
```bash
docker build \
	--target image_dind
	--tag $CI_REGISTRY_IMAGE/docker:php${PHP_VERSION} \
	--build-arg PHP_VERSION=${PHP_VERSION} \
	.
```
