const createLog = require('../../../utilities/log')

const log = createLog('lib/jobs/scheduler')

module.exports = function createScheduler() {
  log.info('Start scheduler')
}
