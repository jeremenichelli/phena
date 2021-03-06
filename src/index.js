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
 * @params {number} context.duration - duration of tweening in milliseconds
 * @params {number} context.delay - delay tweening in milliseconds
 * @params {number|Array} context.from - initial value
 * @params {number|Array} context.to - end value
 * @params {function} context.ease - function to alter value variant
 * @params {function} context.onUpdate - method to execute on each value change
 * @params {function} context.onComplete - method to execute when tweening is finished
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
 * @params {number} context.delay - delay tweening in milliseconds
 * @params {number} context.from - initial value
 * @params {number} context.to - end value
 * @params {function} context.ease - function to alter value variant
 * @params {boolean} context.paused - don't kick off tweening at instantiation
 * @params {function} context.onUpdate - method to execute on each value change
 * @params {function} context.onComplete - method to execute when tweening is finished
 */
export class Tween {
  constructor(context) {
    /*
     * private fields minified to have less impact on bundle size
     * __c hoists context object passed to the constructor
     */
    this.__c = context
    this.__c.ease = context.ease || ease
    this.__c.onUpdate = context.onUpdate || noop
    this.__c.onComplete = context.onComplete || noop
    this.__c.delay = context.delay || 0

    if (!context.paused) this.start()
  }

  /**
   * Starts tweening
   * @method start
   * @memberof Tween
   */
  start() {
    this.__c.startTime = now()
    step(this.__c)
  }

  /**
   * Cancels tweening
   * @method cancel
   * @memberof Tween
   */
  cancel() {
    cancelAnimationFrame(this.__c.frame)
  }
}
