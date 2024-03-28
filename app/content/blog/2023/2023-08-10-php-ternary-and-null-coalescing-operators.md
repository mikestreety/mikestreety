---
title: PHP Ternary and null coalescing operators
date: 2023-08-10
intro: What's the difference between a ternary and null coalescing operators? Do they give different results?
permalink: "blog/php-ternary-and-null-coalescing-operators/"
tags:
 - PHP
---

I write PHP on a daily basis and often, as with most programming, need to check if something is there or not, or if it is what I expect.

Beyond `if` statements, there are ternary operators. Things like the Elvis (`?:`) operator or the Null coalescing operator (`??`) can be used to make your code leaner, cleaner and easier to read.

If you've not come across them before, here's a quick overview.

## Elvis operator

`$output = $value ?: 'default'` is the equivalent of writing the following

```php
if ($value) {
	$output = $value;
} else {
	$output = 'default';
}
```

or as a shorter, oneliner

```php
$output = $value ? $value : 'default';
```

## Null coalescing operator

While the null coalescing operator (`$output = $value ?? 'default'` ) is slightly different

```php
if (isset($value)) {
	$output = $value;
} else {
	$output = 'default';
}
```

or

```php
$output = isset($value) ? $value ? 'default';
```

Null coalescing operators can be chained too which makes them more powerful

```php
$value = $_GET['user'] ?? $_POST['user'] ?? 'nobody';
```

## Comparison

They are similar, but the do have their differences and can sometimes trip you up and give you the unexpected. I've drawn up a table below which should help identify which one you need.


- `$v` signifies the variable in the leftmost column
- A ⚠️ signifies a PHP warning is thrown in 8.2.

|  | `$v ?? 'default'` | `$v ?: 'default'` |
|---|---|---|
| `$non_var;` | default | ⚠️ default |
| `$null = null;` | default | default |
| `$booly = '1';` | 1 | 1 |
| `$bool = true;` | 1 | 1 |
| `$empty_string = '';` | `` | default |
| `$string = 'string';` | string | string |
| `$zero_string = '0';` | 0 | default |
| `$zero = 0;` | 0 | default |
| `$array['non_key']` | default | ⚠️ default |
| `$array['null_key'] = null;` | default | default |
| `$array['string_key'] = 'string';` | string | string |
| `$array['zero_key'] = 0;`| 0 | default |
| `$array['number_key'] = 2;` | 2 | 2 |
| `$array['sub_array_array'] = [];` | Array | default |
| `$array['sub_array'] = [...];` | Array | Array |
| `$array['sub_array']['non_key']` | default | default |
| `$array['sub_array']['null_key'] = null;` | default | default |


The code I used to check can be seen on [onlinephp](https://onlinephp.io/c/67e66) - I've also included it below

```php
$null = null;

$booly = '1';

$bool = true;

$empty_string = '';

$string = 'string';

$zero_string = '0';

$zero = 0;

$array = [
	'null_key' => null,
	'string_key' => 'string',
	'zero_key' => 0,
	'number_key' => 2,
	'sub_array_array' => [],
	'sub_array' => [
		'null_key' => null,
		'string_key' => 'string',
	]
];

echo '| $non_var | ' . ($non_var ?? 'default') . ' | ' . ($non_var ?: 'default') . ' |<br>';
echo '| $null | ' . ($null ?? 'default') . ' | ' . ($null ?: 'default') . ' |<br>';
echo '| $booly | ' . ($booly ?? 'default') . ' | ' . ($booly ?: 'default') . ' |<br>';
echo '| $bool | ' . ($bool ?? 'default') . ' | ' . ($bool ?: 'default') . ' |<br>';
echo '| $empty_string  | ' . ($empty_string ?? 'default') . ' | ' . ($empty_string ?: 'default') . ' |<br>';
echo '| $string | ' . ($string ?? 'default') . ' | ' . ($string ?: 'default') . ' |<br>';
echo '| $zero_string | ' . ($zero_string ?? 'default') . ' | ' . ($zero_string ?: 'default') . ' |<br>';
echo '| $zero | ' . ($zero ?? 'default') . ' | ' . ($zero ?: 'default') . ' |<br>';
echo '| $array[non_key] | ' . ($array['non_key'] ?? 'default') . ' | ' . ($array['non_key'] ?: 'default') . ' |<br>';
echo '| $array[null_key] | ' . ($array['null_key'] ?? 'default') . ' | ' . ($array['null_key'] ?: 'default') . ' |<br>';
echo '| $array[string_key] | ' . ($array['string_key'] ?? 'default') . ' | ' . ($array['string_key'] ?: 'default') . ' |<br>';
echo '| $array[zero_key] | ' . ($array['zero_key'] ?? 'default') . ' | ' . ($array['zero_key'] ?: 'default') . ' |<br>';
echo '| $array[number_key] | ' . ($array['number_key'] ?? 'default') . ' | ' . ($array['number_key'] ?: 'default') . ' |<br>';
echo '| $array[sub_array] | ' . ($array['sub_array'] ?? 'default') . ' | ' . ($array['sub_array'] ?: 'default') . ' |<br>';
echo '| $array[sub_array_array] | ' . ($array['sub_array_array'] ?? 'default') . ' | ' . ($array['sub_array_array'] ?: 'default') . ' |<br>';
echo '| $array[sub_array][non_key] | ' . ($array['sub_array']['non_key'] ?? 'default') . ' | ' . ($array['sub_array']['non_key'] ?: 'default') . ' |<br>';
echo '| $array[sub_array][null_key] | ' . ($array['sub_array']['null_key'] ?? 'default') . ' | ' . ($array['sub_array']['null_key'] ?: 'default') . ' |<br>';
echo '| $array[sub_array][string_key] | ' . ($array['sub_array']['string_key'] ?? 'default') . ' | ' . ($array['sub_array']['string_key'] ?: 'default') . ' |<br>';
```
