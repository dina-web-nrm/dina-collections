/* eslint-disable no-param-reassign */
module.exports = function tranformOutput(output, useVersionId) {
  if (!output || !output.length) {
    return []
  }

  return output
    .filter(model => !!model)
    .map(model => {
      return {
        id: useVersionId ? model.versionId : model.id,
        ...model.document,
      }
    })
}
