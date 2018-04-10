const createLog = require('../utilities/log')
const listTableSizes = require('./utilities/listTableSizes')
const createReport = require('./utilities/createReport')
const setup = require('./setup')

const log = createLog('performance')

log.debug('start')

return setup(log.scope()).then(() => {
  log.debug('done')
  return listTableSizes({ tables: ['versionedDocumentModels'] }).then(() => {
    createReport(log.scope())
  })
})
