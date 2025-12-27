---
title: Makefile includes and other Makefile tips and tricks
intro: How to include other Makefiles along with other Makefile tips I've picked up
tags:
  - CLI
---


We use Makefiles in our repositories to wrangle commands for setting up, pulling and linting our code. Nothing revolutionary, but they've become pretty essential to our workflow.

## Makefile includes

The thing that initially had me scratching my head was wanting to share commands between sites. A lot of our sites follow the same patterns and need identical Makefile commands - seemed daft to copy-paste the same stuff everywhere when we could have one central file doing the heavy lifting.

I spent ages trawling through Stack Overflow and various forums, but here's the thing - because our Makefiles essentially just contain bash commands (rather than actually "making" anything in the traditional sense), there was loads of conflicting advice that didn't quite fit our use case. Eventually, I gave up being stubborn and asked AI, which promptly gave me exactly what I needed:

```makefile
-include ./path/to/file.mk
```

**Word of warning:** That hyphen `-` before `include` is doing important work - it prevents Make from throwing a tantrum if the file happens to be missing (which can happen if it's installed via a dependency that hasn't been pulled yet).

`.mk` is the recognised file extension for Makefiles that aren't called `Makefile` - bit of trivia for you there.

When you're including a file with commands, you can overwrite them in your local Makefile if you need project-specific tweaks. Make will give you a gentle warning about this, but it's just letting you know something's been overridden - nothing to worry about.

## Variables

Your central Makefile might need some paths or other bits that vary between projects. You can handle this much like bash - define variables without a prefix, use them with one:

```makefile
SITE_PATH_PRODUCTION := ~/www/current

-include ./path/to/file.mk
```

Then reference that variable in your shared Makefile:

```makefile
## Pull the full database from production
db-full-pull-production:
	ssh $(SSH_HOST) \
		"$(SITE_PATH_PRODUCTION)/vendor/bin/typo3 database:export ...
```

As a bit of a safety net, you can set defaults at the top of your shared makefile too:

```makefile
SITE_PATH_PRODUCTION ?= ~/www/current
```

That way things won't explode if someone forgets to set a variable.

## .PHONY Commands

All our commands are basically bash scripts masquerading as Make targets. This works fine until you accidentally create a folder that matches one of your command names.

For example, if you've got `make config` but also have a `config/` folder hanging about, running `make config` will target the folder instead of your command. Bit annoying when you're expecting it to do something entirely different.

You can tell Make which commands are `.PHONY` (i.e., they don't correspond to actual files), but since *all* of ours are just bash commands in disguise, we take the sledgehammer approach and mark everything as phony:

```makefile
.PHONY: *
```

## Help block

Here's something that'll save you from accidentally running the wrong command: by default, running `make` with no target executes whatever's first in the file. This could be anything - a rebuild command, a deployment script, something that downloads half the internet. Not ideal.

We stick a help generator at the top of our Makefiles that serves double duty - it shows available commands *and* acts as a safety net:

```makefile
help:
	@echo "\033[0;33mAvailable targets\033[0m"
	@echo "\033[0;33m-----------------\033[0m"
	@awk '/^[[:alnum:]_-]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")-1); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "%-25s %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)
```

Any command with a double hash comment (`##`) above it gets picked up and displayed in the help. Simple but effective - and it means accidentally running `make` just shows you what's available rather than doing something potentially destructive.

Certainly not the most groundbreaking setup, but it's made managing our various projects much less of a faff. If you've got a different approach or improvements to suggest, I'd love to hear about them.
