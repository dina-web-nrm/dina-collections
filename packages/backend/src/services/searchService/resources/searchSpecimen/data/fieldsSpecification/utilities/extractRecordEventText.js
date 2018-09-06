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
      const { agent } = recordHistoryEvent
      const date = recordHistoryEvent.date && recordHistoryEvent.date.dateText

      let str
      if (date) {
        str = `${date}`
      }

      if (agent && agent.textV) {
        str = `${str} by ${agent.textV}`
      }

      strings.push(str)
    }
  })
  return strings
}
