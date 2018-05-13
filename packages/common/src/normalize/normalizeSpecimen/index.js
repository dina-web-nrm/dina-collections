const { normalize } = require('normalizr')
const buildNormalizeSchema = require('../buildNormalizeSchema')
const normalizedSchemaSpecification = require('../normalizedSchemaSpecification')
const columnObjectToArray = require('./columnObjectToArray')

const normalizeSchema = buildNormalizeSchema({
  normalizedSchemaSpecification: normalizedSchemaSpecification.specimen,
  rootSchema: 'individual',
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

  const { individual = {}, ...rest } = denormalizedSpecimen

  const normalizedData = normalize(individual, normalizeSchema.individual)

  const { entities } = normalizedData
  const data = Object.keys(entities).reduce((obj, columnName) => {
    if (!columnNames.includes(columnName)) {
      return {
        ...obj,
        [columnName]: entities[columnName],
      }
    }

    if (columnName === 'individual') {
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
