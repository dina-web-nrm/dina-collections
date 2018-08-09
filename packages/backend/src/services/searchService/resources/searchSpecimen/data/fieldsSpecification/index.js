const taxonomy = require('./decorators/taxonomy')

const agents = require('./fields/agents')
const identifiersCatalogNumber = require('./fields/identifiersCatalogNumber')
const collectingEventCollectors = require('./fields/collectingEventCollectors')
const collectingEventStartDate = require('./fields/collectingEventStartDate')

module.exports = {
  decorators: [taxonomy],
  fields: [
    agents,
    identifiersCatalogNumber,
    collectingEventCollectors,
    collectingEventStartDate,
  ],
}
