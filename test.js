var filterAssign = require('./')
var test = require('tape')

test('extends the specified keys into the given object', function (t) {
  var obj1 = { beep: 'hello', boop: 25, other: null, override: 5 }
  t.deepEqual(filterAssign({
    initial: 5
  }, obj1, {
    override: 0
  }, function (value) {
    return typeof value === 'number'
  }), { boop: 25, initial: 5, override: 0 }, 'filters by value')

  t.deepEqual(filterAssign({}, obj1, function (_, key) {
    return ['beep', 'boop'].indexOf(key) >= 0
  }), { beep: 'hello', boop: 25 }, 'filters by keys')
  t.end()
})

test('truthiness', function (t) {
  var obj1 = { beep: 'hello', boop: 25, other: null, override: 5 }
  var yep = function () { return true }
  var nope = function () { return false }

  t.deepEqual(filterAssign(obj1, yep), { beep: 'hello', boop: 25, other: null, override: 5 })
  t.deepEqual(filterAssign(obj1, { accept: true }, yep), { accept: true, beep: 'hello', boop: 25, other: null, override: 5 })

  // reset
  obj1 = { beep: 'hello', boop: 25, other: null, override: 5 }
  t.deepEqual(filterAssign(obj1, nope), { beep: 'hello', boop: 25, other: null, override: 5 })
  t.deepEqual(filterAssign(obj1, { accept: true }, nope), { beep: 'hello', boop: 25, other: null, override: 5 })
  t.end()
})

test('returns same object', function (t) {
  var obj1 = { beep: 'hello', boop: 25, other: null, override: 5 }
  t.equal(filterAssign(obj1, {}, { blah: 'foo' }, function () { return false }), obj1)
  t.deepEqual(obj1, { beep: 'hello', boop: 25, other: null, override: 5 })
  t.end()
})

test('needs function', function (t) {
  t.throws(function () {
    filterAssign({})
  }, 'currently requires function to avoid ambiguity with function objects')
  t.end()
})
