const chainPromises = require('common/src/chainPromises')
const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/modelFactories/versionedDocumentModel/methods/bulkCreateFactory'
)

module.exports = function bulkCreateFactory({ Model, schemaVersion } = {}) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  // This should only be used to create test initialData
  return function bulkCreate(items) {
    log.debug(`Start create ${items.length} items for: ${Model.tableName}`)

    const promises = items.map(item => {
      return () => {
        return Model.create({
          document: item.doc,
          isCurrentVersion: true,
          schemaCompliant: false,
          schemaVersion: schemaVersion || undefined,
        })
      }
    })
    return chainPromises(promises).then(() => {
      log.debug(`Done create ${items.length} items`)
      return null
    })
  }
}
