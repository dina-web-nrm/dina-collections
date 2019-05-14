const {
  createRebuildInProgress,
  createCreateIndexJob,
} = require('../../../lib/data/serviceInteractions')

exports.rebuildInProgress = createRebuildInProgress({
  operationId: 'searchPlaceGetViewMeta',
})
exports.createIndexJob = createCreateIndexJob({
  rebuildViewOperationId: 'searchPlaceRebuildView',
  updateViewOperationId: 'searchPlaceUpdateView',
})
