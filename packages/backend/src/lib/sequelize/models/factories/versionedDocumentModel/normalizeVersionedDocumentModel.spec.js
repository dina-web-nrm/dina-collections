const createDb = require('../../../db')
const createModel = require('./index')
const syncModels = require('../../syncModels')
const config = require('../../../../../apps/core/config')

const dbDescribe = require('../../../../../utilities/test/dbDescribe')

const setup = () => {
  return createDb({ config }).then(sequelize => {
    const normalizedColumnNames = ['user', 'projects']
    const model = createModel({
      name: 'testNormalizeVersionedDocumentModel',
      normalizedColumnNames,
      schemaModelName: null,
      schemaVersion: '0',
      sequelize,
    })
    return syncModels({
      config,
      modelArray: [
        {
          model,
          name: 'testNormalizeVersionedDocumentModel',
        },
      ],
    }).then(() => {
      return model
    })
  })
}

dbDescribe('lib/sequelize/models/normalizeVersionedDocumentModel', () => {
  let model
  describe('createModel', () => {
    beforeAll(() => {
      return setup().then(createdModel => {
        model = createdModel
      })
    })
  })

  describe('create', () => {
    it('Creates and returns a simple record', () => {
      const doc = {
        projects: [
          {
            id: '1234',
            name: 'coding',
          },
        ],
        user: {
          name: 'Anton',
        },
      }

      return model.create({ doc }).then(res => {
        expect(res).toBeTruthy()
        expect(res.document).toEqual(doc)
        expect(res.id).toBeTruthy()
        expect(res.versionId).toBeTruthy()
        expect(res.id).toBe(res.versionId)
        expect(res.dataValues.document).toEqual(undefined)
      })
    })
  })
  describe('getById', () => {
    const firstDoc = {
      projects: [
        {
          id: '1234',
          name: 'coding',
        },
      ],
      user: {
        name: 'Anton',
      },
    }
    const secondDoc = {
      projects: [
        {
          id: '1235',
          name: 'coding',
        },
      ],
      user: {
        name: 'Per',
      },
    }
    const thirdDoc = {
      projects: [
        {
          id: '1236',
          name: 'coding',
        },
      ],
      user: {
        name: 'Johan',
      },
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
      projects: [
        {
          id: '1234',
          name: 'coding',
        },
      ],
      user: {
        name: 'Anton',
      },
    }
    const secondDoc = {
      projects: [
        {
          id: '1235',
          name: 'coding',
        },
      ],
      user: {
        name: 'Per',
      },
    }
    const thirdDoc = {
      projects: [
        {
          id: '1236',
          name: 'coding',
        },
      ],
      user: {
        name: 'Johan',
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
      expect(model.getOneWhere({ where: { nonExisting: 3 } })).rejects.toThrow()
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
            'projects.0.id': '1234',
          },
        })
        .then(res => {
          expect(res.document).toEqual(firstDoc)
        })
    })
    it('Returns null when matching by object property fail', () => {
      return model
        .getOneWhere({
          where: { 'projects.0.id': 'non-existing-value' },
        })
        .then(res => {
          expect(res).toEqual(null)
        })
    })
  })
  describe('update', () => {
    const firstDoc = {
      projects: [
        {
          id: '1234',
          name: 'coding',
        },
      ],
      user: {
        name: 'Anton',
      },
    }
    const secondDoc = {
      projects: [
        {
          id: '1235',
          name: 'coding',
        },
      ],
      user: {
        name: 'Per',
      },
    }
    const thirdDoc = {
      projects: [
        {
          id: '1236',
          name: 'coding',
        },
      ],
      user: {
        name: 'Johan',
      },
    }
    let firstId
    let firstVersionId

    let secondId

    beforeEach(() => {
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
      return model
        .update({ doc: { user: { name: 'something' } }, id: firstId })
        .then(res => {
          expect(res.versionId).toBeGreaterThan(firstVersionId)
          expect(res.projects).toBe(null)
          expect(res.user).toEqual({ name: 'something' })
        })
    })
    it('Creates a diff when updating', () => {
      return model
        .update({ doc: { user: { name: 'something' } }, id: firstId })
        .then(res => {
          expect(res.diff).toEqual([
            {
              kind: 'E',
              lhs: 'Anton',
              path: ['user', 'name'],
              rhs: 'something',
            },
            {
              kind: 'D',
              lhs: [{ id: '1234', name: 'coding' }],
              path: ['projects'],
            },
          ])
        })
    })
  })
  describe('getWhere', () => {
    const firstDoc = {
      projects: [
        {
          id: '1234',
          name: 'coding',
        },
      ],
      user: {
        name: 'Anton',
      },
    }
    const secondDoc = {
      projects: [
        {
          id: '1235',
          name: 'coding',
        },
      ],
      user: {
        name: 'Per',
      },
    }
    const thirdDoc = {
      projects: [
        {
          id: '1236',
          name: 'coding',
        },
      ],
      user: {
        name: 'Johan',
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
            'projects.0.id': '1236',
          },
        })
        .then(res => {
          expect(res[0].document).toEqual(thirdDoc)
        })
    })
    it('Returns empty array when matching by object property fail', () => {
      return model
        .getWhere({
          where: { 'projects.0.id': 'non-existing-value' },
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
