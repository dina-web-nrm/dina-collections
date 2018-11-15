import { recordHistoryEvents } from 'coreModules/form/components/units'
import unitSpecs from '../../unitSpecs'

const {
  specimenRoot,
  identifiers,
  acquisition,
  recordHistoryExternalEvents,
} = unitSpecs

const units = [
  specimenRoot,
  identifiers,
  acquisition,
  recordHistoryExternalEvents,
  recordHistoryEvents,
]

export default {
  name: 'basicInformation',
  units,
}
