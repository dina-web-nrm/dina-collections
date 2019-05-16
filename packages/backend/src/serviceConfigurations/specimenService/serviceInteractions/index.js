const {
  createRebuildInProgress,
  createCreateIndexJob,
  createUpdateRelatedSearchResource,
} = require('../../../lib/data/serviceInteractions')

const {
  createUpdateRelatedSearchResourcePostHook,
} = require('../../../lib/data/hooks')

exports.rebuildInProgress = createRebuildInProgress({
  operationId: 'searchSpecimenGetViewMeta',
})

exports.createIndexJob = createCreateIndexJob({
  rebuildViewOperationId: 'searchSpecimenRebuildView',
  updateViewOperationId: 'searchSpecimenUpdateView',
})

exports.updateRelatedSearchResource = createUpdateRelatedSearchResource({
  createIndexJob: exports.createIndexJob,
  limit: 50,
  targetSearchResource: 'searchSpecimen',
})

exports.createUpdateRelatedSearchSpecimensPostHook = ({ srcResource }) => {
  return createUpdateRelatedSearchResourcePostHook({
    srcResource,
    updateRelatedSearchResource: exports.updateRelatedSearchResource,
  })
}
