const backendError404 = require('common/src/error/errorFactories/backendError404')
const createObjectResponse = require('./transformations/createObjectResponse')
const transformOutput = require('./transformations/outputObject')

module.exports = function getRelationsBelongsToOne({ operation, models }) {
  const {
    resource,
    relation: { key: relationKey, resource: relationResource },
  } = operation

  const model = models[resource]
  const relationModel = models[relationResource]
  if (!model) {
    throw new Error(`Root not provided for ${resource}`)
  }

  if (!relationModel) {
    throw new Error(`Root not provided for ${relationModel}`)
  }
  return ({ request }) => {
    const { pathParams: { id } } = request
    return model
      .getOneWhere({
        include: [
          {
            as: relationKey,
            model: relationModel.Model,
          },
        ],
        raw: false,
        where: { id },
      })
      .then(result => {
        if (!(result && result[relationKey])) {
          backendError404({
            code: 'RESOURCE_NOT_FOUND_ERROR',
            detail: `Cant find relation ${relationKey} for ${resource} id ${
              id
            } `,
          })
        }

        return result[relationKey].dataValues
      })
      .then(transformOutput)
      .then(output => {
        return createObjectResponse({
          data: output,
          id: output.id,
          type: resource,
        })
      })
  }
}
