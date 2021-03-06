const objectPath = require('object-path')
const createLog = require('../../../utilities/log')

const capitalizeFirstLetter = require('common/src/stringFormatters/capitalizeFirstLetter')

const log = createLog('services/taxonomyService/serviceInteractions')

const {
  createUpdateRelatedSearchResourcePostHook,
} = require('../../../lib/data/hooks')

const {
  createCreateIndexJob,
  createRebuildInProgress,
  createUpdateRelatedSearchResource,
} = require('../../../lib/data/serviceInteractions')

const findAndClearTaxonRelationship = ({
  relationshipKey,
  serviceInteractor,
  taxonId,
  taxonNameId: taxonNameIdToClear,
}) => {
  log.debug(`clear taxonId: ${taxonId} from taxonNames ${relationshipKey}`)

  return serviceInteractor
    .getMany({
      request: {
        queryParams: {
          filter: {
            [`${relationshipKey}Id`]: `${taxonId}`,
          },
        },
      },
      resource: 'taxonName',
    })
    .then(({ data: taxonNames }) => {
      if (taxonNames && taxonNames.length) {
        return Promise.all(
          taxonNames
            .map(taxonName => {
              const taxonNameId = taxonName && taxonName.id

              if (
                taxonNameId &&
                (!taxonNameIdToClear || taxonNameIdToClear === taxonNameId)
              ) {
                return serviceInteractor.call({
                  operationId: `taxonNameUpdateRelationship${capitalizeFirstLetter(
                    relationshipKey
                  )}`,
                  request: {
                    body: {
                      data: null,
                    },
                    pathParams: { id: taxonNameId },
                  },
                })
              }

              return null
            })
            .filter(promise => !!promise)
        )
      }

      return null
    })
}

exports.removeTaxonFromTaxonNames = ({ item, serviceInteractor }) => {
  const taxonId = objectPath.get(item, 'id')

  if (!taxonId) {
    return null
  }

  return Promise.all([
    findAndClearTaxonRelationship({
      relationshipKey: 'acceptedToTaxon',
      serviceInteractor,
      taxonId,
    }),
    findAndClearTaxonRelationship({
      relationshipKey: 'synonymToTaxon',
      serviceInteractor,
      taxonId,
    }),
  ])
}

exports.removeRelatedTaxonFromTaxonNames = ({ request, serviceInteractor }) => {
  const taxonId = objectPath.get(request, 'body.data.id')
  const taxonNameId = objectPath.get(request, 'pathParams.id')

  if (!taxonId) {
    return null
  }

  return Promise.all([
    findAndClearTaxonRelationship({
      relationshipKey: 'acceptedToTaxon',
      serviceInteractor,
      taxonId,
      taxonNameId,
    }),
    findAndClearTaxonRelationship({
      relationshipKey: 'synonymToTaxon',
      serviceInteractor,
      taxonId,
      taxonNameId,
    }),
  ])
}

exports.searchTaxonRebuildInProgress = createRebuildInProgress({
  operationId: 'searchTaxonGetViewMeta',
})

exports.searchTaxonCreateIndexJob = createCreateIndexJob({
  rebuildViewOperationId: 'searchTaxonRebuildView',
  updateViewOperationId: 'searchTaxonUpdateView',
})

exports.searchTaxonNameRebuildInProgress = createRebuildInProgress({
  operationId: 'searchTaxonNameGetViewMeta',
})
exports.searchTaxonNameCreateIndexJob = createCreateIndexJob({
  rebuildViewOperationId: 'searchTaxonNameRebuildView',
  updateViewOperationId: 'searchTaxonNameUpdateView',
})

exports.updateRelatedSearchTaxonResource = createUpdateRelatedSearchResource({
  createIndexJob: exports.searchTaxonCreateIndexJob,
  limit: 50,
  targetSearchResource: 'searchTaxon',
})

exports.createUpdateRelatedSearchTaxonPostHook = ({ srcResource }) => {
  return createUpdateRelatedSearchResourcePostHook({
    srcResource,
    updateRelatedSearchResource: exports.updateRelatedSearchTaxonResource,
  })
}

exports.updateRelatedSearchTaxonView = ({ request, serviceInteractor }) => {
  const taxonId = objectPath.get(request, 'body.data.id')

  if (!taxonId) {
    return null
  }

  return serviceInteractor
    .updateView({
      request: {
        body: {
          data: {
            attributes: {
              ids: [taxonId],
            },
          },
        },
      },
      resource: 'searchTaxon',
    })
    .then(() => {
      return exports
        .searchTaxonRebuildInProgress({ serviceInteractor })
        .then(inProgress => {
          if (!inProgress) {
            return null
          }
          return exports.searchTaxonCreateIndexJob({
            consolidateJobs: false,
            ids: [taxonId],
            priority: 1,
            serviceInteractor,
          })
        })
    })
}
