module.exports = function buildRelations({
  basePath,
  resourcePath,
  relations,
}) {
  if (!relations || !Object.keys(relations).length) {
    return undefined
  }

  return Object.keys(relations).map(relationKey => {
    const relation = relations[relationKey]
    const link = `${basePath}/${resourcePath}/{id}/relationships/${relationKey}`
    return {
      ...relation,
      key: relationKey,
      link,
    }
  })
}
