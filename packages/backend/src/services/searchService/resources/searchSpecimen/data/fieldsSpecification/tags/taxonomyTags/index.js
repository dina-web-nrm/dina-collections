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

const fieldPath = 'attributes.tags.taxonomyTags'
const key = 'taxonomyTags'
const resource = 'taxonomyTag'
const tagValueAggregationName = 'aggregateTaxonomyTagValues'
const tagTypeAggregationName = 'aggregateTaxonomyTagTypes'
const searchFilterName = 'searchTaxonomyTags'
const matchFilterName = 'matchTaxonomyTags'

const transformation = ({ migrator, target, locals }) => {
  const { acceptedTaxonNames } = locals
  if (!(acceptedTaxonNames && acceptedTaxonNames.length)) {
    return null
  }

  const tags = acceptedTaxonNames.map(({ attributes: { name, rank } }) => {
    const tagType = rank
    const tagValue = name
    return {
      key: `${tagType}-${tagValue}`,
      tagType,
      tagValue,
    }
  })

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: tags,
  })
  return null
}

module.exports = {
  aggregations: {
    [tagTypeAggregationName]: createTagTypeAggregation({
      fieldPath,
      resource,
    }),
    [tagValueAggregationName]: createTagValueAggregation({
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
