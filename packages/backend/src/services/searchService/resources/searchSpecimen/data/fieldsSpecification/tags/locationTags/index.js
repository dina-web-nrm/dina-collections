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

const fieldPath = 'attributes.tags.locationTags'
const key = 'locationTags'
const resource = 'locationTag'
const tagValueAggregationName = 'aggregateLocationTagValues'
const tagTypeAggregationName = 'aggregateLocationTagTypes'
const searchFilterName = 'searchLocationTags'
const matchFilterName = 'matchLocationTags'

const delimiter = 'ddaadd'

const transformation = ({ migrator, target, locals }) => {
  const {
    // collectingPlaces,
    normalizedLocalities,
    originLocalities,
    transcribedLocalities,
  } = locals

  const tags = []

  // if (collectingPlaces) {
  //   collectingPlaces.forEach(({ attributes: { name, group } }) => {
  //     const tagType = group
  //     const tagValue = name
  //     tags.push({
  //       key: `${tagType}${delimiter}${tagValue}`,
  //       tagType,
  //       tagValue,
  //     })
  //   })
  // }

  if (normalizedLocalities) {
    normalizedLocalities.forEach(normalizedLocality => {
      const tagType = 'collecting-interpreted'
      const tagValue = normalizedLocality
      tags.push({
        key: `${tagType}${delimiter}${tagValue}`,
        tagType,
        tagValue,
      })
    })
  }

  if (transcribedLocalities) {
    transcribedLocalities.forEach(transcribedLocality => {
      const tagType = 'collecting-stated'
      const tagValue = transcribedLocality
      tags.push({
        key: `${tagType}${delimiter}${tagValue}`,
        tagType,
        tagValue,
      })
    })
  }

  if (originLocalities) {
    originLocalities.forEach(originLocality => {
      const tagType = 'origin'
      const tagValue = originLocality
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
