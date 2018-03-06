const buildRelationship = require('./buildRelationship')
const buildVersionRelationships = require('./buildVersionRelationships')

const buildRelationshipsArray = ({ relations }) => {
  if (!relations || !Object.keys(relations).length) {
    return []
  }

  return Object.keys(relations).map(relationKey => {
    const relation = relations[relationKey]
    return {
      ...relation,
      key: relationKey,
    }
  })
}

module.exports = function buildRelationships(
  { relations: relationsObject, versionsLink } = {}
) {
  const relations = buildRelationshipsArray({
    relations: relationsObject,
  })
  const versionRelationship = buildVersionRelationships({ versionsLink })

  const resourceRelationships = relations.reduce((obj, relation) => {
    return {
      ...obj,
      [relation.key]: buildRelationship(relation),
    }
  }, {})

  if (
    !(
      versionRelationship ||
      (resourceRelationships && Object.keys(resourceRelationships).length)
    )
  ) {
    return undefined
  }

  const relationships = {
    properties: {},
    type: 'object',
  }

  if (versionRelationship) {
    relationships.properties.versions = versionRelationship
  }

  if (resourceRelationships) {
    relationships.properties = {
      ...relationships.properties,
      ...resourceRelationships,
    }
  }

  return relationships
}
