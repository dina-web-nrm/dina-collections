const getTimestampFromYMD = require('common/src/date/getTimestampFromYMD')
const getYYYYMMDDFromTimestamp = require('common/src/date/getYYYYMMDDFromTimestamp')

const {
  createDateMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.collectingEventEndDate'

const transformation = ({ migrator, src, target }) => {
  const collectingEventDateRange = migrator.getValue({
    obj: src,
    path: 'individual.collectingInformation.0.event.dateRange',
  })

  if (!collectingEventDateRange) {
    return null
  }

  if (collectingEventDateRange.endDate) {
    const timestamp = getTimestampFromYMD(collectingEventDateRange.endDate)
    if (timestamp) {
      migrator.setValue({
        obj: target,
        path: fieldPath,
        value: getYYYYMMDDFromTimestamp(timestamp),
      })
    }
  }
  return null
}

module.exports = {
  fieldPath,
  key: 'collectingEventEndDate',
  mapping: createDateMapping({
    fieldPath,
    format: 'ymd',
  }),
  selectable: true,
  sortable: true,
  transformation,
}
