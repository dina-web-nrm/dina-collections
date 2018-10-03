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
]

export default {
  name: 'basicInformation',
  units,
}
