module.exports = function createMappingsFromSpecification({
  mappingSpecification,
  name,
}) {
  const properties = Object.keys(mappingSpecification.mappings).reduce(
    (obj, key) => {
      const {
        elasticsearch: elasticsearchFunction,
      } = mappingSpecification.mappings[key]
      return {
        ...obj,
        [key]: elasticsearchFunction(),
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
