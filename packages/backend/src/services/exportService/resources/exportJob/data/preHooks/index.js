const backendError400 = require('common/src/error/errorFactories/backendError400')
const objectPath = require('object-path')

const createJobHook = ({ request }) => {
  return Promise.resolve().then(() => {
    const { body } = request
    if (!objectPath.get(body, 'data.attributes.exportIds')) {
      backendError400({
        code: 'REQUEST_ERROR',
        detail: 'exportIds is required',
      })
    }

    if (!objectPath.get(body, 'data.attributes.resource')) {
      backendError400({
        code: 'REQUEST_ERROR',
        detail: 'resource is required',
      })
    }

    if (!objectPath.get(body, 'data.attributes.exportFields')) {
      backendError400({
        code: 'REQUEST_ERROR',
        detail: 'exportFields is required',
      })
    }
  })
}

exports.create = [createJobHook]
