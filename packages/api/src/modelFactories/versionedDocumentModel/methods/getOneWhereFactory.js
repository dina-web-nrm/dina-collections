module.exports = function getOneWhereFactory({ Model }) {
  return function getOneWhere(
    { forceCurrentVersion = true, include = undefined, where, raw = true } = {}
  ) {
    if (!where) {
      return Promise.reject(new Error('where not provided'))
    }

    return Model.findOne({
      include,
      raw,
      where: {
        ...where,
        isCurrentVersion: forceCurrentVersion ? true : undefined,
      },
    })
  }
}
