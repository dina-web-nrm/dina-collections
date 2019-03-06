const { hook } = require('common/src/testUtilities/envBackendDb')
const createGetOneFilterSpecifications = require('../../../../data/filters/utilities/createGetOneFilterSpecifications')
const { getTestData } = require('../testData')

const filterSpecification = createGetOneFilterSpecifications({
  include: ['id'],
})

module.exports = function testGetById({ config, setupModel }) {
  describe('getById', () => {
    let model
    const firstItem = getTestData('itemPersonWithId', 0)
    const secondItem = getTestData('itemPersonWithId', 1)

    hook(beforeAll, () => {
      return setupModel({ config }).then(createdModel => {
        model = createdModel
        return model.create({ allowId: true, item: firstItem }).then(() => {
          return model.create({ allowId: true, item: secondItem })
        })
      })
    })

    it('throws when id not provided', () => {
      return expect(model.getById({ filterSpecification })).rejects.toThrow()
    })
    it('returns firstDoc', () => {
      return model
        .getById({ filterSpecification, id: firstItem.id })
        .then(({ item: res }) => {
          expect(res.id).toEqual(firstItem.id)
          expect(res.attributes).toEqual(firstItem.attributes)
        })
    })
    it('returns secondDoc', () => {
      return model
        .getById({ filterSpecification, id: secondItem.id })
        .then(({ item: res }) => {
          expect(res.id).toEqual(secondItem.id)
          expect(res.attributes).toEqual(secondItem.attributes)
        })
    })
    it('returns null when model does not exist', () => {
      return model
        .getById({ filterSpecification, id: '1111' })
        .then(({ item: res }) => {
          expect(res).toEqual(null)
        })
    })
  })

  describe('getById - Fields', () => {
    let model

    const firstItem = getTestData('itemPersonWithId', 0)
    const secondItem = getTestData('itemPersonWithId', 1)
    hook(beforeAll, () => {
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
          filterSpecification,
          id: secondItem.id,
          includeFieldsInput: ['id', 'attributes.firstName'],
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
