const getTimestampFromYMD = require('common/src/date/getTimestampFromYMD')

const {
  createNestedMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.searchOnlyFields.searchDate'
const key = 'searchDate'
const searchFilterName = 'searchDates'

const transformation = ({ migrator, src, target }) => {
  const collectingEventDateRange = migrator.getValue({
    obj: src,
    path: 'individual.collectingInformation.0.event.dateRange',
  })

  if (!collectingEventDateRange) {
    return null
  }

  const dates = []

  if (collectingEventDateRange.startDate || collectingEventDateRange.endDate) {
    let startTimestamp
    if (collectingEventDateRange.startDate) {
      startTimestamp =
        getTimestampFromYMD(collectingEventDateRange.startDate) ||
        collectingEventDateRange.startDate.interpretedTimestamp
    }

    let endTimestamp
    if (collectingEventDateRange.endDate) {
      endTimestamp =
        getTimestampFromYMD(collectingEventDateRange.endDate) ||
        collectingEventDateRange.startDate.endDate
    }

    if (startTimestamp || endTimestamp) {
      dates.push({
        dateType: 'collecting-event-start-date',
        endTimestamp,
        startTimestamp,
      })
    }
  }

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: dates,
  })

  return null
}

const searchFilter = {
  description: 'Search date',
  elasticsearch: ({ value = {} }) => {
    const { start, end } = value

    const must = []

    if (start) {
      must.push({
        range: {
          [`${fieldPath}.startTimestamp`]: {
            gte: start,
          },
        },
      })
    }

    if (end) {
      must.push({
        range: {
          [`${fieldPath}.endTimestamp`]: {
            lte: end,
          },
        },
      })
    }

    return {
      nested: {
        path: fieldPath,
        query: {
          bool: {
            must,
          },
        },
      },
    }
  },
  inputSchema: {
    type: 'object',
  },
  key: searchFilterName,
}

module.exports = {
  fieldPath,
  filters: {
    [searchFilterName]: searchFilter,
  },
  key,
  mapping: createNestedMapping({
    fieldPath,
  }),
  selectable: true,
  transformation,
}
