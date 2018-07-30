const { getTestData } = require('../testData')

module.exports = function testBulkCreate({ config, setupModel }) {
  describe('Test bulk create', () => {
    let model
    beforeEach(() => {
      return setupModel({ config }).then(createdModel => {
        model = createdModel
      })
    })
    describe('Success cases', () => {
      it('Creates 2 records in bulk', () => {
        const firstItem = getTestData('itemPersonWithId')
        const secondItem = getTestData('itemPersonWithId', 1)
        return model
          .bulkCreate({ items: [firstItem, secondItem] })

          .then(() => {
            return model.getWhere().then(({ items }) => {
              expect(items).toBeTruthy()
              expect(items.length).toBe(2)
              expect(items[0].attributes).toEqual(firstItem.attributes)
              expect(items[0].id).toBe(firstItem.id)
            })
          })
      })
      it('Creates and returns a record with id and relationships provided', () => {
        const item = getTestData('itemPersonWithIdAndRelationships')
        return model.bulkCreate({ items: [item] }).then(() => {
          return model.getWhere().then(({ items }) => {
            expect(items).toBeTruthy()
            expect(items.length).toBe(1)
            expect(items[0].attributes).toEqual(item.attributes)
            expect(items[0].relationships).toEqual(item.relationships)
            expect(items[0].id).toBe(item.id)
          })
        })
      })
    })
    describe('Fail cases', () => {
      it('Throw error if id not provided', () => {
        const item = getTestData('itemPersonWithoutId')
        return expect(model.bulkCreate({ items: [item] })).rejects.toThrow()
      })
      it('Throw error if items not provided', () => {
        return expect(model.bulkCreate({})).rejects.toThrow()
      })
    })
  })
}
