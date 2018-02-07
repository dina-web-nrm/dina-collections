/* eslint-disable no-param-reassign */
// might need to unpack with { dataValues }
module.exports = function tranformOutput(output) {
  return {
    id: output.id,
    versionId: `${output.versionId}`,
    ...output.document,
  }
}
