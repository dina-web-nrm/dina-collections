const createRegexBuilder = require('../factory')

const buildRegexp = createRegexBuilder()

module.exports = function runTestCases({ testCases, storeTestLog }) {
  testCases.forEach(testCase => {
    const {
      errorMessage,
      input,
      matching = [],
      notMatching = [],
      only,
    } = testCase

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
        const regexpStringArray = buildRegexp(input)
        const regexpString = regexpStringArray.join(' && ')
        matching.forEach(string => {
          const regexps = regexpStringArray.map(str => {
            return new RegExp(str)
          })

          storeTestLog({
            input,
            matching: true,
            regexp: regexpString,
            string: ` ${string} `,
          })
          it(`${input} is matching: " ${string} " with regexp: ${regexpString}`, () => {
            expect(
              regexps.every(regexp => {
                return regexp.test(` ${string} `)
              })
            ).toBe(true)
          })
        })
        notMatching.forEach(string => {
          const regexps = regexpStringArray.map(str => {
            return new RegExp(str)
          })
          storeTestLog({
            input,
            matching: false,
            regexp: regexpString,
            string: ` ${string} `,
          })
          it(`${input} is not matching: " ${string} " regexp: ${regexpString}`, () => {
            expect(
              regexps.every(regexp => {
                return regexp.test(` ${string} `)
              })
            ).toBe(false)
          })
        })
      }
    })
  })
}
