# phena

[![Build Status](https://travis-ci.org/jeremenichelli/phena.svg?branch=master)](https://travis-ci.org/jeremenichelli/phena)

Petit animation engine.

_The name of the library comes from [phenakistiscope](https://en.wikipedia.org/wiki/Phenakistiscope) discs, one of the first motion artifacts used for entertainment._

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
  - [Context object](#context-object)
- [Contributing](#contributing)
  - [TODO](#todo)
- [Disclaimer](#disclaimer)

## Installation

Add it to your application using a package manager.

```sh
# npm
npm i phena --save

# yarn
yarn add phena
```

_You can also drop it in the browser as a script with source **https://unpkg.com/phena**._

## Usage

The package exposes one method that receives a context object.

```js
import animate from 'phena'

const pumpkin = document.querySelector('.pumpkin')

animate({
  from: -100,
  to: 100,
  duration: 450,
  onUpdate: (value) => {
    pumpkin.style.transform = `translateX(${ value })`
  }
})
```

`onUpdate` will be queued on the next frame with the correct value.

### Context object

As the only argument, the context object expects as required:
 
  - `from`, number representing the initial value.
  - `to`, also number, for the the final value.
  - `duration`, number for the time span of the animation.
  - `onUpdate`, function to be call.

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

This package is not an animation library, and has no intentions to be in the short term, so it won't expose a richful API like other tools out there. For now, it just provides the minimum set of options to iterate over value updates, focusing on animation of DOM element.
