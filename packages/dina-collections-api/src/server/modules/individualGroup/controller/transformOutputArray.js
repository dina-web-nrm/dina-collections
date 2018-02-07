/* eslint-disable no-param-reassign */
module.exports = function tranformOutput(output) {
  if (!output || !output.length) {
    return []
  }

  return output.filter(model => !!model).map(model => {
    const { dataValues } = model
    delete dataValues.document.catalogedUnit
    return {
      id: dataValues.id,
      ...dataValues.document,
    }
  })
}
