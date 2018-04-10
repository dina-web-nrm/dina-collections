const config = require('../../../../../../apps/core/config')
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

    log.debug(`Creating instance for model ${Model.name}`)

    return elasticsearch
      .update({
        body: { doc },
        id,
        index: Model.name,
        refresh: !config.env.isProduction,
        type: Model.name,
      })
      .then(res => {
        log.debug(
          `Update instance for model ${Model.name}. id: ${res.id}, versionId: ${
            res.versionId
          }`
        )
      })
      .catch(err => {
        log.err(`Error updating instance for model ${Model.name}`, err)
        throw err
      })
  }
}
