/* eslint-disable no-param-reassign */
// might need to unpack with { dataValues }
module.exports = function tranformOutput(output, useVersionId) {
  if (!output) {
    return null
  }

  const id = useVersionId ? output.versionId : output.id

  if (output.document) {
    return {
      ...output.document,
      id,
    }
  }

  return {
    id: useVersionId ? output.versionId : output.id,
  }
}
