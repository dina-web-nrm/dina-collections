const tableColumnSpecifications = [
  {
    fieldPath: 'identifiersCatalogNumber',
    label: 'modules.specimen.tableColumns.identifiersCatalogNumber',
    width: 180,
  },
  {
    fieldPath: 'taxonomyCuratorialName',
    label: 'modules.specimen.tableColumns.taxonomyCuratorialName',
    width: 250,
  },
  {
    fieldPath: 'taxonomyRank',
    label: 'modules.specimen.tableColumns.taxonomyRank',
    width: 150,
  },
  {
    fieldPath: 'taxonomyFamily',
    label: 'modules.specimen.tableColumns.taxonomyFamily',
    width: 150,
  },
  {
    fieldPath: 'taxonomyGenus',
    label: 'modules.specimen.tableColumns.taxonomyGenus',
    width: 150,
  },
  {
    fieldPath: 'taxonomySpecies',
    label: 'modules.specimen.tableColumns.taxonomySpecies',
    width: 150,
  },
  {
    fieldPath: 'taxonomySubspecies',
    label: 'modules.specimen.tableColumns.taxonomySubspecies',
    width: 150,
  },
  {
    fieldPath: 'collectingEventCollectors',
    label: 'modules.specimen.tableColumns.collectingEventCollectors',
    width: 250,
  },
  {
    fieldPath: 'collectingEventStartDate',
    label: 'modules.specimen.tableColumns.collectingEventStartDate',
    width: 150,
  },
  {
    fieldPath: 'collectingEventEndDate',
    label: 'modules.specimen.tableColumns.collectingEventEndDate',
    width: 150,
  },
  {
    fieldPath: 'collectingEventLocality',
    label: 'modules.specimen.tableColumns.collectingEventLocality',
    width: 300,
  },
  {
    fieldPath: 'collectingEventInterpretedLocality',
    label: 'modules.specimen.tableColumns.collectingEventInterpretedLocality',
    width: 300,
  },
  {
    fieldPath: 'collectingEventCountry',
    label: 'modules.specimen.tableColumns.collectingEventCountry',
    width: 200,
  },
  {
    fieldPath: 'collectingEventProvince',
    label: 'modules.specimen.tableColumns.collectingEventProvince',
    width: 200,
  },
  {
    fieldPath: 'collectingEventDistrict',
    label: 'modules.specimen.tableColumns.collectingEventDistrict',
    width: 200,
  },
  {
    fieldPath: 'originInformationLocality',
    label: 'modules.specimen.tableColumns.originInformationLocality',
    width: 300,
  },
  {
    fieldPath: 'deathInformationDeath',
    label: 'modules.specimen.tableColumns.deathInformationDeath',
    width: 200,
  },
  {
    fieldPath: 'physicalUnitSkeleton',
    label: 'modules.specimen.tableColumns.physicalUnitSkeleton',
    width: 400,
  },
  {
    fieldPath: 'physicalUnitSkin',
    label: 'modules.specimen.tableColumns.physicalUnitSkin',
    width: 400,
  },
  {
    fieldPath: 'physicalUnitWetPreparation',
    label: 'modules.specimen.tableColumns.physicalUnitWetPreparation',
    width: 400,
  },
  {
    fieldPath: 'physicalUnitOtherPreparation',
    label: 'modules.specimen.tableColumns.physicalUnitOtherPreparation',
    width: 400,
  },
  {
    fieldPath: 'featureSex',
    label: 'modules.specimen.tableColumns.featureSex',
    width: 100,
  },
  {
    fieldPath: 'featureAgeStage',
    label: 'modules.specimen.tableColumns.featureAgeStage',
    width: 100,
  },
  {
    fieldPath: 'featureAge',
    label: 'modules.specimen.tableColumns.featureAge',
    width: 100,
  },
  {
    fieldPath: 'featureCompleteBodyWeight',
    label: 'modules.specimen.tableColumns.featureCompleteBodyWeight',
    width: 180,
  },
  {
    fieldPath: 'featureTotalLength',
    label: 'modules.specimen.tableColumns.featureTotalLength',
    width: 150,
  },
  {
    fieldPath: 'featureBodyLength',
    label: 'modules.specimen.tableColumns.featureBodyLength',
    width: 150,
  },
  {
    fieldPath: 'featureCondition',
    label: 'modules.specimen.tableColumns.featureCondition',
    width: 180,
  },
  {
    fieldPath: 'identifiersOtherIdentifiers',
    label: 'modules.specimen.tableColumns.identifiersOtherIdentifiers',
    width: 300,
  },
  {
    fieldPath: 'recordEventCataloged',
    label: 'modules.specimen.tableColumns.recordEventCataloged',
    width: 250,
  },
  {
    fieldPath: 'recordEventRegistered',
    label: 'modules.specimen.tableColumns.recordEventRegistered',
    width: 150,
  },
  {
    fieldPath: 'recordEventLastModified',
    label: 'modules.specimen.tableColumns.recordEventLastModified',
    width: 200,
  },
]

export const tableColumnNames = tableColumnSpecifications.map(
  ({ fieldPath }) => fieldPath
)

export const getTableWidth = (includedTableColumns = tableColumnNames) => {
  return tableColumnSpecifications.reduce(
    (totalWidth, { fieldPath, width }) => {
      if (includedTableColumns.includes(fieldPath)) {
        return totalWidth + width
      }

      return totalWidth
    },
    0
  )
}

export default tableColumnSpecifications
