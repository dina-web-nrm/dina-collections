import unitSpecs from '../../unitSpecs'

const {
  specimenRoot,
  identifiers,
  acquisition,
  recordHistoryEvents,
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
