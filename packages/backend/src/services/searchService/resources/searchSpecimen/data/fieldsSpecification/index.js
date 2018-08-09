const taxonomy = require('./decorators/taxonomy')
const locality = require('./decorators/locality')

const agents = require('./fields/agents')
const collectingEventCollectors = require('./fields/collectingEventCollectors')
const collectingEventCountry = require('./fields/collectingEventCountry')
const collectingEventDistrict = require('./fields/collectingEventDistrict')
const collectingEventEndDate = require('./fields/collectingEventEndDate')
const collectingEventLocality = require('./fields/collectingEventLocality')
const collectingEventStartDate = require('./fields/collectingEventStartDate')
const identifiersCatalogNumber = require('./fields/identifiersCatalogNumber')
const originInformationLocality = require('./fields/originInformationLocality')
const taxonomyCuratorialName = require('./fields/taxonomyCuratorialName')
const taxonomyFamily = require('./fields/taxonomyFamily')
const taxonomyGenus = require('./fields/taxonomyGenus')
const taxonomySpecies = require('./fields/taxonomySpecies')
const taxonomySubspecies = require('./fields/taxonomySubspecies')

module.exports = {
  decorators: [taxonomy, locality],
  fields: [
    agents,
    collectingEventCollectors,
    collectingEventCountry,
    collectingEventDistrict,
    collectingEventEndDate,
    collectingEventLocality,
    collectingEventStartDate,
    identifiersCatalogNumber,
    originInformationLocality,
    taxonomyCuratorialName,
    taxonomyFamily,
    taxonomyGenus,
    taxonomySpecies,
    taxonomySubspecies,
  ],
}
