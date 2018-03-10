import deepFreeze from 'deep-freeze'

import updateResourcesInState from './index'

describe('utilities/stateHelper/updateResourcesInState', () => {
  it('returns state if action does not contain payload', () => {
    const state = { 1: { id: '1' } }
    deepFreeze(state)
    const action = { payload: undefined }

    const testValue = updateResourcesInState(state, action)
    const expectedResult = { ...state }

    expect(testValue).toEqual(expectedResult)
  })
  it('returns state if payload does not contain id', () => {
    const state = { 1: { id: '1' } }
    deepFreeze(state)
    const action = { payload: { id: undefined } }

    const testValue = updateResourcesInState(state, action)
    const expectedResult = { ...state }

    expect(testValue).toEqual(expectedResult)
  })
  it('returns new, updated state object', () => {
    const state = {
      1: {
        firstName: 'Hal',
        id: '1',
        lastName: '2000',
      },
    }
    deepFreeze(state)

    const action = {
      payload: [
        {
          firstName: 'Ada',
          id: '2',
          lastName: 'Lovelace',
        },
        {
          firstName: 'Alan',
          id: '3',
          lastName: 'Turing',
        },
      ],
      type: 'someType',
    }

    const testValue = updateResourcesInState(state, action)
    const expectedResult = {
      2: {
        firstName: 'Ada',
        id: '2',
        lastName: 'Lovelace',
      },
      3: {
        firstName: 'Alan',
        id: '3',
        lastName: 'Turing',
      },
    }

    expect(testValue).toEqual(expectedResult)
  })
})
