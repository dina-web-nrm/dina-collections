import flattenObjectResponse from './index'

describe('utilities/transformations/flattenObjectResponse', () => {
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
      id,
      relationships,
      type,
    }

    expect(testValue).toEqual(expectedResult)
  })
})
