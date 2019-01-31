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

const extractAgentProps = ({ agent, migrator }) => {
  if (!agent) {
    return {}
  }

  const props = {}

  const textI = migrator.getValue({
    obj: agent,
    path: 'textI',
  })

  if (textI) {
    props.textI = textI
  }

  const normalizedAgentFullName = migrator.getValue({
    obj: agent,
    path: 'normalized.fullName',
  })

  if (normalizedAgentFullName) {
    props.normalizedAgentFullName = normalizedAgentFullName
  }

  const disambiguatingDescription = migrator.getValue({
    obj: agent,
    path: 'normalized.disambiguatingDescription',
  })

  if (disambiguatingDescription) {
    props.disambiguatingDescription = disambiguatingDescription
  }

  return props
}

const addTags = ({
  tags,
  tagType,
  textI,
  disambiguatingDescription,
  normalizedAgentFullName,
}) => {
  if (textI) {
    const tagValue = textI
    tags.push({
      key: `${tagType}${delimiter}${tagValue}`,
      tagType,
      tagValue,
    })
  }

  if (normalizedAgentFullName) {
    const tagValue = disambiguatingDescription
      ? `${normalizedAgentFullName} (${disambiguatingDescription})`
      : normalizedAgentFullName

    tags.push({
      key: `${tagType}${delimiter}${tagValue}`,
      tagType,
      tagValue,
    })
  }
}

const transformation = ({ migrator, src, target }) => {
  const collectingInformation =
    migrator.getValue({
      obj: src,
      path: 'individual.collectingInformation',
    }) || []

  const tags = []

  collectingInformation.forEach(collectingInformationItem => {
    const {
      textI,
      normalizedAgentFullName,
      disambiguatingDescription,
    } = extractAgentProps({
      agent: collectingInformationItem.collectedByAgent,
      migrator,
    })

    addTags({
      disambiguatingDescription,
      normalizedAgentFullName,
      tags,
      tagType: 'Collector',
      textI,
    })
  })

  const acquisition = migrator.getValue({
    obj: src,
    path: 'individual.acquisition',
  })

  if (acquisition) {
    const {
      textI,
      disambiguatingDescription,
      normalizedAgentFullName,
    } = extractAgentProps({
      agent: acquisition.handedInByAgent,
      migrator,
    })
    addTags({
      disambiguatingDescription,
      normalizedAgentFullName,
      tags,
      tagType: 'Handed in by',
      textI,
    })
  }

  const collectionItems =
    migrator.getValue({
      obj: src,
      path: 'individual.collectionItems',
    }) || []

  collectionItems.forEach(collectionItem => {
    const curatorialAssessments = collectionItem.curatorialAssessments || []
    curatorialAssessments.forEach(curatorialAssessment => {
      const {
        textI,
        normalizedAgentFullName,
        disambiguatingDescription,
      } = extractAgentProps({
        agent: curatorialAssessment && curatorialAssessment.agent,
        migrator,
      })
      addTags({
        disambiguatingDescription,
        normalizedAgentFullName,
        tags,
        tagType: 'Assessed by',
        textI,
      })
    })
  })

  const determinations =
    migrator.getValue({
      obj: src,
      path: 'individual.determinations',
    }) || []

  determinations.forEach(determination => {
    const {
      textI,
      normalizedAgentFullName,
      disambiguatingDescription,
    } = extractAgentProps({
      agent: determination && determination.determinedByAgent,
      migrator,
    })
    addTags({
      disambiguatingDescription,
      normalizedAgentFullName,
      tags,
      tagType: 'Determined by',
      textI,
    })
  })

  const featureObservations =
    migrator.getValue({
      obj: src,
      path: 'individual.featureObservations',
    }) || []

  featureObservations.forEach(featureObservation => {
    const {
      textI,
      normalizedAgentFullName,
      disambiguatingDescription,
    } = extractAgentProps({
      agent: featureObservation && featureObservation.featureObservationAgent,
      migrator,
    })
    addTags({
      disambiguatingDescription,
      normalizedAgentFullName,
      tags,
      tagType: 'Feature observed by',
      textI,
    })
  })

  const recordHistoryEvents =
    migrator.getValue({
      obj: src,
      path: 'individual.recordHistoryEvents',
    }) || []

  recordHistoryEvents.forEach(recordHistoryEvent => {
    const {
      textI,
      normalizedAgentFullName,
      disambiguatingDescription,
    } = extractAgentProps({
      agent: recordHistoryEvent && recordHistoryEvent.agent,
      migrator,
    })
    addTags({
      disambiguatingDescription,
      normalizedAgentFullName,
      tags,
      tagType: 'Record history by',
      textI,
    })
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
