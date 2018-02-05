import { BOOTSTRAP_REGISTER_MODULES } from '../actionTypes'

import registerModules from './registerModules'

describe('coreModules/bootstrap/actionCreators/registerModules', () => {
  it(`returns ${BOOTSTRAP_REGISTER_MODULES} action`, () => {
    const config = { api: {} }
    const modules = { bootstrap: {} }
    const testValue = registerModules({ config, modules })
    const expectedResult = {
      payload: { config, modules },
      type: BOOTSTRAP_REGISTER_MODULES,
    }

    expect(testValue).toEqual(expectedResult)
  })
})
