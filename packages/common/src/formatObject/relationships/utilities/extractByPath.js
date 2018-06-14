const objectPath = require('object-path')
const createLid = require('../../../createLid')
const walkObject = require('../../utilities/walkObject')
const { updatePathRelationshipData } = require('./updatePathRelationshipData')

const extractByPath = ({
  item,
  nestedToCoreSync,
  path,
  relationshipFormat,
  relationshipType,
}) => {
  let relationshipObject
  let relationshipArray

  let arrayPath = path
  if (!Array.isArray(path)) {
    arrayPath = [path]
  }

  arrayPath.forEach(pathItem => {
    const segments = pathItem.split('.*.')

    walkObject({
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

        const updatedRelationships = updatePathRelationshipData({
          formattedRelationship,
          relationshipArray,
          relationshipFormat,
          relationshipObject,
        })

        relationshipArray = updatedRelationships.relationshipArray // eslint-disable-line prefer-destructuring
        relationshipObject = updatedRelationships.relationshipObject // eslint-disable-line prefer-destructuring
      },
      obj: item,
      segments,
    })
  })

  if (relationshipArray && relationshipArray.length) {
    relationshipArray = relationshipArray.filter(relationship => {
      return !!relationship
    })
  }

  return {
    relationshipArray,
    relationshipObject,
  }
}
module.exports = { extractByPath }
