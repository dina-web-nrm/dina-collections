const backendError500 = require('common/src/error/errorFactories/backendError400')
const extractFieldsFromItem = require('../../../../../data/fields/utilities/extractFieldsFromItem')
const extractFieldsFromUserInput = require('../../../../../data/fields/utilities/extractFieldsFromUserInput')

const getWhereWrapper = require('../../../wrappers/methods/getWhere')
const asyncFilter = require('common/src/search/filter/async')

const buildWhere = ({
  buildWhereFilter,
  buildWhereQuery,
  filterInput,
  filterSpecification,
  query,
}) => {
  if (query) {
    return buildWhereQuery({
      filterSpecification,
      query,
    })
  }
  if (filterInput) {
    return buildWhereFilter({
      filterInput,
      filterSpecification,
    })
  }

  throw new Error('Provide either query or filterInput')
}

module.exports = function getWhereFactory({
  buildWhereFilter,
  buildWhereQuery,
  Model,
}) {
  return getWhereWrapper(
    ({
      sortInput,
      fieldsInput = [],
      fieldsSpecification = {},
      filterInput = {},
      filterSpecification = {},
      limit = 10,
      offset = 0,
      query: queryInput,
    }) => {
      if (sortInput && sortInput.length) {
        backendError500({
          code: 'INTERNAL_SERVER_ERROR',
          detail: 'Sorting not implemented for inMemory model',
        })
      }

      return buildWhere({
        buildWhereFilter,
        buildWhereQuery,
        filterInput,
        filterSpecification,
        query: queryInput,
      }).then(where => {
        const { query, filterFunctions } = where
        const itemArray = Model.getArray()
        return asyncFilter({
          attributesPath: 'attributes',
          filterFunctions,
          items: itemArray,
          limit,
          offset,
          query,
          returnItems: true,
        }).then(items => {
          const fields = extractFieldsFromUserInput({
            fieldsInput,
            fieldsSpecification,
          })

          if (fields.length) {
            return {
              items: items.map(item => {
                return extractFieldsFromItem({
                  fields,
                  item,
                })
              }),
            }
          }

          return {
            items,
          }
        })
      })
    }
  )
}
