const {
  createRebuildInProgress,
  createCreateIndexJob,
} = require('../../../lib/data/serviceInteractions')

exports.rebuildInProgress = createRebuildInProgress({
  operationId: 'searchStorageLocationGetViewMeta',
})
exports.createIndexJob = createCreateIndexJob({
  rebuildViewOperationId: 'searchStorageLocationRebuildView',
  updateViewOperationId: 'searchStorageLocationUpdateView',
})
