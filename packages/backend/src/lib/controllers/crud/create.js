const createLog = require('../../../utilities/log')
const createObjectResponse = require('../utilities/transformations/createObjectResponse')
const transformInput = require('../utilities/transformations/inputObject')

const log = createLog('lib/controllers/crud/create')

module.exports = function create({
  operation = {},
  models,
  serviceInteractor,
}) {
  const { resource, validateBody, relations, postHooks = [] } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  if (!model.create) {
    throw new Error(`Model missing required method: create for ${resource}`)
  }

  return ({ request, user, requestId }) => {
    const { body } = request
    if (validateBody) {
      validateBody(body)
    }
    const { data: input } = body
    return model
      .create(
        transformInput({
          input,
          relations,
          sourceResource: resource,
        })
      )
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
          status: 201,
          type: resource,
        })
      })
  }
}
