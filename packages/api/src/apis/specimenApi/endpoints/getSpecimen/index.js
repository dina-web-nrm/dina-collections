const fs = require('fs')
const path = require('path')

const description = fs.readFileSync(
  path.join(__dirname, './description.md'),
  'utf8'
)

module.exports = {
  description,
  method: 'get',
  path: '/specimensApi/v01/specimens/{id}',
  pathParams: ['id'],
  queryParams: {
    include: {
      description: 'sub models to include in a comma separated string',
      example:
        'identifiableUnits.physicalUnits.storageLoaction,curratedLocalities',
      required: false,
      schema: {
        type: 'string',
      },
    },
  },

  resource: 'specimen',
  response: {
    format: 'object',
  },
  summary: 'Find specimen by id',
}
