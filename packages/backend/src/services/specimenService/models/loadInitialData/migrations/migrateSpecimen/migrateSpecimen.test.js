const sampleSpecimens = require('../utilities/test/sampleSpecimens')
const createReporter = require('../reporterFactory')
const migrateSpecimen = require('./index')
const readInitialData = require('../../../../../../utilities/readInitialData')
const dbDescribe = require('../../../../../../utilities/test/dbDescribe')

describe('services/specimenService/models/loadInitialData/migrations/migrateSpecimen/sampleSpecimens', () => {
  it('dont throw when mapping a single specimen', () => {
    const reporter = createReporter()

    expect(() => {
      migrateSpecimen({ reporter, specimen: sampleSpecimens[0] })
    }).not.toThrow()
  })
})

dbDescribe(
  'services/specimenService/models/loadInitialData/migrations/migrateSpecimen/allSpecimens',
  () => {
    it('dont throw when mapping a all specimens', () => {
      const reporter = createReporter()
      const rawSpecimens = readInitialData('specimens')

      expect(() => {
        rawSpecimens.forEach(specimen => {
          migrateSpecimen({ reporter, specimen })
        })
      }).not.toThrow()
    })
  }
)
