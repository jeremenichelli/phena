import test from 'ava'
import sinon from 'sinon'
import { Tween } from '.'

test.beforeEach(() => {
  // mock request animation frame
  global.requestAnimationFrame = sinon.stub().callsFake((f) => f())

  // set performance.now stub
  global.performance = { now: sinon.stub() }
})

test.afterEach(() => {
  global.performance.now.reset()
  global.requestAnimationFrame.reset()
})

test('calls onUpdate with correct value', (t) => {
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

test('accepts tweening a collection of values', (t) => {
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

  new Tween({
    from: [20, 0],
    to: [40, 100],
    duration: 1000,
    onUpdate: updateSpy
  })

  t.deepEqual(updateSpy.callCount, 3)
  t.deepEqual(updateSpy.getCall(0).args[0], [25, 25])
  t.deepEqual(updateSpy.getCall(1).args[0], [30, 50])
  t.deepEqual(updateSpy.getCall(2).args[0], [40, 100])
})

test('accepts delay and ends tweening with correct value', (t) => {
  global.performance.now = sinon
    .stub()
    .onCall(0)
    .returns(0)
    .onCall(1)
    .returns(190)
    .onCall(2)
    .returns(700)
    .onCall(3)
    .returns(1200)

  const updateSpy = sinon.spy()

  new Tween({
    from: 0,
    to: 250,
    delay: 200,
    duration: 1000,
    onUpdate: updateSpy
  })

  t.is(updateSpy.callCount, 2)
  t.is(updateSpy.getCall(0).args[0], 125)
  t.is(updateSpy.getCall(1).args[0], 250)
})

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

test('does not call onUpdate when paused', (t) => {
  global.performance.now = sinon
    .stub()
    .onCall(0)
    .returns(0)
    .onCall(1)
    .returns(1000)

  const updateSpy = sinon.spy()

  new Tween({
    from: 0,
    to: 250,
    duration: 1000,
    onUpdate: updateSpy,
    paused: true
  })

  t.is(updateSpy.callCount, 0)
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

test('calls onComplete when tweening is done', (t) => {
  global.performance.now = sinon
    .stub()
    .onCall(0)
    .returns(0)
    .onCall(1)
    .returns(1000)

  const completeSpy = sinon.spy()

  new Tween({
    from: 0,
    to: 250,
    duration: 1000,
    onComplete: completeSpy
  })

  t.is(completeSpy.callCount, 1)
})
