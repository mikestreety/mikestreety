---
title: GitlabForm for Gitlab repository automation
intro: Synchronise files & settings across repositories and groups in Gitlab
tags:
  - Gitlab
---

While researching something else, I stumbled upon [GitlabForm](https://gitlabform.github.io/), a nifty tool for synchronising settings and files across your GitLab repositories and groups. It's super flexible: you can apply granular control over each repo or use it as a one-and-done tool for everything. Thanks to its hierarchical configuration, it can handle pretty much anything in between.

Enough with the jibber-jabber, let's dive into some examples.

## Get a token

First things first, you need an access token. You can use a personal one, but for better security and separation of concerns, it's best to create a dedicated "bot" user. If you're on GitLab Premium or higher, you can create a [service account](https://docs.gitlab.com/user/profile/service_accounts/). This is the ideal approach, as it lets you clearly identify commits made by GitlabForm and restrict its access to only the groups and projects it needs.

I went with a new service account and created an Impersonation Token with the `api` scope. I purposefully **didn't** make this user an admin. GitlabForm will flag this with a warning, but it works just fine for most use cases without admin rights.

Once you have your token, create a `.env` file in your project root and place your token in there:

```
GITLAB_TOKEN=your_token_here
```

You'll also need a `config.yaml` file in the same directory.

## File structure

Once you get used to the file layout, it becomes clear that the structure is based on the [Groups](https://docs.gitlab.com/api/groups/) and [Projects](https://docs.gitlab.com/api/projects/) APIs.

This means you can add any setting from the GitLab API documentation for groups and projects (like `only_allow_merge_if_pipeline_succeeds` or `merge_method`) directly into your configuration, without it needing to be explicitly documented by GitlabForm.

Start off with a file like this - which would add settings to any group or project you specify. The below would set `main` to be the default branch.

```yaml
config_version: 3

gitlab:
  url: http://your-gitlab-instance.com

projects_and_groups:
  ###
  # All repositories
  ###
  "*":
    project_settings:
      # General
      default_branch: main
```

## Example scenario

Once you've got the basics down, you can use GitlabForm to solve some of GitLab's more annoying limitations, especially where settings are locked to a repository instead of being configurable at the group level.

A perfect example of this for me was rolling out [Code Owners](https://docs.gitlab.com/user/project/codeowners/). I was keen to use this feature after upgrading to GitLab Premium, but was pretty deflated to find out:

- You need to commit a `CODEOWNERS` file to **every single** repository.
- Users (or Groups) must be **direct members** of the repository; inherited permissions from a parent group don't count.

The thought of doing all that manual work (and having to undo it if something went wrong) made me hesitant to even start. This is where GitlabForm makes it a breeze, using its files functionality.

First, create a `files` directory next to your `config.yaml` and put your master `CODEOWNERS` file inside (e.g., `files/CODEOWNERS`).

Then, in your `config.yaml`, you can tell GitlabForm to push this file to all repositories:

```yaml
projects_and_groups:
  "*":
    files:
      ".gitlab/CODEOWNERS":
        commit_message: "build(gitlab): Add CODEOWNERS file"
        file: "./files/CODEOWNERS"
        overwrite: false
        skip_ci: true
        branches:
          - main
```

Using `overwrite: false` prevents the tool from overwriting a file that already exists locally. This allows you to customize files without your changes being erased the next time you run GitlabForm.

Next, you can add people or groups as members of the repository. In this example, we add our three teams as direct members.

```yaml
    members:
      groups:
        team/feds:
          group_access: maintainer
        team/beds:
          group_access: maintainer
        team/devops:
          group_access: maintainer
      enforce: true
      keep_bots: true
```

Setting `enforce: true` removes any other users or groups, ensuring only specified members have access to the project.

Lastly, you can use the [Merge Request](https://gitlabform.github.io/gitlabform/reference/merge_requests/) to enforce merge request approvals and remove existing approvals when the Code Owners file is modified.


```yaml
    merge_requests_approvals:
      disable_overriding_approvers_per_merge_request: true
      reset_approvals_on_push: false
      selective_code_owner_removals: true
    merge_requests_approval_rules:
      any: # this is just a label
        approvals_required: 1
        name: "Any member"
        rule_type: any_approver
      enforce: true
```

All put together, it looks something like:

```yaml
config_version: 3

gitlab:
  url: http://your-gitlab-instance.com

projects_and_groups:
  ###
  # All repositories
  ###
  "*":
    project_settings:
      # General
      default_branch: main

    files:
      ".gitlab/CODEOWNERS":
        commit_message: "build(gitlab): Update CODEOWNERS file"
        file: "./files/CODEOWNERS"
        overwrite: false
        skip_ci: true
        branches:
          - main

    members:
      groups:
        team/feds:
          group_access: maintainer
        team/beds:
          group_access: maintainer
        team/devops:
          group_access: maintainer
      enforce: true
      keep_bots: true

    merge_requests_approvals:
      disable_overriding_approvers_per_merge_request: true
      reset_approvals_on_push: false
      selective_code_owner_removals: true
    merge_requests_approval_rules:
      any: # this is just a label
        approvals_required: 1
        name: "Any member"
        rule_type: any_approver
      enforce: true
```

To change a setting for a specific sub-group or repository, place its configuration after the wildcard configuration. This leverages the [Configuration hierarchy](https://gitlabform.github.io/gitlabform/reference/#configuration-hierarchy) to apply the overrides.

## Running

You can run the configuration using either Python or Docker. I prefer using Docker as it avoids installing additional software on my machine.

To run it, use the following command, ensuring you pass in the `.env` file so the tool has access to your token:

```bash
docker run --env-file .env -it -v $(pwd):/config ghcr.io/gitlabform/gitlabform:latest gitlabform ALL
```

Although the configuration is set up for all projects, you can test it on a single project or group. The `ALL` argument instructs GitlabForm to process all projects and groups it finds. For testing, you can replace ALL with a specific group or repository slug, such as `your-group/your-project`.

When debugging, I find it helpful to add the following flags to see exactly what changes will be applied:

```
--verbose --diff-only-changed
```
