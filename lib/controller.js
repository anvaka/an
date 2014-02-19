var registered = {};

exports.register = function (ctrl, name) {
  name = name || require('./functionName')(ctrl);
  if (!name) {
    throw new Error('Anonymous functions cannot be registered as controllers. Please provide named function or pass second argument as controlelr name');
  }

  registered[name] = ctrl;

  return ctrl;
};

exports.flush = function (ngModule) {
  Object.keys(registered).forEach(function (ctrlName) {
    ngModule.controller(ctrlName, registered[ctrlName]);
  });
};
