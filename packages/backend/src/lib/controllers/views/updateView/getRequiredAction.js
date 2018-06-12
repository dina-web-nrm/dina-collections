const getSrcItem = ({ serviceInteractor, id, srcResource }) => {
  return serviceInteractor
    .getOne({
      request: {
        pathParams: {
          id,
        },
      },

      resource: srcResource,
    })
    .then(response => {
      if (response && response.data) {
        return response.data
      }
      return null
    })
    .catch(err => {
      if (err.status === 404) {
        return null
      }
      throw err
    })
}

const getTargetItem = ({ model, id }) => {
  return model
    .getById({ allowDeactivated: true, id })
    .then(response => {
      if (response) {
        return response.document
      }
      return null
    })
    .catch(err => {
      if (err.status === 404) {
        return null
      }
      throw err
    })
}

module.exports = function getRequiredAction({
  id,
  model,
  serviceInteractor,
  srcResource,
}) {
  return getSrcItem({
    id,
    serviceInteractor,
    srcResource,
  }).then(srcItem => {
    return getTargetItem({
      id,
      model,
    }).then(targetItem => {
      const srcStatus = srcItem ? 'exist' : 'dont-exist'
      const targetStatus = targetItem ? 'exist' : 'dont-exist'

      if (srcStatus === 'exist' && targetStatus === 'dont-exist') {
        return 'create'
      }

      if (srcStatus === 'exist' && targetStatus === 'exist') {
        return 'update'
      }

      if (srcStatus === 'dont-exist' && targetStatus === 'dont-exist') {
        return 'bail'
      }

      if (srcStatus === 'dont-exist' && targetStatus === 'exist') {
        return 'deactivate'
      }
      return 'bail'
    })
  })
}
