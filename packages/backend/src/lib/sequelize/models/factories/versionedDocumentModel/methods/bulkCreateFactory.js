const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/modelFactories/versionedDocumentModel/methods/bulkCreateFactory'
)

module.exports = function bulkCreateFactory(
  { Model, schemaVersion, updatePrimaryKey } = {}
) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  // This should only be used to create test initialData
  return function bulkCreate(items) {
    log.debug(`Start create ${items.length} items for: ${Model.tableName}`)

    return Model.bulkCreate(
      items.map(item => {
        return {
          document: item.doc,
          id: item.id,
          isCurrentVersion: true,
          schemaCompliant: false,
          schemaVersion: schemaVersion || undefined,
          versionId: item.id,
        }
      })
    ).then(() => {
      log.debug(`Successsfulle created ${items.length} items`)
      const lastId = items[items.length - 1].id
      const newId = lastId + 1
      return updatePrimaryKey(newId)
    })
  }
}
