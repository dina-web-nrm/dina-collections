const backendError500 = require('common/src/error/errorFactories/backendError400')
const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/elasticsearch/modelFactories/normalizedElasticModel/methods/indexVersionMamagerFactory'
)

const createVersionedIndexName = ({ index, version }) => {
  if (!version) {
    return index
  }
  return `${index}-${version}`
}

const getNextVersion = ({ rebuildStrategy, currentVersion }) => {
  if (rebuildStrategy !== 'swap') {
    return currentVersion || 'a'
  }

  if (currentVersion === 'a') {
    return 'b'
  }

  return 'a'
}

module.exports = function indexVersionManagerFactory(
  { Model, elasticsearch, rebuildStrategy, throwOnRebuildError = true } = {}
) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  const metaIndexName = `${Model.index}versioninfo`

  const synchronize = () => {
    if (rebuildStrategy !== 'swap') {
      return Promise.resolve(null)
    }
    log.debug(`Syncing index: ${metaIndexName}`)
    return elasticsearch.indices
      .exists({ index: metaIndexName })
      .then(exists => {
        if (!exists) {
          log.debug(`Index: ${metaIndexName} dont exist. Creating new index`)
          return elasticsearch.indices.create({
            body: {},
            index: metaIndexName,
          })
        }
        return true
      })
      .then(res => {
        return res
      })
  }

  const setMeta = ({ error = false, newVersion, rebuilding }) => {
    return elasticsearch
      .index({
        body: { error, rebuilding, version: newVersion },
        id: 1,
        index: metaIndexName,
        refresh: true,
        type: 'meta',
      })
      .then(() => {
        return newVersion
      })
  }

  const getMeta = () => {
    return elasticsearch
      .get({
        id: 1,
        index: metaIndexName,
        type: 'meta',
      })
      .then(res => {
        return res._source // eslint-disable-line
      })
  }

  const createVersion = () => {
    return getMeta().then(({ version: currentVersion, rebuilding }) => {
      if (rebuilding) {
        const error = backendError500({
          code: 'INTERNAL_SERVER_ERROR',
          detail: `Tried to rebuild index: ${Model.index} while rebuilding`,
          throwError: throwOnRebuildError,
        })
        log.debug(error)
        log.err(error)
      }
      const newVersion = getNextVersion({
        currentVersion,
        rebuildStrategy,
      })
      log.debug(
        `Creating new index version index: ${newVersion} for index ${
          Model.index
        }`
      )
      return setMeta({ newVersion, rebuilding: true }).then(() => {
        return newVersion
      })
    })
  }
  const getLatestVersionName = () => {
    return getMeta().then(({ version }) => {
      return createVersionedIndexName({
        index: Model.index,
        version,
      })
    })
  }

  const swap = ({ err: rebuildError } = {}) => {
    if (rebuildStrategy !== 'swap') {
      return Promise.resolve(true)
    }
    return getMeta().then(({ version: newVersion }) => {
      if (rebuildError) {
        return setMeta({ error: true, newVersion, rebuilding: false })
      }

      const oldVersion = getNextVersion({
        currentVersion: newVersion,
        rebuildStrategy,
      })
      log.debug(`Swapping index. Old: ${oldVersion}. New: ${newVersion}`)

      return elasticsearch.indices
        .putAlias({
          index: createVersionedIndexName({
            index: Model.index,
            version: newVersion,
          }),
          name: Model.index,
        })
        .then(() => {
          return elasticsearch.indices
            .deleteAlias({
              index: createVersionedIndexName({
                index: Model.index,
                version: oldVersion,
              }),
              name: Model.index,
            })
            .catch(err => {
              log.warning(
                `Could not delete old alias with version: ${oldVersion}`,
                err
              )
            })
            .then(() => {
              return setMeta({ newVersion, rebuilding: false })
            })
        })
    })
  }

  return {
    createVersion,
    getLatestVersionName,
    getViewMeta: getMeta,
    swap,
    synchronize,
  }
}
