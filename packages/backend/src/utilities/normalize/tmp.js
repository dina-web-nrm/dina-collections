const fs = require('fs')
const path = require('path')
const { normalize } = require('normalizr')
const input = require('./data')
const buildNormalizeSchema = require('./buildNormalizeSchema')

const normalizedSchemaNames = [
  'determination',
  'distinguishedUnit',
  'event',
  'featureObservation',
  'identifier',
  'individualCircumstance',
  'individualGroup',
  'taxonInformation',
]

const normalizeSchema = buildNormalizeSchema(normalizedSchemaNames)
// console.log('normalizeSchema', normalizeSchema)
// console.log('normalizeSchema', normalizeSchema.date)

const normalizedData = normalize(input, normalizeSchema.individualGroup)
const { entities } = normalizedData

const data = normalizedSchemaNames.reduce((obj, name) => {
  const column = entities[name]
  let fixedName = `${name}s`
  if (name === 'individualGroup') {
    fixedName = name
  }

  if (name === 'taxonInformation') {
    fixedName = name
  }

  return {
    ...obj,
    [fixedName]: Object.keys(column || {}).map(id => {
      return column[id]
    }),
  }
}, {})

const target = path.join(__dirname, 'output.json')

fs.writeFileSync(target, JSON.stringify(data, null, 2))
