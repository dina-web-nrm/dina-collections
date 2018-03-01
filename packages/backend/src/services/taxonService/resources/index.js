exports.taxon = {
  basePath: '/taxon',
  operations: [
    {
      connect: false,
      operationId: 'getTaxonById',
      queryParams: {
        'filter[name]': {
          description:
            'Taxon name - accepted scientific, synonym or vernacular name',
          example: 'Alces alces',
          required: true,
          schema: {
            type: 'string',
          },
        },
        search_type: {
          description: 'Search type - exact (default) or partial',
          example: 'exact',
          required: false,
          schema: {
            enum: ['exact', 'partial'],
            type: 'string',
          },
        },
      },

      type: 'getOne',
    },
    {
      connect: false,
      operationId: 'getTaxaByName',
      type: 'getMany',
    },
  ],
  resource: 'taxon',
  resourcePlural: 'taxon',
}
