import deepFreeze from 'deep-freeze'

import * as selectors from './selectors'

describe('coreModules/formSupport/selectors', () => {
  describe('getLocalState', () => {
    it('returns local state', () => {
      const localState = { login: { username: { section: 'root' } } }
      deepFreeze(localState)
      const globalState = {
        formSupport: localState,
      }
      deepFreeze(globalState)
      const testValue = selectors.getLocalState(globalState)
      const result = localState

      expect(testValue).toEqual(result)
    })
  })

  let state
  beforeEach(() => {
    state = {
      signup: {
        acceptNewsletter: {
          initiallyShown: true,
          name: 'acceptNewsletter',
          section: 'optional',
          unit: 'settings',
        },
        email: {
          initiallyHidden: true,
          name: 'email',
          section: 'optional',
          unit: 'userInfo',
        },
        password: {
          name: 'password',
          section: 'required',
          unit: 'credentials',
        },
        username: {
          name: 'username',
          section: 'required',
          unit: 'credentials',
        },
      },
    }
    deepFreeze(state)
  })

  describe('getUnitInitiallyHiddenFieldNamesMap', () => {
    it('returns unitInitiallyHiddenFieldNamesMap for form', () => {
      const testValue = selectors.getUnitInitiallyHiddenFieldNamesMap(state, {
        formName: 'signup',
      })
      const result = {
        userInfo: ['email'],
      }

      expect(testValue).toEqual(result)
    })
  })

  describe('getUnitInitiallyHiddenFieldNames', () => {
    it('returns unitInitiallyHiddenFieldNames for unit', () => {
      const testValue = selectors.getUnitInitiallyHiddenFieldNames(state, {
        formName: 'signup',
        unit: 'userInfo',
      })
      const result = ['email']

      expect(testValue).toEqual(result)
    })
  })
})
