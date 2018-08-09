const agents = require('./fields/agents')
const identifiersCatalogNumber = require('./fields/identifiersCatalogNumber')
const collectingEventCollectors = require('./fields/collectingEventCollectors')
const collectingEventStartDate = require('./fields/collectingEventStartDate')

module.exports = {
  fields: [
    agents,
    identifiersCatalogNumber,
    collectingEventCollectors,
    collectingEventStartDate,
  ],
}
