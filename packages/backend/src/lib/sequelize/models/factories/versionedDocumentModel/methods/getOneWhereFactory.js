module.exports = function getOneWhereFactory({ Model }) {
  return function getOneWhere(
    { forceCurrentVersion = true, include = undefined, where } = {}
  ) {
    if (!where) {
      return Promise.reject(new Error('where not provided'))
    }

    return Model.findOne({
      include,
      where: {
        ...where,
        isCurrentVersion: forceCurrentVersion ? true : undefined,
      },
    })
  }
}
