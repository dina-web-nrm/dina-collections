import unitSpecs from '../../unitSpecs'

const {
  acquisition,
  identifiers,
  recordHistoryExternalEvents,
  specimenRoot,
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
