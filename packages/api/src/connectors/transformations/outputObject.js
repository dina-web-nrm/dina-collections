/* eslint-disable no-param-reassign */
// might need to unpack with { dataValues }
module.exports = function tranformOutput(output) {
  return {
    ...output.document,
    id: output.id,
  }
}
