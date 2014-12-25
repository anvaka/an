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
