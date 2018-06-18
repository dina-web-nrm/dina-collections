const createGetManyFilters = require('../../../../../../lib/services/operationFactory/filters/createGetManyFilters')

module.exports = createGetManyFilters({
  custom: {
    catalogNumber: {
      jsFilterFunction: () => {},
      key: 'catalogNumber',
      queryParams: {
        description: 'catalog number used to filter specimens',
        example: '123456',
        required: false,
        schema: {
          type: 'string',
        },
      },
      sequelizeFilterFunction: ({ value, Op }) => {
        if (!value) {
          return null
        }

        return {
          identifiers: {
            [Op.contains]: [
              {
                identifierType: { id: '1' },
                value,
              },
            ],
          },
        }
      },
    },
  },
})
