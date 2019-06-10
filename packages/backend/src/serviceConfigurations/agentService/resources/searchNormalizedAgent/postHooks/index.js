const { createIndexJob } = require('../../../serviceInteractions')

const {
  createConsolidateJobsPostHook,
} = require('../../../../../lib/data/hooks')

const consolidateJobsPostHook = createConsolidateJobsPostHook({
  createIndexJob,
  rebuildViewOperationId: 'searchNormalizedAgentRebuildView',
  updateViewOperationId: 'searchNormalizedAgentUpdateView',
})

exports.rebuildView = [consolidateJobsPostHook]

exports.updateView = [consolidateJobsPostHook]
