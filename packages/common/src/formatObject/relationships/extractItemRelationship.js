const objectPath = require('object-path')
const walk = require('../utilities/walkObject')
const createLid = require('../utilities/createLid')

module.exports = function extractItemRelationship({
  item,
  path,
  relationshipFormat,
  relationshipKey,
  relationshipType,
  nestedToCore,
}) {
  let relationshipObject = null
  let relationshipArray = []
  if (path) {
    const segments = path.split('.*.')

    walk({
      func: pth => {
        const relationship = objectPath.get(item, pth)
        if (relationship.id === undefined) {
          relationship.lid = createLid()
        }

        const referense =
          relationship.id !== undefined
            ? {
                id: relationship.id,
              }
            : {
                lid: relationship.lid,
              }

        objectPath.set(item, pth, referense)

        const formattedRelationship = nestedToCore
          ? nestedToCore({
              item: relationship,
              normalize: true,
              type: relationshipType,
            })
          : relationship

        if (relationshipFormat === 'object') {
          relationshipObject = formattedRelationship
        } else {
          relationshipArray.push(formattedRelationship)
        }
      },
      obj: item,
      segments,
    })
  } else {
    if (relationshipFormat === 'object') {
      relationshipObject =
        item[relationshipKey] && item[relationshipKey].id
          ? { id: item[relationshipKey].id, type: relationshipType }
          : null
    } else if (item[relationshipKey]) {
      relationshipArray = item[relationshipKey]
        .map(arrayItem => {
          return arrayItem && arrayItem.id
            ? { id: arrayItem.id, type: relationshipType }
            : null
        })
        .filter(arrayItem => !!arrayItem)
    }
    delete item[relationshipKey] // eslint-disable-line
  }

  if (relationshipArray && relationshipArray.length) {
    relationshipArray = relationshipArray.filter(relationship => {
      return !!relationship
    })
  }

  if (relationshipFormat === 'object' && relationshipObject) {
    objectPath.set(
      item,
      `relationships.${relationshipKey}.data`,
      relationshipObject
    )
  }

  if (
    relationshipFormat === 'array' &&
    relationshipArray &&
    relationshipArray.length
  ) {
    objectPath.set(
      item,
      `relationships.${relationshipKey}.data`,
      relationshipArray
    )
  }

  return item
}
