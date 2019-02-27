/* eslint-disable no-param-reassign */

/*
example src data
  "recordHistoryEvents": [
    {
      "activity": "Data export",
      "contextSystem": "Mam2006 (Microsoft Access database)",
      "date_timeStamp": "2018-11-15",
      "recordedBy_textI": "The DINA Collections team"
    },
    {
      "activity": "New specimen record",
      "contextSystem": "Mam2006 (Microsoft Access database)",
      "date_timeStamp": "2006-10-12",
      "recordedBy_textI": "MJD"
    },
    {
      "activity": "Last update of specimen record",
      "contextSystem": "Mam2006 (Microsoft Access database)",
      "date_timeStamp": "2016-04-06",
      "recordedBy_textI": "DCK"
    },
    {
      "activity": "New catalog card",
      "contextSystem": "Physical card register",
      "date_timeStamp": "1999-10-12 00:00:00",
      "recordedBy_textI": "Stanczak, Adam"
    },
    {
      "activity": "Data prepared for import into DINA Collections",
      "contextSystem": null,
      "date_timeStamp": "2018-11-15 17:22",
      "recordedBy_textI": "The DINA Collections team"
    }
  ],
*/
module.exports = function migrateRecordHistoryEvents({
  src,
  target,
  migrator,
}) {
  const srcRecordHistoryEvents = migrator.getValue({
    obj: src,
    path: 'migrationData.recordHistoryEvents',
    strip: true,
  })

  if (!srcRecordHistoryEvents) {
    return
  }

  const recordHistoryEvents = srcRecordHistoryEvents.map(
    srcRecordHistoryEvent => {
      const {
        activity: srcActivity,
        contextSystem: srcContextSystem,
        date_timeStamp: srcDateTimeStamp,
        recordedBy_textI: srcRecordedByTextI,
      } = srcRecordHistoryEvent

      const recordHistoryEvent = {}
      if (srcRecordedByTextI) {
        recordHistoryEvent.agent = {
          textI: srcRecordedByTextI,
        }
      }

      if (srcDateTimeStamp) {
        recordHistoryEvent.date = {
          dateText: srcRecordHistoryEvent.date_timeStamp,
        }
      }

      if (srcActivity) {
        recordHistoryEvent.description = srcActivity
      }

      if (srcContextSystem) {
        recordHistoryEvent.system = srcContextSystem
      }

      return recordHistoryEvent
    }
  )

  migrator.setValue({
    obj: target,
    path: 'attributes.individual.recordHistoryEvents',
    value: recordHistoryEvents,
  })
}
