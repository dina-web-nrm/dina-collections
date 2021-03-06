const { hook } = require('common/src/testUtilities/envBackendDb')
const createGetManyFilterSpecifications = require('../../../data/filters/utilities/createGetManyFilterSpecifications')
const { getTestData } = require('../testData')

const compareItemToRes = (item, res) => {
  expect(item.id).toEqual(res.id)
  expect(item.attributes).toEqual(res.attributes)
}

module.exports = function testGetWhere({ config, setupModel }) {
  describe('getWhere', () => {
    describe('Added in decending order', () => {
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

      it('returns all doc when no filter is provided. In default decending order', () => {
        return model.getWhere().then(({ items }) => {
          expect(items.length).toEqual(2)
          compareItemToRes(items[0], firstItem)
          compareItemToRes(items[1], secondItem)
        })
      })
    })
    describe('Added in acending order', () => {
      let model
      const firstItem = getTestData('itemPersonWithId', 0)
      const secondItem = getTestData('itemPersonWithId', 1)

      hook(beforeAll, () => {
        return setupModel({ config }).then(createdModel => {
          model = createdModel
          return model.create({ allowId: true, item: secondItem }).then(() => {
            return model.create({ allowId: true, item: firstItem })
          })
        })
      })

      it('returns all doc when no filter is provided. In default decending order', () => {
        return model.getWhere().then(({ items }) => {
          expect(items.length).toEqual(2)
          compareItemToRes(items[0], firstItem)
          compareItemToRes(items[1], secondItem)
        })
      })
    })
  })

  describe('getWhere - Fields', () => {
    let model

    const firstItem = getTestData('itemPersonWithId', 0)
    const secondItem = getTestData('itemPersonWithId', 1)
    const thirdItem = getTestData('itemPersonWithId', 2)
    hook(beforeAll, () => {
      return setupModel({ config }).then(createdModel => {
        model = createdModel
        return model.create({ allowId: true, item: firstItem }).then(() => {
          return model.create({ allowId: true, item: secondItem }).then(() => {
            return model.create({ allowId: true, item: thirdItem })
          })
        })
      })
    })

    it('returns correct doc by id with specified  include fields', () => {
      const filterSpecification = createGetManyFilterSpecifications({
        include: ['id'],
      })
      const selectableFields = ['id', 'attributes.firstName']

      return model
        .getWhere({
          filterInput: {
            id: secondItem.id,
          },
          filterSpecification,
          includeFieldsInput: ['id', 'attributes.firstName'],
          selectableFields,
        })
        .then(({ items }) => {
          expect(items.length).toEqual(1)
          expect(items[0].id).toEqual(secondItem.id)
          expect(items[0].attributes.firstName).toEqual(
            secondItem.attributes.firstName
          )
          expect(Object.keys(items[0].attributes).length).toEqual(1)
        })
    })

    it('returns correct doc by id with specified exclude fields', () => {
      const filterSpecification = createGetManyFilterSpecifications({
        include: ['id'],
      })
      const selectableFields = ['id', 'attributes.firstName']

      return model
        .getWhere({
          excludeFieldsInput: ['attributes.firstName'],
          filterInput: {
            id: secondItem.id,
          },
          filterSpecification,

          selectableFields,
        })
        .then(({ items }) => {
          expect(items.length).toEqual(1)
          expect(items[0].id).toEqual(secondItem.id)
          expect(items[0].attributes.lastName).toEqual(
            secondItem.attributes.lastName
          )
          expect(Object.keys(items[0].attributes).length).toEqual(1)
        })
    })
    it('returns correct doc by id with specified include and exclude fields', () => {
      const filterSpecification = createGetManyFilterSpecifications({
        include: ['id'],
      })
      const selectableFields = [
        'id',
        'attributes.firstName',
        'attributes.lastName',
      ]

      return model
        .getWhere({
          excludeFieldsInput: ['attributes.firstName'],
          filterInput: {
            id: secondItem.id,
          },
          filterSpecification,
          includeFieldsInput: [
            'id',
            'attributes.firstName',
            'attributes.lastName',
          ],
          selectableFields,
        })
        .then(({ items }) => {
          expect(items.length).toEqual(1)
          expect(items[0].id).toEqual(secondItem.id)
          expect(items[0].attributes.lastName).toEqual(
            secondItem.attributes.lastName
          )
          expect(Object.keys(items[0].attributes).length).toEqual(1)
        })
    })
  })

  describe('getWhere - Filter', () => {
    let model

    const firstItem = getTestData('itemPersonWithId', 0)
    const secondItem = getTestData('itemPersonWithId', 1)
    const thirdItem = getTestData('itemPersonWithId', 2)
    hook(beforeAll, () => {
      return setupModel({ config }).then(createdModel => {
        model = createdModel
        return model.create({ allowId: true, item: firstItem }).then(() => {
          return model.create({ allowId: true, item: secondItem }).then(() => {
            return model.create({ allowId: true, item: thirdItem })
          })
        })
      })
    })

    it('throw error when filter input dont correspond to filter function', () => {
      const filterSpecification = createGetManyFilterSpecifications({
        include: ['ids'],
      })

      return expect(
        model.getWhere({
          filterInput: {
            id: secondItem.id,
          },
          filterSpecification,
        })
      ).rejects.toBeTruthy()
    })

    it('returns correct doc by id', () => {
      const filterSpecification = createGetManyFilterSpecifications({
        include: ['id'],
      })
      return model
        .getWhere({
          filterInput: {
            id: secondItem.id,
          },
          filterSpecification,
        })
        .then(({ items }) => {
          expect(items.length).toEqual(1)
          compareItemToRes(items[0], secondItem)
        })
    })
    it('returns correct docs by ids', () => {
      const filterSpecification = createGetManyFilterSpecifications({
        include: ['ids'],
      })
      return model
        .getWhere({
          filterInput: {
            ids: [firstItem.id, thirdItem.id],
          },
          filterSpecification,
        })
        .then(({ items }) => {
          expect(items.length).toEqual(2)
          compareItemToRes(items[0], thirdItem)
          compareItemToRes(items[1], firstItem)
        })
    })
  })
}
