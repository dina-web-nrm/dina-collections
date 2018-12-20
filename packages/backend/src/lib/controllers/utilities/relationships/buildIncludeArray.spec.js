const buildIncludeArray = require('./buildIncludeArray')

describe('lib/controllers/utilities/relationships/buildIncludeArray', () => {
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
        resource: 'place',
        targetResource: 'place',
      },
      parent: {
        format: 'object',
        resource: 'place',
        targetResource: 'place',
      },
    }
    const models = {
      place: {
        Model: {
          key: 'place',
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
          key: 'place',
        },
        paranoid: true,
      },
    ])
  })
})
