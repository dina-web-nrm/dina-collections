const extractModelFunctionsFromServices = require('./utilities/extractModelFunctionsFromServices')
const createLog = require('../../../utilities/log')

const log = createLog('lib/sequelize', 1)

module.exports = function createRelations({ services, models }) {
  log.debug('Create relations:')
  const setupRelationFunctions = extractModelFunctionsFromServices({
    functionType: 'setupRelations',
    services,
  })
  return Promise.all(
    setupRelationFunctions.map(({ name, modelFunction }) => {
      log.scope().debug(`${name}`)
      return Promise.resolve(
        modelFunction({
          models,
        })
      )
    })
  )
}
