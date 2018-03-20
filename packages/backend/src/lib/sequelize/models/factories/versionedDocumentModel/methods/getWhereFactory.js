module.exports = function getWhereFactory({ Model }) {
  return function getWhere(
    {
      forceCurrentVersion = true,
      include = [],
      limit,
      offset,
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

    const options = {
      include,
      order: [['id', 'DESC'], ['versionId', 'DESC']],
      raw,
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
