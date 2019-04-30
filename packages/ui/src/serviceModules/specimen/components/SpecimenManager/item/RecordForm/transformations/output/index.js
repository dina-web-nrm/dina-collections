import objectPath from 'object-path'
import { isEmpty } from 'lodash'

import transformFeatureObservations from './transformFeatureObservations'
import transformOriginInformation from './transformOriginInformation'

export default function transformOutput({
  establishmentMeansTypes,
  specimen = {},
}) {
  const transformedSpecimen = JSON.parse(JSON.stringify(specimen))

  if (!transformedSpecimen.individual) {
    transformedSpecimen.individual = {}
  }

  const determinations = objectPath.get(
    transformedSpecimen,
    'individual.determinations'
  )

  if (determinations && determinations.length) {
    transformedSpecimen.individual.determinations = determinations
      .map(determination => {
        const patchedDetermination = { ...determination }
        delete patchedDetermination.key
        return patchedDetermination
      })
      .filter(determination => !isEmpty(determination))
  }

  const identifiers = objectPath.get(
    transformedSpecimen,
    'individual.identifiers'
  )

  if (identifiers && identifiers.length) {
    transformedSpecimen.individual.identifiers = identifiers.filter(
      ({ value }) => !!value
    )
  }

  const customTaxonNames = objectPath.get(
    transformedSpecimen,
    'individual.taxonInformation.customTaxonNames'
  )

  if (customTaxonNames && customTaxonNames.length) {
    transformedSpecimen.individual.taxonInformation.customTaxonNames = customTaxonNames.filter(
      ({ value }) => !!value
    )
  }

  if (transformedSpecimen.individual.featureObservations) {
    transformedSpecimen.individual.featureObservations = transformFeatureObservations(
      transformedSpecimen.individual.featureObservations
    )
  }

  if (transformedSpecimen.individual.originInformation) {
    transformedSpecimen.individual.originInformation = transformOriginInformation(
      establishmentMeansTypes,
      transformedSpecimen.individual
    )
    if (transformedSpecimen.individual.originInformation.length === 0) {
      delete transformedSpecimen.individual.originInformation
    }
  }

  return transformedSpecimen
}
