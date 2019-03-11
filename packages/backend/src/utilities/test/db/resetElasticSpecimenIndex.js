const execCmd = require('common/src/fs/execCmd')
const ensureNodeEnv = require('common/src/config/ensureNodeEnv')

function resetElasticSpecimenIndex() {
  ensureNodeEnv(['development', 'test'])
  return execCmd({
    cmd:
      './packages/scripts/src/bash/elasticsearch-import-index-specimen.sh -f ./data/sample.searchSpecimen.json',
  })
}

module.exports = resetElasticSpecimenIndex
