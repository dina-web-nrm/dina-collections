const shouldIncludeRelation = require('./shouldIncludeRelation')

describe('lib/controllers/utilities/relationships/shouldIncludeRelation', () => {
  it('is a function', () => {
    expect(typeof shouldIncludeRelation).toBe('function')
  })
  it('return false if no input provided', () => {
    expect(shouldIncludeRelation()).toBe(false)
  })
  it('return true if queryParamRelationships includes all', () => {
    expect(
      shouldIncludeRelation({
        queryParamRelationships: ['all'],
      })
    ).toBe(true)
  })
  it('return true if queryParamRelationships includes all and other relationKey', () => {
    expect(
      shouldIncludeRelation({
        queryParamRelationships: ['all'],
        relationKey: 'otherKey',
      })
    ).toBe(true)
  })
  it('return true if queryParamRelationships have relationKey', () => {
    expect(
      shouldIncludeRelation({
        queryParamRelationships: ['someKey'],
        relationKey: 'someKey',
      })
    ).toBe(true)
  })
  it('return false if queryParamRelationships dont have relationKey', () => {
    expect(
      shouldIncludeRelation({
        queryParamRelationships: ['someKey'],
        relationKey: 'otherKey',
      })
    ).toBe(false)
  })
})
