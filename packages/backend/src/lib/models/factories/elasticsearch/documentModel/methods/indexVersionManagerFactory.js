const backendError500 = require('common/src/error/errorFactories/backendError400')
const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/elasticsearch/modelFactories/normalizedElasticModel/methods/indexVersionMamagerFactory'
)

module.exports = function indexVersionManagerFactory({
  Model,
  elasticsearch,
  rebuildStrategy,
  versions = ['a', 'b'],
} = {}) {
  const createVersionedIndexName = ({ index, version }) => {
    if (!version) {
      return index
    }
    return `${index}-${version}`
  }

  const getNextVersion = ({ currentVersion }) => {
    if (rebuildStrategy !== 'swap') {
      return currentVersion || versions[0]
    }

    const currentVersionIndex = versions.findIndex(version => {
      return version === currentVersion
    })

    if (currentVersionIndex === -1) {
      return versions[0]
    }

    if (currentVersionIndex >= versions.length - 1) {
      return versions[0]
    }
    const test = versions[currentVersionIndex + 1]
    return test
  }

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
      .catch(err => {
        if (err.status === 404) {
          return {
            version: versions[0],
          }
        }

        throw err
      })
  }

  const updateMeta = input => {
    return getMeta().then(currentMeta => {
      const newMeta = ['error', 'version', 'nextVersion'].reduce((obj, key) => {
        return {
          ...obj,
          [key]: input[key] !== undefined ? input[key] : currentMeta[key],
        }
      }, {})

      return elasticsearch
        .index({
          body: newMeta,
          id: 1,
          index: metaIndexName,
          refresh: true,
          type: 'meta',
        })
        .then(() => {
          return null
        })
    })
  }

  const createVersion = ({ throwOnRebuildError = false } = {}) => {
    return getMeta().then(({ nextVersion, version: currentVersion, error }) => {
      if (error) {
        const err = backendError500({
          code: 'INTERNAL_SERVER_ERROR',
          detail: `Tried to rebuild index: ${
            Model.index
          } but last rebuild ended with an error`,
          throwError: throwOnRebuildError,
        })
        log.err(err)
      }
      if (nextVersion) {
        const err = backendError500({
          code: 'INTERNAL_SERVER_ERROR',
          detail: `Tried to create new index version but next version already exist. while rebuilding ${
            Model.index
          }. This is either due to an ongoing or stopped index build`,
          throwError: throwOnRebuildError,
        })
        log.err(err)
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
      return updateMeta({
        error: null,
        nextVersion: newVersion,
      }).then(() => {
        return newVersion
      })
    })
  }
  const getNextVersionName = () => {
    if (rebuildStrategy !== 'swap') {
      return Promise.resolve(Model.index)
    }
    return getMeta().then(({ nextVersion }) => {
      return createVersionedIndexName({
        index: Model.index,
        version: nextVersion,
      })
    })
  }

  const swap = ({ err: rebuildError } = {}) => {
    if (rebuildStrategy !== 'swap') {
      return Promise.resolve(true)
    }
    return getMeta().then(({ version: currentVersion, nextVersion }) => {
      if (rebuildError) {
        return updateMeta({ error: true })
      }

      const newIndexName = createVersionedIndexName({
        index: Model.index,
        version: nextVersion,
      })
      const oldIndexName = createVersionedIndexName({
        index: Model.index,
        version: currentVersion,
      })

      log.debug(`Swapping index. Old: ${oldIndexName}. New: ${newIndexName}`)

      log.debug(`Creating new alias: ${newIndexName} -> ${Model.index}`)
      return elasticsearch.indices
        .putAlias({
          index: newIndexName,
          name: Model.index,
        })
        .then(() => {
          log.debug(`Delete old alias: ${oldIndexName} -> ${Model.index}`)
          return elasticsearch.indices
            .deleteAlias({
              index: oldIndexName,
              name: Model.index,
            })
            .catch(err => {
              log.warning(
                `Could not delete old alias with name: ${oldIndexName}`,
                err
              )
            })
            .then(() => {
              return updateMeta({
                error: false,
                nextVersion: null,
                version: nextVersion,
              })
            })
        })
    })
  }

  return {
    createVersion,
    getNextVersionName,
    getViewMeta: getMeta,
    swap,
    synchronize,
  }
}
