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

const fieldPath = 'attributes.tags.agentTags'
const key = 'agentTags'
const resource = 'agentTag'
const tagValueAggregationName = 'aggregateAgentTagValues'
const tagTypeAggregationName = 'aggregateAgentTagTypes'
const searchFilterName = 'searchAgentTags'
const matchFilterName = 'matchAgentTags'

const delimiter = 'ddaadd'

const transformation = ({ migrator, src, target }) => {
  const collectingInformation = migrator.getValue({
    obj: src,
    path: 'individual.collectingInformation',
  })

  if (!collectingInformation) {
    return null
  }
  const tags = []

  collectingInformation.forEach(collectingInformationItem => {
    const collectorFullName = migrator.getValue({
      obj: collectingInformationItem,
      path: 'collectedByAgent.normalized.textI',
    })

    if (collectorFullName) {
      const tagType = 'Collector'
      const tagValue = collectorFullName
      tags.push({
        key: `${tagType}${delimiter}${tagValue}`,
        tagType,
        tagValue,
      })
    }
  })
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
