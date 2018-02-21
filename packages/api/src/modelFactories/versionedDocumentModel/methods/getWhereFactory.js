module.exports = function getWhereFactory({ Model }) {
  return function getWhere(
    { where: whereInput, forceCurrentVersion = true } = {}
  ) {
    if (!whereInput) {
      return Promise.reject(new Error('where not provided'))
    }

    const where = forceCurrentVersion
      ? {
          ...whereInput,
          isCurrentVersion: true,
        }
      : whereInput

    return Model.findAll({
      raw: true,
      where,
    })
  }
}
