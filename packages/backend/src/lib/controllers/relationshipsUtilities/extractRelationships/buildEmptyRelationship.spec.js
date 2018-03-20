const buildEmptyRelationship = require('./buildEmptyRelationship')

describe('lib/controllers/relationshipsUtilities/extractRelationships/extractRelationships', () => {
  it('is a function', () => {
    expect(typeof buildEmptyRelationship).toBe('function')
  })
  it('handle array format', () => {
    expect(buildEmptyRelationship({ format: 'array' })).toEqual({ data: [] })
  })
  it('handle object format', () => {
    expect(buildEmptyRelationship({ format: 'object' })).toEqual({ data: null })
  })
  it('default to object format', () => {
    expect(buildEmptyRelationship()).toEqual({ data: null })
  })
})
