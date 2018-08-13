const createStringAggregation = require('../../../../../../../../lib/data/aggregations/factories/createStringAggregation')
const {
  createStringMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const {
  createKeywordAndRawMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.agentTags'
const key = 'agentTags'
const resource = 'agentTag'
const aggregationName = 'aggregateAgentTags'
const searchFilterName = 'searchAgentTags'
const matchFilterName = 'matchAgentTags'

const transformation = ({ migrator, src, target }) => {
  const collectingInformation = migrator.getValue({
    obj: src,
    path: 'individual.collectingInformation',
  })

  if (!collectingInformation) {
    return null
  }
  const agents = []

  collectingInformation.forEach(collectingInformationItem => {
    const collectorFullName = migrator.getValue({
      obj: collectingInformationItem,
      path: 'collectedByAgent.fullName',
    })

    if (collectorFullName) {
      agents.push(`${collectorFullName} (Collector)`)
    }
  })
  if (agents && agents.length) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: agents,
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
