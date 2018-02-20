const createDb = require('../../db')
const createModel = require('./versionedDocumentModel')
const syncModels = require('../syncModels')
const config = require('../../../../config')

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

dbDescribe('lib/postgres/models', () => {
  let model
  describe('createModel', () => {
    beforeAll(() => {
      return setup().then(createdModel => {
        model = createdModel
      })
    })

    describe('create', () => {
      it('Creates and returns a simple record', () => {
        const data = {
          a: 2,
        }

        return model.create(data).then(res => {
          expect(res).toBeTruthy()
          expect(res).toBeTruthy()
          expect(res.document).toEqual(data)
          expect(res.id).toBeTruthy()
          expect(res.versionId).toBeTruthy()
          expect(res.id).toBe(res.versionId)
        })
      })
    })
    describe('getById', () => {
      const firstData = {
        a: 1,
      }
      const secondData = {
        a: 2,
      }
      const thirdData = {
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
            .create(firstData)
            .then(res => {
              firstId = res.id
              firstVersionId = res.versionId
            })
            .then(() => {
              return model.create(secondData)
            })
            .then(res => {
              secondId = res.id
              secondVersionId = res.versionId
            })
            .then(() => {
              return model.update({ doc: thirdData, id: secondId })
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
            expect(res.document).toEqual(firstData)
          })
        })
        it('Returns null when record dont exist', () => {
          return model.getById({ id: 1111 }).then(res => {
            expect(res).toEqual(null)
          })
        })
        it('Returns latest when multiple versions exist', () => {
          return model.getById({ id: secondId }).then(res => {
            expect(res.document).toEqual(thirdData)
          })
        })
      })

      describe('with versionId', () => {
        it('Returns record when only one version exists', () => {
          return model
            .getById({ id: firstId, versionId: firstVersionId })
            .then(res => {
              expect(res.document).toEqual(firstData)
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
              expect(res.document).toEqual(thirdData)
            })
        })
        it('Returns non latest when multiple versions exist and old versionId provided', () => {
          return model
            .getById({ id: secondId, versionId: secondVersionId })
            .then(res => {
              expect(res.document).toEqual(secondData)
            })
        })
      })
    })
    describe('getOneWhere', () => {
      const firstData = {
        a: 1,
      }
      const secondData = {
        a: 2,
      }
      const thirdData = {
        a: 3,
        nested: {
          inside: 'value',
        },
      }
      let firstId
      let secondId

      beforeAll(() => {
        return model
          .create(firstData)
          .then(res => {
            firstId = res.id
          })
          .then(() => {
            return model.create(secondData)
          })
          .then(res => {
            secondId = res.id
          })
          .then(() => {
            return model.update({ doc: thirdData, id: secondId })
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
          expect(res.document).toEqual(firstData)
        })
      })
      it('Returns latest record when matching by id and multiple versions exist', () => {
        return model.getOneWhere({ where: { id: secondId } }).then(res => {
          expect(res.document).toEqual(thirdData)
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
            expect(res.document).toEqual(thirdData)
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
      const firstData = {
        a: 1,
      }
      const secondData = {
        a: 2,
      }
      const thirdData = {
        a: 3,
      }
      let firstId
      let firstVersionId

      let secondId

      beforeAll(() => {
        return model
          .create(firstData)
          .then(res => {
            firstId = res.id
            firstVersionId = res.versionId
          })
          .then(() => {
            return model.create(secondData)
          })
          .then(res => {
            secondId = res.id
          })
          .then(() => {
            return model.update({ doc: thirdData, id: secondId })
          })
      })
      it('Throw error when id not provided', () => {
        expect(model.update({})).rejects.toThrow()
      })
      it('Throw error when doc not provided', () => {
        expect(model.update({ id: firstId })).rejects.toThrow()
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
  })
})
