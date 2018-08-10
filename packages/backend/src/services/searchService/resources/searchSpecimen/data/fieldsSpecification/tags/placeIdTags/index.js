const createStringAggregation = require('../../../../../../../../lib/data/aggregations/factories/createStringAggregation')
const {
  createStringMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const {
  createKeywordAndRawMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.placeIdTags'
const key = 'placeIdTags'
const resource = 'placeIdTag'
const aggregationName = 'aggregatePlaceIdTags'
const searchFilterName = 'searchPlaceIdTags'
const matchFilterName = 'matchPlaceIdTags'

const transformation = ({ migrator, target, locals }) => {
  const { collectingPlaces } = locals

  const tags = []

  if (collectingPlaces) {
    collectingPlaces.forEach(({ id }) => {
      tags.push(id)
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
