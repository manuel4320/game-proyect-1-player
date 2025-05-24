import { describe, it, expect, vi } from 'vitest'

vi.mock('three', async () => {
  const actual = await vi.importActual('three')
  return {
    ...actual,
    Group: class { add() {} },
    Mesh: class {},
    Vector3: class {
      constructor(x = 0, y = 0, z = 0) {
        this.x = x; this.y = y; this.z = z;
      }
      applyQuaternion() { return this }
      normalize() { return this }
      copy() { return this }
    },
    AnimationMixer: class {
      update() {}
      clipAction() {
        return {
          play() {},
          reset() {},
          setLoop() {},
          clampWhenFinished: false,
          crossFadeFrom() {},
          stop() {},
          onFinished: null
        }
      }
    },
    LoopOnce: 'loopOnce'
  }
})

describe('Robot', () => {
  it('should initialize correctly', async () => {
    const { default: Robot } = await import('./Robot.js')

    const experienceMock = {
      scene: { add: vi.fn() },
      resources: {
        items: {
          robotModel: {
            scene: { scale: { set: vi.fn() }, position: { set: vi.fn() }, traverse: vi.fn() },
            animations: Array(11).fill({})
          }
        }
      },
      time: { delta: 0 },
      physics: {
        robotMaterial: {},
        world: { addBody: vi.fn() }
      },
      keyboard: { getState: () => ({}) },
      debug: false
    }

    const robot = new Robot(experienceMock)
    expect(robot).toBeDefined()
  })
})
