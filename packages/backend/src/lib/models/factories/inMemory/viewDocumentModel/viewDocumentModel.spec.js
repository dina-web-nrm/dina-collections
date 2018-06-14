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

describe('lib/sequelize/models/viewDocumentModel', () => {
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

        return model.create({ doc }).then(res => {
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
        return model.create({ doc: firstDoc }).then(res => {
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
          .then(res => {
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
        return model.create({ doc: firstDoc }).then(res => {
          firstId = res.id
        })
      })

      it('Delete firstDoc', () => {
        return model
          .del({
            id: firstId,
          })
          .then(res => {
            expect(res).toBeTruthy()

            return model
              .getById({
                id: firstId,
              })
              .then(nonExisting => {
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
            .then(res => {
              firstId = res.id
            })
            .then(() => {
              return model.create({ doc: secondDoc })
            })
            .then(res => {
              secondId = res.id
            })
        })
      })

      it('throws when id not provided', () => {
        expect(model.getById()).rejects.toThrow()
      })
      it('returns firstDoc', () => {
        return model.getById({ id: firstId }).then(res => {
          expect(res.document).toEqual(firstDoc)
        })
      })
      it('returns secondDoc', () => {
        return model.getById({ id: secondId }).then(res => {
          expect(res.document).toEqual(secondDoc)
        })
      })
      it('returns null when model does not exist', () => {
        return model.getById({ id: 1111 }).then(res => {
          expect(res).toEqual(null)
        })
      })
    })
  })
})
