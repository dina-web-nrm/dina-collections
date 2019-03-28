const {
  createSrcFieldKeyPathMap,
  getActiveSrcFieldPaths,
} = require('./utilities')

const prepareSearchString = searchString => {
  if (!searchString) {
    return searchString
  }

  let preparedString = searchString
  const lastChar = searchString[searchString.length - 1]
  if (!['"', '*', ' '].includes(lastChar)) {
    if (lastChar === '.') {
      preparedString = preparedString.slice(0, -1)
    }

    preparedString = `${preparedString}*`
  }

  // preparedString = preparedString.replace(/\.+/g, '\\.')
  return preparedString
}

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
      const preparedSearchString = prepareSearchString(searchString)
      return {
        bool: {
          should: srcFieldsPaths.map(srcFieldsPath => {
            return {
              simple_query_string: {
                default_operator: 'AND',
                fields: [srcFieldsPath],
                flags: 'AND|PREFIX|PHRASE|WHITESPACE',
                query: preparedSearchString,
              },
            }
          }),
        },
      }
    },
    inputSchema: {
      type: 'string',
    },
    key,
  }
}
