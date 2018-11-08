const createPgMigrations = require('../utilities/createPgMigrations')

module.exports = createPgMigrations({
  migrations: [
    {
      migrationName: 'initial',
      resourceName: 'normalizedAgent',
      serviceName: 'agentService',
    },
    {
      migrationName: 'initial',
      resourceName: 'causeOfDeathType',
      serviceName: 'curatedListService',
    },
    {
      migrationName: 'initial',
      resourceName: 'customTaxonNameType',
      serviceName: 'curatedListService',
    },
    {
      migrationName: 'initial',
      resourceName: 'establishmentMeansType',
      serviceName: 'curatedListService',
    },
    {
      migrationName: 'initial',
      resourceName: 'featureType',
      serviceName: 'curatedListService',
    },
    {
      migrationName: 'initial',
      resourceName: 'identifierType',
      serviceName: 'curatedListService',
    },
    {
      migrationName: 'initial',
      resourceName: 'preparationType',
      serviceName: 'curatedListService',
    },
    {
      migrationName: 'initial',
      resourceName: 'typeSpecimenType',
      serviceName: 'curatedListService',
    },
    {
      migrationName: 'initial',
      resourceName: 'exportJob',
      serviceName: 'exportService',
    },
    {
      migrationName: 'initial',
      resourceName: 'resourceActivity',
      serviceName: 'historyService',
    },
    {
      migrationName: 'initial',
      resourceName: 'catalogNumber',
      serviceName: 'identifierService',
    },
    {
      migrationName: 'initial',
      resourceName: 'job',
      serviceName: 'jobService',
    },
    {
      migrationName: 'initial',
      resourceName: 'place',
      serviceName: 'placeService',
    },
    {
      migrationName: 'initial',
      resourceName: 'specimen',
      serviceName: 'specimenService',
    },
    {
      migrationName: 'initial',
      resourceName: 'storageLocation',
      serviceName: 'storageService',
    },
    {
      migrationName: 'initial',
      resourceName: 'physicalObject',
      serviceName: 'storageService',
    },
    {
      migrationName: 'initial',
      resourceName: 'taxon',
      serviceName: 'taxonomyService',
    },
    {
      migrationName: 'initial',
      resourceName: 'taxonName',
      serviceName: 'taxonomyService',
    },
    {
      migrationName: 'initial',
      resourceName: 'dataModelMigrationLog',
      serviceName: 'migrationService',
    },
  ],
})
