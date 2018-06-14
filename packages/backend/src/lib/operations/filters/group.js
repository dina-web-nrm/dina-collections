const groupFilterFunction = require('common/src/search/resources/shared/filterFunctions/group')

module.exports = {
  jsFilterFunction: groupFilterFunction,
  key: 'group',
  queryParams: {
    description: 'Filter by group',
    required: false,
    schema: {
      type: 'string',
    },
  },
  sequelizeFilterFunction: ({ value }) => {
    if (value === undefined) {
      return null
    }
    return {
      'document.group': value,
    }
  },
}
