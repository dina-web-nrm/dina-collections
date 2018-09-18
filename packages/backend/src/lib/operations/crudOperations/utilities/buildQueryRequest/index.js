/* eslint-disable sort-keys */
const createAggregationDocumentation = require('./createAggregationDocumentation')
const createFilterDocumentation = require('./createFilterDocumentation')

module.exports = function buildQueryRequest({
  aggregationSpecification = {},
  filterSpecification = {},
  selectableFields = [],
  sortableFields = [],
}) {
  const sortEnum = []

  sortableFields.forEach(field => {
    sortEnum.push(`${field}:asc`)
    sortEnum.push(`${field}:desc`)
  })

  const attributes = {
    properties: {
      aggregations: {
        items: {
          $ref: '__ROOT__queryAggregation',
        },
        type: 'array',
      },
      excludeFields: !(selectableFields && selectableFields.length)
        ? undefined
        : {
            description:
              'When provided specified fields will be excluded (applied after include)',

            items: {
              enum: selectableFields,
              type: 'string',
            },
            type: 'array',
          },
      includeFields: !(selectableFields && selectableFields.length)
        ? undefined
        : {
            description:
              'When provided only specified fields will be returned in response',

            items: {
              enum: selectableFields,
              type: 'string',
            },
            type: 'array',
          },
      limit: {
        description: 'Limit the result',

        minimum: 0,
        type: 'integer',
      },
      offset: {
        description: 'Offset the result',

        minimum: 0,
        type: 'integer',
      },
      query: { $ref: '__ROOT__queryRoot' },
      scroll: {
        default: false,
        example: false,
        description: 'If true elastic search scroll will be used',

        type: 'boolean',
      },
      scrollId: {
        description: 'Elastic search scroll id',

        type: 'integer',
      },
      sort: !(sortEnum && sortEnum.length)
        ? undefined
        : {
            description: 'When provided response will be sorted',
            items: {
              enum: sortEnum,
              type: 'string',
            },
            type: 'array',
          },
    },
  }

  const filterDescription = createFilterDocumentation({
    filterSpecification,
  })
  const aggregationDescription = createAggregationDocumentation({
    aggregationSpecification,
  })

  const description = `
  ${filterDescription}
  <br/>

  ${aggregationDescription}`

  return {
    raw: {
      description,
      schema: {
        body: {
          additionalProperties: false,
          type: 'object',
          required: ['data'],
          properties: {
            data: {
              type: 'object',
              additionalProperties: false,
              properties: {
                id: {
                  type: 'string',
                  example: '1234',
                },
                type: {
                  default: 'queryBody',
                  enum: ['queryBody'],
                  type: 'string',
                },
                attributes,
              },
            },
          },
        },
      },
    },
  }
}
