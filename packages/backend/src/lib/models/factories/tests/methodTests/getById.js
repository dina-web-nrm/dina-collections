const { getTestData } = require('../testData')

module.exports = function testGetById({ config, setupModel }) {
  describe('getById', () => {
    let model
    const firstItem = getTestData('itemPersonWithId', 0)
    const secondItem = getTestData('itemPersonWithId', 1)

    beforeAll(() => {
      return setupModel({ config }).then(createdModel => {
        model = createdModel
        return model.create({ allowId: true, item: firstItem }).then(() => {
          return model.create({ allowId: true, item: secondItem })
        })
      })
    })

    it('throws when id not provided', () => {
      return expect(model.getById()).rejects.toThrow()
    })
    it('returns firstDoc', () => {
      return model.getById({ id: firstItem.id }).then(({ item: res }) => {
        expect(res.id).toEqual(firstItem.id)
        expect(res.attributes).toEqual(firstItem.attributes)
      })
    })
    it('returns secondDoc', () => {
      return model.getById({ id: secondItem.id }).then(({ item: res }) => {
        expect(res.id).toEqual(secondItem.id)
        expect(res.attributes).toEqual(secondItem.attributes)
      })
    })
    it('returns null when model does not exist', () => {
      return model.getById({ id: '1111' }).then(({ item: res }) => {
        expect(res).toEqual(null)
      })
    })
  })
}
