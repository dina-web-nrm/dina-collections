const idFilterFunction = require('common/src/search/resources/specimen/filterFunctions/id')

module.exports = {
  jsFilterFunction: idFilterFunction,
  key: 'id',
  queryParams: {
    description: 'Filter by id',
    schema: {
      type: 'string',
    },
  },
  sequelizeFilterFunction: ({ value }) => {
    if (!value) {
      return null
    }

    return {
      id: value,
    }
  },
}
