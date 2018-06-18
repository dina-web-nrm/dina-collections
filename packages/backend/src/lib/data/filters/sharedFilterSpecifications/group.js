const groupFilterFunction = require('common/src/search/resources/shared/filterFunctions/group')

module.exports = {
  description: 'Filter by group',
  inputSchema: {
    type: 'string',
  },
  jsFilterFunction: groupFilterFunction,
  key: 'group',
  sequelizeFilterFunction: ({ value }) => {
    if (value === undefined) {
      return null
    }
    return {
      'document.group': value,
    }
  },
}
