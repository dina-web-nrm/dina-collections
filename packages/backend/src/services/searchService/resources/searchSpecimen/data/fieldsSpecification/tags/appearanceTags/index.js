const createStringAggregation = require('../../../../../../../../lib/data/aggregations/factories/createStringAggregation')
const {
  createTagMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const {
  createKeywordAndRawMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.appearanceTags'
const key = 'appearanceTags'
const resource = 'appearanceTag'
const aggregationName = 'aggregateAppearanceTags'
const searchFilterName = 'searchAppearanceTags'
const matchFilterName = 'matchAppearanceTags'

const transformation = ({ migrator, src, target }) => {
  const collectingInformation =
    migrator.getValue({
      obj: src,
      path: 'individual.collectingInformation',
    }) || []

  const originInformation =
    migrator.getValue({
      obj: src,
      path: 'individual.originInformation',
    }) || []

  const tags = []

  collectingInformation.forEach(({ establishmentMeansType }) => {
    if (establishmentMeansType) {
      const name = migrator.getValue({
        obj: establishmentMeansType,
        path: 'name.en',
      })
      if (name) {
        tags.push(`${name} (collecting)`)
      }
    }
  })

  originInformation.forEach(({ establishmentMeansType }) => {
    if (establishmentMeansType) {
      const name = migrator.getValue({
        obj: establishmentMeansType,
        path: 'name.en',
      })
      if (name) {
        tags.push(`${name} (origin)`)
      }
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
