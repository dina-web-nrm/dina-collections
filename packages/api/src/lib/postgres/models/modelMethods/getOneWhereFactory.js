module.exports = function getOneWhereFactory({ Model }) {
  return function getOneWhere({ where, forceCurrentVersion = true } = {}) {
    if (!where) {
      return Promise.reject(new Error('where not provided'))
    }

    return Model.findOne({
      raw: true,
      where: {
        ...where,
        isCurrentVersion: forceCurrentVersion ? true : undefined,
      },
    })
  }
}
