const idFilterFunction = require('common/src/search/resources/specimen/filterFunctions/id')

module.exports = {
  description: 'Filter by id',
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
      id: value,
    }
  },
}
