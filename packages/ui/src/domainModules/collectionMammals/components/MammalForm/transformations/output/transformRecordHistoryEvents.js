import { CATALOG_CARD } from '../../../../constants'

export default function transformRecordHistoryEvents(recordHistoryEvents) {
  if (!recordHistoryEvents) {
    return []
  }

  const transformedRecordHistoryEvents = recordHistoryEvents
    .map(item => {
      if (item.system === CATALOG_CARD && !(item.agent || item.date)) {
        return null
      }

      return item
    })
    .filter(item => !!item)

  return transformedRecordHistoryEvents
}
