import normalizeSpecimen from 'common/es5/normalize/normalizeSpecimen'
import transformTaxonInformation from './transformTaxonInformation'
import transformFeatureObservations from './transformFeatureObservations'
import transformDistinguishedUnits from './transformDistinguishedUnits'
import transformIdentifiers from './transformIdentifiers'
import transformIndividualCircumstances from './transformIndividualCircumstances'

export default function transformOutput(formData, normalize = true) {
  // TODO: set in backend instead
  // if no catalogNumber provided, use this
  const newCatalogNumber = String(
    Math.floor(Math.random() * (999999 - 100001) + 100000)
  )

  const { taxa, taxonInformation } = transformTaxonInformation(
    formData.taxonInformation
  )

  const identifiers = transformIdentifiers(
    formData.identifiers,
    newCatalogNumber
  )

  const { featureObservations, featureTypes } = transformFeatureObservations(
    formData.featureObservations
  )

  const {
    distinguishedUnits,
    distinguishedUnitTypes,
    physicalUnits,
    storageLocations,
  } = transformDistinguishedUnits(formData.distinguishedUnits)

  const {
    curatedLocalities,
    individualCircumstances,
  } = transformIndividualCircumstances(formData.individualCircumstances)

  const individual = {
    ...formData,
    distinguishedUnits,
    featureObservations,
    identifiers,
    individualCircumstances,
    taxonInformation,
  }

  const specimen = normalize
    ? normalizeSpecimen({
        individual,
      })
    : {
        individual,
      }

  return {
    curatedLocalities,
    distinguishedUnitTypes,
    featureTypes,
    physicalUnits,
    specimen,
    storageLocations,
    taxa,
  }
}
