import { CATALOG_CARD } from '../../../../constants'

export default function transformRecordHistoryEvents(recordHistoryEvents) {
  if (!recordHistoryEvents) {
    return []
  }

  const transformedRecordHistoryEvents = recordHistoryEvents.map(item => {
    if (item.system) {
      return item
    }

    return {
      ...item,
      system: CATALOG_CARD,
    }
  })

  return transformedRecordHistoryEvents
}
