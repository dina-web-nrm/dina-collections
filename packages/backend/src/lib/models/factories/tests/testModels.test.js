const config = require('../../../../apps/test/config')
// const dbDescribe = require('../../../../utilities/test/dbDescribe')
const setupTestDatastores = require('./setupTestDatastores')
const setupTestModels = require('./setupTestModels')
const createModelTests = require('./createModelTests')
const methodTests = require('./methodTests')

const availableTypes = Object.keys(setupTestModels)

const coreMethods = [
  'buildWhereFilter',
  'bulkCreate',
  'create',
  'deactivate',
  'getById',
  'getOneWhere',
  'getWhere',
  'synchronize',
  'update',
]

const availableMethods = [
  'buildWhereFilter',
  'buildWhereQuery',
  'bulkCreate',
  'create',
  'deactivate',
  'del',
  'empty',
  'getById',
  'getCount',
  'getOneWhere',
  'getWhere',
  'Model',
  'setupRelations',
  'synchronize',
  'update',
]

describe('lib/models/factories/test/modelFactories', () => {
  it('Core methods included in availableMethods', () => {
    coreMethods.forEach(coreMethod => {
      expect(availableMethods.includes(coreMethod)).toBeTruthy()
    })
  })

  // coreMethods.forEach(method => {
  //   it(`Tests implemented for coreMethods: ${method}`, () => {
  //     expect(methodTests[method]).toBeTruthy()
  //   })
  // })

  // availableMethods.forEach(method => {
  //   it(`Tests implemented for availableMethods: ${method}`, () => {
  //     expect(methodTests[method]).toBeTruthy()
  //   })
  // })

  const { runDbTests } = config.test

  return setupTestDatastores({ config, runDbTests }).then(dataStores => {
    const modelsToTest = runDbTests
      ? Object.keys(setupTestModels)
      : ['inMemoryDocumentModel', 'inMemoryViewDocumentModel']

    const methodsToTest = availableMethods // ['getById']

    modelsToTest.forEach(key => {
      const setupFunction = setupTestModels[key]
      createModelTests({
        availableMethods,
        availableTypes,
        config,
        coreMethods,
        dataStores,
        methodsToTest,
        methodTests,
        modelType: key,
        setupModel: setupFunction,
      })
    })
  })
})
