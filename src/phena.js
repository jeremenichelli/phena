// default ease
const ease = f => f

// get current time
const now = () => (performance && performance.now) ? performance.now() : Date.now()

// step through values based on time elapsed
const step = (context) => {
  const { from, to, duration, startTime, ease, onUpdate } = context
  const currentTime = now()
  const elapsed = Math.min(1, (currentTime - startTime) / duration)
  const value = ease(from + (to - from) * elapsed)
  const repeat = elapsed !== 1

  onUpdate.call(null, value)

  if (repeat) requestAnimationFrame(step.bind(null, context))
}

// kick off animation
const animate = (context) => {
  context.startTime = now()
  context.ease = typeof context.ease === 'function' ? context.ease : ease
  requestAnimationFrame(step.bind(null, context))
}

export default animate
