const resolveById = ({ formattedRelationshipItems, id }) => {
  if (id && formattedRelationshipItems) {
    return formattedRelationshipItems.find(candidateItem => {
      return candidateItem && candidateItem.id === id
    })
  }

  return {
    id,
  }
}

module.exports = { resolveById }
