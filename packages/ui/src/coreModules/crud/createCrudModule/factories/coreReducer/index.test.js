import createCoreReducer, { dep } from './index'

describe('coreModules/crud/createCrudModule/factories/coreReducer', () => {
  it('is a function', () => {
    expect.assertions(1)
    expect(typeof createCoreReducer).toBe('function')
  })
  describe('with dependor', () => {
    let combineReducersMock
    beforeEach(() => {
      combineReducersMock = jest.fn()
      dep.freeze()
      dep.mock({
        combineReducers: input => {
          combineReducersMock(input)
          return input
        },
      })
    })
    afterAll(() => {
      dep.reset()
    })
    it('call combineReducers and return result', () => {
      expect.assertions(2)

      const input = { resourceReducers: {} }
      const res = createCoreReducer(input)
      expect(combineReducersMock.mock.calls.length).toEqual(1)
      expect(res).toBeTruthy()
    })
  })
})
