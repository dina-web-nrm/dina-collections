const createLog = require('../../../../utilities/log')
const rebuild = require('./rebuild')

const defaultLog = createLog('lib/searchEngine/indexBuilder/index')

module.exports = function createIndex({
  config,
  dataInterface,
  log = defaultLog,
  searchResource,
  srcResource,
  stageResource,
}) {
  if (!searchResource) {
    throw new Error('Provide searchResource')
  }

  if (!srcResource) {
    throw new Error('Provide srcResource')
  }

  if (!stageResource) {
    throw new Error('Provide stageResource')
  }

  return {
    rebuild: () => {
      return rebuild({
        config,
        dataInterface,
        log: log.scope(),
        searchResource,
        srcResource,
        stageResource,
      })
    },
  }
}
