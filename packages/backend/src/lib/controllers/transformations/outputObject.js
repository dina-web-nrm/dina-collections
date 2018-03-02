/* eslint-disable no-param-reassign */
// might need to unpack with { dataValues }
module.exports = function tranformOutput(output, useVersionId) {
  return {
    ...output.document,
    id: useVersionId ? output.versionId : output.id,
  }
}
