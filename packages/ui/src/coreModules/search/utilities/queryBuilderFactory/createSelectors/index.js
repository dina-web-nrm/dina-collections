import objectPath from 'object-path'
import { getFormValues } from 'redux-form'
import { createSelector } from 'reselect'

export default function createSelectors({ formName, querySpecifications }) {
  const getFormSelector = state => {
    const values = getFormValues(formName)(state)
    return values
  }

  const sectionNames = querySpecifications.reduce((arr, { sectionName }) => {
    if (!sectionName) {
      return arr
    }

    if (arr.includes(sectionName)) {
      return arr
    }

    return [...arr, sectionName]
  }, [])

  const noopSelector = () => null

  const sectionValueSelectors = sectionNames.reduce(
    (selectors, sectionName) => {
      const selector = function sectionValueSelector(state) {
        const form = getFormSelector(state)
        return objectPath.get(form, sectionName)
      }

      return {
        ...selectors,
        [sectionName]: selector,
      }
    },
    {}
  )

  const fieldValueSelectors = querySpecifications.reduce(
    (selectors, { fieldName }) => {
      const selector = function fieldValueSelector(state) {
        const form = getFormSelector(state)
        return objectPath.get(form, fieldName)
      }
      return {
        ...selectors,
        [fieldName]: selector,
      }
    },
    {}
  )

  const fieldMatchFilterSelectors = querySpecifications.reduce(
    (selectors, { fieldName, matchFilter, sectionName }) => {
      if (!matchFilter) {
        return selectors
      }

      const fieldValueSelector = fieldValueSelectors[fieldName]
      const sectionValueSelector = sectionName
        ? sectionValueSelectors[sectionName]
        : noopSelector

      const selector = createSelector(
        fieldValueSelector,
        sectionValueSelector,
        (fieldValue, sectionValues) => {
          return matchFilter({ fieldValue, sectionValues })
        }
      )
      return {
        ...selectors,
        [fieldName]: selector,
      }
    },
    {}
  )

  const otherFieldFiltersSelectors = querySpecifications.reduce(
    (selectors, { fieldName }) => {
      const otherFieldNames = querySpecifications
        .map(({ fieldName: otherFieldName }) => {
          return otherFieldName
        })
        .filter(otherFieldName => {
          return fieldName !== otherFieldName
        })

      const subSelectors = otherFieldNames
        .map(otherFieldName => {
          return fieldMatchFilterSelectors[otherFieldName]
        })
        .filter(selector => {
          return !!selector
        })

      const selector = createSelector(subSelectors, (...otherQueries) => {
        if (otherQueries && otherQueries.length) {
          return {
            and: otherQueries.filter(filter => {
              return !!filter
            }),
          }
        }
        return null
      })
      return {
        ...selectors,
        [fieldName]: selector,
      }
    },
    {}
  )

  const getSubQueries = state => {
    return querySpecifications
      .map(({ fieldName }) => {
        const selector = fieldMatchFilterSelectors[fieldName]
        if (!selector) {
          return null
        }
        return selector(state)
      })
      .filter(queryValue => {
        return !!queryValue
      })
  }

  return {
    fieldMatchFilterSelectors,
    fieldValueSelectors,
    getFormSelector,
    getSubQueries,
    otherFieldFiltersSelectors,
    sectionValueSelectors,
  }
}
