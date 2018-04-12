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
  it('returns new state object every time even if not changed', () => {
    const state = {}
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

    const testValue1 = updateResourcesInState(state, action)
    const testValue2 = updateResourcesInState(state, action)

    expect(testValue1).toEqual(testValue2)
    expect(testValue1).not.toBe(testValue2)
  })
  it('keeps previous properties if not overridden by new payload', () => {
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
      1: {
        firstName: 'Hal',
        id: '1',
        lastName: '2000',
      },
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
  it('does shallow merge of new and pre-existing resources', () => {
    const state = {
      1: {
        firstName: 'Hal', // this is a pre-existing property
        id: '1',
        lastName: '2000',
      },
    }
    deepFreeze(state)

    const action = {
      payload: [
        {
          group: 'super computers', // new property
          id: '1',
          lastName: '3000', // changed lastName
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
      1: {
        firstName: 'Hal',
        group: 'super computers',
        id: '1',
        lastName: '3000',
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
