const bulkCreateWrapper = require('../../../wrappers/methods/bulkCreate')
const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/elasticsearch/modelFactories/normalizedElasticModel/methods/bulkCreateFactory'
)

module.exports = function bulkCreateFactory({
  Model,
  elasticsearch,
  forceRefresh,
  indexVersionManager,
} = {}) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  // This should only be used to create test initialData
  return bulkCreateWrapper(({ items, requireId }) => {
    log.info(`Start create ${items.length} items for: ${Model.name}`)

    if (requireId === false) {
      throw new Error('Id required for elasticsearch model')
    }

    if (items.length === 0) {
      log.info('No items added: input empty')
      return Promise.resolve(true)
    }

    return indexVersionManager.getNextVersionName().then(latestVersionName => {
      const indexName = latestVersionName
      log.info(`Adding ${items.length} items to ${indexName}`)
      const body = items.reduce((rows, item) => {
        const { attributes, id, internals = {}, relationships } = item
        rows.push({
          index: { _id: id, _index: indexName, _type: Model.name },
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
          if (res.errors) {
            throw res
          }

          log.info(`Successfully created ${items.length} items`)
          return { meta: { count: res && res.items && res.items.length } }
        })
    })
  })
}
