module.exports = function createMappingsFromSpecification({
  mappingSpecification,
  name,
}) {
  const properties = Object.keys(mappingSpecification.mappings).reduce(
    (obj, key) => {
      const {
        elasticsearch: elasticsearchFunction,
        fieldPath,
      } = mappingSpecification.mappings[key]
      return {
        ...obj,
        [fieldPath]: elasticsearchFunction(),
      }
    },
    {}
  )
  return {
    [name]: {
      properties,
    },
  }
}
