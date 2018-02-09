import transformCatalogedUnit from './catalogedUnit'
import transformFeatureObservations from './featureObservations'
import transformIdentifications from './identifications'
import transformOccurrences from './occurrences'
import transformPhysicalUnits from './physicalUnits'

export default function transformOutput(formData) {
  // TODO: set in backend instead
  // if no catalogNumber provided, use this
  const newCatalogNumber = String(
    Math.floor(Math.random() * (999999 - 100001) + 100000)
  )

  const catalogedUnit = transformCatalogedUnit(
    formData.physicalUnits[0].catalogedUnit,
    newCatalogNumber
  )
  const occurrences = transformOccurrences(formData.occurrences)
  const featureObservations = transformFeatureObservations(
    formData.featureObservations
  )
  const identifications = transformIdentifications(formData.identifications)
  const physicalUnits = transformPhysicalUnits(
    formData.physicalUnits,
    newCatalogNumber
  )

  const individualGroup = {
    ...formData,
    featureObservations,
    identifications,
    occurrences,
    physicalUnits,
  }

  return {
    catalogedUnit,
    individualGroup,
  }
}
