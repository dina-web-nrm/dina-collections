const backendError404 = require('common/src/error/errorFactories/backendError404')
const createArrayResponse = require('./transformations/createArrayResponse')
const buildIncludeArray = require('./relationshipsUtilities/buildIncludeArray')
const extractRelationships = require('./relationshipsUtilities/extractRelationships')

module.exports = function getRelationsHasMany({ operation, models }) {
  const {
    resource,
    relation, // : { key: relationKey, resource: relationResource },
  } = operation

  const { key: relationKey, resource: relationResource } = relation

  const model = models[resource]
  if (!model) {
    throw new Error(`Root not provided for ${resource}`)
  }

  return ({ request }) => {
    const { pathParams: { id } } = request

    const relations = relation && {
      [relationKey]: relation,
    }

    let include
    if (relations) {
      include = buildIncludeArray({
        models,
        queryParamRelationships: relationKey,
        relations,
      })
    }
    return model
      .getOneWhere({
        include,
        raw: false,
        where: { id },
      })
      .then(result => {
        if (!result) {
          backendError404({
            code: 'RESOURCE_NOT_FOUND_ERROR',
            detail: `${resource} with id: ${id} not found`,
          })
        }
        const relationships = extractRelationships({
          fetchedResource: result,
          queryParamRelationships: relationKey,
          relations,
        })
        return relationships[relationKey].data || []
      })
      .then(items => {
        return createArrayResponse({
          items,
          type: relationResource,
        })
      })
  }
}
