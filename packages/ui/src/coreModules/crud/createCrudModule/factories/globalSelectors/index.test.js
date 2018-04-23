import createGlobalSelectors, { dep } from './index'

describe('coreModules/crud/CrudManager/globalSelectors', () => {
  it('is a function', () => {
    expect.assertions(1)
    expect(typeof createGlobalSelectors).toBe('function')
  })
  describe('with dependor', () => {
    let wrapSelectorsMock
    beforeEach(() => {
      wrapSelectorsMock = jest.fn()
      dep.freeze()
      dep.mock({
        wrapSelectors: input => {
          wrapSelectorsMock(input)
          return input
        },
      })
    })
    afterAll(() => {
      dep.reset()
    })
    it('call createGlobalSelectors and return result', () => {
      expect.assertions(2)

      const input = { resourceSelectors: {} }
      const res = createGlobalSelectors(input)
      expect(wrapSelectorsMock.mock.calls.length).toEqual(1)
      expect(res).toBeTruthy()
    })
  })
})
