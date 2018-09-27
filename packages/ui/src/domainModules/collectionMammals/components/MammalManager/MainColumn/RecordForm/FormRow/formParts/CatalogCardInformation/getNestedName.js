import { CATALOG_CARD_CREATION_DESCRIPTION } from 'domainModules/collectionMammals/constants'

const getNestedName = ({ formValueSelector, state, name }) => {
  const recordHistoryEvents = formValueSelector(state, name)
  if (!recordHistoryEvents || !recordHistoryEvents.length) {
    return `${name}.0`
  }

  const catalogCardCreationEventIndex = recordHistoryEvents.findIndex(
    ({ description }) => description === CATALOG_CARD_CREATION_DESCRIPTION
  )

  return `${name}.${
    catalogCardCreationEventIndex === -1
      ? recordHistoryEvents.length
      : catalogCardCreationEventIndex
  }`
}

export default getNestedName
