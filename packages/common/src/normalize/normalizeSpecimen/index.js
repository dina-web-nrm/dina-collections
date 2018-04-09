const { normalize } = require('normalizr')
const buildNormalizeSchema = require('../buildNormalizeSchema')
const normalizedSchemaSpecification = require('../normalizedSchemaSpecification')
const columnObjectToArray = require('./columnObjectToArray')

const normalizeSchema = buildNormalizeSchema({
  normalizedSchemaSpecification: normalizedSchemaSpecification.specimen,
  rootSchema: 'individualGroup',
})

const columnNames = Object.keys(normalizedSchemaSpecification.specimen).map(
  key => {
    return normalizedSchemaSpecification.specimen[key].column
  }
)

module.exports = function normalizeSpecimen(denormalizedSpecimenInput) {
  const denormalizedSpecimen = JSON.parse(
    JSON.stringify(denormalizedSpecimenInput)
  )
  const { individualGroup = {}, ...rest } = denormalizedSpecimen

  const normalizedData = normalize(
    individualGroup,
    normalizeSchema.individualGroup
  )

  const { entities } = normalizedData
  const data = Object.keys(entities).reduce((obj, columnName) => {
    if (!columnNames.includes(columnName)) {
      return {
        ...obj,
        [columnName]: entities[columnName],
      }
    }
    if (columnName === 'individualGroup') {
      return {
        ...obj,
        [columnName]: columnObjectToArray(entities[columnName])[0],
      }
    }
    return {
      ...obj,
      [columnName]: columnObjectToArray(entities[columnName]),
    }
  }, {})
  return {
    ...rest,
    ...data,
  }
}
