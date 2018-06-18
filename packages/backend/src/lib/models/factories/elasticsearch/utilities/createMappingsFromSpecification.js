module.exports = function createMappingsFromSpecification({
  mappingSpecificationMap,
  name,
}) {
  const properties = Object.keys(mappingSpecificationMap).reduce((obj, key) => {
    const { elasticsearch: elasticsearchFunction } = mappingSpecificationMap[
      key
    ]
    return {
      ...obj,
      [key]: elasticsearchFunction(),
    }
  }, {})
  return {
    [name]: {
      properties,
    },
  }
}
