import { CATALOG_CARD, CATALOG_CARD_DESCRIPTION } from '../../../../constants'

export default function transformRecordHistoryEvents(recordHistoryEvents = []) {
  const catalogCardExist = recordHistoryEvents.find(({ system }) => {
    return system === CATALOG_CARD
  })

  if (!catalogCardExist) {
    return [
      ...recordHistoryEvents,

      {
        description: CATALOG_CARD_DESCRIPTION,
        system: CATALOG_CARD,
      },
    ]
  }
  return recordHistoryEvents
}
