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

  if (collectingEventDateRange.startDate) {
    const startTimestamp = getTimestampFromYMD(
      collectingEventDateRange.startDate
    )
    const endTimestamp = getTimestampFromYMD(collectingEventDateRange.endDate)
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
    const { start, end, dateType } = value

    const must = []
    if (start) {
      must.push({
        range: {
          [`${fieldPath}.startTimestamp`]: {
            gte: start || undefined,
          },
        },
      })
    }

    if (end) {
      must.push({
        range: {
          [`${fieldPath}.endTimestamp`]: {
            lte: end || undefined,
          },
        },
      })
    }

    if (dateType) {
      must.push({
        match: { [`${fieldPath}.dateType`]: dateType },
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
