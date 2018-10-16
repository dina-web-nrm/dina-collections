export function joinSubqueries(queries) {
  const filteredQueries = queries.filter(query => {
    return !!query
  })
  return {
    and: filteredQueries,
  }
}

export function buildRootQuery({ aggregation, query }) {
  const rootQuery = {}
  if (aggregation) {
    rootQuery.aggregations = [aggregation]
    rootQuery.limit = 0
  }

  if (query) {
    rootQuery.query = query
  }

  return rootQuery
}

export function buildLocalAggregationQuery({
  fieldName,
  fieldValue,
  input = {},
  otherFieldFilters,
  querySpecificationsMap,
  sectionValues,
}) {
  const specification = querySpecificationsMap[fieldName]

  if (!specification) {
    throw new Error(`Specification not found for: ${fieldName}`)
  }

  const {
    aggregation: aggregationFunction,
    rootQueryModifier: rootQueryModifierFunction,
    searchFilter: filterFunction,
  } = specification

  const { getAll } = input

  const aggregation = aggregationFunction({
    fieldValue,
    input,
    sectionValues,
  })

  let query = null
  if (!getAll) {
    query = otherFieldFilters

    if (filterFunction) {
      const filterQuery = filterFunction({
        fieldValue,
        input,
        sectionValues,
      })

      if (filterQuery) {
        query = joinSubqueries([otherFieldFilters, filterQuery])
      }
    }
  }

  const rootQuery = buildRootQuery({
    aggregation,
    query,
  })

  if (!rootQueryModifierFunction) {
    return rootQuery
  }

  return rootQueryModifierFunction({
    rootQuery,
  })
}

export function buildQuery({ formName, getSubQueries, formState }) {
  const patchedGlobalState = {
    form: {
      [formName]: {
        values: formState,
      },
    },
  }
  const subQueries = getSubQueries(patchedGlobalState)

  const rootQuery = buildRootQuery({
    query: joinSubqueries(subQueries),
  })

  return rootQuery
}
