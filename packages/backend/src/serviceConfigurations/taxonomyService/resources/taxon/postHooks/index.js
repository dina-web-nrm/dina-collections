const {
  createUpdateRelatedSearchSpecimensPostHook,
} = require('../../../../specimenService/serviceInteractions')

const {
  createRegisterResourceActivityHook,
} = require('../../../../historyService/serviceInteractions')

const {
  searchTaxonCreateIndexJob,
  searchTaxonRebuildInProgress,
} = require('../../../serviceInteractions')

const {
  createIndexHook,
  createUpdateDescendantsPostHook,
} = require('../../../../../lib/data/hooks')

const indexHook = createIndexHook({
  createIndexJob: searchTaxonCreateIndexJob,
  rebuildInProgress: searchTaxonRebuildInProgress,
  resource: 'searchTaxon',
})

const { removeTaxonFromTaxonNames } = require('../../../serviceInteractions')

exports.create = [
  indexHook,
  createRegisterResourceActivityHook({
    action: 'create',
    service: 'taxonomyService',
  }),
]

exports.update = [
  indexHook,
  createUpdateDescendantsPostHook({
    createIndexJob: searchTaxonCreateIndexJob,
    limit: 50,
    srcResource: 'taxon',
    targetSearchResource: 'searchTaxon',
  }),
  createRegisterResourceActivityHook({
    action: 'update',
    service: 'taxonomyService',
  }),
  createUpdateRelatedSearchSpecimensPostHook({
    srcResource: 'taxon',
  }),
]

exports.updateInternalRelationship = [
  indexHook,
  createUpdateDescendantsPostHook({
    createIndexJob: searchTaxonCreateIndexJob,
    limit: 50,
    srcResource: 'taxon',
    targetSearchResource: 'searchTaxon',
  }),
  createRegisterResourceActivityHook({
    action: 'update',
    getIdFromPath: true,
    service: 'taxonomyService',
  }),
]

exports.updateExternalRelationship = [
  indexHook,
  createRegisterResourceActivityHook({
    action: 'update',
    getIdFromBody: true,
    service: 'taxonomyService',
  }),
]

exports.del = [
  indexHook,
  createRegisterResourceActivityHook({
    action: 'delete',
    service: 'taxonomyService',
  }),
  removeTaxonFromTaxonNames,
]
