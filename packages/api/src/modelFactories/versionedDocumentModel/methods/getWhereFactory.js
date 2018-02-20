module.exports = function getWhereFactory({ Model }) {
  return function getWhere({ where, forceCurrentVersion = true } = {}) {
    if (!where) {
      return Promise.reject(new Error('where not provided'))
    }
    return Model.findAll({
      raw: true,
      where: {
        ...where,
        isCurrentVersion: forceCurrentVersion ? true : undefined,
      },
    })
  }
}
