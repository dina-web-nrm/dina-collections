const constants = require('../../constants')
const testSpecification = require('./testSpecification')
const createUnitTest = require('../../../utilities/createUnitTest')

createUnitTest({
  testSpecification,
  ...constants,
})
