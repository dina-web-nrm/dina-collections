const {
  createGetItemFromRawItemId,
  getRelationshipItemsSync,
  removeFalsyElements,
} = require('./getRelationshipItemsSync')

describe('formatObject/relationships/utilities/resolveByPath/getRelationshipItemsSync', () => {
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
    let getItemFromRawItem
    beforeEach(() => {
      getItemByTypeId = jest.fn((type, id) => `${type}-${id}`)
      getItemFromRawItem = createGetItemFromRawItemId({
        getItemByTypeId,
        type: 'agent',
      })
    })

    test('returns undefined from getItemByTypeId if missing raw item', () => {
      expect(getItemFromRawItem()).toEqual(undefined)
    })

    test('returns undefined from getItemByTypeId if raw item is missing id', () => {
      expect(getItemFromRawItem({ id: undefined })).toEqual(undefined)
    })

    test('returns result from getItemByTypeId', () => {
      expect(getItemFromRawItem({ id: '123' })).toEqual('agent-123')
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
      const testValue = typeof getRelationshipItemsSync
      const expectedResult = 'function'

      expect(testValue).toEqual(expectedResult)
    })

    test('throws if no getItemByTypeId provided', () => {
      expect(() => getRelationshipItemsSync({})).toThrow(
        'missing getItemByTypeId'
      )
    })

    let getItemByTypeId
    beforeEach(() => {
      getItemByTypeId = jest.fn((type, id) => `${type}-${id}`)
    })

    test('rejects if no type provided', () => {
      expect(() => getRelationshipItemsSync({ getItemByTypeId })).toThrow(
        'missing type'
      )
    })

    test('returns empty array if relationships does not contain relationshipKey', () => {
      const testValue = getRelationshipItemsSync({
        getItemByTypeId,
        relationshipKey: 'test',
        relationships: {},
        type: 'agent',
      })

      expect(testValue).toEqual([])
    })

    test('returns empty array if there is no relationship data', () => {
      const testValue = getRelationshipItemsSync({
        getItemByTypeId,
        relationshipKey: 'agent',
        relationships: {
          agent: {}, // no data key
        },
        type: 'agent',
      })

      expect(testValue).toEqual([])
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

      const testValue = getRelationshipItemsSync({
        getItemByTypeId,
        relationshipKey: 'normalizedAgents',
        relationships: {
          normalizedAgents: {
            data: [{ id: '123' }, null, { id: '456' }],
          },
        },
        type: 'agent',
      })

      expect(testValue).toEqual(expectedResult)
    })
  })
})
