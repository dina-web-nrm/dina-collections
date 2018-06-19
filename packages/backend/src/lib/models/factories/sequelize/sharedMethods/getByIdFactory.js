module.exports = function getByIdFactory({ Model }) {
  if (!Model) {
    throw new Error('Have to provide model')
  }
  return function getById({ allowDeactivated = false, id, include = [] } = {}) {
    if (id === undefined) {
      return Promise.reject(new Error('id not provided'))
    }

    return Model.findOne({
      include,
      where: allowDeactivated
        ? { id }
        : {
            deactivatedAt: null,
            id,
          },
    }).then(item => {
      return {
        item,
      }
    })
  }
}
