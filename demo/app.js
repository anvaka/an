/* global angular */
require('./controller.js'); // just make sure the controller is registered

var app = angular.module('myApp', []);
// flush controller into app:
require('../').flush(app);

// this is equivalent to:
// app.controller('AppCtrl', function() {...});
