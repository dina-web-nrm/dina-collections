module.exports = function getWhereFactory({ Model }) {
  return function getWhere(
    {
      forceCurrentVersion = true,
      include = [],
      raw = true,
      where: whereInput,
    } = {}
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
      include,
      order: [['id', 'DESC'], ['versionId', 'DESC']],
      raw,
      where,
    })
  }
}
