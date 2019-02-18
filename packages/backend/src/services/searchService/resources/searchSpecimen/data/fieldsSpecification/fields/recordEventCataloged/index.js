const getYYYYMMDDFromTimestamp = require('common/src/date/getYYYYMMDDFromTimestamp')

const {
  CATALOG_CARD_CREATION_DESCRIPTION,
} = require('common/src/constants/recordHistoryEvents')

const extractRecordEventText = require('../../utilities/extractRecordEventText')
const {
  createKeywordMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.recordEventCataloged'

const transformation = ({ migrator, src, target }) => {
  const hasRecordHistoryEvents =
    (
      migrator.getValue({
        obj: src,
        path: 'individual.recordHistoryEvents',
      }) || []
    ).length > 0

  const recordEventStrings = extractRecordEventText({
    matchingDescription: CATALOG_CARD_CREATION_DESCRIPTION, // TODO should use enum instead
    migrator,
    src,
  })

  const resourceActivities = migrator.getValue({
    obj: src,
    path: 'resourceActivities',
  })

  if (recordEventStrings && recordEventStrings.length) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: recordEventStrings,
    })
  } else if (
    resourceActivities &&
    resourceActivities.length &&
    // use resourceActivity only if no history events, i.e. record created in
    // DINA-Collections and has no catalog card event
    !hasRecordHistoryEvents
  ) {
    const { srcCreatedAt } = resourceActivities[0]
    const dateText = getYYYYMMDDFromTimestamp(srcCreatedAt)

    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: [dateText],
    })
  }

  return null
}

module.exports = {
  fieldPath,
  key: 'recordEventCataloged',
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
