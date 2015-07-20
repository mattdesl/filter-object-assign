# filter-object-assign

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

A small utility like ES2015 [Object.assign()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), but only merging in objects that pass the given filter function.

```js
var assign = require('filter-object-assign')

target = assign(target, sources..., filterFunction)
```

Much of the implementation is from Sindre Sorhus' [object-assign](https://github.com/sindresorhus/object-assign).

## Install

```sh
npm install filter-object-assign --save
```

## Example

```js
var assign = require('filter-object-assign')

var stats = {
  health: 100,
  manna: 100
}

var wizard = {
  name: 'Hilbert',
  health: 75
}

assign(stats, wizard, function (value, key, object) {
  return typeof value === 'number'
})

console.log(stats)
//=> { health: 75, manna: 100 }
```

## Usage

[![NPM](https://nodei.co/npm/filter-object-assign.png)](https://www.npmjs.com/package/filter-object-assign)

#### `target = filterAssign(target, sources, ..., filterFunction)`

Behaves like [Object.assign()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) in that it merges the variable-length `sources` arguments into the `target` object (from left to right). 

However, this expects a `filterFunction` passed as the last argument. This function takes the following parameters:

- *value* the value of the property about to be merged
- *key* the property name string about to be merged
- *object* the (source) object being enumerated and merged

The `target` object, which must not be null/undefined, is returned.

## See Also

- [object-assign](https://github.com/sindresorhus/object-assign)

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/filter-object-assign/blob/master/LICENSE.md) for details.
