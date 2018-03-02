module.exports = function buildRelations({
  basePath,
  resourcePlural,
  relations,
}) {
  if (!relations || !Object.keys(relations).length) {
    return undefined
  }

  return Object.keys(relations).map(relationKey => {
    const relation = relations[relationKey]
    const link = `${basePath}/${resourcePlural}/{id}/relationships/${
      relationKey
    }`
    return {
      ...relation,
      key: relationKey,
      link,
    }
  })
}
