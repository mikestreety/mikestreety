---
title: Building a Claude Code plugin marketplace for your team
date: 2026-10-15
intro: How we bundle our skills and agents into plugins so the whole team gets the same tooling
tags:
  - AI
---

Once a few of us started writing Claude Code skills, we hit an obvious problem. Skills were sitting in people's `~/.claude` folders, slightly different versions were floating around, and nobody knew what existed.

Claude Code has a fix for this: plugin marketplaces. A marketplace is a Git repository listing one or more plugins. Each plugin bundles skills, agents, commands and hooks, and anyone who adds the marketplace can install them.

Ours lives at `liquidlight/claude`, a private GitHub repository.

## What's in it

We started with a single "development" plugin bundling three things:

- a TYPO3 extension editor (a skill plus an agent) that implements a GitLab issue
- a Playwright test creator for our front-end JavaScript
- a PHPUnit test creator for TYPO3 extensions

It's grown since. We now have several plugins, split by what they're for:

- **`dev:`** day-to-day development: committing, releasing packages, code review, test creation and formatting Fluid templates
- **`upgrade:`** one-off project upgrades: TYPO3 11 to 12 to 13, Gulp to Vite, jQuery 4, Sass `@import` to `@use`, and our yearly conventions updates
- **`team:`** working as a particular role, such as a front-end developer following our conventions
- **`report:`** recurring checks, like our Monday server checks

The prefix appears in the command (`/dev:commit`, `/upgrade:gulp-to-vite-migration`), which makes it obvious where something came from.

## The structure

The repository looks roughly like this:

```
.claude-plugin/
	marketplace.json
plugins/
	dev/
		.claude-plugin/
			plugin.json
		skills/
			commit/
				SKILL.md
			duo-code-review/
				SKILL.md
				scripts/
		agents/
	upgrade/
		...
```

`marketplace.json` lists the plugins and where to find them:

<!-- TODO: swap in your real marketplace.json, this is a minimal example -->

```json
{
	"name": "liquidlight",
	"owner": {
		"name": "Liquid Light"
	},
	"plugins": [
		{
			"name": "dev",
			"source": "./plugins/dev",
			"description": "Day-to-day development tooling"
		}
	]
}
```

To install, someone runs:

```
/plugin marketplace add liquidlight/claude
/plugin install dev@liquidlight
```

As it's a private repository, they need access to it on GitHub first.

We use Claude in the browser too. As the org admin, I can add plugins through the Plugins panel, and everyone gets them in claude.ai as well as Claude Code.

## Things I've learnt

### Stop skills triggering when they shouldn't

Claude decides whether to use a skill based on its description. That's great for "write me a test", but you don't want "can you look at our Gulp setup?" accidentally kicking off a full Gulp to Vite migration.

For anything big or destructive, the description starts with:

> Only invoke via an explicit /upgrade:gulp-to-vite-migration slash command - do not trigger this from natural-language requests, even if it looks like a match.

It's blunt, but it works.

### Skills can call other skills

Some skills tell Claude to run another. For example, the TYPO3 upgrade skills run the testing framework update and the Playwright smoke tests once they're finished. That means each skill stays small and does one job.

### Keep shared scripts in the same plugin

Our full code review skill reuses the scripts from the Duo code review skill. That only works because they're in the same plugin. A standalone skill can't reach into another plugin's folder, so if you share code between skills, keep them together.

### Guard the dangerous things

We don't want Claude committing on its own. The `dev` plugin has a hook that blocks `git commit`, and the only way past it is the `/dev:commit` skill, which has to be typed by a human. It ties in with our AI policy: a person reviews and commits all AI-written code.

### Test before you push

Skills are text, so it's tempting to edit and push. In practice, a small wording change can change when a skill triggers or how it behaves. Wherever a skill runs a script, the script has tests, and I try a skill locally in `~/.claude/skills` before it goes into the marketplace.

Also worth knowing: skills load when a session starts. If you've just updated the plugin, start a new session to pick up the changes.

## Is it worth it?

<!-- TODO: your take. How much the team actually uses it, what's been the most useful plugin, anything you'd do differently -->

If you've got more than a couple of people using Claude Code, I'd set up a marketplace early. Even with one plugin and two skills, it means everyone is running the same thing, and there's a single place to improve it.
