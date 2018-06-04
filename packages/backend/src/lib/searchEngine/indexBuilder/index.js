const createLog = require('../../../utilities/log')
const buildIndex = require('./buildIndex')
const createDataInterface = require('./dataInterface')

const log = createLog('lib/searchEngine/indexBuilder')

module.exports = function createIndexBuilder({ config, connectors, models }) {
  return Promise.resolve().then(() => {
    if (
      !(config && config.searchIndexBuilder && config.searchIndexBuilder.active)
    ) {
      log.info('indexBuilder not active')
      return null
    }

    log.info('Create indexBuilder')
    const dataInterface = createDataInterface({
      config,
      connectors,
      log: log.scope(),
      models,
    })

    const specimenIndex = buildIndex({
      config,
      dataInterface,
      log: log.scope(),
      searchResource: 'searchSpecimen',
      srcResource: 'specimen',
      stageResource: 'stageSpecimen',
    })

    if (config && config.db && config.db.flushOnRestart) {
      return specimenIndex.rebuild()
    }
    return null
  })
}
