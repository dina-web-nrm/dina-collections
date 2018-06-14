const updatePathRelationshipData = ({
  formattedRelationship,
  relationshipArray,
  relationshipFormat,
  relationshipObject,
}) => {
  if (relationshipFormat === 'object') {
    relationshipObject = formattedRelationship // eslint-disable-line no-param-reassign
  } else {
    const exists = (relationshipArray || []).find(({ id }) => {
      return id !== undefined && id === formattedRelationship.id
    })
    if (!exists) {
      if (!relationshipArray) {
        relationshipArray = [formattedRelationship] // eslint-disable-line no-param-reassign
      } else {
        relationshipArray.push(formattedRelationship)
      }
    }
  }

  return {
    relationshipArray,
    relationshipObject,
  }
}

module.exports = { updatePathRelationshipData }
