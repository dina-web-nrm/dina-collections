const createLog = require('../../utilities/log')
const chainPromises = require('common/src/chainPromises')

const log = createLog('lib/models', 1)

module.exports = function createRelations({ models, modelArray }) {
  return chainPromises(
    modelArray.map(({ model, name }) => {
      return () => {
        log.debug(`${name}`)
        if (model.setupRelations) {
          return Promise.resolve().then(() => {
            model.setupRelations({ models })
          })
        }
        return true
      }
    })
  )
}
