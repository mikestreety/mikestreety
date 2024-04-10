---
title: Scanning your code with Bearer; a Gitlab compatible SAST
intro: Set up Bearer to scan for vulnerabilities in your code, available for use with the free tier
tags:
 - Gitlab
 - Security
---

Gitlab offer Static Application Security Testing (SAST) with all tiers of their product, however for any kind of UI integration and configuration you need to be on their Ultimate tier. SAST is a way of scanning your code to highlight any known vulnerabilities. It's worth noting it scans the code in your repository, so you won't get bogged down with dependency issues.

You can run the SAST without paying the big bucks, but all you can get out of it is a JSON report, which requires some processing to even start reading the results which isn't very conducive to a productive workflow.

Looking to add SAST to our processes, I began trawling the internet and stumbled across OWASP's [list of Source Code Analysis Tools](https://owasp.org/www-community/Source_Code_Analysis_Tools) of which I started making my way through it and looking at the offerings. After trailing, previewing and exploring most of the tools I eventually settled on [Bearer](https://www.bearer.com/).

I actually came across the list above while looking for a **SAST viewer for Gitlab Free** (and yes, I have just put that there to help anyone else looking!). The HTML output from Bearer is so much better than anything else I found.

The things I liked about it were

- Can run locally & generate a nice looking HTML report
- Can run in Gitlab CI and output a simplistic report
- Is free/open source

However, there is a note about [being acquired by Cycode](https://cycode.com/blog/cycode-acquires-bearer/) - I'm not sure what ramifications that has.

This post will run through scanning your code locally & then integrating it into your Gitlab CI pipeline

## Running Locally

Before you integrate it into your CI, it's best to make sure your code passes locally. You can do this two ways

1. Install the CLI locally - this is best done if you're going to be doing this a lot
2. Run the scan using Docker - worth doing if you only plan to run the scan a couple of times locally

Some notes about the scanner:

- By default, the bearer CLI only does a SAST scan, but you can add security scanning with the `--scanner` flag - [read more about the scanners in the documentation](https://docs.bearer.com/explanations/scanners/).
- The commands below output a HTML report, howevber

### Bearer CLI

If you choose to install the CLI locally, Bearer offers several ways to install it, via an [install script](https://docs.bearer.com/reference/installation/#install-script) and [Homebrew](https://docs.bearer.com/reference/installation/#homebrew) are the most common, however it's worth checking out the [installation documentation](https://docs.bearer.com/reference/installation/#installation-options) for more options.

Once you've got the CLI installed, you probably want to run it with the HTML report.

```bash
bearer scan . --scanner=sast,secrets --format html --output security-scan.html
```

### Bearer Docker

Alternatively, you may wish to run the scan with Docker, either to give it a go or if you don't want to install the CLI.

With the same options above (running with a HTML output), the command looks like:

```bash
docker run --rm -v $PWD:/app bearer/bearer scan /app --scanner=sast,secrets --format html --output security-scan.html
```

## Viewing Results

Once you have run the scan, you can open the `security-scan.html` file in your browser and review the issues & vulnerabilities found

### Ignoring Rules

It may be that Bearer has flagged some false positives - in that it has highlight "issues" that are actually expected or purposeful. There are two ways you can ignore issues - either via the CLI (which creates a file for you to commit) or via a code comment before the line.

If you wish to ignore it via the CLI, you can run

```bash
bearer ignore add [fingerprint]
```

You can obtain the `[fingerprint]` from the report next to the issue. This allows you to ignore this _specific_ instance, and not all rules of this type.

Alternatively, you can take the **Rule ID** and add it as a comment before the line - for example:

```javascript
// bearer:disable javascript_lang_logger_leak
console.log(output);
```

We tend to opt for the code comments rather than adding a bearer specific file, but you may prefer otherwise.


## Adding to Gitlab CI

(This assumes you have knowledge of Gitlab CI and an existing pipeline)

As `bearer` exists as a Docker container there is no custom building required:

```yaml
bearer:sast:
  stage: testing
  image:
    name: bearer/bearer
    entrypoint: [""]
  script: bearer scan . --scanner=sast,secrets --fail-on-severity=low --hide-progress-bar --quiet
```

We utilise the `bearer` docker image & overwrite the entrypoint so we can define a script

The `bearer scan` script is similar to the scan above, however it has a couple of extra options

- `--fail-on-severity=low` - If bearer logs `info` level items, we don't want to block the pipeline
- `--hide-progress-bar --quiet` - this minimises the output from bearer to make the logs easier to read

We have the `testing` stage set before our `deployment` meaning we can't deploy code that introduces a vulnerability.
