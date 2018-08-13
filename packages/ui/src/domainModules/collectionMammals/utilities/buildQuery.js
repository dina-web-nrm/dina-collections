import { createSelector } from 'reselect'

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

const buildQuery = createSelector(
  filterFormValues => filterFormValues,
  (_, excludeKey) => excludeKey,
  (filterFormValues = {}, excludeKey = '') => {
    const filterFormPartials = Object.values(filterFormValues)
    const filterKeyValueMap = filterFormPartials.reduce(
      (map, filterFormPartial) => {
        return {
          ...map,
          ...Object.keys(filterFormPartial).reduce((obj, key) => {
            return {
              ...obj,
              [key]: filterFormPartial[key],
            }
          }, {}),
        }
      },
      {}
    )

    return {
      and: Object.keys(filterKeyValueMap)
        .map(key => {
          const filterValue = filterKeyValueMap[key]

          if (!filterValue || key === getTrimmedExcludeKey(excludeKey)) {
            return null
          }
          if (hasFilterParams(key)) {
            switch (getFilterType(key)) {
              case 'multipleChoice': {
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
        }),
    }
  }
)
export default buildQuery
