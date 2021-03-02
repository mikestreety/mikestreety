---
title: Backup Gitlab data locally
date: 2018-03-12
updated: 2018-03-12
intro: I've recently moved all of my git repositories to Gitlab, this blog post walks through a script I have written to clone all of my repositories locally as a backup.
tags:
 - Web
 - PHP
---

For a while, I hosted my own version of [Gitlab](https://gitlab.com/) and, although I owned all the data, the server I had was not powerful enough for the install and would regularly crash and need rebooting. Moving my data across to the main Gitlab site gave me peace of mind that my data was always accessible no matter what time, however, I had less control over the data itself and no way of easily backing it up.

Below is a script is written in PHP which backs up my repositories for me. It is running on a small server I have at home which downloads the data onto a NAS. This NAS has two hard-drives which are mirrored.

The script does the following tasks: 

- It connects via the Gitlab API and retrieves all of the repos I own
- It then finds all the groups I am a member of and the repos of those groups
- Once collated and merged, it loops through each one
 - If it doesn't exist locally, it clones it down as a bare repository
 - If it exists already, it updates the repo

By doing this, if Gitlab closes down tomorrow, I have the data. As I rarely do side projects and updates, the script is set to run monthly. I consider that any work I have done in the last month will be backed up somewhere else (on a live/dev server somewhere). 

As this script uses the API, it doesn't need updating each time I add a project to Gitlab itself! I've included the code below with plenty o' comments to help you through.

The first line is a `shebang`. This allows you to just run the file without to specify `php` when running on the command line.

<pre class="language-php">#!/usr/bin/php
&lt;?php
	// Function to make any Gitlab cURL requests easier and it just requires
	// the path to be passed in. No need to use a full API composer package
	// for these commands
	function gitlabCurl($path) {
		// Get your token from Gitlab.com (or your own Gitbal install)
		$header = array('PRIVATE-TOKEN: XXXX');

		// Make a cURL request to Gitlab. if you're not using gitlab.com update
		// the URL below to match
		$ch = curl_init('https://gitlab.com/api/v4/' . $path);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$result = curl_exec($ch);
		curl_close($ch);

		// Lopp through your output setting the project ID as the key - this 
		// ensures you can merge arrays without fear of overwriting anything. 
		// It also sorts them into a logical order
		$ouput = array();
		foreach(json_decode($result, true) as $p) {
			$output[$p['id']] = $p;
		}
		
		// Parse returned list to an array
		return $output;
	}


	// Collate all the projects you personally own (don't forget to update the 
	// username)
	$projects = gitlabCurl('users/mikestreety/projects');

	// Get all of the groups the auhtenticated user is a member of
	$groups = gitlabCurl('groups');
	foreach ($groups as $group) {
		// Get the projects from each group and merge with the previous projects
		$projects = array_merge(
			$projects, 
			gitlabCurl('groups/' .  $group['id'] . '/projects')
		);
	}

	// Set a backup location for your repos
	$location = __DIR__ . '/backups/';

	// Shuffle projects so if script fails, different prorjects get backed up
	// at different times
	shuffle($projects);

	// Loop through the projects
	foreach ($projects as $p) {
		// output the name, so if it fails you know which project it was on
		echo $p['name'] . PHP_EOL;

		// use the namespace to set a folder path, this keeps projects in
		// alphabetcal order in according to group
		$folder = $location . str_replace('/', '-', $p['path_with_namespace']);

		// Check if the repo exists already
		if(file_exists($folder)) {
			// If it does, cd and pull everying (branches, tags etc)
			exec('cd ' . $folder . '&& git remote update');
		} else {
			// If not, clone as a bare/mirro repo in the folder
			exec('git clone --mirror ' . $p['ssh_url_to_repo'] . ' ' . $folder);
		}
	}</pre>