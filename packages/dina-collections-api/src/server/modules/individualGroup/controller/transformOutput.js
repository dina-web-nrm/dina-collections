/* eslint-disable no-param-reassign */
module.exports = function tranformOutput(output) {
  delete output.document.catalogedUnit
  return {
    id: output.id,
    ...output.document,
  }
}
