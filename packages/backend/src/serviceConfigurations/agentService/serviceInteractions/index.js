const objectPath = require('object-path')
const {
  createRebuildInProgress,
  createCreateIndexJob,
} = require('../../../lib/data/serviceInteractions')

exports.findMatchingAgents = function findMatchingAgents({
  item,
  serviceInteractor,
}) {
  const fullName = objectPath.get(item, 'attributes.fullName')
  const disambiguatingDescription = objectPath.get(
    item,
    'attributes.disambiguatingDescription'
  )

  return serviceInteractor
    .getMany({
      request: {
        queryParams: {
          filter: {
            matchDisambiguatingDescription: disambiguatingDescription,
            matchFullName: fullName,
          },
        },
      },
      resource: 'normalizedAgent',
    })
    .then(({ data: agents }) => {
      return agents
    })
}

exports.rebuildInProgress = createRebuildInProgress({
  operationId: 'searchAgentGetViewMeta',
})
exports.createIndexJob = createCreateIndexJob({
  rebuildViewOperationId: 'searchAgentRebuildView',
  updateViewOperationId: 'searchAgentUpdateView',
})
