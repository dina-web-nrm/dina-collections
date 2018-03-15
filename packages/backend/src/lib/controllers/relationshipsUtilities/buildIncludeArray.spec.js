const buildIncludeArray = require('./buildIncludeArray')

describe('lib/controllers/relationshipsUtilities/buildIncludeArray', () => {
  it('is a function', () => {
    expect(typeof buildIncludeArray).toBe('function')
  })
  it('throws error if models not provided', () => {
    expect(() => buildIncludeArray()).toThrow()
  })
  it('return empty array if only models provided', () => {
    expect(buildIncludeArray({ models: {} })).toEqual([])
  })
  it('handles complex example', () => {
    const relations = {
      children: {
        format: 'array',
        resource: 'curatedLocality',
      },
      parent: {
        format: 'object',
        resource: 'curatedLocality',
      },
    }
    const models = {
      curatedLocality: {
        Model: {
          key: 'curatedLocality',
        },
      },
    }

    const queryParamRelationships = ['children']

    expect(
      buildIncludeArray({
        models,
        queryParamRelationships,
        relations,
      })
    ).toEqual([
      {
        as: 'children',
        model: {
          key: 'curatedLocality',
        },
      },
    ])
  })
})
