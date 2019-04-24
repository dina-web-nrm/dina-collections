const locality = require('./decorators/locality')
const storage = require('./decorators/storage')
const taxonomy = require('./decorators/taxonomy')

const searchAge = require('./searchOnlyFields/searchAge')
const searchDate = require('./searchOnlyFields/searchDate')
const searchRemarks = require('./searchOnlyFields/searchRemarks')
const relatedResources = require('./searchOnlyFields/relatedResources')

const agentTags = require('./tags/agentTags')
const appearanceTags = require('./tags/appearanceTags')
const ageStageTags = require('./tags/ageStageTags')
const boneTags = require('./tags/boneTags')
const conditionTags = require('./tags/conditionTags')
const dateTags = require('./tags/dateTags')
const identifierTags = require('./tags/identifierTags')
const lengthTags = require('./tags/lengthTags')
const locationTags = require('./tags/locationTags')
const otherPreparationTags = require('./tags/otherPreparationTags')
const higherGeographyTags = require('./tags/higherGeographyTags')
const selectiveBreedingTags = require('./tags/selectiveBreedingTags')
const sexTags = require('./tags/sexTags')
const skeletonTags = require('./tags/skeletonTags')
const skinTags = require('./tags/skinTags')
const storageLocationTags = require('./tags/storageLocationTags')
const taxonomyTags = require('./tags/taxonomyTags')
const weightTags = require('./tags/weightTags')
const wetPreparationTags = require('./tags/wetPreparationTags')

const collectingEventCollectors = require('./fields/collectingEventCollectors')
const collectingEventCountry = require('./fields/collectingEventCountry')
const collectingEventDistrict = require('./fields/collectingEventDistrict')
const collectingEventEndDate = require('./fields/collectingEventEndDate')
const collectingEventLocality = require('./fields/collectingEventLocality')
const collectingEventInterpretedLocality = require('./fields/collectingEventInterpretedLocality')
const collectingEventProvince = require('./fields/collectingEventProvince')
const collectingEventStartDate = require('./fields/collectingEventStartDate')
const deathInformationDeath = require('./fields/deathInformationDeath')
const featureAge = require('./fields/featureAge')
const featureAgeStage = require('./fields/featureAgeStage')
const featureBodyLength = require('./fields/featureBodyLength')
const featureCompleteBodyWeight = require('./fields/featureCompleteBodyWeight')
const featureCondition = require('./fields/featureCondition')
const featureSex = require('./fields/featureSex')
const featureTotalLength = require('./fields/featureTotalLength')
const id = require('./fields/id')
const identifiersCatalogNumber = require('./fields/identifiersCatalogNumber')
const identifiersOtherIdentifiers = require('./fields/identifiersOtherIdentifiers')
const idNumeric = require('./fields/idNumeric')
const originInformationLocality = require('./fields/originInformationLocality')
const physicalObjectStorageLocationGroups = require('./fields/physicalObjectStorageLocationGroups')
const physicalUnitOtherPreparation = require('./fields/physicalUnitOtherPreparation')
const physicalUnitSkeleton = require('./fields/physicalUnitSkeleton')
const physicalUnitSkin = require('./fields/physicalUnitSkin')
const physicalUnitWetPreparation = require('./fields/physicalUnitWetPreparation')
const recordEventCataloged = require('./fields/recordEventCataloged')
const recordEventLastModified = require('./fields/recordEventLastModified')
const recordEventRegistered = require('./fields/recordEventRegistered')
const taxonomyCuratorialName = require('./fields/taxonomyCuratorialName')
const taxonomyRank = require('./fields/taxonomyRank')
const taxonomyFamily = require('./fields/taxonomyFamily')
const taxonomyGenus = require('./fields/taxonomyGenus')
const taxonomySpecies = require('./fields/taxonomySpecies')
const taxonomySubspecies = require('./fields/taxonomySubspecies')

module.exports = {
  decorators: [locality, taxonomy, storage],
  fields: [
    searchAge,
    searchDate,
    searchRemarks,
    relatedResources,

    agentTags,
    appearanceTags,
    ageStageTags,
    boneTags,
    conditionTags,
    dateTags,
    identifierTags,
    lengthTags,
    locationTags,
    otherPreparationTags,
    higherGeographyTags,
    selectiveBreedingTags,
    sexTags,
    skeletonTags,
    skinTags,
    storageLocationTags,
    taxonomyTags,
    weightTags,
    wetPreparationTags,

    collectingEventCollectors,
    collectingEventCountry,
    collectingEventDistrict,
    collectingEventEndDate,
    collectingEventLocality,
    collectingEventInterpretedLocality,
    collectingEventProvince,
    collectingEventStartDate,
    deathInformationDeath,
    featureAge,
    featureAgeStage,
    featureBodyLength,
    featureCompleteBodyWeight,
    featureCondition,
    featureSex,
    featureTotalLength,
    id,
    identifiersCatalogNumber,
    identifiersOtherIdentifiers,
    idNumeric,
    originInformationLocality,
    physicalObjectStorageLocationGroups,
    physicalUnitOtherPreparation,
    physicalUnitSkeleton,
    physicalUnitSkin,
    physicalUnitWetPreparation,
    recordEventCataloged,
    recordEventLastModified,
    recordEventRegistered,
    taxonomyCuratorialName,
    taxonomyRank,
    taxonomyFamily,
    taxonomyGenus,
    taxonomySpecies,
    taxonomySubspecies,
  ],
}
