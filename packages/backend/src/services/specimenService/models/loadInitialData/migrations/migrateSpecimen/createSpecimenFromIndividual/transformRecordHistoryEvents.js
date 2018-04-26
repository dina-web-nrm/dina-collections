module.exports = function transformRecordHistoryEvents(recordHistoryEvents) {
  if (!recordHistoryEvents) {
    return []
  }

  const transformedRecordHistoryEvents = recordHistoryEvents.map(item => {
    if (item.system) {
      return item
    }

    return {
      ...item,
      system: 'catalogCard',
    }
  })

  return transformedRecordHistoryEvents
}
