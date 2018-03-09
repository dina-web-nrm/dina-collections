const backendError400 = require('common/src/error/errorFactories/backendError404')
const createObjectResponse = require('./transformations/createObjectResponse')
const transformOutput = require('./transformations/outputObject')

module.exports = function updateRelationHasOne({ operation, models }) {
  const { relation: { key: relationKey }, resource } = operation

  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }

  const foreignKeyName = `${relationKey}VersionId`

  return ({ request }) => {
    const { body: { data: { id: targetModelId, type } } } = request
    const { pathParams: { id: coreModelId } } = request
    if (!type || type !== relationKey) {
      backendError400({
        code: 'REQUEST_ERROR',
        detail: `Wrong type. ${type} !== ${relationKey}`,
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
  }
}
