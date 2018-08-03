/* eslint-disable no-param-reassign */
const SYSTEM_NAME = 'MAM2006'

module.exports = function createRecordHistoryEvents({ src, target, migrator }) {
  const recordHistoryEvents = []

  const objectsLastModifiedBy = migrator.getValue({
    obj: src,
    path: 'objects.LastModifiedBy',
    strip: true,
  })
  const objectsLastModifiedDate = migrator.getValue({
    obj: src,
    path: 'objects.ModifiedDate',
    strip: true,
  })

  if (objectsLastModifiedBy || objectsLastModifiedDate) {
    recordHistoryEvents.push({
      agentText: objectsLastModifiedBy,
      date: { dateText: objectsLastModifiedDate },
      description: 'Last modification of the objects',
      system: SYSTEM_NAME,
    })
  }

  const registeredBy = migrator.getValue({
    obj: src,
    path: 'objects.Signature',
    strip: true,
  })
  const registeredDate = migrator.getValue({
    obj: src,
    path: 'objects.RegDate',
    strip: true,
  })

  if (registeredBy || registeredDate) {
    recordHistoryEvents.push({
      agentText: registeredBy,
      date: { dateText: registeredDate },
      description: 'Registration of the specimen',
      system: SYSTEM_NAME,
    })
  }
  const localityLastModifiedBy = migrator.getValue({
    obj: src,
    path: 'objects.FieldNo_related.LastModifiedBy',
    strip: true,
  })
  const localityLastModifiedAt = migrator.getValue({
    obj: src,
    path: 'objects.FieldNo_related.LastModifiedDate',
    strip: true,
  })

  if (localityLastModifiedBy || localityLastModifiedAt) {
    recordHistoryEvents.push({
      agentText: localityLastModifiedBy,
      date: { dateText: localityLastModifiedAt },
      description: 'Last modification of locality information',
      system: SYSTEM_NAME,
    })
  }

  migrator.setValue({
    obj: target,
    path: 'attributes.individual.recordHistoryEvents',
    value: recordHistoryEvents,
  })
}
