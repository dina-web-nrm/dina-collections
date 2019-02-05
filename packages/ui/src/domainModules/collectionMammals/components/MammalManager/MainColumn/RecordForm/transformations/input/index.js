import { createSelector } from 'reselect'

import transformFeatureObservations from './transformFeatureObservations'

function transformInput({
  establishmentMeansTypes = [],
  featureTypes = [],
  identifierTypes = [],
  specimen = {},
}) {
  const transformedSpecimen = JSON.parse(JSON.stringify(specimen))

  if (!transformedSpecimen.individual) {
    transformedSpecimen.individual = {}
  }

  if (!transformedSpecimen.individual.determinations) {
    transformedSpecimen.individual.determinations = []
  }

  if (
    !transformedSpecimen.individual.identifiers &&
    identifierTypes.length > 0
  ) {
    const identifierType = identifierTypes.find(({ attributes }) => {
      return attributes && attributes.key === 'catalog-no'
    })

    transformedSpecimen.individual.identifiers = [
      {
        identifierType: {
          id: identifierType.id,
        },
        namespace: '',
        remarks: '',
        value: '',
      },
    ]
  }

  if (!transformedSpecimen.individual.recordHistoryEvents) {
    transformedSpecimen.individual.recordHistoryEvents = []
  }

  if (
    !transformedSpecimen.individual.collectingInformation &&
    establishmentMeansTypes.length > 0
  ) {
    const establishmentMeansType = establishmentMeansTypes.find(
      ({ attributes }) => {
        return attributes && attributes.key === 'wild-and-native'
      }
    )
    transformedSpecimen.individual.collectingInformation = [
      { establishmentMeansType: { id: establishmentMeansType.id } },
    ]
  }

  if (
    !transformedSpecimen.individual.originInformation &&
    establishmentMeansTypes.length > 0
  ) {
    const establishmentMeansType = establishmentMeansTypes.find(
      ({ attributes }) => {
        return attributes && attributes.key === 'unknown'
      }
    )
    transformedSpecimen.individual.originInformation = [
      {
        establishmentMeansType: { id: establishmentMeansType.id },
        isResultOfSelectiveBreeding: 'unknown',
      },
    ]
  }

  transformedSpecimen.individual.featureObservations = transformFeatureObservations(
    {
      featureObservations: transformedSpecimen.individual.featureObservations,
      featureTypes,
    }
  )

  return transformedSpecimen
}

export const getBaseValues = createSelector(
  ({ establishmentMeansTypes }) => establishmentMeansTypes,
  ({ featureTypes }) => featureTypes,
  ({ identifierTypes }) => identifierTypes,
  (establishmentMeansTypes, featureTypes, identifierTypes) => {
    return transformInput({
      establishmentMeansTypes,
      featureTypes,
      identifierTypes,
    })
  }
)

export default transformInput
