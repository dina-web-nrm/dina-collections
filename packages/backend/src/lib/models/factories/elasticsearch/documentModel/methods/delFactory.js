const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/elasticsearch/modelFactories/normalizedElasticModel/methods/delFactory'
)

module.exports = function delFactory({ Model, elasticsearch } = {}) {
  if (!Model) {
    throw new Error('Have to provide model')
  }
  return function del({ id }) {
    log.debug(`Deactivating instance for model ${Model.name}`)

    return elasticsearch
      .delete({
        id,
        index: Model.index,
        // refresh: !config.env.isProduction,
        refresh: false,
        type: Model.name,
      })
      .then(res => {
        log.debug(
          `Deleted instance for model ${Model.name}. id: ${
            res.id
          }, versionId: ${res.versionId}`
        )
      })
      .catch(err => {
        log.err(`Error updating instance for model ${Model.name}`, err)
        throw err
      })
  }
}
