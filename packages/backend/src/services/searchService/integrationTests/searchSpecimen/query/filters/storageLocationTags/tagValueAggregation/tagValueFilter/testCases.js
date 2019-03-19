const createQueryTestCasedFromUnitTestCases = require('../../../utilities/createQueryTestCasedFromUnitTestCases')
const unitTestTestSpecification = require('../unitTests/testSpecification')

const unitQueryTestCases = createQueryTestCasedFromUnitTestCases(
  unitTestTestSpecification
)

module.exports = [...unitQueryTestCases]
