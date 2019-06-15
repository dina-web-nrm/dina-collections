const { searchTaxonCreateIndexJob } = require('../../../serviceInteractions')

const {
  createConsolidateJobsPostHook,
} = require('../../../../../lib/data/hooks')

const consolidateJobsPostHook = createConsolidateJobsPostHook({
  createIndexJob: searchTaxonCreateIndexJob,
  rebuildViewOperationId: 'searchTaxonRebuildView',
  updateViewOperationId: 'searchTaxonUpdateView',
})

exports.rebuildView = [consolidateJobsPostHook]

exports.updateView = [consolidateJobsPostHook]
