module.exports = function getWhereFactory({ Model }) {
  return function getWhere({ include = [], limit, offset, where } = {}) {
    if (!where) {
      return Promise.reject(new Error('where not provided'))
    }

    const options = {
      include,
      order: [['id', 'DESC']],
      where: where.deactivatedAt
        ? where
        : {
            ...where,
            deactivatedAt: null,
          },
    }

    if (limit) {
      options.limit = limit
    }

    if (offset) {
      options.offset = offset
    }

    return Model.findAll(options)
  }
}
