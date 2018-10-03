const { getTestData } = require('../testData')

module.exports = function testDel({ config, setupModel }) {
  describe('del', () => {
    let model
    const item = getTestData('itemPersonWithId')

    beforeAll(() => {
      return setupModel({ config }).then(createdModel => {
        model = createdModel
        return model.create({ allowId: true, item })
      })
    })

    it('throws when id not provided', () => {
      return expect(model.getById()).rejects.toThrow()
    })

    it('delete secondDoc', () => {
      return model
        .del({
          id: item.id,
        })
        .then(({ item: res }) => {
          expect(res).toBeTruthy()

          return model
            .getById({
              id: item.id,
            })
            .then(({ item: nonExisting }) => {
              expect(nonExisting).toBeFalsy()
            })
        })
    })
  })
}
