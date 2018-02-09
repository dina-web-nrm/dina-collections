import transformIdentifications from './identifications'
import transformFeatureObservations from './featureObservations'
import transformPhysicalUnits from './physicalUnits'
import transformOccurrences from './occurrences'

export default function transformInput(individualGroup = {}) {
  const { id, type, ...rest } = individualGroup
  const attributes = { ...rest }

  const occurrences = transformOccurrences(attributes.occurrences)

  const physicalUnits = transformPhysicalUnits(attributes.physicalUnits)
  const featureObservations = transformFeatureObservations(
    attributes.featureObservations
  )

  const identifications = transformIdentifications(attributes.identifications)

  return {
    ...attributes,
    featureObservations,
    identifications,
    occurrences,
    physicalUnits,
  }
}
