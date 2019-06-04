const { createIndexJob } = require('../../../serviceInteractions')

const {
  createConsolidateJobsPostHook,
} = require('../../../../../lib/data/hooks')

const consolidateJobsPostHook = createConsolidateJobsPostHook({
  createIndexJob,
  rebuildViewOperationId: 'searchTaxonRebuildView',
  updateViewOperationId: 'searchTaxonUpdateView',
})

exports.rebuildView = [consolidateJobsPostHook]

exports.updateView = [consolidateJobsPostHook]
