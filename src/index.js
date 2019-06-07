/**
 * Function that does nothing
 * @method noop
 * @returns {undefined}
 */
const noop = () => {}

/**
 * Default ease function that returns the same value
 * @method ease
 * @param {*} f - any value
 * @returns {*} same received value
 */
const ease = (f) => f

/**
 * Returns current time with best precision possible
 * @method now
 * @returns {number} current time in milliseconds
 */
const now = () =>
  performance && performance.now ? performance.now() : Date.now()

/**
 * Runs a new recursion over requestAnimationFrame
 * @method step
 * @params {Object} context - object with values, starting time and methods
 * @params {number} context.startTime - first time stamp of animation
 * @params {number} context.duration - duration the values should tween
 * @params {number|Array} context.from - initial value
 * @params {number|Array} context.to - end value
 * @params {function} context.ease - function to alter value variant
 * @params {function} context.onUpdate - method to execute on each value change
 * @returns {number} time stamp when the animation run
 */
const step = (context) => {
  const { from, to, duration, startTime, ease, onUpdate, onComplete } = context

  // calculate elapsed time and eased value
  const currentTime = now()
  const elapsed = Math.min(1, (currentTime - startTime) / duration)
  const values = from.length
    ? from.map((value, index) => value + (to[index] - value) * ease(elapsed))
    : from + (to - from) * ease(elapsed)

  // pass down values to onUpdate callback
  onUpdate(values)

  // invoke a new frame if elapsed is not 1
  if (elapsed === 1) onComplete()
  else context.frame = requestAnimationFrame(() => step(context))
}

/**
 * Returns an object to start tweening a value
 * @class Tween
 * @params {Object} context - object with values, starting time and methods
 * @params {number} context.duration - duration the values should tween
 * @params {number} context.from - initial value
 * @params {number} context.to - end value
 * @params {function} context.ease - function to alter value variant
 * @params {boolean} context.paused - don't kick off tweening at instantiation
 * @params {function} context.onUpdate - method to execute on each value change
 */
export class Tween {
  constructor(context) {
    // hoist context and populate default value
    this.__context__ = context
    this.__context__.ease = context.ease || ease
    this.__context__.onUpdate = context.onUpdate || noop
    this.__context__.onComplete = context.onComplete || noop

    if (!context.paused) this.start()
  }

  /**
   * Starts tweening
   * @method start
   * @memberof Tween
   */
  start() {
    this.__context__.startTime = now()
    this.__frame__ = step(this.__context__)
  }

  /**
   * Cancels tweening
   * @method cancel
   * @memberof Tween
   */
  cancel() {
    cancelAnimationFrame(this.__context__.frame)
  }
}
