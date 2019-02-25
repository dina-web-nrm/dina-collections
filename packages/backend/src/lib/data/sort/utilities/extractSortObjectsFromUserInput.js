const backendError400 = require('common/src/error/errorFactories/backendError400')

module.exports = function extractSortObjectsFromUserInput({
  sortInput,
  sortableFields = [],
  replaceAttributesWithDocument = false,
} = {}) {
  if (!(sortInput && sortInput.length)) {
    return []
  }

  const fieldsMap = sortableFields.reduce((obj, key) => {
    obj[key] = true // eslint-disable-line no-param-reassign
    return obj
  }, {})

  return sortInput
    .map(sortString => {
      if (sortString === 'relevance') {
        return {
          order: 'relevance',
          path: '',
        }
      }
      const sortSegments = sortString.split(':')
      if (sortSegments.length !== 2) {
        backendError400({
          code: 'REQUEST_QUERY_VALIDATION_ERROR',
          detail: `Wrong format for sort  ${sortString}. Follow format: [path]:[order] ex attributes.id:desc`,
        })
      }
      const path = sortSegments[0]
      const order = sortSegments[1]

      if (!fieldsMap[path]) {
        return null
      }

      return {
        order,
        path: replaceAttributesWithDocument
          ? path.replace('attributes', 'document')
          : path,
      }
    })
    .filter(sortObject => {
      return !!sortObject
    })
}
