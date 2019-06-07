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
  const {
    delay,
    from,
    to,
    duration,
    startTime,
    ease,
    onUpdate,
    onComplete
  } = context

  const currentTime = now()
  const elapsed = currentTime - startTime

  if (delay >= elapsed) {
    context.frame = requestAnimationFrame(() => step(context))
    return
  }

  // calculate progressed according to time and and easing
  const progress = Math.min(1, (elapsed - delay) / duration)
  const values = from.length
    ? from.map((value, index) => value + (to[index] - value) * ease(progress))
    : from + (to - from) * ease(progress)

  // pass down values to onUpdate callback
  onUpdate(values)

  // call complete callback or invoke new frame
  if (progress === 1) onComplete()
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
    this.__context__.delay = context.delay || 0

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
