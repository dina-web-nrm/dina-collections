const objectPath = require('object-path')
const createLog = require('../../../utilities/log')

const capitalizeFirstLetter = require('common/src/stringFormatters/capitalizeFirstLetter')

const log = createLog('services/taxonomyService/serviceInteractions')

const findAndClearTaxonRelationship = ({
  relationshipKey,
  serviceInteractor,
  taxonId,
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
              if (taxonName && taxonName.id) {
                const { id } = taxonName

                return serviceInteractor.call({
                  operationId: `taxonNameUpdateRelationship${capitalizeFirstLetter(
                    relationshipKey
                  )}`,
                  request: {
                    body: {
                      data: null,
                    },
                    pathParams: { id },
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
