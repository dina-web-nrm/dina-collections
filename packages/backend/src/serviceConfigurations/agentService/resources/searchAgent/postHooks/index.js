const { createIndexJob } = require('../../../serviceInteractions')

const {
  createConsolidateJobsPostHook,
} = require('../../../../../lib/data/hooks')

const consolidateJobsPostHook = createConsolidateJobsPostHook({
  createIndexJob,
  rebuildViewOperationId: 'searchAgentRebuildView',
  updateViewOperationId: 'searchAgentUpdateView',
})

exports.rebuildView = [consolidateJobsPostHook]

exports.updateView = [consolidateJobsPostHook]
