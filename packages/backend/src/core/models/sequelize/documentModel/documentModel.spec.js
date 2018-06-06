const createDb = require('../../../../lib/sequelize/db')
const createModel = require('./index')
const syncModels = require('../../../../lib/sequelize/models/syncModels')
const config = require('../../../../apps/core/config')

const dbDescribe = require('../../../../utilities/test/dbDescribe')

const setup = () => {
  return createDb({ config }).then(sequelize => {
    const model = createModel({
      name: 'test',
      schemaModelName: null,
      schemaVersion: '0',
      sequelize,
    })
    return syncModels({
      config,
      modelArray: [
        {
          model,
          name: 'test',
        },
      ],
    }).then(() => {
      return model
    })
  })
}

dbDescribe('lib/sequelize/models/documentModel', () => {
  let model
  describe('createModel', () => {
    beforeAll(() => {
      return setup().then(createdModel => {
        model = createdModel
      })
    })

    describe('create', () => {
      it('Creates and returns a simple record', () => {
        const doc = { a: 2 }

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
        a: 1,
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
      it('Updates firstDoc and creates a diff', () => {
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
            expect(res.diff).toEqual([
              { kind: 'E', lhs: 1, path: ['a'], rhs: 2 },
            ])
          })
      })
      it('Keeps previous diffs and appends new diff when updating again', () => {
        return model.update({ doc: { a: 3 }, id: firstId }).then(res => {
          expect(res.diff).toEqual([
            { kind: 'E', lhs: 1, path: ['a'], rhs: 2 },
            { kind: 'E', lhs: 2, path: ['a'], rhs: 3 },
          ])
        })
      })
    })

    describe('deactivate', () => {
      const firstDoc = {
        a: 1,
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

      it('Deactivates firstDoc', () => {
        return model
          .deactivate({
            id: firstId,
          })
          .then(res => {
            expect(res.deactivatedAt).toBeTruthy()
          })
      })

      it('Throws error if already deactivated', () => {
        return expect(
          model.deactivate({
            id: firstId,
          })
        ).rejects.toThrow()
      })
    })

    describe('getById', () => {
      const firstDoc = {
        a: 1,
      }
      const secondDoc = {
        a: 2,
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

    describe('getOneWhere', () => {
      const firstDoc = {
        a: 1,
      }
      const secondDoc = {
        a: 2,
      }
      const thirdDoc = {
        a: 3,
        nested: {
          inside: 'value',
        },
      }
      let firstId
      let secondId

      beforeAll(() => {
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
          .then(() => {
            return model.update({ doc: thirdDoc, id: secondId })
          })
      })

      it('Throw error when where not provided', () => {
        expect(model.getOneWhere()).rejects.toThrow()
      })
      it('Throw error when column does not exist', () => {
        expect(
          model.getOneWhere({ where: { nonExisting: 3 } })
        ).rejects.toThrow()
      })
      it('Returns null when where not matching', () => {
        return model.getOneWhere({ where: { id: 1111 } }).then(res => {
          expect(res).toEqual(null)
        })
      })
      it('Returns record when matching by id', () => {
        return model.getOneWhere({ where: { id: firstId } }).then(res => {
          expect(res.document).toEqual(firstDoc)
        })
      })
      it('Returns record when matching by id and it has been updated', () => {
        return model.getOneWhere({ where: { id: secondId } }).then(res => {
          expect(res.document).toEqual(thirdDoc)
        })
      })
      it('Returns record when matching by object property', () => {
        return model
          .getOneWhere({
            where: {
              'document.nested.inside': 'value',
            },
          })
          .then(res => {
            expect(res.document).toEqual(thirdDoc)
          })
      })
      it('Returns null when matching by object property fail', () => {
        return model
          .getOneWhere({
            where: { 'document.nested.inside': 'non-existing-value' },
          })
          .then(res => {
            expect(res).toEqual(null)
          })
      })
    })

    describe('getWhere', () => {
      const firstDoc = {
        a: 1,
      }
      const secondDoc = {
        a: 2,
      }
      const thirdDoc = {
        a: 3,
        nested: {
          inside: 'value',
        },
      }
      let firstId
      let secondId

      beforeAll(() => {
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
          .then(() => {
            return model.update({ doc: thirdDoc, id: secondId })
          })
      })

      it('Throw error when where not provided', () => {
        expect(model.getWhere()).rejects.toThrow()
      })
      it('Throw error when column does not exist', () => {
        expect(model.getWhere({ where: { nonExisting: 3 } })).rejects.toThrow()
      })
      it('Returns empty array when where not matching', () => {
        return model.getWhere({ where: { id: 1111 } }).then(res => {
          expect(res).toEqual([])
        })
      })
      it('Returns record when matching by id', () => {
        return model.getWhere({ where: { id: firstId } }).then(res => {
          expect(res[0].document).toEqual(firstDoc)
        })
      })
      it('Returns record when matching by id and it has been updated', () => {
        return model.getWhere({ where: { id: secondId } }).then(res => {
          expect(res[0].document).toEqual(thirdDoc)
        })
      })
      it('Returns record when matching by object property', () => {
        return model
          .getWhere({
            where: {
              'document.nested.inside': 'value',
            },
          })
          .then(res => {
            expect(res[0].document).toEqual(thirdDoc)
          })
      })
      it('Returns empty array when matching by object property fail', () => {
        return model
          .getWhere({
            where: { 'document.nested.inside': 'non-existing-value' },
          })
          .then(res => {
            expect(res.length).toEqual(0)
          })
      })
    })
  })
})
