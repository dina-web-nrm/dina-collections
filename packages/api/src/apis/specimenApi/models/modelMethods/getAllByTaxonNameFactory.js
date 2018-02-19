module.exports = function getAllByTaxonNameFactory({ sequelize }) {
  return function getAllByTaxonName({ taxonName } = {}) {
    if (!taxonName) {
      return Promise.reject(new Error('taxonName not provided'))
    }

    return sequelize
      .query(
        'SELECT DISTINCT ON (id) * FROM "Specimens" AS "Specimen" WHERE ("Specimen"."document"#>>\'{identifications,0,identifiedTaxonNameStandardized}\') = :taxonName ORDER BY id, "versionId" desc;',
        { replacements: { taxonName }, type: sequelize.QueryTypes.SELECT }
      )
      .then(result => {
        return result
      })
  }
}
