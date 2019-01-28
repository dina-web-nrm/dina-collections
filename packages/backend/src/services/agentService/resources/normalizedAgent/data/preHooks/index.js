const backendError400 = require('common/src/error/errorFactories/backendError400')
const { findMatchingAgents } = require('../../../../serviceInteractions')

const ensureUniqueAgentOnUpdate = ({ config, request, serviceInteractor }) => {
  if (config.env.isTest) {
    return Promise.resolve()
  }

  return findMatchingAgents({
    item: request.body.data,
    serviceInteractor,
  }).then(agents => {
    if (agents.length === 0) {
      return Promise.resolve()
    }
    if (agents.length > 1 || agents[0].id !== request.body.data.id) {
      backendError400({
        code: 'REQUEST_ERROR',
        detail:
          'The combination of full name and disambiguating description has to be unique',
        parameterErrors: [
          {
            errorCode: 'duplicate',
            fullPath: 'fullName',
          },
        ],
      })
    }
    return Promise.resolve()
  })
}

const ensureUniqueAgentOnCreate = ({ config, request, serviceInteractor }) => {
  if (config.env.isTest) {
    return Promise.resolve()
  }

  return findMatchingAgents({
    item: request.body.data,
    serviceInteractor,
  }).then(agents => {
    if (agents.length) {
      backendError400({
        code: 'REQUEST_ERROR',
        detail:
          'The combination of full name and disambiguating description has to be unique',
        parameterErrors: [
          {
            errorCode: 'duplicate',
            fullPath: 'fullName',
          },
        ],
      })
    }
  })
}

exports.update = [ensureUniqueAgentOnUpdate]
exports.create = [ensureUniqueAgentOnCreate]
