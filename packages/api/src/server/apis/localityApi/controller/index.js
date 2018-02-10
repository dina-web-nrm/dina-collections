const transformInput = require('./transformInput')
const transformOutput = require('./transformOutput')

module.exports = function curatedLocalityController({ models }) {
  const create = ({ body }) => {
    const { data } = body
    return models.curatedLocality
      .create(transformInput(data))
      .then(transformOutput)
  }

  const getById = ({ pathParams }) => {
    return models.curatedLocality
      .getById({
        id: pathParams.id,
      })
      .then(transformOutput)
  }

  const getByIdAndVersionId = ({ pathParams }) => {
    return models.curatedLocality
      .getById({
        id: pathParams.id,
        versionId: pathParams.versionId,
      })
      .then(transformOutput)
  }

  const update = ({ pathParams, body }) => {
    const { data } = body
    return models.curatedLocality
      .update({
        doc: transformInput(data),
        id: pathParams.id,
      })
      .then(transformOutput)
  }

  return {
    create,
    getById,
    getByIdAndVersionId,
    update,
  }
}
