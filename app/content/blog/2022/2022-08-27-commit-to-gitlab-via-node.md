---
title: Programmatically Commit to Gitlab via Node.js
date: 2022-08-27
intro: Committing to a Gitlab repository programmatically, can be achieved with a NPM package and a few lines of Javascript
permalink: blog/programmatically-commit-to-gitlab-via-nodejs/
tags:
  - Gitlab
  - Node
---

Most of my repositories are hosted on [Gitlab](https://gitlab.com/mikestreety) and I was after a programmatic way to commit to a repository.

My first thought was a bash script, which would pull, commit and push to Gitlab - however that would be open to conflicts and failures and would require a lot of error handling and manual commands.

After some research I discovered **[Gitbreaker](https://www.npmjs.com/package/@gitbeaker/node)** - a "GitLab API NodeJS library with full support of all the Gitlab API services."

I've found their documentation a bit... lacking. Although they list the [available APIs](https://github.com/jdalrymple/gitbeaker#supported-apis), I have found I have had to dive into the repository & code to work out what parameters are needed for the functions.

<div class="info">This post assumes a basic understanding of Git and a good understanding of Javascript & the Node/NPM ecosystem.</div>

## Personal Access Token

The first step is to get an access token with API access.

1. Go to the [Access Tokens](https://gitlab.com/-/profile/personal_access_tokens) page
2. Enter a token name - this can be anything; the name of your project or something like "Gitbreaker"
3. Remove the expiration date if you wish
4. Check **API** under the **Selected Scopes**
5. Click create and make a copy of your token

<div class="warning">In the code below there will be a space for your Access token. While it may be tempting to put it in the code, please don't commit or deploy this. Instead, consider using environment variables, as described in this <a href="https://docs.netlify.com/configure-builds/environment-variables/">Netlify blog</a></div>

## Setting up Gitbreaker

As with all `npm` modules, the following command is required to get started:

```
npm i --save @gitbeaker/node
```

Once you have the module installed, create a new `js` where required. For testing and debugging, I called it `commit.js` and ran `node commit.js` from the command line.

For the code below to work, the following was required in my `package.json` file

```json
"type": "module"
```

Inside your JavaScript file, include Gitbreaker and set up the API - replace `TOKEN_GOES_HERE` with your Personal Access Token from above

```js
import { Gitlab } from '@gitbeaker/node'; // All Resources


const api = new Gitlab({
	token: 'TOKEN_GOES_HERE',
});

// The Gitlab project ID
const project_id = 22464377;
// The branch name to commit to
const branch_name = 'main;
```

In the examples below, I've kept all the variables the same so you can hopefully see the correlation between the commands.

## Committing a new file

The API & Gitbreaker are fantastically done and the code to commit is minimal. Grab the **Repository ID** from Gitlab - this is found under the name at the top of the repository (e.g. the ID for [mikestreety](https://github.com/mikestreety/mikestreety) is `22464377`).

<div class="warning">Make sure the user you generated the access token for above has write access to the repository. If user, permissions and policies allow it, maybe consider creating a new user with <em>only</em> access to the repositories you want to update - as there could be big security vulnerabilities if your access token gets leaked.</div>

Next, add this code to your javascript file - replacing the variables. This code will commit a new file to your repository.

```javascript

api.Commits.create(
	project_id,
	branch_name,
	'Commit message'
	[ // Array of files to add
		{
			action: 'create', // If the file exists, this should be changed to update
			filePath: 'path/to/file.txt', // Folders will be made if they don't exist
			content: 'Hello world' // The contents of the file
		},
	]
);
```

Running that will create a new file in your repo, on the branch you specified. The array can contain as many files as you want - updating, creating or deleting.

## Check a file exists

To get a true/false if a file exists isn't straight forward, however, "trying" to `show` the file will give the same results

```javascript
let fileExists = false;
try {
	await api.RepositoryFiles.show(project_id, 'path/to/file.txt', branch_name);
	fileExists = true;
} catch(e) {

}

// if (fileExists) {}
```

This will then give me a boolean `fileExists` variable to allow me to create or update the file.

## Get file contents

It might be that you want to retrieve the contents of a file from a branch, in which case `showRaw` will get the raw contents of the file

```javascript
api.RepositoryFiles.showRaw(project_id, 'path/to/file.txt', {ref: branch_name});
```

## Update a file

If you have got the file contents and updated the file, you can either use the `Commits.create` API above, or use the `RepositoryFiles.edit` API - this is especially useful if you have only edited one file

```javascript
let file_contents = 'Hello world \n This is new';
api.RepositoryFiles.edit(project_id, 'path/to/file.txt', branch_name, file_contents, 'Commit message');
```

## Conclusion

There are _so many_ more APIs I've not touched on - I'm hoping the example above give you an idea of what Gitbreaker is capable of and I hope if inspires you to go forth and commit programmatically.
