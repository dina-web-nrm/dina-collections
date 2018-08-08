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

  describe('getById - Fields', () => {
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

    it('returns correct doc by id with specified fields', () => {
      const selectableFields = ['id', 'attributes.firstName']
      return model
        .getById({
          fieldsInput: ['id', 'attributes.firstName'],
          id: secondItem.id,
          selectableFields,
        })
        .then(({ item }) => {
          expect(item.id).toEqual(secondItem.id)
          expect(item.attributes.firstName).toEqual(
            secondItem.attributes.firstName
          )
          expect(Object.keys(item.attributes).length).toEqual(1)
        })
    })
  })
}
