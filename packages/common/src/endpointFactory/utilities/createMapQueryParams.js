const mapQueryParam = ({
  schema: schemaInput,
  key,
  parameterQuerySchema,
  queryParam,
}) => {
  let parsedQueryParam = queryParam
  try {
    if (
      queryParam !== null &&
      typeof queryParam === 'object' &&
      !Array.isArray(queryParam)
    ) {
      return Object.keys(queryParam).reduce((obj, queryParamObjectKey) => {
        const schemaPath = `${key}[${queryParamObjectKey}]`
        return {
          ...obj,
          [queryParamObjectKey]: mapQueryParam({
            parameterQuerySchema,
            queryParam: queryParam[queryParamObjectKey],
            schema: parameterQuerySchema[schemaPath],
          }),
        }
      }, {})
    }

    const schema = schemaInput || parameterQuerySchema[key]

    if (!schema) {
      return queryParam
    }

    if (!queryParam) {
      return queryParam
    }

    const { type } = schema

    switch (type) {
      case 'string': {
        if (Array.isArray(queryParam)) {
          break
        }
        if (queryParam !== null && typeof queryParam === 'object') {
          break
        }

        parsedQueryParam = `${queryParam}`.trim()
        break
      }

      case 'boolean': {
        if (queryParam === 'true') {
          parsedQueryParam = true
        }
        if (queryParam === 'false') {
          parsedQueryParam = false
        }
        break
      }

      case 'integer': {
        if (queryParam.match(/^-{0,1}\d+$/)) {
          parsedQueryParam = parseInt(queryParam, 10)
        }

        break
      }

      case 'array': {
        const array = Array.isArray(queryParam)
          ? queryParam
          : queryParam
              .replace('[', '')
              .replace(']', '')
              .split(',')
        parsedQueryParam = array.map(itemQueryParam => {
          return mapQueryParam({
            queryParam: itemQueryParam,
            schema: schema.items,
          })
        })
        break
      }
      default: {
        throw new Error(`Unknown type: ${type}`)
      }
    }
  } catch (err) {
    /* eslint-disable no-console */
    console.warn(`Failed to parse queryParam ${queryParam}`, err)
    throw err

    /* eslint-enable no-console */
  }

  return parsedQueryParam
}

const buildParameterQuerySchema = ({ methodSpecification }) => {
  return (methodSpecification.parameters || [])
    .filter(parameter => {
      return parameter.in === 'query'
    })
    .reduce((properties, queryParameter) => {
      return {
        ...properties,
        [queryParameter.name]: queryParameter.schema,
      }
    }, {})
}

module.exports = function createMapQueryParams({ methodSpecification }) {
  const parameterQuerySchema = buildParameterQuerySchema({
    methodSpecification,
  })

  return function mapQueryParams(queryParams = {}) {
    return Object.keys(queryParams).reduce((mappedParams, key) => {
      const queryParam = queryParams[key]
      return {
        ...mappedParams,
        [key]: mapQueryParam({
          key,
          parameterQuerySchema,
          queryParam,
        }),
      }
    }, {})
  }
}
