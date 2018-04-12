const config = require('../../../../../../apps/core/config')
const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/elasticsearch/modelFactories/normalizedElasticModel/methods/bulkCreateFactory'
)

module.exports = function bulkCreateFactory({ Model, elasticsearch } = {}) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  // This should only be used to create test initialData
  return function bulkCreate(items = []) {
    log.debug(`Start create ${items.length} items for: ${Model.name}`)

    if (items.length === 0) {
      log.debug('No items added: input empty')
      return Promise.resolve(true)
    }

    const body = items.reduce((rows, item) => {
      rows.push({
        index: { _id: item.id, _index: Model.name, _type: Model.name },
      })
      rows.push(item)
      return rows
    }, [])

    return elasticsearch
      .bulk({
        body,
        refresh: !config.env.isProduction,
      })
      .then(() => {
        log.debug(`Successfully created ${items.length} items`)
        return true
      })
  }
}
