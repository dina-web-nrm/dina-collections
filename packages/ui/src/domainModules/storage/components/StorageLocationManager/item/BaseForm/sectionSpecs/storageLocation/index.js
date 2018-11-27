import { recordHistoryEvents } from 'coreModules/form/components/units'
import unitSpecs from '../../unitSpecs'

const {
  // connectedPreparationTypes,
  // connectedTaxa,
  storageLocationRoot,
} = unitSpecs

const units = [
  storageLocationRoot,
  // connectedTaxa,
  // connectedPreparationTypes,
  recordHistoryEvents,
]

export default {
  name: 'storageLocation',
  units,
}
