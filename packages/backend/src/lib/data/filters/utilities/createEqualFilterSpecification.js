module.exports = function createEqualFilterSpecification({
  filterParameter,
  filterSchema = {
    type: 'string',
  },
  path,
}) {
  return {
    description: `Filter by ${filterParameter}`,
    inputSchema: filterSchema,
    jsFilterFunction: () => {},
    key: filterParameter,

    sequelizeFilterFunction: ({ value }) => {
      if (value === undefined) {
        return null
      }

      return {
        [path]: value,
      }
    },
  }
}
