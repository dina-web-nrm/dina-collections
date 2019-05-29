const {
  createUpdateRelatedSearchSpecimensPostHook,
} = require('../../../../specimenService/serviceInteractions')

const {
  createRegisterResourceActivityHook,
} = require('../../../../historyService/serviceInteractions')

const {
  createIndexJob,
  rebuildInProgress,
} = require('../../../serviceInteractions')

const { createIndexHook } = require('../../../../../lib/data/hooks')

const indexHook = createIndexHook({
  createIndexJob,
  rebuildInProgress,
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
]

exports.del = [
  createRegisterResourceActivityHook({
    action: 'delete',
    service: 'taxonomyService',
  }),
]
