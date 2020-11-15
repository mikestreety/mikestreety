---
title: Filtering Tables
published: 2016-3-7
updated: 2016-4-9
tags:
 - Web
 - Javascript
---

<p>I was recently asked by a friend how you would make a table filterable by using a select box & jQuery - for example "show me films made <strong>just</strong> in 2014.</p>
<p>Using data attributes this was fairly ease to achieve. Each <code>tr</code> has a <code>data-year</code> attribute which is the value you wish to filter by. This can be anything from a number to a string.</p>
<p>The select box just needs to be the same values.</p>
<p>Lets start with this HTML:</p>
<pre class="language-html">&lt;select&gt;
        &lt;option value=""&gt;Please Select&lt;/option&gt;
        &lt;option&gt;1997&lt;/option&gt;
        &lt;option&gt;1998&lt;/option&gt;
        &lt;option&gt;1999&lt;/option&gt;
&lt;/select&gt;
&lt;table&gt;
        &lt;thead&gt;
            &lt;tr&gt;
                    &lt;th&gt;Year&lt;/th&gt;
                    &lt;th&gt;Version&lt;/th&gt;
                    &lt;th&gt;Name&lt;/th&gt;
            &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;
            &lt;tr data-year="1999"&gt;
                    &lt;td&gt;1999&lt;/td&gt;
                    &lt;td&gt;Some version Number&lt;/td&gt;
                    &lt;td&gt;Some Name&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr data-year="1997"&gt;
                    &lt;td&gt;1997&lt;/td&gt;
                    &lt;td&gt;Some version Number&lt;/td&gt;
                    &lt;td&gt;Some Name&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr data-year="1999"&gt;
                    &lt;td&gt;1999&lt;/td&gt;
                    &lt;td&gt;Some version Number&lt;/td&gt;
                    &lt;td&gt;Some Name&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr data-year="1998"&gt;
                    &lt;td&gt;1998&lt;/td&gt;
                    &lt;td&gt;Some version Number&lt;/td&gt;
                    &lt;td&gt;Some Name&lt;/td&gt;
            &lt;/tr&gt;
        &lt;/tbody&gt;
&lt;/table&gt;</pre>
<p>All you need to do to filter is hide the rows that don't match the option selected:</p>
<pre class="language-javascript">$('select').on('change', function(e){
    // Get the value of the select box
    var val = $(this).val();
 // Show all the rows
    $('tbody tr').show();
    // If there is a value hide all the rows except the ones with a data-year of that value
    if(val) {
        $('tbody tr').not($('tbody tr[data-year="' + val + '"]')).hide();
    }
});</pre>
<hr>
<p>The next step was to get it filtering page load - if one of the options was selected.</p>
<p>First step is to add a <code>selected</code> attribute to one of the <code>option</code>s</p>
<pre>
&lt;option selected&gt;1997&lt;/option&gt;</pre>
<p>Next with the JS - rather than repeat ourselves, we can abstract the logic out into a function and fire that on page load.</p>
<pre class="language-javascript">var filterTable = function(item) {
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
filterTable($('select'));</pre>
<p>This working example can be found on <a href="http://codepen.io/mikestreety/pen/OPOVma">Codepen</a></p>
<hr>
<p>The last thing we might want to do is have multiple filters and tables on one page. Again, to save repeating ourselves we can utilise data attributes and store the class of the table we wish to filter on the select box:</p>
<pre class="language-html">&lt;select data-table="test1"&gt;</pre>
<p>Which reflects the CSS class:</p>
<pre class="language-html">&lt;table class="test1"&gt;</pre>
<p>This means the tables and select boxes can exist in different parts of the page (if needs be).</p>
<p>The other change to the JS is the page load function, this now grabs all the selects and loops through them - filtering each table in turn:</p>
<pre class="language-javascript">var filterTable = function(item) {
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
})</pre>
