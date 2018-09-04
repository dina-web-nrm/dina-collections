const createLog = require('../../../utilities/log')
const createObjectResponse = require('../utilities/transformations/createObjectResponse')
const transformInput = require('../utilities/transformations/inputObject')

const log = createLog('lib/controllers/crud/update')

module.exports = function update({ operation, models, serviceInteractor }) {
  const { resource, relations, postHooks = [] } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }

  if (!model.update) {
    throw new Error(`Model missing required method: update for ${resource}`)
  }

  return ({ request, user, requestId }) => {
    const { body: { data: input = {} } = {} } = request
    const { pathParams: { id } } = request

    return model
      .update({
        id,
        ...transformInput({ input, relations, sourceResource: resource }),
      })
      .then(({ item } = {}) => {
        const promises = postHooks.map(postHook => {
          return postHook({
            item,
            requestId,
            resource,
            serviceInteractor,
            user,
          }).catch(err => {
            log.info('Error in post hook')
            log.err(err.stack)
          })
        })

        return Promise.all(promises).then(() => {
          return item
        })
      })
      .then(output => {
        return createObjectResponse({
          data: output,
          id: output.id,
          type: resource,
        })
      })
  }
}
