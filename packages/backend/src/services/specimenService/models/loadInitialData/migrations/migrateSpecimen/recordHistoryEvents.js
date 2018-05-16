const { SYSTEM_NAME } = require('../constants')

module.exports = function createRecordHistoryEvents({ migrator }) {
  const recordHistoryEvents = []

  const objectsLastModifiedBy = migrator.getValue({
    path: 'src.objects.LastModifiedBy',
  })
  const objectsLastModifiedDate = migrator.getValue({
    path: 'src.objects.ModifiedDate',
  })

  if (objectsLastModifiedBy || objectsLastModifiedDate) {
    recordHistoryEvents.push({
      agent: objectsLastModifiedBy,
      date: { dateText: objectsLastModifiedDate },
      description: 'Last modification of the objects',
      system: SYSTEM_NAME,
    })
  }

  const registeredBy = migrator.getValue({
    path: 'src.objects.Signature',
  })
  const registeredDate = migrator.getValue({
    path: 'src.objects.RegDate',
  })

  if (registeredBy || registeredDate) {
    recordHistoryEvents.push({
      agent: registeredBy,
      date: { dateText: registeredDate },
      description: 'Registration of the specimen',
      system: SYSTEM_NAME,
    })
  }

  const localityLastModifiedBy = migrator.getValue({
    path: 'src.objects.FieldNo_related.LastModifiedBy',
  })
  const localityLastModifiedAt = migrator.getValue({
    path: 'src.objects.FieldNo_related.LastModifiedDate',
  })

  if (localityLastModifiedBy || localityLastModifiedAt) {
    recordHistoryEvents.push({
      agent: localityLastModifiedBy,
      date: { dateText: localityLastModifiedAt },
      description: 'Last modification of locality information',
      system: SYSTEM_NAME,
    })
  }

  migrator.setValue({
    path: 'target.individual.recordHistoryEvents',
    value: recordHistoryEvents,
  })
}
