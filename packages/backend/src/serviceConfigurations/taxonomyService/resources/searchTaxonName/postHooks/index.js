const {
  searchTaxonNameCreateIndexJob,
} = require('../../../serviceInteractions')

const {
  createConsolidateJobsPostHook,
} = require('../../../../../lib/data/hooks')

const consolidateJobsPostHook = createConsolidateJobsPostHook({
  createIndexJob: searchTaxonNameCreateIndexJob,
  rebuildViewOperationId: 'searchTaxonNameRebuildView',
  updateViewOperationId: 'searchTaxonNameUpdateView',
})

exports.rebuildView = [consolidateJobsPostHook]

exports.updateView = [consolidateJobsPostHook]
