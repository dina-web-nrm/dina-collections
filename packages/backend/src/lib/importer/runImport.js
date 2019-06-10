const path = require('path')
const fs = require('fs')
const getCurrentUTCTimestamp = require('common/src/date/getCurrentUTCTimestamp')
const asyncReduce = require('common/src/asyncReduce')
const promiseForEach = require('common/src/promiseForEach')
const createLog = require('../../utilities/log')

const log = createLog('lib/importer')

const saveToFile = false

module.exports = function runImport({
  config,
  fileInteractor,
  importData,
  rebuildElastic,
  serviceInteractor,
}) {
  log.info('Start importer')
  const dataInfo = fileInteractor.readSync({
    filePath: '.info.json',
    folderPath: 'data',
    parseJson: true,
  })

  const resources = [
    'causeOfDeathType',
    'customTaxonNameType',
    'establishmentMeansType',
    'featureType',
    'identifierType',
    'preparationType',
    'typeSpecimenType',
    'place',
    'taxon',
    'taxonName',
    'storageLocation',
    'normalizedAgent',
    'specimen',
  ]

  return Promise.resolve()
    .then(() => {
      if (!importData) {
        return {}
      }
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

        fileInteractor.writeSync({
          content: JSON.stringify({
            ...dataInfo,
            date: getCurrentUTCTimestamp(),
          }),
          filePath: '.importInfo.json',
          folderPath: 'data',
        })

        if (saveToFile) {
          fs.writeFileSync(
            path.join(__dirname, 'importReport.json'),
            JSON.stringify(importReport, null, 2)
          )
        }
        return serviceInteractor
          .rebuildView({
            request: {
              queryParams: {
                limit: config.initialData.numberOfSpecimens,
              },
            },
            resource: 'catalogNumber',
          })
          .then(() => {
            /* eslint-disable no-console */
            console.log('importReport', JSON.stringify(importReport, null, 2))
            /* eslint-enable no-console */
            return null
          })
      })
    })
    .then(() => {
      if (!rebuildElastic) {
        log.info('Not rebuilding elastic')
        process.exit(0)
      }

      const indexOperations = [
        'searchSpecimenRebuildView',
        'searchPlaceRebuildView',
        'searchNormalizedAgentRebuildView',
        'searchStorageLocationRebuildView',
        'searchTaxonRebuildView',
        'searchTaxonNameRebuildView',
      ]

      return promiseForEach(indexOperations, operationId => {
        return serviceInteractor
          .call({
            operationId,
            request: { queryParams: { consolidateJobs: true, limit: 100000 } },
          })
          .then(indexRebuildReport => {
            /* eslint-disable no-console */

            console.log(
              `Rebuild ${operationId}`,
              JSON.stringify(indexRebuildReport, null, 2)
            )
            /* eslint-enable no-console */
            log.info('Rebuilding searchSpecimen done')
          })
      }).then(() => {
        process.exit(0)
      })
    })
}
