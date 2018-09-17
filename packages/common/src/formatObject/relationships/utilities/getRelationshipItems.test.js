const {
  createGetItemFromRawItemId,
  getRelationshipItems,
  removeFalsyElements,
} = require('./getRelationshipItems')

describe('formatObject/relationships/utilities/resolveByPath/getRelationshipItems', () => {
  describe('createGetItemFromRawItemId', () => {
    test('is a function', () => {
      const testValue = typeof createGetItemFromRawItemId
      const expectedResult = 'function'

      expect(testValue).toEqual(expectedResult)
    })

    test('returns a function', () => {
      const testValue = typeof createGetItemFromRawItemId({
        getItemByTypeId: () => {},
        type: 'agent',
      })
      const expectedResult = 'function'

      expect(testValue).toEqual(expectedResult)
    })

    let getItemByTypeId
    let getItemPromiseFromRawItem
    beforeEach(() => {
      getItemByTypeId = jest.fn((type, id) => Promise.resolve(`${type}-${id}`))
      getItemPromiseFromRawItem = createGetItemFromRawItemId({
        getItemByTypeId,
        type: 'agent',
      })
    })

    test('returns undefined from getItemByTypeId if missing raw item', () => {
      expect.assertions(2)
      return getItemPromiseFromRawItem() // no item
        .then(res => {
          expect(getItemByTypeId).toHaveBeenCalledTimes(0)
          expect(res).toEqual(undefined)
        })
    })

    test('returns undefined from getItemByTypeId if raw item is missing id', () => {
      expect.assertions(2)
      return getItemPromiseFromRawItem({ id: undefined }) // no id
        .then(res => {
          expect(getItemByTypeId).toHaveBeenCalledTimes(0)
          expect(res).toEqual(undefined)
        })
    })

    test('returns result from getItemByTypeId', () => {
      expect.assertions(3)
      return getItemPromiseFromRawItem({ id: '123' }).then(res => {
        expect(getItemByTypeId).toHaveBeenCalledTimes(1)
        expect(getItemByTypeId).toHaveBeenCalledWith('agent', '123', {
          relationshipKey: undefined,
        })
        expect(res).toEqual('agent-123')
      })
    })
  })

  describe('removeFalsyElements', () => {
    test('is a function', () => {
      const testValue = typeof removeFalsyElements
      const expectedResult = 'function'

      expect(testValue).toEqual(expectedResult)
    })

    test('returns true if truthy', () => {
      expect(removeFalsyElements({})).toEqual(true)
    })

    test('returns false if falsy', () => {
      expect(removeFalsyElements(undefined)).toEqual(false)
      expect(removeFalsyElements(null)).toEqual(false)
    })
  })

  describe('getRelationshipItems', () => {
    test('is a function', () => {
      const testValue = typeof getRelationshipItems
      const expectedResult = 'function'

      expect(testValue).toEqual(expectedResult)
    })

    test('rejects if no getItemByTypeId provided', () => {
      expect(getRelationshipItems({})).rejects.toThrow(
        'missing getItemByTypeId'
      )
    })

    let getItemByTypeId
    beforeEach(() => {
      getItemByTypeId = jest.fn((type, id) => `${type}-${id}`)
    })

    test('rejects if no type provided', () => {
      expect(getRelationshipItems({ getItemByTypeId })).rejects.toThrow(
        'missing type'
      )
    })

    test('returns empty array if relationships does not contain relationshipKey', () => {
      expect.assertions(1)
      return getRelationshipItems({
        getItemByTypeId,
        relationshipKey: 'test',
        relationships: {},
        type: 'agent',
      }).then(res => {
        expect(res).toEqual([])
      })
    })

    test('returns empty array if there is no relationship data', () => {
      expect.assertions(1)
      return getRelationshipItems({
        getItemByTypeId,
        relationshipKey: 'agent',
        relationships: {
          agent: {}, // no data key
        },
        type: 'agent',
      }).then(res => {
        expect(res).toEqual([])
      })
    })

    test('removes falsy elements, gets items from raw item ids and removes undefined values', () => {
      getItemByTypeId = jest.fn((type, id) => {
        if (id === '123') {
          return {
            attributes: { name: 'Jane' },
            id: '123',
            type,
          }
        }

        // let's pretend this is missing
        if (id === '456') {
          return null
        }

        return undefined
      })

      const expectedResult = [
        {
          attributes: { name: 'Jane' },
          id: '123',
          type: 'agent',
        },
      ]

      return getRelationshipItems({
        getItemByTypeId,
        relationshipKey: 'normalizedAgents',
        relationships: {
          normalizedAgents: {
            data: [{ id: '123' }, null, { id: '456' }],
          },
        },
        type: 'agent',
      }).then(res => {
        expect(res).toEqual(expectedResult)
      })
    })
  })
})
