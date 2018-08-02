const bulkCreateWrapper = require('../../../wrappers/methods/bulkCreate')
const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/elasticsearch/modelFactories/normalizedElasticModel/methods/bulkCreateFactory'
)

module.exports = function bulkCreateFactory(
  { Model, elasticsearch, forceRefresh } = {}
) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  // This should only be used to create test initialData
  return bulkCreateWrapper(({ items }) => {
    log.debug(`Start create ${items.length} items for: ${Model.name}`)

    if (items.length === 0) {
      log.debug('No items added: input empty')
      return Promise.resolve(true)
    }

    const body = items.reduce((rows, item) => {
      const { attributes, id, internals = {}, relationships } = item
      rows.push({
        index: { _id: id, _index: Model.index, _type: Model.name },
      })

      rows.push({
        attributes,
        id,
        internals,
        relationships,
      })
      return rows
    }, [])

    return elasticsearch
      .bulk({
        body,
        refresh: forceRefresh,
      })
      .then(res => {
        log.debug(`Successfully created ${items.length} items`)
        return { meta: { count: res && res.items && res.items.length } }
      })
  })
}
