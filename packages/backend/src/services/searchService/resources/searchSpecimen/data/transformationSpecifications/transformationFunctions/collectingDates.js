/* eslint-disable no-param-reassign */
const getTimestampFromYMD = require('common/src/date/getTimestampFromYMD')

module.exports = ({ migrator, src, target }) => {
  const collectingEventDateRange = migrator.getValue({
    obj: src,
    path: 'individual.collectingInformation.0.event.dateRange',
  })

  if (!collectingEventDateRange) {
    return null
  }

  if (collectingEventDateRange.startDate) {
    const timestamp = getTimestampFromYMD(collectingEventDateRange.startDate)
    migrator.setValue({
      obj: target,
      path: 'attributes.collectingStartDate',
      value: timestamp,
    })
  }

  if (collectingEventDateRange.endDate) {
    const timestamp = getTimestampFromYMD(collectingEventDateRange.endDate)
    migrator.setValue({
      obj: target,
      path: 'attributes.collectingEndDate',
      value: timestamp,
    })
  }

  return null
}
