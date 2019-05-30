/**
 * Default ease function that returns the same value
 * @method ease
 * @param {*} f - any value
 * @returns {*} same received value
 */
const ease = f => f

/**
 * Returns current time with best precision possible
 * @method now
 * @returns {number} current time in milliseconds
 */
const now = () => (performance && performance.now) ? performance.now() : Date.now()

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

  onUpdate.call(null, value)

  if (repeat) requestAnimationFrame(step.bind(null, context))
}

/**
 * Tweens a value for a certain amount of time
 * @method tween
 * @params {Object} context - object with values, starting time and methods
 * @params {number} context.duration - duration the values should tween
 * @params {*} context.from - initial value
 * @params {*} context.to - end value
 * @params {function} context.ease - function to alter value variant
 * @params {function} context.onUpdate - method to execute on each value change
 */
const tween = (context) => {
  context.startTime = now()
  context.ease = typeof context.ease === 'function' ? context.ease : ease
  requestAnimationFrame(step.bind(null, context))
}

export default tween
