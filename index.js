var directive = require('./lib/directive');
var controller = require('./lib/controller');
var filter = require('./lib/filter');

var ngModule;

module.exports = {
  directive: directive.register,
  controller: controller.register,
  filter: filter.register,

  flush: function () {
    // todo: accept module;
    if (!ngModule) {
      ngModule = createModule();
    }

    controller.flush(ngModule);
    directive.flush(ngModule);
    filter.flush(ngModule);

    angular.bootstrap(document, [ngModule.name]);

    return ngModule;
  }
};

function createModule() {
  return angular.module('anModule', []);
}
