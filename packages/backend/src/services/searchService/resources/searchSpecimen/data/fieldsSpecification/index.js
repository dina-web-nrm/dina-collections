// const collectionItems = require('./decorators/collectionItems')
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
const physicalUnitSkeleton = require('./fields/physicalUnitSkeleton')
const physicalUnitSkin = require('./fields/physicalUnitSkin')
const physicalUnitWetPreparation = require('./fields/physicalUnitWetPreparation')
const physicalUnitOtherPreparation = require('./fields/physicalUnitOtherPreparation')

module.exports = {
  decorators: [locality, taxonomy],
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
    physicalUnitOtherPreparation,
    physicalUnitSkeleton,
    physicalUnitSkin,
    physicalUnitWetPreparation,
    taxonomyCuratorialName,
    taxonomyFamily,
    taxonomyGenus,
    taxonomySpecies,
    taxonomySubspecies,
  ],
}
