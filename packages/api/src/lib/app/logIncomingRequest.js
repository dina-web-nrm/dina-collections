const createLog = require('../../utilities/log')
const uuidv1 = require('uuid/v1')

const log = createLog('logIncomingRequest')

module.exports = (req, res, next) => {
  res.locals.id = uuidv1()
  log.info(
    `${res.locals.id}: Receive request ${req.method} - ${req.url} from ${
      req.ip
    }`
  )
  next()
}
