const getExamplesFromMethodSpecifiction = require('./getExamplesFromMethodSpecifiction')

module.exports = function createGetExample({
  methodSpecification,
  openApiSpec,
}) {
  const examples = getExamplesFromMethodSpecifiction({
    methodSpecification,
    openApiSpec,
  })
  return exampleId => {
    if (!examples) {
      return Promise.resolve(null)
    }

    return Promise.resolve(examples[exampleId])
  }
}
