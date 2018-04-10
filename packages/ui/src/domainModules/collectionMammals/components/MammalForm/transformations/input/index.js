import denormalizeSpecimen from 'common/es5/normalize/denormalizeSpecimen'
import transformTaxonInformation from './transformTaxonInformation'
import transformFeatureObservations from './transformFeatureObservations'
import transformDistinguishedUnits from './transformDistinguishedUnits'
import transformIdentifiers from './transformIdentifiers'
import transformIndividualCircumstances from './transformIndividualCircumstances'

export default function transformInput({
  denormalize = true,
  distinguishedUnitTypes = {},
  featureTypes = {},
  physicalUnits = {},
  specimen = {},
  storageLocations = {},
}) {
  const { id, type, ...rawSpeciment } = specimen
  const attributes = denormalize
    ? denormalizeSpecimen(rawSpeciment).individual
    : rawSpeciment.individual || {}

  const taxonInformation = transformTaxonInformation(
    attributes.taxonInformation
  )
  const featureObservations = transformFeatureObservations({
    featureObservations: attributes.featureObservations,
    featureTypes,
  })
  const distinguishedUnits = transformDistinguishedUnits({
    distinguishedUnits: attributes.distinguishedUnits,
    distinguishedUnitTypes,
    physicalUnits,
    storageLocations,
  })
  const identifiers = transformIdentifiers(attributes.identifiers)
  const individualCircumstances = transformIndividualCircumstances(
    attributes.individualCircumstances
  )

  return {
    ...attributes,
    distinguishedUnits,
    featureObservations,
    identifiers,
    individualCircumstances,
    taxonInformation,
  }
}
