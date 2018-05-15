const createLog = require('../../../../../../utilities/log')
const updateFactory = require('../../../../../../lib/controllers/update')

const log = createLog('services/specimen/controller/update')

module.exports = function update({ models, operation, elasticModels }) {
  const postUpdateHook = updatedResource => {
    const doc = updatedResource
    return elasticModels.specimen
      .update({ doc, id: doc.id })
      .catch(err => {
        log.err('Failed to update elastic document', err)
      })
      .then(() => {
        return updatedResource
      })
  }
  return updateFactory({ models, operation, postUpdateHook })
}
