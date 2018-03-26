import {
  createActionType,
  getActionTypeFromKey,
  getCleanKey,
  getParametersFromKey,
  isParameterKey,
} from './utilities'

describe('utilities/keyObjectModuleFactory/utilities', () => {
  describe('isParameterKey', () => {
    it('is a function', () => {
      return expect(typeof isParameterKey).toBe('function')
    })
    it('returns true if is indexParameter', () => {
      return expect(isParameterKey(':param')).toBe(true)
    })
    it('returns false if is not indexParameter', () => {
      return expect(isParameterKey('param')).toBe(false)
    })
  })
  describe('getCleanKey', () => {
    it('is a function', () => {
      return expect(typeof getCleanKey).toBe('function')
    })
    it('returns clean key', () => {
      return expect(getCleanKey(':param')).toBe('param')
    })
    it('returns non modified key if already cleaned', () => {
      return expect(getCleanKey('param')).toBe('param')
    })
    it('returns clean key if multiple params exist', () => {
      return expect(getCleanKey('first.:param.:otherParam')).toBe(
        'first.param.otherParam'
      )
    })
  })
  describe('getParametersFromKey', () => {
    it('is a function', () => {
      return expect(typeof getParametersFromKey).toBe('function')
    })
    it('returns params if key contains params', () => {
      return expect(getParametersFromKey(':param')).toEqual(['param'])
    })
    it('returns empty array if no params', () => {
      return expect(getParametersFromKey('param')).toEqual([])
    })
    it('returns multiple params if multiple params exist in correct order', () => {
      return expect(getParametersFromKey('first.:param.:otherParam')).toEqual([
        'param',
        'otherParam',
      ])
    })
  })
  describe('getActionTypeFromKey', () => {
    it('is a function', () => {
      return expect(typeof getActionTypeFromKey).toBe('function')
    })
    it('returns action type from key', () => {
      return expect(getActionTypeFromKey('a.:param.:otherParam')).toBe(
        'A_PARAM_OTHERPARAM'
      )
    })
  })

  describe('createActionType', () => {
    it('is a function', () => {
      return expect(typeof createActionType).toBe('function')
    })
    it('returns action type from key', () => {
      return expect(
        createActionType({
          actionPrefix: 'TEST',
          actionVerb: 'SET',
          key: 'a.:param.:otherParam',
        })
      ).toBe('TEST_SET_A_PARAM_OTHERPARAM')
    })
  })
})
