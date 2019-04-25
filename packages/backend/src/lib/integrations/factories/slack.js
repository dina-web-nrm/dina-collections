const Slack = require('slack-node')

module.exports = function createSlackIntegration({
  errorWebhook,
  warningWebhook,
}) {
  let slackError
  let slackWarning
  if (errorWebhook) {
    slackError = new Slack()
    slackError.setWebhook(errorWebhook)
  }
  if (warningWebhook) {
    slackWarning = new Slack()
    slackWarning.setWebhook(warningWebhook)
  }

  return Promise.resolve({
    sendError: (payload, callback) => {
      if (slackError) {
        slackError.webhook(payload, callback)
      }
    },
    sendWarning: (payload, callback) => {
      if (slackWarning) {
        slackWarning.webhook(payload, callback)
      }
    },
  })
}
