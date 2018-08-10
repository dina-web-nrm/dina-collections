const createStringAggregation = require('../../../../../../../../lib/data/aggregations/factories/createStringAggregation')
const {
  createStringMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const {
  createKeywordAndRawMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.taxonomyTags'
const key = 'taxonomyTags'
const resource = 'taxonomyTag'
const aggregationName = 'aggregateTaxonomyTags'
const searchFilterName = 'searchTaxonomyTags'
const matchFilterName = 'matchTaxonomyTags'

const transformation = ({ migrator, target, locals }) => {
  const { acceptedTaxonNames } = locals
  if (!(acceptedTaxonNames && acceptedTaxonNames.length)) {
    return null
  }

  const taxonNames = acceptedTaxonNames.map(
    ({ attributes: { name, rank } }) => {
      return `${name} (${rank})`
    }
  )

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: taxonNames,
  })
  return null
}

module.exports = {
  aggregations: {
    [aggregationName]: createStringAggregation({
      fieldPath,
      resource,
    }),
  },
  fieldPath,
  filters: {
    [matchFilterName]: createStringMatchFilter({
      fieldPath,
    }),
    [searchFilterName]: createStringSearchFilter({
      fieldPath,
    }),
  },
  key,
  mapping: createKeywordAndRawMapping({
    fieldPath,
  }),
  selectable: true,
  transformation,
}
