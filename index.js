var ownEnumerableKeys = require('own-enumerable-keys')

module.exports = objectAssignFilter
function objectAssignFilter (target) {
  var filter = arguments[arguments.length - 1]
  if (typeof filter !== 'function') {
    throw new TypeError('last parameter must be a filter function')
  }

  if (target === undefined || target === null) {
    throw new TypeError('target cannot be null or undefined')
  }

  var fromObj
  var toObj = Object(target)
  var keys

  for (var s = 1; s < arguments.length - 1; s++) {
    fromObj = arguments[s]
    keys = ownEnumerableKeys(Object(fromObj))

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      var val = fromObj[key]
      if (filter(val, key, fromObj)) {
        toObj[key] = val
      }
    }
  }

  return toObj
}
