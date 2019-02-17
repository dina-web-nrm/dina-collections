const getYYYYMMDDFromTimestamp = require('common/src/date/getYYYYMMDDFromTimestamp')

const extractRecordEventText = require('../../utilities/extractRecordEventText')

const {
  createKeywordMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.recordEventRegistered'

const MATCHING_DESCRIPTION = 'New specimen record'

const transformation = ({ migrator, src, target }) => {
  const recordEventStrings = extractRecordEventText({
    dateOnly: true,
    matchingDescription: MATCHING_DESCRIPTION,
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
  } else if (resourceActivities && resourceActivities.length) {
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
  key: 'recordEventRegistered',
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
