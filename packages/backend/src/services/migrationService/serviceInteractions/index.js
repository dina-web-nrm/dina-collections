exports.ensureDataSyncedWithVersion = ({
  serviceInteractor,
  dataModelVersion: dataModelVersionInput,
}) => {
  return serviceInteractor
    .call({
      operationType: 'getMany',
      request: {
        queryParams: {
          sort: 'id:desc',
        },
      },
      resource: 'dataModelMigrationLog',
    })
    .then(({ data: migrationsStatuses }) => {
      if (!migrationsStatuses.length) {
        throw new Error('No migration statuses found')
      }

      const { attributes: { status, dataModelVersion } = {} } =
        migrationsStatuses[0] || {}
      if (status !== 'success') {
        throw new Error(`Status not success. got: ${status}`)
      }
      if (dataModelVersion !== dataModelVersionInput) {
        throw new Error(
          `Missmatch version. System version: ${
            dataModelVersion
          }. Db version: ${dataModelVersionInput} `
        )
      }
      return {
        dataModelVersion,
        status,
      }
    })
}
