const getYMDHMSFromTimestamp = require('common/src/date/getYMDHMSFromTimestamp')

const extractRecordEventText = require('../../utilities/extractRecordEventText')

const {
  createKeywordMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.recordEventLastModified'

const MATCHING_DESCRIPTION = 'Last update of specimen record'

const transformation = ({ migrator, src, target }) => {
  const resourceActivities = migrator.getValue({
    obj: src,
    path: 'resourceActivities',
  })

  const recordEventStrings = extractRecordEventText({
    dateOnly: true,
    matchingDescription: MATCHING_DESCRIPTION,
    migrator,
    src,
    withTime: true,
  })

  if (resourceActivities && resourceActivities.length) {
    const { srcUpdatedAt } = resourceActivities[0]
    const dateText = getYMDHMSFromTimestamp(srcUpdatedAt)

    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: [dateText],
    })
  } else if (recordEventStrings && recordEventStrings.length) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: recordEventStrings,
    })
  }

  return null
}

module.exports = {
  fieldPath,
  key: 'recordEventLastModified',
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
