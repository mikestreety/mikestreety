---
title: Bulk create populated Google Docs from a Google Spreadsheet
date: 2024-10-04
intro: How to create Google Docs from a single Google Spreadsheet with variables for mail-merge style creation.
tags:
 - Google
 - Javascript
---

<div class="info">
The original code & concept was adapted from Phil Bainbridge and the code provided in his [Bulk create Google Docs from Google Sheet data](https://www.pbainbridge.co.uk/2020/05/bulk-create-google-docs-from-google.html) blog post.
</div>

There is often the time, during a website content creation phase, where people have time and resources to spend writing and adapting content, but the new website is not yet set up. During this phase, we opt for writing content in Google Docs, as this prevents anyone being blocked - the clients can continue with content while we configure the CMS. It also means there is content readily available for designers and developers alike.

Using the method below, we create documents for each page of the website. This is generated from a Google Sheet (which is usually generating from a website sitemap/scraping tool).

The script has the ability to "mail merge". Any column titles surrounded by `<<` quotes `>>` will be replaced with the cell contents. It also has the ability to retroactively update variables/placeholders.

## Notes

Some noteworthy features and/or differences to the original

- Documents will be created in the same folder as the spreadsheet
- If a document already exists with the same name, it will use that file for any variable updates
- If the folder contains a document called "Template" if will copy tha as a basis for all documents, otherwise it will make an empty document
- If the document (or template) contains "variables", these will be replaced
	- Variables are a sluggified version of the column title surrounded by `<< >>` (e.g. Description will be `<<description>>`)
	- To check what your column name will be, you can use the following: https://slugify.online/
- If you have a sheet/page called "Log" in your spreadsheet, an log of events will be output so you can track it's progress

## Setup

1. Create a new folder in Google Drive
2. Create a new spreadsheet in that folder
3. Populate the first sheet with your document titles and any other (although not necessary, I would advise having at least a **Title** and **Link** column)
	- The script will use a **Title** column as the document name if it exists, otherwise it will use "Row: X" where X is the row number
	- If you want a link to the doc to be generated, add a **Link** column
4. Go to Extensions -> App Scripts and paste the below code - click Save
5. Go back to your spreadsheet and refresh, there should be a "Scripts" menu item with "Create Docs from this Spreadsheet" option - click that
	- The process can take a while - about 10 seconds per page. So set it running and got and grab a coffee.

## The code

```js
/*
* This overall script is designed to bulk create Google Docs from data within a Google Sheet.
*/

/**
 * The main script
 */
function createDocsFromSpreadsheet()
{
	// Log starting of the script
	logEvent('Script has started');

	const spreadsheet = getCurrentSpreadsheet(),
		// Get current folder
		folder = DriveApp.getFileById(spreadsheet.getId()).getParents().next(),
		// Get Data sheet (first sheet)
		dataSheet = spreadsheet.getSheets()[0];

	let files,
		template;

	// Assign via destructuring
	[files, template] = getOtherFilesFromFolder(folder, spreadsheet);

	// Fire the create function
	createDocuments(dataSheet, folder, files, template);

	logEvent('Script has ended');

}

/**
 * Get the currently active spreadsheet
 */
function getCurrentSpreadsheet()
{
	var spreadsheet = SpreadsheetApp;
	return spreadsheet.getActiveSpreadsheet();
}

/**
 * Find all the files (except itself)
 */
function getOtherFilesFromFolder(folder, spreadsheet)
{
	// Set up variables
	let list = [],
		template = false,
		files = folder.getFiles();

	// Loop through the variables
	while (files.hasNext()){
		file = files.next();

		// Exclude ourselves
		if(file.getId() === spreadsheet.getId()) {
			continue;
		}

		// Create a object with data
		let f = {
			name: file.getName(),
			slug: slugify(file.getName()),
			id: file.getId()
		};

		// Exclude the template
		if(f.slug === 'template') {
			template = f;
			continue;
		}

		// Keep the rest
		list.push(f);
	}

	return [list, template];
}

/**
 * Create the documents
 */
function createDocuments(dataSheet, folder, existingFiles, template) {

	// Log starting createDocs Function
	logEvent('Starting createDocuments Function');

	// Get the formatted spreadsheet data
	let headers,
		data;
	[headers, data] = formatRows(dataSheet.getDataRange().getValues())

	if(!data.length) {
		return;
	}

	for(let page of data) {
		// Create a file name
		let fileName = page.title ? page.title : 'Row: ' + page.row;

		// Find or create a new file (maybe from the template)
		logEvent('Looking for: ' + fileName);
		let file = getOrMakeFile(fileName, existingFiles, template, folder)

		if(!file) {
			continue;
		}

		// Pppulate any variables - even if it's an existing sheet
		let fileId = file.getId();
		populateTemplateVariables(fileId, page);

		// Get the column with a title of "Link"
		let linkColumn = (headers.map(a => a.slug)).indexOf('link');
		if(linkColumn >= 0) {
			// If it exists, add the URL
			dataSheet.getRange(page.row, (linkColumn + 1)).setFormula('=HYPERLINK("' + file.getUrl() + '","' + fileName + '")');
		}

		// refresh spreadsheet to links appear as soon as added
		SpreadsheetApp.flush();
	}
}

/**
 * Find an existing file or make a new one
 *
 * If a "Template" file exists, use that
 */
function getOrMakeFile(fileName, existingFiles, template, folder)
{
	let file = false;

	let matchingFileList = existingFiles.filter(f => f.name === fileName),
		existingFile = matchingFileList.length ? matchingFileList[0] : false;

	if(existingFile) {
		logEvent('Already exists: ' + fileName);
		file = DriveApp.getFileById(existingFile.id)
	} else if(template && template.id) {
		logEvent('Creating from template: ' + fileName);
		try {
			file = DriveApp.getFileById(template.id).makeCopy(fileName, folder);
		}
		catch(e) {
			// if failed set variable as false and Log
			logEvent('Failed to copy the template: ' + e);
		}

	} else {
		logEvent('Creating empty file: ' + fileName);
		try {
			file = DocumentApp.create(fileName)
			file = DriveApp.getFileById(file.getId())
			file.moveTo(folder);
		}
		catch(e) {
			// if failed set variable as false and Log
			logEvent('Failed to make a new file: ' + e);
		}
	}

	return file;
}

function populateTemplateVariables(fileId, page) {

	let fileContents = false;

	try {
		fileContents = DocumentApp.openById(fileId).getBody();
	}
	catch(e) {
		// if failed set variable as false and Log
		logEvent('Failed to open file: ' + e);
	}

	if(!fileContents) {
		return;
	}

	for(let key in page) {
		fileContents.replaceText('<<' + key + '>>', page[key]);
	}
}

function formatRows(rows)
{
	let headers = [];

	for(let h of rows.shift()) {
		headers.push({
			title: h,
			slug: slugify(h)
		})
	}

	let data = [];

	// Start at 2 so it matches with with the rows in the sheet
	let rowCount = 2;

	for(let row of rows) {
		let d = {
			row: rowCount
		};

		for (var col = 0; col < row.length; col++) {
			d[headers[col].slug] = row[col];
		}

		data.push(d)
		rowCount++;
	}

	return [headers, data];
}

/**
 * Add the menu Item
 */
function onOpen() {
	SpreadsheetApp.getUi()
		.createMenu('Scripts')
		.addItem('Create Docs from this Spreadsheet', 'createDocsFromSpreadsheet')
		.addToUi();
}

/**
 * Log event (if there is a sheet called Log)
 */
function logEvent(action) {
	// Use the scripts logger
	Logger.log(action);

	// get the user running the script
	var theUser = Session.getActiveUser().getEmail();

	// get the relevant spreadsheet to output log details
	var ss = SpreadsheetApp.getActiveSpreadsheet();
	var logSheet = ss.getSheetByName('Log');

	if(!logSheet) {
		return;
	}

	// create and format a timestamp
	var dateTime = new Date();
	var timeZone = ss.getSpreadsheetTimeZone();
	var niceDateTime = Utilities.formatDate(dateTime, timeZone, "dd/MM/yy @ HH:mm:ss");

	// create array of data for pasting into log sheet
	var logData = [niceDateTime, theUser, action];

	// append details into next row of log sheet
	logSheet.appendRow(logData);

}

/**
 * Convert a string into a slug
 */
function slugify(str) {
	str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
	str = str.toLowerCase(); // convert string to lowercase
	str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
		.replace(/\s+/g, '-') // replace spaces with hyphens
		.replace(/-+/g, '-'); // remove consecutive hyphens
	return str;
}
```
