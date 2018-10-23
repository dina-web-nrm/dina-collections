import unitSpecs from '../../unitSpecs'

const {
  physicalObjectsOtherPreparation,
  physicalObjectsRoot,
  physicalObjectsSkeleton,
  physicalObjectsSkin,
  physicalObjectsWetPreparation,
} = unitSpecs

const units = [
  physicalObjectsRoot,
  physicalObjectsSkeleton,
  physicalObjectsSkin,
  physicalObjectsWetPreparation,
  physicalObjectsOtherPreparation,
]

export default {
  name: 'physicalObjects',
  units,
}
