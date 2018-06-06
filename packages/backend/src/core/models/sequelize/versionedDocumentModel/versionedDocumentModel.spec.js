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

dbDescribe('lib/sequelize/models/versionedDocumentModel', () => {
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
          expect(res.versionId).toBeTruthy()
          expect(res.id).toBe(res.versionId)
        })
      })
    })
    describe('getById', () => {
      const firstDoc = {
        a: 1,
      }
      const secondDoc = {
        a: 2,
      }
      const thirdDoc = {
        a: 3,
      }
      let firstId
      let firstVersionId

      let secondId
      let secondVersionId

      let thirdUpdatedVersionId

      beforeAll(() => {
        return setup().then(createdModel => {
          model = createdModel
          return model
            .create({ doc: firstDoc })
            .then(res => {
              firstId = res.id
              firstVersionId = res.versionId
            })
            .then(() => {
              return model.create({ doc: secondDoc })
            })
            .then(res => {
              secondId = res.id
              secondVersionId = res.versionId
            })
            .then(() => {
              return model.update({ doc: thirdDoc, id: secondId })
            })
            .then(res => {
              thirdUpdatedVersionId = res.versionId
            })
        })
      })

      describe('without versionId', () => {
        it('Throws when id not provided', () => {
          expect(model.getById()).rejects.toThrow()
        })

        it('Returns record when only one version exists', () => {
          return model.getById({ id: firstId }).then(res => {
            expect(res.document).toEqual(firstDoc)
          })
        })
        it('Returns null when record dont exist', () => {
          return model.getById({ id: 1111 }).then(res => {
            expect(res).toEqual(null)
          })
        })
        it('Returns latest when multiple versions exist', () => {
          return model.getById({ id: secondId }).then(res => {
            expect(res.document).toEqual(thirdDoc)
          })
        })
      })

      describe('with versionId', () => {
        it('Returns record when only one version exists', () => {
          return model
            .getById({ id: firstId, versionId: firstVersionId })
            .then(res => {
              expect(res.document).toEqual(firstDoc)
            })
        })
        it('Returns null when id record dont exist', () => {
          return model.getById({ id: 1111, versionId: 2222 }).then(res => {
            expect(res).toEqual(null)
          })
        })
        it('Returns null when id exist but versionId dont exist record dont exist', () => {
          return model.getById({ id: firstId, versionId: 2222 }).then(res => {
            expect(res).toEqual(null)
          })
        })
        it('Returns latest when multiple versions exist', () => {
          return model
            .getById({ id: secondId, versionId: thirdUpdatedVersionId })
            .then(res => {
              expect(res.document).toEqual(thirdDoc)
            })
        })
        it('Returns non latest when multiple versions exist and old versionId provided', () => {
          return model
            .getById({ id: secondId, versionId: secondVersionId })
            .then(res => {
              expect(res.document).toEqual(secondDoc)
            })
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
      it('Returns latest record when matching by id and multiple versions exist', () => {
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
    describe('update', () => {
      const firstDoc = {
        a: 1,
      }
      const secondDoc = {
        a: 2,
      }
      const thirdDoc = {
        a: 3,
      }
      let firstId
      let firstVersionId

      let secondId

      beforeAll(() => {
        return model
          .create({ doc: firstDoc })
          .then(res => {
            firstId = res.id
            firstVersionId = res.versionId
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
      it('Throw error when id not provided', () => {
        return expect(model.update({})).rejects.toThrow()
      })
      it('Increments created new version id when updating', () => {
        model.update({ doc: { b: 4 }, id: firstId }).then(res => {
          expect(res.versionId).toBeGreaterThan(firstVersionId)
        })
      })
      it('Creates a diff when updating', () => {
        model.update({ doc: { a: 4 }, id: firstId }).then(res => {
          expect(res.diff).toEqual([{ kind: 'E', lhs: 1, path: ['a'], rhs: 4 }])
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
      it('Returns latest record when matching by id and multiple versions exist', () => {
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
      it('Returns all versions when forceCurrentVersion false', () => {
        return model
          .getWhere({ forceCurrentVersion: false, where: { id: secondId } })
          .then(res => {
            expect(res.length).toEqual(2)
          })
      })
    })
  })
})
