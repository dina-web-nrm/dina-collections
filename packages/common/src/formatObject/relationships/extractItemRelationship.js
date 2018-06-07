const objectPath = require('object-path')
const walk = require('../utilities/walkObject')
const createLid = require('../utilities/createLid')

module.exports = function extractItemRelationship({
  item,
  path,
  relationshipFormat,
  relationshipKey,
  relationshipType,
  nestedToCoreSync,
}) {
  let relationshipObject
  let relationshipArray
  if (path) {
    let arrayPath = path
    if (!Array.isArray(path)) {
      arrayPath = [path]
    }

    arrayPath.forEach(pathItem => {
      const segments = pathItem.split('.*.')

      walk({
        func: pth => {
          const relationship = objectPath.get(item, pth)
          if (relationship.id === undefined) {
            relationship.lid = createLid()
          }

          const reference =
            relationship.id !== undefined
              ? {
                  id: relationship.id,
                }
              : {
                  lid: relationship.lid,
                }

          objectPath.set(item, pth, reference)

          const formattedRelationship = nestedToCoreSync
            ? nestedToCoreSync({
                item: relationship,
                normalize: true,
                type: relationshipType,
              })
            : relationship

          if (relationshipFormat === 'object') {
            relationshipObject = formattedRelationship
          } else {
            const exists = (relationshipArray || []).find(({ id }) => {
              return id !== undefined && id === formattedRelationship.id
            })
            if (!exists) {
              if (!relationshipArray) {
                relationshipArray = [formattedRelationship]
              } else {
                relationshipArray.push(formattedRelationship)
              }
            }
          }
        },
        obj: item,
        segments,
      })
    })
  } else {
    if (relationshipFormat === 'object') {
      if (item[relationshipKey] === null) {
        relationshipObject = null
      } else {
        relationshipObject =
          item[relationshipKey] && item[relationshipKey].id
            ? { id: item[relationshipKey].id, type: relationshipType }
            : undefined
      }
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

  if (relationshipFormat === 'object' && relationshipObject !== undefined) {
    objectPath.set(
      item,
      `relationships.${relationshipKey}.data`,
      relationshipObject
    )
  }

  if (relationshipFormat === 'array' && relationshipArray !== undefined) {
    objectPath.set(
      item,
      `relationships.${relationshipKey}.data`,
      relationshipArray
    )
  }

  return item
}
