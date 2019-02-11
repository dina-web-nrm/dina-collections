const objectPath = require('object-path')

const {
  createTagValueAggregation,
  createTagTypeAggregation,
} = require('../../../../../../../../lib/data/aggregations/factories')
const {
  createTagMatchFilter,
  createTagSearchFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const {
  createValueTagMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.higherGeographyTags'
const key = 'higherGeographyTags'
const resource = 'higherGeographyTag'
const tagValueAggregationName = 'aggregateHigherGeographyTagValues'
const tagTypeAggregationName = 'aggregateHigherGeographyTagTypes'
const searchFilterName = 'searchHigherGeographyTags'
const matchFilterName = 'matchHigherGeographyTags'

const delimiter = 'ddaadd'

const extractText = nestedItem => {
  if (!nestedItem) {
    return ''
  }

  const { name, group, parent } = nestedItem
  if (!parent) {
    return `${name} [${group}]`
  }

  return `${name} [${group} in ${parent.name}]`
}
const transformation = ({ migrator, target, locals }) => {
  const { collectingPlaces, collectingPlacesMap } = locals

  const tags = []

  if (collectingPlaces) {
    collectingPlaces.forEach(place => {
      const parentId = objectPath.get(place, 'relationships.parent.data.id')
      const parentName = parentId
        ? objectPath.get(collectingPlacesMap, `${parentId}.attributes.name`)
        : undefined

      const { name, group } = place.attributes
      const tagType = group
      const tagValue = extractText({
        group,
        name,
        parent: { name: parentName },
      })

      tags.push({
        key: `${tagType}${delimiter}${tagValue}`,
        tagType,
        tagValue,
      })
    })
  }

  if (tags && tags.length) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: tags,
    })
  }

  return null
}

module.exports = {
  aggregations: {
    [tagTypeAggregationName]: createTagTypeAggregation({
      fieldPath,
      resource,
    }),
    [tagValueAggregationName]: createTagValueAggregation({
      delimiter,
      fieldPath,
      resource,
    }),
  },
  fieldPath,
  filters: {
    [matchFilterName]: createTagMatchFilter({
      fieldPath,
    }),
    [searchFilterName]: createTagSearchFilter({
      fieldPath,
    }),
  },
  key,
  mapping: createValueTagMapping({
    fieldPath,
  }),
  selectable: true,
  transformation,
}
