const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/elasticsearch/modelFactories/normalizedElasticModel/methods/createFactory'
)

module.exports = function createFactory({ Model, elasticsearch } = {}) {
  if (!Model) {
    throw new Error('Have to provide model')
  }
  return function create(doc) {
    if (!doc) {
      return Promise.reject(new Error('doc not provided'))
    }

    log.debug(`Creating instance for model ${Model.name}`)

    return elasticsearch
      .create({
        body: doc,
        id: doc.id,
        index: Model.index,
        // refresh: false
        type: Model.name,
      })
      .then(item => {
        log.debug(
          `Created instance for model ${Model.name}. id: ${
            item.id
          }, versionId: ${item.versionId}`
        )
        return {
          item,
        }
      })
  }
}
