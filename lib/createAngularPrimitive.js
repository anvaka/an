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
    name = name || require('./functionName')(fn);
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
