const buildPathParameters = pathParams => {
  return Object.keys(pathParams).map(name => {
    return {
      in: 'path',
      name,
      ...pathParams[name],
    }
  }, {})
}

const buildQueryParameters = queryParams => {
  return Object.keys(queryParams).map(name => {
    return {
      in: 'query',
      name,
      ...queryParams[name],
    }
  }, {})
}

const buildHeaderParameters = headerParams => {
  return Object.keys(headerParams).map(name => {
    return {
      in: 'header',
      name,
      ...headerParams[name],
    }
  }, {})
}

module.exports = function buildParameters({
  pathParams = {},
  queryParams = {},
  headers = {},
}) {
  return [
    ...buildPathParameters(pathParams),
    ...buildQueryParameters(queryParams),
    ...buildHeaderParameters(headers),
  ]
}
