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

## Usage

The package exposes one method that receives a context object.

```js
import tween from 'phena'

const pumpkin = document.querySelector('.pumpkin')

tween({
  from: -100,
  to: 100,
  duration: 450,
  onUpdate: (value) => {
    pumpkin.style.transform = `translateX(${ value })`
  }
})
```

`onUpdate` will be queued on each animation frame passing the value corresponding to the time the frame was executed. This method is part of the context object you pass to the library.

### The context object

As the only argument, the context object expects as required:
 
  - `from`, number representing the initial value.
  - `to`, also number, for the the final value.
  - `duration`, number for the time span of the animation.
  - `onUpdate`, function to be call.
  - `ease`, function to to alter the value passed to `onUpdate`.

## Contributing

- Clone or fork this repository.
- In the root folder, run `yarn` to install the dependencies.
- Apply your fixes or features.

_Update or add tests if necessary._

- Run `yarn test` to make sure there's no regression.
- Submit a PR 🎉

👉 You can do `yarn test --watch` when working on TDD mode.

### TODO

  - Move `ease` and `now` as helpers in different folder.
  - Allow multiple values iteration.
  - Add `onComplete` method.

## Disclaimer

**phena** works similar to basic time based tweening utility, but internally it relies on enqueueing callbacks in the paint thread so it's ideal for scheduling animation jobs.

This package is not an animation library and has no intentions to become one, so it won't expose a richful API like other tools out there. For now, it just provides the minimum set of options to iterate over value updates, focusing on animation of DOM elements.
