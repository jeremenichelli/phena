# phena

[![Build Status](https://travis-ci.org/jeremenichelli/phena.svg?branch=master)](https://travis-ci.org/jeremenichelli/phena)

🧸 Petit tweening engine based on `requestAnimationFrame`.

_The name of the library comes from [phenakistiscope](https://en.wikipedia.org/wiki/Phenakistiscope) discs, one of the first motion artifacts used for entertainment._

## Install

Add it to your application using a package manager.

```sh
# npm
npm i phena --save

# yarn
yarn add phena
```

You can also drop it in the browser using a script with `https://unpkg.com/phena` as source.

## `Tween` class

To start tweening a value import the `Tween` class first and pass the options.

```js
import { Tween } from 'phena'

new Tween({ from: 1, to: 10, duration: 2000 })
```

This will iterate values from `1` to `10` in 2 seconds.

To react to this iteration define an `onUpdate` method.

```js
import { Tween } from 'phena'

function onUpdate(value) { console.log(value) }

new Tween({ from: 1, to: 10, duration: 2000, onUpdate })
```

All actions are queued using `requestAnimationFrame` which makes thistweening engine perfect for actions that will trigger paint jobs or layout calculation in the browser.

### `start`

If you passed `paused: true` to options, `start` will allow you to kick off the tweening.

```js
import { Tween } from 'phena'

const tween = new Tween({ from: 1, to: 10, duration: 2000, paused: false })

tween.start()
```

### `cancel`

Stop the tweening at any time.

```js
import { Tween } from 'phena'

const tween = new Tween({ from: 1, to: 10, duration: 2000 })

tween.cancel()
```

_The library doesn't support pause and resume actions yet._


## Available options

List of properties you can pass to `options` object:

 - `from` _required_, initial numeric value
 - `to` _required_, final numberic value
 - `duration` _required_, tweening time in milliseconds
 - `onUpdate`, function to execute on each value update
 - `paused`, by default `false`
 - `ease`, function to alter the rate of change in the value pass to `onUpdate`

## Contributing

To contribute [Node.js](//nodejs.org) and [yarn](//yarnpkg.com) are required.

Before commit make sure to follow [conventional commits](//www.conventionalcommits.org) specification and check all tests pass by running `yarn test`.

## Disclaimer

**phena** works similar to basic time based tweening utility, but internally it relies on enqueueing callbacks in the paint thread so it's ideal for scheduling animation jobs.

This package is not an animation library and has no intentions to become one, so it won't expose a richful API like other tools out there. For now, it just provides the minimum set of options to iterate over value updates, focusing on animation of DOM elements.
