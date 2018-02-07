module.exports = function validateInput(queryParams) {
  const { catalogNumber, identifiedTaxonNameStandardized } =
    queryParams.filter || {}

  if (!catalogNumber && !identifiedTaxonNameStandardized) {
    const error = new Error(
      'Provide catalogNumber or identifiedTaxonNameStandardized'
    )
    error.status = 400
    throw error
  }

  if (catalogNumber && identifiedTaxonNameStandardized) {
    const error = new Error(
      'Provide only one of catalogNumber or identifiedTaxonNameStandardized'
    )
    error.status = 400
    throw error
  }
}
