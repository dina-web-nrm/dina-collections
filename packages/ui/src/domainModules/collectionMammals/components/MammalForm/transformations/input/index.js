import transformTaxonInformation from './transformTaxonInformation'
import transformFeatureObservations from './transformFeatureObservations'
import transformDistinguishedUnits from './transformDistinguishedUnits'
import transformIdentifiers from './transformIdentifiers'
import transformIndividualCircumstances from './transformIndividualCircumstances'

export default function transformInput({
  featureObservationTypes = {},
  individualGroup = {},
  physicalUnits = {},
}) {
  const { id, type, ...rest } = individualGroup
  const attributes = { ...rest }

  const taxonInformation = transformTaxonInformation(
    attributes.taxonInformation
  )
  const featureObservations = transformFeatureObservations({
    featureObservations: attributes.featureObservations,
    featureObservationTypes,
  })
  const distinguishedUnits = transformDistinguishedUnits({
    distinguishedUnits: attributes.distinguishedUnits,
    physicalUnits,
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
