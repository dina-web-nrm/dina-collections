module.exports = function getOneWhereFactory({ Model }) {
  return function getOneWhere({ include = undefined, where } = {}) {
    if (!where) {
      return Promise.reject(new Error('where not provided'))
    }

    return Model.findOne({
      include,
      where: where.deactivatedAt
        ? where
        : {
            ...where,
            deactivatedAt: null,
          },
    })
  }
}
