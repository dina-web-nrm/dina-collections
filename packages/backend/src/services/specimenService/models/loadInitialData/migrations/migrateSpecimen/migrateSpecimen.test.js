/* eslint-disable global-require */
const readInitialData = require('../../../../../../utilities/readInitialData')
const dbDescribe = require('../../../../../../utilities/test/dbDescribe')

dbDescribe(
  'services/specimenService/models/loadInitialData/migrations/migrateSpecimen/sampleSpecimens',
  () => {
    it('dont throw when mapping a single specimen', () => {
      const sampleSpecimens = require('../utilities/test/sampleSpecimens')
      const createReporter = require('../reporterFactory')
      const migrateSpecimen = require('./index')

      const reporter = createReporter()

      expect(() => {
        migrateSpecimen({ reporter, specimen: sampleSpecimens[0] })
      }).not.toThrow()
    })
  }
)

dbDescribe(
  'services/specimenService/models/loadInitialData/migrations/migrateSpecimen/allSpecimens',
  () => {
    it('dont throw when mapping a all specimens', () => {
      const createReporter = require('../reporterFactory')
      const migrateSpecimen = require('./index')

      const reporter = createReporter()
      const rawSpecimens = readInitialData('specimens').slice(0, 1000)

      expect(() => {
        rawSpecimens.forEach(specimen => {
          migrateSpecimen({ reporter, specimen })
        })
      }).not.toThrow()
    })
  }
)
