const models = require('../../dist/models.json')
const item = require('../normalize/testData/denormalizedSpecimen')
const createRelationshipSpecifications = require('./relationships/createRelationshipSpecifications')
const normalizeItem = require('./normalize/normalize')
// const createFormatSpecifications = require('./specification/createFormatSpecifications')
const createNormalizeSchemas = require('./normalize/createNormalizeSchemas')
const extractRelationships = require('./relationships/extractRelationships')
// const formatSpecifications = createFormatSpecifications({ models })
const relationshipSpecifications = createRelationshipSpecifications({ models })

const normalizeSchemas = createNormalizeSchemas({
  models,
})

// const normalized = normalizeItem({ item, normalizeSchemas, type: 'specimen' })
const fixed = extractRelationships({
  item,
  relationshipSpecification: relationshipSpecifications.specimen,
})
console.log('fixed', fixed)
// console.log('normalized', normalized)

// console.log('normalizeSchemas', normalizeSchemas)
// console.log('formatSpecifications', formatSpecifications)
