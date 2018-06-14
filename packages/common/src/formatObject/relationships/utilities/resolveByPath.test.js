const { dep, resolveByPath } = require('./resolveByPath')

describe('formatObject/relationships/utilities/resolveByPath', () => {
  describe('with Dependor', () => {
    let walkObject

    beforeEach(() => {
      walkObject = jest.fn()
      dep.freeze()
      dep.mock({
        walkObject,
      })
    })

    afterEach(() => {
      dep.reset()
    })

    test('is a function', () => {
      const testValue = typeof resolveByPath
      const expectedResult = 'function'

      expect(testValue).toEqual(expectedResult)
    })

    test('calls walkObject', () => {
      const formattedRelationshipItems = [
        { card: 'king', id: '13' },
        { card: 'ace', id: '1' },
      ]
      const item = {
        game: {
          deck: [{ id: '13' }, { id: '1' }],
        },
      }
      const path = ['game.deck.*.card']

      resolveByPath({
        formattedRelationshipItems,
        item,
        path,
      })

      expect(walkObject).toHaveBeenCalledTimes(1)
      expect(walkObject.mock.calls[0][0]).toBeTruthy()

      const args = walkObject.mock.calls[0][0]
      expect(typeof args.func).toEqual('function')
      expect(args.obj).toEqual(item)
      expect(args.segments).toEqual(['game.deck', 'card'])
    })
  })
})
