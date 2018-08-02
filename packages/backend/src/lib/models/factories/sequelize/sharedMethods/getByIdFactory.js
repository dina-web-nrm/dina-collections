const getByIdWrapper = require('../../wrappers/methods/getById')
const formatModelItemResponse = require('../utilities/formatModelItemResponse')

module.exports = function getByIdFactory({ Model }) {
  if (!Model) {
    throw new Error('Have to provide model')
  }
  return getByIdWrapper(
    ({ allowDeactivated = false, raw = true, id, include = [] }) => {
      return Model.findOne({
        include,
        where: allowDeactivated
          ? { id }
          : {
              deactivatedAt: null,
              id,
            },
      }).then(res => {
        if (!raw) {
          return { item: res }
        }
        return formatModelItemResponse({ input: res })
      })
    }
  )
}
