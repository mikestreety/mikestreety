---
title: PHP Classes - Explained
date: 2016-03-07
updated: 2017-05-03
intro: To put it very simply, a PHP class is a way of grouping a set of functions and variables into entities,allowing them to be used as self-contained instances . It ...
tags:
 - Web
 - PHP
 - Back-end Development
---

<p>To put it very simply, a PHP class is a way of grouping a set of functions and variables into entities,allowing them to be used as self-contained instances . It is often described as the "cookie cutter". They are the groundwork behind object oriented programming.</p>
<p>Once a class is in use (once it has been in <strong>"instantiated"</strong>) then this creates an <strong>object</strong> (the "cookie").</p>
<p>Functions inside of classes are called <strong>methods</strong> and variables are called <strong>properties</strong></p>
<h3>Creating a Class</h3>
<p>Creating a class couldn't be simpler. For this article I will be using the analogy of a bike - as we are all familiar with bikes and how they work. The bike I currently own is a <em>Jamis Ventura</em> - this will all become clear later.</p>
<p>To create a class, define it using the <code>class</code> keyword:</p>
<pre class="language-php">class Bike
{
}</pre>
<p>The groundwork of the class is now complete! However classes on their own don't do anything, they need to be instantiated. We do this using the new keyword, and store it in a variable.</p>
<pre class="language-php">$jamis = new Bike;</pre>
<p>The variable <code>$jamis</code> is now an instance of the <code>Bike</code> class. Because the class has no methods or properties, inspecting the output of a <code>var_dump</code> returns the following:</p>
<pre class="language-php">object(Bike)</pre>
<h3>Add a property</h3>
<p>Bikes have 2 wheels - which we want to add as a property to our class.</p>
<p>Properties & Methods in a class can either be <strong>public</strong> (can be accessed outside of the class) or <strong>private</strong> (can only be referred to by other properties and methods inside the class). There is also <strong>static</strong> and&nbsp;<strong>protected</strong>,  but they are a little beyond the scope of this article.</p>
<p>For this example, we will define a public property, for ease of reading and writing a value to this property.</p>
<pre class="language-php">class Bike
{
    public $numberOfWheels = 2;
}</pre>
<p>Now we can echo the <code>numberOfWheels</code> property on our <code>$jamis</code> Bike object</p>
<pre class="language-php">$jamis = new Bike;
echo $jamis-&gt;numberOfWheels;</pre>
<p>This outputs <em>"2"</em></p>
<h3>Add a method</h3>
<p>A method (function) gives the ability to be a bit more complex and return more than just a string. For now, we just want to return a simple sentence.</p>
<p>This is achieved by declaring the function with a return:</p>
<pre class="language-php">class Bike
{
    public $numberOfWheels = 2;
    public function whatIs()
    {
        return 'I am a mode of transport with 2 wheels';
    }
}</pre>
<p>I can now echo <code>$jamis-&gt;whatIs();</code> and have that phrase output on the screen.</p>
<h3>Using properties and methods within the class</h3>
<p>This method, however, currently is not doing it much. We could just have easily stored this sentence in a variable.</p>
<p>We can update the method to utilise properties in the class to construct a more dynamic sentence.</p>
<pre class="language-php">public function whatIs()
{
    return 'I am a mode of transport with ' . $this-&gt;numberOfWheels . ' wheels';
}</pre>
<h3>Updating properties</h3>
<p>Once a class is instantiated, you can change the value of properties.</p>
<p>I've added a <code>$model</code> property to my class:</p>
<pre class="language-php">class Bike
{
    public $numberOfWheels = 2;
    public $model = 'Ventura';
    public function whatIs()
    {
        return 'I am a mode of transport with ' . $this-&gt;numberOfWheels . ' wheels';
    }
}</pre>
<p>If for this instance I wanted to change the model, I can simply change the value of the property, using the new instantiated object.</p>
<pre class="language-php">$jamis = new Bike;
$jamis-&gt;model = 'Icon';
echo $jamis-&gt;model;</pre>
<p>This will output 'Icon'.
Properties can also be updated within methods.</p>
<h3>Passing parameters to methods</h3>
<p>I've updated my class to allow the bike model to be passed in via a method/parameter:</p>
<pre class="language-php">class Bike
{
    public $numberOfWheels = 2;
    public $model = 'Ventura';
    public function whatIs()
    {
        return 'I am a mode of transport with ' . $this-&gt;numberOfWheels . ' wheels';
    }
    public function whatModel($model)
    {
        $this-&gt;model = $model;
        return 'The model of this bike is: ' . $this-&gt;model;
    }
}</pre>
<p>This would then allow me to update the <code>$model</code> property and use it at the same time.</p>
<pre class="language-php">echo $jamis-&gt;whatModel('Icon');
echo $jamis-&gt;model;</pre>
<p>This would display <em>"The model of this bike is: Icon"</em> and <em>"Icon"</em>. A slight modification could make the parameter optional:</p>
<pre class="language-php">class Bike
{
    public $numberOfWheels = 2;
    public $model = 'Ventura';
    public function whatIs()
    {
        return 'I am a mode of transport with ' . $this-&gt;numberOfWheels . ' wheels';
    }
    public function whatModel($model = null)
    {
        if($model)
            $this-&gt;model = $model;
        return 'The model of this bike is: ' . $this-&gt;model;
    }
}
$jamis = new Bike;
echo $jamis-&gt;whatModel() . '
' . $jamis-&gt;whatModel('Icon') . '
' . $jamis-&gt;model;</pre>
<p>This would output:</p>
<blockquote>
The model of this bike is: Ventura<br>
The model of this bike is: Icon<br>
Icon</blockquote>
<h3>Extending Classes</h3>
<p>One very powerful function classes have is the ability to extend one another. This is a way of sharing methods and properties (and functionality) whilst keeping your code clean and understandable - without repeating yourself.</p>
<p>If, say, I wanted to make a <strong>Tricycle</strong> class. Now Trikes are very similar to Bikes and share many of the same attributes (pedals,  saddle etc.) However, they do have one major difference - the number of wheels.</p>
<p>Rather than make a whole new <code>Tricycle</code> class and repeat the methods and properties, you can extend an existing class and overwrite/modify the attributes as required.</p>
<p>To extend a class, you simply declare what class it extends when creating the new class:</p>
<pre class="language-php">class Tricycle extends Bike
{
}</pre>
<p>This means I can then instantiate a <code>Tricycle</code> class and be able to access the same properties and methods that the <code>Bike</code> class has:</p>
<pre class="language-php">$trike = new Tricycle;
echo $trike-&gt;model;</pre>
<p>This will output <em>"Ventura"</em>.</p>
<p>As I mentioned earlier, Tricycles have 3 wheels. When extending a class you can overwrite the methods and properties, simply by declaring them again in the same way they were initially declared.</p>
<p>So to set the number of wheels for my <code>$trike</code>, I can create a public property inside the class</p>
<pre class="language-php">class Tricycle extends Bike
{
    public $numberOfWheels = 3;
}
$trike = new Tricycle;
echo $trike-&gt;numberOfWheels;</pre>
<p>This shows <em>"3"</em> when run in the browser. Because my <code>whatIs()</code> method in my <code>Bike</code> class uses that property, I am able to use it on the instance of the <code>Trike</code> class:</p>
<pre class="language-php">$trike = new Tricycle;
echo $trike-&gt;whatIs();</pre>
<p>This prints out <em>"I am a mode of transport with 3 wheels"</em>.</p>
<h3>Multiple instances of the same class</h3>
<p>Classes can be instantiated multiple times on the same page, and properties/attributes that are modified are stored within that instance.</p>
<pre class="language-php">$jamis = new Bike;
$olympic = new Bike;
$olympic-&gt;model = 'Hoy';
echo $jamis-&gt;whatModel();
echo $olympic-&gt;whatModel();</pre>
<p>This is using the <code>Bike</code> class twice - but modifying the model on the second instance. Calling the <code>whatModel()</code> method on both instances produces different results:</p>
<blockquote>
The model of this bike is: Ventura<br>
The model of this bike is: Hoy</blockquote>
<h3>Magic Methods</h3>
<p>PHP Classes have a collection of <a href="http://www.php.net/manual/en/language.oop5.magic.php">magic methods</a> which are reserved and get called at various times. The most commonly used one is <code>__construct()</code>. This gets called when instantiating the class.</p>
<p>I am going to set up a <strong>private</strong> property of <code>$rider</code> which gets set when instantiating the <code>Bike</code> class (using the <code>__construct</code> magic method) - this will then get called from a <strong>method</strong></p>
<p>Declare the private property:</p>
<pre class="language-php">private $rider;</pre>
<p>On instantiation, set the rider to be the value passed in:</p>
<pre class="language-php">__construct($rider)
{
    $this-&gt;rider = $rider;
}</pre>
<p>Lastly, add a method to call the rider:</p>
<pre class="language-php">public function whoRides()
{
    return $this-&gt;rider . ' is the rider of the ' . $this-&gt;model;
}</pre>
<p>The whole <code>Bike</code> class now looks like:</p>
<pre class="language-php">class Bike
{
    public $numberOfWheels = 2;
    public $model = 'Ventura';
    private $rider;
    function __construct($rider)
    {
        $this-&gt;rider = $rider;
    }
    public function whatIs()
    {
        return 'I am a mode of transport with ' . $this-&gt;numberOfWheels . ' wheels';
    }
    public function whatModel($model = null)
    {
        if($model)
            $this-&gt;model = $model;
        return 'The model of this bike is: ' . $this-&gt;model;
    }
    public function whoRides()
    {
        return $this-&gt;rider . ' is the rider of the ' . $this-&gt;numberOfWheels . ' wheeled ' . $this-&gt;model;
    }
}</pre>
<p>Instantiating the class, now requires a parameter to be passed into the class:</p>
<pre class="language-php">$bike = new Bike('Mike Street');</pre>
<p>This sets the rider as Mike Street, but trying to access the rider property (<code>echo $bike-&gt;rider</code>) will return an error due the property being set to being private.</p>
<p>I can, however, call the <code>whoRides()</code> method:</p>
<pre class="language-php">$bike = new Bike('Mike Street');
echo $bike-&gt;whoRides();</pre>
<p>This will output <em>"Mike Street is the rider of the 2 wheeled Ventura"</em>.</p>
<p>Using the classes above, with a combination of the <code>extend</code>, multiple instantiation and Magic methods, you could recreate the following:</p>
<pre class="language-php">$bike = new Bike('Mike Street');
$olympic = new Bike('Chris Hoy');
$olympic-&gt;model = 'Hoy';
$trike = new Tricycle('Sam King');
$trike-&gt;model = 'Argos Own';
echo $bike-&gt;whoRides() . '
';
echo $olympic-&gt;whoRides() . '
';
echo $trike-&gt;whoRides();</pre>
<p>Which will output</p>
<blockquote>
Mike Street is the rider of the 2 wheeled Ventura<br>
Chris Hoy is the rider of the 2 wheeled Hoy<br>
Sam King is the rider of the 3 wheeled Argos Own</blockquote>