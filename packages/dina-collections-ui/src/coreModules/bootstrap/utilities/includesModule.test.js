import includesModule from './includesModule'

describe('bootstrap/utilities/includesModule', () => {
  it('returns false if no payload provided', () => {
    const action = {}
    const moduleName = 'user'
    const testValue = includesModule(action, moduleName)
    const expectedResult = false

    expect(testValue).toEqual(expectedResult)
  })
  it('returns false if no modules in payload', () => {
    const action = {
      payload: {},
    }
    const moduleName = 'user'
    const testValue = includesModule(action, moduleName)
    const expectedResult = false

    expect(testValue).toEqual(expectedResult)
  })
  it('returns false if moduleName not in modules', () => {
    const action = {
      payload: {
        modules: {},
      },
    }
    const moduleName = 'user'
    const testValue = includesModule(action, moduleName)
    const expectedResult = false

    expect(testValue).toEqual(expectedResult)
  })
  it('returns true if module is true', () => {
    const action = {
      payload: {
        modules: {
          user: true,
        },
      },
    }
    const moduleName = 'user'
    const testValue = includesModule(action, moduleName)
    const expectedResult = true

    expect(testValue).toEqual(expectedResult)
  })
  it('returns true if module is truthy', () => {
    const action = {
      payload: {
        modules: {
          user: { actionTypes: undefined },
        },
      },
    }
    const moduleName = 'user'
    const testValue = includesModule(action, moduleName)
    const expectedResult = true

    expect(testValue).toEqual(expectedResult)
  })
})
