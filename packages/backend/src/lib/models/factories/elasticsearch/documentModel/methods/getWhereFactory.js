module.exports = function getWhereFactory({ Model, elasticsearch }) {
  return function getWhere({ where = {} }) {
    return elasticsearch
      .search({
        body: where,
        index: Model.index,
        type: Model.name,
      })
      .then(res => {
        if (where.aggregations) {
          return res.aggregations.collectingLocations.buckets
        }

        const hits = res.hits && res.hits.hits

        if (hits) {
          return hits.map(hit => {
            const rawItem = hit._source // eslint-disable-line
            return rawItem
          })
        }
        return []
      })
  }
}
