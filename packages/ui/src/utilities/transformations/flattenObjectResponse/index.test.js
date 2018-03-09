import flattenObjectResponse, { flattenRelationships } from './index'

describe('utilities/transformations/flattenObjectResponse', () => {
  describe('flattenRelationships', () => {
    it('returns falsy value', () => {
      expect(flattenRelationships(undefined)).toEqual(undefined)
      expect(flattenRelationships(null)).toEqual(null)
    })
    it('returns empty object', () => {
      expect(flattenRelationships({})).toEqual({})
    })
    it('flattens singular and multiple resources', () => {
      const relationships = {
        manyResources: {
          data: [{ id: '1', type: 'many' }, { id: '2', type: 'many' }],
        },
        oneResource: {
          data: { id: '1', type: 'one' },
        },
      }

      const testValue = flattenRelationships(relationships)
      const expectedResult = {
        manyResources: [{ id: '1', type: 'many' }, { id: '2', type: 'many' }],
        oneResource: { id: '1', type: 'one' },
      }

      expect(testValue).toEqual(expectedResult)
    })
  })

  describe('flattenObjectResponse', () => {
    it('returns object with undefined properties', () => {
      const undefinedProperties = {
        attributes: undefined,
        id: undefined,
        relationships: undefined,
        type: undefined,
      }

      expect(flattenObjectResponse({})).toEqual(undefinedProperties)
      expect(flattenObjectResponse({ data: undefined })).toEqual(
        undefinedProperties
      )
    })

    it('flattens API response with singular resource', () => {
      const attributes = {
        name: 'Ada Lovelace',
      }
      const id = '1'
      const relationships = {
        computers: {
          data: [
            {
              id: '1',
              type: 'computer',
            },
          ],
        },
        mouse: {
          data: {
            id: '1',
            type: 'mouse',
          },
        },
      }
      const type = 'specimen'

      const response = {
        data: {
          attributes,
          id,
          relationships,
          type,
        },
      }

      const testValue = flattenObjectResponse(response)
      const expectedResult = {
        ...attributes,
        ...flattenRelationships(relationships),
        id,
        type,
      }

      expect(testValue).toEqual(expectedResult)
    })
  })
})
