const nameFiterFunction = require('common/src/search/resources/shared/filterFunctions/name')

module.exports = {
  description: 'Filter by name match',
  inputSchema: {
    type: 'string',
  },
  jsFilterFunction: nameFiterFunction,
  key: 'name',
  sequelizeFilterFunction: ({ value }) => {
    if (value === undefined) {
      return null
    }
    return {
      'document.name': value,
    }
  },
}
