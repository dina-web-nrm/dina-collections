const immutablePath = require('object-path-immutable')
const idFilter = require('../../../../data/filters/sharedFilters/id')
const getByIdWrapper = require('../../wrappers/methods/getById')

module.exports = function getByIdFactory({ getOneWhere }) {
  if (!getOneWhere) {
    throw new Error('getOneWhere is required')
  }
  return getByIdWrapper(
    ({
      excludeFieldsInput = [],
      filterInput: filterUserInput = {},
      filterSpecification: filterSpecificationInput = { filters: {} },
      id,
      include = undefined,
      includeDeactivated,
      includeFieldsInput = [],
      raw = true,
      selectableFields = [],
    }) => {
      let filterSpecification = filterSpecificationInput
      if (!(filterSpecification.filters && filterSpecification.filters.id)) {
        filterSpecification = immutablePath.set(
          filterSpecification,
          'filters.id',
          idFilter
        )
      }
      return getOneWhere({
        excludeFieldsInput,
        filterInput: {
          ...filterUserInput,
          id,
        },
        filterSpecification,
        include,
        includeDeactivated,
        includeFieldsInput,
        raw,
        selectableFields,
      })
    }
  )
}
