const {
  createUpdateRelatedSearchSpecimensPostHook,
} = require('../../../../specimenService/serviceInteractions')

const {
  createRegisterResourceActivityHook,
} = require('../../../../historyService/serviceInteractions')

const {
  createUpdateRelatedSearchTaxonPostHook,
  searchTaxonNameCreateIndexJob,
  searchTaxonNameRebuildInProgress,
  updateRelatedSearchTaxonView,
} = require('../../../serviceInteractions')

const { createIndexHook } = require('../../../../../lib/data/hooks')

const indexHook = createIndexHook({
  createIndexJob: searchTaxonNameCreateIndexJob,
  rebuildInProgress: searchTaxonNameRebuildInProgress,
  resource: 'searchTaxonName',
})

exports.create = [
  indexHook,
  createRegisterResourceActivityHook({
    action: 'create',
    service: 'taxonomyService',
  }),
]

exports.update = [
  indexHook,
  createRegisterResourceActivityHook({
    action: 'update',
    service: 'taxonomyService',
  }),
  createUpdateRelatedSearchSpecimensPostHook({
    srcResource: 'taxonName',
  }),
  createUpdateRelatedSearchTaxonPostHook({
    srcResource: 'taxonName',
  }),
]

exports.updateTaxonRelationship = [updateRelatedSearchTaxonView]

exports.del = [
  createRegisterResourceActivityHook({
    action: 'delete',
    service: 'taxonomyService',
  }),
]
