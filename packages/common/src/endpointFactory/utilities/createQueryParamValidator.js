const buildQuerySchema = ({ methodSpecification }) => {
  const properties = (methodSpecification.parameters || [])
    .filter(parameter => {
      return parameter.in === 'query'
    })
    .reduce((propertySchema, queryParameter) => {
      return {
        ...propertySchema,
        [queryParameter.name]: queryParameter.schema,
      }
    }, {})

  const objectProperties = Object.keys(properties).reduce((obj, rawKey) => {
    const isObjectKey = rawKey.indexOf('[') > -1 && rawKey.indexOf(']') > -1
    if (isObjectKey) {
      const objectKey = rawKey.split('[')[0]
      const valueKey = rawKey.split('[')[1].replace(']', '')
      /* eslint-disable no-param-reassign */
      if (!obj[objectKey]) {
        obj[objectKey] = {
          additionalProperties: false,
          properties: {},
          type: 'object',
        }
      }
      obj[objectKey].properties[valueKey] = properties[rawKey]
      /* eslint-enable no-param-reassign */
      return obj
    }

    return {
      ...obj,
      [rawKey]: properties[rawKey],
    }
  }, {})
  return {
    additionalProperties: false,
    properties: objectProperties,
    type: 'object',
  }
}

module.exports = function createQueryValidator({
  createApiClientValidator,
  methodSpecification,
}) {
  const querySchema = buildQuerySchema({ methodSpecification })
  return createApiClientValidator({
    schema: querySchema,
    type: 'request-query',
  })
}
