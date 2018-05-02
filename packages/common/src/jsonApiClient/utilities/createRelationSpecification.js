const immutable = require('object-path-immutable')
const objectPath = require('object-path')

module.exports = function createRelationSpecification(queryParams) {
  const { relationships = [], include = [] } = queryParams
  let specification = {}

  relationships.forEach(relationshipPath => {
    specification = immutable.set(specification, relationshipPath, false)
  })

  include.forEach(includePath => {
    const node = objectPath.get(specification, includePath)
    if (node === undefined && !relationships.includes('all')) {
      throw new Error('Cant include resource not specificed in relationships')
    }
    specification = immutable.set(specification, includePath, true)
  })
  return specification
}
