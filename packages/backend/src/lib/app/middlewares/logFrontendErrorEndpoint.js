const express = require('express')
const { URL } = require('common/src/constants/frontendErrorLogging')
const createErrorLogger = require('../../errorLogger')
const createLog = require('../../../utilities/log')
const bodyParser = require('body-parser')

const log = createLog('logFrontendError')

module.exports = function createLogFrontendError({ config }) {
  const router = express.Router()
  router.use(bodyParser.text())

  let errorLogger
  if (config.env.isProduction) {
    errorLogger = createErrorLogger({
      config,
      errorCode: 'FRONTEND_ERROR',
      log,
      origin: 'frontend',
    })
  }
  router.post(URL, (req, res) => {
    const error = JSON.parse(req.body)
    if (errorLogger) {
      errorLogger.log({
        error,
        response: res,
        source: error.source,
      })
    }

    return res.sendStatus(200)
  })

  return router
}
