import { createSelector } from 'reselect'

/*
  Functions to extract filter information from form field name
*/
export const hasFilterParams = key => {
  const filterParams = key.split('|')
  return filterParams.length > 1
}

export const extractFilterParams = key => {
  const filterParams = key.split('|')[1]
  const parts = filterParams.split('-')
  return {
    filterFunction: parts[1],
    filterType: parts[0],
  }
}

export const getFilterFunction = key => {
  return extractFilterParams(key).filterFunction
}

export const getFilterType = key => {
  return extractFilterParams(key).filterType
}

export const getTrimmedExcludeKey = excludeKey => {
  const indexOfFirstDot = excludeKey.indexOf('.')
  if (indexOfFirstDot === -1) {
    return excludeKey
  }

  return excludeKey.slice(indexOfFirstDot + 1)
}

/*
  Functions to build the query for filters based on one form field
*/
const getFilterKeyValueMap = filterFormPartials =>
  filterFormPartials.reduce((map, filterFormPartial) => {
    return {
      ...map,
      ...Object.keys(filterFormPartial).reduce((obj, key) => {
        return {
          ...obj,
          [key]: filterFormPartial[key],
        }
      }, {}),
    }
  }, {})

/*
  Filter building functions
*/
const getMultipleChoiceFilter = (key, filterValue) => {
  return {
    or: filterValue.map(item => {
      return {
        filter: {
          filterFunction: getFilterFunction(key),
          input: {
            value: item,
          },
        },
      }
    }),
  }
}

const getAndFiltersFromFilterKeyValueMap = (
  filterKeyValueMap,
  excludeKey = ''
) =>
  Object.keys(filterKeyValueMap)
    .map(key => {
      const filterValue = filterKeyValueMap[key]

      if (!filterValue || key === getTrimmedExcludeKey(excludeKey)) {
        return null
      }
      if (hasFilterParams(key)) {
        switch (getFilterType(key)) {
          case 'multipleChoice': {
            return getMultipleChoiceFilter(key, filterValue)
          }
          case 'searchTags': {
            return {
              or: Object.values(filterValue)
                .reduce((acc, arr) => {
                  return acc.concat(arr)
                }, [])
                .map(item => {
                  if (!item.selected) {
                    return null
                  }

                  return {
                    filter: {
                      filterFunction: `match${getFilterFunction(key)}`,
                      input: {
                        value: item.id,
                      },
                    },
                  }
                })
                .filter(filter => !!filter),
            }
          }
          case 'singleMatch': {
            return {
              filter: {
                filterFunction: getFilterFunction(key),
                input: {
                  value: filterValue,
                },
              },
            }
          }
          default:
            return null
        }
      }

      return {
        filter: {
          filterFunction: key,
          input: {
            value: filterValue,
          },
        },
      }
    })
    .filter(item => {
      return !!item
    })

/*
  Functions to build the query for filters based on a form partial, i.e. a collection of fields
*/
const OBJECT_FILTER_FORM_PARTIAL_KEYS = [
  'ageAndStage',
  'date',
  'length',
  'weight',
]

const buildRangeDateFilter = (dateType, { startDate, endDate }) => {
  if (
    dateType === undefined &&
    startDate === undefined &&
    endDate === undefined
  ) {
    return null
  }

  return {
    filter: {
      filterFunction: 'searchDates',
      input: {
        value: {
          dateType,
          end: endDate && endDate.interpretedTimestamp,
          start: startDate && startDate.interpretedTimestamp,
        },
      },
    },
  }
}

const createBuildRangeFilter = ({ filterFunction, typeKey }) => (
  type,
  { min, max }
) => {
  if (type === undefined && min === undefined && max === undefined) {
    return null
  }

  if (!typeKey) {
    return {
      filter: {
        filterFunction,
        input: {
          value: {
            max,
            min,
          },
        },
      },
    }
  }

  return {
    filter: {
      filterFunction,
      input: {
        value: {
          max,
          min,
          [typeKey]: type,
        },
      },
    },
  }
}

const getAndFiltersFromObjectFilters = objectFiltersMap => {
  return Object.keys(objectFiltersMap)
    .map(partialKey => {
      const values = objectFiltersMap[partialKey]
      const { endDate, max, min, startDate } = values

      switch (partialKey) {
        case 'ageAndStage': {
          const ageStageFieldName = 'ageStage|multipleChoice-matchAgeStageTags'
          const ageStageTags = values[ageStageFieldName]
          const buildRangeLengthFilter = createBuildRangeFilter({
            filterFunction: 'rangeAge',
          })

          if (ageStageTags && ageStageTags.length) {
            if (max === undefined && min === undefined) {
              return getMultipleChoiceFilter(ageStageFieldName, ageStageTags)
            }

            return {
              and: [
                getMultipleChoiceFilter(ageStageFieldName, ageStageTags),
                {
                  or: ageStageTags.map(ageStage => {
                    return buildRangeLengthFilter(ageStage, values)
                  }),
                },
              ],
            }
          }

          if (max === undefined && min === undefined) {
            return null
          }

          return buildRangeLengthFilter(undefined, values)
        }

        case 'date': {
          const dateTypeFieldName = 'dateType|multipleChoice-matchDateTags'
          const dateTypeTags = values[dateTypeFieldName]
          if (dateTypeTags && dateTypeTags.length) {
            if (startDate === undefined && endDate === undefined) {
              return getMultipleChoiceFilter(dateTypeFieldName, dateTypeTags)
            }

            return {
              and: [
                getMultipleChoiceFilter(dateTypeFieldName, dateTypeTags),
                {
                  or: dateTypeTags.map(dateType => {
                    return buildRangeDateFilter(dateType, values)
                  }),
                },
              ],
            }
          }

          if (startDate === undefined && endDate === undefined) {
            return null
          }

          return buildRangeDateFilter(undefined, values)
        }

        case 'length': {
          const lengthTypeFieldName =
            'lengthType|multipleChoice-matchLengthTags'
          const lengthTypeTags = values[lengthTypeFieldName]
          const buildRangeLengthFilter = createBuildRangeFilter({
            filterFunction: 'rangeLength',
            typeKey: 'lengthType',
          })

          if (lengthTypeTags && lengthTypeTags.length) {
            if (max === undefined && min === undefined) {
              return getMultipleChoiceFilter(
                lengthTypeFieldName,
                lengthTypeTags
              )
            }

            return {
              and: [
                getMultipleChoiceFilter(lengthTypeFieldName, lengthTypeTags),
                {
                  or: lengthTypeTags.map(lengthType => {
                    return buildRangeLengthFilter(lengthType, values)
                  }),
                },
              ],
            }
          }

          if (max === undefined && min === undefined) {
            return null
          }

          return buildRangeLengthFilter(undefined, values)
        }

        case 'weight': {
          const weightTypeFieldName =
            'weightType|multipleChoice-matchWeightTags'
          const weightTypeTags = values[weightTypeFieldName]
          const buildRangeWeightFilter = createBuildRangeFilter({
            filterFunction: 'rangeWeight',
            typeKey: 'weightType',
          })

          if (weightTypeTags && weightTypeTags.length) {
            if (max === undefined && min === undefined) {
              return getMultipleChoiceFilter(
                weightTypeFieldName,
                weightTypeTags
              )
            }

            return {
              and: [
                getMultipleChoiceFilter(weightTypeFieldName, weightTypeTags),
                {
                  or: weightTypeTags.map(weightType => {
                    return buildRangeWeightFilter(weightType, values)
                  }),
                },
              ],
            }
          }

          if (max === undefined && min === undefined) {
            return null
          }

          return buildRangeWeightFilter(undefined, values)
        }

        default: {
          return null
        }
      }
    })
    .filter(item => !!item)
}

const buildQuery = createSelector(
  filterFormValues => filterFormValues,
  (_, excludeKey) => excludeKey,
  (filterFormValues = {}, excludeKey = '') => {
    const keyValueFilters = []
    const objectFiltersMap = {}

    Object.keys(filterFormValues).forEach(formPartialKey => {
      if (OBJECT_FILTER_FORM_PARTIAL_KEYS.includes(formPartialKey)) {
        objectFiltersMap[formPartialKey] = filterFormValues[formPartialKey]
      } else {
        keyValueFilters.push(filterFormValues[formPartialKey])
      }
    })

    const filterKeyValueMap = getFilterKeyValueMap(keyValueFilters)
    const andFiltersFromKeyValues = getAndFiltersFromFilterKeyValueMap(
      filterKeyValueMap,
      excludeKey
    )

    const andFiltersFromObjectFilters = getAndFiltersFromObjectFilters(
      objectFiltersMap
    )

    return {
      and: [...andFiltersFromKeyValues, ...andFiltersFromObjectFilters],
    }
  }
)
export default buildQuery
