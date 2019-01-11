const tableColumnSpecifications = [
  {
    name: 'identifiersCatalogNumber',
    width: 180,
  },
  {
    name: 'taxonomyCuratorialName',
    width: 250,
  },
  {
    name: 'taxonomyRank',
    width: 150,
  },
  {
    name: 'taxonomyFamily',
    width: 150,
  },
  {
    name: 'taxonomyGenus',
    width: 150,
  },
  {
    name: 'taxonomySpecies',
    width: 150,
  },
  {
    name: 'taxonomySubspecies',
    width: 150,
  },
  {
    name: 'collectingEventCollectors',
    width: 250,
  },
  // {
  //   name: 'nomenclaturalTypeTypeStatus',
  //   width: 150,
  // },
  {
    name: 'collectingEventStartDate',
    width: 150,
  },
  {
    name: 'collectingEventEndDate',
    width: 150,
  },
  {
    name: 'collectingEventLocality',
    width: 300,
  },
  {
    name: 'collectingEventInterpretedLocality',
    width: 300,
  },
  {
    name: 'collectingEventCountry',
    width: 150,
  },
  {
    name: 'collectingEventProvince',
    width: 150,
  },
  {
    name: 'collectingEventDistrict',
    width: 150,
  },
  {
    name: 'originInformationLocality',
    width: 300,
  },
  {
    name: 'deathInformationDeath',
    width: 200,
  },
  {
    name: 'physicalUnitSkeleton',
    width: 400,
  },
  {
    name: 'physicalUnitSkin',
    width: 400,
  },
  {
    name: 'physicalUnitWetPreparation',
    width: 400,
  },
  {
    name: 'physicalUnitOtherPreparation',
    width: 400,
  },
  {
    name: 'featureSex',
    width: 100,
  },
  {
    name: 'featureAgeStage',
    width: 100,
  },
  {
    name: 'featureAge',
    width: 100,
  },
  {
    name: 'featureCompleteBodyWeight',
    width: 150,
  },
  {
    name: 'featureTotalLength',
    width: 150,
  },
  {
    name: 'featureBodyLength',
    width: 150,
  },
  {
    name: 'featureCondition',
    width: 150,
  },
  {
    name: 'identifiersOtherIdentifiers',
    width: 300,
  },
  {
    name: 'recordEventCataloged',
    width: 200,
  },
  {
    name: 'recordEventRegistered',
    width: 200,
  },
  {
    name: 'recordEventLastModified',
    width: 200,
  },
]

export const tableColumnNames = tableColumnSpecifications.map(
  ({ name }) => name
)

export const getTableWidth = (includedTableColumns = tableColumnNames) => {
  return tableColumnSpecifications.reduce((totalWidth, { name, width }) => {
    if (includedTableColumns.includes(name)) {
      return totalWidth + width
    }

    return totalWidth
  }, 0)
}

export default tableColumnSpecifications
