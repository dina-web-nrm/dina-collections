import * as constants from './constants'

describe('coreModules/crud/constants', () => {
  it('has key ALL_OPERATION_TYPES', () => {
    expect(constants.ALL_OPERATION_TYPES).toBeTruthy()
  })

  it('has all types in ALL_OPERATION_TYPES', () => {
    const typeConstants = Object.keys(constants).reduce(
      (types, constantKey) => {
        if (constantKey.indexOf('OPERATION_TYPE_') === 0) {
          return [...types, constants[constantKey]]
        }
        return types
      },
      []
    )
    expect(typeConstants.length).toEqual(constants.ALL_OPERATION_TYPES.length)

    constants.ALL_OPERATION_TYPES.forEach(typeConstant => {
      expect(typeConstants.includes(typeConstant)).toBe(true)
    })
  })
})
