---
title: Setting up Claude Code
intro: The settings I reach for when setting up Claude Code
tags:
  - AI
  - General
---

I've recently been utilising and customising Claude Code more - rather than just sticking with what comes out of the box. With more and more of my colleagues and friends adopting AI (and, specifically, Claude), I thought I would share my go-to config when setting it all up.

## Terminal

Claude Code on the terminal is where I spend most of my time - I find it is more powerful than the **Code** element of the desktop app. Once Claude is installed, these are the settings I reach for:

- `/model`: **Sonnet** - I've found Sonnet to be a good reliable workhorse without burning all the tokens
- `/effort`: **High** - Effort was explained to me like "motivation" - High is a good, solid balance
- `/advisor`: **Opus** - This is a killer feature - it does a lot of the thinking in Sonnet and then checks with Opus
- `/config` - Some settings I change from the default
	- `Default permission mode`: **Plan** - Means I don't have to remember to switch, sometimes the plan gives you a solution without needing to burn more tokens implementing it
	- `Push when actions required`: **true**

## MCP / CLI tools

The next thing I lean on is MCPs and CLIs to expand the capabilities of Claude

**MCPs**

Model Context Protocol (MCP) servers allow LLMs and AI tools to connect to live data to get more context for the task.

- [ClickUp](https://developer.clickup.com/docs/connect-an-ai-assistant-to-clickups-mcp-server) - This is our project management tool and allows Claude to get the full context of a task
- [GitLab](https://docs.gitlab.com/user/model_context_protocol/mcp_server/#connect-claude-code-to-the-gitlab-mcp-server) - We use GitLab for our projects so allowing Claude to access Work Items (issues) and MR feedback helps speed up the feedback loop

**CLIs**

With certain CLI tools, Claude is able to perform actions more efficiently which saves tokens

- [GitLab CLI](https://docs.gitlab.com/cli/) - Access issue and merge request information over a simplified CLI
- [Playwright](https://playwright.dev/docs/getting-started-cli) - Preferred over the Playwright MCP

## Skills & Plugins

Not so much a config or command in itself, but if you find yourself repeating particular instructions (e.g. how to make a PHPUnit test or code something in a particular way) consider making a skill.

The best way to do this is to ask Claude itself:

"Make a skill that helps me write consistent..."

Don't forget to specify if it should be a project or user skill.

You can use the skill creator plugin to help you create skills:

1. Type `/plugin`
2. Search for `skill-creator`, press "Enter" and install it
3. Type `/reload-plugins` to register it
4. Type `/skill-creator:skill-creator` with a description to get you started

It's worth looking through the `/plugin` list for plugins which may help with the type of coding you do.

## Learning

Master.dev features a [free course on Claude](https://master.dev/courses/claude-code/). It doesn't go into deep complex architecture, but gives a great overview to help you understand Claude better and how to get the best of it

## Conclusion

And that's it, I'll update the post as I find more customisations and tweaks. For now, this is how I set up my Claude code. If you've got this far, you might be interested to read my true [feelings about AI](/blog/my-thoughts-on-ai).
