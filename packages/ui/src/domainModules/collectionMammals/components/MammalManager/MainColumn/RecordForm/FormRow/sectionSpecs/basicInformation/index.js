import unitSpecs from '../../unitSpecs'

const {
  acquisition,
  identifiers,
  recordHistoryExternalEvents,
  specimenRoot,
} = unitSpecs

const items = [
  {
    items: specimenRoot,
    name: 'specimenRoot',
  },
  {
    items: identifiers,
    name: 'identifiers',
  },
  {
    items: acquisition,
    name: 'acquisition',
  },
  {
    items: recordHistoryExternalEvents,
    name: 'recordHistoryExternalEvents',
  },
]

export default {
  items,
}
