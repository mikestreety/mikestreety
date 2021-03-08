---
title: Export Locko to 1Password
date: 2015-06-17
updated: 2020-06-16
intro: Getting your passwords out of Locko into something else can be tricky due to their unique export format. This post helps with PHP
tags:
 - Web
 - PHP
---

<div class="info"><strong>Update: 16th June 2020:</strong> Since I wrote this post in 2015, it seems Locko has updated its export slightly. Many thanks to <a href="https://www.twitter.com/evatar">@evatar</a> for pointing out it doesn't work and helping me update the code.</div>

I <s>recently</s> changed password managers going from Locko, created by Binary Nights to 1Password from Agile Bits. Most password managers offer an Export/Import options (normally JSON being the file type of choice) however, Locko does not, and only exports its own format.

I have written a PHP script to transform the file from Locko into 1Password (or other password manager with some tweaking) compatible files. It takes the Locko files and converts them to a flat CSV file. You may find that if you had any custom folders/groups that they get lost.

## Notes:

- You need to be comfortable with the command line to do this. I did consider making it a website/web service but then realised no-one would upload their unencrypted passwords to a dodgy looking website!
- Your machine will need PHP installed. This script was written 5 years ago when I didn't know bash and I now no longer have Locko to write a bash version. Sorry!

## Steps:

1.  Open Locko and go to **File -> Export**, choose a location for your file - the easiest place is to put in your home directory if you can
0. Locate the file and rename it from `locko.lockexp` (or `untitled.lockexp`) to `passwords.zip`
0. Use a unarchiver to extract the folder
0. You should now have a folder with lots fo files and folders inside. Rename the folder to `passwords`
0. Create a new file **next** to this folder called `extract.php` and paste the contents below, or you can [download a zip file](https://gist.github.com/mikestreety/c643afcb313d4b4ae3b46dcfeaf6175f/archive/c8c346c555a05f4d7f85ec590e892de63da4d9de.zip) which contains the file
0.  Open up terminal, `cd` to the location of the file and run: `$ php extract.php` (you will need PHP installed, verify this by running `php -v`)
0.  Once completed - you should see a new csv file titled `Logins.csv` which you can then import into 1Password

## The PHP Code

<pre class="language-php">&lt;?php
	// The name of the folder where the logins are
	$folder = './passwords';

	// The file name you want to save as
	$title = 'Logins';

	// A csv function - from http://webtricksandtreats.com/export-to-csv-php/
	function convert_to_csv($input_array, $output_file_name, $delimiter) {
		$temp_memory = fopen('php://memory', 'w');
		foreach ($input_array as $line)
		fputcsv($temp_memory, $line, $delimiter);
		fseek($temp_memory, 0);
		file_put_contents($output_file_name, $temp_memory);
	}

	// Set up a data array with header rows with the correct fields
	$data = array();
	$data[] = array(
		'title' => 'title',
		'location' => 'location',
		'username' => 'username',
		'password' => 'password',
		'category' => 'category',
		'notes' => 'notes'
	);

	// Make sure the folder definitely ends in a slash
	$folder = rtrim($folder, '/') . '/';

	// Find all the .item files in the specified folder, extract the
	// required data and add it to the data array
	foreach (glob($folder . '*.item') as $category) {
		$category = json_decode(file_get_contents($category));

		foreach (glob($folder . '/' . $category->uuid . '/*.item') as $login) {
			$login = json_decode(file_get_contents($login));

			$data[] = array(
				'title' => $login->title ?? '',
				'location' => $login->data->fields->url ?? '',
				'username' => $login->data->fields->username ?? '',
				'password' => $login->data->fields->password ?? '',
				'category' => $category->title ?? '',
				'notes' => $login->data->fields->note ?? ''
			);
		}
	}

	echo 'Nice work - thats ' . count($data) . ' logins ready for anything!' . PHP_EOL;

	// Convert array to CSV and output
	convert_to_csv($data, $title . '.csv', ',');</pre>