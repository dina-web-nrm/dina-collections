import flattenObjectResponse from '../flattenObjectResponse'

import flattenArrayResponse from './index'

describe('utilities/transformations/flattenArrayResponse', () => {
  it('returns empty array', () => {
    expect(flattenArrayResponse(undefined)).toEqual([])
    expect(flattenArrayResponse(null)).toEqual([])
    expect(flattenArrayResponse({})).toEqual([])
  })

  it('flattens API response with array of resources', () => {
    const attributes = {
      name: 'Ada Lovelace',
    }
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
      data: [
        {
          attributes,
          id: '1',
          relationships,
          type,
        },
        {
          attributes,
          id: '2',
          relationships,
          type,
        },
      ],
    }

    const testValue = flattenArrayResponse(response.data)
    const expectedResult = [
      flattenObjectResponse(response.data[0]),
      flattenObjectResponse(response.data[1]),
    ]

    expect(testValue).toEqual(expectedResult)
  })
})
