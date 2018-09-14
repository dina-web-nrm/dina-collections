const locality = require('./decorators/locality')
const storage = require('./decorators/storage')
const taxonomy = require('./decorators/taxonomy')

const searchAge = require('./searchOnlyFields/searchAge')
const searchDate = require('./searchOnlyFields/searchDate')
const searchLength = require('./searchOnlyFields/searchLength')
const searchWeight = require('./searchOnlyFields/searchWeight')

const agentTags = require('./tags/agentTags')
const ageStageTags = require('./tags/ageStageTags')
const boneTags = require('./tags/boneTags')
const conditionTags = require('./tags/conditionTags')
const dateTags = require('./tags/dateTags')
const identifierTags = require('./tags/identifierTags')
const lengthTags = require('./tags/lengthTags')
const locationTags = require('./tags/locationTags')
const placeIdTags = require('./tags/placeIdTags')
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
  decorators: [locality, taxonomy, storage],
  fields: [
    searchAge,
    searchDate,
    searchLength,
    searchWeight,

    agentTags,
    ageStageTags,
    boneTags,
    conditionTags,
    dateTags,
    identifierTags,
    lengthTags,
    locationTags,
    placeIdTags,
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
