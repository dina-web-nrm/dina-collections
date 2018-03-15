module.exports = function buildEmptyRelationship(relation = {}) {
  if (relation.format === 'array') {
    return {
      data: [],
    }
  }
  return {
    data: null,
  }
}
