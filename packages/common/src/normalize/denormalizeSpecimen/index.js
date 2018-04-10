const { denormalize } = require('normalizr')
const buildNormalizeSchema = require('../buildNormalizeSchema')
const normalizedSchemaSpecification = require('../normalizedSchemaSpecification')
const columnArrayToObject = require('./columnArrayToObject')

const normalizeSchema = buildNormalizeSchema({
  normalizedSchemaSpecification: normalizedSchemaSpecification.specimen,
  rootSchema: 'individualGroup',
})

const columnNames = Object.keys(normalizedSchemaSpecification.specimen).map(
  key => {
    return normalizedSchemaSpecification.specimen[key].column
  }
)

module.exports = function denormalizeIndividualGroup(normalizedSpecimen) {
  const { individualGroup = {} } = normalizedSpecimen

  const rest = {}
  const entities = Object.keys(normalizedSpecimen).reduce((obj, columnName) => {
    if (!columnNames.includes(columnName)) {
      rest[columnName] = normalizedSpecimen[columnName]
      return obj
    }
    if (columnName === 'individualGroup') {
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
    individualGroup.lid,
    normalizeSchema.individualGroup,
    entities
  )

  return { individualGroup: denormalizedData || {}, ...rest }
}
