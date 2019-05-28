const execCmd = require('./utilities/execCmd')
const captureServerNameFromArgs = require('./utilities/captureServerNameFromArgs')
const captureFlagFromArgs = require('./utilities/captureFlagFromArgs')

const serviceInput = captureFlagFromArgs({
  flag: '--service',
  throwOnMissing: true,
})

const tail =
  captureFlagFromArgs({
    flag: '--tail',
    throwOnMissing: false,
  }) || 2000

const serviceContainerMap = {
  api: 'dina-api',
  baseWorker: 'dina-base-worker',
  docs: 'dina-collections-docs',
  import: 'dina-migrations-import',
  migrateLatest: 'dina-migrations-migrate-latest',
  migrateOne: 'dina-migrations-migrate-one',
  migrateUndoOne: 'dina-migrations-migrate-undo-one',
  mysql: 'keycloak-mysql',
  rebuildSearch: 'dina-migrations-rebuild-search',
  searchIndexWorker: 'dina-search-index-worker',
  style: 'dina-semantic-ui-docs',
}

const container = serviceContainerMap[serviceInput] || serviceInput

const serverName = captureServerNameFromArgs()

return execCmd({
  cmd: `docker logs --tail=${tail} ${container}`,
  serverName,
}).then(res => {
  console.log(res)
})
