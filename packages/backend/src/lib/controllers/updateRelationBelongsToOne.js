const backendError404 = require('common/src/error/errorFactories/backendError404')
const backendError400 = require('common/src/error/errorFactories/backendError400')
const createObjectResponse = require('./transformations/createObjectResponse')
const transformOutput = require('./transformations/outputObject')

module.exports = function updateRelationHasOne({ operation, models }) {
  const {
    relation: { key: relationKey, resource: relationResource },
    resource,
  } = operation

  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }

  const relationModel = models[relationResource]
  if (!relationModel) {
    throw new Error(`Relation model not provided for ${relationResource}`)
  }

  const foreignKeyName = `${relationKey}Id`

  return ({ request }) => {
    const { body: { data } } = request
    const { pathParams: { id: coreModelId } } = request

    if (!data) {
      return model
        .update({
          foreignKeyName,
          foreignKeyValue: null,
          id: coreModelId,
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

    const { id: targetModelId, type } = data

    if (!type || type !== relationResource) {
      backendError400({
        code: 'REQUEST_ERROR',
        detail: `Wrong type. ${type} !== ${relationResource}`,
      })
    }

    return relationModel
      .getById({ id: targetModelId, raw: true })
      .then(fetchedRelationResource => {
        if (!fetchedRelationResource) {
          backendError404({
            code: 'RESOURCE_NOT_FOUND_ERROR',
            detail: `Cant find relation resource with id ${targetModelId}`,
          })
        }

        return model
          .update({
            foreignKeyName,
            foreignKeyValue: targetModelId,
            id: coreModelId,
          })
          .then(transformOutput)
          .then(output => {
            return createObjectResponse({
              data: output,
              id: output.id,
              type: resource,
            })
          })
      })
  }
}
