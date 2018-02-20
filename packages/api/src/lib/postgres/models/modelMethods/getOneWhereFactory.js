module.exports = function getOneWhereFactory({ Model }) {
  return function getOneWhere({ where } = {}) {
    if (!where) {
      return Promise.reject(new Error('where not provided'))
    }

    return Model.findOne({
      raw: true,
      where: {
        ...where,
        isCurrentVersion: true,
      },
    })
  }
}
