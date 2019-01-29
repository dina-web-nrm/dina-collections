const createStringAggregation = require('../../../../../../../../lib/data/aggregations/factories/createStringAggregation')
const {
  createTagMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const {
  createKeywordAndRawMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.selectiveBreedingTags'
const key = 'selectiveBreedingTags'
const resource = 'selectiveBreedingTag'
const aggregationName = 'aggregateSelectiveBreedingTags'
const searchFilterName = 'searchSelectiveBreedingTags'
const matchFilterName = 'matchSelectiveBreedingTags'

const transformation = ({ migrator, src, target }) => {
  const originInformation =
    migrator.getValue({
      obj: src,
      path: 'individual.originInformation',
    }) || []

  const tags = []

  if (originInformation.length > 0) {
    originInformation.forEach(({ isResultOfSelectiveBreeding }) => {
      if (isResultOfSelectiveBreeding) {
        tags.push(isResultOfSelectiveBreeding)
      }
    })
  } else {
    tags.push('unknown')
  }

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: tags,
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
    [matchFilterName]: createTagMatchFilter({
      fieldPath,
      nested: false,
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
