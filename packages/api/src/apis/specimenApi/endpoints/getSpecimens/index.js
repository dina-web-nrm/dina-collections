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
      description: 'catalog number used to filter specimens',
      required: false,
      schema: {
        type: 'string',
      },
      example: '123456',
    },
    'filter[identifiedTaxonNameStandardized]': {
      description: 'Standardized taxon name used to filter specimens',
      required: false,
      schema: {
        type: 'string',
      },
      example: 'Chironectes minimus',
    },
    include: {
      description: 'sub models to include in a comma separated string',
      required: false,
      schema: {
        type: 'string',
      },
      example:
        'identifiableUnits.physicalUnits.storageLoaction,curratedLocalities',
    },
  },
  path: '/specimensApi/v01/specimens',
  resource: 'specimen',
  response: {
    format: 'array',
    relations: [
      {
        format: 'array',
        key: 'physicalUnits',
        resource: 'physicalUnit',
      },
    ],
  },
  summary: 'Finds specimens',
  routeHandler,
}
