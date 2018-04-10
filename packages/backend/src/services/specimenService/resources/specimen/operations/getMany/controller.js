const bodybuilder = require('bodybuilder')
const createArrayResponse = require('../../../../../../lib/controllers/transformations/createArrayResponse')
const transformOutput = require('../../../../../../lib/controllers/transformations/outputObject')
const extractRelationships = require('../../../../../../lib/controllers/relationshipsUtilities/extractRelationships')

module.exports = function getMany({ operation, elasticModels }) {
  const { includeRelations, relations, resource } = operation
  return ({ request }) => {
    const {
      queryParams: {
        limit,
        offset,
        relationships: queryParamRelationships = '',
        filter,
      },
    } = request

    let body = {}
    if (filter && filter.catalogNumber) {
      body = bodybuilder()
        .filter('match', 'identifiers.value', filter.catalogNumber)
        .size(limit)
        .from(offset)
        .build()
    } else {
      body = bodybuilder()
        .size(limit)
        .from(offset)
        .build()
    }

    return elasticModels.specimen.getWhere({ body }).then(items => {
      return createArrayResponse({
        items: items.map(item => {
          const transformedItem = transformOutput(item)
          const relationships =
            includeRelations &&
            extractRelationships({
              fetchedResource: item,
              queryParamRelationships,
              relations,
            })

          return {
            ...transformedItem,
            relationships,
          }
        }),
        type: resource,
      })
    })
  }
}

// const defaultWhereFactory = require('./queryUtilities/defaultWhereFactory')
// const createArrayResponse = require('./transformations/createArrayResponse')
// const transformOutput = require('./transformations/outputObject')
// const buildIncludeArray = require('./relationshipsUtilities/buildIncludeArray')
// const extractRelationships = require('./relationshipsUtilities/extractRelationships')

// module.exports = function getMany({ operation, models }) {
//   const {
//     buildWhere = defaultWhereFactory(),
//     includeRelations,
//     relations,
//     resource,
//   } = operation
//   const model = models[resource]
//   if (!model) {
//     throw new Error(`Model not provided for ${resource}`)
//   }
//   return ({ request }) => {
//     const {
//       queryParams: {
//         limit,
//         offset,
//         relationships: queryParamRelationships = '',
//       },
//     } = request

//     let include
//     if (relations && includeRelations && queryParamRelationships) {
//       include = buildIncludeArray({
//         models,
//         queryParamRelationships,
//         relations,
//       })
//     }

//     return buildWhere({ model, request }).then(where => {
//       return model
//         .getWhere({
//           include,
//           limit,
//           offset,
//           raw: false,
//           where,
//         })
//         .then(items => {
//           return createArrayResponse({
//             items: items.map(item => {
//               const transformedItem = transformOutput(item)
//               const relationships =
//                 includeRelations &&
//                 extractRelationships({
//                   fetchedResource: item,
//                   queryParamRelationships,
//                   relations,
//                 })

//               return {
//                 ...transformedItem,
//                 relationships,
//               }
//             }),
//             type: resource,
//           })
//         })
//     })
//   }
// }
