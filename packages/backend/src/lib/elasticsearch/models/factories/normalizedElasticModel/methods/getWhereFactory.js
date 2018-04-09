const mergeNormalizedColumns = require('../../../../../sequelize/models/factories/versionedDocumentModel/utilities/mergeNormalizedColumns')

module.exports = function getWhereFactory({ Model, elasticsearch }) {
  const { normalizedColumnNames } = Model

  return function getWhere({ body = {} }) {
    return elasticsearch
      .search({
        body,
        index: Model.name,
        sort: 'id:desc',
        type: Model.name,
      })
      .then(res => {
        const hits = res.hits && res.hits.hits
        if (hits) {
          return hits.map(hit => {
            const rawItem = hit._source // eslint-disable-line
            if (!normalizedColumnNames) {
              return rawItem
            }
            const doc = mergeNormalizedColumns({
              dataValues: rawItem,
              normalizedColumnNames,
            })
            return {
              ...rawItem,
              document: doc,
            }
          })
        }
        return []
      })
  }
}
