var registered = {};

exports.register = function (filter, name) {
  name = name || require('./functionName')(filter);
  if (!name) {
    throw new Error('Anonymous functions cannot be registered as filters. Please provide named function or pass second argument as filter name');
  }

  registered[name] = filter;

  return filter;
};

exports.flush = function (ngModule) {
  Object.keys(registered).forEach(function (filterName) {
    ngModule.filter(filterName, registered[filterName]);
  });
};
