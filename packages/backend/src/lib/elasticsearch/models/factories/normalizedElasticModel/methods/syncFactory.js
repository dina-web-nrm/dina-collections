const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/elasticsearch/modelFactories/normalizedElasticModel/methods/syncFactory'
)

module.exports = function syncFactory({ Model, elasticsearch } = {}) {
  if (!Model) {
    throw new Error('Have to provide model')
  }
  return function sync({ force }) {
    const index = Model.name
    log.debug(`Syncinc elastic model ${Model.name}`)

    return elasticsearch.indices
      .exists({ index })
      .then(exists => {
        log.debug(`Index with name ${Model.name} exist`)
        if (force && exists) {
          return elasticsearch.indices.delete({ index }).then(() => {
            return false
          })
        }
        return exists
      })
      .then(exists => {
        if (!exists) {
          return elasticsearch.indices.create({ index })
        }
        return true
      })
      .then(res => {
        return res
      })
  }
}
