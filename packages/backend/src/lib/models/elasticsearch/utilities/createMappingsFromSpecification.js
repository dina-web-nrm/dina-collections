module.exports = function createMappingsFromSpecification({
  mappingSpecification,
  name,
}) {
  const properties = Object.keys(mappingSpecification.mappings).reduce(
    (obj, key) => {
      const keyMappingSpecifications = mappingSpecification.mappings[key]

      const keyMappings = {}

      const keyMappingSpecificationsArray = Array.isArray(
        keyMappingSpecifications
      )
        ? keyMappingSpecifications
        : [keyMappingSpecifications]

      keyMappingSpecificationsArray.forEach(
        ({ elasticsearch: elasticsearchFunction, fieldPath }) => {
          keyMappings[fieldPath] = elasticsearchFunction()
        }
      )
      return {
        ...obj,
        ...keyMappings,
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
