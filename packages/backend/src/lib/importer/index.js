const asyncReduce = require('common/src/asyncReduce')
const createLog = require('../../utilities/log')

const log = createLog('lib/importer')

module.exports = function importer({ config, serviceInteractor }) {
  log.info('Start importer')

  const resources = [
    'agent',
    'causeOfDeathType',
    'establishmentMeansType',
    'featureType',
    'identifierType',
    'preparationType',
    'typeSpecimenType',

    'place',
    'taxon',
    'taxonName',
    'storageLocation',
    'specimen',
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
            [resource]: migrationResult,
          }
        })
    },
  }).then(res => {
    /* eslint-disable no-console */
    console.log('res', JSON.stringify(res, null, 2))
    /* eslint-enable no-console */
    process.exit(0)
  })

  // if (config.jobs.schedulerIndexElastic) {
  //   return serviceInteractor
  //     .call({ operationId: 'searchSpecimenRebuildView', request: {} })
  //     .then(() => {
  //       log.info('Adding job success')
  //       process.exit(0)
  //     })
  //     .catch(err => {
  //       log.err('Adding job fail', err)
  //     })
  // }

  // return serviceInteractor
  //   .call({ operationId: 'searchSpecimenRequestRebuildView', request: {} })
  //   .then(() => {
  //     log.info('Adding job success')
  //   })
  //   .catch(err => {
  //     log.err('Adding job fail', err)
  //   })
}
