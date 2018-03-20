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
      items.map(({ doc, id, ...rest }) => {
        return {
          document: doc,
          id,
          isCurrentVersion: true,
          schemaCompliant: false,
          schemaVersion: schemaVersion || undefined,
          versionId: id,
          ...rest,
        }
      })
    ).then(() => {
      log.debug(`Successsfulle created ${items.length} items`)
      const lastId = Number(items[items.length - 1].id)
      const newId = lastId + 1
      return updatePrimaryKey(newId)
    })
  }
}
