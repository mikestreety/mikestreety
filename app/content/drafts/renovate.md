

We currently maintain over 60 sites and are contracted to keep these up-to-date. Doing this manually is a near full-time job - keeping apprised of all of our dependencies across projects and ensuring any security vulnerabilities are patched within time.

Tools such as [Dependabot](https://github.com/dependabot) exist, however we were after an open-source tool we could run on private repositories. We also use several different technologies, so having a single tool to update **composer**, **npm**, **docker** and **gitlab-ci** dependencies would be a huge bonus - I'm a big fan of having a single source-of-truth.

After a couple of false starts I came across **[Renovate](https://www.mend.io/renovate/)** - a tool which ticked every single box I had - including being able to run it privately on our self-hosted Gitlab install, meaning everything can sit in the comfort of our ecosystem.

This blog post is a bit of a beast, I've include some jump links below and have hopefully broken it up in sensible places. I also repeat bits throughout in the thought you are more likely to scan through this looking for something specific rather than read it top to bottom. [Give me a shout on Mastodon](https://hachyderm.io/@mikestreety) if you have any questions.

- [Overview](#overview)
	- [Configuration](#configuration)
	- [Scheduled Running](#scheduled-running)
- [Running Renovate](#running-renovate)
	- [Running Locally via NPM](#running-locally-via-npm)
		- [Installing and Configuring](#installing-and-configuring)
	- [Running via Gitlab CI](#running-via-gitlab-ci)
- [Environment variables](#environment-variables)
- [The Config File](#the-config-file)

## Overview

Renovate is a behemoth that can be configured in a myriad of different ways. Rather than try and explain them all, this post outlines how _I_ have it set up - I wouldn't expect you to copy it verbatim but hopefully it includes a few pointers to get you unstuck.

### Configuration

We have a single "Renovate" repository which has the central config. This runs regularly and has the list of target repositories stored within - in theory nothing needs to be changed in the target repository itself for Renovate to start updating it. There is a option which allows you to have optional configuration files in the target repositories.

I use a central `config.js` within the Renovate repository and then, if overrides are required, add a `renovate.json` file to the target repository.

**For example**: We have our Renovate instance updating the Renovate repository itself. In the default config,  we have it set so all minor updates are required to be merged by a human, however, with the [rate Renovate release](https://github.com/renovatebot/renovate/releases) it required several merge requests a day.

In the Renovate repository, there is a config override stating minor updates can be automerged:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "packageRules": [
    {
      "matchManagers": ["npm", "dockerfile", "gitlabci"],
      "matchUpdateTypes": ["minor", "patch", "pin", "digest"],
      "automerge": true,
      "automergeType": "branch"
    }
  ]
}
```

### Scheduled Running

There are currently 2 ways of Running our renovate set up - manually via NPM or on a scheduled CI job on Gitlab. The scheduler runs every 2 hours every day but we have configured the Renovate `automergeSchedule` to only merge branches during the working day.

## Running Renovate

Setting up and running Renovate was a big hurdle for me to get over, however once you get the knack you can slowly iterate.

### Running Locally via NPM

Renovate can be installed via NPM and this is how I do most of my testing, how I onboard a new repository or if I need to force an update. I have a single repository that is set up for both NPM and Gitlab CI triggering.

#### Installing and Configuring

```bash
npm install renovate --save
```

Once installed, I added the following `scripts` block to my `package.json` file

```json
"scripts": {
    "renovate": "renovate",
    "renovate-debug": "LOG_LEVEL=debug renovate"
  }
```

This allows me to run

- `npm run renovate` or
- `npm run renovate-debug`

Passing `--` after the command allows me to pass in additional parameters, such as the repository if I wish to override:

```bash
npm run renovate -- mikestreety/mikestreety
```

Make a `config.js` in the same folder - this is where you can configure Renovate.

### Running via Gitlab CI

To run via Gitlab CI, I have the following file:

```yaml
image: renovate/renovate:36.43

variables:
  RENOVATE_CONFIG_FILE: "config.js"

renovate:on-schedule:
  only:
    - schedules
  script:
    - renovate $RENOVATE_SCHEDULE_FLAGS

renovate:
  except:
    - schedules
  when: manual
  script:
    - renovate $RENOVATE_MANUAL_FLAGS
```

I separated the scheduled & manual tasks out separately in case I want to set some overrides for specific circumstances.

With the version number in both `package.json` and `package.json`, you can see why I have Renovate updating Renovate.

## Environment variables

## The Config File

If you're here just for the configuration file, it can be found below:

{% raw %}
```js
try {
	// Are we running locally?
	require('dotenv').config();
} catch (e) {}

const { repositories } = require('./repositories.js');

const urls = {
		gitlab: process.env.GITLAB_URL,
		composer: `${process.env.GITLAB_URL.replace(/\/$/, '')}/group/63/-/packages/composer`,
		npm: `${process.env.GITLAB_URL.replace(/\/$/, '')}/packages/npm/`,
		docker: process.env.DOCKER_REGISTRY
	};


// This is necessary, because the env is preset by Gitlab and overrides any Git config done by Renovate.
Object.assign(process.env, {
	GIT_AUTHOR_NAME: 'RenovateBot',
	GIT_AUTHOR_EMAIL: 'email@domain.com',
	GIT_COMMITTER_NAME: 'RenovateBot',
	GIT_COMMITTER_EMAIL: 'email@domain.com',
});

module.exports = {
	/**
	 * Repositories
	 */
	repositories,

	/**
	 * Base Config Extensions
	 */
	extends: [
		// https://docs.renovatebot.com/presets-default/#ignoremodulesandtests
		':ignoreModulesAndTests',
		// https://docs.renovatebot.com/presets-group/#groupmonorepos
		'group:monorepos',
		// https://docs.renovatebot.com/presets-group/#grouprecommended
		'group:recommended',
		// https://docs.renovatebot.com/presets-workarounds/#workaroundsall
		'workarounds:all'
	],

	/**
	 * General Config
	 */
	// Disable all major updates
	major: {
		enabled: false
	},
	// Wait 5 days before creating the MR (the branch is made at the time)
	minimumReleaseAge: '5 days',
	// Bump composer & npm files to keep range but use current version as minimum
	rangeStrategy: 'bump',

	/**
	 * Dependency Dashboard
	 */
	// Create an issue with the pending updates
	dependencyDashboard: true,
	dependencyDashboardLabels: ['bot'],

	/**
	 * Git & PR settings
	 */
	// Who to commit as
	gitAuthor: 'RenovateBot <email@domain.com>',
	// Enable semantic commits
	semanticCommits: 'enabled',
	// Set the semantic commit type to build
	semanticCommitType: 'build',
	// append a table in the commit message body describing all updates in the commit.
	commitBodyTable: true,
	// Who to assign the MR to
	assignees: [],
	// Rebase open PRs with default branch
	rebaseWhen: 'behind-base-branch',
	// How often to make a PR
	prHourlyLimit: 0,
	// Concurrent limit
	prConcurrentLimit: 0,
	// When should it automerge?
	automergeSchedule: ['after 7:30am and before 4pm every weekday'],
	// Labels to add to the PR
	labels: ['bot'],

	/**
	 * Post Upgrade
	 */
	// What post upgrade commands are allowed
	allowedPostUpgradeCommands: [
		"composer update {{{depName}}}:{{{newVersion}}} --no-scripts --no-progress --no-interaction",
		"npm update {{{depName}}} --save --ignore-scripts"
	],

	/**
	 * Package Rules
	 */
	packageRules: [
		/**
		 * Specific packages
		 */
		// TYPO3
		{
			matchPackagePatterns: ['^typo3\/'],
			minimumReleaseAge: null
		},
		// Liquid Light
		{
			matchPackagePatterns: ['^liquidlight/'],
			registryUrls: [
				urls.composer,
				'https://packagist.org'
			],
		},

		/**
		 * Update Types
		 */
		{
			matchUpdateTypes: ['minor'],
			addLabels: ['review-required']
		},
		{
			matchUpdateTypes: ['patch'],
			commitMessageSuffix: '[patch]',
			automerge: true,
			automergeType: 'branch',
			addLabels: ['automerge']
		},

		/**
		 * NPM Packages
		 */
		{
			groupName: 'NPM dependencies',
			matchManagers: ['npm'],
			matchUpdateTypes: ['minor', 'patch'],
			semanticCommitScope: 'npm',
			addLabels: ['npm'],
			postUpgradeTasks: {
				commands: [
					"npm update {{{depName}}} --save --ignore-scripts"
				],
				fileFilters: ["package-lock.json"],
				executionMode: "update"
			}
		},
		{
			matchManagers: ['npm'],
			matchUpdateTypes: ['patch'],
			groupSlug: 'npm-patch'
		},
		{
			matchManagers: ['npm'],
			matchUpdateTypes: ['minor'],
			groupSlug: 'npm-minor'
		},

		/**
		 * Composer packages
		 */
		{
			groupName: 'Composer dependencies',
			matchManagers: ['composer'],
			matchUpdateTypes: ['minor', 'patch'],
			addLabels: ['composer'],
			semanticCommitScope: 'composer',
			postUpgradeTasks: {
				commands: [
					"composer update {{{depName}}}:{{{newVersion}}} --no-scripts --no-progress --no-interaction"
				],
				fileFilters: ["composer.lock"],
				executionMode: "update"
			}
		},
		{
			matchManagers: ['composer'],
			matchUpdateTypes: ['patch'],
			groupSlug: 'composer-patch'
		},
		{
			matchManagers: ['composer'],
			matchUpdateTypes: ['minor'],
			groupSlug: 'composer-minor'
		},

		/**
		 * Docker dependencies
		 */
		{
			groupName: 'Docker dependencies',
			matchManagers: ['dockerfile'],
			semanticCommitScope: 'docker',
		},

		/**
		 * Gitlab CI dependencies
		 */
		{
			groupName: 'Gitlab dependencies',
			matchManagers: ['gitlabci'],
			semanticCommitScope: 'ci',
		}
	],

	// Keep lockfiles up-to-date
	lockFileMaintenance: {
		enabled: true,
		automerge: true,
		automergeType: "branch",
		branchTopic: 'lock-file-maintenance',
		schedule: ['before 4pm on the first day of the month'],
	},

	/**
	 * Setup
	 */
	// Should an onboard PR be made?
	onboarding: false,
	// Do we require config? (set to optional so the repo can have it if needed)
	requireConfig: 'optional',

	/**
	 * Platform
	 */
	platform: 'gitlab',
	endpoint: urls.gitlab + '/',
	token: process.env.GITLAB_API_PRIVATE_TOKEN,

	/**
	 * Managers
	 */
	// What dependencies are we updating?
	enabledManagers: [
		'dockerfile',
		'gitlabci',
		'composer',
		'npm',
	],
	// Get to private Gitlab packages
	hostRules: [
		{
			hostType: 'packagist',
			matchHost: urls.composer,
			username: '___token___',
			password: process.env.PACKAGE_CI_TOKEN,
		},
		{
			hostType: 'docker',
			matchHost: urls.docker,
			username: process.env.DOCKER_REGISTRY_USER,
			password: process.env.DOCKER_REGISTRY_PASS,
		}
	],
	// Get to private NPM packages
	npmrc: `@packages:registry=${urls.npm}\n${urls.npm.replace('https://', '//')}:_authToken=${process.env.PACKAGE_CI_TOKEN}`
};
```
{% endraw %}
