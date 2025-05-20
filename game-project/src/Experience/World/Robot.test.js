// src/Experience/World/Robot.test.js
import { jest } from '@jest/globals'
import Robot from './Robot.js'

jest.mock('three', () => {
    const actualThree = jest.requireActual('three')

    return {
        ...actualThree,
        Group: jest.fn().mockImplementation(() => ({
            add: jest.fn(),
            position: { set: jest.fn() },
        })),
        AnimationMixer: jest.fn().mockImplementation(() => ({
            clipAction: jest.fn(() => ({
                play: jest.fn(),
                stop: jest.fn(),
                reset: jest.fn(),
                fadeIn: jest.fn(),
                fadeOut: jest.fn(),
            })),
        })),
    }
})

describe('Robot', () => {
    let mockExperience

    beforeEach(() => {
        mockExperience = {
            scene: { add: jest.fn() },
            resources: {
                items: {
                    robotModel: {
                        scene: {
                            scale: { set: jest.fn() },
                            position: { set: jest.fn() },
                            traverse: jest.fn(),
                        },
                        animations: Array(11).fill({ uuid: 'fake-uuid' }), 
                    },
                },
            },
            time: {},
            physics: {
                world: { addBody: jest.fn() },
                robotMaterial: {},
            },
            keyboard: { getState: jest.fn() },
            debug: {},
        }
    })

    test('should add robot model to the scene', () => {
        const robot = new Robot(mockExperience)

        expect(mockExperience.scene.add).toHaveBeenCalledWith(robot.model)
        expect(robot.model.scale.set).toHaveBeenCalled()
        expect(robot.model.position.set).toHaveBeenCalled()
    })
})
