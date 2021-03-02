---
title: How to filter an array of objects based on a secondary array in JavaScript
date: 2018-08-07
updated: 2018-08-07
intro: Sounds confusing, but there is a use-case, honest! Imagine you have an array with a set number of items in and you wanted to filter another array of objects based on that in your JavaScript. The post explains more!
tags:
 - Web
 - Javascript
---

_Was recently asked to help write some code for this scenario - just jotting it down in case I need it again!_

## The Input

There is an array of objects with details of a football game. Each player that played in the match is associated with an ID and tracked on the game object:

<pre class="language-js">const games = [
	{
        id: '1',
        players: [1, 2, 4, 5]
    }, {
        id: '2',
        players: [3, 5, 6]
    }, {
        id: '3',
        players: [1, 2, 4]
    }
];</pre>

We then wish to filter this array, by extracting the games that _either_ of the following players played in:

## The filter

<pre class="language-js">const playersToFilter = [3, 5];</pre>

With the code, we should get an array with games `1` and `2` in - as players `3` and `5` played in one or both of them:

## Expected output

<pre class="language-js">[{
    id: '1',
    players: [1, 2, 4, 5]
}, {
    id: '2',
    players: [3, 5, 6]
}]</pre>

## The result

Filtering the array took some time to get to the result, but once figured out it turned out to be 3 lines of code (when written in ES2015).

### ES2015

<pre class="language-js">const filteredGames = games.filter(game => {
    return game.players.some(player => playersToFilter.includes(player));
});</pre>

Before I jump in explaining what each line/function does - I'll also include the code in "old money" (still using the functions) but without the `=>` shortcutes

<pre class="language-js">var filteredGames = games.filter(function(game) {
    return game.players.some(function(player) {
        return playersToFilter.includes(player)
    })
});</pre>

## The explanation

`const filteredGames = games.filter()`

The filter function enables you to quickly trim down an array by using a conditional statement and returning `true` or `false`. It loops through all of the items of the given array (in this case, `games`), calculates the result and populates the variable based on the outcome. If the function returns true, the whole item (for example, the game with the ID and players) gets added to a new array.

As an example, say you wanted all numbers lower than `3` from an array. You could use `filter()` like so:

<pre class="language-js">let numbers = [1, 2, 3, 4];
let lowNumbers = numbers.filter(n => n < 3);</pre>

`lowNumbers` would now equal `[1, 2]`. Pre ES2015, this code would look something like:

<pre class="language-js">var numbers = [1, 2, 3, 4];
var lowNumbers = [];

for (i = 0; i < numbers.length; i++) {
  if(numbers[i] < 3) {
    lowNumbers.push(numbers[i]);
  }
}</pre>

You can already see that the `filter` function allows for more succinct code.

`return game.players.some();`

Remembering that, within the `filter` function, we are "looping" through the objects, we now have the properties available to us. `game.players` will return the array of players. 

The `some()` function is really the magic ingredient here. It allows you to test an array to see if any of the items match the conditions you're passing in. Once again, it loops through each element (in this instance `player`). You can [read more about the `some` function on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some).

Without the `some()` function, we would need to loop through the players, setting a variable to `true` if the condition exists and then passing that variable back at the end. 

`playersToFilter.includes(player)`

This is the condition we are passing to the `some()` function. It is a check to see if the `playersToFilter` array includes the current `player` we are looping through.

If this returns `true` to the `some()` filter, it would mean this line would return `true`:

<pre class="language-js">return game.players.some(player => playersToFilter.includes(player));</pre>

With that line returning `true`, this would in turn pass `true` to the `filter()` function, which would include it in the new array.

Still not making sense? Feel free to drop a comment below or [tweet me](https://twitter.com/mikestreety) with your questions!