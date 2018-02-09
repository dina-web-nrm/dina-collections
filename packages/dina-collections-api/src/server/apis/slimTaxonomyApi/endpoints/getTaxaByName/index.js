const fs = require('fs')
const path = require('path')

const description = fs.readFileSync(
  path.join(__dirname, './description.md'),
  'utf8'
)

/* eslint-disable sort-keys */

module.exports = {
  method: 'get',
  description,
  queryParams: {
    'filter[name]': {
      description:
        'Taxon name - accepted scientific, synonym or vernacular name',
      required: true,
      schema: {
        type: 'string',
      },
      example: 'Alces alces',
    },
    search_type: {
      description: 'Search type - exact (default) or partial',
      required: false,
      schema: {
        type: 'string',
        enum: ['exact', 'partial'],
      },
      example: 'exact',
    },
  },
  path: '/taxon',
  resource: 'taxon',
  response: {
    format: 'array',
  },
  summary: 'Fetches taxa by name',
}
