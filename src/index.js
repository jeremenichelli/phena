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
 * @params {*} context.from - initial value
 * @params {*} context.to - end value
 * @params {function} context.ease - function to alter value variant
 * @params {function} context.onUpdate - method to execute on each value change
 * @returns {number} time stamp when the animation run
 */
const step = (context) => {
  const { from, to, duration, startTime, ease, onUpdate } = context

  const currentTime = now()
  const elapsed = Math.min(1, (currentTime - startTime) / duration)
  const value = from + (to - from) * ease(elapsed)
  const repeat = elapsed !== 1

  onUpdate(value)

  if (repeat) context.frame = requestAnimationFrame(() => step(context))
}

/**
 * Returns an objectto start tweening a value
 * @class Tween
 * @params {Object} context - object with values, starting time and methods
 * @params {number} context.duration - duration the values should tween
 * @params {*} context.from - initial value
 * @params {*} context.to - end value
 * @params {function} context.ease - function to alter value variant
 * @params {function} context.onUpdate - method to execute on each value change
 */
class Tween {
  constructor(context) {
    // hoist context
    this.__context__ = context

    this.start()
  }

  /**
   * Starts tweening
   * @method start
   * @memberof Tween
   */
  start() {
    this.__context__.startTime = now()
    this.__context__.ease =
      typeof this.__context__.ease === 'function' ? this.__context__.ease : ease

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

export default Tween
