const createDb = require('../../../../dataStores/sequelize/db')
const createModel = require('./index')
const config = require('../../../../../apps/core/config')
const dbDescribe = require('../../../../../utilities/test/dbDescribe')

const setup = () => {
  return createDb({ config }).then(sequelize => {
    const normalizedColumnNames = ['user', 'projects']
    const model = createModel({
      name: 'testNormalizeDocumentModel',
      normalizedColumnNames,
      schemaVersion: '0',
      sequelize,
      validate: false,
    })
    return model.synchronize({ force: true }).then(() => {
      return model
    })
  })
}

dbDescribe('lib/sequelize/models/normalizeDocumentModel', () => {
  let model

  beforeAll(() => {
    return setup().then(createdModel => {
      model = createdModel
    })
  })

  describe('create', () => {
    it('Creates and returns a simple record', () => {
      const doc = {
        normalized: {
          projects: [
            {
              id: '1234',
              name: 'coding',
            },
          ],
          user: {
            name: 'Anton',
          },
        },
      }

      return model.create({ doc }).then(res => {
        expect(res).toBeTruthy()
        expect(res.document).toEqual(doc)
        expect(res.id).toBeTruthy()
        expect(res.dataValues.document).toEqual(undefined)
      })
    })
  })

  describe('update', () => {
    const firstDoc = {
      normalized: {
        projects: [
          {
            id: '1234',
            name: 'coding',
          },
        ],
        user: {
          name: 'Anton',
        },
      },
    }
    let firstId

    beforeEach(() => {
      return model.create({ doc: firstDoc }).then(res => {
        firstId = res.id
      })
    })
    it('Throw error when id not provided', () => {
      return expect(model.update({})).rejects.toThrow()
    })
    it('Keeps id when updating', () => {
      return model
        .update({
          doc: { normalized: { user: { name: 'something' } } },
          id: firstId,
        })
        .then(res => {
          expect(res.projects).toBe(undefined)
          expect(res.user).toEqual({ name: 'something' })
          expect(res.id).toEqual(firstId)
        })
    })
    it('Creates a diff when updating', () => {
      return model
        .update({
          doc: { normalized: { user: { name: 'something' } } },
          id: firstId,
        })
        .then(res => {
          expect(res.diff).toEqual([
            {
              kind: 'E',
              lhs: 'Anton',
              path: ['normalized', 'user', 'name'],
              rhs: 'something',
            },
            {
              kind: 'D',
              lhs: [{ id: '1234', name: 'coding' }],
              path: ['normalized', 'projects'],
            },
          ])
        })
    })
  })

  describe('getById', () => {
    const firstDoc = {
      normalized: {
        projects: [
          {
            id: '1234',
            name: 'coding',
          },
        ],
        user: {
          name: 'Anton',
        },
      },
    }
    const secondDoc = {
      normalized: {
        projects: [
          {
            id: '1235',
            name: 'coding',
          },
        ],
        user: {
          name: 'Per',
        },
      },
    }
    const thirdDoc = {
      normalized: {
        projects: [
          {
            id: '1236',
            name: 'coding',
          },
        ],
        user: {
          name: 'Johan',
        },
      },
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
          .then(() => {
            return model.update({ doc: thirdDoc, id: secondId })
          })
      })
    })

    it('Throws when id not provided', () => {
      expect(model.getById()).rejects.toThrow()
    })

    it('Returns record', () => {
      return model.getById({ id: firstId }).then(res => {
        expect(res.document).toEqual(firstDoc)
      })
    })
    it('Returns null when record does not exist', () => {
      return model.getById({ id: 1111 }).then(res => {
        expect(res).toEqual(null)
      })
    })
    it('Returns updated record', () => {
      return model.getById({ id: secondId }).then(res => {
        expect(res.document).toEqual(thirdDoc)
      })
    })
  })
  describe('getOneWhere', () => {
    const firstDoc = {
      normalized: {
        projects: [
          {
            id: '1234',
            name: 'coding',
          },
        ],
        user: {
          name: 'Anton',
        },
      },
    }
    const secondDoc = {
      normalized: {
        projects: [
          {
            id: '1235',
            name: 'coding',
          },
        ],
        user: {
          name: 'Per',
        },
      },
    }
    const thirdDoc = {
      normalized: {
        projects: [
          {
            id: '1236',
            name: 'coding',
          },
        ],
        user: {
          name: 'Johan',
        },
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
    it('Returns latest record when matching by id', () => {
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

  describe('getWhere', () => {
    const firstDoc = {
      normalized: {
        projects: [
          {
            id: '1234',
            name: 'coding',
          },
        ],
        user: {
          name: 'Anton',
        },
      },
    }
    const secondDoc = {
      normalized: {
        projects: [
          {
            id: '1235',
            name: 'coding',
          },
        ],
        user: {
          name: 'Per',
        },
      },
    }
    const thirdDoc = {
      normalized: {
        projects: [
          {
            id: '1236',
            name: 'coding',
          },
        ],
        user: {
          name: 'Johan',
        },
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
    it('Returns latest record when matching by id', () => {
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
  })
})
