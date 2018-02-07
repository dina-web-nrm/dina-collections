import { BOOTSTRAP_UNREGISTER_MODULES } from '../actionTypes'

import unregisterModules from './unregisterModules'

describe('coreModules/bootstrap/actionCreators/unregisterModules', () => {
  it(`returns ${BOOTSTRAP_UNREGISTER_MODULES} action`, () => {
    const modules = { bootstrap: {} }
    const testValue = unregisterModules({ modules })
    const expectedResult = {
      payload: { modules },
      type: BOOTSTRAP_UNREGISTER_MODULES,
    }

    expect(testValue).toEqual(expectedResult)
  })
})
