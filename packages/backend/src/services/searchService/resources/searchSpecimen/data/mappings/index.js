const mappingSpecification = {
  searchSpecimen: {
    properties: {
      collectingLocations: {
        fields: {
          raw: {
            ignore_above: 256,
            type: 'keyword',
          },
        },
        type: 'text',
      },
      id: {
        fields: {
          keyword: {
            ignore_above: 256,
            type: 'keyword',
          },
        },
        type: 'text',
      },
      identifiers: {
        fields: {
          raw: {
            ignore_above: 256,
            type: 'keyword',
          },
        },
        type: 'text',
      },
    },
  },
}

module.exports = mappingSpecification
