---
title: Setting up Gitlab Advanced search
date: 2023-03-16
intro: Using Advanced search in Gitlab premium requires an Elasticsearch server setting up
permalink: "blog/set-up-gitlab-advanced-search/"
tags:
 - Gitlab
---

I managed to get a [Gitlab Premium](https://about.gitlab.com/pricing/premium/) trial to see if it was right for our business. The big feature I was excited to try out was the Advanced search. This brings a Gitlab.com (and Github.com) style of "global search" to the install - being able to search in all the code is going to be incredible.

Having [upgraded my Community Edition install](https://docs.gitlab.com/ee/update/package/convert_to_ee.html) is was disheartened to see the Advanced search required [Elasticsearch to be set up](https://docs.gitlab.com/ee/integration/advanced_search/elasticsearch.html), which is recommended to be on a different server.

The tutorial covers how to integrate with an Elasticsearch server, but not how to set it up. AWS is mentioned, along with [Elastic Cloud](https://www.elastic.co/), however I struggled to get either of these working as the AWS interface and user management is confusing and I couldn't figure what credentials to use for the Elastic cloud.

I was after a "straight-forward" and "cheap" solution to try the search - I was only on a trial of Gitlab so didn't want to go through the process of setting up a full infrastructural layer for something I could be deleting in less than 30 days. The other thing I didn't know was how much disk space I needed.

I ended up setting up a new server and installing Elasticsearch on it using DigitalOcean. With a swift Google, you can find an offer for some [free credits](https://try.digitalocean.com/freetrialoffer/) ($200 at time of writing).

From there, I set up a new droplet: Ubuntu, 2 GB Memory, 2 Intel vCPUs and 60 GB Disk which casts $21 a month - I should be able to get a good few months for free while I trial Gitlab and the functionality.

Once the droplet was set up, I followed the [DigitalOcean guide for setting up Elasticsearch](https://www.digitalocean.com/community/tutorial_collections/how-to-install-and-configure-elasticsearch).

The only difference to the article is I set the following:

```yaml
network.host: 0.0.0.0
cluster.initial_master_nodes: node-1
```

The first one makes it accessible to other servers, the second is required for "production mode".

From there, I followed the Gitlab tutorial for setting up the Advanced Search. I restricted the Elasticsearch server by IP instead of adding authorisation as it was for testing purposes.

Note: For a 35GB Gitlab install, Elasticsearch uses 4GB.
