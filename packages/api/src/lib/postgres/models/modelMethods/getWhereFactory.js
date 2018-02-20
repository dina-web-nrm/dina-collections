module.exports = function getWhereFactory({ Model }) {
  return function getWhere({ where } = {}) {
    if (!where) {
      return Promise.reject(new Error('where not provided'))
    }
    return Model.findAll({
      raw: true,
      where: {
        ...where,
        isCurrentVersion: true,
      },
    })
  }
}
