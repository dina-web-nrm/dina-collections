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
      include = buildIncludeArray({ models, relations })
    }
    return model
      .getOneWhere({
        include,
        raw: false,
        where: { id },
      })
      .then(result => {
        if (!result) {
          const error = new Error(
            `Cant find resource: ${resource}, with id: ${id} `
          )
          error.status = 404
          throw error
        }
        const relationships = extractRelationships({
          fetchedResource: result,
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
