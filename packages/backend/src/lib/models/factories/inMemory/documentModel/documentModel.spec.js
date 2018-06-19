const createDb = require('../../../../dataStores/inMemory/db')
const createModel = require('./index')

const setup = () => {
  return createDb().then(inMemoryDb => {
    const model = createModel({
      inMemoryDb,
      name: 'test',
      schemaModelName: null,
      validate: false,
    })
    return model.synchronize({ force: true }).then(() => {
      return model
    })
  })
}

describe('lib/models/factories/inMemory/documentModel', () => {
  let model
  describe('createModel', () => {
    beforeAll(() => {
      return setup().then(createdModel => {
        model = createdModel
      })
    })

    describe('create', () => {
      it('Creates and returns a simple record', () => {
        const doc = { doc: { a: 2 }, id: 123 }

        return model.create({ doc }).then(({ item: res }) => {
          expect(res).toBeTruthy()
          expect(res).toBeTruthy()
          expect(res.document).toEqual(doc)
          expect(res.id).toBeTruthy()
        })
      })
    })

    describe('update', () => {
      const firstDoc = {
        doc: {
          a: 1,
        },
        id: 123,
      }
      let firstId

      beforeAll(() => {
        return model.create({ doc: firstDoc }).then(({ item: res }) => {
          firstId = res.id
        })
      })
      it('Throw error when id not provided', () => {
        return expect(model.update({})).rejects.toThrow()
      })
      it('Updates firstDoc', () => {
        return model
          .update({
            doc: {
              a: 2,
            },
            id: firstId,
          })
          .then(({ item: res }) => {
            expect(res.document).toEqual({
              a: 2,
            })
          })
      })
    })

    describe('delete', () => {
      const firstDoc = {
        a: 1,
        id: 123,
      }
      let firstId

      beforeAll(() => {
        return model.create({ doc: firstDoc }).then(({ item: res }) => {
          firstId = res.id
        })
      })

      it('Delete firstDoc', () => {
        return model
          .del({
            id: firstId,
          })
          .then(({ item: res }) => {
            expect(res).toBeTruthy()

            return model
              .getById({
                id: firstId,
              })
              .then(({ item: nonExisting }) => {
                expect(nonExisting).toBeFalsy()
              })
          })
      })
    })

    describe('getById', () => {
      const firstDoc = {
        a: 1,
        id: 12345,
      }
      const secondDoc = {
        a: 2,
        id: 12346,
      }
      let firstId
      let secondId

      beforeAll(() => {
        return setup().then(createdModel => {
          model = createdModel
          return model
            .create({ doc: firstDoc })
            .then(({ item: res }) => {
              firstId = res.id
            })
            .then(() => {
              return model.create({ doc: secondDoc })
            })
            .then(({ item: res }) => {
              secondId = res.id
            })
        })
      })

      it('throws when id not provided', () => {
        expect(model.getById()).rejects.toThrow()
      })
      it('returns firstDoc', () => {
        return model.getById({ id: firstId }).then(({ item: res }) => {
          expect(res.document).toEqual(firstDoc)
        })
      })
      it('returns secondDoc', () => {
        return model.getById({ id: secondId }).then(({ item: res }) => {
          expect(res.document).toEqual(secondDoc)
        })
      })
      it('returns null when model does not exist', () => {
        return model.getById({ id: 1111 }).then(({ item: res }) => {
          expect(res).toEqual(null)
        })
      })
    })
  })
})
