import {
  legacyData,
  recordHistoryEvents,
} from 'coreModules/form/components/units'
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
  legacyData,
]

export default {
  name: 'basicInformation',
  units,
}
