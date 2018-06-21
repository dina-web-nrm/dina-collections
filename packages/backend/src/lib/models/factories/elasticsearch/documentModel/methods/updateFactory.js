const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/elasticsearch/modelFactories/normalizedElasticModel/methods/updateFactory'
)

module.exports = function updateFactory({ Model, elasticsearch } = {}) {
  if (!Model) {
    throw new Error('Have to provide model')
  }
  return function update({ doc, id }) {
    if (!doc) {
      return Promise.reject(new Error('doc not provided'))
    }

    log.debug(`Updating instance for model ${Model.name}`)

    return elasticsearch
      .update({
        body: { doc },
        id,
        index: Model.index,
        refresh: false,
        type: Model.name,
      })
      .then(item => {
        log.debug(
          `Update instance for model ${Model.name}. id: ${
            item.id
          }, versionId: ${item.versionId}`
        )
        return {
          item,
        }
      })
      .catch(err => {
        log.err(`Error updating instance for model ${Model.name}`, err)
        throw err
      })
  }
}
