module.exports = function getByIdFactory({ Model }) {
  return function getById({ id, versionId, raw = true } = {}) {
    if (id === undefined) {
      return Promise.reject(new Error('id not provided'))
    }
    if (versionId) {
      return Model.findOne({
        raw,
        where: {
          id,
          versionId,
        },
      })
    }

    return Model.findOne({
      order: [['versionId', 'DESC']],
      raw,
      where: {
        id,
      },
    })
  }
}
