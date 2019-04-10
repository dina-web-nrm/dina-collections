const {
  factory: createRegexpBuilder,
} = require('../../../../../../../../../lib/modelFactories/elasticsearch/utilities/regexpBuilder')

const buildRegexp = createRegexpBuilder()

module.exports = function runTestCases({ testCases, storeTestLog }) {
  testCases.forEach(testCase => {
    const {
      errorMessage,
      input,
      matching: matchingInput = [],
      matchingNotInSampleData = [],
      notMatching = [],
      only,
    } = testCase

    const matching = [...matchingInput, ...matchingNotInSampleData]

    const jestDescribe = only ? describe.only : describe

    jestDescribe(input, () => {
      if (errorMessage) {
        storeTestLog({
          errorMessage,
          input,
          matching: false,
          regexp: '',
        })
        it(`${input} should throw: ${errorMessage || ''}`, () => {
          expect(() => buildRegexp(input)).toThrow(errorMessage)
        })
      } else {
        const regexpStringArray = buildRegexp(input.toLowerCase())
        const regexpString = regexpStringArray.join(' && ')
        matching.forEach(string => {
          const regexps = regexpStringArray.map(str => {
            return new RegExp(str)
          })

          const stringLowercase = string.toLowerCase()

          storeTestLog({
            input,
            matching: true,
            regexp: regexpString,
            string: ` ${string} `,
          })
          it(`${input} is matching: " ${stringLowercase} " with regexp: ${regexpString}`, () => {
            expect(
              regexps.every(regexp => {
                return regexp.test(` ${stringLowercase} `)
              })
            ).toBe(true)
          })
        })
        notMatching.forEach(string => {
          const regexps = regexpStringArray.map(str => {
            return new RegExp(str)
          })

          const stringLowercase = string.toLowerCase()
          storeTestLog({
            input,
            matching: false,
            regexp: regexpString,
            string: ` ${string.toLowerCase()} `,
          })
          it(`${input} is not matching: " ${stringLowercase} " regexp: ${regexpString}`, () => {
            expect(
              regexps.every(regexp => {
                return regexp.test(` ${stringLowercase} `)
              })
            ).toBe(false)
          })
        })
      }
    })
  })
}
