const Sequelize = require('sequelize')

const { Op } = Sequelize

const hasDeactivatedAtFilter = where => {
  if (where.deactivatedAt !== undefined) {
    return true
  }

  if (!where[Op.and]) {
    return false
  }
  return where[Op.and].find(filter => {
    return filter.deactivatedAt !== undefined
  })
}

module.exports = function getWhereFactory({ Model }) {
  return function getWhere(
    { include = [], limit, offset, where: whereInput } = {}
  ) {
    if (!whereInput) {
      return Promise.reject(new Error('where not provided'))
    }
    // This is not great
    const where = hasDeactivatedAtFilter(whereInput)
      ? whereInput
      : {
          ...whereInput,
          deactivatedAt: null,
        }

    const options = {
      include,
      order: [['id', 'DESC']],
      where,
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
