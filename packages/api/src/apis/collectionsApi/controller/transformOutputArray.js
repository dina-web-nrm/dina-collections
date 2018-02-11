/* eslint-disable no-param-reassign */
module.exports = function tranformOutput(output) {
  if (!output || !output.length) {
    return []
  }

  return output.filter(model => !!model).map(model => {
    return {
      id: model.id,
      ...model.document,
    }
  })
}
