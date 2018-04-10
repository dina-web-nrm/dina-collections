const createLog = require('../../../../../../utilities/log')
const createFactory = require('../../../../../../lib/controllers/create')

const log = createLog('services/specimen/controller/create')

module.exports = function create({ models, operation, elasticModels }) {
  const postCreateHook = createdResource => {
    return elasticModels.specimen
      .create(createdResource)
      .catch(err => {
        log.err('Failed to create elastic document', err)
      })
      .then(() => {
        return createdResource
      })
  }
  return createFactory({ models, operation, postCreateHook })
}
