import transformTaxonInformation from './transformTaxonInformation'
import transformFeatureObservations from './transformFeatureObservations'
import transformDistinguishedUnits from './transformDistinguishedUnits'
import transformIdentifiers from './transformIdentifiers'
import transformIndividualCircumstances from './transformIndividualCircumstances'

export default function transformOutput(formData) {
  // TODO: set in backend instead
  // if no catalogNumber provided, use this
  const newCatalogNumber = String(
    Math.floor(Math.random() * (999999 - 100001) + 100000)
  )

  const taxonInformation = transformTaxonInformation(formData.taxonInformation)
  const identifiers = transformIdentifiers(
    formData.identifiers,
    newCatalogNumber
  )
  const featureObservations = transformFeatureObservations(
    formData.featureObservations
  )
  const distinguishedUnits = transformDistinguishedUnits(
    formData.distinguishedUnits
  )
  const individualCircumstances = transformIndividualCircumstances(
    formData.individualCircumstances
  )

  const individualGroup = {
    ...formData,
    distinguishedUnits,
    featureObservations,
    identifiers,
    individualCircumstances,
    taxonInformation,
  }

  return {
    individualGroup,
  }
}
