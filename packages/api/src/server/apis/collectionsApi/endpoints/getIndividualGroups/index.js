const fs = require('fs')
const path = require('path')
const routeHandler = require('./routeHandler')

const description = fs.readFileSync(
  path.join(__dirname, './description.md'),
  'utf8'
)

/* eslint-disable sort-keys */

module.exports = {
  method: 'get',
  description,
  queryParams: {
    'filter[catalogNumber]': {
      description: 'catalog number used to filter individualGroups',
      required: false,
      schema: {
        type: 'string',
      },
      example: '123456',
    },
    'filter[identifiedTaxonNameStandardized]': {
      description: 'Standardized taxon name used to filter individualGroups',
      required: false,
      schema: {
        type: 'string',
      },
      example: 'Chironectes minimus',
    },
    include: {
      description: 'sub models to include in a comma separated list',
      required: false,
      schema: {
        type: 'string',
      },
      example: 'physicalUnits.catalogedUnit,identifications',
    },
  },
  path: '/collections/api/v01/individualGroups',
  resource: 'individualGroup',
  response: {
    format: 'array',
  },
  summary: 'Finds individualGroups',
  routeHandler,
}
