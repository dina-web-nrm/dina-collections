module.exports = function createSwaggerTags({ apis }) {
  return Object.keys(apis).map(key => {
    const { description } = apis[key]

    return {
      description,
      name: key,
    }
  })
}
