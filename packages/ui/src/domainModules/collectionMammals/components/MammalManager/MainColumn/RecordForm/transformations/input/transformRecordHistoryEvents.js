import {
  CATALOG_CARD,
  CATALOG_CARD_CREATION_DESCRIPTION,
} from 'domainModules/collectionMammals/constants'

export default function transformRecordHistoryEvents(recordHistoryEvents = []) {
  const catalogCardExist = recordHistoryEvents.find(({ system }) => {
    return system === CATALOG_CARD
  })

  if (!catalogCardExist) {
    return [
      ...recordHistoryEvents,

      {
        description: CATALOG_CARD_CREATION_DESCRIPTION,
        system: CATALOG_CARD,
      },
    ]
  }
  return recordHistoryEvents
}
