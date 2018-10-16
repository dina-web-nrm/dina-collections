const {
  createSrcFieldKeyPathMap,
  getActiveSrcFieldPaths,
} = require('./utilities')

module.exports = function createTextSearch({
  description,
  key,
  srcFieldSpecifications,
}) {
  const srcFieldKeyPathMap = createSrcFieldKeyPathMap(srcFieldSpecifications)

  return {
    description: description || `Query string search`,
    elasticsearch: ({ searchString, srcFields: srcFieldKeysInput }) => {
      const srcFieldsPaths = getActiveSrcFieldPaths({
        srcFieldKeyPathMap,
        srcFieldKeysInput,
        srcFieldSpecifications,
      })
      return {
        simple_query_string: {
          fields: srcFieldsPaths,
          query: searchString,
        },
      }
    },
    inputSchema: {
      type: 'string',
    },
    key,
  }
}
