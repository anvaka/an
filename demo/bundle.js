(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global angular */
require('./controller.js'); // just make sure the controller is registered

var app = angular.module('myApp', []);
// flush controller into app:
require('../').flush(app);

// this is equivalent to:
// app.controller('AppCtrl', function() {...});

},{"../":3,"./controller.js":2}],2:[function(require,module,exports){
module.exports = require('../').controller('AppCtrl', function($scope) {
  $scope.message = 'Hello World';
});

},{"../":3}],3:[function(require,module,exports){
var createAngularPrimitive = require('./lib/createAngularPrimitive');

var exposed = ['directive', 'controller', 'filter', 'factory', 'provider', 'service'];
var services = [];

for (var i = 0; i < exposed.length; ++i) {
  var name = exposed[i];
  var primitive = createAngularPrimitive(name);
  exports[name] = primitive.register;
  services.push(primitive);
}

exports.flush = function (module) {
  if (!module) {
    module = angular.module('anModule', []);
  }
  services.forEach(function (x) { x.flush(module); });

  return module;
};

exports.run = function () {
  var module = this.flush();
  angular.bootstrap(document.body, [module.name]);
  return module;
};

},{"./lib/createAngularPrimitive":4}],4:[function(require,module,exports){
var registeredPrimitives = {};

module.exports = function (primitiveName) {
  var handler = registeredPrimitives[primitiveName];
  if (!handler) {
    registeredPrimitives[primitiveName] = handler = angularPrimitive(primitiveName);
  }

  return handler;
};

function angularPrimitive(primitiveName) {
  var registered = typeof Object.create === 'function' ? Object.create(null) : {};

  return {
    register: register,
    flush: flush
  };

  function register(fn, name) {
    if (name === undefined) {
      name = require('./functionName')(fn);
    }

    // we support symmetrical API.
    if (typeof fn === 'string' && typeof name === 'function') {
      var t = name;
      name = fn;
      fn = t;
    }

    if (!name) {
      throw new Error('Anonymous functions cannot be registered as ' + primitiveName + '. Please provide named function or pass second argument as ' + primitiveName + ' name');
    }

    registered[name] = fn;

    return fn;
  }

  function flush(ngModule) {
    Object.keys(registered).forEach(function (name) {
      ngModule[primitiveName](name, registered[name]);
    });
  }
}

},{"./functionName":5}],5:[function(require,module,exports){
module.exports = function (fun) {
  var funBody = fun.toString();
  var nameMatch = funBody.match(/function\s+(\w+)/);
  return nameMatch && nameMatch[1];
};

},{}]},{},[1]);
