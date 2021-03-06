const Sequelize = require('sequelize')
const extractFieldsFromItem = require('../../../data/fields/utilities/extractFieldsFromItem')
const extractFieldsFromUserInput = require('../../../data/fields/utilities/extractFieldsFromUserInput')
const extractSortObjectsFromUserInput = require('../../../data/sort/utilities/extractSortObjectsFromUserInput')
const getWhereWrapper = require('../../utilities/wrappers/methods/getWhere')
const formatModelItemsResponse = require('../utilities/formatModelItemsResponse')
const extractMetaFromResult = require('../utilities/extractMetaFromResult')

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

module.exports = function getWhereFactory({
  buildWhereFilter,
  buildWhereQuery,
  Model,
}) {
  return getWhereWrapper(
    ({
      count,
      excludeFieldsInput = [],
      filterInput,
      filterSpecification,
      idsInMeta,
      include = [],
      includeDeactivated = false,
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
      }).then(where => {
        const sortObjects = extractSortObjectsFromUserInput({
          replaceAttributesWithDocument: true,
          sortableFields,
          sortInput,
        })
        let order = [['id', 'DESC']]

        if (order && sortObjects.length) {
          order = sortObjects
            .filter(({ order: sortOrder }) => {
              return sortOrder !== 'relevance'
            })
            .map(sortObject => {
              if (sortObject.order === 'asc') {
                return sortObject.path
              }
              return [sortObject.path, sortObject.order]
            })
        }

        const options = {
          include,
          paranoid: !includeDeactivated,
          where,
        }

        if (limit) {
          options.limit = limit
        }

        if (offset) {
          options.offset = offset
        }

        if (order && !count) {
          options.order = order
        }

        if (count) {
          options.attributes = [
            [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
          ]
        }

        return Model.findAll(options).then(res => {
          if (count) {
            const meta = {
              count: Number(res[0].dataValues.count),
            }
            return {
              items: [],
              meta,
            }
          }

          const items = formatModelItemsResponse({ idsInMeta, input: res })

          const fields = extractFieldsFromUserInput({
            includeFieldsInput,
            selectableFields,
          })

          const meta = extractMetaFromResult({ idsInMeta, result: res })

          if (fields.length || excludeFieldsInput.length) {
            return {
              items: items.map(item => {
                return extractFieldsFromItem({
                  excludeFieldsInput,
                  fields,
                  item,
                })
              }),
              meta,
            }
          }
          return {
            items,
            meta,
          }
        })
      })
    }
  )
}
