// const collectionItems = require('./decorators/collectionItems')
const taxonomy = require('./decorators/taxonomy')
const locality = require('./decorators/locality')

const agents = require('./fields/agents')
const collectingEventCollectors = require('./fields/collectingEventCollectors')
const collectingEventCountry = require('./fields/collectingEventCountry')
const collectingEventDistrict = require('./fields/collectingEventDistrict')
const collectingEventEndDate = require('./fields/collectingEventEndDate')
const collectingEventLocality = require('./fields/collectingEventLocality')
const collectingEventProvince = require('./fields/collectingEventProvince')
const collectingEventStartDate = require('./fields/collectingEventStartDate')
const featureAge = require('./fields/featureAge')
const featureAgeStage = require('./fields/featureAgeStage')
const featureBodyLength = require('./fields/featureBodyLength')
const featureCompleteBodyWeight = require('./fields/featureCompleteBodyWeight')
const featureCondition = require('./fields/featureCondition')
const featureSex = require('./fields/featureSex')
const featureTotalLength = require('./fields/featureTotalLength')
const identifiersCatalogNumber = require('./fields/identifiersCatalogNumber')
const identifiersOtherIdentifiers = require('./fields/identifiersOtherIdentifiers')
const originInformationLocality = require('./fields/originInformationLocality')
const physicalUnitOtherPreparation = require('./fields/physicalUnitOtherPreparation')
const physicalUnitSkeleton = require('./fields/physicalUnitSkeleton')
const physicalUnitSkin = require('./fields/physicalUnitSkin')
const physicalUnitWetPreparation = require('./fields/physicalUnitWetPreparation')
const recordEventCataloged = require('./fields/recordEventCataloged')
const recordEventLastModified = require('./fields/recordEventLastModified')
const recordEventRegistered = require('./fields/recordEventRegistered')
const taxonomyCuratorialName = require('./fields/taxonomyCuratorialName')
const taxonomyFamily = require('./fields/taxonomyFamily')
const taxonomyGenus = require('./fields/taxonomyGenus')
const taxonomySpecies = require('./fields/taxonomySpecies')
const taxonomySubspecies = require('./fields/taxonomySubspecies')

module.exports = {
  decorators: [locality, taxonomy],
  fields: [
    agents,
    collectingEventCollectors,
    collectingEventCountry,
    collectingEventDistrict,
    collectingEventEndDate,
    collectingEventLocality,
    collectingEventProvince,
    collectingEventStartDate,
    featureAge,
    featureAgeStage,
    featureBodyLength,
    featureCompleteBodyWeight,
    featureCondition,
    featureSex,
    featureTotalLength,
    identifiersCatalogNumber,
    identifiersOtherIdentifiers,
    originInformationLocality,
    physicalUnitOtherPreparation,
    physicalUnitSkeleton,
    physicalUnitSkin,
    physicalUnitWetPreparation,
    recordEventCataloged,
    recordEventLastModified,
    recordEventRegistered,
    taxonomyCuratorialName,
    taxonomyFamily,
    taxonomyGenus,
    taxonomySpecies,
    taxonomySubspecies,
  ],
}
