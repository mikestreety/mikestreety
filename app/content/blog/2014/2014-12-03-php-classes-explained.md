---
title: PHP Classes - Explained
date: 2014-12-03
updated: 2021-09-19
intro: To put it very simply, a PHP class is a way of grouping a set of functions and variables into entities,allowing them to be used as self-contained instances.
permalink: "blog/php-classes-explained/"
tags:
 - Web
 - PHP
 - Back-end Development
---

To put it very simply, a PHP class is a way of grouping a set of functions and variables into entities,allowing them to be used as self-contained instances. It is often described as the "cookie cutter". They are the groundwork behind object oriented programming.

Once a class is in use (once it has been in **"instantiated"**) then this creates an **object** (the "cookie").

Functions inside of classes are called **methods** and variables are called **properties**

### Creating a Class

Creating a class couldn't be simpler. For this article I will be using the analogy of a bike - as we are all familiar with bikes and how they work. The bike I currently own is a _Jamis Ventura_ - this will all become clear later.

To create a class, define it using the `class` keyword:

```php
class Bike
{
}
```

The groundwork of the class is now complete! However classes on their own don't do anything, they need to be instantiated. We do this using the new keyword, and store it in a variable.

```php
$jamis = new Bike;
```

The variable `$jamis` is now an instance of the `Bike` class. Because the class has no methods or properties, inspecting the output of a `var_dump` returns the following:

object(Bike)

### Add a property

Bikes have 2 wheels - which we want to add as a property to our class.

Properties & Methods in a class can either be **public** (can be accessed outside of the class) or **private** (can only be referred to by other properties and methods inside the class). There is also **static** and **protected**, but they are a little beyond the scope of this article.

For this example, we will define a public property, for ease of reading and writing a value to this property.

```php/2
class Bike
{
	public $numberOfWheels = 2;
}
```

Now we can echo the `numberOfWheels` property on our `$jamis` Bike object

```php
$jamis = new Bike;
echo $jamis->numberOfWheels;
```

This outputs _"2"_

### Add a method

A method (function) gives the ability to be a bit more complex and return more than just a string. For now, we just want to return a simple sentence.

This is achieved by declaring the function with a return:

```php/4-7
class Bike
{
	public $numberOfWheels = 2;

	public function whatIs()
	{
		return 'I am a mode of transport with 2 wheels';
	}
}
```

I can now echo `$jamis->whatIs();` and have that phrase output on the screen.

### Using properties and methods within the class

This method, however, currently is not doing it much. We could just have easily stored this sentence in a variable.

We can update the method to utilise properties in the class to construct a more dynamic sentence.

```php
public function whatIs()
{
	return 'I am a mode of transport with ' . $this->numberOfWheels . ' wheels';
}
```

### Updating properties

Once a class is instantiated, you can change the value of properties.

I've added a `$model` property to my class:

```php
class Bike
{
	public $numberOfWheels = 2;

	public $model = 'Ventura';

	public function whatIs()
	{
		return 'I am a mode of transport with ' . $this->numberOfWheels . ' wheels';
	}
}
```

If for this instance I wanted to change the model, I can simply change the value of the property, using the new instantiated object.

```php
$jamis = new Bike;
$jamis->model = 'Icon';
echo $jamis->model;
```

This will output 'Icon'. Properties can also be updated within methods.

### Passing parameters to methods

I've updated my class to allow the bike model to be passed in via a method/parameter:

```php
class Bike
{
	public $numberOfWheels = 2;

	public $model = 'Ventura';

	public function whatIs()
	{
		return 'I am a mode of transport with ' . $this->numberOfWheels . ' wheels';
	}

	public function whatModel($model)
	{
		$this->model = $model;
		return 'The model of this bike is: ' . $this->model;
	}
}
```

This would then allow me to update the `$model` property and use it at the same time.

```php
echo $jamis->whatModel('Icon');
echo $jamis->model;
```

This would display _"The model of this bike is: Icon"_ and _"Icon"_. A slight modification could make the parameter optional:

```php
class Bike
{
	public $numberOfWheels = 2;

	public $model = 'Ventura';

	public function whatIs()
	{
		return 'I am a mode of transport with ' . $this->numberOfWheels . ' wheels';
	}

	public function whatModel($model = null)
	{
		if($model) {
			$this->model = $model;
		}

		return 'The model of this bike is: ' . $this->model;
	}
}

$jamis = new Bike;
echo $jamis->whatModel() . '
' . $jamis->whatModel('Icon') . '
' . $jamis->model;
```

This would output:

> The model of this bike is: Ventura
> The model of this bike is: Icon
> Icon

### Extending Classes

One very powerful function classes have is the ability to extend one another. This is a way of sharing methods and properties (and functionality) whilst keeping your code clean and understandable - without repeating yourself.

If, say, I wanted to make a **Tricycle** class. Now Trikes are very similar to Bikes and share many of the same attributes (pedals, saddle etc.) However, they do have one major difference - the number of wheels.

Rather than make a whole new `Tricycle` class and repeat the methods and properties, you can extend an existing class and overwrite/modify the attributes as required.

To extend a class, you simply declare what class it extends when creating the new class:

```php
class Tricycle extends Bike
{
}
```

This means I can then instantiate a `Tricycle` class and be able to access the same properties and methods that the `Bike` class has:

```php
$trike = new Tricycle;
echo $trike->model;
```

This will output _"Ventura"_.

As I mentioned earlier, Tricycles have 3 wheels. When extending a class you can overwrite the methods and properties, simply by declaring them again in the same way they were initially declared.

So to set the number of wheels for my `$trike`, I can create a public property inside the class

```php
class Tricycle extends Bike
{
	public $numberOfWheels = 3;
}

$trike = new Tricycle;
echo $trike->numberOfWheels;
```
This shows _"3"_ when run in the browser. Because my `whatIs()` method in my `Bike` class uses that property, I am able to use it on the instance of the `Trike` class:

$trike = new Tricycle;
echo $trike->whatIs();

This prints out _"I am a mode of transport with 3 wheels"_.

### Multiple instances of the same class

Classes can be instantiated multiple times on the same page, and properties/attributes that are modified are stored within that instance.

```php
$jamis = new Bike;

$olympic = new Bike;
$olympic->model = 'Hoy';

echo $jamis->whatModel();
echo $olympic->whatModel();
```

This is using the `Bike` class twice - but modifying the model on the second instance. Calling the `whatModel()` method on both instances produces different results:

> The model of this bike is: Ventura
> The model of this bike is: Hoy

### Magic Methods

PHP Classes have a collection of [magic methods](http://www.php.net/manual/en/language.oop5.magic.php) which are reserved and get called at various times. The most commonly used one is `__construct()`. This gets called when instantiating the class.

I am going to set up a **private** property of `$rider` which gets set when instantiating the `Bike` class (using the `__construct` magic method) - this will then get called from a **method**

Declare the private property:

private $rider;

On instantiation, set the rider to be the value passed in:

```php
__construct($rider)
{
	$this->rider = $rider;
}
```

Lastly, add a method to call the rider:

```php
public function whoRides()
{
	return $this->rider . ' is the rider of the ' . $this->model;
}
```

The whole `Bike` class now looks like:

```php
class Bike
{
	public $numberOfWheels = 2;
	public $model = 'Ventura';
	private $rider;
	function __construct($rider)
	{
		$this->rider = $rider;
	}
	public function whatIs()
	{
		return 'I am a mode of transport with ' . $this->numberOfWheels . ' wheels';
	}
	public function whatModel($model = null)
	{
		if($model)
			$this->model = $model;
		return 'The model of this bike is: ' . $this->model;
	}
	public function whoRides()
	{
		return $this->rider . ' is the rider of the ' . $this->numberOfWheels . ' wheeled ' . $this->model;
	}
}
```

Instantiating the class, now requires a parameter to be passed into the class:

```php
$bike = new Bike('Mike Street');
```

This sets the rider as Mike Street, but trying to access the rider property (`echo $bike->rider`) will return an error due the property being set to being private.

I can, however, call the `whoRides()` method:

```php
$bike = new Bike('Mike Street');
echo $bike->whoRides();
```

This will output _"Mike Street is the rider of the 2 wheeled Ventura"_.

Using the classes above, with a combination of the `extend`, multiple instantiation and Magic methods, you could recreate the following:

```php
$bike = new Bike('Mike Street');

$olympic = new Bike('Chris Hoy');
$olympic->model = 'Hoy';

$trike = new Tricycle('Sam King');
$trike->model = 'Argos Own';

echo $bike->whoRides() . PHP_EOL;
echo $olympic->whoRides() . PHP_EOL;
echo $trike->whoRides();
```

Which will output

> Mike Street is the rider of the 2 wheeled Ventura
> Chris Hoy is the rider of the 2 wheeled Hoy
> Sam King is the rider of the 3 wheeled Argos Own
