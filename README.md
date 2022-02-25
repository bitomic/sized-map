# Sized Map
> ES6 Map with a configurable max size.

![npm](https://img.shields.io/npm/v/sized-map)
![NPM](https://img.shields.io/npm/l/sized-map)

## Features
* Written using TypeScript (and thus fully typed, supporting TypeScript and JavaScript).
* Lightweight.
* Same interface as [ECMAScript's Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), you can substitute it **almost** seamlessly (only need to set its `maxSize` in the constructor).
* Supports ESM and CJS.

## Installation
```
# npm
npm i sized-map

# yarn
yarn add sized-map
```

## Usage
> The following examples use TypeScript and ESM `import ... from ...`, but it works the same with JavaScript and/or CJS.

Create a new instance:
```ts
import SizedMap from 'sized-map'
const map = new Map<string, number>(3)
```

Add keys and values:
```ts
map.set('a', 1)
map.set('b', 2)
map.set('c', 3)
console.log(map)
// SizedMap(3) [Map] { 'a' => 1, 'b' => 2, 'c' => 3 }
```

When you try to set a new key and it has reached its max length, it will remove the oldest key.

```ts
map.set('d', 4)
console.log(map)
// SizedMap(3) [Map] { 'b' => 2, 'c' => 3, 'd' => 4 }
```

You can also change the max size of an already created `SizedMap`:

```ts
map.maxSize = 1
console.log(map)
// SizedMap(1) [Map] { 'd' => 4 }
```

If the `newSize` is smaller than its `originalSize`, it will remove `originalSize - newSize` elements, keeping the most recent ones.

## Notes
Setting an already set key will be treated as a new key. In the following example, `a` isn't removed because it was re-set after `b`.

```ts
const map = new Map<string, number>(2)
map.set('a', 1)
map.set('b', 2)
map.set('a', 3)
map.set('c', 4)
map.set('d', 5)
// SizedMap(3) [Map] { 'a' => 3, 'c' => 4, 'd' => 5 }
```