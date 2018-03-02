module.exports = function getByIdFactory({ Model }) {
  if (!Model) {
    throw new Error('Have to provide model')
  }
  return function getById({ id, include = [], versionId, raw = true } = {}) {
    if (id === undefined) {
      return Promise.reject(new Error('id not provided'))
    }
    if (versionId) {
      return Model.findOne({
        include,
        raw,
        where: {
          id,
          versionId,
        },
      })
    }

    return Model.findOne({
      include,
      raw,
      where: {
        id,
        isCurrentVersion: true,
      },
    })
  }
}
