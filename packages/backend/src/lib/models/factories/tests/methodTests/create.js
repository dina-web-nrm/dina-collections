const { hook } = require('common/src/testUtilities/envBackendDb')
const { getTestData } = require('../testData')

module.exports = function testCreate({ config, setupModel }) {
  describe('Test create', () => {
    let model
    hook(beforeEach, () => {
      return setupModel({ config }).then(createdModel => {
        model = createdModel
      })
    })
    describe('Success cases', () => {
      it('Creates and returns a simple record without id provided', () => {
        const item = getTestData('itemPersonWithoutId')

        return model.create({ item }).then(({ item: res }) => {
          expect(res).toBeTruthy()
          expect(res).toBeTruthy()
          expect(res.attributes).toEqual(item.attributes)
          expect(res.id).toBeTruthy()
        })
      })
      it('Creates and returns a simple record with id provided', () => {
        const item = getTestData('itemPersonWithId')
        return model.create({ allowId: true, item }).then(({ item: res }) => {
          expect(res).toBeTruthy()
          expect(res).toBeTruthy()
          expect(res.attributes).toEqual(item.attributes)
          expect(res.id).toBe(item.id)
        })
      })
      it('Creates and returns a simple record with id and relationships provided', () => {
        const item = getTestData('itemPersonWithIdAndRelationships')
        return model.create({ allowId: true, item }).then(({ item: res }) => {
          expect(res).toBeTruthy()
          expect(res).toBeTruthy()
          expect(res.attributes).toEqual(item.attributes)
          expect(res.relationships).toEqual(item.relationships)
          expect(res.id).toBe(item.id)
        })
      })
    })
    describe('Fail cases', () => {
      it('Throw error if id provided and allowId: false', () => {
        const item = getTestData('itemPersonWithId')
        return expect(model.create({ allowId: false, item })).rejects.toThrow()
      })
      it('Throw error if item not provided', () => {
        return expect(model.create({})).rejects.toThrow()
      })
    })
  })
}
