import transformAssignedTaxon from './transformAssignedTaxon'
import transformFeatureObservations from './transformFeatureObservations'
import transformIdentifiableUnits from './transformIdentifiableUnits'
import transformIdentifiers from './transformIdentifiers'
import transformIndividualCircumstances from './transformIndividualCircumstances'

export default function transformInput(individualGroup = {}) {
  const { id, type, ...rest } = individualGroup
  const attributes = { ...rest }

  const assignedTaxon = transformAssignedTaxon(attributes.assignedTaxon)
  const featureObservations = transformFeatureObservations(
    attributes.featureObservations
  )
  const identifiableUnits = transformIdentifiableUnits(
    attributes.identifiableUnits
  )
  const identifiers = transformIdentifiers(attributes.identifiers)
  const individualCircumstances = transformIndividualCircumstances(
    attributes.individualCircumstances
  )

  return {
    ...attributes,
    assignedTaxon,
    featureObservations,
    identifiableUnits,
    identifiers,
    individualCircumstances,
  }
}
