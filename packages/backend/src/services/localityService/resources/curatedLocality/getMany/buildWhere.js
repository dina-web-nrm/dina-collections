const backendError404 = require('common/src/error/errorFactories/backendError404')
const { Op } = require('sequelize')

module.exports = function buildWhereFactory({ request, model }) {
  const { queryParams: { filter: { group, parentId, search } = {} } } = request

  const where = {}

  if (group !== undefined) {
    where['document.group'] = group
  }

  if (search !== undefined) {
    where['document.name'] = {
      [Op.like]: `%${search.toLowerCase()}%`,
    }
  }

  if (parentId === undefined) {
    return Promise.resolve(where)
  }

  return model
    .getWhere({
      forceCurrentVersion: false,
      where: {
        id: parentId,
      },
    })
    .then(versions => {
      if (versions.length === 0) {
        backendError404({
          code: 'RESOURCE_NOT_FOUND_ERROR',
          detail: `parent with id: ${parentId} not found`,
        })
      }

      const versionIds = versions.map(version => {
        return version.versionId
      })
      where.parentVersionId = {
        [Op.in]: versionIds,
      }
      return where
    })
}
