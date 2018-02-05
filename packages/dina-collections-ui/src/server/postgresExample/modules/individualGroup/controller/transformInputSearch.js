module.exports = function transformInput(queryParams) {
  const { catalogNumber, identifiedTaxonNameStandardized } =
    queryParams.filter || {}

  return {
    catalogNumber,
    identifiedTaxonNameStandardized,
  }
}
