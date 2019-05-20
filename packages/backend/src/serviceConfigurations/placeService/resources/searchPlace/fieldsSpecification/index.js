const ancestorIds = require('./fields/ancestorIds')
const continent = require('./fields/continent')
const country = require('./fields/country')
const district = require('./fields/district')
const geographicLevel = require('./fields/geographicLevel')
const id = require('./fields/id')
const name = require('./fields/name')
const parents = require('./decorators/parents')
const province = require('./fields/province')

module.exports = {
  decorators: [parents],
  fields: [
    id,
    ancestorIds,
    geographicLevel,
    name,
    continent,
    country,
    district,
    province,
  ],
}
