import {
  CATALOG_CARD,
  CATALOG_CARD_CREATION_DESCRIPTION,
} from 'common/es5/constants/recordHistoryEvents'

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
