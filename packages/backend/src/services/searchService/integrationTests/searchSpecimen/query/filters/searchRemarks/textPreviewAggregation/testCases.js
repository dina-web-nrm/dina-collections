const createPreviewTestCasesFromUnitTestCases = require('../../utilities/createPreviewTestCasesFromUnitTestCases')
const unitTestTestSpecification = require('./unitTests/testSpecification')

const unitQueryTestCases = createPreviewTestCasesFromUnitTestCases(
  unitTestTestSpecification
)

module.exports = [
  {
    expect: {
      count: 2,
    },
    filters: {
      input: {
        searchString: 'och',
      },
    },

    title: 'Return 2 aggregated testPreview for search string och',
  },
  {
    expect: {
      count: 0,
    },
    filters: {
      input: {
        searchString: '"och"',
      },
    },

    title: 'Phrase returns 0 matches',
  },

  ...unitQueryTestCases,
]
