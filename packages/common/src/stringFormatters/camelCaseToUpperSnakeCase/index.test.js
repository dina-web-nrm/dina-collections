const camelCaseToUpperSnakeCase = require('./index')

describe('stringFormatting/camelCaseToUpperSnakeCase', () => {
  it('returns input if falsy', () => {
    expect(camelCaseToUpperSnakeCase()).toBeFalsy()
    expect(camelCaseToUpperSnakeCase('')).toBeFalsy()
    expect(camelCaseToUpperSnakeCase(0)).toBeFalsy()
    expect(camelCaseToUpperSnakeCase(false)).toBeFalsy()
    expect(camelCaseToUpperSnakeCase(null)).toBeFalsy()
  })
  it('Turns camelCase into CAMEL_CASE', () => {
    expect(camelCaseToUpperSnakeCase('camelCase')).toBe('CAMEL_CASE')
  })
})
