module.exports = function shouldIncludeRelation(
  { queryParamRelationships = [], relationKey } = {}
) {
  return (
    queryParamRelationships.includes(relationKey) ||
    queryParamRelationships.includes('all')
  )
}
