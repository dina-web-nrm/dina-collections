/* eslint-disable no-param-reassign */
const CATALOG_CARD_SYSTEM_NAME = 'Catalog card'
const MAM_2006_SYSTEM_NAME = 'mam2006'

const CATALOG_CARD_CREATION_DESCRIPTION = 'Creation of catalog card'
const SPECIMEN_CREATION_DESCRIPTION = 'Creation of specimen record'
const LAST_MODIFICATION_OF_OBJECTS_DESCRIPTION =
  'Last modification of the objects'
const LAST_MODIFICATION_OF_LOCALITY_DESCRIPTION =
  'Last modification of locality information'

module.exports = function createRecordHistoryEvents({ src, target, migrator }) {
  const recordHistoryEvents = []

  const cardDate = migrator.getValue({
    obj: src,
    path: 'objects.CardDate',
    strip: true,
  })

  const cardAuthor = migrator.getValue({
    obj: src,
    path: 'objects.CardAuthor',
    strip: true,
  })

  if (cardDate || cardAuthor) {
    recordHistoryEvents.push({
      agent: { textI: cardAuthor },
      date: { dateText: cardDate },
      description: CATALOG_CARD_CREATION_DESCRIPTION,
      system: CATALOG_CARD_SYSTEM_NAME,
    })
  }

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
      agent: { textI: objectsLastModifiedBy },
      date: { dateText: objectsLastModifiedDate },
      description: LAST_MODIFICATION_OF_OBJECTS_DESCRIPTION,
      system: MAM_2006_SYSTEM_NAME,
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
      agent: { textI: registeredBy },
      date: { dateText: registeredDate },
      description: SPECIMEN_CREATION_DESCRIPTION,
      system: MAM_2006_SYSTEM_NAME,
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
      agent: { textI: localityLastModifiedBy },
      date: { dateText: localityLastModifiedAt },
      description: LAST_MODIFICATION_OF_LOCALITY_DESCRIPTION,
      system: MAM_2006_SYSTEM_NAME,
    })
  }

  migrator.setValue({
    obj: target,
    path: 'attributes.individual.recordHistoryEvents',
    value: recordHistoryEvents,
  })
}
