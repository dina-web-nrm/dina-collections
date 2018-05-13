module.exports = function createRelationshipIdMap({ relationship, type }) {
  if (type === 'object') {
    const id = relationship && relationship.data && relationship.data.id
    return {
      [id]: true,
    }
  }
  return ((relationship && relationship.data) || []).reduce((map, item) => {
    return {
      ...map,
      [item.id]: true,
    }
  }, {})
}
