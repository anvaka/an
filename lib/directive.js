var registered = {};

exports.register = function (directive, name) {
  name = name || require('./functionName')(directive);
  if (!name) {
    throw new Error('Anonymous functions cannot be registered as directives. Please provide named function or pass second argument as directive name');
  }

  registered[name] = directive;

  return directive;
};

exports.flush = function (ngModule) {
  Object.keys(registered).forEach(function (dirName) {
    ngModule.directive(dirName, registered[dirName]);
  });
};
