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

  const { active, errorWebhook, warningWebhook } =
    config.integrations.slack || {}

  let slackError
  let slackWarning

  if (active && errorWebhook) {
    slackError = new Slack()
    slackError.setWebhook(errorWebhook)
  }
  if (active && warningWebhook) {
    slackWarning = new Slack()
    slackWarning.setWebhook(warningWebhook)
  }

  const sendErrorToSlack = error => {
    const stringErrorStatus = error && error.status && String(error.status)

    const errorIsWarning =
      origin === 'backend' && stringErrorStatus && stringErrorStatus[0] === '4'

    const { serverAlias } = config.env || {}

    const text = serverAlias
      ? `*${
          error.title
        }*. Check logs with command: _yarn remote:exec:cmd -s ${serverAlias} -c 'docker-compose logs --tail=2000 api | grep -a20 -b20 ${
          error.id
        }'_`
      : `*${error.title}* | ${error.id}`

    const callback = (err, response) => {
      if (err) {
        return log.err('Slack webhook error', err)
      }

      return log.info(
        `Posted error ${error.id} to Slack, response: ${response &&
          response.response}`
      )
    }

    const payload = {
      icon_emoji: ':loudspeaker:',
      text,
      username: 'webhookbot',
    }

    if (errorIsWarning && slackWarning) {
      slackWarning.webhook(payload, callback)
    }

    if (!errorIsWarning && slackError) {
      slackError.webhook(payload, callback)
    }
  }

  const logError = ({
    error: errorInput,
    response,
    source = 'backend',
  } = {}) => {
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
