const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/elasticsearch/modelFactories/normalizedElasticModel/methods/syncFactory'
)

const deleteAlias = ({ name, elasticsearch }) => {
  return elasticsearch.indices.exists({ index: name }).then(exist => {
    if (!exist) {
      return false
    }
    return elasticsearch.indices
      .deleteAlias({
        index: '_all',
        name,
      })
      .catch(err => {
        log.err(`Failed to detele alias: ${name}. might be an index`, err)
        return false
      })
  })
}

const deleteIndex = ({ name, elasticsearch, deleteIfAlias = false }) => {
  return elasticsearch.indices.exists({ index: name }).then(exist => {
    if (!exist) {
      return false
    }
    return elasticsearch.indices
      .delete({ index: name })
      .then(() => {
        return true
      })
      .catch(err => {
        const isAlias = err.toString().includes('matches an alias')
        if (isAlias) {
          log.warning(`Failed to detele index: ${name}. is an alias`)
          if (deleteIfAlias) {
            return deleteAlias({
              elasticsearch,
              name,
            })
          }
          return false
        }

        throw err
      })
  })
}

module.exports = function synchronizeFactory({
  Model,
  elasticsearch,
  indexVersionManager,
  rebuildStrategy,
} = {}) {
  if (!Model) {
    throw new Error('Have to provide model')
  }
  return function sync({ force }) {
    log.info(`Syncinc elastic model ${Model.name}`)
    log.info(`Deleting index if exist: ${Model.index}`)
    return deleteIndex({
      deleteIfAlias: rebuildStrategy !== 'swap',
      elasticsearch,
      name: Model.index,
    })
      .then(() => {
        if (rebuildStrategy === 'swap') {
          log.info('Rebuild strategy: swap. Synchronizing indexVersionManager')
          return indexVersionManager.synchronize().then(() => {
            log.info('Creating new version')
            return indexVersionManager
              .createVersion({
                throwOnRebuildError: !force,
              })
              .then(() => {
                return indexVersionManager.getNextVersionName().then(index => {
                  log.info(`Deleting index if exist: ${index}`)
                  return deleteIndex({
                    elasticsearch,
                    name: index,
                  }).then(() => {
                    return index
                  })
                })
              })
          })
        }
        return Model.index
      })
      .then(index => {
        log.info(`Setting up mappings for: ${index}`)
        const { mappings, indexSettings } = Model
        const body = mappings
          ? { mappings, settings: indexSettings }
          : { settings: indexSettings }
        log.info(`Creating index: ${index}`)
        return elasticsearch.indices.create({ body, index })
      })
  }
}
