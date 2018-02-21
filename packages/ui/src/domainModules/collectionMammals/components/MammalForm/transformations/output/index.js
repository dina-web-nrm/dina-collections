import transformAssignedTaxon from './transformAssignedTaxon'
import transformFeatureObservations from './transformFeatureObservations'
import transformIdentifiableUnits from './transformIdentifiableUnits'
import transformIdentifiers from './transformIdentifiers'
import transformIndividualCircumstances from './transformIndividualCircumstances'

export default function transformOutput(formData) {
  // TODO: set in backend instead
  // if no catalogNumber provided, use this
  const newCatalogNumber = String(
    Math.floor(Math.random() * (999999 - 100001) + 100000)
  )

  const assignedTaxon = transformAssignedTaxon(formData.assignedTaxon)
  const identifiers = transformIdentifiers(
    formData.identifiers,
    newCatalogNumber
  )
  const featureObservations = transformFeatureObservations(
    formData.featureObservations
  )
  const identifiableUnits = transformIdentifiableUnits(
    formData.identifiableUnits
  )
  const individualCircumstances = transformIndividualCircumstances(
    formData.individualCircumstances
  )

  const individualGroup = {
    ...formData,
    assignedTaxon,
    featureObservations,
    identifiableUnits,
    identifiers,
    individualCircumstances,
  }

  return {
    individualGroup,
  }
}
