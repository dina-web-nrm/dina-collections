const asyncReduce = require('common/src/asyncReduce')
const createLog = require('../../utilities/log')

const log = createLog('lib/importer')

module.exports = function importer({ config, serviceInteractor }) {
  log.info('Start importer')

  const resources = [
    'causeOfDeathType',
    'customTaxonNameType',
    'establishmentMeansType',
    'featureType',
    'identifierType',
    // 'normalizedAgent',
    // 'preparationType',
    // 'typeSpecimenType',
    // 'place',
    // 'taxon',
    // 'taxonName',
    // 'storageLocation',
    // 'specimen',
  ]

  return asyncReduce({
    initialValue: [],
    items: resources,
    reduceFunction: ({ item: resource, value: migrationResults }) => {
      log.info(`Importing data from resource: ${resource}`)

      let request = {}
      if (resource === 'specimen') {
        request = {
          queryParams: {
            limit: config.initialData.numberOfSpecimens,
          },
        }
      }

      return serviceInteractor
        .importDataFromFile({ request, resource })
        .then(migrationResult => {
          return {
            ...migrationResults,
            [resource]: migrationResult.data.attributes,
          }
        })
    },
  }).then(importReport => {
    log.info('Import done')
    log.info('Start rebuilding searchSpecimen')
    return serviceInteractor
      .call({
        operationId: 'searchSpecimenRebuildView',
        request: { queryParams: { limit: 100000 } },
      })
      .then(rebuildSearchSpecimenReport => {
        /* eslint-disable no-console */
        console.log('importReport', JSON.stringify(importReport, null, 2))
        console.log(
          'rebuildSearchSpecimenReport',
          JSON.stringify(rebuildSearchSpecimenReport, null, 2)
        )
        /* eslint-enable no-console */
        log.info('Rebuilding searchSpecimen done')
        process.exit(0)
      })
  })
}
