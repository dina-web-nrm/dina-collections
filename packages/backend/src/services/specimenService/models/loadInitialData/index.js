const batchExecute = require('../../../../utilities/test/batchExecute')
const readInitialData = require('../../../../utilities/readInitialData')

const migrateSpecimen = require('./migrations/migrateSpecimen')
const createReporter = require('./migrations/reporterFactory')

module.exports = function loadInitialData({ config, models }) {
  const reporter = createReporter()
  reporter.start()
  const {
    initialData: { numberOfSpecimens: numberOfSpecimensInput } = {},
  } = config

  const specimenTemplate = readInitialData('specimens')
  if (!specimenTemplate) {
    return Promise.resolve()
  }
  const numberOfSpecimens = Math.min(
    numberOfSpecimensInput,
    specimenTemplate.length
  )

  const createEntry = index => {
    return specimenTemplate[index % specimenTemplate.length]
  }

  let id = 0
  return batchExecute({
    createEntry,
    execute: items => {
      return Promise.all(
        items.map(rawSpecimen => {
          const migratedCoreSpecimen = migrateSpecimen({
            reporter,
            specimen: rawSpecimen,
          })

          return migratedCoreSpecimen
        })
      )
        })
        .then(coreSpecimens => {
          const tmp = coreSpecimens.map(({ attributes }) => {
            id += 1
            return {
              doc: attributes,
              id,
            }
          })

          return models.specimen.bulkCreate(tmp)
        })
    },
    numberOfEntries: numberOfSpecimens,
    numberOfEntriesEachBatch: 1000,
  }).then(result => {
    reporter.done()
    return result
  })
}
