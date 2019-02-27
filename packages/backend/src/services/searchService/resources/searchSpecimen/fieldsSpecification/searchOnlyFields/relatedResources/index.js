const objectPath = require('object-path')
const {
  createNestedMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.searchOnlyFields.relatedResources'
const key = 'relatedResources'
const filterName = 'relatedResources'

const relationshipKeysToExtractFromCoreRelationships = [
  'normalizedAgents',
  'taxonNames',
]

const relationshipFilter = {
  description: `Filter based on relatedResources`,
  elasticsearch: ({ type, id }) => {
    const typePath = `${fieldPath}.type`
    const idPath = `${fieldPath}.id`
    const filter = {
      nested: {
        path: fieldPath,
        query: {
          bool: {
            must: [
              {
                term: { [`${typePath}`]: type.toLowerCase() },
              },
              {
                term: { [`${idPath}`]: id },
              },
            ],
          },
        },
      },
    }
    return filter
  },
  inputSchema: {
    type: 'object',
  },
}

const transformation = ({ migrator, src, target, locals }) => {
  const {
    acceptedTaxonNames = [],
    collectingPlaces = [],
    storageLocations = [],
  } = locals
  const relationships = []
  Object.keys(src.coreRelationships || {}).forEach(relationshipKey => {
    if (
      relationshipKeysToExtractFromCoreRelationships.includes(relationshipKey)
    ) {
      const relationshipData = src.coreRelationships[relationshipKey].data
      if (Array.isArray(relationshipData)) {
        relationshipData.forEach(({ id, type }) => {
          relationships.push({
            id,
            type,
          })
        })
      } else if (relationshipData) {
        relationships.push({
          id: relationshipData.id,
          type: relationshipData.type,
        })
      }
    }
  })

  storageLocations.forEach(storageLocation => {
    relationships.push({
      id: storageLocation.id,
      type: 'storageLocation',
    })
  })

  collectingPlaces.forEach(place => {
    relationships.push({
      id: place.id,
      type: 'place',
    })
  })

  acceptedTaxonNames.forEach(acceptedTaxonName => {
    relationships.push({
      id: acceptedTaxonName.id,
      type: acceptedTaxonName.type,
    })
    const taxonId = objectPath.get(
      acceptedTaxonName,
      'relationships.acceptedToTaxon.data.id'
    )

    if (taxonId) {
      relationships.push({
        id: taxonId,
        type: 'taxon',
      })
    }
  })

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: relationships,
  })

  return null
}

module.exports = {
  fieldPath,
  filters: {
    [filterName]: relationshipFilter,
  },
  key,
  mapping: createNestedMapping({
    fieldPath,
    innerMapping: {
      properties: {
        id: {
          type: 'keyword',
        },
        type: {
          type: 'keyword',
        },
      },
    },
  }),
  selectable: true,
  transformation,
}
