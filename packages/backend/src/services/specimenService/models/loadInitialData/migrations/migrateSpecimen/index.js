const createMigrator = require('../migratorFactory')
const createLookupFactory = require('../lookupFactory')
const createIdentifiers = require('./identifiers')
const createReadOnly = require('./readOnly')
const createCollectionItems = require('./collectionItems')
const createCollectingInformation = require('./collectingInformation')
const createRecordHistoryEvents = require('./recordHistoryEvents')
const validateIndividual = require('../utilities/test/validateIndividual')
const validateSpecimen = require('../utilities/test/validateSpecimen')
const createSpecimenFromIndividual = require('./createSpecimenFromIndividual')

module.exports = function migrateSpecimen({ reporter, specimen }) {
  const lookup = createLookupFactory({ reporter })
  const migrator = createMigrator({
    reporter,
    src: specimen,
  })
  createIdentifiers({ lookup, migrator })
  createCollectionItems({ lookup, migrator })
  createCollectingInformation({ lookup, migrator })
  createRecordHistoryEvents({ lookup, migrator })
  createReadOnly({ lookup, migrator })

  reporter.increment({
    path: 'migrations.numberOfMigratedSpecimens',
  })
  const migratedSpecimen = migrator.getTarget()

  const validationResult = validateIndividual(migratedSpecimen.individual)

  if (validationResult) {
    reporter.increment({
      path: 'migrations.numberOfInvalidSpecimens',
    })
  } else {
    reporter.increment({
      path: 'migrations.numberOfValidSpecimens',
    })
  }

  const normalizedSpecimen = createSpecimenFromIndividual(
    migratedSpecimen.individual
  )
  validateSpecimen(normalizedSpecimen)

  return normalizedSpecimen
}
