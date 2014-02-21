var directive = require('./lib/directive');
var controller = require('./lib/controller');
var filter = require('./lib/filter');

module.exports = {
  directive: directive.register,
  controller: controller.register,
  filter: filter.register,

  flush: function (module) {
    if (!module) {
      module = createModule();
    }

    controller.flush(module);
    directive.flush(module);
    filter.flush(module);

    return module;
  }
};

function createModule() {
  return angular.module('anModule', []);
}
