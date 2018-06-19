module.exports = function createEqualFilterSpecification({
  filterParameter,
  filterParameterType = 'string',
  path,
}) {
  return {
    description: `Filter by ${filterParameter}`,
    inputSchema: {
      type: filterParameterType,
    },
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
