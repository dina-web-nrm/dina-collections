/* eslint-disable no-param-reassign */
// might need to unpack with { dataValues }
module.exports = function tranformOutput(output) {
  if (!output) {
    return null
  }

  const { id } = output

  if (output.attributes) {
    return {
      ...output.attributes,
      id,
    }
  }

  return {
    id,
  }
}
