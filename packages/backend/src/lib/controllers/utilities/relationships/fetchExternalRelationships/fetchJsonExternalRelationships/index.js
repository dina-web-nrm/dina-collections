const objectPath = require('object-path')

const shouldIncludeRelation = require('../../shouldIncludeRelation')

/* eslint-disable no-param-reassign */
const addItemToData = ({ id, item, map }) => {
  if (Array.isArray(objectPath.get(map, `${id}.data`))) {
    map[id].data.push(item)
  } else {
    map[id] = {
      data: [item],
    }
  }
}

module.exports = function fetchJsonExternalRelationships({
  item: sourceItem,
  items: sourceItems,
  relations,
  resource: sourceResource,
  serviceInteractor,
  queryParamRelationships,
}) {
  const sourceItemId = sourceItem && sourceItem.id
  const sourceItemIds =
    (sourceItemId && [sourceItemId]) ||
    (sourceItems && sourceItems.map(({ id }) => id))
  const filterKey = `${sourceResource}Ids`

  const remoteRequestSpecifications = Object.keys(relations)
    .map(relationKey => {
      const { storeInExternalDocument } = relations[relationKey]

      if (!shouldIncludeRelation({ queryParamRelationships, relationKey })) {
        return null
      }

      if (storeInExternalDocument) {
        const relation = relations[relationKey]
        const {
          oneOrMany,
          inverseTargetAs: inverseRelationshipKey,
          targetResource,
        } = relation

        return {
          inverseRelationshipKey,
          oneOrMany,
          relationKey,
          request: {
            queryParams: {
              filter: {
                [filterKey]: sourceItemIds,
              },
              limit: 10000,
              relationships: inverseRelationshipKey
                ? [inverseRelationshipKey]
                : undefined,
            },
          },
          targetResource,
        }
      }

      return null
    })
    .filter(patchedRelations => {
      return !!patchedRelations
    })

  const getExternalRelationshipsPromises = remoteRequestSpecifications.map(
    ({
      inverseRelationshipKey,
      oneOrMany,
      relationKey,
      request,
      targetResource,
    }) => {
      return serviceInteractor
        .getMany({
          request,
          resource: targetResource,
        })
        .then(({ data: relatedItems }) => {
          const sourceIdRelationshipsMap = {}

          relatedItems.forEach(relatedItem => {
            const mappedRelationshipItem = {
              id: relatedItem.id,
              type: targetResource,
            }

            const sourceItemsRelatedToTarget = objectPath.get(
              relatedItem,
              `relationships.${inverseRelationshipKey}.data`
            )

            if (sourceItemsRelatedToTarget) {
              if (oneOrMany === 'one') {
                sourceIdRelationshipsMap[sourceItemId] = {
                  data: mappedRelationshipItem,
                }
              } else {
                sourceItemsRelatedToTarget.forEach(({ id }) =>
                  addItemToData({
                    id,
                    item: mappedRelationshipItem,
                    map: sourceIdRelationshipsMap,
                  })
                )
              }
            }
          })

          return {
            relationKey,
            sourceIdRelationshipsMap,
          }
        })
    }
  )

  return Promise.all(getExternalRelationshipsPromises).then(resultArray => {
    const sourceIdRelationshipsMaps = resultArray.reduce(
      (maps, { sourceIdRelationshipsMap, relationKey }) => {
        maps[relationKey] = sourceIdRelationshipsMap

        return maps
      },
      {}
    )

    const relationKeys = Object.keys(sourceIdRelationshipsMaps)

    const itemsExternalRelationships = sourceItemIds.map(id => {
      return relationKeys.reduce((relationships, relationKey) => {
        const relationship = objectPath.get(
          sourceIdRelationshipsMaps,
          `${relationKey}.${id}`
        )

        relationships[relationKey] = relationship

        return relationships
      }, {})
    })

    return sourceItem // i.e. only one item, not many
      ? itemsExternalRelationships[0]
      : itemsExternalRelationships
  })
}
