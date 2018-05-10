const createLog = require('../../../../../../utilities/log')
const delFactory = require('../../../../../../lib/controllers/del')

const log = createLog('services/specimen/controller/del')

module.exports = function del({ models, operation, elasticModels }) {
  const postDeleteHook = deletedResource => {
    return elasticModels.specimen
      .del({ id: deletedResource.id })
      .catch(err => {
        log.err('Failed to delete elastic document', err)
      })
      .then(() => {
        return deletedResource
      })
  }
  return delFactory({ models, operation, postDeleteHook })
}
