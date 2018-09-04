const backendError500 = require('common/src/error/errorFactories/backendError400')
const extractFieldsFromItem = require('../../../../data/fields/utilities/extractFieldsFromItem')
const extractFieldsFromUserInput = require('../../../../data/fields/utilities/extractFieldsFromUserInput')

const getWhereWrapper = require('../../wrappers/methods/getWhere')
const formatModelItemsResponse = require('../utilities/formatModelItemsResponse')

const Sequelize = require('sequelize')

const { Op } = Sequelize

const buildWhere = ({
  buildWhereFilter,
  buildWhereQuery,
  filterInput,
  filterSpecification,
  query,
  serviceInteractor,
  where,
}) => {
  if (where) {
    return Promise.resolve(where)
  }
  if (query) {
    return buildWhereQuery({
      filterSpecification,
      query,
      serviceInteractor,
    })
  }

  return buildWhereFilter({
    filterInput,
    filterSpecification,
    serviceInteractor,
  })
}

const hasDeactivatedAtFilter = where => {
  if (where.deactivatedAt !== undefined) {
    return true
  }

  if (!where[Op.and]) {
    return false
  }
  return where[Op.and].find(filter => {
    return filter.deactivatedAt !== undefined
  })
}

module.exports = function getWhereFactory({
  buildWhereFilter,
  buildWhereQuery,
  Model,
}) {
  return getWhereWrapper(
    ({
      excludeFieldsInput = [],
      filterInput,
      filterSpecification,
      include = [],
      includeFieldsInput = [],
      limit,
      offset,
      query,
      selectableFields = [],
      serviceInteractor,
      sortInput,
      where: customWhere,
    }) => {
      if (sortInput && sortInput.length) {
        backendError500({
          code: 'INTERNAL_SERVER_ERROR',
          detail: 'Sorting not implemented for sequelize model',
        })
      }

      return buildWhere({
        buildWhereFilter,
        buildWhereQuery,
        filterInput,
        filterSpecification,
        query,
        serviceInteractor,
        where: customWhere,
      }).then(whereInput => {
        // This is not great
        const where = hasDeactivatedAtFilter(whereInput)
          ? whereInput
          : {
              ...whereInput,
              deactivatedAt: null,
            }

        const options = {
          include,
          order: [['id', 'DESC']],
          where,
        }
        if (limit) {
          options.limit = limit
        }

        if (offset) {
          options.offset = offset
        }

        return Model.findAll(options).then(res => {
          const items = formatModelItemsResponse({ input: res })

          const fields = extractFieldsFromUserInput({
            includeFieldsInput,
            selectableFields,
          })

          if (fields.length || excludeFieldsInput.length) {
            return {
              items: items.map(item => {
                return extractFieldsFromItem({
                  excludeFieldsInput,
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
