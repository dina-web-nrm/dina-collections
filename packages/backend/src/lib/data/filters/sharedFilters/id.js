const idFilterFunction = require('common/src/search/resources/shared/filterFunctions/id')

module.exports = {
  description: 'Filter by id',
  elasticsearch: ({ value }) => {
    return {
      term: {
        id: value,
      },
    }
  },
  inputSchema: {
    type: 'string',
  },
  jsFilterFunction: idFilterFunction,
  key: 'id',
  sequelizeFilterFunction: ({ value }) => {
    if (!value) {
      return null
    }

    return {
      id: Number(value),
    }
  },
}
