import test from 'ava'
import sinon from 'sinon'
import Tween from '.'

test.beforeEach(() => {
  // mock request animation frame
  global.requestAnimationFrame = (f) => f()

  // set default now stub
  global.performance = { now: sinon.stub() }
})

test.afterEach(() => {
  global.performance.now.reset()
})

test('calls onUpdate with correct values', (t) => {
  global.performance.now = sinon
    .stub()
    .onCall(0)
    .returns(0)
    .onCall(1)
    .returns(250)
    .onCall(2)
    .returns(500)
    .onCall(3)
    .returns(1000)

  const updateSpy = sinon.spy()
  new Tween({ from: 0, to: 250, duration: 1000, onUpdate: updateSpy })

  t.is(updateSpy.callCount, 3)
  t.is(updateSpy.getCall(0).args[0], 250 / 4)
  t.is(updateSpy.getCall(1).args[0], 250 / 2)
  t.is(updateSpy.getCall(2).args[0], 250)
})

// test('does not start when paused is true', (t) => {
//   global.performance.now = sinon.stub()
//   global.requestAnimationFrame = sinon.stub()
//   const updateSpy = sinon.spy()
//   new Tween({ from: 0, to: 250, duration: 1000, onUpdate: updateSpy, paused: true })

//   t.is(updateSpy.callCount, 3)
//   t.is(updateSpy.getCall(0).args[0], 250 / 4)
//   t.is(updateSpy.getCall(1).args[0], 250 / 2)
//   t.is(updateSpy.getCall(2).args[0], 250)
// })

test('calls onUpdate with correct values on negative direction', (t) => {
  global.performance.now = sinon
    .stub()
    .onCall(0)
    .returns(0)
    .onCall(1)
    .returns(250)
    .onCall(2)
    .returns(500)
    .onCall(3)
    .returns(1000)

  const updateSpy = sinon.spy()
  new Tween({ from: 0, to: -250, duration: 1000, onUpdate: updateSpy })

  t.is(updateSpy.callCount, 3)
  t.is(updateSpy.getCall(0).args[0], -250 / 4)
  t.is(updateSpy.getCall(1).args[0], -250 / 2)
  t.is(updateSpy.getCall(2).args[0], -250)
})

test('corrects value when time elapsed exceeds', (t) => {
  global.performance.now = sinon
    .stub()
    .onCall(0)
    .returns(0)
    .onCall(1)
    .returns(250)
    .onCall(2)
    .returns(500)
    .onCall(3)
    .returns(1200)

  const updateSpy = sinon.spy()
  new Tween({ from: 0, to: 250, duration: 1000, onUpdate: updateSpy })

  t.is(updateSpy.getCall(2).args[0], 250)
})

test('ease method is called with proportional time', (t) => {
  global.performance.now = sinon
    .stub()
    .onCall(0)
    .returns(0)
    .onCall(1)
    .returns(250)
    .onCall(2)
    .returns(500)
    .onCall(3)
    .returns(1000)

  const updateSpy = sinon.spy()
  const easeSpy = sinon.spy()
  new Tween({
    from: 0,
    to: 300,
    duration: 1000,
    ease: easeSpy,
    onUpdate: updateSpy
  })

  // check ease calls
  t.is(easeSpy.callCount, 3)
  t.is(easeSpy.getCall(0).args[0], 0.25)
  t.is(easeSpy.getCall(1).args[0], 0.5)
  t.is(easeSpy.getCall(2).args[0], 1)
})
