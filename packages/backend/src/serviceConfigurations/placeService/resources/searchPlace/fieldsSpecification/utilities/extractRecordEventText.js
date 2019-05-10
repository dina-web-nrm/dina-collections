const objectPath = require('object-path')

const buildYYYYMMDD = require('common/src/date/buildYYYYMMDD')
const getYMDHMSFromTimestamp = require('common/src/date/getYMDHMSFromTimestamp')
const getYYYYMMDDFromTimestamp = require('common/src/date/getYYYYMMDDFromTimestamp')

module.exports = function extractRecordEventText({
  dateOnly = false,
  migrator,
  src,
  matchingDescription, // TODO should use enum instead
  withTime = false,
}) {
  const recordHistoryEvents = migrator.getValue({
    obj: src,
    path: 'individual.recordHistoryEvents',
  })

  if (!recordHistoryEvents) {
    return null
  }

  return recordHistoryEvents
    .map(recordHistoryEvent => {
      const { description } = recordHistoryEvent

      if (
        description &&
        matchingDescription &&
        matchingDescription.indexOf(description) > -1
      ) {
        const timestamp =
          objectPath.get(recordHistoryEvent, 'date.dateText') ||
          objectPath.get(
            recordHistoryEvent,
            'date.startDate.interpretedTimestamp'
          )

        const dateParts = objectPath.get(recordHistoryEvent, 'date.startDate')
        const hasDateParts = !!objectPath.get(
          recordHistoryEvent,
          'date.startDate.year'
        )

        let date

        if (dateOnly) {
          if (withTime) {
            date = timestamp && getYMDHMSFromTimestamp(timestamp)
          } else {
            date =
              (hasDateParts && buildYYYYMMDD(dateParts)) ||
              (timestamp && getYYYYMMDDFromTimestamp(timestamp))
          }
        } else {
          date =
            (hasDateParts && buildYYYYMMDD(dateParts)) ||
            (timestamp && getYYYYMMDDFromTimestamp(timestamp))
        }

        const agentName =
          objectPath.get(recordHistoryEvent, 'agent.normalized.fullName') ||
          objectPath.get(recordHistoryEvent, 'agent.textI') ||
          objectPath.get(recordHistoryEvent, 'agent.textV')

        if (agentName && date && !dateOnly) {
          return `${date} by ${agentName}`
        }

        if (agentName && !dateOnly) {
          return agentName
        }

        if (date) {
          return date
        }
      }

      return null
    })
    .filter(Boolean)
}
