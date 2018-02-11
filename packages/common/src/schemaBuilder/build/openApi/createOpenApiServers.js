module.exports = function createOpenApiServers(apis) {
  return Object.keys(apis).map(key => {
    const { url, description } = apis[key]

    return {
      description,
      url,
    }
  })
}
