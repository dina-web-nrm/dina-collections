const backendError400 = require('common/src/error/errorFactories/backendError400')

module.exports = function extractSortObjectsFromUserInput(
  { sortInput, sortSpecification } = {}
) {
  if (!(sortInput && sortInput.length)) {
    return []
  }

  const fieldsSpecificationMap = (
    (sortSpecification && sortSpecification.fields) ||
    []
  ).reduce((obj, key) => {
    obj[key] = true // eslint-disable-line no-param-reassign
    return obj
  }, {})

  return sortInput
    .map(sortString => {
      const sortSegments = sortString.split(':')
      if (sortSegments.length !== 2) {
        backendError400({
          code: 'REQUEST_QUERY_VALIDATION_ERROR',
          detail: `Wrong format for sort  ${
            sortString
          }. Follow format: [path]:[order] ex attributes.id:desc`,
        })
      }
      const path = sortSegments[0]
      const order = sortSegments[1]

      if (!fieldsSpecificationMap[path]) {
        return null
      }

      return {
        order,
        path,
      }
    })
    .filter(sortObject => {
      return !!sortObject
    })
}
