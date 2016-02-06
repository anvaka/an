# Angular + npm

Build angular 1.x apps with power of npm modules.

# usage

To start using `an` just replace `angular.{controller|directive|...}('name', fn)`
with: `module.exports = require('an').{controller|...}('name', fn)`

Then in your main file where you bootstrap angular application:

``` js
var app = angular.module('yourModule', [/* your regular deps */]);
// flush all registered modules:
require('an').flush(app);
```

## Demo

``` js
// controller.js
module.exports = require('an').controller('AppCtrl', function($scope) {
  $scope.message = 'Hello World';
});

// app.js
require('./controller.js'); // just make sure the controller is registered

var app = angular.module('myApp', []);
// flush controller into app:
require('an').flush(app);

// this is equivalent to:
// app.controller('AppCtrl', function() {...});
```

``` html
<!DOCTYPE html>
<html ng-app='myApp'>
<head>
 <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>
</head>
<body ng-controller='AppCtrl'>
    <h1>{{message}}</h1>
    <script src='bundle.js'></script>
</body>
</html>
```

See [demo folder](https://github.com/anvaka/an/tree/master/demo) for the same code.
Browserified output of the demo folder (`browserify ./demo/app.js > ./demo/bundle.js`)
can be found here: https://anvaka.github.io/an/demo

# How?

The idea is simple: avoid using `angular.module` in npm package, and delay
directives registration up to the point when application is bootstrapped.

E.g. instead of doing:

``` js
  var myModule = angular.module(???, []);
  myModule.directive(???, function myDirective() {/* */});
```

Do:

``` js
  require('an').directive(function myDirective() {});
```

When you ready to bootstrap application, collect all directives and register them in your main application module:

``` js
  require('an').flush();
```


# Drawbacks

This approach is still not perfect and requires certain discipline to not forget
register your directives via `an`. I can also see potential problems with names
collision, versioning (especially when `an` itself is updated).
This module is [really simple](https://github.com/anvaka/an/blob/master/index.js)
at the moment, and maybe there is a better way of sharing angular directives on
npm.

Please let me know.

# install

With [npm](https://npmjs.org) do:

```
npm install an
```

# license

MIT
