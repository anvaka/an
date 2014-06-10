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
