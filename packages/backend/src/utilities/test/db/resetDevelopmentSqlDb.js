const execCmd = require('common/src/fs/execCmd')
const ensureNodeEnv = require('../../../lib/config/env/ensureNodeEnv')

function resetDevelopmentSqlDb() {
  ensureNodeEnv('development')
  return execCmd({
    cmd:
      './packages/scripts/src/bash/docker-import-data-from-sql.sh -f ./data/sample.dump.sql -d dina_dev',
  })
}

module.exports = resetDevelopmentSqlDb
