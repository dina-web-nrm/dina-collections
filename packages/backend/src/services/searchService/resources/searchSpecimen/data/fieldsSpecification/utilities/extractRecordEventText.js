module.exports = function extractRecordEventText({
  migrator,
  src,
  matchingDescription, // TODO should use enum instead
}) {
  const recordHistoryEvents = migrator.getValue({
    obj: src,
    path: 'individual.recordHistoryEvents',
  })

  if (!recordHistoryEvents) {
    return null
  }
  const strings = []
  recordHistoryEvents.forEach(recordHistoryEvent => {
    const { description } = recordHistoryEvent
    if (!description) {
      return
    }

    if (matchingDescription && matchingDescription.indexOf(description) > -1) {
      const { agentText } = recordHistoryEvent
      const date = recordHistoryEvent.date && recordHistoryEvent.date.dateText

      let str
      if (date) {
        str = `${date}`
      }

      if (agentText) {
        str = `${str} by ${agentText}`
      }

      strings.push(str)
    }
  })
  return strings
}
