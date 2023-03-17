---
title: Post to Slack from Gitlab CI
date: 2023-03-24
intro: Posting a customised message to Slack via a bash script
permalink: "blog/posting-to-slack-from-gitlab-ci/"
tags:
 - Gitlab
---

When deploying via Gitlab and Gitlab CI, it may be you wish to notify a channel on Slack about any deployments which have occurred. Gitlab offers Slack as an integration out the box for all tiers, however the notifications are not very customisable and there is no "deployment" notification - there is only one for pipelines. The issue with this is that if a pipeline fails due to linting or tests, the Slack notifications occur too - adding to the daily noise that people don't need to see.

After some research, I came across this medium blog which was a great start: [Sending custom Slack notification from GitLab at each Job or Stage](https://musaveer-holalkere.medium.com/setting-custom-slack-notification-for-gitlab-at-each-job-or-stage-5d3529de737a)

I tweaked the code slightly and embedded it in our custom Docker image we use to build and deploy our sites.

The only variable neede for this to run is the `SLACK_WEBHOOK_URL` - which is covered in the article above. The rest is made up of [Predefined variables](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html).

```bash
#!/bin/bash

function build_slack_message() {
	local slack_msg_header
	# Populate header and define slack channels
	slack_msg_header=":rocket: *<${CI_ENVIRONMENT_URL}|${CI_PROJECT_TITLE}>*: New deployment to *${CI_ENVIRONMENT_NAME}* (from <${CI_PROJECT_URL}/-/tree/${CI_COMMIT_BRANCH}|${CI_COMMIT_BRANCH}>)"
	cat <<-SLACK
{
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "${slack_msg_header}"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": ":url:"
				},
				{
					"type": "mrkdwn",
					"text": "${CI_ENVIRONMENT_URL}"
				}
			]
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": ":commit:"
				},
				{
					"type": "mrkdwn",
					"text": "${CI_COMMIT_TITLE} [<${CI_PROJECT_URL}/-/commit/${CI_COMMIT_SHA}|${CI_COMMIT_SHORT_SHA}>]"
				}
			]
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"fields": [
				{
					"type": "mrkdwn",
					"text": "*Pushed By:*\n${GITLAB_USER_NAME}"
				},
				{
					"type": "mrkdwn",
					"text": "*Pipeline:*\n<${CI_PIPELINE_URL}|${CI_PIPELINE_IID}>"
				}
			]
		},
		{
			"type": "divider"
		}
	]
}
	SLACK
}

curl -X POST --data-urlencode "payload=$(build_slack_message)" "${SLACK_WEBHOOK_URL}"
```

This is run as a bash script at the end of our deployment - I add a check to ensure the file exists before trying to run it - if it doesn't exist, it still returns a `0` (which is "success") to ensure the pipeline registers as complete.

```bash
[ -f "/slack_deployment.sh" ] && /slack_deployment.sh || return 0
```

**What does it look like?**

The above code generates the following:

![Screenshot of Slack showing the notification](/assets/img/content/posting-to-slack-from-gitlabci/slack-notification.png)

Which is:

- The name of the project (with a link to the live site)
- The branch (with a link to the branch on Gitlab)
- The live URL output
- The latest commit (on which the pipeline was triggered) - including a link to view it on Gitlab
- The person who triggered the pipeline
- The pipeline ID (with a link to view the pipeline in Gitlab)

It's worth noting that `:url:` and `:commit:` are custom emojis on our Slack instance.
