const { createIndexJob } = require('../../../serviceInteractions')

const {
  createConsolidateJobsPostHook,
} = require('../../../../../lib/data/hooks')

const consolidateJobsPostHook = createConsolidateJobsPostHook({
  createIndexJob,
  rebuildViewOperationId: 'searchStorageLocationRebuildView',
  updateViewOperationId: 'searchStorageLocationUpdateView',
})

exports.rebuildView = [consolidateJobsPostHook]

exports.updateView = [consolidateJobsPostHook]
