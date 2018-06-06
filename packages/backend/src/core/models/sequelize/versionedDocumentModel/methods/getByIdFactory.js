module.exports = function getByIdFactory({ Model }) {
  if (!Model) {
    throw new Error('Have to provide model')
  }
  return function getById({ id, include = [], versionId } = {}) {
    if (id === undefined) {
      return Promise.reject(new Error('id not provided'))
    }
    if (versionId) {
      return Model.findOne({
        include,
        where: {
          id,
          versionId,
        },
      })
    }

    return Model.findOne({
      include,
      where: {
        id,
        isCurrentVersion: true,
      },
    })
  }
}
