const { denormalize } = require('normalizr')
const buildNormalizeSchema = require('../buildNormalizeSchema')
const normalizedSchemaSpecification = require('../normalizedSchemaSpecification')
const columnArrayToObject = require('./columnArrayToObject')

const normalizeSchema = buildNormalizeSchema({
  normalizedSchemaSpecification: normalizedSchemaSpecification.specimen,
  rootSchema: 'individual',
})

const columnNames = Object.keys(normalizedSchemaSpecification.specimen).map(
  key => {
    return normalizedSchemaSpecification.specimen[key].column
  }
)

module.exports = function denormalizeIndividual(normalizedSpecimen) {
  const { individual = {} } = normalizedSpecimen

  const rest = {}
  const entities = Object.keys(normalizedSpecimen).reduce((obj, columnName) => {
    if (!columnNames.includes(columnName)) {
      rest[columnName] = normalizedSpecimen[columnName]
      return obj
    }
    if (columnName === 'individual') {
      return {
        ...obj,
        [columnName]: columnArrayToObject([normalizedSpecimen[columnName]]),
      }
    }
    return {
      ...obj,
      [columnName]: columnArrayToObject(normalizedSpecimen[columnName]) || {},
    }
  }, {})

  const denormalizedData = denormalize(
    individual.lid,
    normalizeSchema.individual,
    entities
  )

  return { individual: denormalizedData || {}, ...rest }
}
