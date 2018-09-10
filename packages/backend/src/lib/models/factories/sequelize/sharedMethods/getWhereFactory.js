const extractFieldsFromItem = require('../../../../data/fields/utilities/extractFieldsFromItem')
const extractFieldsFromUserInput = require('../../../../data/fields/utilities/extractFieldsFromUserInput')
const extractSortObjectsFromUserInput = require('../../../../data/sort/utilities/extractSortObjectsFromUserInput')
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
      sortableFields,
      sortInput,
      where: customWhere,
    }) => {
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

        const sortObjects = extractSortObjectsFromUserInput({
          replaceAttributesWithDocument: true,
          sortableFields,
          sortInput,
        })
        let order = [['id', 'DESC']]

        if (order && sortObjects.length) {
          order = sortObjects.map(sortObject => {
            if (sortObject.order === 'asc') {
              return sortObject.path
            }
            return [sortObject.path, sortObject.order]
          })
        }

        const options = {
          include,
          order,
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
