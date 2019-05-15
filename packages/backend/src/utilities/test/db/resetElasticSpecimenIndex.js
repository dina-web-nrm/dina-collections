const execCmd = require('common/src/execCmd')
const ensureNodeEnv = require('common/src/env/ensureNodeEnv')

function resetElasticSpecimenIndex() {
  ensureNodeEnv(['development', 'test'])
  return execCmd({
    cmd:
      './packages/scripts/src/bash/elasticsearch-import-indices.sh -f ./data/sample.index',
  })
}

module.exports = resetElasticSpecimenIndex
