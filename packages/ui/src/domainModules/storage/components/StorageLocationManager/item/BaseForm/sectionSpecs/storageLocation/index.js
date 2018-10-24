import unitSpecs from '../../unitSpecs'

const {
  connectedPreparationTypes,
  connectedTaxa,
  storageLocationRoot,
} = unitSpecs

const units = [storageLocationRoot, connectedTaxa, connectedPreparationTypes]

export default {
  name: 'storageLocation',
  units,
}
