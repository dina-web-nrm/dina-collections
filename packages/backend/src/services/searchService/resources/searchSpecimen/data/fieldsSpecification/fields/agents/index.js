const createStringAggregation = require('../../../../../../../../lib/data/aggregations/factories/createStringAggregation')
const {
  createStringMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const {
  createKeywordMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.agents'
const key = 'agents'

const transformation = ({ migrator, src, target }) => {
  const agents = []
  const collectorFullName = migrator.getValue({
    obj: src,
    path: 'individual.collectingInformation.0.collectedByAgent.fullName',
  })

  if (collectorFullName) {
    agents.push(`${collectorFullName} (Collector)`)
  }

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: agents,
  })
}

module.exports = {
  aggregations: {
    agents: createStringAggregation({
      fieldPath,
      resource: 'specimenAgents',
    }),
  },
  fieldPath,
  filters: {
    matchAgent: createStringMatchFilter({
      fieldPath,
    }),
    searchAgent: createStringSearchFilter({
      fieldPath,
    }),
  },
  key,
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
