const getByIdWrapper = require('../../../wrappers/methods/getById')

module.exports = function getByIdFactory({ Model, elasticsearch }) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  return getByIdWrapper(({ id }) => {
    return elasticsearch
      .get({
        id,
        index: Model.index,
        type: Model.name,
      })
      .then(res => {
        const item = res && res._source // eslint-disable-line no-underscore-dangle
        return {
          item,
        }
      })
      .catch(err => {
        if (err && err.status === 404) {
          return { item: null }
        }

        throw err
      })
  })
}
