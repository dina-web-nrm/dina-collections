import { recordHistoryEvents } from 'coreModules/form/components/units'
import unitSpecs from '../../unitSpecs'

const { storageLocationRoot } = unitSpecs

const units = [storageLocationRoot, recordHistoryEvents]

export default {
  name: 'storageLocation',
  units,
}
