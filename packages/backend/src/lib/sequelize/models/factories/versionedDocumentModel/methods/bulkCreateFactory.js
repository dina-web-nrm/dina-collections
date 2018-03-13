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
    const data = items.map(item => {
      if (!item.id) {
        throw new Error('bulkCreate required specified ids')
      }
      return {
        document: item.doc,
        id: item.id,
        isCurrentVersion: true,
        schemaCompliant: false,
        schemaVersion: schemaVersion || undefined,
        versionId: item.id,
      }
    })

    log.debug(`Start create ${data.length} items for: ${Model.tableName}`)
    return Model.bulkCreate(data).then(result => {
      log.debug(`Created ${data.length} items for: ${Model.tableName}`)
      return result
    })
  }
}
