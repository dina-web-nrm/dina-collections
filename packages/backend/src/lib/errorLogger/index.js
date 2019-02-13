const Slack = require('slack-node')
const backendError500 = require('common/src/error/errorFactories/backendError500')
const backendError400 = require('common/src/error/errorFactories/backendError400')
const isDinaError = require('common/src/error/utilities/isDinaError')
const createLog = require('../../utilities/log')

module.exports = function createErrorLogger({
  config,
  defaultErrorCode,
  log: logInput,
  origin,
}) {
  if (!origin || !['frontend', 'backend'].includes(origin)) {
    throw new Error(
      `Provide origin as either frontend or backend. got ${origin}`
    )
  }

  const errorFactory = origin === 'backend' ? backendError500 : backendError400

  const log = logInput || createLog(`errorLogger:${origin}`)

  const { active, verbose, webhook } = config.integrations.slack || {}
  let slack
  if (active && webhook) {
    slack = new Slack()
    slack.setWebhook(webhook)
  }

  const sendErrorToSlack = error => {
    const errorIsWarning =
      origin === 'backend' && error.status && `${error.status[0]}` === '4'
    let sendError = false
    if (origin === 'frontend') {
      sendError = true
    } else if (verbose) {
      sendError = true
    } else if (!errorIsWarning) {
      sendError = true
    }

    if (sendError) {
      // Use these 3 params when sending to slack.
      // errorIsWarning can be used to insert different emojis. error vs warning
      // console.log('send error to slack', errorIsWarning, error.title, error.id)
    }
  }

  const logError = (
    { error: errorInput, response, source = 'backend' } = {}
  ) => {
    try {
      let error = errorInput
      if (!isDinaError(errorInput)) {
        error = errorFactory({
          code: defaultErrorCode,
          detail: error.stack,
          source,
          throwError: false,
        })
      }

      const segments = [
        `errorId: ${error.id}`,
        `title: ${error.title}`,
        `status: ${error.status}`,
        `description: ${error.description}`,
        `source: ${error.source}`,
        `details: ${error.details}`,
        `requestId: ${response.locals.id}`,
        `userId: ${response.locals.user && response.locals.user.id}`,
        `status: ${error.status}`,
        `path: ${error.path}`,
        `message: ${error.message}`,
        `stack: ${error.stack}`,
        `parameterErrors: ${error.parameterErrors &&
          JSON.stringify(error.parameterErrors, null, 2)}`,
      ]

      log.err(segments.join('\n'))
      sendErrorToSlack(error)
    } catch (err) {
      log.err(err)
    }
  }

  return {
    log: logError,
  }
}
