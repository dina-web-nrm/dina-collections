module.exports = function getByIdFactory({ Model, elasticsearch }) {
  if (!Model) {
    throw new Error('Have to provide model')
  }
  return function getById({ id } = {}) {
    if (id === undefined) {
      return Promise.reject(new Error('id not provided'))
    }

    return elasticsearch
      .get({
        id: 1,
        index: Model.index,
        type: Model.name,
      })
      .then(res => {
        const item = res && res._source // eslint-disable-line no-underscore-dangle
        return {
          item,
        }
      })
  }
}
