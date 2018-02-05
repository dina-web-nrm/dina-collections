const buildBodyParameters = request => {
  const { description, name, schema } = request

  if (name && schema) {
    return [
      {
        description,
        in: 'body',
        name,
        required: true,
        schema: {
          $ref: `#/definitions/${name}`,
        },
      },
    ]
  }
  return []
}

const buildPathParameters = pathParams => {
  return Object.keys(pathParams).map(name => {
    const { description, required, schema } = pathParams[name]
    const type = schema.type

    return {
      description,
      in: 'path',
      name,
      required,
      type,
    }
  }, {})
}

const buildQueryParameters = queryParams => {
  return Object.keys(queryParams).map(name => {
    const { description, required, schema } = queryParams[name]
    const type = schema.type

    return {
      description,
      in: 'query',
      name,
      required,
      type,
    }
  }, {})
}

const buildHeaderParameters = headerParams => {
  return Object.keys(headerParams).map(name => {
    const { description, required, schema } = headerParams[name]
    const type = schema.type

    return {
      description,
      in: 'header',
      name,
      required,
      type,
    }
  }, {})
}

module.exports = function buildParameters({
  pathParams = {},
  queryParams = {},
  headers = {},
  request = {},
}) {
  return [
    ...buildBodyParameters(request),
    ...buildPathParameters(pathParams),
    ...buildQueryParameters(queryParams),
    ...buildHeaderParameters(headers),
  ]
}
