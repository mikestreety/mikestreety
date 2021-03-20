---
title: Filtering Tables with jQuery
date: 2015-02-12
updated: 2016-04-09
intro: I was recently asked by a friend how you would make a table filterable by using a select box & jQuery - for example "show me films made just in 2014.
permalink: "blog/filtering-tables/"
tags:
 - Web
 - Javascript
 - jQuery
---

I was recently asked by a friend how you would make a table filterable by using a select box & jQuery - for example "show me films made **just** in 2014".

Using data attributes I was able to achieve this. Each `tr` has a `data-year` attribute which is the value you wish to filter by. This can be anything from a number to a string.

The select box just needs to be the same values.

Lets start with this HTML:

```html
<select>
		<option value="">Please Select</option>
		<option>1997</option>
		<option>1998</option>
		<option>1999</option>
</select>
<table>
		<thead>
			<tr>
					<th>Year</th>
					<th>Version</th>
					<th>Name</th>
			</tr>
		</thead>
		<tbody>
			<tr data-year="1999">
					<td>1999</td>
					<td>Some version Number</td>
					<td>Some Name</td>
			</tr>
			<tr data-year="1997">
					<td>1997</td>
					<td>Some version Number</td>
					<td>Some Name</td>
			</tr>
			<tr data-year="1999">
					<td>1999</td>
					<td>Some version Number</td>
					<td>Some Name</td>
			</tr>
			<tr data-year="1998">
					<td>1998</td>
					<td>Some version Number</td>
					<td>Some Name</td>
			</tr>
		</tbody>
</table>
```

To filter, hide the rows that don't match the option selected:

```js
$('select').on('change', function(e){
	// Get the value of the select box
	var val = $(this).val();
 // Show all the rows
	$('tbody tr').show();
	// If there is a value hide all the rows except the ones with a data-year of that value
	if(val) {
		$('tbody tr').not($('tbody tr[data-year="' + val + '"]')).hide();
	}
});
```

The next step was to get it filtering page load - if one of the options was selected.

First step is to add a `selected` attribute to one of the `option`s

```html
<option selected>1997</option>
```

Next with the JS - rather than repeat ourselves, we can abstract the logic out into a function and fire that on page load.

```js
var filterTable = function(item) {
	// Get the value of the select box
	var val = item.val();
	// Show all the rows
	$('tbody tr').show();
	// If there is a value hide all the rows except the ones with a data-year of that value
	if(val) {
		$('tbody tr').not($('tbody tr[data-year="' + val + '"]')).hide();
	}
}
$('select').on('change', function(e){
	// On change fire function
	filterTable($(this));
});
// Fire function on load
filterTable($('select'));
```

This working example can be found on [Codepen](http://codepen.io/mikestreety/pen/OPOVma)

- - -

The last thing we might want to do is have multiple filters and tables on one page. Again, to save repeating ourselves we can utilise data attributes and store the class of the table we wish to filter on the select box:
```html
<select data-table="test1">
```

Which reflects the CSS class:

```html
<table class="test1">
```

This means the tables and select boxes can exist in different parts of the page (if needs be).

The other change to the JS is the page load function, this now grabs all the selects and loops through them - filtering each table in turn:

```js
var filterTable = function(item) {
	// Select the table based on select data attribute
	var table = $('.' + item.data('table') + ' tbody');
	// Cache the table rows
	var rows = table.find('tr');
	// Get the value of the selected item
	var val = item.val();
	// Show all the rows
	rows.show();
	// Hide all the rows except the ones with the value
	if(val) {
		rows.not(table.find('tr[data-year="' + val + '"]')).hide();
	}
}
$('select').on('change', function(e){
	// Fire on select change
	filterTable($(this));
});
// Find all select boxes and loop through to filter
$('select').each(function(i, val){
	filterTable($(val));
});
```
