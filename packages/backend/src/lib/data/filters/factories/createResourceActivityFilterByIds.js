module.exports = function createResourceActivityFilterByIds({ key, resource }) {
  return {
    description: `filter by ${resource} ids`,
    inputSchema: {
      items: {
        type: 'string',
      },
      type: 'array',
    },
    jsFilterFunction: () => {},
    key,
    sequelizeFilterFunction: ({ value }) => {
      if (!Array.isArray(value)) {
        return null
      }

      return {
        resource,
        resourceId: value,
      }
    },
  }
}
