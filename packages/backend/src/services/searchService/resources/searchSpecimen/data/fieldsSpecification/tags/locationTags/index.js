const createStringAggregation = require('../../../../../../../../lib/data/aggregations/factories/createStringAggregation')
const {
  createStringMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const {
  createKeywordAndRawMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.locationTags'
const key = 'locationTags'
const resource = 'locationTag'
const aggregationName = 'aggregateLocationTags'
const searchFilterName = 'searchLocationTags'
const matchFilterName = 'matchLocationTags'

const transformation = ({ migrator, target, locals }) => {
  const {
    collectingPlaces,
    normalizedLocalities,
    originLocalities,
    transcribedLocalities,
  } = locals

  const tags = []

  if (collectingPlaces) {
    collectingPlaces.forEach(({ attributes: { name, group } }) => {
      tags.push(`${name} (${group})`)
    })
  }

  if (normalizedLocalities) {
    normalizedLocalities.forEach(normalizedLocality => {
      tags.push(`${normalizedLocality} (normalized)`)
    })
  }

  if (transcribedLocalities) {
    transcribedLocalities.forEach(transcribedLocality => {
      tags.push(`${transcribedLocality} (transcribed)`)
    })
  }

  if (originLocalities) {
    originLocalities.forEach(originLocality => {
      tags.push(`${originLocality} (origin)`)
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
