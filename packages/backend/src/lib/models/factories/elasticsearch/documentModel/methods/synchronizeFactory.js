const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/elasticsearch/modelFactories/normalizedElasticModel/methods/syncFactory'
)

module.exports = function synchronizeFactory(
  { Model, elasticsearch, indexVersionManager, rebuildStrategy } = {}
) {
  if (!Model) {
    throw new Error('Have to provide model')
  }
  return function sync({ force }) {
    return indexVersionManager.synchronize().then(() => {
      return Promise.resolve()
        .then(() => {
          if (rebuildStrategy === 'swap') {
            return indexVersionManager.createVersion().then(name => {
              return name
            })
          }
          return Model.index
        })
        .then(index => {
          const { mappings, indexSettings } = Model
          log.debug(`Syncinc elastic model ${Model.name}`)

          return elasticsearch.indices
            .exists({ index })
            .then(exists => {
              log.debug(`Index with name ${Model.name} exist`)
              if (force && exists) {
                return elasticsearch.indices
                  .delete({ index })
                  .then(() => {
                    return false
                  })
                  .catch(() => {
                    log.err(
                      `Failed to detele index: ${
                        index
                      }. Trying to delete alias with same name`
                    )
                    return elasticsearch.indices.deleteAlias({
                      index: '_all',
                      name: Model.index,
                    })
                  })
              }
              return exists
            })
            .then(exists => {
              if (!exists) {
                const body = mappings
                  ? { mappings, settings: indexSettings }
                  : { settings: indexSettings }

                return elasticsearch.indices.create({ body, index })
              }
              return true
            })
            .then(res => {
              return res
            })
        })
    })
  }
}
