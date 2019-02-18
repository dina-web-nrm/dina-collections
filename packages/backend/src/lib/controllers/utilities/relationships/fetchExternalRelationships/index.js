const fetchJsonExternalRelationships = require('./fetchJsonExternalRelationships')
const fetchPolymorphicExternalRelationships = require('./fetchPolymorphicExternalRelationships')

module.exports = function getRelationship(input = {}) {
  return Promise.all([
    fetchJsonExternalRelationships(input),
    fetchPolymorphicExternalRelationships(input),
  ]).then(([jsonExternalRelationships, polymorphicExternalRelationships]) => {
    const { items } = input

    let mergedExternalRelationships

    if (items) {
      mergedExternalRelationships = jsonExternalRelationships.map(
        (jsonRelationships, index) => {
          return {
            ...jsonRelationships,
            ...polymorphicExternalRelationships[index],
          }
        }
      )
    } else {
      mergedExternalRelationships = {
        ...jsonExternalRelationships,
        ...polymorphicExternalRelationships,
      }
    }

    return mergedExternalRelationships
  })
}
