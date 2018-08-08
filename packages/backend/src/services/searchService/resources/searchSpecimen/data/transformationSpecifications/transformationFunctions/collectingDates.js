/* eslint-disable no-param-reassign */
const getTimestampFromYMD = require('common/src/date/getTimestampFromYMD')

const createDisplayDate = ({ year, month, day }) => {
  if (year) {
    if (month) {
      if (day) {
        return `${year}-${month}-${day}`
      }

      return `${year}-${month}`
    }

    return year
  }

  return undefined
}

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

    migrator.setValue({
      obj: target,
      path: 'attributes.result.collectingStartDate',
      value: createDisplayDate(collectingEventDateRange.startDate),
    })
  }

  if (collectingEventDateRange.endDate) {
    const timestamp = getTimestampFromYMD(collectingEventDateRange.endDate)
    migrator.setValue({
      obj: target,
      path: 'attributes.collectingEndDate',
      value: timestamp,
    })

    migrator.setValue({
      obj: target,
      path: 'attributes.result.collectingEndDate',
      value: createDisplayDate(collectingEventDateRange.endDate),
    })
  }

  return null
}
