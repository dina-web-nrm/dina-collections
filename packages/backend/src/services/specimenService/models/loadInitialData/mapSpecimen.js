const normalizeSpecimen = require('common/src/normalize/normalizeSpecimen')
const applyMapFunctions = require('./utilities/applyMapFunctions')
const mapCatalogNumber = require('./mapFunctions/catalogNumber')
const mapReadOnlyData = require('./mapFunctions/readOnlyData')

const mapFunctions = [mapCatalogNumber, mapReadOnlyData]

module.exports = function mapSpecimen(rawSpecimen) {
  return applyMapFunctions({
    mapFunctions,
    rawSpecimen,
  }).then(normalizeSpecimen)
}
