const createFactory = require('./createFactory')

describe('lib/modelFactories/versionedDocumentModel/methods/createFactory', () => {
  describe('Initialization', () => {
    it('Returns create function when initialized', () => {
      const Model = {}
      const create = createFactory({ Model })
      expect(create).toBeTruthy()
      expect(typeof create).toBe('function')
    })
    it('Throws an error if Model not provided', () => {
      expect(() => {
        createFactory()
      }).toThrow()
    })
  })
  describe('Usage', () => {
    let MockModel
    let successValidate
    let errorValidate
    beforeEach(() => {
      successValidate = jest.fn(() => {
        return null
      })
      errorValidate = jest.fn(() => {
        return [{ errorCode: 'sample-error-code' }]
      })

      MockModel = {
        create: jest.fn(input => {
          MockModel.dataValues = { ...input }
          MockModel.dataValues = {
            ...MockModel.dataValues,
            versionId: 1,
          }
          return Promise.resolve(MockModel)
        }),
        dataValues: {},
        get: jest.fn(input => {
          return MockModel.dataValues[input]
        }),
        save: jest.fn(() => {
          MockModel.dataValues = { ...MockModel.dataValues }
          return Promise.resolve(MockModel)
        }),
        set: jest.fn((key, value) => {
          MockModel.dataValues[key] = value
          return MockModel
        }),
      }
    })
    it('Successfully create a new document when validate function not provided', () => {
      const create = createFactory({ Model: MockModel })
      const sampleDoc = {
        email: 'anton@example.com',
      }
      return create(sampleDoc).then(res => {
        expect(res).toBeTruthy()
        expect(res.dataValues).toEqual({
          document: {
            email: 'anton@example.com',
          },
          id: 1,
          isCurrentVersion: true,
          schemaCompliant: undefined,
          schemaVersion: undefined,
          versionId: 1,
        })

        expect(MockModel.create.mock.calls.length).toBe(1)
        expect(MockModel.create.mock.calls[0]).toEqual([
          {
            document: sampleDoc,
            isCurrentVersion: true,
            schemaCompliant: undefined,
            schemaVersion: undefined,
          },
        ])

        expect(MockModel.set.mock.calls.length).toBe(1)
        expect(MockModel.get.mock.calls.length).toBe(1)
        expect(MockModel.save.mock.calls.length).toBe(1)
      })
    })
    it('Successfully create a new document when validation function passes', () => {
      const create = createFactory({
        Model: MockModel,
        schemaVersion: '1.1',
        validate: successValidate,
      })
      const sampleDoc = {
        email: 'anton@example.com',
      }
      return create(sampleDoc).then(res => {
        expect(res).toBeTruthy()
        expect(res.dataValues).toEqual({
          document: {
            email: 'anton@example.com',
          },
          id: 1,
          isCurrentVersion: true,
          schemaCompliant: true,
          schemaVersion: '1.1',
          versionId: 1,
        })

        expect(MockModel.create.mock.calls.length).toBe(1)
        expect(MockModel.create.mock.calls[0]).toEqual([
          {
            document: sampleDoc,
            isCurrentVersion: true,
            schemaCompliant: true,
            schemaVersion: '1.1',
          },
        ])

        expect(MockModel.set.mock.calls.length).toBe(1)
        expect(MockModel.get.mock.calls.length).toBe(1)
        expect(MockModel.save.mock.calls.length).toBe(1)
        expect(successValidate.mock.calls.length).toBe(1)
      })
    })
    it('Successfully create a new document when validation function fail', () => {
      const create = createFactory({
        Model: MockModel,
        schemaVersion: '1.1',
        validate: errorValidate,
      })
      const sampleDoc = {
        email: 'anton@example.com',
      }
      return create(sampleDoc).then(res => {
        expect(res).toBeTruthy()
        expect(res.dataValues).toEqual({
          document: {
            email: 'anton@example.com',
          },
          id: 1,
          isCurrentVersion: true,
          schemaCompliant: false,
          schemaVersion: '1.1',
          versionId: 1,
        })

        expect(MockModel.create.mock.calls.length).toBe(1)
        expect(MockModel.create.mock.calls[0]).toEqual([
          {
            document: sampleDoc,
            isCurrentVersion: true,
            schemaCompliant: false,
            schemaVersion: '1.1',
          },
        ])

        expect(MockModel.set.mock.calls.length).toBe(1)
        expect(MockModel.get.mock.calls.length).toBe(1)
        expect(MockModel.save.mock.calls.length).toBe(1)
        expect(errorValidate.mock.calls.length).toBe(1)
      })
    })
  })
})
