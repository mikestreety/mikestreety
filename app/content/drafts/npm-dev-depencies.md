installing just dev dependencies

```
let dependencies = require('./_package.json').devDependencies,
	output  = '';
Object.keys(dependencies).forEach(key => {
	output += key + '@' + dependencies[key] + ' ';
})
console.log(output);

```

```
    - mv package.json _package.json
    # Only install devDependencies
    - npm i $(node -e "let d=require('./_package.json').devDependencies,o='';Object.keys(d).forEach((e=>{o+=e+'@'+d[e]+' '})),console.log(o);")
    # Move package.json back
    - mv _package.json package.json
```
