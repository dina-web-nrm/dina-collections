const backendError404 = require('common/src/error/errorFactories/backendError404')
const { Op } = require('sequelize')
const createArrayResponse = require('../../../lib/controllers/transformations/createArrayResponse')
const transformOutput = require('../../../lib/controllers/transformations/outputArray')

const buildWhere = ({ group, model, parentId, search }) => {
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

module.exports = function curatedLocalityGetWhere({ operation, models }) {
  const { resource } = operation
  return ({ request }) => {
    const {
      queryParams: { filter: { search, group, parentId } = {} },
    } = request
    const model = models[resource]

    return buildWhere({
      group,
      model,
      parentId,
      search,
    }).then(where => {
      return model
        .getWhere({ where })
        .then(transformOutput)
        .then(items => {
          return createArrayResponse({
            items,
            type: resource,
          })
        })
    })
  }
}
